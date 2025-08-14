import { useGetParams } from "@/common/hooks/useGetParams";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useAppDispatch } from "@/store/store";
import { editCategory, getAllCategories } from "@/store/thunks/categoriesThunk";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { shallowEqual, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import z from "zod"

const FormSchema = z.object({
    _id: z.string(),
    name: z.string().min(2, {
        message: "Category name must be at least 2 characters.",
    }),
});

const EditCategoryForm = () => {
    const dispatch = useAppDispatch();
    const { categoryId } = useGetParams(['categoryId']);
    const [data, setData] = useState<any>();
    const navigate = useNavigate();
    const categories = useSelector((state: any) => state.categories.categoriesData, shallowEqual);
    useEffect(() => {
        if (categoryId) {
            const filterCategory = categories.filter((item: any) => item._id === categoryId);
            if (filterCategory.length === 1) {
                setData(filterCategory[0]);
            }
        }
    }, [categoryId, categories]);
    // console.log('data', data);
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            name: "",
        },
    })

    useEffect(() => {
        if (data) {
            form.reset({
                _id: data._id,
                name: data.name
            })
        }
    }, [data]);

    function onSubmit(data: z.infer<typeof FormSchema>) {
        console.log('data form', data)
        dispatch(editCategory(data)).unwrap()
            .then(() => {
                toast.success('Success');
                navigate(-1);
            })
            .catch((e) => {
                toast.error(`Error: ${e}`);
            })
    }

    return (
        <>
            <p className="text-2xl font-bold">Edit Category</p>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="sm:w-2/3 w-full space-y-6">
                    <input type="hidden" name="_id" />
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
        </>
    )
}

export default EditCategoryForm
