import { NextResponse } from "next/server";
import Cookies from 'js-cookie'
import { cookies } from "next/headers";
import cookie from "cookie";


export async function PUT(request) {
    try {
        const body = await request.json();
        const cacheBuster = `cache=${Date.now()}`;

        if (!body.token) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/user/fund_wallet/?${cacheBuster}`, {
            method: "PUT",
            maxBodyLength: Infinity,
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Token ${body.token}`
            },
            body: JSON.stringify(body.payload),
        });

        const data = await res.json();
        const status = res.status;

        return NextResponse.json({ data, status });
    } catch (error) {
        console.error('Error processing request:', error.message);
        return NextResponse.error(new Error('Internal Server Error'));
    }
}
