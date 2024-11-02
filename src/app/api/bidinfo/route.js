import { NextResponse } from "next/server";

export async function POST(request) {

    console.log(request, 'reqqqqqqqllll')
    try {
        const body = await request.json();
        const cacheBuster = `cache=${Date.now()}`;

        console.log(body, 'bodyyyyyy')

        const headers = {
            "Content-Type": "application/json",
        };

        // Conditionally add Authorization header
        if (body.tkn) {
            headers['Authorization'] = `token ${body.tkn}`;
        }

        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/auction/bid_info/?${cacheBuster}`, {
            method: "GET",
            maxBodyLength: Infinity,
            headers: headers, // Use the dynamically created headers object
            body: JSON.stringify({
                "auction_id": body.payload.auction_id,
            }),
        });

        console.log(res, 'resssssssssss')

        const data = await res.json();
        const status = res.status;

        return NextResponse.json({ data, status });
    } catch (error) {
        console.error('Error processing request:', error.message);
        return NextResponse.error(new Error('Internal Server Error'));
    }
}
