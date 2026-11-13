"use client"
import { useState, useEffect } from "react";
import { columns, RandomDocs } from "./columns"
import { DataTable } from "./data-table"
import { getDataRandomDocs } from "./actions"


export default function DemoPage() {

  const [data, setData] = useState<RandomDocs[]>([]);

  useEffect(() => {
      getDataRandomDocs().then((data) => {
        setData(data);
      });
    },[]);

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  )
}