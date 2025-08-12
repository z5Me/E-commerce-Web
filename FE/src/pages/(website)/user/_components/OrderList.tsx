import useScreenWidth from '@/common/hooks/useScreenWidth';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search } from 'lucide-react';
import { useEffect, useState } from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import OrderItem from './OrderItem';
import { useAppDispatch } from '@/store/store';
import { getAllOrderByUserId } from '@/store/thunks/orderThunk';

const OrderList = () => {
    const screenWidth = useScreenWidth();
    const dispatch = useAppDispatch();

    //data of user in redux
    const dataUser = useSelector((state: any) => state.user.dataUser, shallowEqual);
    useEffect(() => {
        if (dataUser._id === '') {
            return;
        }

        dispatch(getAllOrderByUserId({ userId: dataUser._id }));
    }, [dataUser]);
    const allOrder = useSelector((state: any) => state.order.orderData, shallowEqual);

    //filter
    const [filterOrderCode, setFilterOrderCode] = useState<string>('');
    const [filterStatus, setFilterStatus] = useState<string>('allstatus');

    return (
        <>
            {/* Search and filter */}
            <div className="flex items-center justify-between sm:flex-nowrap flex-wrap gap-4">
                <div className="w-full">
                    <div className="flex w-full max-w-[448px] border border-primary rounded-md items-center overflow-hidden">
                        <Search size={screenWidth < 640 ? 18 : 24} className="mx-2 select-none" />
                        <div className="w-full sm:py-2 py-1">
                            <input onChange={(e) => setFilterOrderCode(e.target.value)} type="text" className="w-full relative sm:text-base text-sm outline-0 " placeholder="Search by Order ID" />
                        </div>
                    </div>
                </div>
                <div className="w-full flex items-center sm:justify-end justify-start">
                    <div className="w-fit flex px-1 items-center gap-2">
                        <Select onValueChange={(e) => setFilterStatus(e)}>
                            <SelectTrigger id="status-select" className="w-[180px]">
                                <SelectValue placeholder="Filter status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="allstatus">All status</SelectItem>
                                <SelectItem value="pending">Pending</SelectItem>
                                <SelectItem value="processing">Processing</SelectItem>
                                <SelectItem value="shipping">Shipping</SelectItem>
                                <SelectItem value="complete">Complete</SelectItem>
                                <SelectItem value="cancel">Cancel</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            </div>

            {/* Order list */}
            <div className="grid gap-4 min-h-[500px]">
                <OrderItem data={allOrder} dataUser={dataUser} filterOrderCode={filterOrderCode} filterStatus={filterStatus} />
            </div>
        </>
    )
}

export default OrderList
