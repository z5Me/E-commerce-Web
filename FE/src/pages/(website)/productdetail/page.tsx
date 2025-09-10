//Custom CSS
import './productdetailcss.css';

//Image
import useScreenWidth from '@/common/hooks/useScreenWidth';
import ProductsList from "@/components/ProductsList";
import { getDetailProduct } from '@/lib/utils';
import { ChevronRight } from 'lucide-react';
import { useEffect } from "react";
import ProductInfor from './_components/ProductInfor';
import ReviewDetail from './_components/ReviewDetail';
import { shallowEqual, useSelector } from 'react-redux';

const ProductDetail = () => {
    const screenWidth = useScreenWidth();
    useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }, []);

    const data = getDetailProduct();
    //Check danh sách yêu thích
    const dataUser = useSelector((state: any) => state.user.dataUser, shallowEqual);
    const checkWishList = dataUser.wishList.some((list: any) => list.idProduct === data?._id);

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
                {data && <ProductInfor screenWidth={screenWidth} data={data} checkWishList={checkWishList} />}
                {/* Review */}
                {data && <ReviewDetail screenWidth={screenWidth} data={data} />}

                {/* You Might Also Like */}
                <ProductsList className="mb-[78px]" caption="You might also like" loadMoreProducts={false} />
            </div>
        </section>
    )
}

export default ProductDetail