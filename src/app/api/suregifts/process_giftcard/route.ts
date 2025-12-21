import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const token = request.headers.get("Authorization")?.split(" ")[1];
        const body = await request.json();

        /*  console.log(token, "token") */


        // console.log(body, "body")


        if (!token) {
            return NextResponse.json(
                { status: "failed", message: "No token provided" },
                { status: 401 }
            );
        }

        if (!body.auction_id || !body.productCode) {
            return NextResponse.json(
                { status: "failed", message: "Missing required fields" },
                { status: 400 }
            );
        }

        const response = await fetch(
            "https://staging.ajiroba.ng/v1/pay/suregifts/process_giftcard/",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `token ${token}`,
                },
                body: JSON.stringify({
                    auction_id: body.auction_id,
                    productCode: body.productCode,
                    ticket_id: body.ticket_id,
                    merchant_name: body.merchant_name,
                }),
            }
        );

        const data = await response.json();

        // console.log(data, "data")

        if (!response.ok) {
            return NextResponse.json(
                { status: "failed", message: data.message || "Failed to process gift card" },
                { status: response.status }
            );
        }

        return NextResponse.json(data);
    } catch (error) {
        console.error("Error processing gift card:", error);
        return NextResponse.json(
            { status: "failed", message: "Internal server error" },
            { status: 500 }
        );
    }
}