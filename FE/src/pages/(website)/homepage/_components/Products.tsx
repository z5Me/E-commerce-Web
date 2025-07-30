//Image
import Image_Product from '@/assets/product.svg';
import type { IProduct } from '@/common/types/product';
import DefaultButton from '@/components/DefaultButton';
import DiscountIcon from '@/components/Discount';
import ProductsList from '@/components/ProductsList';
import ShowRatingStar from '@/components/ShowRatingStar';
import { useAppDispatch } from '@/store/store';
import { getAllProducts } from '@/store/thunks/productThunk';
import { useEffect } from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router';

const Products = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const data = useSelector((state: any) => state.product.dataProducts, shallowEqual);
    const statusProduct = useSelector((state: any) => state.product.status, shallowEqual);

    useEffect(() => {
        if (statusProduct && statusProduct === 'idle') {
            dispatch(getAllProducts({ filterHidden: 'true' }));
        }
    }, [statusProduct])

    console.log('data: ', data)

    return (
        <>
            <section className='flex justify-center'>
                <div className='w-full max-w-[1920px] defaultPadding'>
                    <div className={`bg-white`}>
                        <div className='py-[55px]'>
                            <p className='font-IntegralCF lg:text-5xl text-4xl font-bold text-center uppercase'>new Rival</p>
                        </div>
                        <div className='grid lg:grid-cols-4 grid-cols-2 justify-center gap-5'>
                            {/* Product */}
                            {data && data.length > 0 && data.map((item: IProduct) => {
                                //Tìm vị trí index Variant có giá rẻ nhất
                                const bestPriceIndex = item.variants.reduce((minIndex, variant, index, array) => variant.price < array[minIndex].price ? index : minIndex, 0)
                                return (
                                    <Link to={`/detail`} key={item._id}>
                                        <div className='w-full h-full group hover:bg-gray-200 rounded-[20px] hover:cursor-pointer'>
                                            <div className='flex flex-col h-full gap-y-4 transition-all duration-150 group-hover:scale-95'>
                                                <div className='w-full aspect-[24/24] flex items-center justify-center overflow-hidden border rounded-[20px]'>
                                                    <img className='rounded-[20px] object-cover w-full' src={item.productImage} alt={item.name} />
                                                </div>
                                                <div className='flex flex-col h-fit gap-y-2 font-MJSatoshi'>
                                                    <p className='lg:text-xl text-base font-bold group-hover:text-blue-600'>{item.name}</p>
                                                    <div className='flex flex-wrap gap-x-[13px] items-center'>
                                                        <div className='flex gap-x-[5px]'>
                                                            <ShowRatingStar rating={3.5} />
                                                        </div>
                                                        <div className='flex lg:text-sm text-xs pt-1'>
                                                            <p className='text-primary'>{3.5}</p>
                                                            <p className='text-primary'>/</p>
                                                            <p className='text-primary/60'>5</p>
                                                        </div>
                                                    </div>
                                                    <DiscountIcon
                                                        className='sm:gap-[10px] gap-[5px] flex-wrap'
                                                        classNamePrice='lg:text-2xl text-xl'
                                                        classNameOldPrice='lg:text-2xl text-xl'
                                                        classNameDPercent='sm:text-xs text-[10px]'
                                                        price={item.variants[bestPriceIndex].price - item.variants[bestPriceIndex].discount}
                                                        oldPrice={item.variants[bestPriceIndex].price}
                                                        discountPrice={item.variants[bestPriceIndex].discount}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                )
                            })}
                            {/* End Product */}
                        </div>

                        {/* Load More Button */}

                        <div className='flex justify-center pt-[36px]'>
                            <DefaultButton
                                title='View All'
                                classNameButton='transition-all duration-200 sm:w-auto w-full border border-primary/10 hover:border-primary hover:bg-primary hover:text-white cursor-pointer'
                                classNameText='font-medium lg:text-base text-sm'
                                onClick={() => navigate('/category')}
                            />
                        </div>


                    </div >
                </div>
            </section>
            <section className='h-[2px] w-full flex justify-center items-center my-[64px]'>
                <div className='w-full max-w-[1920px] defaultPadding'>
                    <div className='bg-primary/10 h-[1px] w-full'></div>
                </div>
            </section>
            <section className='flex justify-center'>
                <div className='w-full max-w-[1920px] defaultPadding'>
                    <ProductsList caption='Top selling' className='' />
                </div>
            </section>
        </>
    )
}

export default Products