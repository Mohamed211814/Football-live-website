import { NextResponse } from 'next/server';
import { fetchFootballNews } from '../../utils/sportsdb';

/**
 * GET /api/news
 * Internal secure proxy for football news (latest match results).
 */
export async function GET() {
  try {
    const news = await fetchFootballNews();
    return NextResponse.json(
      { success: true, data: news },
      {
        headers: {
          'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=300',
        },
      },
    );
  } catch {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch news' },
      { status: 500 },
    );
  }
}
