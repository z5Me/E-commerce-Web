import { useLoading } from '@/contexts/LoadingScreen';
import { useEffect } from 'react';
import { shallowEqual, useSelector } from 'react-redux'
import { Outlet } from 'react-router'

const AdminOrderPage = () => {
    const { show, hide } = useLoading();
    const orderStatus = useSelector((state: any) => state.order.status, shallowEqual);
    useEffect(() => {
        if (orderStatus && orderStatus === 'pending') {
            show();
            return;
        }
        hide();
        return;
    }, [orderStatus]);

    return (
        <div>
            <Outlet />
        </div>
    )
}

export default AdminOrderPage
