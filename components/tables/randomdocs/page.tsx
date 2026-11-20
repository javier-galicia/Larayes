"use client";
import { useState, useEffect } from "react";
import { columns, RandomDocs } from "./columns";
import { DataTable } from "./data-table";
import { getDataRandomDocs } from "./actions";
import AddRandomDocs from "@/components/forms/add-randomdocs";

export default function DemoPage() {
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
			<div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[320px_minmax(0,1fr)]">
				<AddRandomDocs onAdd={refreshData} />
				<div className="min-w-0 overflow-x-auto">
					<DataTable columns={columns} data={data} />
				</div>
			</div>
		</>
	);
}
