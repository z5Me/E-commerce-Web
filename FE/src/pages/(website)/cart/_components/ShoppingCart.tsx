import useScreenWidth from '@/common/hooks/useScreenWidth';
import ProductInCart from '@/components/ProductInCart';
import { useDialog } from '@/contexts/DialogContext';
import { useAppDispatch } from '@/store/store';
import { clearCart, getSingleCart } from '@/store/thunks/cartThunk';
import { reSignIn } from '@/store/thunks/userThunk';
import { Tag } from 'lucide-react';
import { useEffect } from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import PriceList from './PriceList';
import { toast } from 'sonner';
import { useNavigate } from 'react-router';
import { useChangeStatusCart } from '@/common/hooks/useChangeStatusCart';

const ShoppingCart = () => {
    //Theo dõi chiều ngang của web
    const screenWidth = useScreenWidth();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const cart = useSelector((state: any) => state.cart.cartData, shallowEqual);

    const dataUser = useSelector((state: any) => state.user.dataUser, shallowEqual);

    const { showDialog } = useDialog();

    useEffect(() => {
        if (dataUser && dataUser._id) {
            dispatch(getSingleCart({ idUser: dataUser._id }));
        } else {
            dispatch(reSignIn()).unwrap()
                .catch(() => {
                    toast.warning('Phiên đăng nhập đã hết hạn');
                    showDialog({
                        title: 'Rời khỏi trang?',
                        description: 'Một vài tính năng cần bạn đăng nhập để tiếp tục sử dụng',
                        onConfirm: () => navigate('/auth'),
                        onCancel: () => navigate(-1)
                    });
                });
        }
    }, [dataUser]);

    return (
        <>
            <div className="xl:w-[60%] w-full">
                <div className="flex justify-between items-center border-b border-b-primary/10 sm:pb-6 pb-2">
                    <p className="text-xl font-medium">Your Cart</p>
                    <p className="text-base">({cart && cart.products.length})</p>
                </div>
                <div className="flex flex-col py-5 gap-y-6">
                    {cart && cart.products && cart.products.map((item: any) => (
                        <div key={item._id} className='pb-6 border-b border-b-primary/10'>
                            <ProductInCart item={item} cart={cart} dataUser={dataUser} />
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
                    <p
                        className='sm:text-base text-sm font-semibold underline cursor-pointer text-nowrap'
                        onClick={() => showDialog({
                            title: 'Bạn chắc chứ?',
                            description: 'Toàn bộ sản phẩm có trong giỏ hàng sẽ bị xóa',
                            onConfirm: () => {
                                dispatch(clearCart({ idUser: dataUser._id }))
                            }
                        })}
                    >
                        Clear cart
                    </p>
                </div>
            </div>
            <PriceList cart={cart} />
        </>
    )
}

export default ShoppingCart