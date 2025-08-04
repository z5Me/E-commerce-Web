// import required modules
import { FreeMode, Navigation, Pagination, Thumbs } from 'swiper/modules';
import { Swiper, SwiperSlide } from "swiper/react";

//Icons
import { ChevronDown, ChevronUp } from 'lucide-react';

//Custom CSS for swiper
import '../../productdetailcss.css';

type Props = {
    screenWidth: number,
    imageList: string[],
    swiperRef: any,
    thumbsSwiper: any,
    setThumbsSwiper: (value: any) => void,
    mainSwiperRef: any
};

const SlideImage = ({ screenWidth, imageList, swiperRef, thumbsSwiper, setThumbsSwiper, mainSwiperRef }: Props) => {

    return (
        <div className='product-swiper xl:grid xl:grid-cols-[25%_auto] xl:grid-rows-none flex flex-col gap-4 select-none'>
            <Swiper
                onSwiper={(swiper) => (mainSwiperRef.current = swiper)}
                style={{
                    '--swiper-navigation-color': '#fff',
                    '--swiper-pagination-color': '#fff',
                } as any}
                loop={false}
                spaceBetween={16}
                navigation={false}
                thumbs={{ swiper: thumbsSwiper }}
                pagination={{
                    type: 'fraction',
                }}
                modules={[FreeMode, Navigation, Thumbs, Pagination]}
                className="mySwiper2 col-start-2"
            >
                {imageList && imageList.length > 0 && imageList.map((item) => (
                    <SwiperSlide key={item}>
                        <img src={item} alt="Product_Image" />
                    </SwiperSlide>
                ))}
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
                    className="mySwiper flex-1 w-full overflow-hidden"
                >
                    {imageList && imageList.length > 0 && imageList.map((item) => (
                        <SwiperSlide key={item}>
                            <img src={item} alt="Product_Image" />
                        </SwiperSlide>
                    ))}
                </Swiper>
                <button onClick={() => swiperRef.current?.slideNext()} className='hover:cursor-pointer xl:rotate-0 -rotate-90'>
                    <ChevronDown size={28} />
                </button>
            </div>
        </div>
    )
}

export default SlideImage