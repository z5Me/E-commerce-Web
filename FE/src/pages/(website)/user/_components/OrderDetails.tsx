import { useGetParams } from "@/common/hooks/useGetParams";
import type { IItemCart } from "@/common/types/itemCart";
import type { IUpdateStatus } from "@/common/types/updateStatus";
import DeliveryAddress from "@/components/DeliveryAddress";
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
    const [data, setData] = useState<any>();
    const navigate = useNavigate();

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
            <div className="sm:text-xl text-base font-bold">Order code: {data.orderCode}</div>
            {data.createdAt && <div className="sm:text-base text-sm">{formatVietnamTime(data.createdAt)}</div>}
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
                                // console.log('item: ', item)
                                return (
                                    <div key={item._id} className="flex justify-between items-start gap-4 sm:text-base text-sm">
                                        <div className="aspect-square sm:max-w-[120px] max-w-[100px] rounded-md border overflow-hidden">
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
                                                            {/* {item.type === 'color' && <div className="p-2 rounded-sm" style={{ background: item.value }}></div>} */}
                                                        </p>
                                                    ))}
                                                    {/* <p>Medium</p>
                                                    <p>Black</p> */}
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
                <div className="flex justify-between items-center font-bold sm:text-xl text-base">
                    <p>Total</p>
                    <p>${data.total}</p>
                </div>
            </div>
            <div className="border rounded-md grid gap-4 px-3 py-4">
                <p className="font-bold">Order track</p>
                <div className="grid gap-4 sm:text-base text-sm">
                    {data && data.updateStatus.length > 0
                        ?
                        <>
                            {data.updateStatus.map((item: IUpdateStatus, index: number) => {
                                const Icon = themeColor[item.status || 'default'].icon;
                                return (
                                    <div
                                        key={index}
                                        // style={{ backgroundColor: themeColor[item.status].bg }}
                                        className="flex items-center justify-start gap-4 px-4 py-2 border rounded-md"
                                    >
                                        <div style={{ backgroundColor: themeColor[item.status].text }} className="p-2 rounded-full"></div>
                                        <div className="grid items-center justify-start gap-2">
                                            <div className="flex flex-col gap-x-2 gap-y-1">
                                                <p>{formatVietnamTime(new Date())}</p>
                                                <div style={{
                                                    backgroundColor: themeColor[item.status || 'default'].bg,
                                                    color: themeColor[item.status || 'default'].text
                                                }}
                                                    className="flex flex-row gap-2 items-center capitalize w-fit px-2 rounded-sm"
                                                >
                                                    <Icon size={14} />
                                                    <p>{item.status}</p>
                                                </div>
                                            </div>
                                            <div className="flex flex-wrap gap-x-2">
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
        </div>
    )
}

export default OrderDetails
