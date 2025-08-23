import { useLoading } from '@/contexts/LoadingScreen';
import { useAppDispatch } from '@/store/store';
import { getAllVoucher } from '@/store/thunks/voucherThunk';
import { useEffect } from 'react';
import { shallowEqual, useSelector } from 'react-redux'
import { Outlet } from 'react-router'

const AdminVoucherPage = () => {
    const dispatch = useAppDispatch();
    const statusVoucher = useSelector((state: any) => state.voucher.status, shallowEqual);
    const { show, hide } = useLoading();
    useEffect(() => {
        if (statusVoucher && statusVoucher === 'pending') {
            return show();
        }
        return hide();
    }, [statusVoucher]);

    useEffect(() => {
        dispatch(getAllVoucher({}));
    }, []);

    return (
        <div className='grid gap-4 md:gap-6'>
            <Outlet />
        </div>
    )
}

export default AdminVoucherPage
