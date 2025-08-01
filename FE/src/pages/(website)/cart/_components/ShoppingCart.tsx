import Product_Image from '@/assets/product2.svg';
import ProductInCart from '@/components/ProductInCart';
import PriceList from './PriceList';
import useScreenWidth from '@/common/hooks/useScreenWidth';
import { Tag } from 'lucide-react';
import { shallowEqual, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useAppDispatch } from '@/store/store';
import { getSingleCart } from '@/store/thunks/cartThunk';
import { reSignIn } from '@/store/thunks/userThunk';
import { toast } from 'sonner';

const ShoppingCart = () => {
    //Theo dõi chiều ngang của web
    const screenWidth = useScreenWidth();
    const dispatch = useAppDispatch();
    const cart = useSelector((state: any) => state.cart.cartData, shallowEqual);
    const cartStatus = useSelector((state: any) => state.cart.status, shallowEqual);

    const dataUser = useSelector((state: any) => state.user.dataUser, shallowEqual);
    // console.log('cart: ', cart);

    useEffect(() => {
        if (cartStatus === 'idle') {
            if (!dataUser._id) {
                // console.log('Chạy vào idUser rong')
                dispatch(reSignIn()).unwrap()
                    .then()
                    .catch(() => {
                        toast.warning('Phiên đăng nhập đã hết hạn');
                        return;
                    })
            }
            dispatch(getSingleCart({ idUser: dataUser._id }));
        }
    }, [cartStatus]);

    useEffect(() => {
        if (dataUser && dataUser._id) {
            dispatch(getSingleCart({ idUser: dataUser._id }));
        }
    }, [dataUser])

    return (
        <>
            <div className="xl:w-[60%] w-full">
                <div className="flex justify-between items-center border-b border-b-primary/10 sm:pb-6 pb-2">
                    <p className="text-xl font-medium">Your Cart</p>
                    <p className="text-base">(3)</p>
                </div>
                <div className="flex flex-col py-5 gap-y-6">
                    {cart && cart.products && cart.products.map((item: any) => (
                        <div key={item._id} className='pb-6 border-b border-b-primary/10'>
                            <ProductInCart item={item} cart={cart} />
                        </div>
                    ))}
                </div>
                <div className="flex sm:flex-row flex-col-reverse justify-between sm:items-center items-end gap-4 pb-5">
                    <div className="flex gap-x-3 w-full max-w-[783px]">
                        <div className="w-full bg-[#F0F0F0] text-primary/40 rounded-[62px] flex items-center gap-x-3 py-3 px-4">
                            <Tag size={screenWidth >= 640 ? 24 : 20} />
                            <input type="text" className="sm:text-base text-sm outline-0 w-full text-primary" placeholder="Add promo code" defaultValue={'VOUCHER_CODE_2025'} />
                        </div>
                        <button className="font-medium sm:py-3 py-2 sm:px-8 px-6 sm:text-base text-sm bg-primary hover:bg-white border border-primary hover:border-primary/40 text-white hover:text-primary rounded-[62px] cursor-pointer">
                            <p>Apply</p>
                        </button>
                    </div>
                    <p className='sm:text-base text-sm font-semibold underline cursor-pointer text-nowrap'>Clear cart</p>
                </div>
            </div>
            <PriceList cart={cart} />
        </>
    )
}

export default ShoppingCart