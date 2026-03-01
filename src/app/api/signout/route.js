import { NextResponse } from "next/server";
import Cookies from "js-cookie";
import { cookies } from "next/headers";

export async function POST(request) {
  try {
    const cacheBuster = `cache=${Date.now()}`;

    const cookieStore = cookies();
    const token = cookieStore.get("token")?.value;

  /*   console.log(token, 'token') */

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/auth/signout/?${cacheBuster}`,
      {
        method: "POST",
        maxBodyLength: Infinity,
        headers: {
          "Content-Type": "application/json",
          Authorization: `token ${token}`,
        },
      }
    );

    const status = res.status;

    const data =  await res.json()

    //  console.log(data, 'data')

    // console.log(status, 'status') 

    return NextResponse.json({ status });
  } catch (error) {
    console.error("Error processing request:", error.message);
    return NextResponse.error(new Error("Internal Server Error"));
  }
}
