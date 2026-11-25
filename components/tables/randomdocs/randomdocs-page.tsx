"use client";
import { useState, useEffect } from "react";
import { columns, RandomDocs } from "./columns";
import { DataTable } from "./data-table";
import { getDataRandomDocs } from "./actions";
import AddRandomDocs from "@/components/forms/add-randomdocs";

export default function RandomDocsPage() {
	const [data, setData] = useState<RandomDocs[]>([]);

	function refreshData() {
		getDataRandomDocs().then((data) => {
			setData(data);
		});
	}

	useEffect(() => {
		refreshData();
	}, []);

	return (
		<>
			<div className="flex flex-1 flex-col gap-4 p-4 pt-0">
				<div className="grid grid-cols-1 items-start auto-rows-min gap-4 md:grid-cols-2">
					<div className="aspect-video rounded-xl bg-muted/50">
						<AddRandomDocs onAdd={refreshData} />
					</div>
					<div className="aspect-video rounded-xl bg-muted/50"></div>
				</div>
				<div className="min-h-[100vh] flex-1 rounded-xl bg-card md:min-h-min">
					<DataTable columns={columns} data={data} />
				</div>
			</div>
		</>
	);
}
