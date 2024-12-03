import { NextResponse } from "next/server";


export async function POST(request) {

    // console.log(await request.json())

    const body = await request.json();
    const cacheBuster = `cache=${Date.now()}`;

    /*  console.log(body, 'bodyyy') */

    const myHeaders = {
        "Content-Type": "application/json",
    };




    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/user/contact_us/?${cacheBuster}`, {
        method: 'POST',
        maxBodyLength: Infinity,
        headers: myHeaders,
        body: JSON.stringify(body),
    });

    const contentType = res.headers.get('Content-Type');
    let data;
    let status;

    try {

        if (contentType && contentType.includes('application/json')) {
            data = await res.json();
        } else {

            data = await res.text();
        }

        status = res.status;
    } catch (error) {
        console.error('Error parsing response:', error.message);
        data = null;
        status = 500;
    }

    const responseData = { data, status };

    /*  console.log(data, 'ressssss')

         / console.log(responseData, 'resddddd') */

    return NextResponse.json(responseData);
}


