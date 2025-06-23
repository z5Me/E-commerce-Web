// Icons
import { FaStar } from "react-icons/fa";
import { FaStarHalf } from "react-icons/fa";

import { ChevronDown, ChevronRight, ChevronUp } from 'lucide-react'
import Product_Image from '@/assets/product.svg'
import { Swiper, SwiperSlide } from "swiper/react";

const ProductDetail = () => {
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
                    <div className='grid lg:grid-cols-[25%_auto] grid-cols-1 gap-[14px]'>
                        <div className='flex lg:flex-col flex-row items-center justify-between h-full gap-4'>
                            <button className='hover:cursor-pointer lg:rotate-0 -rotate-90'>
                                <ChevronUp size={28} />
                            </button>
                            <Swiper className="mySwiper">
                                <SwiperSlide>Slide 1</SwiperSlide>
                                <SwiperSlide>Slide 2</SwiperSlide>
                                <SwiperSlide>Slide 3</SwiperSlide>
                                <SwiperSlide>Slide 4</SwiperSlide>
                                <SwiperSlide>Slide 5</SwiperSlide>
                                <SwiperSlide>Slide 6</SwiperSlide>
                                <SwiperSlide>Slide 7</SwiperSlide>
                                <SwiperSlide>Slide 8</SwiperSlide>
                                <SwiperSlide>Slide 9</SwiperSlide>
                            </Swiper>
                            <button className='hover:cursor-pointer lg:rotate-0 -rotate-90'>
                                <ChevronDown size={28} />
                            </button>
                        </div>
                        <div className='w-full bg-[#F0EEED] max-h-[746px] flex justify-center items-center rounded-[20px] lg:row-start-auto row-start-1'>
                            <img className='w-full object-contain' src={Product_Image} alt="Product_Image" />
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
                        <div className="flex flex-col">
                            <p className="font-Satoshi lg:text-base text-sm text-primary/60">Select Colors</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ProductDetail