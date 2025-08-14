import { Form } from "@/components/ui/form"
import ProductForm from "./ProductForm"
import { uploadSingleImage } from "@/lib/utils";
import { editVariant } from "@/store/thunks/variantThunk";
import { setDefaultProduct, setStatusProductPending } from "@/store/slices/productSlice";
import { productSchema } from "@/common/schemas/productSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import type z from "zod";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { getAllAttribute } from "@/store/thunks/attributeThunk";
import { shallowEqual, useSelector } from "react-redux";
import { useAppDispatch } from "@/store/store";
import { useGetParams } from "@/common/hooks/useGetParams";
import type { IProduct } from "@/common/types/product";
import { setDataVariant } from "@/store/slices/variantSlice";
import { editProduct, getAllProducts } from "@/store/thunks/productThunk";
import { toast } from "sonner";
import { useNavigate } from "react-router";
import type { IVariant } from "@/common/types/variant";

const ProductsEdit = () => {
    const dispatch = useAppDispatch();
    const navaigate = useNavigate();
    const status = useSelector((state: any) => state.attribute.status, shallowEqual);
    useEffect(() => {
        if (status === 'idle') {
            dispatch(getAllAttribute({ filterDelete: 'true' }));
        }
        return
    }, [status, dispatch]);

    const dataProducts = useSelector((state: any) => state.product.dataProducts, shallowEqual);
    const [data, setData] = useState<IProduct>();
    // console.log('data', data)
    const { idProduct } = useGetParams(['idProduct']);
    useEffect(() => {
        if (dataProducts && dataProducts.length > 0) {
            const filterProduct = dataProducts.filter((item: IProduct) => (
                item._id === idProduct
            ));

            if (filterProduct) return setData(filterProduct[0]);

            return;
        } else {
            dispatch(getAllProducts({}));
        }

        return;
    }, [dataProducts]);

    useEffect(() => {
        if (data) {
            form.reset({
                name: data.name,
                desc: data.desc,
                shortDesc: data.shortDesc,
                productImage: typeof data.productImage === 'string' ? data.productImage : undefined,
                categories: data.categories ? data.categories.map(item => item._id) : [],
                variants: Array.isArray(data.variants)
                    ? data.variants.map((variant: IVariant) => ({
                        ...variant,
                        image: variant.image
                    }))
                    : [],
            });

            dispatch(setStatusProductPending());
            dispatch(setDataVariant(data.variants));
            setPreviewImage(data.productImage || null);
            setTimeout(() => {
                dispatch(setDefaultProduct());
            }, 500);
        }
    }, [data])

    const [previewImage, setPreviewImage] = useState<string | null>(null);

    const form = useForm<z.infer<typeof productSchema>>({
        mode: 'onChange',
        resolver: zodResolver(productSchema),
        defaultValues: {
            name: '',
            desc: '',
            shortDesc: '',
            productImage: undefined,
            categories: [],
            variants: []
        }
    });

    async function onSubmit(data: any) {
        dispatch(setStatusProductPending());
        // //Tải ảnh lên cloudinary
        let mainImage = data.productImage;
        //Kiểm tra nếu phát hiện thay ảnh thì mới tải lên cloundinary (ảnh cũ được lưu ở dạng string còn ảnh mới thì là File)
        if (data.productImage instanceof File) {
            mainImage = await uploadSingleImage(data.productImage);
        }

        // // Tải ảnh của các Variant lên cloudinary (tạo mảng mới chỉ lưu _id)
        const variantsWithImage = await Promise.all(
            data.variants.map(async (item: any) => {
                let imageUrl = item.image;
                //Kiểm tra ảnh giống ở trên
                if (imageUrl instanceof File) {
                    imageUrl = await uploadSingleImage(item.image);
                }

                //Cập nhật những chỉnh sửa và đường link ảnh
                const getIdAfterEdit = await dispatch(editVariant({ ...item, image: imageUrl }));
                //Trả về _id
                return getIdAfterEdit.payload;
            })
        );

        const finalData = {
            ...data,
            idProduct: idProduct,
            variants: variantsWithImage,
            productImage: mainImage
        };
        // console.log('finalData: ', finalData)
        //Edit product
        const promise = dispatch(editProduct(finalData)).unwrap().then(() => {
            navaigate(-1);
        });

        toast.promise(promise, {
            loading: '...Loading',
            success: 'Success',
            error: (error) => {
                return `Error: ${error}`
            }
        })
    };

    if (!data) return (
        <div className='min-h-[500px] grid gap-4 justify-center items-center'>
            <div>No result.</div>
        </div>
    )

    return (
        <div className="grid gap-3">
            <h1 className="sm:text-lg text-base">Edit product</h1>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
                    <ProductForm previewImage={previewImage} setPreviewImage={setPreviewImage} form={form} />
                </form>
            </Form>
        </div >
    )
}

export default ProductsEdit
