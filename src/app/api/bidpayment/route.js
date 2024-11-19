import { NextResponse } from "next/server";


export async function PUT(request) {
    try {
        const body = await request.json();
        const cacheBuster = `cache=${Date.now()}`;

        if (!body.token) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }



        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/auction/bid/?${cacheBuster}`, {
            method: "POST",
            maxBodyLength: Infinity,
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Token ${body.token}`
            },
            body: JSON.stringify(body.payload),
        });

        const data = await res.json();
        const status = res.status

        return NextResponse.json({ data, status });
    } catch (error) {
        console.error('Error processing request:', error.message);
        return NextResponse.error(new Error('Internal Server Error'));
    }
}
