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
    const [slideCount, setSlideCount] = useState(0);
    const totleSlide = 9;
    const maxSlideChanges = totleSlide - 4;

    const prevSlice = () => {
        swiperRef.current?.slidePrev();
        if (slideCount > 0) {
            setSlideCount((prev) => prev - 1);
            return;
        }

        if (slideCount === 0) {
            setSlideCount(totleSlide - 4);
            // useSwiperSlide
            // swiperRef.current?.slideTo(totleSlide - 2);
            return;
        }
    }

    const nextSlice = () => {
        if (slideCount < maxSlideChanges) {
            swiperRef.current?.slideNext();
            setSlideCount(slideCount + 1);
            return;
        } else {
            // swiperRef.current?.slideTo(0);
            setSlideCount(0)
        }
    }

    const updateBlur = () => {
        const swiper = swiperRef.current;
        if (!swiper) return;

        const { slides, activeIndex, params } = swiper;
        const visibleStart = activeIndex;
        const slidesPerView = typeof params.slidesPerView === 'number' ? params.slidesPerView : Number(params.slidesPerView ?? 1);
        const visibleEnd = activeIndex + slidesPerView - 1;

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
    };

    return (
        <>
            <section>
                <div className='pt-[80px] flex flex-col gap-10 mb-[80px]'>
                    <div className='flex justify-between defaultPadding'>
                        <p className='uppercase font-IntegralCF lg:text-5xl text-3xl font-bold'>Our happy Customers</p>
                        <div className='flex items-end gap-x-4 *:hover:cursor-pointer'>
                            <button onClick={() => prevSlice()}>
                                <ArrowLeft />
                            </button>
                            <button onClick={() => nextSlice()}>
                                <ArrowRight />
                            </button>
                        </div>
                    </div>
                    <div className='select-none relative'>
                        {/* <div className="absolute top-0 left-0 w-[100px] h-full z-10 pointer-events-none bg-gradient-to-r from-white/70 to-transparent"></div>
                        <div className="absolute top-0 right-0 w-[100px] h-full z-10 pointer-events-none bg-gradient-to-l from-white/70 to-transparent"></div> */}
                        <Swiper
                            grabCursor={true}
                            centeredSlides={false}
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
                            <SwiperSlide>
                                <CustomerEvaluation />
                            </SwiperSlide>
                            <SwiperSlide>
                                <CustomerEvaluation />
                            </SwiperSlide>
                            <SwiperSlide>
                                <CustomerEvaluation />
                            </SwiperSlide>
                            <SwiperSlide>
                                <CustomerEvaluation />
                            </SwiperSlide>
                            <SwiperSlide>
                                <CustomerEvaluation />
                            </SwiperSlide>
                            <SwiperSlide>
                                <CustomerEvaluation />
                            </SwiperSlide>
                            <SwiperSlide>
                                <CustomerEvaluation />
                            </SwiperSlide>
                            <SwiperSlide>
                                <CustomerEvaluation />
                            </SwiperSlide>
                            <SwiperSlide>
                                <CustomerEvaluation />
                            </SwiperSlide>
                        </Swiper>
                    </div>
                </div>
            </section >
        </>
    )
}

export default Evaluate