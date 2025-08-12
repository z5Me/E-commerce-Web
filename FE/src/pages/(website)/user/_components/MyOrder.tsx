import { useLoading } from "@/contexts/LoadingScreen";
import { useEffect } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { Outlet } from "react-router";

const MyOrder = () => {
    //Loading screen when call API
    const userStatus = useSelector((state: any) => state.user.status, shallowEqual);
    const orderStatus = useSelector((state: any) => state.order.status, shallowEqual);
    const { show, hide } = useLoading();

    useEffect(() => {
        if (userStatus === 'pending' || orderStatus === 'pending') {
            show();
            return;
        }
        return hide();

    }, [userStatus]);

    return (
        <div className="grid gap-4">
            <Outlet />
        </div >
    )
}

export default MyOrder
