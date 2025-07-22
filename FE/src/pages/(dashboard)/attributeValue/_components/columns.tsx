"use client"

import { useGetParams } from "@/common/hooks/useGetParams";
import type { IAttributeValue } from "@/common/types/attributeValue";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { setDefaultAttribute } from "@/store/slices/attributeSlice";
import type { AppDispatch } from "@/store/store";
import { removeAttributeValue } from "@/store/thunks/attributeValueThunk";
import type { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router";

//Làm interface và thay thế IAttrbute

export const columns: ColumnDef<IAttributeValue>[] = [
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
        accessorKey: "value",
        header: "Value",
        cell: ({ row }) => {
            const value = row.original;

            if (value.type === 'color') {
                return (
                    <div className="w-6 h-6 rounded" style={{ backgroundColor: value.value }}></div>
                )
            }
            return (
                <Badge >
                    {value.value}
                </Badge>
            )
        }
    },
    {
        accessorKey: "slug",
        header: "Slug   ",
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const attributeValue = row.original;
            const { idAttribute } = useGetParams(['idAttribute']);
            const [dialogOpen, setDialogOpen] = useState(false);
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
                                onClick={() => { navigator.clipboard.writeText(attributeValue._id as string) }}
                            >
                                Copy payment ID
                            </DropdownMenuItem>
                            {/* <DropdownMenuSeparator /> */}
                            <DropdownMenuItem>
                                <Link to={`edit?idAttribute=${idAttribute}&idAttributeValue=${attributeValue._id}`} className="w-full">
                                    Edit
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onSelect={() => {
                                    setDialogOpen(true);
                                }}
                            >
                                Delete
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu >

                    <AlertDialog open={dialogOpen} onOpenChange={setDialogOpen}>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                <AlertDialogDescription>
                                    This action cannot be undone. This will permanently delete your
                                    item and remove it from our system.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                    onClick={() => {
                                        // Xử lý xóa
                                        dispatch(removeAttributeValue({ idAttribute: idAttribute as string, idAttributeValue: attributeValue._id })).unwrap().then(() => {
                                            setDialogOpen(false);
                                            setTimeout(() => {
                                                dispatch(setDefaultAttribute());
                                            }, 100);
                                        })
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