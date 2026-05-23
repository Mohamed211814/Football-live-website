import { NextRequest, NextResponse } from 'next/server';
import { fetchFixtures } from '../../utils/api-football';

/**
 * GET /api/fixtures?date=YYYY-MM-DD
 *
 * Internal secure proxy for fixture data.
 * The API-Football key is NEVER exposed to the browser.
 * Results are served from the in-memory cache (60s TTL).
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const dateParam = searchParams.get('date');

    let targetDate = new Date();
    if (dateParam) {
      const parsed = new Date(dateParam);
      if (!isNaN(parsed.getTime())) {
        targetDate = parsed;
      }
    }

    const leagues = await fetchFixtures(targetDate);

    return NextResponse.json(
      { success: true, data: leagues },
      {
        status: 200,
        headers: {
          // Allow browsers to cache responses for 60s
          'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=30',
        },
      },
    );
  } catch (error) {
    console.error('[/api/fixtures] Error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch fixtures' },
      { status: 500 },
    );
  }
}
