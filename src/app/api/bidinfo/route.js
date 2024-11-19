// import { NextResponse } from "next/server";

// export async function POST(request) {

//     // console.log(request, 'reqqqqqqqllll')
//     try {
//         const body = await request.json();
//         const cacheBuster = `cache=${Date.now()}`;

//         console.log(body, 'bodyyyyyy')

//         const headers = {
//             "Content-Type": "application/json",
//         };

//         // Conditionally add Authorization header
//         if (body.tkn) {
//             headers['Authorization'] = `token ${body.tkn}`;
//         }

//         const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/auction/bid_info/?${cacheBuster}`, {
//             method: "GET",
//             maxBodyLength: Infinity,
//             headers: headers, // Use the dynamically created headers object
//             body: JSON.stringify({
//                 "auction_id": body.payload.auction_id,
//             }),
//         });

//         console.log(res, 'resssssssssss')

//         const data = await res.json();
//         const status = res.status;

//         return NextResponse.json({ data, status });
//     } catch (error) {
//         console.error('Error processing request:', error.message);
//         return NextResponse.error(new Error('Internal Server Error'));
//     }
// }


import { NextResponse } from "next/server";

export async function GET(request) {

    const authorizationHeader = request.headers.get('Authorization');

    const tkn = request.headers.get('Params')
    console.log(tkn, 'tkn')
    const cacheBuster = `cache=${Date.now()}`;


    if (!authorizationHeader) {
        console.error("Token is undefined");
        return;
    }

    const myHeaders = {
        'Authorization': `token ${authorizationHeader}`
    };

    console.log(tkn, 'tkn')


    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/auction/bid_info/?auction_id=${tkn}`, {
        method: 'GET',
        headers: myHeaders,
        redirect: "follow",
        cache: "no-cache"
    });

    // if (!res.ok) {
    //     console.error('Failed to fetch data:', res.status, res.statusText);
    //     return NextResponse.error(`Failed to fetch data: ${res.status} ${res.statusText}`);
    // }

    const contentType = res.headers.get('Content-Type');
    let data;
    let status;

    try {
        if (res.body === null || res.body === undefined || res.bodyUsed) {
            data = null;
            status = res.status;
        } else if (contentType && contentType.includes('application/json')) {
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
    // console.log(responseData, 'respondata---app')
    return NextResponse.json(responseData);


}

