"use client"

import type { IUpdateStatus } from "@/common/types/updateStatus";
import { Badge } from "@/components/ui/badge";
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
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
            const status = row.original.status;
            //Chờ xác nhận | Chờ đóng gói | Chờ giao hàng | Đang giao hàng | Thành công | Hủy đơn
            //Pending      |  Processing  |            Shipping            |  Complete  | Cancel

            return (
                <Badge
                    className={`
                        ${status === 'shipping' && 'bg-blue-500 text-white dark:bg-blue-600'} 
                        ${status === 'complete' && 'bg-green-500 text-white dark:bg-green-600'}
                    `}
                    variant={status === 'pending' ? 'default' : status === 'processing' ? 'secondary' : status === 'cancel' ? 'destructive' : undefined}
                >
                    <p className="text-sm">{status}</p>
                </Badge >
            )
        }
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
    },
    {
        accessorKey: "role",
        header: "Role",
        cell: ({ row }) => (
            <div>{row.original.creator.role}</div>
        )
    }
]