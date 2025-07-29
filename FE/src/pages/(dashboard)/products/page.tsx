import { useLoading } from "@/contexts/LoadingScreen";
import { useEffect } from "react";
import { shallowEqual, useSelector } from "react-redux"
import { Outlet } from "react-router"

const LayoutAdminProductsPage = () => {
    const status = useSelector((state: any) => state.product.status, shallowEqual);
    const { show, hide } = useLoading();

    useEffect(() => {
        if (status && status === 'pending') return show();

        return hide();
    }, [status]);

    return (
        <>
            <Outlet />
        </>
    )
}

export default LayoutAdminProductsPage