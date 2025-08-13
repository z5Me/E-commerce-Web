"use client"

import type { ICategory } from "@/common/types/category";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { useDialog } from "@/contexts/DialogContext";
import type { AppDispatch } from "@/store/store";
import { removeCategory } from "@/store/thunks/categoriesThunk";
import type { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { useDispatch } from "react-redux";
import { Link } from "react-router";

//Làm interface và thay thế IAttrbute

export const columns: ColumnDef<ICategory>[] = [
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
        accessorKey: "_id",
        header: "ID",
    },
    {
        accessorKey: "name",
        header: "Name",
    },
    {
        accessorKey: "slug",
        header: "Slug   ",
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const category = row.original;
            const { showDialog } = useDialog();
            const dispatch = useDispatch<AppDispatch>();

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
                                onClick={() => { navigator.clipboard.writeText(category._id as string) }}
                            >
                                Copy payment ID
                            </DropdownMenuItem>
                            {/* <DropdownMenuSeparator /> */}
                            <DropdownMenuItem>
                                <Link to={``} className="w-full">
                                    Edit
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onSelect={() => {
                                    showDialog({
                                        title: 'Bạn chắc chứ',
                                        description: 'Những sản phẩm có gắn danh mục này sẽ bị ảnh hưởng!',
                                        onConfirm() {
                                            dispatch(removeCategory(category._id as string))
                                        },
                                    })
                                }}
                            >
                                Delete
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu >
                </>
            )
        },
    },
]