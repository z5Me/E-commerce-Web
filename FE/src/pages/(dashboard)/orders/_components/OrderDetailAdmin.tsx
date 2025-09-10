import { useGetParams } from "@/common/hooks/useGetParams";
import type { IOrder } from "@/common/types/order";
import { DataTable } from "@/components/data-table";
import DeliveryAddress from "@/components/DeliveryAddress";
import OrderItems from "@/components/OrderItems";
import { formatVietnamTime } from "@/lib/utils";
import { useAppDispatch } from "@/store/store";
import { getOrderByOrderCode } from "@/store/thunks/orderThunk";
import { useEffect, useState } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { columnsStatus } from "./columnsStatus";

const OrderDetailAdmin = () => {
    const { orderCode } = useGetParams(['orderCode']);
    const dispatch = useAppDispatch();
    const allOrder = useSelector((state: any) => state.order.orderData, shallowEqual);
    const [data, setData] = useState<IOrder>();
    const navigate = useNavigate();

    useEffect(() => {
        scrollTo({ top: 0, behavior: 'smooth' });
    }, []);

    useEffect(() => {
        if (allOrder.lenght > 0) {
            const filterOrder = allOrder.filter((order: any) => order.orderCode === orderCode);
            if (filterOrder.length === 1) {
                setData(filterOrder[0]);
            };
        } else {
            if (orderCode) {
                dispatch(getOrderByOrderCode({ orderCode: orderCode })).unwrap()
                    .then((res) => setData(res))
                    .catch((e) => {
                        toast.error(`Error: ${e}`);
                        navigate(-1);
                    })
            }
        }
    }, [orderCode]);

    if (!data) return (
        <div className='min-h-[500px] grid gap-4 justify-center items-center'>
            <div>No result.</div>
        </div>
    )

    return (
        <div className="grid gap-4 md:gap-6">
            <div className="grid w-full gap-y-8">
                <h1 className="sm:text-2xl text-lg font-bold">Order Detail</h1>
                <div className="grid gap-y-2">
                    <div className="flex gap-2 sm:text-xl text-base">
                        <div>Order code: </div>
                        <div className="font-bold">{data.orderCode}</div>
                    </div>
                    {data.createdAt &&
                        <div className="flex gap-2">
                            <p>Order At:</p>
                            <div className="sm:text-base text-sm font-bold">{formatVietnamTime(data.createdAt)}</div>
                        </div>
                    }
                </div>
                {data && data.address &&
                    <div className="border rounded-md grid gap-4 px-3 py-4">
                        <p className="font-bold">Information</p>
                        <div className="border-t-2 border-primary">
                            <DeliveryAddress item={data.address} />
                        </div>
                    </div>
                }

                <div className="border rounded-md grid gap-4 px-3 py-4">
                    <p className="font-bold">Order Item</p>
                    <OrderItems data={data} />
                </div>

                <div className="w-full overflow-x-auto pb-10 border rounded-md px-3 py-4">
                    <p className="font-bold">Order track</p>
                    {data && data.updateStatus && data.updateStatus.length > 0
                        ?
                        <DataTable data={[...data.updateStatus].reverse() || []} columns={columnsStatus} />
                        :
                        <div className="text-center">
                            <p>No result.</p>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default OrderDetailAdmin
