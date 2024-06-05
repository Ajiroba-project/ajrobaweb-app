// import { NextResponse } from "next/server";

// export async function POST(request) {
//     try {
//         const body = await request.json();
//         const cacheBuster = `cache=${Date.now()}`;

//         const res = await fetch(`${process.env.BASE_URL}/auth/signin/?${cacheBuster}`, {
//             method: 'POST',
//             maxBodyLength: Infinity,
//             headers: {
//                 "Content-Type": "application/json",
//             },
//             body: JSON.stringify(body),
//         });

//         // Parse response body as JSON
//         const data = await res.json();
//         const status = res.status;

//         // Return JSON response with data and status
//         console.log(data)
//         return NextResponse.json({ data, status });
//     } catch (error) {
//         console.log(error)
//         // Handle any errors gracefully
//         console.error('Error processing request:', error.message);
//         return NextResponse.error(new Error('Internal Server Error'));
//     }
// }


import { NextResponse } from "next/server";


export async function POST(request) {

    // console.log(await request.json())

    const body = await request.json();
    const cacheBuster = `cache=${Date.now()}`;

    // console.log(body, 'bodyyy')

    const myHeaders = {
        "Content-Type": "application/json",
    };




    const res = await fetch(`${process.env.BASE_URL}/auth/signin/?${cacheBuster}`, {
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


