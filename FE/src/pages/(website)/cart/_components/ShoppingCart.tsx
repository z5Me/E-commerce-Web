import useScreenWidth from '@/common/hooks/useScreenWidth';
import type { IItemCart } from '@/common/types/itemCart';
import ProductInCart from '@/components/ProductInCart';
import { useDialog } from '@/contexts/DialogContext';
import { useAppDispatch } from '@/store/store';
import { clearCart, getSingleCart } from '@/store/thunks/cartThunk';
import { reSignIn } from '@/store/thunks/userThunk';
import { Tag, Ticket } from 'lucide-react';
import { useEffect, useState } from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';
import PriceList from './PriceList';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { getAllVoucher } from '@/store/thunks/voucherThunk';
import type { IVoucher } from '@/common/types/voucher';
import { formatVietnamTime } from '@/lib/utils';

const ShoppingCart = () => {
    //Theo dõi chiều ngang của web
    const screenWidth = useScreenWidth();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    //Dữ liệu giỏ hàng của người dùng
    const cart = useSelector((state: any) => state.cart.cartData, shallowEqual);
    //Dữ liệu của người dùng
    const dataUser = useSelector((state: any) => state.user.dataUser, shallowEqual);
    //Dữ liệu tất cả voucher của shop
    const dataVoucher = useSelector((state: any) => state.voucher.dataVoucher, shallowEqual);

    useEffect(() => {
        dispatch(getAllVoucher({ filterDelete: 'true', filterActive: 'true' }))
    }, []);

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

    const [openVoucher, setOpenVoucher] = useState<boolean>(false);

    return (
        <>
            <div className="xl:w-[60%] w-full">
                <div className="flex justify-between items-center border-b border-b-primary/10 sm:pb-6 pb-2">
                    <p className="text-xl font-medium">Your Cart</p>
                    <p className="text-base">({cart && cart.products.length})</p>
                </div>
                <div className="flex flex-col py-5 gap-y-6">
                    {cart && cart.products && cart.products.map((item: IItemCart) => (
                        <div key={item._id} className='pb-6 border-b border-b-primary/10'>
                            <ProductInCart item={item} cart={cart} dataUser={dataUser} />
                        </div>
                    ))}
                </div>

                <div className="flex sm:flex-row flex-col-reverse justify-between sm:items-center items-end gap-4 pb-5">
                    <div className="flex gap-x-3 w-full max-w-[783px]">
                        {/* 
                            <div className="w-full bg-[#F0F0F0] text-primary/40 rounded-[62px] flex items-center gap-x-3 py-3 px-4">
                                <Tag size={screenWidth >= 640 ? 24 : 20} />
                                <input type="text" className="sm:text-base text-sm outline-0 w-full text-primary" placeholder="Add promo code" defaultValue={'VOUCHER_CODE_2025'} />
                            </div>
                            <button className="font-medium sm:py-3 py-2 sm:px-8 px-6 sm:text-base text-sm bg-primary hover:bg-white border border-primary hover:border-primary/40 text-white hover:text-primary rounded-[62px] cursor-pointer">
                                <p>Apply</p>
                            </button> 
                        */}
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
            <Dialog open={openVoucher} onOpenChange={setOpenVoucher}>
                <form>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>Kho Voucher</DialogTitle>
                            <DialogDescription>
                                Chọn Voucher hoặc nhập mã Voucher
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 mt-4">
                            <div className="grid gap-3">
                                <Label htmlFor="username-1">Nhập mã Voucher</Label>
                                <div className="w-full bg-[#F0F0F0] text-primary/40 rounded-[62px] flex items-center gap-x-3 py-3 px-4">
                                    <Tag size={screenWidth >= 640 ? 24 : 20} />
                                    <input type="text" className="sm:text-base text-sm outline-0 w-full text-primary" placeholder="Add promo code" />
                                </div>
                                <button className="font-medium sm:py-3 py-2 sm:px-8 px-6 sm:text-base text-sm bg-primary hover:bg-white border border-primary hover:border-primary/40 text-white hover:text-primary rounded-[62px] cursor-pointer">
                                    <p>Apply</p>
                                </button>
                            </div>
                            <div className="grid gap-3">
                                <Label htmlFor="username-2">Chọn Voucher</Label>
                                <div className='max-h-[500px] overflow-auto grid gap-y-2'>
                                    {dataVoucher.map((voucher: IVoucher) => (
                                        <div key={voucher._id} className='flex border gap-x-2'>
                                            {voucher.image
                                                ?
                                                <img src={voucher.image} alt="voucher image" className='aspect-3/2 max-w-[90px]' />
                                                :
                                                <div className='min-w-[90px] aspect-3/2 flex flex-col items-center justify-center bg-primary text-white'>
                                                    <Ticket />
                                                    <p className='text-xs'>{voucher.voucherCode}</p>
                                                </div>
                                            }
                                            <div className='flex flex-wrap gap-x-1 items-center'>
                                                <p className='bg-primary text-white text-xs px-1 py-0.5 rounded-sm'>Số lượng có hạn</p>
                                                <p className='text-base font-bold'>Giảm {voucher.discount}{voucher.typeOfDiscount === 'fixed' ? 'k' : '%'}</p>
                                                <p className='text-sm font-medium'>Giảm tối đa {voucher.maxDiscount}k</p>
                                                <p className='text-xs'>Đơn tối thiểu {voucher.minBill}k</p>
                                                {/* <p className='text-sm flex'>
                                                    {voucher.categories.map((category: any) => <span key={category._id}>{category.name}</span>)}
                                                </p> */}
                                                <div className='flex flex-row gap-x-1 items-center'>
                                                    <p className='text-xs'>Còn lại: {voucher.quantity}</p>
                                                    <p>-</p>
                                                    <p className='text-xs truncate text-danger'>HSD: {formatVietnamTime(voucher.endDate).slice(6)}</p>
                                                </div>
                                            </div>
                                            <div className='flex items-center justify-center text-center'>
                                                <p className='text-sm cursor-pointer text-primary hover:text-white bg-transparent hover:bg-primary border border-primary px-3 py-1'>Dùng ngay</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        {/* <DialogFooter>
                            <DialogClose asChild>
                                <Button variant="outline">Cancel</Button>
                            </DialogClose>
                            <Button type="submit">Save changes</Button>
                        </DialogFooter> */}
                    </DialogContent>
                </form>
            </Dialog>
        </>
    )
}

export default ShoppingCart