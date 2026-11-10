"use client"

import { createColumnHelper } from "@tanstack/react-table"

import { type DataTableFeatures } from "./data-table-features"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export type RandomDocs = {
    header: string
    type: string
    status: string
    target: number
    limit: number
    reviewer: string
}
// Use `accessor` for data columns and `display` for columns without one.
const columnHelper = createColumnHelper<DataTableFeatures, RandomDocs>()

export const columns = columnHelper.columns([
    columnHelper.accessor("status", {
        header: "Status",
    }),
    columnHelper.accessor("header", {
        header: "Header",
    }),
    columnHelper.accessor("type", {
        header: "Type",
    }),
])