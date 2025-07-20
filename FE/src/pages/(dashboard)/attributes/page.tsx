"use client"

import { Outlet } from "react-router"

const AdminAttributesPage = () => {
    return (
        <div className="grid gap-6">
            <h1 className="sm:text-2xl text-lg font-medium">Attributes</h1>
            <Outlet />
        </div>
    )
}

export default AdminAttributesPage;