import { ArrowLeft, ArrowRight, ChevronDown, CircleUserRound, Menu, Search, ShoppingCart, X } from 'lucide-react';
import { FaStar } from "react-icons/fa";
import { FaCircleCheck } from "react-icons/fa6";
import { HiOutlineMail } from "react-icons/hi";
import { Link } from 'react-router';
import './App.css';
import Banner from './assets/banner.svg';
import Logo from './assets/logo.svg';
import Calvin_Klein from './assets/logo_brands/calvin klein.svg';
import Gucci from './assets/logo_brands/gucci.svg';
import Prada from './assets/logo_brands/prada.svg';
import Versace from './assets/logo_brands/versace.svg';
import Zara from './assets/logo_brands/zara.svg';
import Image_Product from './assets/product.svg';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import './customSwiper.css';

// import required modules
import { useRef, useState } from 'react';
import type { Swiper as SwiperType } from 'swiper';
import { EffectCoverflow, Pagination } from 'swiper/modules';

function App() {
  const [openMenu, setOpenMenu] = useState<boolean>(false);
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
      <section className='FIRST_TIME_SIGN_UP bg-primary text-white font-Satoshi flex select-none text-xs sm:text-sm py-[9px] defaultPadding'>
        <p className='flex-1 text-center font-light'>Sign up and get 20% off to your first order. <span className='font-normal underline underline-offset-4 cursor-pointer'>Sign Up Now</span></p>
        <X className='hidden sm:inline' />
      </section>
      <header className='bg-white defaultPadding py-6 select-none relative z-10'>
        <div className='NAV flex justify-between items-center lg:gap-x-10 gap-x-4 z-10'>
          <div
            onClick={() => setOpenMenu(!openMenu)}
            className='inline md:hidden'
          >
            <Menu />
          </div>
          <div className='LOGO cursor-pointer flex md:flex-none flex-1'>
            <img className='' src={Logo} alt="Logo" />
          </div>
          <nav>
            <ul className='md:flex hidden lg:gap-x-6 gap-x-4 *:cursor-pointer *:text-nowrap'>
              <li className='flex justify-center items-center lg:gap-x-[6px] gap-x-1'>
                <div className='hover:underline'>
                  <Link to=''>Shop</Link>
                </div>
                <ChevronDown className='pt-[1px]' size={20} color='#000000' strokeWidth={2} />
              </li>
              <li>
                <div className='hover:underline'>
                  <Link to=''>On Sale</Link>
                </div>
              </li>
              <li>
                <div className='hover:underline'>
                  <Link to=''>New Arrivals</Link>

                </div>
              </li>
              <li>
                <div className='hover:underline'>
                  <Link to=''>Brands</Link>
                </div>
              </li>
            </ul>
          </nav>
          <div className='SEARCH bg-[#F0F0F0] flex-1 rounded-full lg:gap-x-[14px] gap-x-2 px-[18px] items-center min-w-[125px] lg:flex hidden'>
            <Search />
            <input className='w-full py-3 border-0 outline-0' type="text" placeholder='Search for product...' />
          </div>
          <div className='CART flex gap-x-[14px]'>
            <Search className='lg:hidden flex' />
            <ShoppingCart />
            <CircleUserRound />
          </div>
        </div>
        {/* Menu con */}
        <div
          onClick={() => setOpenMenu(!openMenu)}
          className={`${openMenu ? 'flex w-full z-20 left-0 duration-500' : 'w-0 -z-10 -left-full duration-100'} absolute top-0 transition-all bg-white/50 backdrop-blur-xs h-screen`}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className={`${openMenu ? 'w-1/2 bg-white duration-100' : 'w-0 duration-500'} transition-all h-screen px-4 py-6 shadow-2xl z-30`}
          >
            <X />
          </div>
        </div>
      </header>
      <section className='BANNER flex lg:flex-row flex-col justify-between defaultPadding bg-[#F2F0F1] overflow-hidden'>
        <div className='lg:w-1/2 w-full lg:pt-[100px] pt-10 lg:pb-[100px] pb-0 flex flex-col lg:gap-y-8 gap-y-5'>
          <p className='font-IntegralCF md:text-6xl text-4xl xl:w-[493px] w-auto inline xl:block lg:text-start text-center'>
            FIND CLOTHES THAT MATCHES YOUR STYLE
          </p>
          <p className='xl:w-[545px] w-auto md:text-base text-sm inline xl:block font-Satoshi text-black/60 lg:text-start text-center'>
            Browse through our diverse range of meticulously crafted garments, designed to bring out your individuality and cater to your sense of style.
          </p>
          <div>
            <button className='px-[68px] py-[15px] bg-primary rounded-full lg:w-auto w-full'>
              <p className='font-medium font-Satoshi text-white'>Shop Now</p>
            </button>
          </div>
          <div className='pt-4 font-Satoshi flex lg:flex-row flex-col gap-x-[17px] lg:items-start items-center'>
            <div className='flex gap-x-[17px]'>
              <div className='flex flex-col'>
                <p className='text-primary font-bold text-2xl md:text-[40px]'>200+</p>
                <p className='text-primary/60 md:text-base text-xs'>International Brands</p>
              </div>

              <div className='bg-primary/10 min-w-[2px]'></div>

              <div className='flex flex-col'>
                <p className='text-primary font-bold text-2xl md:text-[40px]'>2,000+</p>
                <p className='text-primary/60 md:text-base text-xs'>High-Quality Products</p>
              </div>
            </div>

            <div className='bg-primary/10 min-w-[2px] h-full lg:block hidden'></div>

            <div className='flex flex-col'>
              <p className='text-primary font-bold text-2xl md:text-[40px]'>30,000+</p>
              <p className='text-primary/60 md:text-base text-xs'>Happy Customers</p>
            </div>
          </div>
        </div>
        <div className='lg:w-1/2 w-full  h-[428px]'>
          <img className=' object-cover ' src={Banner} alt="Banner" />
        </div>
      </section>
      <section>
        <div className="flex flex-wrap lg:justify-between justify-center items-center bg-primary defaultPadding py-10 gap-6">
          <img src={Calvin_Klein} alt="Calvin_Klein" className="w-24 sm:w-28 md:w-32 object-contain" />
          <img src={Gucci} alt="Gucci" className="w-24 sm:w-28 md:w-32 object-contain" />
          <img src={Prada} alt="Prada" className="w-24 sm:w-28 md:w-32 object-contain" />
          <img src={Versace} alt="Versace" className="w-24 sm:w-28 md:w-32 object-contain" />
          <img src={Zara} alt="Zara" className="w-24 sm:w-28 md:w-32 object-contain" />
        </div>
      </section>
      <section className='defaultPadding bg-white'>
        <div className='pt-[72px] pb-[55px]'>
          <p className='font-IntegralCF lg:text-5xl text-4xl font-bold text-center uppercase'>NEW ARRIVALS</p>
        </div>
        <div className='grid lg:grid-cols-4 grid-cols-2 justify-center gap-5'>
          {/* Product */}
          <div className='flex flex-col gap-y-4 w-full'>
            <div className='w-full max-md:min-w-[146px] max-md:min-h-[148px] max-w-[415px] max-h-[419px]'>
              <img className='rounded-[20px] w-full' src={Image_Product} alt="Image_Product" />
            </div>
            <div className='flex flex-col gap-y-2 font-Satoshi'>
              <p className='lg:text-xl text-base font-bold'>T-Shirt with Tape Details</p>
              <div className='flex lg:flex-row flex-col gap-x-[13px] lg:items-center items-start'>
                <div className='flex gap-x-[5px]'>
                  <FaStar className='w-[18px] h-[18px]' color='#FFC633' />
                  <FaStar className='w-[18px] h-[18px]' color='#FFC633' />
                  <FaStar className='w-[18px] h-[18px]' color='#FFC633' />
                  <FaStar className='w-[18px] h-[18px]' color='#FFC633' />
                  <FaStar className='w-[18px] h-[18px]' color='#FFC633' />
                </div>
                <div className='flex lg:text-sm text-xs'>
                  <p className='text-primary'>4.5</p>
                  <p className='text-primary'>/</p>
                  <p className='text-primary/60'>5</p>
                </div>
              </div>
              <p className='lg:text-2xl text-xl font-bold'>$120</p>
            </div>
          </div>

          <div className='flex flex-col gap-y-4 w-full'>
            <div className='w-full max-md:min-w-[146px] max-md:min-h-[148px] max-w-[415px] max-h-[419px]'>
              <img className='rounded-[20px] w-full' src={Image_Product} alt="Image_Product" />
            </div>
            <div className='flex flex-col gap-y-2 font-Satoshi'>
              <p className='lg:text-xl text-base font-bold'>T-Shirt with Tape Details</p>
              <div className='flex lg:flex-row flex-col gap-x-[13px] lg:items-center items-start'>
                <div className='flex gap-x-[5px]'>
                  <FaStar className='w-[18px] h-[18px]' color='#FFC633' />
                  <FaStar className='w-[18px] h-[18px]' color='#FFC633' />
                  <FaStar className='w-[18px] h-[18px]' color='#FFC633' />
                  <FaStar className='w-[18px] h-[18px]' color='#FFC633' />
                  <FaStar className='w-[18px] h-[18px]' color='#FFC633' />
                </div>
                <div className='flex lg:text-sm text-xs'>
                  <p className='text-primary'>4.5</p>
                  <p className='text-primary'>/</p>
                  <p className='text-primary/60'>5</p>
                </div>
              </div>
              <p className='lg:text-2xl text-xl font-bold'>$120</p>
            </div>
          </div>

          <div className='flex flex-col gap-y-4 w-full'>
            <div className='w-full max-md:min-w-[146px] max-md:min-h-[148px] max-w-[415px] max-h-[419px]'>
              <img className='rounded-[20px] w-full' src={Image_Product} alt="Image_Product" />
            </div>
            <div className='flex flex-col gap-y-2 font-Satoshi'>
              <p className='lg:text-xl text-base font-bold'>T-Shirt with Tape Details</p>
              <div className='flex lg:flex-row flex-col gap-x-[13px] lg:items-center items-start'>
                <div className='flex gap-x-[5px]'>
                  <FaStar className='w-[18px] h-[18px]' color='#FFC633' />
                  <FaStar className='w-[18px] h-[18px]' color='#FFC633' />
                  <FaStar className='w-[18px] h-[18px]' color='#FFC633' />
                  <FaStar className='w-[18px] h-[18px]' color='#FFC633' />
                  <FaStar className='w-[18px] h-[18px]' color='#FFC633' />
                </div>
                <div className='flex lg:text-sm text-xs'>
                  <p className='text-primary'>4.5</p>
                  <p className='text-primary'>/</p>
                  <p className='text-primary/60'>5</p>
                </div>
              </div>
              <p className='lg:text-2xl text-xl font-bold'>$120</p>
            </div>
          </div>

          <div className='flex flex-col gap-y-4 w-full'>
            <div className='w-full max-md:min-w-[146px] max-md:min-h-[148px] max-w-[415px] max-h-[419px]'>
              <img className='rounded-[20px] w-full' src={Image_Product} alt="Image_Product" />
            </div>
            <div className='flex flex-col gap-y-2 font-Satoshi'>
              <p className='lg:text-xl text-base font-bold'>T-Shirt with Tape Details</p>
              <div className='flex lg:flex-row flex-col gap-x-[13px] lg:items-center items-start'>
                <div className='flex gap-x-[5px]'>
                  <FaStar className='w-[18px] h-[18px]' color='#FFC633' />
                  <FaStar className='w-[18px] h-[18px]' color='#FFC633' />
                  <FaStar className='w-[18px] h-[18px]' color='#FFC633' />
                  <FaStar className='w-[18px] h-[18px]' color='#FFC633' />
                  <FaStar className='w-[18px] h-[18px]' color='#FFC633' />
                </div>
                <div className='flex lg:text-sm text-xs'>
                  <p className='text-primary'>4.5</p>
                  <p className='text-primary'>/</p>
                  <p className='text-primary/60'>5</p>
                </div>
              </div>
              <p className='lg:text-2xl text-xl font-bold'>$120</p>
            </div>
          </div>
          {/* End Product */}
        </div>
        <div className='flex justify-center pt-[36px]'>
          <button className='px-[80px] py-4 border sm:w-auto w-full border-primary/10 rounded-full'>
            <p className='font-Satoshi font-medium lg:text-base text-sm'>View All</p>
          </button>
        </div>
      </section>
      <section className='h-[128px] w-full defaultPadding flex justify-center items-center'>
        <div className='bg-primary/10 h-[1px] w-full'></div>
      </section>
      <section className='defaultPadding bg-white'>
        <div className='pb-[55px]'>
          <p className='font-IntegralCF lg:text-5xl text-4xl font-bold text-center uppercase'>Top selling</p>
        </div>
        <div className='grid lg:grid-cols-4 grid-cols-2 justify-center gap-5'>
          {/* Product */}
          <div className='flex flex-col gap-y-4 w-full'>
            <div className='w-full max-md:min-w-[146px] max-md:min-h-[148px] max-w-[415px] max-h-[419px]'>
              <img className='rounded-[20px] w-full' src={Image_Product} alt="Image_Product" />
            </div>
            <div className='flex flex-col gap-y-2 font-Satoshi'>
              <p className='lg:text-xl text-base font-bold'>T-Shirt with Tape Details</p>
              <div className='flex lg:flex-row flex-col gap-x-[13px] lg:items-center items-start'>
                <div className='flex gap-x-[5px]'>
                  <FaStar className='w-[18px] h-[18px]' color='#FFC633' />
                  <FaStar className='w-[18px] h-[18px]' color='#FFC633' />
                  <FaStar className='w-[18px] h-[18px]' color='#FFC633' />
                  <FaStar className='w-[18px] h-[18px]' color='#FFC633' />
                  <FaStar className='w-[18px] h-[18px]' color='#FFC633' />
                </div>
                <div className='flex lg:text-sm text-xs'>
                  <p className='text-primary'>4.5</p>
                  <p className='text-primary'>/</p>
                  <p className='text-primary/60'>5</p>
                </div>
              </div>
              <p className='lg:text-2xl text-xl font-bold'>$120</p>
            </div>
          </div>

          <div className='flex flex-col gap-y-4 w-full'>
            <div className='w-full max-md:min-w-[146px] max-md:min-h-[148px] max-w-[415px] max-h-[419px]'>
              <img className='rounded-[20px] w-full' src={Image_Product} alt="Image_Product" />
            </div>
            <div className='flex flex-col gap-y-2 font-Satoshi'>
              <p className='lg:text-xl text-base font-bold'>T-Shirt with Tape Details</p>
              <div className='flex lg:flex-row flex-col gap-x-[13px] lg:items-center items-start'>
                <div className='flex gap-x-[5px]'>
                  <FaStar className='w-[18px] h-[18px]' color='#FFC633' />
                  <FaStar className='w-[18px] h-[18px]' color='#FFC633' />
                  <FaStar className='w-[18px] h-[18px]' color='#FFC633' />
                  <FaStar className='w-[18px] h-[18px]' color='#FFC633' />
                  <FaStar className='w-[18px] h-[18px]' color='#FFC633' />
                </div>
                <div className='flex lg:text-sm text-xs'>
                  <p className='text-primary'>4.5</p>
                  <p className='text-primary'>/</p>
                  <p className='text-primary/60'>5</p>
                </div>
              </div>
              <p className='lg:text-2xl text-xl font-bold'>$120</p>
            </div>
          </div>

          <div className='flex flex-col gap-y-4 w-full'>
            <div className='w-full max-md:min-w-[146px] max-md:min-h-[148px] max-w-[415px] max-h-[419px]'>
              <img className='rounded-[20px] w-full' src={Image_Product} alt="Image_Product" />
            </div>
            <div className='flex flex-col gap-y-2 font-Satoshi'>
              <p className='lg:text-xl text-base font-bold'>T-Shirt with Tape Details</p>
              <div className='flex lg:flex-row flex-col gap-x-[13px] lg:items-center items-start'>
                <div className='flex gap-x-[5px]'>
                  <FaStar className='w-[18px] h-[18px]' color='#FFC633' />
                  <FaStar className='w-[18px] h-[18px]' color='#FFC633' />
                  <FaStar className='w-[18px] h-[18px]' color='#FFC633' />
                  <FaStar className='w-[18px] h-[18px]' color='#FFC633' />
                  <FaStar className='w-[18px] h-[18px]' color='#FFC633' />
                </div>
                <div className='flex lg:text-sm text-xs'>
                  <p className='text-primary'>4.5</p>
                  <p className='text-primary'>/</p>
                  <p className='text-primary/60'>5</p>
                </div>
              </div>
              <p className='lg:text-2xl text-xl font-bold'>$120</p>
            </div>
          </div>

          <div className='flex flex-col gap-y-4 w-full'>
            <div className='w-full max-md:min-w-[146px] max-md:min-h-[148px] max-w-[415px] max-h-[419px]'>
              <img className='rounded-[20px] w-full' src={Image_Product} alt="Image_Product" />
            </div>
            <div className='flex flex-col gap-y-2 font-Satoshi'>
              <p className='lg:text-xl text-base font-bold'>T-Shirt with Tape Details</p>
              <div className='flex lg:flex-row flex-col gap-x-[13px] lg:items-center items-start'>
                <div className='flex gap-x-[5px]'>
                  <FaStar className='w-[18px] h-[18px]' color='#FFC633' />
                  <FaStar className='w-[18px] h-[18px]' color='#FFC633' />
                  <FaStar className='w-[18px] h-[18px]' color='#FFC633' />
                  <FaStar className='w-[18px] h-[18px]' color='#FFC633' />
                  <FaStar className='w-[18px] h-[18px]' color='#FFC633' />
                </div>
                <div className='flex lg:text-sm text-xs'>
                  <p className='text-primary'>4.5</p>
                  <p className='text-primary'>/</p>
                  <p className='text-primary/60'>5</p>
                </div>
              </div>
              <p className='lg:text-2xl text-xl font-bold'>$120</p>
            </div>
          </div>
          {/* End Product */}
        </div>
        <div className='flex justify-center pt-[36px]'>
          <button className='px-[80px] py-4 border sm:w-auto w-full border-primary/10 rounded-full'>
            <p className='font-Satoshi font-medium lg:text-base text-sm'>View All</p>
          </button>
        </div>
      </section>
      <section className='CATEGORY defaultPadding pt-[80px]'>
        <div className='bg-[#F0F0F0] lg:px-[64px] px-6 lg:pt-[76px] pt-10 lg:pb-[76px] pb-[27px] rounded-[40px] flex flex-col lg:gap-y-[64px] gap-y-7'>
          <p className='uppercase lg:text-5xl text-3xl font-bold font-IntegralCF text-center'>BROWSE BY dress STYLE</p>
          <div className="grid lg:grid-cols-6 grid-cols-1 lg:grid-rows-2 grid-rows-none lg:gap-5 gap-4 *:rounded-[20px]">
            <div className='lg:col-span-2 col-span-4 w-full lg:min-h-[298px] min-h-[190px] lg:max-h-[298px] max-h-[190px] bg-white'></div>
            <div className="w-full lg:min-h-[298px] min-h-[190px] lg:max-h-[298px] max-h-[190px] col-span-4 bg-white"></div>
            <div className="col-span-4 w-full lg:min-h-[298px] min-h-[190px] lg:max-h-[298px] max-h-[190px] bg-white"></div>
            <div className="w-full lg:min-h-[298px] min-h-[190px] lg:max-h-[298px] max-h-[190px] lg:col-span-2 col-span-4 bg-white"></div>
          </div>
        </div>
      </section>
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
      <section className='bg-[linear-gradient(to_bottom,white_0%,white_50%,#F0F0F0_50%,#F0F0F0_100%)]'>
        <div className='defaultPadding'>
          <div className='bg-primary rounded-[20px] px-[64px] py-[36px] flex justify-between items-center'>
            <p className='uppercase text-[40px] font-IntegralCF font-bold text-white max-w-[551px] w-full'>STAY UPTO DATE ABOUT OUR LATEST OFFERS</p>
            <div className='flex flex-col w-full max-w-[349px] gap-y-4'>
              <div className='flex px-4 py-3 bg-white rounded-full gap-x-3 items-center'>
                <HiOutlineMail size={24} className='text-primary/40' />
                <input className='border-none outline-none w-full text-primary/40' type="text" placeholder='Enter your email address' />
              </div>
              <button className='px-4 py-3 bg-white rounded-full'>
                <p className='text-base font-Satoshi font-medium text-primary'>Subscribe to Newsletter</p>
              </button>
            </div>
          </div>
        </div>
      </section>
      <section className='pt-[50px] bg-[#F0F0F0]'>

      </section>
    </>
  )
}

export default App