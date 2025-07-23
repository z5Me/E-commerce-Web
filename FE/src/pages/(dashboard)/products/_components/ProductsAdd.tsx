import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { Editor } from '@tinymce/tinymce-react';
import { Grid2x2, ImagePlus, SquareChartGantt } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

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
        }),
    des: z.string()
        .min(10, { message: "Description must be at least 2 characters." })
        .refine(value => value.replace(/<[^>]*>?/gm, '').trim().length > 0, {
            message: "Description must not be empty.",
        }),
    shortDesc: z.string()
        .min(10, {
            message: "Short Description must be at least 10 characters.",
        })
        .max(160, {
            message: "Short Description must not be longer than 30 characters.",
        }),
    fileImage: z
        .any()
        .refine((file) => file instanceof File || (file && file[0] instanceof File), {
            message: "Please upload an image.",
        }),
    sku: z.string(),
    // Fix price và discount
    // price: z.preprocess(
    //     (val) => val === '' ? undefined : Number(val),
    //     z.number().min(0.01, {
    //         message: 'Price must be greater than 0',
    //     })
    // ),
    // discount: z.string()
})

const VITE_TINYMCE_KEY = import.meta.env.VITE_TINYMCE_KEY;

const AdminProductsAdd = () => {
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            name: "",
            des: "",
            shortDesc: "",
            fileImage: "",
            sku: "",
            // price: 0,
            // discount: '0'
        },
    });

    function onSubmit(data: z.infer<typeof FormSchema>) {
        toast("You submitted the following values", {
            description: (
                <pre className="mt-2 w-[320px] rounded-md bg-neutral-950 p-4">
                    <code className="text-white">{JSON.stringify(data, null, 2)}</code>
                </pre>
            ),
        });
    };

    const [previewImage, setPreviewImage] = useState<string | null>(null);
    const [openDropdownVariant, setOpenDropdownVariant] = useState<string>('id');

    return (
        <div className="grid gap-3">
            <h1 className="sm:text-lg text-base">Add new product</h1>

            <div className="w-full flex flex-row-reverse gap-4">
                <div className="min-w-[500px]"></div>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
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
                                name="des"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Description</FormLabel>
                                        <FormControl>
                                            <Editor
                                                apiKey={VITE_TINYMCE_KEY}
                                                value={field.value} // <-- cần thêm
                                                onEditorChange={(content) => field.onChange(content)} // <-- cần thêm
                                                init={{
                                                    plugins: [
                                                        'anchor', 'autolink', 'charmap', 'codesample', 'emoticons',
                                                        'image', 'link', 'lists', 'media', 'searchreplace', 'table',
                                                        'visualblocks', 'wordcount', 'checklist', 'mediaembed', 'casechange',
                                                        'formatpainter', 'pageembed', 'a11ychecker', 'tinymcespellchecker',
                                                        'permanentpen', 'powerpaste', 'advtable', 'advcode', 'editimage',
                                                        'advtemplate', 'ai', 'mentions', 'tinycomments', 'tableofcontents',
                                                        'footnotes', 'mergetags', 'autocorrect', 'typography', 'inlinecss',
                                                        'markdown', 'importword', 'exportword', 'exportpdf'
                                                    ],
                                                    toolbar:
                                                        'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
                                                    tinycomments_mode: 'embedded',
                                                    tinycomments_author: 'Author name',
                                                    mergetags_list: [
                                                        { value: 'First.Name', title: 'First Name' },
                                                        { value: 'Email', title: 'Email' },
                                                    ],
                                                    ai_request: (request: any, respondWith: any) =>
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
                                <Accordion type="single" collapsible>
                                    <AccordionItem value="item-1">
                                        <AccordionTrigger className="p-0 mb-6 border-b rounded-none">Product data</AccordionTrigger>
                                        <AccordionContent>
                                            <div className="w-full flex">
                                                <div className="w-[200px] h-[200px]">
                                                    <div className="px-2 py-3 flex gap-2 items-center cursor-pointer bg-gray-100">
                                                        <SquareChartGantt size={20} />
                                                        <p>Attributes</p>
                                                    </div>
                                                    <div className="px-2 py-3 flex gap-2 items-center cursor-pointer hover:bg-gray-100">
                                                        <Grid2x2 size={20} />
                                                        <p>Varaints</p>
                                                    </div>

                                                </div>
                                                <div className="flex flex-col gap-3 w-full">
                                                    <div className="pl-2">
                                                        <div className="border w-fit px-2 py-1.5 rounded-sm hover:bg-gray-100 cursor-pointer select-none">Generate variants</div>
                                                    </div>
                                                    <div className="flex flex-col gap-1">
                                                        <div
                                                            onClick={() => setOpenDropdownVariant((prev) => {
                                                                if (prev === 'id') return '';
                                                                return 'id';
                                                            })}
                                                            className="flex justify-between items-center gap-2 border-b pb-2"
                                                        >
                                                            <p className="font-bold">#2789</p>
                                                            <div className="flex-1 flex gap-1 *:select-none">
                                                                <Select>
                                                                    <SelectTrigger className="w-[180px]">
                                                                        <SelectValue placeholder="Theme" />
                                                                    </SelectTrigger>
                                                                    <SelectContent>
                                                                        <SelectItem value="light">Light</SelectItem>
                                                                        <SelectItem value="dark">Dark</SelectItem>
                                                                        <SelectItem value="system">System</SelectItem>
                                                                    </SelectContent>
                                                                </Select>
                                                                <Select>
                                                                    <SelectTrigger className="w-[180px]">
                                                                        <SelectValue placeholder="Theme" />
                                                                    </SelectTrigger>
                                                                    <SelectContent>
                                                                        <SelectItem value="light">Light</SelectItem>
                                                                        <SelectItem value="dark">Dark</SelectItem>
                                                                        <SelectItem value="system">System</SelectItem>
                                                                    </SelectContent>
                                                                </Select>
                                                            </div>
                                                            <div className="flex gap-4 font-medium *:hover:underline *:cursor-pointer">
                                                                <p onClick={(e) => e.stopPropagation()} className="text-danger">Remove</p>
                                                                <p className="text-blue-500">Edit</p>
                                                            </div>
                                                        </div>

                                                        <div className={`w-full p-3 ${openDropdownVariant === 'id' ? 'h-[300px] border' : 'h-0'} transition-all duration-300`}>
                                                            <div className="grid grid-cols-2 gap-4">
                                                                <FormField
                                                                    control={form.control}
                                                                    name="fileImage"
                                                                    render={({ field }) => (
                                                                        <FormItem>
                                                                            <FormLabel htmlFor="fileImage">
                                                                                {previewImage ? (
                                                                                    <img
                                                                                        src={previewImage}
                                                                                        alt="Preview"
                                                                                        className="w-24 h-24 object-cover rounded-md border"
                                                                                    />
                                                                                ) : (
                                                                                    <ImagePlus size={48} />
                                                                                )}
                                                                            </FormLabel>

                                                                            <FormControl>
                                                                                <Input
                                                                                    id="fileImage"
                                                                                    type="file"
                                                                                    accept="image/*"
                                                                                    className="hidden"
                                                                                    onChange={(e) => {
                                                                                        const file = e.target.files?.[0];
                                                                                        if (file) {
                                                                                            // Gọi onChange của React Hook Form
                                                                                            field.onChange(e);
                                                                                            // Hiển thị ảnh preview
                                                                                            const url = URL.createObjectURL(file);
                                                                                            setPreviewImage(url);
                                                                                        }
                                                                                    }}
                                                                                />
                                                                            </FormControl>

                                                                            <FormDescription>Image for this variant.</FormDescription>
                                                                            <FormMessage />
                                                                        </FormItem>
                                                                    )}
                                                                />
                                                                <FormField
                                                                    control={form.control}
                                                                    name="sku"
                                                                    render={({ field }) => (
                                                                        <FormItem>
                                                                            <FormLabel>SKU</FormLabel>
                                                                            <FormControl>
                                                                                <Input placeholder="abc123" {...field} />
                                                                            </FormControl>
                                                                            <FormDescription>
                                                                                Custom SKU for this variant
                                                                            </FormDescription>
                                                                            <FormMessage />
                                                                        </FormItem>
                                                                    )}
                                                                />
                                                            </div>
                                                            <div className="grid">
                                                                <Select>
                                                                    <SelectTrigger className="w-[180px]">
                                                                        <SelectValue placeholder="Select a fruit" />
                                                                    </SelectTrigger>
                                                                    <SelectContent>
                                                                        <SelectGroup>
                                                                            <SelectLabel>Fruits</SelectLabel>
                                                                            <SelectItem value="apple">Apple</SelectItem>
                                                                            <SelectItem value="banana">Banana</SelectItem>
                                                                            <SelectItem value="blueberry">Blueberry</SelectItem>
                                                                            <SelectItem value="grapes">Grapes</SelectItem>
                                                                            <SelectItem value="pineapple">Pineapple</SelectItem>
                                                                        </SelectGroup>
                                                                    </SelectContent>
                                                                </Select>
                                                                <div className="grid grid-cols-2 gap-4">
                                                                    <FormField
                                                                        control={form.control}
                                                                        name="price"
                                                                        render={({ field }) => (
                                                                            <FormItem>
                                                                                <FormLabel>Regular price</FormLabel>
                                                                                <FormControl>
                                                                                    <Input
                                                                                        type="number"
                                                                                        value={field.value ?? ''}
                                                                                        onChange={(e) => field.onChange(e.target.value)}
                                                                                    />
                                                                                </FormControl>
                                                                                <FormDescription>
                                                                                    Origin price for this variant.
                                                                                </FormDescription>
                                                                                <FormMessage />
                                                                            </FormItem>
                                                                        )}
                                                                    />
                                                                    <FormField
                                                                        control={form.control}
                                                                        name="discount"
                                                                        render={({ field }) => (
                                                                            <FormItem>
                                                                                <FormLabel>Discount</FormLabel>
                                                                                <FormControl>
                                                                                    <Input
                                                                                        type="number"
                                                                                        value={field.value}
                                                                                        onChange={(e) => field.onChange(e.target.value)}
                                                                                    />
                                                                                </FormControl>
                                                                                <FormDescription>
                                                                                    Discount price for this variant.
                                                                                </FormDescription>
                                                                                <FormMessage />
                                                                            </FormItem>
                                                                        )}
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </AccordionContent>
                                    </AccordionItem>
                                </Accordion>
                            </div>
                        </div>
                        <Button type="submit" className="cursor-pointer">Submit</Button>
                    </form>
                </Form>
            </div>
        </div >
    )
}

export default AdminProductsAdd