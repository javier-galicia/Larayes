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
			<AddRandomDocs onAdd={refreshData} />
			<div className="container mx-auto py-10">
				<DataTable columns={columns} data={data} />
			</div>
		</>
	);
}
