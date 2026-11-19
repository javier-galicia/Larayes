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
			<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
				<div className="col">
					<AddRandomDocs onAdd={refreshData} />
				</div>

				<div className="col">
					<DataTable columns={columns} data={data} />
				</div>
			</div>
		</>
	);
}
