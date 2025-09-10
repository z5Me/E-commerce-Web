import { useGetParams } from "@/common/hooks/useGetParams";
import type { IOrder } from "@/common/types/order";
import type { IUpdateStatus } from "@/common/types/updateStatus";
import DeliveryAddress from "@/components/DeliveryAddress";
import OrderItems from "@/components/OrderItems";
import { formatVietnamTime } from "@/lib/utils";
import { useAppDispatch } from "@/store/store";
import { getOrderByOrderCode } from "@/store/thunks/orderThunk";
import { Check, History, Hourglass, PackagePlus, Truck, X } from "lucide-react";
import { useEffect, useState } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { toast } from "sonner";

const OrderDetails = () => {
    const dispatch = useAppDispatch();
    const { orderCode } = useGetParams(['orderCode']);
    const allOrder = useSelector((state: any) => state.order.orderData, shallowEqual);
    const [data, setData] = useState<IOrder>();
    const navigate = useNavigate();
    // console.log('allOrder', allOrder)
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

    const themeColor = {
        default: {
            bg: '#f7f7f7',
            text: '#171717',
            icon: History
        },
        cancel: {
            bg: '#fde8e8',
            text: '#ff3333',
            icon: X
        },
        pending: {
            bg: '#fff8f1',
            text: '#8a2c0d',
            icon: Hourglass
        },
        processing: {
            bg: '#fdf6b2',
            text: '#723b13',
            icon: PackagePlus
        },
        shipping: {
            bg: '#dbeafe',
            text: '#1e40af',
            icon: Truck
        },
        complete: {
            bg: '#def7ec',
            text: '#03543f',
            icon: Check
        }
    }

    console.log('data', data)

    if (!data) return (
        <div className='min-h-[500px] grid gap-4 justify-center items-center'>
            <div>No result.</div>
        </div>
    )

    return (
        <div className='grid gap-4'>
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
            <div className="border rounded-md grid gap-4 px-3 py-4">
                <p className="font-bold">Order track</p>
                <div className="grid gap-4 sm:text-base text-sm">
                    {data && data.updateStatus && data.updateStatus.length > 0
                        ?
                        <>
                            {[...data.updateStatus].reverse().map((item: IUpdateStatus, index: number) => {
                                const Icon = themeColor[item.status || 'default'].icon;
                                return (
                                    <div
                                        key={index}
                                        style={{ borderColor: index === 0 ? themeColor[item.status].text : '', backgroundColor: index === 0 ? themeColor[item.status].bg : '' }}
                                        className={`flex items-center justify-start gap-4 px-4 py-2 border rounded-md`}
                                    >
                                        <div style={{ backgroundColor: index === 0 ? themeColor[item.status].text : '#d1d5dc' }} className="p-2 rounded-full"></div>
                                        <div className="grid items-center justify-start gap-3">
                                            <div className="flex gap-x-2 gap-y-1">
                                                <p className="font-bold">{formatVietnamTime(new Date())}</p>
                                                <p>-</p>
                                                <div style={{
                                                    backgroundColor: themeColor[item.status || 'default'].bg,
                                                    color: themeColor[item.status || 'default'].text
                                                }}
                                                    className={`flex flex-row gap-1 ${index !== 0 && 'px-2'} items-center capitalize w-fit rounded-sm`}
                                                >
                                                    <Icon size={14} />
                                                    <p>{item.status}</p>
                                                </div>
                                            </div>
                                            <div
                                                style={{ backgroundColor: themeColor[item.status].bg }}
                                                className="flex flex-wrap gap-x-2 rounded-sm"
                                            >
                                                <p className="font-bold">{item.title}</p>
                                                <p>-</p>
                                                <p>{item.desc}</p>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}

                        </>
                        :
                        <div className="text-center">
                            <p>No result.</p>
                        </div>
                    }
                </div>
            </div>
        </div >
    )
}

export default OrderDetails
