import Product_Image from '@/assets/product2.svg';
import useScreenWidth from '@/common/hooks/useScreenWidth';
import { ChevronRight, Headset, Package, Wallet } from "lucide-react";
import { Outlet } from 'react-router';
import PriceList from './_components/PriceList';
import ShoppingStatus from './_components/ShoppingStatus';

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
    //Theo dõi chiều ngang của web
    const screenWidth = useScreenWidth();

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
            <ShoppingStatus screenWidth={screenWidth} />
            <div className='max-w-[1920px] w-full defaultPadding flex xl:flex-row flex-col sm:gap-16 gap-8 py-10 font-Satoshi'>
                {/* YOUR CART  */}
                <Outlet />
            </div>
            {/* <div className='max-w-[1920px] w-full defaultPadding my-12'>
                <div className='w-full flex justify-between items-center *:w-full'>
                    <div className='flex justify-center'>
                        <div className='flex items-center gap-4 px-4 py-2'>
                            <Package size={48} />
                            <div className='flex flex-col'>
                                <p className='font-semibold text-lg'>Free Shipping</p>
                                <span className='text-sm text-gray-500'>Free shipping for order above $50</span>
                            </div>
                        </div>
                    </div>
                    <div className='flex justify-center border-l border-r'>
                        <div className='flex items-center gap-4 px-4 py-2'>
                            <Wallet size={48} />
                            <div className='flex flex-col'>
                                <p className='font-semibold text-lg'>Flexible Payment</p>
                                <span className='text-sm text-gray-500'>Mutiple secure payment options</span>
                            </div>
                        </div>
                    </div>
                    <div className='flex justify-center border-l'>
                        <div className='flex items-center gap-4 px-4 py-2'>
                            <Headset size={48} />
                            <div className='flex flex-col'>
                                <p className='font-semibold text-lg'>24x7 Support</p>
                                <span className='text-sm text-gray-500'>We support online all days</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div> */}
        </section >
    )
}

export default CartPage