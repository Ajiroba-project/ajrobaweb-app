import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(request) {
    try {
        const body = await request.json();
        const cacheBuster = `cache=${Date.now()}`;

        /*        const token_ = request.headers.get('authorization')?.replace('Token ', ''); */

        const cookieStore = await cookies()
        const token = cookieStore.get('token')

        console.log(token_, 'token_');

        /*     console.log(body, 'bodyyy');
            console.log(body.payload);
            console.log(body.tkn); */

        // Create headers object dynamically

        // console.log(body, 'bodyyy');
        const headers = {
            "Content-Type": "application/json",
        };

        // Conditionally add Authorization header
        if (token.value) {
            headers['Authorization'] = `token ${token.value}`;
        }

        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/commerce/cart/?${cacheBuster}`, {
            method: "GET",
            maxBodyLength: Infinity,
            headers: headers, // Use the dynamically created headers object
            body: JSON.stringify({
                /*   "product_id": body.payload.product_id,
                  "quantity": body.payload.quantity,
                  "session_key": body.payload.session_key, */
                "session_key": 'body.payload.session_key',
            }),
        });

        const data = await res.json();
        const status = res.status;

        return NextResponse.json({ data, status });
    } catch (error) {
        console.error('Error processing request:', error.message);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
