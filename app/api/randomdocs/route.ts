import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function GET() {
    try {
        const client = await clientPromise;
        const db = client.db("example_prisma");
        const randomdocs = await db
        .collection("randomdocs")
        .find({}).toArray();

        return NextResponse.json(randomdocs);
    } catch {
        return NextResponse.json(
        { error: "Failed to fetch randomdocs" },
        { status: 500 }
        );
    }
}


