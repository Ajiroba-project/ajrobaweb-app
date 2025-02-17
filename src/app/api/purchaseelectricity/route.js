import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function PUT(request) {
    try {
        const body = await request.json();
        const cacheBuster = `cache=${Date.now()}`;
        const cookieStore = cookies()
        const token = cookieStore.get('token')

        /*     console.log(token, 'token')
            console.log(body.payload, 'body')
    
     */

        if (!token) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/pay/nomba/buy_electric_disco/?${cacheBuster}`, {
            method: "POST",
            maxBodyLength: Infinity,
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Token ${token.value}`
            },
            body: JSON.stringify(body.payload),
        });

        const data = await res.json();
        const status = res.status

        /*      console.log(data, 'data')
             console.log(status, 'status')
      */

        return NextResponse.json({ data, status });
    } catch (error) {
        console.error('Error processing request:', error.message);
        return NextResponse.error(new Error('Internal Server Error'));
    }
}
