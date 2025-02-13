// import { NextResponse, NextRequest } from "next/server";

// // Explicitly mark this API route as dynamic
// export const dynamic = 'force-dynamic';

// export async function GET(request) {
//     try {
//         const token_ = request.headers.get('authorization')?.replace('Token ', '');
//         const id = request.headers.get('order_id');

//         console.log(id, 'id')
//         console.log(token_, 'token_')

//         if (!token_) {
//             return NextResponse.json({ error: 'Token is required' }, { status: 400 });
//         }

//         const cacheBuster = `cache=${Date.now()}`;
//         const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/user/transaction_receipt/${id}?${cacheBuster}`, {
//             method: "GET",
//             headers: {
//                 "Content-Type": "application/json",
//                 'Authorization': `Token ${token_}`
//             }
//         });

//         if (!res.ok) {
//             const errorData = await res.json();
//             return NextResponse.json({ error: errorData.message || 'An error occurred' }, { status: res.status });
//         }

//         const data = await res.json();
//         const status = res.status;

//         console.log(data, 'data')
//         console.log(status, 'status')



//         return NextResponse.json({ data, status });
//     } catch (error) {
//         console.error('Error processing request:', error.message);
//         return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
//     }
// }



import { NextResponse } from "next/server";

// Explicitly mark this API route as dynamic
export const dynamic = 'force-dynamic';

export async function GET(request) {
    try {
        // Extract the token from the query parameters or headers

        const token_ = request.headers.get('authorization')?.replace('Token ', '');
        const id = request.headers.get('order_id');

        console.log(id, 'id')
        /*     console.log(request.headers, 'id')

        console.log

            console.log(token_, 'token_')
            console.log(id, 'id')
     */
        if (!token_) {
            return NextResponse.json({ error: 'Token is required' }, { status: 400 });
        }

        // https://ajiroba.onrender.com/v1/user/view_purchase_order/<order_id>/

        const cacheBuster = `cache=${Date.now()}`;
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/user/transaction_receipt/${id}?${cacheBuster}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Token ${token_}`
            }
        });

        // Check if the response is OK
        if (!res.ok) {
            const errorData = await res.json();
            return NextResponse.json({ error: errorData.message || 'An error occurred' }, { status: res.status });
        }

        // Parse response body as JSON
        const data = await res.json();
        const status = res.status;

        // console.log(data, 'data')

        // Return JSON response with data and status
        return NextResponse.json({ data, status });
    } catch (error) {
        // Handle any errors gracefully
        console.error('Error processing request:', error.message);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

