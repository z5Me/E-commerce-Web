// Icons
import { FaStar, FaStarHalf } from "react-icons/fa";

// import required modules
import { FreeMode, Navigation, Pagination, Thumbs } from 'swiper/modules';

//Custom CSS
import './productdetailcss.css';

//Image
import Product_Image from '@/assets/product.svg';
import Product_Image2 from '@/assets/product2.svg';
import Product_Image3 from '@/assets/product3.svg';
import Product_Image4 from '@/assets/product4.svg';
import Product_Image5 from '@/assets/product5.svg';

import DefaultButton from "@/components/DefaultButton";
import { Check, ChevronDown, ChevronRight, ChevronUp, Minus, Plus, SlidersVertical } from 'lucide-react';
import { useEffect, useRef, useState } from "react";
import type { Swiper as SwiperClass } from 'swiper';
import { Swiper, SwiperSlide } from "swiper/react";
import CustomerEvaluation from "@/components/CustomerEvaluation";
import ProductsList from "@/components/ProductsList";

const ProductDetail = () => {
    const [thumbsSwiper, setThumbsSwiper] = useState<SwiperClass | null>(null);
    const swiperRef = useRef<SwiperClass | null>(null);
    const [quantity, setQuantity] = useState<number>(10);
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);

    useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }, [])

    const onChangeValue = (value: string) => {
        const valueNumber = parseInt(value);
        if (value !== "") {
            if (valueNumber < 101) {
                setQuantity(valueNumber);
                return;
            }
        }
    }

    useEffect(() => {
        const handdleResize = () => {
            setScreenWidth(window.innerWidth)
        }

        window.addEventListener('resize', handdleResize);

        return () => window.removeEventListener('resize', handdleResize);
    }, [])

    const selectDivRef = useRef<HTMLDivElement | null>(null);
    const [selectButton, setSelectButton] = useState<number>(2);

    useEffect(() => {
        if (selectButton && selectDivRef.current) {
            if (selectButton === 1) {
                selectDivRef.current.classList.add('left-1/6');
                selectDivRef.current.classList.remove('left-1/2');
                selectDivRef.current.classList.remove('left-5/6');
            }
            if (selectButton === 2) {
                selectDivRef.current.classList.add('left-1/2');
                selectDivRef.current.classList.remove('left-1/6');
                selectDivRef.current.classList.remove('left-5/6');
            }
            if (selectButton === 3) {
                selectDivRef.current.classList.add('left-5/6');
                selectDivRef.current.classList.remove('left-1/6');
                selectDivRef.current.classList.remove('left-1/2');
            }
        }
    }, [selectButton])

    console.log('quantity: ', quantity)

    return (
        <section className='flex items-center'>
            <div className='max-w-[1920px] w-full defaultPadding'>
                {/* điều hướng */}
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
                {/* thông tin sản phẩm */}
                <div className='grid lg:grid-cols-2 grid-cols-1 sm:gap-10 gap-5'>
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
                    <div className='flex flex-col font-Satoshi'>
                        <div className="flex flex-col sm:gap-[14px] gap-3">
                            <p className='font-IntegralCF uppercase sm:text-[40px] text-2xl font-bold text-primary'>One Life Graphic T-shirt</p>
                            <div className='flex gap-4 items-center'>
                                <div className="flex text-[#FFC633] gap-[7px] sm:*:text-2xl text-lg">
                                    <FaStar />
                                    <FaStar />
                                    <FaStar />
                                    <FaStar />
                                    <FaStarHalf />
                                </div>
                                <p className="sm:text-base text-sm">4.5/<span className="text-primary/60">5</span></p>
                            </div>
                            <div className="flex gap-3 items-center">
                                <p className="sm:text-[32px] text-2xl font-bold">$260</p>
                                <p className="sm:text-[32px] text-2xl font-bold text-primary/30 line-through">$300</p>
                                <p className="text-danger font-medium sm:text-base text-sm px-[14px] py-[6px] bg-danger/10 rounded-full">-40%</p>
                            </div>
                            <span className="sm:text-base text-sm text-primary/60 pt-2">
                                This graphic t-shirt which is perfect for any occasion. Crafted from a soft and breathable fabric, it offers superior comfort and style.
                            </span>
                        </div>
                        <div className="w-full h-[1px] bg-primary/10 my-6"></div>
                        <div className="flex flex-col sm:gap-[21px] gap-4">
                            <p className="font-Satoshi sm:text-base text-sm text-primary/60">Select Colors</p>
                            <div className="flex sm:gap-[21px] gap-3">
                                <button className="bg-[#4F4631] ms:p-6 p-5 rounded-full relative">
                                    <Check color="#fff" className="absolute top-1/2 left-1/2 -translate-1/2" />
                                </button>
                                <button className="bg-[#314F4A] ms:p-6 p-5 rounded-full relative">
                                    {/* <Check color="#fff" className="absolute top-1/2 left-1/2 -translate-1/2" /> */}
                                </button>
                                <button className="bg-[#31344F] ms:p-6 p-5 rounded-full relative">
                                    {/* <Check color="#fff" className="absolute top-1/2 left-1/2 -translate-1/2" /> */}
                                </button>
                            </div>
                        </div>
                        <div className="w-full h-[1px] bg-primary/10 my-6"></div>
                        <div className="flex flex-col sm:gap-[21px] gap-4">
                            <p className="font-Satoshi sm:text-base text-sm text-primary/60">Choose Size</p>
                            <div className="flex sm:gap-4 gap-2 font-Satoshi sm:text-base text-sm *:cursor-pointer flex-wrap">
                                <button className="bg-[#F0F0F0] sm:py-4 py-[10px] sm:px-8 px-5 rounded-full relative group hover:bg-primary">
                                    <span className="text-primary/60 group-hover:text-white text-nowrap">Small</span>
                                </button>
                                <button className="bg-[#F0F0F0] sm:py-4 py-[10px] sm:px-8 px-5 rounded-full relative group hover:bg-primary">
                                    <span className="text-primary/60 group-hover:text-white text-nowrap">Medium</span>
                                </button>
                                <button className="bg-primary sm:py-4 py-[10px] sm:px-8 px-5 rounded-full relative group hover:bg-primary">
                                    <span className="text-white group-hover:text-white text-nowrap">Large</span>
                                </button>
                                <button className="bg-[#F0F0F0] sm:py-4 py-[10px] sm:px-8 px-5 rounded-full relative group hover:bg-primary">
                                    <span className="text-primary/60 group-hover:text-white text-nowrap">X-Large</span>
                                </button>
                            </div>
                        </div>
                        <div className="w-full h-[1px] bg-primary/10 my-6"></div>
                        <div className="flex sm:gap-5 gap-3">
                            <div className="flex sm:py-4 py-3 sm:px-5 px-4 sm:min-w-[170px] w-auto sm:gap-0 gap-4 justify-between items-center bg-[#F0F0F0] rounded-full relative">
                                <Minus
                                    onClick={() => (quantity > 1) && setQuantity((prev) => prev - 1)}
                                    className="cursor-pointer sm:text-2xl text-xl select-none"
                                />
                                <input
                                    type="number"
                                    className="hide-spinner font-Satoshi font-medium sm:text-base text-sm text-primary text-center border-none outline-none w-1/3 sm:absolute static sm:top-1/2 sm:left-1/2 sm:-translate-1/2"
                                    min={1}
                                    max={100}
                                    value={quantity}
                                    onChange={(e) => onChangeValue(e.target.value)}
                                />
                                <Plus
                                    onClick={() => (quantity < 100 && setQuantity((prev) => prev + 1))}
                                    className="cursor-pointer sm:text-2xl text-xl select-none"
                                />
                            </div>
                            <DefaultButton
                                title="Add to Card"
                                classNameButton="bg-primary rounded-full w-full cursor-pointer max-sm:px-0"
                                classNameText="text-white"
                            />
                        </div>
                    </div>
                </div>
                {/* Review */}
                <div className="mt-[104px] mb-[64px]">
                    <div className="w-full relative">
                        <div className="flex w-full items-center *:transition-all *:duration-200 *:pb-6 *:w-1/3 *:text-center *:cursor-pointer font-Satoshi md:text-[20px] text-base border-b border-b-primary/10">
                            <button onClick={() => setSelectButton(1)} className={`${selectButton === 1 ? 'text-primary font-medium' : 'text-primary/60 font-normal'}`}>Product Details</button>
                            <button onClick={() => setSelectButton(2)} className={`${selectButton === 2 ? 'text-primary font-medium' : 'text-primary/60 font-normal'}`}>Rating & Review</button>
                            <button onClick={() => setSelectButton(3)} className={`${selectButton === 3 ? 'text-primary font-medium' : 'text-primary/60 font-normal'}`}>FAQs</button>
                        </div>
                        <div
                            ref={selectDivRef}
                            className="absolute transition-all duration-200 bottom-0 w-1/3 -translate-x-1/2 h-[2px] bg-primary"
                        >
                        </div>
                    </div>
                    <div className="flex justify-between items-center py-6 gap-1">
                        <div className="flex sm:gap-x-2 gap-x-[6px] gap-y-0 font-Satoshi items-center flex-wrap">
                            <p className="sm:text-2xl text-xl font-bold">All Review</p>
                            <span className="text-base text-primary/60">(451)</span>
                        </div>
                        <div className="flex sm:gap-[10px] gap-2 *:cursor-pointer select-none">
                            <div className="sm:p-3 p-[10px] rounded-full bg-[#F0F0F0]">
                                <SlidersVertical size={screenWidth > 640 ? 24 : 20} />
                            </div>
                            <div className="py-3 px-5 rounded-full bg-[#F0F0F0] items-center gap-[21px] md:flex hidden">
                                <p className="font-Satoshi font-medium text-base">Latest</p>
                                <ChevronDown size={16} />
                            </div>
                            <div className="sm:py-3 py-[10px] sm:px-5 px-4 bg-primary rounded-full flex items-center">
                                <p className="text-white sm:text-base text-xs font-Satoshi font-medium text-nowrap">Write a Review</p>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col gap-y-9">
                        <div className="grid md:grid-cols-2 grid-cols-1 gap-5">
                            <CustomerEvaluation historyPosted={true} moreOptions={true} />
                            <CustomerEvaluation historyPosted={true} moreOptions={true} />
                            <CustomerEvaluation historyPosted={true} moreOptions={true} />
                            <CustomerEvaluation historyPosted={true} moreOptions={true} />
                            <CustomerEvaluation historyPosted={true} moreOptions={true} />
                            <CustomerEvaluation historyPosted={true} moreOptions={true} />
                        </div>
                        <div className="flex justify-center">
                            <DefaultButton
                                title="Load More Reviews"
                                classNameButton="border border-primary/10 rounded-full group hover:bg-primary cursor-pointer"
                                classNameText="group-hover:text-white"
                            />
                        </div>
                    </div>
                </div>
                {/* You Might Also Like */}
                <div>
                    <ProductsList className="mb-[78px]" caption="You might also like" loadMoreProducts={false} />
                </div>
            </div>
        </section>
    )
}

export default ProductDetail