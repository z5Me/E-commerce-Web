//Custom CSS for swiper
import type { IProduct } from '@/common/types/product';
import '../../productdetailcss.css';
import InforProduct from './InforProduct';

import SlideImage from './SlideImage';
import { useEffect, useState } from 'react';
import type { IVariant } from '@/common/types/variant';

const ProductInfor = ({ screenWidth, data }: { screenWidth: number, data: IProduct }) => {
    const [imageList, setImageList] = useState<string[]>([]);
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
            <SlideImage screenWidth={screenWidth} imageList={imageList} />
            <InforProduct variants={data.variants} />
        </div>
    )
}

export default ProductInfor