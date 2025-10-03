import { NextRequest, NextResponse } from 'next/server';

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { ticket_id, auction_id, redemption_mode } = body;

    // Get the authorization token from the request headers
    const authHeader = request.headers.get('authorization');
    if (!authHeader) {
      return NextResponse.json(
        { status: 'failed', message: 'Authorization token is required' },
        { status: 401 }
      );
    }

    // Make the API call to the external service
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/user/redeem_by_delivery/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': authHeader,
      },
      body: JSON.stringify({
        ticket_id,
        auction_id,
        redemption_mode,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      return NextResponse.json(data, { status: 200 });
    } else {
      return NextResponse.json(data, { status: response.status });
    }
  } catch (error) {
    console.error('Error in redeem-by-delivery API:', error);
    return NextResponse.json(
      { status: 'failed', message: 'Internal server error' },
      { status: 500 }
    );
  }
}
