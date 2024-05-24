import { NextResponse } from "next/server";

export async function GET(req, res) {
    try {
        return NextResponse.json({ data: 'data' });
    } catch (error) {
        return NextResponse.error(new Error('Internal Server Error'));
    }
}
