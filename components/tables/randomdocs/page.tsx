"use client"
import { useState, useEffect } from "react";
import { columns, RandomDocs } from "./columns"
import { DataTable } from "./data-table"

async function getData(): Promise<RandomDocs[]> {
    try {
        const response = await fetch("/api/randomdocs");
        const data: RandomDocs[] = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching data:", error);
        return [];
    }
}

export default function DemoPage() {

  const [data, setData] = useState<RandomDocs[]>([]);

  useEffect(() => {
    getData().then((data) => {
      setData(data);
    });
  },[]);

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  )
}