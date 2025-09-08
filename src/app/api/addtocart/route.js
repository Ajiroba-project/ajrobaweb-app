import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        const body = await request.json();
        const cacheBuster = `cache=${Date.now()}`;

        const headers = {
            "Content-Type": "application/json",
        };

        // Conditionally add Authorization header
        if (body.tkn) {
            headers['Authorization'] = `token ${body.tkn}`;
            
        }

  /*       console.log({
            "product_id": body.payload.product_id,
            "quantity": body.payload.quantity,
            "session_key": body.payload.session_key,
        }, 'body', `${process.env.NEXT_PUBLIC_BASE_URL}/commerce/add_to_cart/`) */

        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/commerce/add_to_cart/?${cacheBuster}`, {
            method: "POST",
            maxBodyLength: Infinity,
            headers: headers, // Use the dynamically created headers object
            body: JSON.stringify({
                "product_id": body.payload.product_id,
                "quantity": body.payload.quantity,
                "session_key": body.payload.session_key,
            }),
        });

        const data = await res.json();
        const status = res.status;

       /*  console.log(data, 'data') */

        return NextResponse.json({ data, status });
    } catch (error) {
        console.error('Error processing request:', error.message);
        return NextResponse.error(new Error('Internal Server Error'));
    }
}
