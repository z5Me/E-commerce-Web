"use client"

import type { IProduct } from "@/common/types/product";
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
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import type { AppDispatch } from "@/store/store";
import { AlertDialog } from "@radix-ui/react-alert-dialog";
import type { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router";

export const columns: ColumnDef<IProduct>[] = [
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
        cell: ({ row }) => {
            const product = row.original;
            return (
                <div>#...{product._id?.slice(-4)}</div>
            )
        }
    },
    {
        accessorKey: 'productImage',
        header: "Image",
        cell: ({ row }) => {
            const product = row.original;
            return (
                <img className="aspect-square w-[50px] object-cover rounded-md" src={product.productImage} alt="Product image" />
            )
        }
    },
    {
        accessorKey: "name",
        header: "Name"
    },
    {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => {
            const [dialogOpen, setDialogOpen] = useState(false);
            const product = row.original;
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
                                onClick={() => navigator.clipboard.writeText(product._id as string)}
                            >
                                Copy product ID
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                {/* <Link to={`edit?idAttribute=${attribute._id}`} className="w-full"> */}
                                Edit
                                {/* </Link> */}
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onClick={() => setDialogOpen(true)}
                            >
                                Delete
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
                                // onClick={(e) => {
                                //     e.preventDefault();
                                //     // console.log(attribute._id as string)
                                //     dispatch(removeAttribute({ idAttribute: attribute._id as string })).unwrap().then(() => {
                                //         setTimeout(() => {
                                //             dispatch(setDefaultAttribute());
                                //             setDialogOpen(false);
                                //         }, 100);
                                //     })
                                // }}
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