"use server"
import clientPromise from "@/lib/mongodb";

export async function getDataRandomDocs() {
    try {
        const client = await clientPromise;
        const docs = await client
                .db("example_prisma")
                .collection("randomdocs")
                .find({})
                .toArray();
        
        return docs.map((doc) => ({
          //  id: doc._id.toString(),
            header: doc.header,
            type: doc.type,
            status: doc.status,
            target: doc.target,
            limit: doc.limit,
            reviewer: doc.reviewer,
        }));
    } catch (error) {
        console.log("Error fetching data:", error);
        return [];
    }
}