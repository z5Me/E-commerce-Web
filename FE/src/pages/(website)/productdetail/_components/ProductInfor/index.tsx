//Custom CSS for swiper
import '../../productdetailcss.css';
import InforProduct from './InforProduct';

import SlideImage from './SlideImage';

const ProductInfor = ({ screenWidth }: { screenWidth: number }) => {

    return (
        <div className='grid lg:grid-cols-2 grid-cols-1 sm:gap-10 gap-5'>
            <SlideImage screenWidth={screenWidth} />
            <InforProduct />
        </div>
    )
}

export default ProductInfor