"use client"

import { useLoading } from "@/contexts/LoadingScreen";
import { useEffect } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { Outlet } from "react-router";

const AdminAttributesPage = () => {
    const status = useSelector((state: any) => state.attribute.status, shallowEqual);
    const { show, hide } = useLoading();

    useEffect(() => {
        if (status && status === 'pending') return show();
        return hide();
    }, [status]);

    return (
        <div className="grid gap-6">
            <h1 className="sm:text-2xl text-lg font-medium">Attributes</h1>
            <Outlet />
        </div>
    )
}

export default AdminAttributesPage;