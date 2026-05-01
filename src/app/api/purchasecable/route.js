import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function PUT(request) {
    try {
        const body = await request.json();
        const cacheBuster = `cache=${Date.now()}`;
        const cookieStore = await cookies()
        const token = cookieStore.get('token')

        if (!token) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const upstreamPayload = {
            ...body.payload,
            package:
                body.payload?.package ??
                body.package ??
                "",
        };

        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/pay/nomba/cable_subscription/?${cacheBuster}`, {
            method: "POST",
            maxBodyLength: Infinity,
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Token ${token.value}`
            },
            body: JSON.stringify(upstreamPayload),
        });

        const data = await res.json();
        const status = res.status

        return NextResponse.json({ data, status });
    } catch (error) {
        console.error('Error processing request:', error.message);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
