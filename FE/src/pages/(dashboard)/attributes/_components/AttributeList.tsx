"use client"

import { DataTable } from "@/components/data-table"
import { columns } from "@/pages/(dashboard)/attributes/_components/columns"
import type { AppDispatch } from "@/store/store"
import { useEffect } from "react"
import { shallowEqual, useDispatch, useSelector } from "react-redux"
import AttributeForm from "./AttributeForm"
import { getAllAttribute } from "@/store/thunks/attributeThunk"

const AdminAttributeList = () => {
    const dispatch = useDispatch<AppDispatch>();

    const data = useSelector((state: any) => state.attribute.dataAttribute, shallowEqual);
    const status = useSelector((state: any) => state.attribute.status, shallowEqual);

    useEffect(() => {
        if (status === 'idle') {
            dispatch(getAllAttribute({ filterDelete: 'true' }));
        }
        return
    }, [status, dispatch]);

    return (
        <div className="grid gap-4 md:gap-6">
            <AttributeForm />
            <div className="grid w-full">
                <h1 className="sm:text-lg text-base">Attributes list</h1>
                <div className="w-full overflow-x-auto pb-10">
                    <DataTable columns={columns} data={data} filterColumn="name" filterPlaceholder="Filter by Name..." />
                </div>
            </div>
        </div>
    )
}

export default AdminAttributeList