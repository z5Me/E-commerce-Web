import success from '@/assets/animations/Success.json';
import Product_Image from '@/assets/product2.svg';
import ProductsList from '@/components/ProductsList';
import { useEffect, useRef, useState } from 'react';
import LazyLottiePlayer from './LazyLottiePlayer';

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
                discountPrice: 20,
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
                discountPrice: 5,
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

const OrderComplete = () => {
    const animationRef = useRef<any>(null);
    const thanksRef = useRef<HTMLDivElement>(null);
    const buymoreRef = useRef<HTMLDivElement>(null);
    const ordertrackRef = useRef<HTMLDivElement>(null);
    const productsListRef = useRef<HTMLDivElement>(null);
    const [showPlayer, setShowPlayer] = useState<boolean>(false);

    useEffect(() => {
        window.scrollTo({ top: 240, behavior: 'smooth' });
        setTimeout(() => {
            setShowPlayer(true);
        }, 500)
    }, [])

    return (
        <div className='flex flex-col min-h-[1000px] w-full items-center relative'>
            <div ref={animationRef} className='flex flex-col items-center overflow-hidden transition-all ease-in-out duration-300 absolute top-1/2 -translate-y-1/2'>
                <div className='text-white w-[100px] rounded-full'>
                    {showPlayer &&
                        <LazyLottiePlayer
                            src={success}
                            autoplay
                            keepLastFrame={true}
                            onEvent={(e) => {
                                if (e === 'complete') {
                                    // console.log('Hoàn thành hiệu ứng');
                                    animationRef.current?.classList.remove('top-1/2', '-translate-y-1/2');
                                    animationRef.current?.classList.add('top-0');

                                    setTimeout(() => {
                                        thanksRef.current?.classList.add('pt-0', 'opacity-100');
                                        thanksRef.current?.classList.remove('pt-12', 'opacity-0');
                                    }, 400)

                                    setTimeout(() => {
                                        buymoreRef.current?.classList.remove('mt-16', 'opacity-0');
                                        buymoreRef.current?.classList.add('mt-8', 'opacity-100');
                                    }, 600)

                                    setTimeout(() => {
                                        ordertrackRef.current?.classList.remove('mt-16', 'opacity-0');
                                        ordertrackRef.current?.classList.add('mt-8', 'opacity-100');
                                    }, 800)

                                    setTimeout(() => {
                                        productsListRef.current?.classList.remove('hidden');
                                        productsListRef.current?.classList.add('block');
                                        setTimeout(() => {
                                            productsListRef.current?.classList.remove('mt-60', 'opacity-0');
                                            productsListRef.current?.classList.add('mt-20', 'opacity-100');
                                        }, 10)
                                    }, 1000)
                                }
                            }}

                        />
                    }

                </div>
                <div ref={thanksRef} className='flex transition-all duration-300 flex-col items-center gap-1 pt-12 opacity-0'>
                    <p className='text-2xl font-bold'>Your order is completed!</p>
                    <span className='text-sm text-primary/50'>Thank you. Your Order has been received.</span>
                </div>
                <div className='flex justify-between gap-2 min-w-[250px] *:cursor-pointer'>
                    <div>
                        <div ref={buymoreRef} className='mt-16 opacity-0 px-4 py-2 transition-all duration-300 bg-primary hover:bg-white border border-primary rounded-full text-white hover:text-primary'>Buy more</div>
                    </div>
                    <div>
                        <div ref={ordertrackRef} className='mt-16 opacity-0 px-4 py-2 transition-all duration-300 bg-primary hover:bg-white border border-primary rounded-full text-white hover:text-primary'>Order track</div>
                    </div>
                </div>
                <div ref={productsListRef} className='transition-all duration-300 hidden mt-60 opacity-0'>
                    <ProductsList caption="You might also like" loadMoreProducts={false} />
                </div>
            </div>
            {/* <ProductsList className="mb-[78px]" caption="You might also like" loadMoreProducts={false} /> */}
        </div >
    )
}

export default OrderComplete