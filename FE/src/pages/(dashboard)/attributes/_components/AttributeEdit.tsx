"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import type { AppDispatch } from "@/store/store"
import { shallowEqual, useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { editAttribute, getAllAttribute } from "@/store/thunks/attributeThunk"
import type { IAttribute } from "@/common/types/attribute"
import { useGetParams } from "@/common/hooks/useGetParams"
import { setDefaultAttribute } from "@/store/slices/attributeSlice"
import { useNavigate } from "react-router"

const FormSchema = z.object({
    name: z.string()
        .min(2, {
            message: "Name must be at least 2 characters.",
        })
        .refine(val => val === val.trim(), {
            message: "Name must not have whitespace."
        }),
    type: z.string()
        .min(2, {
            message: "Type must be at least 2 characters."
        })
        .refine(val => val === val.trim(), {
            message: "Type must not have whitespace."
        })
})

const AdminAttributeEdit = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const { idAttribute } = useGetParams(['idAttribute'])
    const data2 = useSelector((state: any) => state.attribute.dataAttribute, shallowEqual);
    const status = useSelector((state: any) => state.attribute.status, shallowEqual);
    const [data, setData] = useState<IAttribute>();

    useEffect(() => {
        if (data2 && data2.length > 0) {
            const filterData = data2.filter((item: IAttribute) => item._id === idAttribute);
            setData(filterData[0]);
        }
    }, [data2]);

    useEffect(() => {
        if (data) {
            form.reset({
                name: data.name,
                type: data.type
            })
        };
    }, [data])

    useEffect(() => {
        if (status === 'idle') {
            dispatch(getAllAttribute({ filterDelete: 'true' }));
        }
        return
    }, [status, dispatch]);

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            name: "",
            type: ""
        },
    })

    function onSubmit(data: z.infer<typeof FormSchema>) {
        // toast("You submitted the following values", {
        //     description: (
        //         <pre className="mt-2 w-[320px] rounded-md bg-neutral-950 p-4">
        //             <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        //         </pre>
        //     ),
        // });

        const filData = {
            ...data,
            idAttribute: idAttribute as string
        }

        const promise = dispatch(editAttribute(filData)).unwrap().then(() => {
            setTimeout(() => {
                dispatch(setDefaultAttribute());
                navigate(-1);
            }, 100)
        })

        toast.promise(promise, {
            loading: '...Loading',
            success: 'Success',
            error: (error) => {
                return `Error: ${error}`
            }
        })
    }

    return (
        <div className="grid gap-3">
            <h1 className="sm:text-lg text-base">Edit attribute</h1>
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
        </div>
    )
}

export default AdminAttributeEdit