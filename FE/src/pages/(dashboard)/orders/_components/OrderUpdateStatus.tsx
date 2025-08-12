import { useGetParams } from "@/common/hooks/useGetParams";
import type { IOrder } from "@/common/types/order";
import { DataTable } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useDialog } from "@/contexts/DialogContext";
import { useAppDispatch } from "@/store/store";
import { getAllOrder, updateStatus } from "@/store/thunks/orderThunk";
import { reSignIn } from "@/store/thunks/userThunk";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { shallowEqual, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { z } from "zod";
import { columnsStatus } from "./columnsStatus";

const formSchema = z.object({
    title: z.string()
        .min(2, {
            message: 'Ít nhất 2 kí tự'
        })
        .max(50, {
            message: 'Không vượt quá 50 kí tự'
        }),
    desc: z.string()
        .min(2, {
            message: 'Ít nhất 2 kí tự'
        })
        .max(50, {
            message: 'Không vượt quá 50 kí tự'
        }),
    status: z.string()
        .nonempty("Please select a status to display.")
})

const OrderUpdateStatus = () => {
    const dispatch = useAppDispatch();
    //Kiểm tra phiên đăng nhập
    const dataUser = useSelector((state: any) => state.user.dataUser, shallowEqual);
    const { showDialog } = useDialog();
    useEffect(() => {
        if (dataUser && dataUser._id) {
            // dispatch(getSingleCart({ idUser: dataUser._id }));
        } else {
            dispatch(reSignIn()).unwrap()
                .catch(() => {
                    toast.warning('Phiên đăng nhập đã hết hạn');
                    showDialog({
                        title: 'Rời khỏi trang?',
                        description: 'Một vài tính năng cần bạn đăng nhập để tiếp tục sử dụng',
                        onConfirm: () => navigate('/auth'),
                        onCancel: () => navigate(-1)
                    });
                });
        }
    }, [dataUser]);

    const orderData = useSelector((state: any) => state.order.orderData, shallowEqual);
    const { orderCode } = useGetParams(['orderCode']);
    const [data, setData] = useState<IOrder | null>(null);
    const navigate = useNavigate();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            status: '',
            title: '',
            desc: ''
        }
    });

    useEffect(() => {
        if (orderData && orderData.length > 0) {
            const filterData = orderData.filter((item: IOrder) => item.orderCode === orderCode);
            if (filterData.length === 1) {
                setData(filterData[0]);
            }
        } else {
            dispatch(getAllOrder())
        }
    }, [orderCode, orderData]);

    const statusValue = form.watch('status');
    useEffect(() => {
        if (data && data.status && (statusValue === '' || statusValue === undefined)) {
            form.setValue('status', data.status);
        }

        if (statusValue === 'processing') {
            form.setValue('title', 'Đang gói hàng');
        } else {
            form.setValue('title', '');
        }

        if (statusValue === 'complete') {
            form.setValue('title', 'Giao hàng thành công');
        }

    }, [data, form, statusValue]);

    function onSubmit(data: z.infer<typeof formSchema>) {
        if (!orderCode) {
            toast.error("Order code is missing.");
            return;
        }
        const newData = {
            ...data,
            date: new Date(),
            orderCode: orderCode,
            creator: {
                userId: dataUser._id,
                name: dataUser.userName,
                email: dataUser.email,
                role: dataUser.role
            }
        }
        dispatch(updateStatus(newData)).unwrap()
            .then(() => {
                toast.success('Success');
                navigate(-1);
            })
            .catch((e) => {
                console.log('error: ', e);
                toast.error('Error');
            })
    }

    if (!data) return null; // Hoặc loading state

    return (
        <div className="grid gap-4 md:gap-6">
            <div className="grid w-full gap-y-8">
                <h1 className="sm:text-2xl text-lg font-bold">Update Status</h1>
                {(data && data.status !== 'complete' && data.status !== 'cancel') &&
                    <Form {...form} key={data.orderCode}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                            <FormField
                                control={form.control}
                                name="status"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Status</FormLabel>
                                        <Select onValueChange={field.onChange} value={field.value} >
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select a verified status to display" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>

                                                <SelectItem
                                                    disabled={true}
                                                    value="pending"
                                                >
                                                    Pending
                                                </SelectItem>
                                                <SelectItem
                                                    disabled={data?.status !== 'pending'}
                                                    value="processing"
                                                >
                                                    Processing
                                                </SelectItem>
                                                <SelectItem
                                                    disabled={data?.status !== 'processing'}
                                                    value="shipping"
                                                >
                                                    Shipping
                                                </SelectItem>
                                                <SelectItem
                                                    disabled={data?.status !== 'shipping'}
                                                    value="complete"
                                                >
                                                    Complete
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="title"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Title</FormLabel>
                                        <FormControl>
                                            <Input readOnly={form.watch("status") === "processing"} placeholder="title..." {...field} />
                                        </FormControl>
                                        <FormDescription>
                                            The title of this status.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="desc"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Description</FormLabel>
                                        <FormControl>
                                            <Input placeholder="description..." {...field} />
                                        </FormControl>
                                        <FormDescription>
                                            The description of this status.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button type="submit">Submit</Button>
                        </form>
                    </Form>
                }
                <div className="w-full overflow-x-auto pb-10">
                    <DataTable data={data?.updateStatus || []} columns={columnsStatus} />
                </div>
            </div>
        </div>
    )
}

export default OrderUpdateStatus
