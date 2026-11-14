"use client"
import { useState, useEffect } from "react";
import { columns, RandomDocs } from "./columns"
import { DataTable } from "./data-table"
import { addRandomDoc, getDataRandomDocs } from "./actions"

export default function DemoPage() {

  const [data, setData] = useState<RandomDocs[]>([]);

  useEffect(() => {
      getDataRandomDocs().then((data) => {
        setData(data);
      });
    },[]);

  return (
    <>
    <form action={addRandomDoc}>
      <input type="text" name="header" placeholder="Header" />
      <input type="text" name="type" placeholder="Type" />
      <input type="text" name="status" placeholder="Status" />
      <input type="number" name="target" placeholder="Target" />
      <input type="number" name="limit" placeholder="Limit" />
      <input type="text" name="reviewer" placeholder="Reviewer" />
      <button type="submit">Add Random Doc</button>
    </form>
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
    </>
  )
}