"use client"

import type { IAttribute } from "@/common/types/attribute";
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
import { setDefaultAttribute } from "@/store/slices/attributeSlice";
import type { AppDispatch } from "@/store/store";
import { removeAttribute } from "@/store/thunks/attributeThunk";
import { AlertDialog } from "@radix-ui/react-alert-dialog";
import type { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router";

export const columns: ColumnDef<IAttribute>[] = [
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
        accessorKey: "type",
        header: "Type",
    },
    {
        accessorKey: "terms",
        header: "Terms",
        cell: ({ row }) => {
            const attribute = row.original;

            return (
                <div className="w-fit flex flex-col justify-between gap-1">
                    {(attribute.terms && attribute.terms.length > 0)
                        ?
                        <div className="flex gap-1">
                            {attribute.terms.map((item: any) => (
                                <Badge key={item.name}>
                                    {item.name}
                                </Badge>
                            ))}
                        </div>
                        :
                        <p>-</p>
                    }
                    <Link to={`terms?idAttribute=${attribute._id}`}>
                        <p className="text-blue-500 underline w-fit">Configure terms</p>
                    </Link>
                </div>
            )
        }
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const attribute = row.original;
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
                                onClick={() => navigator.clipboard.writeText(attribute._id as string)}
                            >
                                Copy payment ID
                            </DropdownMenuItem>
                            {/* <DropdownMenuSeparator /> */}
                            <DropdownMenuItem>
                                <Link to={`edit?idAttribute=${attribute._id}`} className="w-full">
                                    Edit
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onClick={() => setDialogOpen(true)}
                            >Delete</DropdownMenuItem>
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
                                        console.log(attribute._id as string)
                                        dispatch(removeAttribute({ idAttribute: attribute._id as string })).unwrap().then(() => {
                                            setTimeout(() => {
                                                dispatch(setDefaultAttribute());
                                                setDialogOpen(false);
                                            }, 100);
                                        })
                                    }}
                                >
                                    Continue
                                </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </>
            )
        },
    },
]