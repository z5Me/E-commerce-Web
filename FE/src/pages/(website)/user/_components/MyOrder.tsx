import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useLoading } from "@/contexts/LoadingScreen";
import { useAppDispatch } from "@/store/store";
import { getAllOrderByUserId } from "@/store/thunks/orderThunk";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { shallowEqual, useSelector } from "react-redux";
import OrderItem from "./OrderItem";

const MyOrder = () => {
    const dispatch = useAppDispatch();
    //data of user in redux
    const dataUser = useSelector((state: any) => state.user.dataUser, shallowEqual);

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

    useEffect(() => {
        if (dataUser._id === '') {
            return;
        }

        dispatch(getAllOrderByUserId({ userId: dataUser._id }))
    }, [dataUser]);

    const allOrder = useSelector((state: any) => state.order.orderData, shallowEqual);

    //filter
    const [filterOrderCode, setFilterOrderCode] = useState<string>('');
    const [filterStatus, setFilterStatus] = useState<string>('allstatus');

    return (
        <div className="grid gap-4">
            {/* Search and filter */}
            <div className="grid grid-cols-2 items-center justify-between">
                <div className="w-full">
                    <div className="flex w-full max-w-[448px] border border-primary rounded-md items-center h-10 overflow-hidden">
                        <Search size={24} className="mx-2 select-none" />
                        <div className="w-full py-2">
                            <input onChange={(e) => setFilterOrderCode(e.target.value)} type="text" className="w-full relative text-base outline-0" placeholder="Search by Order ID" />
                        </div>
                        <div className="h-full flex items-center bg-primary text-white px-4 hover:opacity-85 cursor-pointer select-none">
                            <p>Search</p>
                        </div>
                    </div>
                </div>
                <div className="w-full flex items-center justify-end">
                    <div className="w-fit flex px-1 items-center gap-2">
                        <label htmlFor="status-select">Status</label>
                        <Select onValueChange={(e) => setFilterStatus(e)}>
                            <SelectTrigger id="status-select" className="w-[180px]">
                                <SelectValue placeholder="Select status" />
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
        </div >
    )
}

export default MyOrder
