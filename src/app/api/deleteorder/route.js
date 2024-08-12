import { NextResponse } from "next/server";


export async function PUT(request) {
    // console.log(request, 'requestttt')
    try {
        const body = await request.json();
        console.log(body, 'bodyyyyy')
        const cacheBuster = `cache=${Date.now()}`;


        if (!body.token) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }



        const paylod_data = {
            comment: body.payload?.review,
            rating: body.payload?.selectedRating,
        }


        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/user/delete_order/${body?.payload?.order_Id}/?${cacheBuster}`, {
            method: "DELETE",
            maxBodyLength: Infinity,
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Token ${body.token}`
            },
            /*  body: JSON.stringify(paylod_data), */
        });

        // Parse response body as JSON
        const data = await res.json();
        const status = res.status;

        console.log(data, status)

        // Return JSON response with data and status
        return NextResponse.json({ data, status });
    } catch (error) {
        // Handle any errors gracefully
        console.error('Error processing request:', error.message);
        return NextResponse.error(new Error('Internal Server Error'));
    }
}
