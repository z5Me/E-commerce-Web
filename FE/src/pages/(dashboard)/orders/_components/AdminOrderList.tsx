import { DataTable } from "@/components/data-table"
import { columns } from "./columns"
import { shallowEqual, useSelector } from "react-redux"
import { useEffect } from "react";
import { useAppDispatch } from "@/store/store";
import { getAllOrder } from "@/store/thunks/orderThunk";

const statusOptions = ['pending', 'processing', 'shipping', 'complete', 'cancel'];

const AdminOrderList = () => {
    const dispatch = useAppDispatch();
    const data = useSelector((state: any) => state.order.orderData, shallowEqual);
    useEffect(() => {
        if (data.length < 1) {
            dispatch(getAllOrder());
        }
    }, [data]);

    return (
        <div className="grid gap-4 md:gap-6">
            <div className="grid w-full">
                <h1 className="sm:text-2xl text-lg font-bold">Order list</h1>
                <div className="w-full overflow-x-auto pb-10">
                    <DataTable columns={columns} data={data} filterColumn="orderCode" filterPlaceholder="Filter by Order Code..." statusOptions={statusOptions} />
                </div>
            </div>
        </div>
    )
}

export default AdminOrderList