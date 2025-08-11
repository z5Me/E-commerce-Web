import type { AppDispatch } from "@/store/store";
import { getAllAttribute } from "@/store/thunks/attributeThunk";
import { useEffect, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import ProductForm from "./ProductForm";
import { useForm } from "react-hook-form";
import { productSchema } from "@/common/schemas/productSchema";
import type z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { setDefaultProduct, setStatusProductPending } from "@/store/slices/productSlice";
import { createSlug, uploadSingleImage } from "@/lib/utils";
import { editVariant } from "@/store/thunks/variantThunk";
import { createProduct } from "@/store/thunks/productThunk";
import { resetForm } from "@/store/slices/variantSlice";
import { toast } from "sonner";
import { Form } from "@/components/ui/form";

const AdminProductsAdd = () => {
    const dispatch = useDispatch<AppDispatch>();

    const status = useSelector((state: any) => state.attribute.status, shallowEqual);
    useEffect(() => {
        if (status === 'idle') {
            dispatch(getAllAttribute({ filterDelete: 'true' }));
        }
        return
    }, [status, dispatch]);

    const [previewImage, setPreviewImage] = useState<string | null>(null);

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

    async function onSubmit(data: z.infer<typeof productSchema>) {
        if (data.variants && data.variants.length > 0) {
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
                productImage: mainImage,
                slug: createSlug(data.name),
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
                    scrollTo({ top: 0, behavior: 'smooth' });
                }, 100)
            });

            toast.promise(promise, {
                loading: '...Loading',
                success: 'Success',
                error: (error) => {
                    return `Error: ${error}`
                }
            })
        } else {
            toast.warning('Please custom an variant to create new product!')
        }
    }

    return (
        <div className="grid gap-3">
            <h1 className="sm:text-2xl text-lg font-bold">Add new product</h1>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
                    <ProductForm previewImage={previewImage} setPreviewImage={setPreviewImage} form={form} />
                </form>
            </Form>
        </div >
    )
}

export default AdminProductsAdd