"use client"

import type { IVoucher } from "@/common/types/voucher";
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
import { useDialog } from "@/contexts/DialogContext";
import { formatVietnamTime } from "@/lib/utils";
import { useAppDispatch } from "@/store/store";
import { changeActiveVoucher, removeVoucher } from "@/store/thunks/voucherThunk";
import type { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal, Ticket } from "lucide-react";
import { Link } from "react-router";
import { toast } from "sonner";

export const columns: ColumnDef<IVoucher>[] = [
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
        accessorKey: "voucherCode",
        header: "Code",
        cell: ({ row }) => {
            const voucher = row.original;
            return (
                <p>{voucher.voucherCode}</p>
            )
        }
    },
    {
        accessorKey: "image",
        header: "Image",
        cell: ({ row }) => {
            const voucher = row.original;
            return (
                <>
                    {!voucher.image ? <Ticket /> : <img src={voucher.image} alt="image voucher" className="max-w-[100px]" />}
                </>
            )
        }
    },
    {
        accessorKey: 'minBill',
        header: "Min bill",
        cell: ({ row }) => {
            const voucher = row.original;
            return (
                <p>{voucher.minBill}</p>
            )
        }
    },
    {
        accessorKey: "maxDiscount",
        header: "Max discount",
        cell: ({ row }) => {
            const voucher = row.original;
            return (
                <p>{voucher.maxDiscount}</p>
            )
        }
    },
    {
        accessorKey: "categories",
        header: "Categories",
        cell: ({ row }) => {
            const voucher = row.original;
            return (
                <div className="flex gap-1 flex-wrap max-w-[200px]">
                    {voucher.categories.map((category: any) => (
                        <Badge key={category._id}>{category.name}</Badge>
                    ))}
                </div>
            )
        }
    },
    {
        accessorKey: "discount",
        header: "Discount",
        cell: ({ row }) => {
            const voucher = row.original;
            return (
                <div className="flex gap-1">
                    {voucher.discount}
                    <span>{voucher.typeOfDiscount === 'fixed' ? 'VNĐ' : '%'}</span>
                </div>
            )
        }
    },
    {
        accessorKey: "quantity",
        header: "Quantity",
        cell: ({ row }) => {
            const voucher = row.original;
            return (
                <p>{voucher.quantity}</p>
            )
        }
    },
    // {
    //     accessorKey: "typeOfDiscount",
    //     header: "Type",
    //     cell: ({ row }) => {
    //         const voucher = row.original;
    //         return (
    //             <p>{voucher.typeOfDiscount}</p>
    //         )
    //     }
    // },
    {
        accessorKey: "startDate",
        header: "Start date",
        cell: ({ row }) => {
            const voucher = row.original;
            return (
                <p>{formatVietnamTime(voucher.startDate)}</p>
            )
        }
    },
    {
        accessorKey: "endDate",
        header: "End date",
        cell: ({ row }) => {
            const voucher = row.original;
            return (
                <p>{formatVietnamTime(voucher.endDate)}</p>
            )
        }
    },
    {
        accessorKey: "isActive",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Active
                    <ArrowUpDown />
                </Button>
            )
        },
        cell: ({ row }) => {
            const voucher = row.original;
            return (
                <p>{voucher.isActive ? <Badge className="bg-green-500">Active</Badge> : <Badge variant={'destructive'}>Unactive</Badge>}</p>
            )
        }
    },
    {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => {
            const voucher = row.original;
            const { showDialog } = useDialog();
            const dispatch = useAppDispatch();
            const changeActive = (_id: string) => {
                dispatch(changeActiveVoucher(_id)).unwrap()
                    .then(() => {
                        toast.success('Success');
                    })
                    .catch((error) => {
                        toast.error('Lỗi thay đổi trạng thái voucher');
                        console.log('error', error);
                    })
            }
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
                                onClick={() => changeActive(voucher._id as string)}
                            >
                                <p>{voucher.isActive ? 'Unactive voucher' : 'Active voucher'}</p>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                                <Link to={`edit?idVoucher=${voucher._id}`} className="w-full">
                                    Edit
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onClick={() => showDialog({
                                    description: 'Voucher sẽ bị xóa, có thể ảnh hưởng đến những người dùng',
                                    onConfirm() {
                                        dispatch(removeVoucher({ _id: voucher._id as string })).unwrap()
                                            .then(() => {
                                                toast.success('Success');
                                            })
                                            .catch(() => {
                                                toast.error('Error');
                                            })
                                    },
                                })}
                            >
                                Delete
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </>
            )
        },
    },
]