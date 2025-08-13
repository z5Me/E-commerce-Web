import { useGetParams } from "@/common/hooks/useGetParams";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useAppDispatch } from "@/store/store";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { shallowEqual, useSelector } from "react-redux";
import z from "zod"

const FormSchema = z.object({
    name: z.string().min(2, {
        message: "Category name must be at least 2 characters.",
    }),
});

const EditCategoryForm = () => {
    const dispatch = useAppDispatch();
    const { categoryId } = useGetParams(['categoryId']);
    const [data, setData] = useState<any>();
    const categories = useSelector((state: any) => state.categories.categoriesData, shallowEqual);
    useEffect(() => {
        if (categoryId) {
            const filterCategory = categories.filter((item: any) => item._id === categoryId);
            if (filterCategory.length === 1) {
                setData(filterCategory[0]);
            }
        }
    }, [categoryId])
    console.log('data', data);
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            name: "",
        },
    })

    function onSubmit(data: z.infer<typeof FormSchema>) {

    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="sm:w-2/3 w-full space-y-6">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Category name</FormLabel>
                            <FormControl>
                                <Input placeholder="shadcn" {...field} />
                            </FormControl>
                            <FormDescription>
                                This is your public Category name.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit">Submit</Button>
            </form>
        </Form>
    )
}

export default EditCategoryForm
