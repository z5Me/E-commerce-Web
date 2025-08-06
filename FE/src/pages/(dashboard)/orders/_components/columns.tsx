"use client"

import type { IOrder } from "@/common/types/order";
import {
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { useAppDispatch } from "@/store/store";
import { AlertDialog } from "@radix-ui/react-alert-dialog";
import type { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";

//Sửa đoạn này 
export const columns: ColumnDef<IOrder>[] = [
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
        accessorKey: "orderCode",
        header: "Order Code"
    },
    {
        accessorKey: "receiver",
        header: "Receiver",
        cell: ({ row }) => (
            <div>{row.original.address.receiver}</div>
        )
    },
    {
        accessorKey: "phone",
        header: "Phone",
        cell: ({ row }) => (
            <div>{row.original.address.phone}</div>
        )
    },
    {
        accessorKey: "address",
        header: "Address",
        cell: ({ row }) => (
            <div>{row.original.address.addressName}</div>
        )
    },
    {
        accessorKey: "payment",
        header: "Payment",
        cell: ({ row }) => (
            <div className="uppercase">{row.original.payment}</div>
        )
    },
    {
        accessorKey: "total",
        header: "Total",
        cell: ({ row }) => (
            <div>{row.original.total}$</div>
        )
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
            const status = row.original.status;
            //Chờ xác nhận | Chờ đóng gói | Chờ giao hàng | Đang giao hàng | Thành công | Hủy đơn
            //Pending      |  Processing  |            Shipping            |  Complete  | Cancel
            const updateStatus = row.original.updateStatus;
            const latestUpdate = updateStatus?.reduce((acc, curr) => {
                return new Date(curr.date) > new Date(acc.date) ? curr : acc;
            });

            // console.log('latestUpdate', latestUpdate)
            return (
                <Badge
                    className={`${status === 'shipping' && 'bg-blue-500 text-white dark:bg-blue-600'}`}
                    variant={status === 'pending' ? 'default' : status === 'processing' ? 'secondary' : status === 'cancel' ? 'destructive' : undefined}
                >
                    <p className="text-sm">{latestUpdate.title}</p>
                </Badge >
            )
        }
    },
    {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => {
            const [dialogOpen, setDialogOpen] = useState(false);
            const order = row.original;
            const dispatch = useAppDispatch();
            return (
                <>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem
                                onClick={() => navigator.clipboard.writeText(order.orderCode as string)}
                            >
                                Copy Order Code
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                                <Link to={`updatestatus?orderCode=${order.orderCode}`}>
                                    Update Status
                                </Link>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>

                    <AlertDialog open={dialogOpen} onOpenChange={setDialogOpen}>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                <AlertDialogDescription>
                                    This action cannot be undone. This will permanently delete your
                                    account and remove your data from our servers.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                    onClick={(e) => {
                                        e.preventDefault();
                                    }}
                                >
                                    Continue
                                </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog >
                </>
            )
        },
    },
]