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

    let offset = 0;
    if (dateParam) {
      const parsed = new Date(dateParam);
      if (!isNaN(parsed.getTime())) {
        // Calculate the difference in days from today
        const today = new Date();
        const diffTime = parsed.getTime() - today.getTime();
        offset = Math.round(diffTime / (1000 * 60 * 60 * 24));
      }
    }

    const leagues = await fetchFixtures(offset);

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
