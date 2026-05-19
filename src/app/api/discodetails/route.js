


import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(request) {
    try {
        /*       const body = await request.json(); */
        const cacheBuster = `cache=${Date.now()}`;

        const cookieStore = await cookies()
        const token = cookieStore.get('token')

        const { searchParams } = new URL(request.url);

        const disco = searchParams.get("disco");
        const customerId = searchParams.get("customerId");

        console.log(disco, customerId)


        const headers = {
            "Content-Type": "application/json",
        };

        if (token.value) {
            headers['Authorization'] = `token ${token.value}`;
        }
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/pay/nomba/electric_customer_details?customerId=${customerId}&disco=${disco}&${cacheBuster}`, {
            method: "GET",
            maxBodyLength: Infinity,
            headers: headers,

        });

        const data = await res.json();
        const status = res.status;

        return NextResponse.json({ data, status });
    } catch (error) {
        console.error('Error processing request:', error.message);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
