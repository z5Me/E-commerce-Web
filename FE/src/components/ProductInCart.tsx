import useScreenWidth from '@/common/hooks/useScreenWidth'
import { debounce } from '@/lib/utils'
import { useAppDispatch } from '@/store/store'
import { removeAProduct, updateQuantity } from '@/store/thunks/cartThunk'
import { Trash2 } from 'lucide-react'
import React, { useMemo, useState } from 'react'
import { Link } from 'react-router'
import { ChangeQuantity } from './ChangeQuantity'
import DiscountIcon from './Discount'
import type { IItemCart } from '@/common/types/itemCart'
import type { ICart } from '@/common/types/cart'
import type { IUser } from '@/common/types/user'
import type { IAttributeValue } from '@/common/types/attributeValue'

type Props = {
    item: IItemCart,
    checkout?: Boolean,
    cart: ICart,
    dataUser: IUser
}

const ProductInCart = ({ item, checkout = false, cart, dataUser }: Props) => {
    const screenWidth = useScreenWidth();
    const dispatch = useAppDispatch();
    const [quantity, setQuantity] = useState<number>(item.quantity);
    // console.log('item: ', cart);

    const debouncedUpdateQuantity = useMemo(() =>
        debounce((value: number) => {
            if (cart.idUser && item.product._id && item.variant._id) {
                dispatch(updateQuantity({
                    idUser: dataUser._id as string,
                    idProduct: item.product._id,
                    idVariant: item.variant._id,
                    quantity: value
                }));
            }
        }, 500)
        , [dataUser._id, item.product._id, item.variant._id, dispatch]);

    return (
        <div className="flex gap-x-4">
            <div className="aspect-square sm:max-w-[166px] max-w-[99px]">
                <div className="bg-[#F0EEED] rounded-xl overflow-hidden border">
                    <Link to={`/detail/${item.product.slug}?idVariant=${item.variant._id}`}>
                        <img src={item.variant.image} alt="Product image" />
                    </Link>
                </div>
            </div>
            <div className="flex justify-between w-full">
                <div className="flex-1 flex flex-col justify-between">
                    <div className="flex flex-col gap-y-[2px]">
                        <div className="flex gap-2 justify-between">
                            <Link to={`/detail/${item.product.slug}?idVariant=${item.variant._id}`}>
                                <p className="font-bold sm:text-xl text-base hover:text-blue-500">{item.product.name}</p>
                            </Link>
                            {checkout ?
                                <p>x{quantity}</p>
                                :
                                <div onClick={() => dispatch(removeAProduct({ idUser: dataUser._id as string, idVariant: item.variant._id }))} className="flex justify-end hover:text-danger cursor-pointer">
                                    <Trash2 size={20} />
                                </div>
                            }
                        </div>
                        <div className="flex flex-col gap-y-1 sm:text-sm text-xs">
                            {item.variant.values.map((value: IAttributeValue) => (
                                <React.Fragment key={value._id}>
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
                                <span className="text-primary">${(item.variant.price ?? 0) - (item.variant.discount ?? 0)}</span>
                            </div>
                            :
                            <DiscountIcon
                                className="sm:text-2xl text-base gap-2 flex-wrap"
                                classNamePrice=""
                                classNameOldPrice=""
                                classNameDPercent="sm:text-sm text-xs max-sm:px-[10px] max-sm:py-[4px]"
                                price={(item.variant.price ?? 0) - (item.variant.discount ?? 0)}
                                oldPrice={item.variant.price ?? 0}
                                discountPrice={item.variant.discount ?? 0}
                            />
                        }
                        <div className={`grid place-items-end ${checkout && 'w-full'}`}>
                            {checkout ?
                                <div className='flex w-full justify-between sm:text-2xl text-base font-bold'>
                                    <p>Total</p>
                                    <p className=''>${item.variant.price * quantity}</p>
                                </div>
                                :
                                <ChangeQuantity
                                    maxQuantity={item.variant.countOnStock}
                                    quantity={quantity}
                                    setQuantity={setQuantity}
                                    sizeMinus={screenWidth > 639 ? 16 : 14}
                                    sizePlus={screenWidth > 639 ? 16 : 14}
                                    onClickMinus={() => {
                                        const newValue = Math.max(1, quantity - 1);
                                        setQuantity(newValue);
                                        (newValue !== quantity) && debouncedUpdateQuantity(newValue);
                                    }}
                                    onClickPlus={() => {
                                        const newValue = Math.min(item.variant.countOnStock, quantity + 1);
                                        setQuantity(newValue);
                                        (newValue !== quantity) && debouncedUpdateQuantity(newValue);
                                    }}
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