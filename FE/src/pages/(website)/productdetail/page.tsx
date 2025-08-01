//Custom CSS
import './productdetailcss.css';

//Image
import ProductsList from "@/components/ProductsList";
import { ChevronRight } from 'lucide-react';
import { useEffect, useState } from "react";
import ReviewDetail from './_components/ReviewDetail';
import ProductInfor from './_components/ProductInfor';
import { useParams } from 'react-router';
import { shallowEqual, useSelector } from 'react-redux';
import type { IProduct } from '@/common/types/product';

const ProductDetail = () => {
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);

    useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }, []);

    useEffect(() => {
        const handdleResize = () => {
            setScreenWidth(window.innerWidth)
        }

        window.addEventListener('resize', handdleResize);

        return () => window.removeEventListener('resize', handdleResize);
    }, []);

    const { slug } = useParams();
    const dataProducts = useSelector((state: any) => state.product.dataProducts, shallowEqual);
    const [data, setData] = useState<IProduct>();

    useEffect(() => {
        if (dataProducts && dataProducts.length > 0) {
            const filterProduct = dataProducts.filter((item: IProduct) => item.slug === slug);
            if (filterProduct) {
                setData(filterProduct[0]);
                return;
            }

            return;
        }
    }, [dataProducts]);

    // console.log('data: ', data);

    return (
        <section className='flex justify-center'>
            <div className='max-w-[1920px] w-full defaultPadding'>
                {/* điều hướng */}
                <div className='w-full flex flex-col gap-6 mb-9'>
                    <div className='h-[1px] w-full bg-primary/10'></div>
                    <div className='flex lg:gap-3 gap-[6px]'>
                        <div className='flex gap-1 items-center font-MJSatoshi lg:text-base text-sm text-primary/60'>
                            <p>Home</p>
                            <ChevronRight size={18} />
                        </div>
                        <div className='flex gap-1 items-center font-MJSatoshi lg:text-base text-sm text-primary/60'>
                            <p>Shop</p>
                            <ChevronRight size={18} />
                        </div>
                        <div className='flex gap-1 items-center font-MJSatoshi lg:text-base text-sm text-primary/60'>
                            <p>Men</p>
                            <ChevronRight size={18} />
                        </div>
                        <div className='flex gap-1 items-center font-MJSatoshi lg:text-base text-sm text-primary'>
                            <p>T-Shirt</p>
                            {/* <ChevronRight size={18} /> */}
                        </div>
                    </div>
                </div>
                {/* thông tin sản phẩm */}
                {data && <ProductInfor screenWidth={screenWidth} data={data} />}
                {/* Review */}
                {data && <ReviewDetail screenWidth={screenWidth} data={data} />}

                {/* You Might Also Like */}
                <ProductsList className="mb-[78px]" caption="You might also like" loadMoreProducts={false} />
            </div>
        </section>
    )
}

export default ProductDetail