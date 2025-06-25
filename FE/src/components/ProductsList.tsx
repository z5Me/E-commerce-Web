//Image
import Image_Product from '@/assets/product.svg';
import DefaultButton from '@/components/DefaultButton';

// Icons
import { FaStar } from "react-icons/fa";
import { Link } from 'react-router';

const ProductsList = ({ caption, className, loadMoreProducts = true }: { caption: string, className?: string, loadMoreProducts?: boolean }) => {
    return (
        <Link to={'/detail'}>
            <div className={`bg-white ${className}`}>
                <div className='pb-[55px]'>
                    <p className='font-IntegralCF lg:text-5xl text-4xl font-bold text-center uppercase'>{caption}</p>
                </div>
                <div className='grid lg:grid-cols-4 grid-cols-2 justify-center gap-5'>
                    {/* Product */}
                    <div className='w-full group hover:bg-primary/15 rounded-[20px] hover:cursor-pointer'>
                        <div className='flex flex-col gap-y-4 transition-all duration-150 group-hover:scale-95'>
                            <div className='w-full max-md:min-w-[146px] max-md:min-h-[148px] max-w-[415px] max-h-[419px] flex items-center justify-center overflow-hidden bg-[#F0EEED] rounded-[20px]'>
                                <img className='rounded-[20px] object-contain w-full h-full' src={Image_Product} alt="Image_Product" />
                            </div>
                            <div className='flex flex-col gap-y-2 font-Satoshi'>
                                <p className='lg:text-xl text-base font-bold group-hover:text-blue-600'>T-Shirt with Tape Details</p>
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
                    </div>

                    <div className='w-full group hover:bg-primary/15 rounded-[20px] hover:cursor-pointer'>
                        <div className='flex flex-col gap-y-4 transition-all duration-150 group-hover:scale-95'>
                            <div className='w-full max-md:min-w-[146px] max-md:min-h-[148px] max-w-[415px] max-h-[419px] flex items-center justify-center overflow-hidden bg-[#F0EEED] rounded-[20px]'>
                                <img className='rounded-[20px] object-contain w-full h-full' src={Image_Product} alt="Image_Product" />
                            </div>
                            <div className='flex flex-col gap-y-2 font-Satoshi'>
                                <p className='lg:text-xl text-base font-bold group-hover:text-blue-600'>T-Shirt with Tape Details</p>
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
                    </div>

                    <div className='w-full group hover:bg-primary/15 rounded-[20px] hover:cursor-pointer'>
                        <div className='flex flex-col gap-y-4 transition-all duration-150 group-hover:scale-95'>
                            <div className='w-full max-md:min-w-[146px] max-md:min-h-[148px] max-w-[415px] max-h-[419px] flex items-center justify-center overflow-hidden bg-[#F0EEED] rounded-[20px]'>
                                <img className='rounded-[20px] object-contain w-full h-full' src={Image_Product} alt="Image_Product" />
                            </div>
                            <div className='flex flex-col gap-y-2 font-Satoshi'>
                                <p className='lg:text-xl text-base font-bold group-hover:text-blue-600'>T-Shirt with Tape Details</p>
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
                    </div>

                    <div className='w-full group hover:bg-primary/15 rounded-[20px] hover:cursor-pointer'>
                        <div className='flex flex-col gap-y-4 transition-all duration-150 group-hover:scale-95'>
                            <div className='w-full max-md:min-w-[146px] max-md:min-h-[148px] max-w-[415px] max-h-[419px] flex items-center justify-center overflow-hidden bg-[#F0EEED] rounded-[20px]'>
                                <img className='rounded-[20px] object-contain w-full h-full' src={Image_Product} alt="Image_Product" />
                            </div>
                            <div className='flex flex-col gap-y-2 font-Satoshi'>
                                <p className='lg:text-xl text-base font-bold group-hover:text-blue-600'>T-Shirt with Tape Details</p>
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
                    </div>
                    {/* End Product */}
                </div>
                {loadMoreProducts &&
                    <div className='flex justify-center pt-[36px]'>
                        <DefaultButton
                            title='View All'
                            classNameButton='transition-all duration-200 sm:w-auto w-full border border-primary/10 hover:border-primary hover:bg-primary hover:text-white cursor-pointer'
                            classNameText='font-medium lg:text-base text-sm'
                        />
                    </div>
                }

            </div>
        </Link>
    )
}

export default ProductsList