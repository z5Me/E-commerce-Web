//Image
import Image_Product from '@/assets/product.svg';
import Image_Product2 from '@/assets/product2.svg';
import Image_Product4 from '@/assets/product4.svg';
import Image_Product5 from '@/assets/product5.svg';
import DefaultButton from '@/components/DefaultButton';

import { Link, useNavigate } from 'react-router';
import DiscountIcon from './Discount';
import ShowRatingStar from './ShowRatingStar';

const products = [
    {
        id: 1,
        image: Image_Product5,
        name: 'T-Shirt with Tape Details',
        price: 120,
        oldPrice: 200,
        discountPercent: 40,
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
        oldPrice: 160,
        discountPercent: 31,
        rating: 3.8
    }
]

const ProductsList = ({ caption, className, loadMoreProducts = true }: { caption: string, className?: string, loadMoreProducts?: boolean }) => {
    const navigate = useNavigate();

    return (
        <div className={`bg-white ${className}`}>
            <div className='pb-[55px]'>
                <p className='font-IntegralCF lg:text-5xl text-4xl font-bold text-center uppercase'>{caption}</p>
            </div>
            <div className='grid lg:grid-cols-4 grid-cols-2 justify-center gap-5'>
                {/* Product */}
                {products.map((product) => (
                    <Link to={`/detail`} key={product.id}>
                        <div className='w-full h-full group hover:bg-primary/15 rounded-[20px] hover:cursor-pointer'>
                            <div className='flex flex-col h-full gap-y-4 transition-all duration-150 group-hover:scale-95'>
                                <div className='w-full aspect-[23/24] flex items-center justify-center overflow-hidden bg-[#F0EEED] rounded-[20px]'>
                                    <img className='rounded-[20px] object-contain w-full' src={product.image} alt={product.name} />
                                </div>
                                <div className='flex flex-col h-fit gap-y-2 font-Satoshi'>
                                    <p className='lg:text-xl text-base font-bold group-hover:text-blue-600'>{product.name}</p>
                                    <div className='flex flex-wrap gap-x-[13px] items-center'>
                                        <div className='flex gap-x-[5px]'>
                                            <ShowRatingStar rating={product.rating} />
                                        </div>
                                        <div className='flex lg:text-sm text-xs pt-1'>
                                            <p className='text-primary'>{product.rating}</p>
                                            <p className='text-primary'>/</p>
                                            <p className='text-primary/60'>5</p>
                                        </div>
                                    </div>
                                    <DiscountIcon
                                        className='sm:gap-[10px] gap-[5px] flex-wrap'
                                        classNamePrice='lg:text-2xl text-xl'
                                        classNameOldPrice='lg:text-2xl text-xl'
                                        classNameDPercent='sm:text-xs text-[10px]'
                                        price={product.price}
                                        oldPrice={product.oldPrice}
                                        discountPercent={product.discountPercent}
                                    />
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
                {/* End Product */}
            </div>

            {/* Load More Button */}
            {
                loadMoreProducts &&
                <div className='flex justify-center pt-[36px]'>
                    <DefaultButton
                        title='View All'
                        classNameButton='transition-all duration-200 sm:w-auto w-full border border-primary/10 hover:border-primary hover:bg-primary hover:text-white cursor-pointer'
                        classNameText='font-medium lg:text-base text-sm'
                        onClick={() => navigate('/category')}
                    />
                </div>
            }

        </div >
    )
}

export default ProductsList