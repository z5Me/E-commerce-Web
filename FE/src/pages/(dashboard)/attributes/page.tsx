"use client"

import { DataTable } from "@/components/data-table"
import { columns } from "@/pages/(dashboard)/attributes/_components/columns"
import AttributeForm from "./_components/AttributeForm"
import type { IAttribute } from "@/common/types/attribute"

const AdminAttributesPage = () => {
    const data: IAttribute[] = [
        {
            _id: "728ed52f",
            name: "Color",
            type: "color",
        }
    ]

    return (
        <div className="grid gap-4 md:gap-6">
            <AttributeForm />
            <div className="w-full overflow-x-auto pt-[6px] pb-10">
                <DataTable columns={columns} data={data} filterColumn="name" filterPlaceholder="Filter by Name..." />
            </div>
        </div>
    )
}

export default AdminAttributesPage;