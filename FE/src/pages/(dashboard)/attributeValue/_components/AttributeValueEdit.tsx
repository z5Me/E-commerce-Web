import { useGetParams } from '@/common/hooks/useGetParams';
import type { IAttribute } from '@/common/types/attribute';
import type { IAttributeValue } from '@/common/types/attributeValue';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { setDefaultAttribute } from '@/store/slices/attributeSlice';
import type { AppDispatch } from '@/store/store';
import { getAllAttribute } from '@/store/thunks/attributeThunk';
import { editAttributeValue } from '@/store/thunks/attributeValueThunk';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';
import z from 'zod';

const FormSchema = z.object({
    name: z.string()
        .min(2, {
            message: "Name must be at least 2 characters.",
        })
        .refine(val => val === val.trim(), {
            message: "Name must not have whitespace."
        })
    ,
    value: z.string()
        .min(1, {
            message: "Value must be required."
        })
        .refine(val => val === val.trim(), {
            message: "Value must not have whitespace."
        })
})

const AdminAttributeValueEdit = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { idAttribute, idAttributeValue } = useGetParams(['idAttribute', 'idAttributeValue']);
    const data2 = useSelector((state: any) => state.attribute.dataAttribute, shallowEqual);
    const status = useSelector((state: any) => state.attribute.status, shallowEqual);
    const [data, setData] = useState<IAttributeValue[]>([]);
    const navigate = useNavigate();

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            name: "",
            value: ""
        },
    });

    useEffect(() => {
        if (data && data.length !== 0) {
            form.reset({
                name: data[0].name,
                value: data[0].value
            })
        }
    }, [data]);

    function onSubmit(data: z.infer<typeof FormSchema>) {
        // toast("You submitted the following values", {
        //     description: (
        //         <pre className="mt-2 w-[320px] rounded-md bg-neutral-950 p-4">
        //             <code className="text-white">{JSON.stringify(data, null, 1)}</code>
        //         </pre>
        //     ),
        // });

        const fillData = {
            ...data,
            idAttribute: idAttribute,
            idAttributeValue: idAttributeValue ?? ""
        };

        const promise = dispatch(editAttributeValue(fillData)).unwrap().then(() => {
            setTimeout(() => {
                dispatch(setDefaultAttribute());
                navigate(-1)
            });
        });

        toast.promise(promise, {
            loading: '...Loading',
            success: 'Success',
            error: (error) => {
                return `Error: ${error}`
            }
        })
    }

    useEffect(() => {
        if (status === 'idle') {
            dispatch(getAllAttribute({}));
        }
        return
    }, [status, dispatch]);

    useEffect(() => {
        if (data2 && data2.length > 0) {
            const filterAttribute = data2.filter((attri: IAttribute) => attri._id === idAttribute);
            const filterTerms = filterAttribute[0].terms.filter((terms: IAttributeValue) => terms._id === idAttributeValue?.toString());
            setData(filterTerms);
        }
    }, [data2]);

    return (
        <>
            <h1 className="sm:text-lg text-base">Edit attribute value</h1>
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
                        name="value"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Value</FormLabel>
                                <FormControl>
                                    <Input placeholder="Value..." {...field} />
                                </FormControl>
                                <FormDescription>
                                    The value of attribute
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit" className="cursor-pointer">Submit</Button>
                </form>
            </Form>
        </>
    )
}

export default AdminAttributeValueEdit