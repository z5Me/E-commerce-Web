import Product_Image from '@/assets/product2.svg';
import ChangeQuantity from "@/components/ChangeQuantity";
import DiscountIcon from "@/components/Discount";
import { Check, ChevronRight, PackageCheck, ShoppingBasket, Tag, Trash2, Wallet } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";

const attribute = [
    {
        id: 'a1',
        name: 'Color',
        slug: 'color',
        type: 'String',
        values: [
            {
                id: 'b1',
                name: 'Red',
                slug: 'red',
                type: 'Color',
                value: '#FF0000'
            },
            {
                id: 'b2',
                name: 'Blue',
                slug: 'blue',
                type: 'Color',
                value: '#0000FF'
            },
            {
                id: 'b7',
                name: 'Green',
                slug: 'green',
                type: 'Color',
                value: '#008000'
            }
        ]
    },
    {
        id: 'a2',
        name: 'Size',
        slug: 'size',
        type: 'String',
        values: [
            {
                id: 'b3',
                name: 'Medium',
                slug: 'medium',
                type: 'Size',
                value: 'medium'
            },
            {
                id: 'b4',
                name: 'Large',
                slug: 'large',
                type: 'Size',
                value: 'large'
            }
        ]
    },
    {
        id: 'a3',
        name: 'Weight',
        slug: 'weight',
        type: 'Number',
        values: [
            {
                id: 'b5',
                name: '5kg',
                slug: '5kg',
                type: 'Weight',
                value: '5kg'
            },
            {
                id: 'b6',
                name: '10kg',
                slug: '10kg',
                type: 'Weight',
                value: '10kg'
            }
        ]
    },
    {
        id: 'a4',
        name: 'Material',
        slug: 'material',
        type: 'String',
        values: [
            {
                id: 'b8',
                name: 'Cao Cap',
                slug: 'cao cap',
                type: 'Material',
                value: 'cao cap'
            }
        ]
    }
]

const attributeValue = [
    {
        id: 'b1',
        name: 'Red',
        slug: 'red',
        type: 'Color',
        value: '#FF0000'
    },
    {
        id: 'b2',
        name: 'Blue',
        slug: 'blue',
        type: 'Color',
        value: '#0000FF'
    },
    {
        id: 'b3',
        name: 'Medium',
        slug: 'medium',
        type: 'Size',
        value: 'medium'
    },
    {
        id: 'b4',
        name: 'Large',
        slug: 'large',
        type: 'Size',
        value: 'large'
    },
    {
        id: 'b5',
        name: '5kg',
        slug: '5kg',
        type: 'Weight',
        value: '5kg'
    },
    {
        id: 'b6',
        name: '10kg',
        slug: '10kg',
        type: 'Weight',
        value: '10kg'
    },
    {
        id: 'b7',
        name: 'Green',
        slug: 'green',
        type: 'Color',
        value: '#008000'
    },
    {
        id: 'b8',
        name: 'Cao Cap',
        slug: 'cao cap',
        type: 'Material',
        value: 'cao cap'
    },
]

const variants = [
    {
        id: 'c1',
        price: 200,
        oldPrice: 250,
        discountPercent: 20,
        values: [
            {
                id: 'b1',
                name: 'Red',
                slug: 'red',
                type: 'Color',
                value: '#FF0000'
            },
            {
                id: 'b3',
                name: 'Medium',
                slug: 'medium',
                type: 'Size',
                value: 'medium'
            },
            {
                id: 'b5',
                name: '5kg',
                slug: '5kg',
                type: 'Weight',
                value: '5kg'
            }
        ]
    },
    {
        id: 'c2',
        price: 250,
        oldPrice: 300,
        discountPercent: 15,
        values: [
            {
                id: 'b1',
                name: 'Red',
                slug: 'red',
                type: 'Color',
                value: '#FF0000'
            },
            {
                id: 'b4',
                name: 'Large',
                slug: 'large',
                type: 'Size',
                value: 'large'
            },
            {
                id: 'b5',
                name: '5kg',
                slug: '5kg',
                type: 'Weight',
                value: '5kg'
            }
        ]
    },
    {
        id: 'c3',
        price: 300,
        oldPrice: 350,
        discountPercent: 10,
        values: [
            {
                id: 'b2',
                name: 'Blue',
                slug: 'blue',
                type: 'Color',
                value: '#0000FF'
            },
            {
                id: 'b3',
                name: 'Medium',
                slug: 'medium',
                type: 'Size',
                value: 'medium'
            },
            {
                id: 'b5',
                name: '5kg',
                slug: '5kg',
                type: 'Weight',
                value: '5kg'
            }
        ]
    },
    {
        id: 'c4',
        price: 350,
        oldPrice: 400,
        discountPercent: 5,
        values: [
            {
                id: 'b2',
                name: 'Blue',
                slug: 'blue',
                type: 'Color',
                value: '#0000FF'
            },
            {
                id: 'b4',
                name: 'Large',
                slug: 'large',
                type: 'Size',
                value: 'large'
            },
            {
                id: 'b6',
                name: '10kg',
                slug: '10kg',
                type: 'Weight',
                value: '10kg'
            },
        ]
    },
    {
        id: 'c5',
        price: 100,
        oldPrice: 200,
        discountPercent: 50,
        values: [
            {
                id: 'b3',
                name: 'Medium',
                slug: 'medium',
                type: 'Size',
                value: 'medium'
            },
            {
                id: 'b7',
                name: 'Green',
                slug: 'green',
                type: 'Color',
                value: '#008000'
            }
        ]
    }
]

const cart = {
    id: 'cartid1',
    products: [
        {
            id: 'd1',
            product: {
                id: 'e1',
                name: 'Gradient Graphic T-shirt'
            },
            variant: {
                id: 'c1',
                price: 200,
                oldPrice: 250,
                discountPercent: 20,
                image: Product_Image,
                values: [
                    {
                        id: 'b1',
                        name: 'Red',
                        slug: 'red',
                        type: 'Color',
                        value: '#FF0000'
                    },
                    {
                        id: 'b3',
                        name: 'Medium',
                        slug: 'medium',
                        type: 'Size',
                        value: 'medium'
                    },
                    {
                        id: 'b5',
                        name: '5kg',
                        slug: '5kg',
                        type: 'Weight',
                        value: '5kg'
                    }
                ]
            },
            quantity: 1
        },
        {
            id: 'd2',
            product: {
                id: 'e2',
                name: 'Polo with Tipping Details'
            },
            variant: {
                id: 'c4',
                price: 350,
                oldPrice: 400,
                discountPercent: 5,
                image: Product_Image,
                values: [
                    {
                        id: 'b2',
                        name: 'Blue',
                        slug: 'blue',
                        type: 'Color',
                        value: '#0000FF'
                    },
                    {
                        id: 'b4',
                        name: 'Large',
                        slug: 'large',
                        type: 'Size',
                        value: 'large'
                    },
                    {
                        id: 'b6',
                        name: '10kg',
                        slug: '10kg',
                        type: 'Weight',
                        value: '10kg'
                    },
                ]
            },
            quantity: 3
        }
    ],
    totalProducts: 400,
    discount: 10,
    total: 390
}

const CartPage = () => {
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);
    useEffect(() => {
        const handdleResize = () => {
            setScreenWidth(window.innerWidth)
        }

        window.addEventListener('resize', handdleResize);

        return () => window.removeEventListener('resize', handdleResize);
    }, [])

    useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
    }, [])

    const [changeStatus, setChangeStatus] = useState<number>(1);
    const pCartRef = useRef<HTMLParagraphElement>(null);
    const pCheckoutRef = useRef<HTMLParagraphElement>(null);
    const pOrderRef = useRef<HTMLParagraphElement>(null);

    useEffect(() => {
        if (screenWidth < 768) {
            if (changeStatus > 1) {
                pCartRef.current?.classList.remove('w-[93px]');
                pCartRef.current?.classList.add('w-0');
                setTimeout(() => {
                    pCartRef.current?.classList.remove('block');
                    pCartRef.current?.classList.add('hidden');
                }, 200);
            } else {
                pCartRef.current?.classList.remove('hidden');
                setTimeout(() => {
                    pCartRef.current?.classList.add('w-[93px]');
                    pCartRef.current?.classList.remove('w-0');
                }, 1);
            }

            if (changeStatus === 2) {
                pCheckoutRef.current?.classList.remove('hidden');
                setTimeout(() => {
                    pCheckoutRef.current?.classList.remove('w-0');
                    pCheckoutRef.current?.classList.add('w-[61px]');
                }, 1)
            } else {
                pCheckoutRef.current?.classList.remove('w-[61px]');
                pCheckoutRef.current?.classList.add('w-0');
                setTimeout(() => {
                    pCheckoutRef.current?.classList.add('hidden');
                }, 200);
            }

            if (changeStatus === 3) {
                pOrderRef.current?.classList.remove('hidden');
                setTimeout(() => {
                    pOrderRef.current?.classList.add('w-[103px]');
                    pOrderRef.current?.classList.remove('w-0');
                }, 1)
            } else {
                pOrderRef.current?.classList.remove('w-[103px]');
                pOrderRef.current?.classList.add('w-0');
                setTimeout(() => {
                    pOrderRef.current?.classList.add('hidden');
                }, 200)
            }
        }
        else {
            pCartRef.current?.classList.remove('hidden');
            pCheckoutRef.current?.classList.remove('hidden');
            pOrderRef.current?.classList.remove('hidden');
        }

    }, [changeStatus, screenWidth]);

    return (
        <section className='grid place-items-center'>
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
                            <p>Cart</p>
                            {/* <ChevronRight size={18} /> */}
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-full py-7 bg-[#F4F4F4] flex justify-center items-center font-Satoshi">
                <div className="max-w-[1920px] w-full md:p-0 px-4 flex items-center justify-center">
                    <div className="flex gap-x-4 items-center sm:w-fit w-full">
                        <div className="flex gap-x-2 items-center">
                            <div className={`p-2 ${changeStatus === 1 ? 'bg-primary text-white' : ' bg-primary/10 text-black'} rounded-full transition-all duration-200`}>
                                {changeStatus === 1
                                    ?
                                    <ShoppingBasket size={screenWidth >= 640 ? 16 : 14} />
                                    :
                                    <Check size={screenWidth >= 640 ? 16 : 14} />
                                }
                            </div>
                            <p ref={pCartRef} className={`text-primary transition-all duration-300 md:text-base text-sm font-medium text-nowrap md:w-auto w-[93px] overflow-hidden`}>Shopping Cart</p>
                        </div>
                        <div className="h-[1px] lg:w-[105px] sm:w-[50px] w-full bg-[#C3D2CC] relative">
                            <div className={`transition-all duration-300 h-[2px] ${changeStatus === 1 ? 'w-0' : 'w-full'} bg-primary absolute inset-0`}></div>
                        </div>
                        <div className="flex gap-x-2 items-center">
                            <div className={`p-2 ${changeStatus === 2 ? 'bg-primary text-white' : changeStatus >= 3 ? 'bg-primary/10 text-primary' : 'bg-white text-primary'} rounded-full transition-all duration-300`}>
                                {changeStatus >= 3
                                    ?
                                    <Check size={screenWidth >= 640 ? 16 : 14} />
                                    :
                                    <Wallet size={screenWidth >= 640 ? 16 : 14} />
                                }

                            </div>
                            <p ref={pCheckoutRef} className={`text-primary transition-all duration-300 md:text-base text-sm font-medium text-nowrap md:w-auto w-[61px] overflow-hidden`}>Checkout</p>
                        </div>
                        <div className="h-[1px] lg:w-[105px] sm:w-[50px] w-full bg-[#C3D2CC] relative">
                            <div className={`transition-all duration-300 h-[2px] ${changeStatus >= 3 ? 'w-full' : 'w-0'} bg-primary absolute inset-0`}></div>
                        </div>
                        <div className="flex gap-x-2 items-center">
                            <div className={`p-2 ${changeStatus >= 4 ? 'bg-primary/10 text-primary' : 'bg-white text-primary'} rounded-full transition-all duration-300`}>
                                {changeStatus >= 4
                                    ?
                                    <Check size={screenWidth >= 640 ? 16 : 14} />
                                    :
                                    <PackageCheck size={screenWidth >= 640 ? 16 : 14} />
                                }
                            </div>
                            <p ref={pOrderRef} className={`text-primary transition-all duration-300 md:text-base text-sm font-medium text-nowrap md:block hidden md:w-auto w-[103px] overflow-hidden`}>Order Complete</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className='max-w-[1920px] w-full defaultPadding flex xl:flex-row flex-col gap-x-16 pt-8 font-Satoshi'>
                {/* YOUR CART  */}
                <div className="xl:w-[60%] w-full">
                    <div className="flex justify-between items-center border-b border-b-primary/10 pb-6">
                        <p className="text-xl font-medium">Your Cart</p>
                        <p className="text-base">(3)</p>
                    </div>
                    <div className="flex flex-col py-5 gap-y-6">
                        {cart && cart.products && cart.products.map((item: any) => (
                            <div key={item.id} className="flex gap-x-4 pb-6 border-b border-b-primary/10">
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
                                                <div className="sm:hidden flex justify-end hover:text-danger cursor-pointer">
                                                    <Trash2 size={20} />
                                                </div>
                                            </div>
                                            <div className="flex flex-col gap-y-1 sm:text-sm text-xs">
                                                {item.variant.values.map((value: any) => (
                                                    <React.Fragment key={value.id}>
                                                        <p>{value.type}: <span className="text-primary/60">{value.name}</span> </p>
                                                    </React.Fragment>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="flex justify-between gap-2">
                                            <DiscountIcon
                                                className="sm:text-2xl text-xl gap-2 flex-wrap"
                                                classNamePrice=""
                                                classNameOldPrice=""
                                                classNameDPercent="text-sm"
                                                price={item.variant.price}
                                                oldPrice={item.variant.oldPrice}
                                                discountPercent={item.variant.discountPercent}
                                            />
                                            <div className="grid place-items-end">
                                                <ChangeQuantity
                                                    className="sm:min-w-[126px] max-w-[105px] py-3 px-5 sm:hidden block"
                                                    sizeMinus={16}
                                                    sizePlus={16}
                                                    screenWidth={screenWidth}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="sm:flex hidden flex-col justify-between">
                                        <div className="flex justify-end hover:text-danger cursor-pointer">
                                            <Trash2 />
                                        </div>
                                        <ChangeQuantity
                                            className="sm:min-w-[126px] py-3 px-5"
                                            sizeMinus={16}
                                            sizePlus={16}
                                            screenWidth={screenWidth}
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                {/* SUBTOTAL  */}
                <div className="xl:w-[40%] w-full">
                    <div className="w-full flex flex-col gap-y-5 p-6 border border-primary/10 rounded-2xl">
                        <div className="flex flex-col gap-y-4 border-b pb-5 border-b-primary/10">
                            <div className="flex justify-between items-center sm:text-base text-sm">
                                <p className="text-primary/60">Subtotal</p>
                                <p className="font-bold">$565</p>
                            </div>
                            <div className="flex justify-between items-center sm:text-base text-sm">
                                <p className="text-primary/60">Discount</p>
                                <p className="font-bold text-danger">-$113</p>
                            </div>
                            <div className="flex justify-between items-center sm:text-base text-sm">
                                <p className="text-primary/60">Delivery Fee</p>
                                <p className="font-bold">$15</p>
                            </div>
                            <div className="flex justify-between items-center sm:text-base text-sm">
                                <p className="text-primary/60">Voucher</p>
                                <p className="font-bold text-danger">-$10</p>
                            </div>
                        </div>
                        <div className="flex flex-col gap-y-4 pb-5 border-b border-b-primary/10">
                            <div className="flex gap-x-3">
                                <div className="w-full bg-[#F0F0F0] text-primary/40 rounded-[62px] flex items-center gap-x-3 py-3 px-4">
                                    <Tag size={screenWidth >= 640 ? 24 : 20} />
                                    <input type="text" className="sm:text-base text-sm outline-0 w-full" placeholder="Add promo code" defaultValue={'VOUCHER_CODE_2025'} />
                                </div>
                                <button className="font-medium py-3 px-8 sm:text-base text-sm bg-primary hover:bg-white border border-primary hover:border-primary/40 text-white hover:text-primary rounded-[62px] cursor-pointer">
                                    <p>Apply</p>
                                </button>
                            </div>
                        </div>
                        <div className="flex justify-between items-center sm:text-lg text-base">
                            <p className="text-primary font-medium">Total</p>
                            <p className="font-bold">$467</p>
                        </div>
                        <div className="w-full px-10 flex justify-center items-center bg-[#C8C9CB] hover:bg-primary rounded-full cursor-pointer">
                            <div className="text-white sm:h-[56px] h-[48px] sm:text-lg text-base font-medium flex justify-center items-center gap-x-4">
                                <p>Checkout</p>
                                <div className="bg-white w-[2px] h-3"></div>
                                <p>$467.00</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section >
    )
}

export default CartPage