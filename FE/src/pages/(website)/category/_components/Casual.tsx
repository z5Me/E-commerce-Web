import SimpleProduct from '@/components/SimpleProduct';
import { ArrowLeft, ArrowRight, ChevronDown, SlidersVertical } from 'lucide-react';

//Image
import Image_Product from '@/assets/product.svg';
import Image_Product2 from '@/assets/product2.svg';
import Image_Product4 from '@/assets/product4.svg';
import Image_Product5 from '@/assets/product5.svg';
import { useEffect, useState } from 'react';

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

const Casual = ({ screenWidth, openFilter, setOpenFilter }: { screenWidth: number, openFilter: boolean, setOpenFilter: (open: boolean) => void }) => {
    const [openSortBy, setOpenSortBy] = useState<boolean>(false);
    useEffect(() => {
        if (screenWidth <= 1024) {
            setOpenSortBy(false);
        }
    }, [screenWidth]);

    return (
        <div className='flex flex-col gap-4'>
            <div className='flex justify-between items-center w-full h-fit gap-3 font-Satoshi'>
                <p className='font-bold sm:text-[32px] text-2xl'>Casual</p>
                <div className='flex-1 flex w-full lg:justify-end justify-start items-center text-primary/60 sm:text-base text-sm sm:pt-[10px] pt-[5px]'>
                    <p className=''>Showing 1-10 of 100 Products</p>
                </div>
                <div className='lg:flex hidden items-center gap-1 text-base text-nowrap pt-[10px] select-none'>
                    <p className='text-primary/60'>Sort by:</p>
                    <div onClick={() => setOpenSortBy(!openSortBy)} className='flex gap-x-1 text-base group font-medium cursor-pointer relative z-20'>
                        <p>Most popular</p>
                        <div className={`transition-all duration-200 ${openSortBy && 'rotate-180'}`}>
                            <ChevronDown />
                        </div>
                        <div
                            onClick={(e) => e.stopPropagation()}
                            className={`absolute transition-all duration-200 grid top-6 left-0 *:flex z-20 *:cursor-pointer *:hover:bg-primary/10 overflow-y-auto bg-white overflow-hidden w-full ${openSortBy ? `h-[74px] border border-primary/20` : 'h-0 pointer-events-none'}`}
                        >
                            <button>
                                <p>Most popular</p>
                            </button>
                            <button>
                                <p>Most popular 2</p>
                            </button>
                            <button>
                                <p>Most popular 3</p>
                            </button>
                        </div>
                    </div>
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
    )
}

export default Casual