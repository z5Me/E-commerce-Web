import useScreenWidth from '@/common/hooks/useScreenWidth';
import { ChevronRight } from "lucide-react";
import { Outlet } from 'react-router';
import ShoppingStatus from './_components/ShoppingStatus';
import { shallowEqual, useSelector } from 'react-redux';
import { useLoading } from '@/contexts/LoadingScreen';
import { useEffect } from 'react';


const CartPage = () => {
    //Theo dõi chiều ngang của web
    const screenWidth = useScreenWidth();
    const cartStatus = useSelector((state: any) => state.cart.status, shallowEqual);
    const { show, hide } = useLoading();

    useEffect(() => {
        if (cartStatus && cartStatus === 'pending') {
            show()
            return;
        }
        return hide();
    }, [cartStatus]);

    return (
        <section className='grid place-items-center'>
            <div className='max-w-[1920px] w-full defaultPadding'>
                {/* điều hướng */}
                <div className='w-full flex flex-col gap-6 mb-9'>
                    <div className='h-[1px] w-full bg-primary/10'></div>
                    <div className='flex lg:gap-3 gap-[6px]'>
                        <div className='flex gap-1 items-center font-MJSatoshi lg:text-base text-sm text-primary/60'>
                            <p>Home</p>
                            <ChevronRight size={18} />
                        </div>
                        <div className='flex gap-1 items-center font-MJSatoshi lg:text-base text-sm text-primary'>
                            <p>Cart</p>
                            {/* <ChevronRight size={18} /> */}
                        </div>
                    </div>
                </div>
            </div>
            <ShoppingStatus screenWidth={screenWidth} />
            <div className='max-w-[1920px] w-full defaultPadding flex xl:flex-row flex-col sm:gap-16 gap-8 py-10 font-MJSatoshi'>
                {/* YOUR CART  */}
                <Outlet />
            </div>
        </section >
    )
}

export default CartPage