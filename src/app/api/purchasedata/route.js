import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function PUT(request) {
    try {
        const body = await request.json();
        const cacheBuster = `cache=${Date.now()}`;
        const cookieStore = await cookies()
        const token = cookieStore.get('token')
        /* const token = cookieStore.get("token")?.value; */

        /* console.log(token.value, 'tokennn') */

        /*      if (!token || !body.token) {
                 return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
             } */

        if (!token) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const requestPayload = {
            ...(body?.payload || {}),
            dataBundle:
                body?.payload?.dataBundle ||
                body?.payload?.bundle ||
                body?.payload?.package ||
                body?.payload?.datadata ||
                body?.dataBundle ||
                "selected bundle",
        };

        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/pay/nomba/buy_data/?${cacheBuster}`, {
            method: "POST",
            maxBodyLength: Infinity,
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Token ${token.value}`
            },
            body: JSON.stringify(requestPayload),
        });

        const data = await res.json();
        const status = res.status

        return NextResponse.json({ data, status });
    } catch (error) {
        console.error('Error processing request:', error.message);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
