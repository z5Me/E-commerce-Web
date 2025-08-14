import type { productSchema } from "@/common/schemas/productSchema";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ImagePlus } from "lucide-react";
import type { UseFormReturn } from "react-hook-form";
import type z from "zod";
import ProductData from "./ProductData";
import { Editor } from '@tinymce/tinymce-react';
import { shallowEqual, useSelector } from "react-redux";
import { useEffect } from "react";
import { useAppDispatch } from "@/store/store";
import { getAllCategories } from "@/store/thunks/categoriesThunk";
import type { ICategory } from "@/common/types/category";
import { Checkbox } from "@/components/ui/checkbox";

const VITE_TINYMCE_KEY = import.meta.env.VITE_TINYMCE_KEY;

type Props = {
    previewImage: string | null,
    setPreviewImage: (value: string) => void,
    form: UseFormReturn<z.infer<typeof productSchema>>
}

const ProductForm = ({ previewImage, setPreviewImage, form }: Props) => {
    const dispatch = useAppDispatch();
    const allCategories = useSelector((state: any) => state.categories.categoriesData, shallowEqual);
    useEffect(() => {
        dispatch(getAllCategories({}));
    }, []);
    // console.log('allCategories', allCategories)
    return (
        <div className="w-full flex flex-row-reverse gap-4">
            <div className="w-full max-w-[500px]">
                <Accordion
                    type="single"
                    collapsible
                    className="w-full"
                    defaultValue="item-1"
                >
                    <AccordionItem value="item-1">
                        <AccordionTrigger>Product Image</AccordionTrigger>
                        <AccordionContent className="flex flex-col gap-4 text-balance">
                            <FormField
                                control={form.control}
                                name="productImage"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel htmlFor="productImage" className="border border-dashed aspect-square grid justify-center rounded-md">
                                            {previewImage ? (
                                                <img
                                                    src={previewImage}
                                                    alt="Preview"
                                                    className="object-cover rounded-md border"
                                                />
                                            ) : (
                                                <ImagePlus size={48} />
                                            )}
                                        </FormLabel>

                                        <FormControl>
                                            <Input
                                                id="productImage"
                                                type="file"
                                                accept="image/*"
                                                className="hidden"
                                                onChange={(e: any) => {
                                                    const file = e.target.files?.[0];
                                                    // console.log(file);
                                                    if (file) {
                                                        // Gọi onChange của React Hook Form
                                                        field.onChange(file);
                                                        // Hiển thị ảnh preview
                                                        const url = URL.createObjectURL(file);
                                                        setPreviewImage(url);
                                                    }
                                                }}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
                <div>
                    <FormField
                        control={form.control}
                        name="categories"
                        render={() => (
                            <FormItem>
                                <div className="mb-4">
                                    <FormLabel className="text-base">Categories</FormLabel>
                                    <FormDescription>
                                        Select the Category for this product.
                                    </FormDescription>
                                </div>
                                {allCategories.map((item: ICategory) => (
                                    <FormField
                                        key={item._id}
                                        control={form.control}
                                        name="categories"
                                        render={({ field }) => {
                                            return (
                                                <FormItem
                                                    key={item._id}
                                                    className="flex flex-row items-center gap-2"
                                                >
                                                    <FormControl>
                                                        <Checkbox
                                                            checked={field.value?.includes(item._id as string)}
                                                            onCheckedChange={(checked) => {
                                                                return checked
                                                                    ? field.onChange([...field.value, item._id])
                                                                    : field.onChange(
                                                                        field.value?.filter(
                                                                            (value) => value !== item._id
                                                                        )
                                                                    )
                                                            }}
                                                        />
                                                    </FormControl>
                                                    <FormLabel className="text-sm font-normal">
                                                        {item.name}
                                                    </FormLabel>
                                                </FormItem>
                                            )
                                        }}
                                    />
                                ))}
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
            </div>
            <div className="w-full space-y-6">
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
                    name="desc"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                                <Editor
                                    apiKey={VITE_TINYMCE_KEY}
                                    value={field.value}
                                    onEditorChange={(content) => field.onChange(content)}
                                    init={{
                                        plugins: [
                                            'anchor', 'autolink', 'charmap', 'codesample', 'emoticons',
                                            'image', 'link', 'lists', 'media', 'searchreplace', 'table',
                                            'visualblocks', 'wordcount'
                                        ],
                                        toolbar:
                                            'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
                                        tinycomments_mode: 'embedded',
                                        tinycomments_author: 'Author name',
                                        mergetags_list: [
                                            { value: 'First.Name', title: 'First Name' },
                                            { value: 'Email', title: 'Email' },
                                        ],
                                        ai_request: (_: any, respondWith: any) =>
                                            respondWith.string(() =>
                                                Promise.reject('See docs to implement AI Assistant')
                                            ),
                                    }}
                                />
                            </FormControl>
                            <FormDescription>
                                Detail description product.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="shortDesc"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Short Description</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="Tell us a little bit about your product"
                                    className="resize-none"
                                    {...field}
                                />
                            </FormControl>
                            <FormDescription>
                                Short description product.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div>
                    Review
                </div>
                <div>
                    <ProductData form={form} />
                </div>
                <Button type="submit" className="cursor-pointer">Submit</Button>
            </div>
        </div>
    )
}

export default ProductForm
