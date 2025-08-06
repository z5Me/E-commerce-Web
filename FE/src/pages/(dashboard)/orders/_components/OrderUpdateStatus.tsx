import { useGetParams } from "@/common/hooks/useGetParams";
import { DataTable } from "@/components/data-table";
import { useAppDispatch } from "@/store/store";
import { getAllOrder } from "@/store/thunks/orderThunk";
import { useEffect, useState } from "react";
import { shallowEqual, useSelector } from "react-redux"
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { columnsStatus } from "./columnsStatus";
import { z } from "zod"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

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
    const orderData = useSelector((state: any) => state.order.orderData, shallowEqual);
    const { orderCode } = useGetParams(['orderCode']);
    const [data, setData] = useState<any>([]);
    const navigate = useNavigate();
    console.log('orderData', orderData);
    useEffect(() => {
        if (data.length === 0) {
            if (orderData.length < 1) {
                dispatch(getAllOrder()).unwrap()
                    .then((e) => {
                        const filterOrder = e.filter((item: any) => item.orderCode === orderCode);
                        if (filterOrder.length === 0) {
                            toast.warning('Không tìm thấy dữ liệu');
                            navigate(-1);
                            return;
                        } else {
                            setData(filterOrder[0]);
                            form.reset({
                                title: '',
                                desc: '',
                                status: filterOrder[0].status
                            });
                            return;
                        }
                    })
                    .catch((e) => {
                        toast.error('Lỗi mạng, vui lòng thử lại sau');
                        console.log('error: ', e);
                        return;
                    });
            }
            const filterOrder = orderData.filter((item: any) => item.orderCode === orderCode);
            if (filterOrder.length === 0) {
                toast.warning('Không tìm thấy dữ liệu');
                navigate(-1);
                return;
            } else {
                setData(filterOrder[0]);
                form.reset({
                    title: '',
                    desc: '',
                    status: filterOrder[0].status
                });
                return;
            }

        }
    }, [data, orderCode]);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            desc: "",
            status: ""
        },
    })

    function onSubmit(data: z.infer<typeof formSchema>) {
        toast("You submitted the following values", {
            description: (
                <pre className="mt-2 w-[320px] rounded-md bg-neutral-950 p-4">
                    <code className="text-white">{JSON.stringify(data, null, 2)}</code>
                </pre>
            ),
        })
    }

    return (
        <div className="grid gap-4 md:gap-6">
            <div className="grid w-full gap-y-8">
                <h1 className="sm:text-2xl text-lg font-bold">Update Status</h1>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <FormField
                            control={form.control}
                            name="status"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Status</FormLabel>
                                    <Select onValueChange={field.onChange} value={field.value || ""}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select a verified status to display" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {/* Sửa phần này */}
                                            <SelectItem
                                                disabled={data?.status !== 'pending'}
                                                value="pending"
                                            >
                                                Pending
                                            </SelectItem>
                                            <SelectItem
                                                disabled={(data?.status !== 'shipping' && data?.status !== 'complete')}
                                                value="processing"
                                            >
                                                Processing
                                            </SelectItem>
                                            <SelectItem
                                                disabled={(data?.status !== 'shipping' && data?.status !== 'complete')}
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
                                        <Input placeholder="title..." {...field} />
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
                <div className="w-full overflow-x-auto pb-10">
                    <DataTable data={data} columns={columnsStatus} />
                </div>
            </div>
        </div>
    )
}

export default OrderUpdateStatus
