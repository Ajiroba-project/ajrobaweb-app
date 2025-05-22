import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const token = request.headers.get("Authorization")?.split(" ")[1];

        const body = await request.json();

          /*   console.log(body, "body") */

            // console.log(token, "token")

        if (!token) {
            return NextResponse.json(
                { status: "failed", message: "No token provided" },
                { status: 401 }
            );
        }

        const response = await fetch(
            "https://staging.ajiroba.ng/v1/pay/nomba/cashout/",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `token ${token}`,
                },
                body: JSON.stringify(body)
            }
        );

        const data = await response.json();

        console.log(data, "data")

        if (!response.ok) {
            return NextResponse.json(
                { status: "failed", message: data.message || "Failed to fetch bank account details" },
                { status: response.status }
            );
        }

        return NextResponse.json(data);
    } catch (error) {
        console.error("Error fetching bank account details:", error);
        return NextResponse.json(
            { status: "failed", message: "Internal server error" },
            { status: 500 }
        );
    }
}