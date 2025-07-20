import type { IAttribute } from '@/common/types/attribute'
import { DataTable } from '@/components/data-table'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { setDefaultAttribute } from '@/store/slices/attributeSlice'
import type { AppDispatch } from '@/store/store'
import { createAttribute, getAllAttribute } from '@/store/thunks/attributeThunk'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { useSearchParams } from 'react-router'
import { toast } from 'sonner'
import z from 'zod'
import { columns } from './_components/columns'
import type { IAttributeValue } from '@/common/types/attributeValue'

const FormSchema = z.object({
    name: z.string().min(2, {
        message: "Name must be at least 2 characters.",
    }),
    type: z.string().min(2, {
        message: "Type must be at least 2 characters."
    })
})

const AdminAttributeValuesPage = () => {
    const dispatch = useDispatch<AppDispatch>()
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            name: "",
            type: ""
        },
    })

    function onSubmit(data: z.infer<typeof FormSchema>) {
        toast("You submitted the following values", {
            description: (
                <pre className="mt-2 w-[320px] rounded-md bg-neutral-950 p-4">
                    <code className="text-white">{JSON.stringify(data, null, 2)}</code>
                </pre>
            ),
        })

        dispatch(createAttribute({ data })).unwrap().then(() => {
            setTimeout(() => {
                form.reset();
                dispatch(setDefaultAttribute());
            }, 100)
        });
    }

    //list
    const AppDispatch = useDispatch<AppDispatch>();

    //Làm lại đoạn này
    const status = useSelector((state: any) => state.attribute.status, shallowEqual);
    const data2 = useSelector((state: any) => state.attribute.dataAttribute, shallowEqual);
    const [data, setData] = useState<IAttribute[]>([]);

    const [searchParams] = useSearchParams();
    const idAttribute = searchParams.get('idAttribute');

    useEffect(() => {
        if (data2 && data2.length > 0) {
            const filterData = data2.filter((item: IAttribute) => item._id === idAttribute);
            setData(filterData);
            return
        }
    }, [data2])

    useEffect(() => {
        if (status === 'idle') {
            dispatch(getAllAttribute({}));
        }
        return
    }, [status, dispatch]);

    return (
        <div className="grid gap-3">
            <h1 className="sm:text-lg text-base">Add new material</h1>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="Name..." {...field} />
                                </FormControl>
                                <FormDescription>
                                    The name of attribute
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="type"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Type</FormLabel>
                                <FormControl>
                                    <Input placeholder="Type..." {...field} />
                                </FormControl>
                                <FormDescription>
                                    The type of attribute
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit" className="cursor-pointer">Submit</Button>
                </form>
            </Form>
            <div className="grid w-full">
                <h1 className="sm:text-lg text-base">Attributes list</h1>
                <div className="w-full overflow-x-auto pb-10">
                    <DataTable columns={columns} data={data[0]?.terms ? data[0].terms : []} filterColumn="name" filterPlaceholder="Filter by Name..." />
                </div>
            </div>
        </div>
    )
}

export default AdminAttributeValuesPage