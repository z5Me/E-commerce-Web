import { Link } from 'react-router'
import DiscountIcon from './Discount'
import ShowRatingStar from './ShowRatingStar'

const SimpleProduct = ({ product }: { product: any }) => {
    return (
        <Link to={`/detail`} key={product.id}>
            <div className='w-full h-full group hover:bg-primary/15 rounded-[20px] hover:cursor-pointer'>
                <div className='flex flex-col h-full gap-y-4 transition-all duration-150 group-hover:scale-95'>
                    <div className={`w-full aspect-[23/24] flex items-center justify-center overflow-hidden bg-[#F0EEED] rounded-[20px]`}>
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
    )
}

export default SimpleProduct