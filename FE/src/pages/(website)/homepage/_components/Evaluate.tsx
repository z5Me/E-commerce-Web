// Icons
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { FaStar } from "react-icons/fa";
import { FaCircleCheck } from "react-icons/fa6";

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import '../customSwiper.css';

// import required modules
import { useRef, useState } from 'react';
import type { Swiper as SwiperType } from 'swiper';
import { EffectCoverflow, Pagination } from 'swiper/modules';

const Evaluate = () => {
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
            swiperRef.current?.slideTo(totleSlide - 2);
            return;
        }
    }

    const nextSlice = () => {
        if (slideCount < maxSlideChanges) {
            swiperRef.current?.slideNext();
            setSlideCount(slideCount + 1);
            return;
        } else {
            swiperRef.current?.slideTo(0);
            setSlideCount(0)
        }
    }

    return (
        <>
            <section>
                <div className='pt-[80px] flex flex-col gap-10 mb-[80px]'>
                    <div className='flex justify-between defaultPadding'>
                        <p className='uppercase font-IntegralCF lg:text-5xl text-4xl font-bold'>Our happy Customers</p>
                        <div className='flex items-end gap-x-4'>
                            <button onClick={() => prevSlice()}>
                                <ArrowLeft />
                            </button>
                            <button onClick={() => nextSlice()}>
                                <ArrowRight />
                            </button>
                        </div>
                    </div>
                    <div className='defaultPadding'>
                        <Swiper
                            effect={'coverflow'}
                            grabCursor={true}
                            centeredSlides={false}
                            spaceBetween={20}
                            slidesPerView={'auto'}
                            initialSlide={0}
                            allowTouchMove={true}
                            coverflowEffect={{
                                rotate: 0,
                                stretch: 0,
                                depth: 0,
                                modifier: 0,
                                // slideShadows: true,
                            }}
                            // pagination={true}
                            modules={[EffectCoverflow, Pagination]}

                            onSwiper={(swiper: any) => {
                                // console.log('swiper để cho vào current: ', swiper);
                                swiperRef.current = swiper;
                            }}
                            // onSlideChange={(swiper) => {
                            //   if (slideCount < maxSlideChanges) {
                            //     setSlideCount((prev) => prev + 1);
                            //     console.log('slideCount: ', slideCount);
                            //     return;

                            //   } else {
                            //     swiper.slideTo(2);
                            //     setTimeout(() => {
                            //       setSlideCount(0)
                            //     }, 100)
                            //     return;
                            //   }
                            // }}
                            className="mySwiper"
                        >
                            <SwiperSlide>
                                <div className='flex flex-col border border-primary/10 rounded-[20px] lg:px-8 lg:py-7 px-6 py-6 gap-y-4'>
                                    <div className='flex gap-x-[6px]'>
                                        <FaStar className='w-[18px] h-[18px]' color='#FFC633' />
                                        <FaStar className='w-[18px] h-[18px]' color='#FFC633' />
                                        <FaStar className='w-[18px] h-[18px]' color='#FFC633' />
                                        <FaStar className='w-[18px] h-[18px]' color='#FFC633' />
                                        <FaStar className='w-[18px] h-[18px]' color='#FFC633' />
                                    </div>
                                    <div className='flex flex-col gap-y-3'>
                                        <div className='flex gap-x-1 items-center'>
                                            <p className='font-Satoshi font-bold lg:text-xl text-base'>Sarah 1.</p>
                                            <FaCircleCheck size={20} color='#01AB31' className='pb-[2px]' />
                                        </div>
                                        <p className='font-Satoshi font-base lg:ext-base text-sm text-primary/60'>
                                            "I'm blown away by the quality and style of the clothes I received from Shop.co. From casual wear to elegant dresses, every piece I've bought has exceeded my expectations.”
                                        </p>
                                    </div>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide>
                                <div className='flex flex-col border border-primary/10 rounded-[20px] px-8 py-7 gap-y-4'>
                                    <div className='flex gap-x-[6px]'>
                                        <FaStar className='w-[18px] h-[18px]' color='#FFC633' />
                                        <FaStar className='w-[18px] h-[18px]' color='#FFC633' />
                                        <FaStar className='w-[18px] h-[18px]' color='#FFC633' />
                                        <FaStar className='w-[18px] h-[18px]' color='#FFC633' />
                                        <FaStar className='w-[18px] h-[18px]' color='#FFC633' />
                                    </div>
                                    <div className='flex flex-col gap-y-3'>
                                        <div className='flex gap-x-1 items-center'>
                                            <p className='font-Satoshi font-bold lg:text-xl text-base'>Sarah 2.</p>
                                            <FaCircleCheck size={20} color='#01AB31' className='pb-[2px]' />
                                        </div>
                                        <p className='font-Satoshi font-base lg:ext-base text-sm text-primary/60'>
                                            "I'm blown away by the quality and style of the clothes I received from Shop.co. From casual wear to elegant dresses, every piece I've bought has exceeded my expectations.”
                                        </p>
                                    </div>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide>
                                <div className='flex flex-col border border-primary/10 rounded-[20px] px-8 py-7 gap-y-4'>
                                    <div className='flex gap-x-[6px]'>
                                        <FaStar className='w-[18px] h-[18px]' color='#FFC633' />
                                        <FaStar className='w-[18px] h-[18px]' color='#FFC633' />
                                        <FaStar className='w-[18px] h-[18px]' color='#FFC633' />
                                        <FaStar className='w-[18px] h-[18px]' color='#FFC633' />
                                        <FaStar className='w-[18px] h-[18px]' color='#FFC633' />
                                    </div>
                                    <div className='flex flex-col gap-y-3'>
                                        <div className='flex gap-x-1 items-center'>
                                            <p className='font-Satoshi font-bold lg:text-xl text-base'>Sarah 3.</p>
                                            <FaCircleCheck size={20} color='#01AB31' className='pb-[2px]' />
                                        </div>
                                        <p className='font-Satoshi font-base lg:ext-base text-sm text-primary/60'>
                                            "I'm blown away by the quality and style of the clothes I received from Shop.co. From casual wear to elegant dresses, every piece I've bought has exceeded my expectations.”
                                        </p>
                                    </div>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide>
                                <div className='flex flex-col border border-primary/10 rounded-[20px] px-8 py-7 gap-y-4'>
                                    <div className='flex gap-x-[6px]'>
                                        <FaStar className='w-[18px] h-[18px]' color='#FFC633' />
                                        <FaStar className='w-[18px] h-[18px]' color='#FFC633' />
                                        <FaStar className='w-[18px] h-[18px]' color='#FFC633' />
                                        <FaStar className='w-[18px] h-[18px]' color='#FFC633' />
                                        <FaStar className='w-[18px] h-[18px]' color='#FFC633' />
                                    </div>
                                    <div className='flex flex-col gap-y-3'>
                                        <div className='flex gap-x-1 items-center'>
                                            <p className='font-Satoshi font-bold lg:text-xl text-base'>Sarah 4.</p>
                                            <FaCircleCheck size={20} color='#01AB31' className='pb-[2px]' />
                                        </div>
                                        <p className='font-Satoshi font-base lg:ext-base text-sm text-primary/60'>
                                            "I'm blown away by the quality and style of the clothes I received from Shop.co. From casual wear to elegant dresses, every piece I've bought has exceeded my expectations.”
                                        </p>
                                    </div>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide>
                                <div className='flex flex-col border border-primary/10 rounded-[20px] px-8 py-7 gap-y-4'>
                                    <div className='flex gap-x-[6px]'>
                                        <FaStar className='w-[18px] h-[18px]' color='#FFC633' />
                                        <FaStar className='w-[18px] h-[18px]' color='#FFC633' />
                                        <FaStar className='w-[18px] h-[18px]' color='#FFC633' />
                                        <FaStar className='w-[18px] h-[18px]' color='#FFC633' />
                                        <FaStar className='w-[18px] h-[18px]' color='#FFC633' />
                                    </div>
                                    <div className='flex flex-col gap-y-3'>
                                        <div className='flex gap-x-1 items-center'>
                                            <p className='font-Satoshi font-bold lg:text-xl text-base'>Sarah 5.</p>
                                            <FaCircleCheck size={20} color='#01AB31' className='pb-[2px]' />
                                        </div>
                                        <p className='font-Satoshi font-base lg:ext-base text-sm text-primary/60'>
                                            "I'm blown away by the quality and style of the clothes I received from Shop.co. From casual wear to elegant dresses, every piece I've bought has exceeded my expectations.”
                                        </p>
                                    </div>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide>
                                <div className='flex flex-col border border-primary/10 rounded-[20px] px-8 py-7 gap-y-4'>
                                    <div className='flex gap-x-[6px]'>
                                        <FaStar className='w-[18px] h-[18px]' color='#FFC633' />
                                        <FaStar className='w-[18px] h-[18px]' color='#FFC633' />
                                        <FaStar className='w-[18px] h-[18px]' color='#FFC633' />
                                        <FaStar className='w-[18px] h-[18px]' color='#FFC633' />
                                        <FaStar className='w-[18px] h-[18px]' color='#FFC633' />
                                    </div>
                                    <div className='flex flex-col gap-y-3'>
                                        <div className='flex gap-x-1 items-center'>
                                            <p className='font-Satoshi font-bold lg:text-xl text-base'>Sarah 6.</p>
                                            <FaCircleCheck size={20} color='#01AB31' className='pb-[2px]' />
                                        </div>
                                        <p className='font-Satoshi font-base lg:ext-base text-sm text-primary/60'>
                                            "I'm blown away by the quality and style of the clothes I received from Shop.co. From casual wear to elegant dresses, every piece I've bought has exceeded my expectations.”
                                        </p>
                                    </div>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide>
                                <div className='flex flex-col border border-primary/10 rounded-[20px] px-8 py-7 gap-y-4'>
                                    <div className='flex gap-x-[6px]'>
                                        <FaStar className='w-[18px] h-[18px]' color='#FFC633' />
                                        <FaStar className='w-[18px] h-[18px]' color='#FFC633' />
                                        <FaStar className='w-[18px] h-[18px]' color='#FFC633' />
                                        <FaStar className='w-[18px] h-[18px]' color='#FFC633' />
                                        <FaStar className='w-[18px] h-[18px]' color='#FFC633' />
                                    </div>
                                    <div className='flex flex-col gap-y-3'>
                                        <div className='flex gap-x-1 items-center'>
                                            <p className='font-Satoshi font-bold lg:text-xl text-base'>Sarah 7.</p>
                                            <FaCircleCheck size={20} color='#01AB31' className='pb-[2px]' />
                                        </div>
                                        <p className='font-Satoshi font-base lg:ext-base text-sm text-primary/60'>
                                            "I'm blown away by the quality and style of the clothes I received from Shop.co. From casual wear to elegant dresses, every piece I've bought has exceeded my expectations.”
                                        </p>
                                    </div>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide>
                                <div className='flex flex-col border border-primary/10 rounded-[20px] px-8 py-7 gap-y-4'>
                                    <div className='flex gap-x-[6px]'>
                                        <FaStar className='w-[18px] h-[18px]' color='#FFC633' />
                                        <FaStar className='w-[18px] h-[18px]' color='#FFC633' />
                                        <FaStar className='w-[18px] h-[18px]' color='#FFC633' />
                                        <FaStar className='w-[18px] h-[18px]' color='#FFC633' />
                                        <FaStar className='w-[18px] h-[18px]' color='#FFC633' />
                                    </div>
                                    <div className='flex flex-col gap-y-3'>
                                        <div className='flex gap-x-1 items-center'>
                                            <p className='font-Satoshi font-bold lg:text-xl text-base'>Sarah 8.</p>
                                            <FaCircleCheck size={20} color='#01AB31' className='pb-[2px]' />
                                        </div>
                                        <p className='font-Satoshi font-base lg:ext-base text-sm text-primary/60'>
                                            "I'm blown away by the quality and style of the clothes I received from Shop.co. From casual wear to elegant dresses, every piece I've bought has exceeded my expectations.”
                                        </p>
                                    </div>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide>
                                <div className='flex flex-col border border-primary/10 rounded-[20px] px-8 py-7 gap-y-4'>
                                    <div className='flex gap-x-[6px]'>
                                        <FaStar className='w-[18px] h-[18px]' color='#FFC633' />
                                        <FaStar className='w-[18px] h-[18px]' color='#FFC633' />
                                        <FaStar className='w-[18px] h-[18px]' color='#FFC633' />
                                        <FaStar className='w-[18px] h-[18px]' color='#FFC633' />
                                        <FaStar className='w-[18px] h-[18px]' color='#FFC633' />
                                    </div>
                                    <div className='flex flex-col gap-y-3'>
                                        <div className='flex gap-x-1 items-center'>
                                            <p className='font-Satoshi font-bold lg:text-xl text-base'>Sarah 9.</p>
                                            <FaCircleCheck size={20} color='#01AB31' className='pb-[2px]' />
                                        </div>
                                        <p className='font-Satoshi font-base lg:ext-base text-sm text-primary/60'>
                                            "I'm blown away by the quality and style of the clothes I received from Shop.co. From casual wear to elegant dresses, every piece I've bought has exceeded my expectations.”
                                        </p>
                                    </div>
                                </div>
                            </SwiperSlide>
                        </Swiper>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Evaluate