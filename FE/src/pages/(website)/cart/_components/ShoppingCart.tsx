import Empty_Cart from '@/assets/cart.png';
import useScreenWidth from '@/common/hooks/useScreenWidth';
import type { IItemCart } from '@/common/types/itemCart';
import type { IVoucher } from '@/common/types/voucher';
import ProductInCart from '@/components/ProductInCart';
import { useDialog } from '@/contexts/DialogContext';
import { useAppDispatch } from '@/store/store';
import { calculateShipping, clearCart, getSingleCart, removeVoucher } from '@/store/thunks/cartThunk';
import { reSignIn } from '@/store/thunks/userThunk';
import { getAllVoucher } from '@/store/thunks/voucherThunk';
import { Tag } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';
import PriceList from './PriceList';
import VoucherWarehouse from './VoucherWarehouse';

const ShoppingCart = () => {
    //Theo dõi chiều ngang của web
    const screenWidth = useScreenWidth();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const firstRender = useRef(true);
    //Dữ liệu giỏ hàng của người dùng
    const cart = useSelector((state: any) => state.cart.cartData, shallowEqual);
    //Dữ liệu của người dùng
    const dataUser = useSelector((state: any) => state.user.dataUser, shallowEqual);

    useEffect(() => {
        dispatch(getAllVoucher({ filterDelete: 'true', filterActive: 'true' }))
    }, []);

    const { showDialog } = useDialog();

    useEffect(() => {
        if (dataUser && dataUser._id) {
            if (firstRender && firstRender.current) {
                dispatch(getSingleCart({ idUser: dataUser._id })).unwrap()
                    .then(() => {
                        const filterAddress = dataUser.address.filter((add: any) => add.selected === true);
                        filterAddress && dispatch(calculateShipping({ destination: { lat: filterAddress[0].lat, lng: filterAddress[0].lng }, idUser: dataUser._id })).unwrap()
                            .then()
                            .catch((error) => {
                                console.log('Lỗi ở calculateShipping', error);
                                navigate(-1);
                            })
                    })
                    .catch((error) => {
                        toast.error(error);
                        console.log('Lỗi khi getSingleCart', error);
                    });
                firstRender.current = false;
            }
        } else {
            // Nếu reload trang thì đã có header gọi reSignIn
            // dispatch(reSignIn()).unwrap()
            //     .catch(() => {
            //         toast.warning('Phiên đăng nhập đã hết hạn');
            //         showDialog({
            //             title: 'Rời khỏi trang?',
            //             description: 'Một vài tính năng cần bạn đăng nhập để tiếp tục sử dụng',
            //             onConfirm: () => navigate('/auth'),
            //             onCancel: () => navigate(-1)
            //         });
            //     });
        }
    }, [dataUser]);

    const [openVoucher, setOpenVoucher] = useState<boolean>(false);


    useEffect(() => {
        if (cart.voucherUsage && cart.voucherUsage.length > 0) {
            cart.voucherUsage.forEach((item: IVoucher) => {
                if (item.minBill && item.minBill > 0 && cart.totalProduct && !isNaN(cart.totalProduct)) {
                    if (item.minBill > cart.totalProduct) {
                        dispatch(removeVoucher({ idUser: dataUser._id, idVoucher: item._id as string })).unwrap()
                            .then(() => {
                                console.log('Đã loại bỏ 1 voucher không hợp lệ')
                                toast.warning('Voucher không hợp lệ')
                            })
                            .catch((error) => {
                                console.log('error', error);
                            })
                    }
                }
            })
        }
    }, [cart.products]);

    return (
        <>
            <div className="xl:w-[60%] w-full">
                <div className="flex justify-between items-center border-b border-b-primary/10 sm:pb-6 pb-2">
                    <p className="text-xl font-medium">Your Cart</p>
                    <p className="text-base">({cart && cart.products.length})</p>
                </div>
                <div className="flex flex-col py-5 gap-y-6">
                    {cart && cart.products && cart.products.length > 0
                        ?
                        cart.products.map((item: IItemCart) => (
                            <div key={item._id} className='pb-6 border-b border-b-primary/10'>
                                <ProductInCart item={item} cart={cart} dataUser={dataUser} />
                            </div>
                        ))
                        :
                        <div className='w-full grid items-center justify-center py-4'>
                            <img src={Empty_Cart} alt="Empty_cart" className='max-w-[150px]' />
                        </div>
                    }
                </div>

                <div className="flex sm:flex-row flex-col-reverse justify-between sm:items-center items-end gap-4 pb-5">
                    <div className="flex gap-x-3 w-full max-w-[783px]">
                        <div
                            onClick={() => setOpenVoucher(!openVoucher)}
                            className='flex border hover:border-black bg-[transparents] hover:bg-black text-black hover:text-white justify-center items-center gap-1 cursor-pointer px-4 py-2 rounded-full'
                        >
                            <Tag size={20} />
                            <p className='sm:text-base text-sm'>Voucher</p>
                        </div>
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

            {/* Kho Voucher  */}
            <VoucherWarehouse
                screenWidth={screenWidth}
                openVoucher={openVoucher}
                setOpenVoucher={setOpenVoucher}
                dataUser={dataUser}
                cart={cart}
            />
        </>
    )
}

export default ShoppingCart