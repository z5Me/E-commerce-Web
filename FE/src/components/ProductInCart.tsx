import { Trash2 } from 'lucide-react'
import React from 'react'
import DiscountIcon from './Discount'
import ChangeQuantity from './ChangeQuantity'
import useScreenWidth from '@/common/hooks/useScreenWidth'

const ProductInCart = ({ item, checkout = false }: any) => {
    const screenWidth = useScreenWidth();
    return (
        <div className="flex gap-x-4">
            <div className="aspect-square sm:max-w-[166px] max-w-[99px]">
                <div className="bg-[#F0EEED] rounded-xl">
                    <img src={item.variant.image} alt="Product image" />
                </div>
            </div>
            <div className="flex justify-between w-full">
                <div className="flex-1 flex flex-col justify-between">
                    <div className="flex flex-col gap-y-[2px]">
                        <div className="flex gap-2 justify-between">
                            <p className="font-bold sm:text-xl text-base">{item.product.name}</p>
                            {checkout ?
                                <p>x{item.quantity}</p>
                                :
                                <div className="flex justify-end hover:text-danger cursor-pointer">
                                    <Trash2 size={20} />
                                </div>
                            }
                        </div>
                        <div className="flex flex-col gap-y-1 sm:text-sm text-xs">
                            {item.variant.values.map((value: any) => (
                                <React.Fragment key={value.id}>
                                    <p>{value.type}: <span className="text-primary/60">{value.name}</span> </p>
                                </React.Fragment>
                            ))}
                        </div>
                    </div>
                    <div className="flex flex-wrap justify-between gap-0">
                        {checkout
                            ?
                            <div className='w-full flex justify-between'>
                                <p>Price:</p>
                                <span className="text-primary">${item.variant.price}</span>
                            </div>
                            :
                            <DiscountIcon
                                className="sm:text-2xl text-base gap-2 flex-wrap"
                                classNamePrice=""
                                classNameOldPrice=""
                                classNameDPercent="sm:text-sm text-xs max-sm:px-[10px] max-sm:py-[4px]"
                                price={item.variant.price}
                                oldPrice={item.variant.oldPrice}
                                discountPercent={item.variant.discountPercent}
                            />
                        }
                        <div className={`grid place-items-end ${checkout && 'w-full'}`}>
                            {checkout ?
                                <div className='flex w-full justify-between sm:text-2xl text-base font-medium'>
                                    <p>Total</p>
                                    <p className=''>${item.variant.price * item.quantity}</p>
                                </div>
                                :
                                <ChangeQuantity
                                    className="sm:min-w-[126px] sm:py-3 py-2 sm:px-5 px-4"
                                    sizeMinus={screenWidth > 639 ? 16 : 14}
                                    sizePlus={screenWidth > 639 ? 16 : 14}
                                    screenWidth={screenWidth}
                                />
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductInCart