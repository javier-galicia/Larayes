"use server";
import clientPromise from "@/lib/mongodb";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

const randomDocSchema = z.object({
    header: z.string().max(100),
    type: z.string().max(50).min(5),
    status: z.string().max(50),
    target: z.number().int().optional(),
    limit: z.number().int().optional(),
    reviewer: z.string().max(100),
});

/*function optionalNumber(value: FormDataEntryValue | null) {
    if (value === null || value === "") return undefined;
    return typeof value === "string" ? Number(value) : value;
}*/

export async function getDataRandomDocs() {
	try {
		const client = await clientPromise;
		const docs = await client
			.db("example_prisma")
			.collection("randomdocs")
			.find({})
			.toArray();

		return docs.map((doc) => {
			return {
				header: doc.header,
				type: doc.type,
				status: doc.status,
				target: doc.target,
				limit: doc.limit,
				reviewer: doc.reviewer,
			};
		});
	} catch (error) {
		console.log("Error fetching data:", error);
		return [];
	}
}

export async function addRandomDoc(formData: FormData) {
	const data = randomDocSchema.parse({
		header: String(formData.get("header") ?? ""),
		type: String(formData.get("type") ?? ""),
		status: String(formData.get("status") ?? ""),
		target: formData.get("target") ? Number(formData.get("target")) : undefined,
		limit: formData.get("limit") ? Number(formData.get("limit")) : undefined,
		reviewer: String(formData.get("reviewer") ?? ""),
	});

	try {
		const client = await clientPromise;
		await client.db("example_prisma").collection("randomdocs").insertOne(data);
	} catch (error) {
		console.error("Error inserting document:", error);
		throw error;
	}
	revalidatePath("/prueba");
	redirect("/prueba");
}
