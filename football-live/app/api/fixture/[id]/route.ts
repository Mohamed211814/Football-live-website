import { NextRequest, NextResponse } from 'next/server';
import { fetchFixtureDetails } from '../../../utils/api-football';

/**
 * GET /api/fixture/[id]
 *
 * Internal secure proxy for a single fixture's details.
 * The API-Football key is NEVER exposed to the browser.
 * Results are served from the in-memory cache (30s TTL).
 */
export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;

    if (!id || isNaN(Number(id))) {
      return NextResponse.json(
        { success: false, error: 'Invalid fixture ID' },
        { status: 400 },
      );
    }

    const matchData = await fetchFixtureDetails(id);

    return NextResponse.json(
      { success: true, data: matchData },
      {
        status: 200,
        headers: {
          'Cache-Control': 'public, s-maxage=30, stale-while-revalidate=15',
        },
      },
    );
  } catch (error) {
    console.error('[/api/fixture/[id]] Error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch fixture details' },
      { status: 500 },
    );
  }
}
