import success from '@/assets/animations/Success.json';
import ProductsList from '@/components/ProductsList';
import { setOrderStatus } from '@/store/slices/orderSlice';
import { useAppDispatch } from '@/store/store';
import { useEffect, useRef, useState } from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import { toast } from 'sonner';
import LazyLottiePlayer from './LazyLottiePlayer';
import { useLoading } from '@/contexts/LoadingScreen';
import { useLocation, useNavigate } from 'react-router';

const OrderComplete = () => {
    const animationRef = useRef<any>(null);
    const thanksRef = useRef<HTMLDivElement>(null);
    const buymoreRef = useRef<HTMLDivElement>(null);
    const ordertrackRef = useRef<HTMLDivElement>(null);
    const productsListRef = useRef<HTMLDivElement>(null);
    const [showPlayer, setShowPlayer] = useState<boolean>(false);
    const navigate = useNavigate();
    const location = useLocation();
    const { orderCode } = location.state || '' //Làm tiếp đoạn này, lấy orderCode gắn vào chỗ chuyển trang, để khi chuyển trang đến thì tìm kiếm order theo orderCode đó luôn

    const dispatch = useAppDispatch();
    const orderStatus = useSelector((state: any) => state.order.status, shallowEqual);
    const { show, hide } = useLoading();

    useEffect(() => {
        window.scrollTo({ top: 240, behavior: 'smooth' });
        document.body.classList.add('overflow-hidden');
        toast.info('Sắp xong rồi! Chúng tôi đang hoàn tất đơn hàng');
        setTimeout(() => {
            setShowPlayer(true);
            show()
        }, 1)
    }, []);

    // kiểm tra change để điều hướng về cart nếu không thỏa mãn url
    const changePage = useSelector((state: any) => state.cart.changePage, shallowEqual);
    useEffect(() => {
        // console.log(changePage)
        if (changePage !== '/cart/order') {
            setTimeout(() => {
                navigate('/cart');
                hide();
            }, 2);
            return;
        }
        return;
    }, []);

    const handleOrderTrack = () => {
        navigate('/user/order');
    }

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
                                if (e === "load") {
                                    hide();
                                }
                                if (e === 'complete') {
                                    // console.log('Hoàn thành hiệu ứng');
                                    toast.success('Đặt hàng thành công!')
                                    if (orderStatus === 'createOrder.fulfilled') {
                                        setTimeout(() => {
                                            dispatch(setOrderStatus());
                                        }, 500);

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
                                                document.body.classList.remove('overflow-hidden')
                                            }, 10)
                                        }, 1000)
                                    }
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
                        <div
                            onClick={() => handleOrderTrack()}
                            ref={buymoreRef}
                            className='mt-16 opacity-0 px-4 py-2 transition-all duration-300 bg-primary hover:bg-white border border-primary rounded-full text-white hover:text-primary'
                        >
                            Buy more
                        </div>
                    </div>
                    <div>
                        <div
                            ref={ordertrackRef}
                            className='mt-16 opacity-0 px-4 py-2 transition-all duration-300 bg-primary hover:bg-white border border-primary rounded-full text-white hover:text-primary'
                            onClick={() => navigate(`/user/order`, { state: { orderCode } })}
                        >
                            Order track
                        </div>
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