import { NextResponse } from "next/server";
// import ls from "localstorage-slim";

export async function POST(request) {
    const body = await request.json();



    const cacheBuster = `cache=${Date.now()}`;


    const myHeaders = {
        "Content-Type": "application/json",
        // "Authorization": `token ${authorizationHeader}`
    };



    const res = await fetch(`${process.env.BASE_URL}/auth/signup_admin/?${cacheBuster}`, {
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
    // console.log(responseData, 'responsedatata')
    return NextResponse.json(responseData);
}



