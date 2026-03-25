import { NextResponse } from "next/server";
import Cookies from 'js-cookie'
import { cookies } from "next/headers";
import cookie from "cookie";
// import { cookies } from 'next/headers'

export async function PUT(request) {
    // console.log(request, 'requestttt')
    try {
        const body = await request.json();
        // console.log(body, 'bodyyyyy')
        const cacheBuster = `cache=${Date.now()}`;
        /*    const allCookies = cookies().getAll(); */

        /*     const cookieStore = cookies()
            const tkn = cookieStore.get('token_new')

            console.log(tkn, 'tkn')

            const cookies = cookie.parse(request.headers.get('cookie') || '');

            const usertokennew = cookies.token; */

        /*   console.log(usertokennew, 'usertoken');

          console.log(cookies, 'cookies') */
        // Parse cookies from the request headers
        /*     const usertoken = Cookies.get('token') */
        // const cookies = cookie.parse(request.headers.get('cookie') || '');
        /*   const token = cookies.token; */

        // console.log(usertoken, 'usertoken')
        /*   console.log(Cookies.get())
          console.log(allCookies, 'allCookies') */


        if (!body.token) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }



        const paylod_data = {
            comment: body.payload?.review,
            rating: body.payload?.selectedRating,
        }

        // console.log(paylod_data, 'payloadddd_datatat')

        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/user/create_order_review/${body?.payload?.order_Id}/?${cacheBuster}`, {
            method: "POST",
            maxBodyLength: Infinity,
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Token ${body.token}`
            },
            body: JSON.stringify(paylod_data),
        });

        // Parse response body as JSON
        const data = await res.json();
        const status = res.status;

        // console.log(data, status)

        // Return JSON response with data and status
        return NextResponse.json({ data, status });
    } catch (error) {
        // Handle any errors gracefully
        console.error('Error processing request:', error.message);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
