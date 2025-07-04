// Icons
import { ArrowLeft, ArrowRight } from 'lucide-react';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import '../customSwiper.css';

// import required modules
import CustomerEvaluation from '@/components/CustomerEvaluation';
import { useRef, useState } from 'react';
import type { Swiper as SwiperType } from 'swiper';

const Evaluate = ({ screenWidth }: { screenWidth: number }) => {
    const swiperRef = useRef<SwiperType | null>(null);
    const [isBeginning, setIsBeginning] = useState<boolean>(true);
    const [isEnd, setIsEnd] = useState<boolean>(false);

    const prevSlice = () => {
        if (isBeginning === false) {
            // console.log('prev slide');
            swiperRef.current?.slidePrev();
            return;
        }
    }

    const nextSlice = () => {
        if (isEnd === false) {
            // console.log('next slide');
            swiperRef.current?.slideNext();
            return;
        }
    }

    const updateBlur = () => {
        const swiper = swiperRef.current;
        if (!swiper) return;

        const { slides, activeIndex, params, isBeginning, isEnd } = swiper;
        const visibleStart = activeIndex;
        const slidesPerView = typeof params.slidesPerView === 'number' ? params.slidesPerView : Number(params.slidesPerView ?? 1);
        const visibleEnd = activeIndex + slidesPerView - 1;

        //tạo blur
        slides.forEach((slide: HTMLElement, index: number) => {
            // console.log('index: ', index)
            //width 640px thì ko blur nữa
            if (screenWidth < 640) {
                slide.classList.remove("blur-[2px]");
                return;
            }

            // add blur cho slide
            if (index >= visibleStart && index <= visibleEnd) {
                slide.classList.remove("blur-[2px]");
            } else {
                // console.log('add blur index:', index);
                setTimeout(() => {
                    slide.classList.add("blur-[2px]");
                }, 1)
            }
        });

        //xác định đang ở đầu hoặc cuối trong slide
        setIsBeginning(isBeginning);
        setIsEnd(isEnd);
    };

    return (
        <>
            <section className='flex justify-center'>
                <div className='w-full max-w-[1920px]'>
                    <div className='pt-[80px] flex flex-col gap-10 mb-[80px]'>
                        <div className='flex justify-between defaultPadding'>
                            <p className='uppercase font-IntegralCF lg:text-5xl text-3xl font-bold'>Our happy Customers</p>
                            <div className='flex items-end gap-x-4'>
                                <button
                                    className={`${isBeginning === true ? 'opacity-50' : 'opacity-100 cursor-pointer'}`}
                                    onClick={() => prevSlice()}
                                >
                                    <ArrowLeft />
                                </button>
                                <button
                                    className={`${isEnd === true ? 'opacity-50' : 'opacity-100 cursor-pointer'}`}
                                    onClick={() => nextSlice()}
                                >
                                    <ArrowRight />
                                </button>
                            </div>
                        </div>
                        <div className='select-none relative'>
                            {/* <div className="absolute top-0 left-0 w-[100px] h-full z-10 pointer-events-none bg-gradient-to-r from-white/70 to-transparent"></div>
                        <div className="absolute top-0 right-0 w-[100px] h-full z-10 pointer-events-none bg-gradient-to-l from-white/70 to-transparent"></div> */}
                            <Swiper
                                grabCursor={true}
                                spaceBetween={20}
                                slidesPerView={screenWidth > 1536 ? 4 : screenWidth > 1280 ? 3 : screenWidth > 768 ? 2 : 1}
                                initialSlide={0}
                                allowTouchMove={true}
                                onSwiper={(swiper: any) => {
                                    swiperRef.current = swiper;
                                    updateBlur()
                                }}
                                onSlideChange={updateBlur}
                                onResize={updateBlur}
                                className="mySwiper"
                            >
                                {[...Array(20)].map((_, index) => (
                                    <SwiperSlide key={index}>
                                        <CustomerEvaluation index={index} />
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </div>
                    </div>
                </div>
            </section >
        </>
    )
}

export default Evaluate