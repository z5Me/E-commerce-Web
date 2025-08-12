import useScreenWidth from '@/common/hooks/useScreenWidth';
import type { IOrder } from '@/common/types/order';
import type { IUser } from '@/common/types/user';
import { TextareaForm } from '@/components/TextareaForm';
import { useDialog } from '@/contexts/DialogContext';
import { useAppDispatch } from '@/store/store';
import { updateStatus } from '@/store/thunks/orderThunk';
import { Check, ClipboardList, Download, History, Hourglass, PackagePlus, Truck, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router';

const OrderItem = ({ data, dataUser, filterOrderCode, filterStatus }: { data: IOrder[], dataUser: IUser, filterOrderCode: string, filterStatus: string }) => {
    const screenWidth = useScreenWidth();
    const [allOrder, setAllOrder] = useState<IOrder[]>([]);
    useEffect(() => {
        if (data && data.length > 0) {
            const result = data.filter(item =>
                (
                    filterOrderCode !== ''
                        ?
                        item.orderCode?.toLowerCase().includes(filterOrderCode.toLowerCase())
                        :
                        true
                )
                &&
                (
                    filterStatus !== 'allstatus'
                        ?
                        item.status === filterStatus
                        :
                        true
                )
            );

            setAllOrder(result);
            return;
        }
        setAllOrder([]);

    }, [data, filterOrderCode, filterStatus]);
    const { showDialog } = useDialog();
    const dispatch = useAppDispatch();
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

    return (
        <>
            {allOrder && allOrder.length > 0 ?
                allOrder.map((order: IOrder) => {
                    const Icon = themeColor[order.status || 'default']?.icon;
                    return (
                        <div key={order.orderCode} className="border border-[#e5e7eb] rounded-md p-4 grid gap-4 h-fit sm:text-base text-sm">
                            <div className="grid grid-cols-2">
                                <div className="flex flex-col gap-x-4 gap-y-2">
                                    <div className="flex flex-wrap sm:gap-4 gap-2">
                                        <p className="text-[#6b7280] font-medium">Order ID: <span className="text-primary font-semibold">{order.orderCode}</span></p>
                                        <div>
                                            <div
                                                className={`flex items-center gap-2 py-1 px-3 rounded-sm text-xs`}
                                                style={{
                                                    color: themeColor[order.status ?? 'default']?.text,
                                                    backgroundColor: themeColor[order.status ?? 'default']?.bg
                                                }}
                                            >
                                                <Icon size={12} />
                                                <p className="capitalize">{order.status}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="w-fit flex gap-2 items-center text-[#1d4ed8] font-semibold hover:underline cursor-pointer">
                                        <Download size={16} />
                                        <p>Download invoice</p>
                                    </div>
                                </div>
                                <div className="flex flex-wrap justify-end select-none gap-x-4">
                                    {
                                        order.status === 'pending' && <div>
                                            <div
                                                className="bg-danger hover:opacity-85 cursor-pointer text-white px-3 py-1 rounded-sm p-2"
                                                onClick={() => showDialog({
                                                    body: (
                                                        <TextareaForm
                                                            onSubmitForm={(data) => {
                                                                // console.log("Lý do hủy:", data.reason);
                                                                dispatch(updateStatus({
                                                                    status: 'cancel',
                                                                    title: 'Hủy đơn',
                                                                    desc: data.reason,
                                                                    date: new Date(),
                                                                    orderCode: order.orderCode as string,
                                                                    creator: {
                                                                        userId: dataUser._id as string,
                                                                        name: dataUser.userName as string,
                                                                        email: dataUser.email as string,
                                                                        role: dataUser.role as string
                                                                    }

                                                                }))
                                                            }}
                                                        />
                                                    ),
                                                    hidenButton: true
                                                })}
                                            >
                                                Cancel order
                                            </div>
                                        </div>
                                    }

                                    <div>
                                        <div className="border cursor-pointer text-primary px-3 py-1 rounded-sm p-2 flex items-center gap-1 hover:bg-primary/5">
                                            <ClipboardList size={screenWidth < 640 ? 14 : 16} />
                                            <p>Track order</p>
                                        </div>
                                    </div>
                                    <Link to={`detail?orderCode=${order.orderCode}`}>
                                        <div className="border cursor-pointer text-primary px-3 py-1 rounded-sm p-2 flex items-center gap-1 hover:bg-primary/5">
                                            <p>Order details</p>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                            <div className="w-full h-[1px] bg-primary/8"></div>
                            <div className="flex flex-wrap gap-4">
                                <div>
                                    <div className="flex gap-2">
                                        <p className="font-semibold">Order date:</p>
                                        <p className="">24 January 2024</p>
                                    </div>
                                </div>
                                <div>
                                    <div className="flex gap-2">
                                        <p className="font-semibold">Email:</p>
                                        <p className="">hoang@gmail.com</p>
                                    </div>
                                </div>
                                <div>
                                    <div className="flex gap-2">
                                        <p className="font-semibold">Payment method:</p>
                                        <p className="">COD</p>
                                    </div>
                                </div>
                            </div>
                            <div
                                className="rounded-md py-2 px-4 flex items-center gap-2"
                                style={{
                                    color: themeColor[order.status ?? 'default']?.text,
                                    backgroundColor: themeColor[order.status ?? 'default']?.bg
                                }}
                            >
                                <Icon size={screenWidth < 640 ? 16 : 18} />
                                <p>Expected delivery on <span className="font-semibold">Monday 16 Jul 2024</span> </p>
                            </div>
                        </div>
                    )
                })

                :
                <div className='flex justify-center items-center border rounded-md'>No result.</div>
            }
        </>
    )
}

export default OrderItem
