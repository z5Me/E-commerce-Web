"use client"

import type { IUpdateStatus } from "@/common/types/updateStatus";
import { Checkbox } from "@/components/ui/checkbox";
import { formatVietnamTime } from "@/lib/utils";
import type { ColumnDef } from "@tanstack/react-table";

//Sửa đoạn này 
export const columnsStatus: ColumnDef<IUpdateStatus>[] = [
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && "indeterminate")
                }
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "title",
        header: "Title"
    },
    {
        accessorKey: "desc",
        header: "Description",
    },
    {
        accessorKey: "date",
        header: "Date",
        cell: ({ row }) => {
            const date = formatVietnamTime(row.original.date as Date);
            return (
                <div>{date.toLocaleString()}</div>
            )
        }
    },
    {
        accessorKey: "creater",
        header: "Creater",
        cell: ({ row }) => (
            <div>{row.original.creator.name}</div>
        )
    }
]