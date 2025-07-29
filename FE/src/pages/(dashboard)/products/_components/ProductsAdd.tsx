import { productSchema } from "@/common/schemas/productSchema";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { setDefaultProduct, setStatusProductPending } from "@/store/slices/productSlice";
import { resetForm } from "@/store/slices/variantSlice";
import type { AppDispatch } from "@/store/store";
import { getAllAttribute } from "@/store/thunks/attributeThunk";
import { createProduct } from "@/store/thunks/productThunk";
import { editVariant, generateVariant } from "@/store/thunks/variantThunk";
import { zodResolver } from '@hookform/resolvers/zod';
import { Editor } from '@tinymce/tinymce-react';
import axios from "axios";
import { Grid2x2, ImagePlus, SquareChartGantt } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import z from "zod";
import AdminConfigAttributes from "./ConfigAttributes";
import AdminConfigVariant from "./ConfigVariant";

const VITE_TINYMCE_KEY = import.meta.env.VITE_TINYMCE_KEY;

const AdminProductsAdd = () => {
    const dispatch = useDispatch<AppDispatch>();

    const form = useForm<z.infer<typeof productSchema>>({
        mode: 'onChange',
        resolver: zodResolver(productSchema),
        defaultValues: {
            name: '',
            desc: '',
            shortDesc: '',
            productImage: undefined,
            variants: [],
        },
    });
    const uploadSingleImage = async (file: any) => {
        const CLOUND_NAME = 'dnqj78t2f';
        const PRESET_NAME = 'demo-upload';
        const FOLDER_NAME = 'Test';
        const CLOUND_API = `https://api.cloudinary.com/v1_1/${CLOUND_NAME}/image/upload`;

        const formData = new FormData();

        formData.append("upload_preset", PRESET_NAME);
        formData.append("folder", FOLDER_NAME);
        formData.append("file", file);

        const response = await axios.post(`${CLOUND_API}`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            }
        })
        return response.data.secure_url;
    }

    async function onSubmit(data: any) {

        dispatch(setStatusProductPending());

        //Tải ảnh lên cloudinary
        const mainImage = await uploadSingleImage(data.productImage);

        // Tải ảnh của các Variant lên cloudinary (tạo mảng mới chỉ lưu _id)
        const variantsWithImage = await Promise.all(
            data.variants.map(async (item: any) => {
                const url = await uploadSingleImage(item.image);
                //Cập nhật những chỉnh sửa và đường link ảnh
                const getIdAfterEdit = await dispatch(editVariant({ ...item, image: url }));
                //Trả về _id
                return getIdAfterEdit.payload;
            })
        );

        const finalData = {
            ...data,
            variants: variantsWithImage,
            productImage: mainImage
        };
        // console.log('finalData: ', finalData)
        //Tạo product
        const promise = dispatch(createProduct(finalData)).unwrap().then(() => {
            setTimeout(() => {
                form.reset({
                    name: '',
                    desc: '',
                    shortDesc: '',
                    productImage: undefined,
                    variants: [],
                });
                setPreviewImage(null);
                dispatch(resetForm());
                dispatch(setDefaultProduct());
            }, 100)
        });

        toast.promise(promise, {
            loading: '...Loading',
            success: 'Success',
            error: (error) => {
                return `Error: ${error}`
            }
        })
    };

    const [previewImage, setPreviewImage] = useState<string | null>(null);

    const [switchCase, setSwitchCase] = useState<string>('attributes');

    const dataAttribute = useSelector((state: any) => state.attribute.dataAttribute, shallowEqual);
    const status = useSelector((state: any) => state.attribute.status, shallowEqual);

    const dataGenerateVariant = useSelector((state: any) => state.attribute.dataGenerateVariant, shallowEqual);
    const handleGenerate = () => {
        if (dataGenerateVariant.length !== 0) {
            dispatch(generateVariant(dataGenerateVariant));
            return;
        }
        toast.warning('Choose and save attributes to continue');
    }

    useEffect(() => {
        if (status === 'idle') {
            dispatch(getAllAttribute({ filterDelete: 'true' }));
        }
        return
    }, [status, dispatch]);

    const dataVariant = useSelector((state: any) => state.variant.dataVariant, shallowEqual);
    useEffect(() => {
        if (dataVariant && dataVariant.length > 0) {
            form.reset({
                ...form.getValues(),
                variants: dataVariant,
            })
        }
    }, [dataVariant]);

    // console.log('dataVariant: ', dataVariant);

    return (
        <div className="grid gap-3">
            <h1 className="sm:text-lg text-base">Add new product</h1>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
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
                                <Accordion type="single" collapsible>
                                    <AccordionItem value="item-1">
                                        <AccordionTrigger className="p-0 mb-6 border-b rounded-none">Product data</AccordionTrigger>
                                        <AccordionContent>
                                            <div className="w-full flex gap-x-4 py-1">
                                                <div className="w-[200px] h-[200px]">
                                                    <div onClick={() => setSwitchCase('attributes')} className={`px-2 py-3 flex gap-2 items-center cursor-pointer ${switchCase === 'attributes' ? 'bg-gray-100' : 'bg-transparent hover:bg-gray-100'} `}>
                                                        <SquareChartGantt size={20} />
                                                        <p>Attributes</p>
                                                    </div>
                                                    <div onClick={() => setSwitchCase('variants')} className={`px-2 py-3 flex gap-2 items-center cursor-pointer ${switchCase === 'variants' ? 'bg-gray-100' : 'bg-transparent hover:bg-gray-100'} `}>
                                                        <Grid2x2 size={20} />
                                                        <p>Varaints</p>
                                                    </div>
                                                </div>
                                                {(switchCase && switchCase === 'attributes')
                                                    ?
                                                    <>
                                                        <AdminConfigAttributes dataAttribute={dataAttribute} />
                                                    </>
                                                    :
                                                    switchCase === 'variants'
                                                        ?
                                                        < div className="flex flex-col gap-3 w-full">
                                                            <div className="">
                                                                <div
                                                                    onClick={() => handleGenerate()}
                                                                    className="border w-fit px-2 py-1.5 rounded-sm hover:bg-gray-100 cursor-pointer select-none"
                                                                >
                                                                    Generate variants
                                                                </div>
                                                            </div>

                                                            {dataVariant && dataVariant.length > 0 && dataVariant.map((item: any, index: number) => (
                                                                <AdminConfigVariant key={item._id} data={item} form={form} index={index} />
                                                            ))}
                                                        </div>
                                                        :
                                                        <div></div>
                                                }

                                            </div>
                                        </AccordionContent>
                                    </AccordionItem>
                                </Accordion>
                            </div>
                            <Button type="submit" className="cursor-pointer">Submit</Button>
                        </div>
                    </div>
                </form>
            </Form>
        </div >
    )
}

export default AdminProductsAdd