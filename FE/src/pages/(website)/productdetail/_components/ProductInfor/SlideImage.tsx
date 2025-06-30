// import required modules
import type { Swiper as SwiperClass } from 'swiper';
import { FreeMode, Navigation, Pagination, Thumbs } from 'swiper/modules';
import { Swiper, SwiperSlide } from "swiper/react";

//Icons
import { ChevronDown, ChevronUp } from 'lucide-react';

//Custom CSS for swiper
import '../../productdetailcss.css';

//Image
import Product_Image from '@/assets/product.svg';
import Product_Image2 from '@/assets/product2.svg';
import Product_Image3 from '@/assets/product3.svg';
import Product_Image4 from '@/assets/product4.svg';
import Product_Image5 from '@/assets/product5.svg';

//Components

//Hook
import { useRef, useState } from 'react';
const SlideImage = ({ screenWidth }: { screenWidth: number }) => {
    const [thumbsSwiper, setThumbsSwiper] = useState<SwiperClass | null>(null);
    const swiperRef = useRef<SwiperClass | null>(null);

    return (
        <div className='product-swiper xl:grid xl:grid-cols-[25%_auto] xl:grid-rows-none flex flex-col gap-4 select-none'>
            <Swiper
                style={{
                    '--swiper-navigation-color': '#fff',
                    '--swiper-pagination-color': '#fff',
                } as any}
                loop={true}
                spaceBetween={16}
                navigation={false}
                thumbs={{ swiper: thumbsSwiper }}
                pagination={{
                    type: 'fraction',
                }}
                modules={[FreeMode, Navigation, Thumbs, Pagination]}
                className="mySwiper2 col-start-2"
            >
                <SwiperSlide>
                    <img src={Product_Image} alt="Product_Image" />
                </SwiperSlide>
                <SwiperSlide>
                    <img src={Product_Image2} alt="Product_Image" />
                </SwiperSlide>
                <SwiperSlide>
                    <img src={Product_Image3} alt="Product_Image" />
                </SwiperSlide>
                <SwiperSlide>
                    <img src={Product_Image4} alt="Product_Image" />
                </SwiperSlide>
                <SwiperSlide>
                    <img src={Product_Image5} alt="Product_Image" />
                </SwiperSlide>
            </Swiper>

            {/* Danh sách ảnh */}
            <div className="product-swiper col-start-1 lg:row-start-1 row-start-2 flex xl:flex-col flex-row items-center xl:max-h-[625px] lg:max-h-[150px] w-full">
                <button onClick={() => swiperRef.current?.slidePrev()} className='hover:cursor-pointer xl:rotate-0 -rotate-90'>
                    <ChevronUp size={28} />
                </button>
                <Swiper
                    direction={screenWidth > 1279 ? 'vertical' : 'horizontal'}
                    onSwiper={(swiper: any) => {
                        swiperRef.current = swiper;
                        setThumbsSwiper(swiper);
                    }}
                    loop={false}
                    spaceBetween={10}
                    slidesPerView={3}
                    freeMode={false}
                    watchSlidesProgress={true}
                    modules={[Navigation, Thumbs]}
                    className="mySwiper flex-1 w-full"
                >
                    <SwiperSlide>
                        <img src={Product_Image} alt="Product_Image" />
                    </SwiperSlide>
                    <SwiperSlide>
                        <img src={Product_Image2} alt="Product_Image" />
                    </SwiperSlide>
                    <SwiperSlide>
                        <img src={Product_Image3} alt="Product_Image" />
                    </SwiperSlide>
                    <SwiperSlide>
                        <img src={Product_Image4} alt="Product_Image" />
                    </SwiperSlide>
                    <SwiperSlide>
                        <img src={Product_Image5} alt="Product_Image" />
                    </SwiperSlide>
                </Swiper>
                <button onClick={() => swiperRef.current?.slideNext()} className='hover:cursor-pointer xl:rotate-0 -rotate-90'>
                    <ChevronDown size={28} />
                </button>
            </div>
        </div>
    )
}

export default SlideImage