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
import { setDefaultAttribute } from "@/store/slices/attributeSlice"
import type { AppDispatch } from "@/store/store"
import { createAttribute } from "@/store/thunks/attributeThunk"
import { memo } from "react"
import { useDispatch } from "react-redux"

const FormSchema = z.object({
    name: z.string()
        .min(2, {
            message: "Name must be at least 2 characters.",
        })
        .refine(val => val === val.trim(), {
            message: 'Name must not have whitespace.'
        }),
    type: z.string()
        .min(2, {
            message: "Type must be at least 2 characters."
        })
        .refine(val => val === val.trim(), {
            message: 'Type must not have whitespace.'
        })
})

const AttributeForm = () => {
    const dispatch = useDispatch<AppDispatch>();
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            name: "",
            type: ""
        },
    });

    function onSubmit(data: z.infer<typeof FormSchema>) {
        const promise = dispatch(createAttribute({ data })).unwrap().then(() => {
            setTimeout(() => {
                form.reset();
                dispatch(setDefaultAttribute());
            }, 100)
        });

        toast.promise(promise, {
            loading: 'Loading...',
            success: 'Success',
            error: (error) => {
                return `Error: ${error}`
            }
        })
    };

    return (
        <div className="grid gap-3">
            <h1 className="sm:text-lg text-base">Add new attribute</h1>
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

export default memo(AttributeForm)