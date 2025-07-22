import { useGetParams } from '@/common/hooks/useGetParams'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { setDefaultAttribute } from '@/store/slices/attributeSlice'
import type { AppDispatch } from '@/store/store'
import { createAttributeValue } from '@/store/thunks/attributeValueThunk'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { toast } from 'sonner'
import z from 'zod'

const FormSchema = z.object({
    name: z.string()
        .min(2, {
            message: "Name must be at least 2 characters.",
        })
        .refine(val => val === val.trim(), {
            message: "Name must not have whietspace."
        }),
    value: z.string()
        .min(1, {
            message: "Value must be required."
        })
        .refine(val => val === val.trim(), {
            message: "Value must not have whitespace."
        })
})

const AdminAttributeValueForm = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { idAttribute } = useGetParams(['idAttribute']);
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            name: "",
            value: ""
        },
    })

    function onSubmit(data: z.infer<typeof FormSchema>) {
        // toast("You submitted the following values", {
        //     description: (
        //         <pre className="mt-2 w-[320px] rounded-md bg-neutral-950 p-4">
        //             <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        //         </pre>
        //     ),
        // })

        if (!idAttribute) {
            toast.error("Attribute ID is missing. Cannot submit.");
            return;
        }

        const filData = {
            ...data,
            idAttribute: idAttribute
        }

        const promise = dispatch(createAttributeValue(filData)).unwrap().then(() => {
            // dispatch(setDefaultAttribute());
        })

        toast.promise(promise, {
            loading: '...Loading',
            success: () => {
                form.reset();
                return 'Success'
            },
            error: (error) => {
                return `Error: ${error}`
            }
        })
    }

    return (
        <>
            <h1 className="sm:text-lg text-base">Config terms</h1>
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

export default AdminAttributeValueForm