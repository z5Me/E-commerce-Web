// Icons
import { FaStar, FaStarHalf } from "react-icons/fa";

// import required modules
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';
import './testcss.css';

import { Check, ChevronDown, ChevronRight, ChevronUp } from 'lucide-react';
import { Swiper, SwiperSlide } from "swiper/react";
import { useState } from "react";

const TestPage = () => {
    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    return (
        <section className='flex items-center'>
            <div className='max-w-[1920px] w-full defaultPadding'>
                <div className='w-full flex flex-col gap-6 mb-9'>
                    <div className='h-[1px] w-full bg-primary/10'></div>
                    <div className='flex lg:gap-3 gap-[6px]'>
                        <div className='flex gap-1 items-center font-Satoshi lg:text-base text-sm text-primary/60'>
                            <p>Home</p>
                            <ChevronRight size={18} />
                        </div>
                        <div className='flex gap-1 items-center font-Satoshi lg:text-base text-sm text-primary/60'>
                            <p>Shop</p>
                            <ChevronRight size={18} />
                        </div>
                        <div className='flex gap-1 items-center font-Satoshi lg:text-base text-sm text-primary/60'>
                            <p>Men</p>
                            <ChevronRight size={18} />
                        </div>
                        <div className='flex gap-1 items-center font-Satoshi lg:text-base text-sm text-primary'>
                            <p>T-Shirt</p>
                            {/* <ChevronRight size={18} /> */}
                        </div>
                    </div>
                </div>
                <div className='grid lg:grid-cols-2 grid-cols-1 gap-10'>
                    <div className='grid grid-cols-[25%_auto] gap-4 select-none'>
                        <Swiper
                            style={{
                                '--swiper-navigation-color': '#fff',
                                '--swiper-pagination-color': '#fff',
                            }}
                            loop={true}
                            spaceBetween={16}
                            navigation={false}
                            thumbs={{ swiper: thumbsSwiper }}
                            modules={[FreeMode, Navigation, Thumbs]}
                            className="mySwiper2 col-start-2"
                        >
                            <SwiperSlide>
                                <img src="https://swiperjs.com/demos/images/nature-1.jpg" />
                            </SwiperSlide>
                            <SwiperSlide>
                                <img src="https://swiperjs.com/demos/images/nature-2.jpg" />
                            </SwiperSlide>
                            <SwiperSlide>
                                <img src="https://swiperjs.com/demos/images/nature-3.jpg" />
                            </SwiperSlide>
                            <SwiperSlide>
                                <img src="https://swiperjs.com/demos/images/nature-4.jpg" />
                            </SwiperSlide>
                            <SwiperSlide>
                                <img src="https://swiperjs.com/demos/images/nature-5.jpg" />
                            </SwiperSlide>
                            <SwiperSlide>
                                <img src="https://swiperjs.com/demos/images/nature-6.jpg" />
                            </SwiperSlide>
                            <SwiperSlide>
                                <img src="https://swiperjs.com/demos/images/nature-7.jpg" />
                            </SwiperSlide>
                            <SwiperSlide>
                                <img src="https://swiperjs.com/demos/images/nature-8.jpg" />
                            </SwiperSlide>
                            <SwiperSlide>
                                <img src="https://swiperjs.com/demos/images/nature-9.jpg" />
                            </SwiperSlide>
                            <SwiperSlide>
                                <img src="https://swiperjs.com/demos/images/nature-10.jpg" />
                            </SwiperSlide>
                        </Swiper>
                        <div className="col-start-1 row-start-1 flex flex-col items-center max-h-[707px]">
                            <button className='hover:cursor-pointer lg:rotate-0 -rotate-90'>
                                <ChevronUp size={28} />
                            </button>
                            <Swiper
                                direction={'vertical'}
                                onSwiper={setThumbsSwiper}
                                loop={true}
                                spaceBetween={10}
                                slidesPerView={3}
                                freeMode={false}
                                watchSlidesProgress={false}
                                modules={[FreeMode, Navigation, Thumbs]}
                                className="mySwiper flex-1"
                            >
                                <SwiperSlide>
                                    <img src="https://swiperjs.com/demos/images/nature-1.jpg" />
                                </SwiperSlide>
                                <SwiperSlide>
                                    <img src="https://swiperjs.com/demos/images/nature-2.jpg" />
                                </SwiperSlide>
                                <SwiperSlide>
                                    <img src="https://swiperjs.com/demos/images/nature-3.jpg" />
                                </SwiperSlide>
                                <SwiperSlide>
                                    <img src="https://swiperjs.com/demos/images/nature-4.jpg" />
                                </SwiperSlide>
                                <SwiperSlide>
                                    <img src="https://swiperjs.com/demos/images/nature-5.jpg" />
                                </SwiperSlide>
                                <SwiperSlide>
                                    <img src="https://swiperjs.com/demos/images/nature-6.jpg" />
                                </SwiperSlide>
                                <SwiperSlide>
                                    <img src="https://swiperjs.com/demos/images/nature-7.jpg" />
                                </SwiperSlide>
                                <SwiperSlide>
                                    <img src="https://swiperjs.com/demos/images/nature-8.jpg" />
                                </SwiperSlide>
                                <SwiperSlide>
                                    <img src="https://swiperjs.com/demos/images/nature-9.jpg" />
                                </SwiperSlide>
                                <SwiperSlide>
                                    <img src="https://swiperjs.com/demos/images/nature-10.jpg" />
                                </SwiperSlide>
                            </Swiper>
                            <button className='hover:cursor-pointer lg:rotate-0 -rotate-90'>
                                <ChevronDown size={28} />
                            </button>
                        </div>
                    </div>
                    <div className='flex flex-col font-Satoshi'>
                        <div className="flex flex-col gap-[14px]">
                            <p className='font-IntegralCF uppercase text-[40px] font-bold text-primary'>One Life Graphic T-shirt</p>
                            <div className='flex gap-4 items-center'>
                                <div className="flex text-[#FFC633] gap-[7px]">
                                    <FaStar />
                                    <FaStar />
                                    <FaStar />
                                    <FaStar />
                                    <FaStarHalf />
                                </div>
                                <p className="text-base">4.5/<span className="text-primary/60">5</span></p>
                            </div>
                            <div className="flex gap-3 items-center">
                                <p className="text-[32px] font-bold">$260</p>
                                <p className="text-[32px] font-bold text-primary/30 line-through">$300</p>
                                <p className="text-danger font-medium text-base px-[14px] py-[6px] bg-danger/10 rounded-full">-40%</p>
                            </div>
                            <span className="text-base text-primary/60">
                                This graphic t-shirt which is perfect for any occasion. Crafted from a soft and breathable fabric, it offers superior comfort and style.
                            </span>
                        </div>
                        <div className="w-full h-[1px] bg-primary/10 my-6"></div>
                        <div className="flex flex-col gap-[21px]">
                            <p className="font-Satoshi lg:text-base text-sm text-primary/60">Select Colors</p>
                            <div className="flex gap-[21px]">
                                <button className="bg-[#4F4631] p-6 rounded-full relative">
                                    <Check color="#fff" className="absolute top-1/2 left-1/2 -translate-1/2" />
                                </button>
                                <button className="bg-[#314F4A] p-6 rounded-full relative">
                                    {/* <Check color="#fff" className="absolute top-1/2 left-1/2 -translate-1/2" /> */}
                                </button>
                                <button className="bg-[#31344F] p-6 rounded-full relative">
                                    {/* <Check color="#fff" className="absolute top-1/2 left-1/2 -translate-1/2" /> */}
                                </button>
                            </div>
                        </div>
                        <div className="w-full h-[1px] bg-primary/10 my-6"></div>
                        <div className="flex flex-col gap-[21px]">
                            <p className="font-Satoshi lg:text-base text-sm text-primary/60">Choose Size</p>
                            <div className="flex gap-4 font-Satoshi text-base *:cursor-pointer">
                                <button className="bg-[#F0F0F0] py-4 px-8 rounded-full relative">
                                    <span className="text-primary/60">Small</span>
                                </button>
                                <button className="bg-[#F0F0F0] py-4 px-8 rounded-full relative">
                                    <span className="text-primary/60">Medium</span>
                                </button>
                                <button className="bg-primary py-4 px-8 rounded-full relative">
                                    <span className="text-white">Large</span>
                                </button>
                                <button className="bg-[#F0F0F0] py-4 px-8 rounded-full relative">
                                    <span className="text-primary/60">X-Large</span>
                                </button>
                            </div>
                        </div>
                        <div className="w-full h-[1px] bg-primary/10 my-6"></div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default TestPage