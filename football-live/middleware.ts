import { NextRequest, NextResponse } from 'next/server';
import { checkRateLimit } from './app/utils/rate-limit';

// Anti-bot configuration
const BLOCKED_USER_AGENTS = [
  'curl', 'wget', 'python-requests', 'scrapy', 'postman', 'insomnia',
  'httpclient', 'libwww-perl', 'java', 'ruby', 'go-http-client', 'nikto', 'nmap'
];

function isBot(request: NextRequest): boolean {
  const userAgent = request.headers.get('user-agent')?.toLowerCase() || '';

  // 1. Block requests with no User-Agent
  if (!userAgent) return true;

  // 2. Block known scraping tools
  if (BLOCKED_USER_AGENTS.some(bot => userAgent.includes(bot))) return true;

  // 3. Block requests missing common browser headers
  // Our Next.js frontend fetch calls will always include an Accept header
  if (!request.headers.get('accept')) return true;

  return false;
}

// Suspicious patterns (XSS, SQLi, Path Traversal)
const SUSPICIOUS_STRINGS = [
  '<script', 'javascript:', 'vbscript:', 'data:text/html', // XSS
  'union select', 'drop table', 'or 1=1', 'or \'1\'=\'1', // SQLi
  '../', '..%2f', '%2e%2e', '/etc/passwd', 'cmd.exe', '/bin/sh', // Traversal / Execution
  'eval(', 'base64_decode(' // Code injection
];

function isSuspiciousRequest(request: NextRequest): boolean {
  // 1. Method filtering: Our Next.js API only handles GET requests.
  // Blocking POST/PUT/DELETE stops unauthorized mutation attempts.
  if (request.method !== 'GET' && request.method !== 'OPTIONS') {
    return true;
  }

  // 2. URL Inspection for malicious patterns
  const urlStr = request.nextUrl.toString().toLowerCase();
  
  // Quick string matching for blazing fast edge performance
  if (SUSPICIOUS_STRINGS.some(pattern => urlStr.includes(pattern))) {
    return true;
  }

  return false;
}

/**
 * Rate-limiting middleware for /api routes.
 *
 * Limits:
 *   - 30 requests per 60-second window per IP
 *   - Returns 429 Too Many Requests with Retry-After header when exceeded
 *   - Adds standard rate-limit headers to every API response
 *
 * Compatible with Vercel Edge Runtime.
 */

const RATE_LIMIT_CONFIG = {
  maxRequests: 30,
  windowSeconds: 60,
};

function getClientIP(request: NextRequest): string {
  // Vercel / reverse-proxy sets these headers
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  const realIp = request.headers.get('x-real-ip');
  if (realIp) {
    return realIp.trim();
  }
  // Fallback
  return '127.0.0.1';
}

export function middleware(request: NextRequest) {
  // 0. WAF: Suspicious Request Blocking
  if (isSuspiciousRequest(request)) {
    return NextResponse.json(
      { success: false, error: 'Bad Request' },
      { status: 400 } // Don't give clues to attackers
    );
  }

  // 1. Anti-Bot Protection & Request Validation
  if (isBot(request)) {
    return NextResponse.json(
      { success: false, error: 'Access Denied' },
      { status: 403 }
    );
  }

  const ip = getClientIP(request);
  const result = checkRateLimit(`ip:${ip}`, RATE_LIMIT_CONFIG);

  // Standard rate-limit headers
  const rateLimitHeaders: Record<string, string> = {
    'X-RateLimit-Limit': String(result.limit),
    'X-RateLimit-Remaining': String(result.remaining),
    'X-RateLimit-Reset': String(result.resetAt),
  };

  if (!result.allowed) {
    const retryAfter = Math.max(1, result.resetAt - Math.floor(Date.now() / 1000));

    return NextResponse.json(
      {
        success: false,
        error: 'Too many requests. Please try again later.',
      },
      {
        status: 429,
        headers: {
          ...rateLimitHeaders,
          'Retry-After': String(retryAfter),
        },
      },
    );
  }

  // Allowed — continue to the route handler with rate-limit headers
  const response = NextResponse.next();
  Object.entries(rateLimitHeaders).forEach(([key, value]) => {
    response.headers.set(key, value);
  });

  return response;
}

/**
 * Only run this middleware on /api routes.
 * Pages and static assets are not rate-limited.
 */
export const config = {
  matcher: '/api/:path*',
};
