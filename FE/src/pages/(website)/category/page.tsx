import { useEffect, useRef, useState } from 'react';

//Components
import DefaultButton from '@/components/DefaultButton';

//Icons
import { ArrowLeft, ArrowRight, Check, ChevronDown, ChevronRight, SlidersVertical, X } from 'lucide-react';

//Image
import Image_Product from '@/assets/product.svg';
import Image_Product2 from '@/assets/product2.svg';
import Image_Product4 from '@/assets/product4.svg';
import Image_Product5 from '@/assets/product5.svg';
import SimpleProduct from '@/components/SimpleProduct';

const products = [
    {
        id: 1,
        image: Image_Product5,
        name: 'T-Shirt with Tape Details',
        price: 120,
        oldPrice: 0,
        discountPercent: 0,
        rating: 4.5
    },
    {
        id: 2,
        image: Image_Product2,
        name: 'Classic Polo Shirt',
        price: 90,
        oldPrice: 150,
        discountPercent: 40,
        rating: 5
    },
    {
        id: 3,
        image: Image_Product,
        name: 'Denim Jacket',
        price: 180,
        oldPrice: 250,
        discountPercent: 28,
        rating: 3.3
    },
    {
        id: 4,
        image: Image_Product4,
        name: 'Slim Fit Jeans',
        price: 110,
        oldPrice: 0,
        discountPercent: 0,
        rating: 3.8
    },
    {
        id: 5,
        image: Image_Product5,
        name: 'T-Shirt with Tape Details',
        price: 120,
        oldPrice: 200,
        discountPercent: 40,
        rating: 4.5
    },
    {
        id: 6,
        image: Image_Product2,
        name: 'Classic Polo Shirt',
        price: 90,
        oldPrice: 150,
        discountPercent: 40,
        rating: 5
    },
    {
        id: 7,
        image: Image_Product,
        name: 'Denim Jacket',
        price: 180,
        oldPrice: 0,
        discountPercent: 0,
        rating: 3.3
    },
    {
        id: 8,
        image: Image_Product4,
        name: 'Slim Fit Jeans',
        price: 110,
        oldPrice: 0,
        discountPercent: 0,
        rating: 3.8
    },
    {
        id: 9,
        image: Image_Product5,
        name: 'T-Shirt with Tape Details',
        price: 120,
        oldPrice: 200,
        discountPercent: 40,
        rating: 4.5
    },
]

const CategoryPage = () => {
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handdleResize = () => {
            setScreenWidth(window.innerWidth)
        }

        window.addEventListener('resize', handdleResize);

        return () => window.removeEventListener('resize', handdleResize);
    }, [])

    const minRef = useRef<HTMLInputElement>(null);
    const maxRef = useRef<HTMLInputElement>(null);
    const maxRangeValue = 1000;
    const [minValue, setMinValue] = useState(maxRangeValue * 0.2);
    const [maxValue, setMaxValue] = useState(maxRangeValue * 0.8);

    //Scroll to top
    useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }, []);

    const updateRangeTrack = (min: number, max: number) => {
        const minPercent = (min / maxRangeValue) * 100;
        const maxPercent = (max / maxRangeValue) * 100;

        const background = `linear-gradient(to right, 
      #e5e7eb 0%, 
      #e5e7eb ${minPercent}%,
      #000 ${minPercent}%,
      #000 ${maxPercent}%,
      #e5e7eb ${maxPercent}%,
      #e5e7eb 100%)`;

        if (minRef.current) minRef.current.style.background = background;
        if (maxRef.current) maxRef.current.style.background = background;
    };

    useEffect(() => {
        updateRangeTrack(minValue, maxValue);
    }, [minValue, maxValue]);

    const [openFilter, setOpenFilter] = useState<boolean>(false);
    const divParentRef = useRef<HTMLDivElement>(null);
    const divChildrenRef = useRef<HTMLDivElement>(null);
    const handleCloseFilter = () => {
        console.log('click')
        setOpenFilter(false);
    }

    useEffect(() => {
        if (openFilter) {
            window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
            document.body.classList.add('overflow-hidden');
            document.body.classList.add('relative');

            divParentRef.current?.classList.add('absolute');
            divParentRef.current?.classList.add('w-full');
            divParentRef.current?.classList.add('h-screen');
            divParentRef.current?.classList.add('inset-0');
            divParentRef.current?.classList.add('z-50');
            divParentRef.current?.classList.add('bg-primary/50');
            divParentRef.current?.classList.add('place-items-end');
            divParentRef.current?.classList.add('overflow-y-scroll');
            divParentRef.current?.classList.add('pt-[80px]');

            divChildrenRef.current?.classList.remove('hidden');
            divChildrenRef.current?.classList.remove('rounded-[20px]');
            divChildrenRef.current?.classList.add('grid');
            divChildrenRef.current?.classList.add('rounded-tl-[20px]');
            divChildrenRef.current?.classList.add('rounded-tr-[20px]');
            divChildrenRef.current?.classList.add('rounded-bl-0');
            divChildrenRef.current?.classList.add('rounded-br-0');
        }

        if (screenWidth >= 1024 || !openFilter) {
            document.body.classList.remove('overflow-hidden');
            document.body.classList.remove('relative');

            divParentRef.current?.classList.remove('absolute');
            divParentRef.current?.classList.remove('w-full');
            divParentRef.current?.classList.remove('h-screen');
            divParentRef.current?.classList.remove('inset-0');
            divParentRef.current?.classList.remove('z-50');
            divParentRef.current?.classList.remove('bg-primary/50');
            divParentRef.current?.classList.remove('place-items-end');
            divParentRef.current?.classList.remove('overflow-y-scroll');
            divParentRef.current?.classList.remove('pt-[80px]');

            divChildrenRef.current?.classList.add('hidden');
            divChildrenRef.current?.classList.add('rounded-[20px]');
            divChildrenRef.current?.classList.remove('grid');
            divChildrenRef.current?.classList.remove('rounded-tl-[20px]');
            divChildrenRef.current?.classList.remove('rounded-tr-[20px]');
            divChildrenRef.current?.classList.remove('rounded-bl-0');
            divChildrenRef.current?.classList.remove('rounded-br-0');

            setOpenFilter(false);
        }

    }, [openFilter, screenWidth])

    return (
        <section className='flex justify-center pb-[80px]'>
            <div className='max-w-[1920px] w-full defaultPadding'>
                {/* điều hướng */}
                <div className='w-full flex flex-col gap-6 mb-9'>
                    <div className='h-[1px] w-full bg-primary/10'></div>
                    <div className='flex lg:gap-3 gap-[6px]'>
                        <div className='flex gap-1 items-center font-Satoshi lg:text-base text-sm text-primary/60'>
                            <p>Home</p>
                            <ChevronRight size={18} />
                        </div>
                        <div className='flex gap-1 items-center font-Satoshi lg:text-base text-sm text-primary'>
                            <p>Casual</p>
                            {/* <ChevronRight size={18} /> */}
                        </div>
                    </div>
                </div>
                <div className='grid lg:grid-cols-[300px_auto] grid-cols-1 grid-rows-1 gap-x-5'>
                    {/* Filter  */}
                    <div
                        ref={divParentRef}
                        onClick={() => handleCloseFilter()}
                        className='grid'
                    >
                        <div
                            ref={divChildrenRef}
                            onClick={(e) => e.stopPropagation()}
                            className='lg:grid hidden bg-white w-full gap-6 border border-primary/10 rounded-[20px] py-5 px-6 font-Satoshi select-none h-fit'
                        >
                            <div className='flex justify-between'>
                                <p className='font-bold text-xl'>Filters</p>
                                <button
                                    onClick={() => openFilter && setOpenFilter(false)}
                                    className={`text-primary/40 ${openFilter && 'cursor-pointer'}`}>
                                    {openFilter ? <X /> : <SlidersVertical />}
                                </button>
                            </div>

                            <div className='h-[1px] w-full bg-primary/10'></div>

                            <div className='grid gap-5 text-base *:hover:text-primary *:cursor-pointer *:hover:font-medium'>
                                <div className='flex justify-between items-center text-primary/60'>
                                    <p>T-shirts</p>
                                    <div>
                                        <ChevronRight size={20} />
                                    </div>
                                </div>

                                <div className='flex justify-between items-center text-primary/60'>
                                    <p>Shorts</p>
                                    <div>
                                        <ChevronRight size={20} />
                                    </div>
                                </div>

                                <div className='flex justify-between items-center text-primary/60'>
                                    <p>Shirts</p>
                                    <div>
                                        <ChevronRight size={20} />
                                    </div>
                                </div>

                                <div className='flex justify-between items-center text-primary/60'>
                                    <p>Hoodie</p>
                                    <div>
                                        <ChevronRight size={20} />
                                    </div>
                                </div>

                                <div className='flex justify-between items-center text-primary/60'>
                                    <p>Jeans</p>
                                    <div>
                                        <ChevronRight size={20} />
                                    </div>
                                </div>
                            </div>

                            <div className='h-[1px] w-full bg-primary/10'></div>

                            <div className='grid gap-5'>
                                <div className='flex justify-between items-center'>
                                    <p className='font-bold text-xl'>Price</p>
                                    <button className='text-primary -rotate-90'>
                                        <ChevronRight size={20} />
                                    </button>
                                </div>
                                <div className="relative w-full mx-auto">
                                    {/* MAX range dưới */}
                                    <input
                                        ref={maxRef}
                                        type="range"
                                        min="0"
                                        max={maxRangeValue}
                                        value={maxValue}
                                        step="1"
                                        onChange={(e) => {
                                            const val = Math.max(Number(e.target.value), minValue + (maxRangeValue * 0.05));
                                            setMaxValue(val);
                                        }}
                                        className="custom-range absolute w-full"
                                    />
                                    {/* MIN range trên */}
                                    <input
                                        ref={minRef}
                                        type="range"
                                        min="0"
                                        max={maxRangeValue}
                                        value={minValue}
                                        step="1"
                                        onChange={(e) => {
                                            const val = Math.min(Number(e.target.value), maxValue - (maxRangeValue * 0.05));
                                            setMinValue(val);
                                        }}
                                        className="custom-range absolute w-full"
                                    />
                                    <p className="mt-4 text-sm text-center text-gray-700">
                                        Giá: {minValue} - {maxValue}
                                    </p>
                                </div>
                            </div>


                            <div className='h-[1px] w-full bg-primary/10'></div>

                            <div className='grid gap-5'>
                                <div className='flex justify-between items-center'>
                                    <p className='font-bold text-xl'>Colors</p>
                                    <button className='text-primary -rotate-90'>
                                        <ChevronRight size={20} />
                                    </button>
                                </div>
                                <div className="flex flex-wrap gap-4 items-center *:cursor-pointer">
                                    <button
                                        className='w-full max-w-[37px] h-[49px] max-h-[37px] bg-[#00C12B] border border-primary/20 rounded-full relative'>
                                        <div className='absolute top-1/2 left-1/2 -translate-1/2 text-white'>
                                            <Check />
                                        </div>
                                    </button>

                                    <button
                                        className='w-full max-w-[37px] h-[49px] max-h-[37px] bg-[#F50606] border border-primary/20 rounded-full relative'>
                                    </button>

                                    <button
                                        className='w-full max-w-[37px] h-[49px] max-h-[37px] bg-[#F5DD06] border border-primary/20 rounded-full relative'>
                                    </button>

                                    <button
                                        className='w-full max-w-[37px] h-[49px] max-h-[37px] bg-[#F57906] border border-primary/20 rounded-full relative'>
                                    </button>

                                    <button
                                        className='w-full max-w-[37px] h-[49px] max-h-[37px] bg-[#06CAF5] border border-primary/20 rounded-full relative'>
                                    </button>

                                    <button
                                        className='w-full max-w-[37px] h-[49px] max-h-[37px] bg-[#063AF5] border border-primary/20 rounded-full relative'>
                                    </button>

                                    <button
                                        className='w-full max-w-[37px] h-[49px] max-h-[37px] bg-[#7D06F5] border border-primary/20 rounded-full relative'>
                                    </button>

                                    <button
                                        className='w-full max-w-[37px] h-[49px] max-h-[37px] bg-[#F506A4] border border-primary/20 rounded-full relative'>
                                    </button>

                                    <button
                                        className='w-full max-w-[37px] h-[49px] max-h-[37px] bg-[#FFFFFF] border border-primary/20 rounded-full relative'>
                                    </button>

                                    <button
                                        className='w-full max-w-[37px] h-[49px] max-h-[37px] bg-[#000000] border border-primary/20 rounded-full relative'>
                                    </button>
                                </div>
                            </div>

                            <div className='h-[1px] w-full bg-primary/10'></div>

                            <div className='grid gap-5'>
                                <div className='flex justify-between items-center'>
                                    <p className='font-bold text-xl'>Size</p>
                                    <button className='text-primary -rotate-90'>
                                        <ChevronRight size={20} />
                                    </button>
                                </div>
                                <div className='flex flex-wrap gap-2 text-sm *:hover:bg-primary *:hover:text-white'>
                                    <button
                                        className={`py-[10px] px-5 bg-primary text-white cursor-pointer rounded-[62px]`}
                                    >
                                        <p>XX-Small</p>
                                    </button>
                                    <button
                                        className={`py-[10px] px-5 bg-[#F0F0F0] text-primary/60 cursor-pointer rounded-[62px]`}
                                    >
                                        <p>X-Small</p>
                                    </button>
                                    <button
                                        className={`py-[10px] px-5 bg-[#F0F0F0] text-primary/60 cursor-pointer rounded-[62px]`}
                                    >
                                        <p>Small</p>
                                    </button>
                                    <button
                                        className={`py-[10px] px-5 bg-[#F0F0F0] text-primary/60 cursor-pointer rounded-[62px]`}
                                    >
                                        <p>Medium</p>
                                    </button>
                                    <button
                                        className={`py-[10px] px-5 bg-[#F0F0F0] text-primary/60 cursor-pointer rounded-[62px]`}
                                    >
                                        <p>Large</p>
                                    </button>
                                    <button
                                        className={`py-[10px] px-5 bg-[#F0F0F0] text-primary/60 cursor-pointer rounded-[62px]`}
                                    >
                                        <p>X-Large</p>
                                    </button>
                                    <button
                                        className={`py-[10px] px-5 bg-[#F0F0F0] text-primary/60 cursor-pointer rounded-[62px]`}
                                    >
                                        <p>XX-Large</p>
                                    </button>
                                    <button
                                        className={`py-[10px] px-5 bg-[#F0F0F0] text-primary/60 cursor-pointer rounded-[62px]`}
                                    >
                                        <p>3X-Large</p>
                                    </button>
                                    <button
                                        className={`py-[10px] px-5 bg-[#F0F0F0] text-primary/60 cursor-pointer rounded-[62px]`}
                                    >
                                        <p>4X-Large</p>
                                    </button>
                                </div>
                            </div>

                            <div className='h-[1px] w-full bg-primary/10'></div>

                            <div className='grid gap-5'>
                                <div className='flex justify-between items-center'>
                                    <p className='font-bold text-xl capitalize'>Dress Style</p>
                                    <button className='text-primary -rotate-90'>
                                        <ChevronRight size={20} />
                                    </button>
                                </div>
                                <div className='grid gap-5 text-base *:hover:text-primary *:cursor-pointer *:hover:font-medium'>
                                    <div
                                        className='flex justify-between items-center text-primary/60'>
                                        <p>Causal</p>
                                        <div>
                                            <ChevronRight size={20} />
                                        </div>
                                    </div>

                                    <div
                                        className='flex justify-between items-center text-primary/60'>
                                        <p>Formal</p>
                                        <div>
                                            <ChevronRight size={20} />
                                        </div>
                                    </div>

                                    <div
                                        className='flex justify-between items-center text-primary/60'>
                                        <p>Party</p>
                                        <div>
                                            <ChevronRight size={20} />
                                        </div>
                                    </div>

                                    <div
                                        className='flex justify-between items-center text-primary/60'>
                                        <p>Gym</p>
                                        <div>
                                            <ChevronRight size={20} />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <DefaultButton
                                title='Apply Filter'
                                classNameButton='bg-primary border border-primary hover:border-primary/10 hover:bg-white group cursor-pointer'
                                classNameText='text-white group-hover:text-primary'
                            />
                        </div>
                    </div>

                    {/* Casual  */}
                    <div className='flex flex-col gap-4'>
                        <div className='flex justify-between items-center w-full h-fit gap-3 font-Satoshi'>
                            <p className='font-bold sm:text-[32px] text-2xl'>Casual</p>
                            <div className='flex-1 flex w-full lg:justify-end justify-start items-center text-primary/60 sm:text-base text-sm sm:pt-[10px] pt-[5px]'>
                                <p className=''>Showing 1-10 of 100 Products</p>
                            </div>
                            <div className='lg:flex hidden items-center gap-1 text-base text-nowrap pt-[10px]'>
                                <p className='text-primary/60'>Sort by:</p>
                                <button className='flex gap-1 font-medium cursor-pointer'>
                                    <p>Most popular</p>
                                    <ChevronDown />
                                </button>
                            </div>
                            <div className='lg:hidden flex items-center'>
                                <button
                                    onClick={() => setOpenFilter(!openFilter)}
                                    className='sm:p-3 p-2 bg-[#F0F0F0] rounded-full flex justify-center items-center cursor-pointer'
                                >
                                    <SlidersVertical className='xl:hidden block' size={screenWidth > 639 ? 20 : 16} />
                                </button>
                            </div>
                        </div>
                        <div className='grid grid-cols-3 gap-x-5 gap-y-9'>
                            {products.map((item: any) => (
                                <SimpleProduct key={item.id} product={item} />
                            ))}
                        </div>

                        {/* Pagination  */}
                        <div className='grid gap-y-5 mt-[30px] font-Satoshi'>
                            <div className='h-[1px] w-full bg-primary/10'></div>
                            <div className='flex justify-between items-center gap-1'>
                                <button className='flex gap-2 text-primary hover:text-white px-[14px] py-[8px] border border-primary/10 hover:border-primary hover:bg-primary rounded-[8px] cursor-pointer'>
                                    <ArrowLeft size={screenWidth > 639 ? 20 : 16} />
                                    <p className='sm:text-sm text-xs font-medium max-[415px]:hidden'>Previous</p>
                                </button>

                                <div className='flex gap-x-[2px] sm:text-sm text-xs font-medium *:cursor-pointer *:hover:text-primary *:hover:bg-primary/6'>
                                    <button className='bg-primary/6 text-primary sm:w-[40px] w-9 sm:h-[40px] h-9 relative rounded-[8px]'>
                                        <p className='absolute top-1/2 left-1/2 -translate-1/2'>1</p>
                                    </button>
                                    <button className='text-primary/50 sm:w-[40px] w-9 sm:h-[40px] h-9 relative rounded-[8px]'>
                                        <p className='absolute top-1/2 left-1/2 -translate-1/2'>2</p>
                                    </button>
                                    <button className='text-primary/50 sm:w-[40px] w-9 sm:h-[40px] h-9 relative rounded-[8px] md:block hidden'>
                                        <p className='absolute top-1/2 left-1/2 -translate-1/2'>3</p>
                                    </button>
                                    <button className='text-primary/50 sm:w-[40px] w-9 sm:h-[40px] h-9 relative rounded-[8px]'>
                                        <p className='absolute top-1/2 left-1/2 -translate-1/2'>...</p>
                                    </button>
                                    <button className='text-primary/50 sm:w-[40px] w-9 sm:h-[40px] h-9 relative rounded-[8px] md:block hidden'>
                                        <p className='absolute top-1/2 left-1/2 -translate-1/2'>8</p>
                                    </button>
                                    <button className='text-primary/50 sm:w-[40px] w-9 sm:h-[40px] h-9 relative rounded-[8px]'>
                                        <p className='absolute top-1/2 left-1/2 -translate-1/2'>9</p>
                                    </button>
                                    <button className='text-primary/50 sm:w-[40px] w-9 sm:h-[40px] h-9 relative rounded-[8px]'>
                                        <p className='absolute top-1/2 left-1/2 -translate-1/2'>10</p>
                                    </button>
                                </div>

                                <button className='flex gap-2 text-primary hover:text-white px-[14px] py-[8px] border border-primary/10 hover:border-primary hover:bg-primary rounded-[8px] cursor-pointer'>
                                    <p className='sm:text-sm text-xs font-medium max-[415px]:hidden'>Next</p>
                                    <ArrowRight size={screenWidth > 639 ? 20 : 16} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default CategoryPage