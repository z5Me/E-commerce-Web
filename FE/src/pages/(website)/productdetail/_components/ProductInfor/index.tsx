//Custom CSS for swiper
import type { IProduct } from '@/common/types/product';
import '../../productdetailcss.css';
import InforProduct from './InforProduct';

import SlideImage from './SlideImage';
import { useEffect, useRef, useState } from 'react';
import type { IVariant } from '@/common/types/variant';
import type { SwiperClass } from 'swiper/react';

const ProductInfor = ({ screenWidth, data }: { screenWidth: number, data: IProduct }) => {
    const [imageList, setImageList] = useState<string[]>([]);
    const swiperRef = useRef<SwiperClass | null>(null);
    const [thumbsSwiper, setThumbsSwiper] = useState<SwiperClass | null>(null);
    const mainSwiperRef = useRef<SwiperClass | null>(null);

    useEffect(() => {
        let list = [];

        list.push(data.productImage);
        data.variants.forEach((item: IVariant) => (
            list.push(item.image)
        ))

        setImageList(list);

        return;
    }, [data]);

    // console.log('imageList: ', imageList);

    return (
        <div className='grid lg:grid-cols-2 grid-cols-1 sm:gap-10 gap-5'>
            <SlideImage screenWidth={screenWidth} imageList={imageList} swiperRef={swiperRef} thumbsSwiper={thumbsSwiper} setThumbsSwiper={setThumbsSwiper} mainSwiperRef={mainSwiperRef} />
            <InforProduct data={data} variants={data.variants} imageList={imageList} mainSwiperRef={mainSwiperRef} />
        </div>
    )
}

export default ProductInfor