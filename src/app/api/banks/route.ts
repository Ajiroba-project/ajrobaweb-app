import { NextResponse } from "next/server";

export async function GET(request: Request) {
    try {
        const token = request.headers.get("Authorization")?.split(" ")[1];

        if (!token) {
            return NextResponse.json(
                { status: "failed", message: "No token provided" },
                { status: 401 }
            );
        }

        const response = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_URL}/pay/nomba/banks/`,
            {
                headers: {
                    Authorization: `token ${token}`,
                },
            }
        );

        const data = await response.json();

        if (!response.ok) {
            return NextResponse.json(
                { status: "failed", message: data.message || "Failed to fetch merchants" },
                { status: response.status }
            );
        }

        return NextResponse.json(data);
    } catch (error) {
        console.error("Error fetching merchants:", error);
        return NextResponse.json(
            { status: "failed", message: "Internal server error" },
            { status: 500 }
        );
    }
}