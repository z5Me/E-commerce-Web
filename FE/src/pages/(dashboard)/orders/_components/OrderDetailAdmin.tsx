import { useGetParams } from "@/common/hooks/useGetParams"
import type { IItemCart } from "@/common/types/itemCart";
import { DataTable } from "@/components/data-table";
import DeliveryAddress from "@/components/DeliveryAddress";
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
    const [data, setData] = useState<any>();
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
                    <div className="grid gap-4">
                        {data && data.products.length > 0
                            ?
                            <>
                                {data.products.map((item: IItemCart) => {
                                    console.log('item: ', item)
                                    return (
                                        <div key={item._id} className="flex justify-between items-start gap-4 sm:text-base text-sm">
                                            <div className="aspect-square sm:max-w-[120px] max-w-[100px] w-full rounded-md border overflow-hidden">
                                                <img className="object-contain w-full h-full aspect-square" src={item.variant.image} alt={item.product.name} />
                                            </div>
                                            <div className="flex-1 h-full">
                                                <div className="flex flex-col gap-2 justify-between h-full">
                                                    <div className="flex flex-col">
                                                        <p>Categories</p>
                                                        <p className="font-bold">{item.product.name}</p>
                                                    </div>
                                                    <div className="flex flex-wrap gap-2">
                                                        {item.variant.values.map((item) => (
                                                            <p key={item._id} className="flex gap-1 items-center justify-center">
                                                                {item.name}
                                                            </p>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex gap-4 flex-wrap items-center h-fit justify-end">
                                                <div>
                                                    <div className="border rounded-md py-1 px-4 sm:text-sm text-xs font-bold">{item.quantity} x ${item.variant.price}</div>
                                                </div>
                                                <div>
                                                    <p>${item.quantity * item.variant.price}</p>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}
                            </>
                            :
                            <div></div>
                        }
                    </div>
                    <div className="flex justify-between items-center font-bold sm:text-base text-sm">
                        <p>Payment method</p>
                        <p className="uppercase">{data.payment}</p>
                    </div>
                    <div className="flex justify-between items-center font-bold sm:text-xl text-base">
                        <p>Total</p>
                        <p>${data.total}</p>
                    </div>
                </div>

                <div className="w-full overflow-x-auto pb-10 border rounded-md px-3 py-4">
                    <p className="font-bold">Order track</p>
                    <DataTable data={[...data?.updateStatus].reverse() || []} columns={columnsStatus} />
                </div>
            </div>
        </div>
    )
}

export default OrderDetailAdmin
