import type { ICart } from '@/common/types/cart';
import type { IUser } from '@/common/types/user';
import type { IVoucher } from '@/common/types/voucher';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { formatPriceVietNam, formatVietnamTime } from '@/lib/utils';
import { useAppDispatch } from '@/store/store';
import { addVoucher, removeVoucher } from '@/store/thunks/cartThunk';
import { Check, Tag, Ticket } from 'lucide-react';
import React from 'react';
import { useForm } from 'react-hook-form';
import { shallowEqual, useSelector } from 'react-redux';
import { toast } from 'sonner';

type Props = {
    screenWidth: number,
    openVoucher: boolean,
    setOpenVoucher: (value: boolean) => void,
    dataUser: IUser,
    cart: ICart
}

const VoucherWarehouse = React.memo(function VoucherWarehouse({ screenWidth, openVoucher, setOpenVoucher, dataUser, cart }: Props) {
    //Dữ liệu tất cả voucher của shop
    const dataVoucher = useSelector((state: any) => state.voucher.dataVoucher, shallowEqual);

    const dispatch = useAppDispatch();
    const { register, handleSubmit } = useForm();

    const onSubmit = (data: any) => {
        if (data.voucherCode === '') return toast.warning('Không hợp lệ');
        dispatch(addVoucher({ idUser: dataUser._id as string, voucherCode: data.voucherCode })).unwrap()
            .then(() => {
                toast.success('Success');
            })
            .catch((error) => {
                console.log('Lỗi addVoucher nhập tay', error);
                toast.error(error);
            })
    }

    const handleChooseVoucher = (voucher: IVoucher) => {
        dispatch(addVoucher({ idUser: dataUser._id as string, idVoucher: voucher._id as string })).unwrap()
            .then(() => {
                toast.success('Success');
            })
            .catch((error) => {
                console.log('error handleChooseVoucher', error);
                return toast.error(error);
            })
    }

    //Test chức năng bỏ voucher ra khỏi cart
    const handleRemoveVoucher = (idVoucher: string) => {
        dispatch(removeVoucher({ idUser: dataUser._id as string, idVoucher })).unwrap()
            .then(() => {
                toast.success('Success');
            })
            .catch((error) => {
                console.log('error handleRemoveVoucher', error);
                return toast.error(error);
            })
    }

    //Hàm sắp xếp voucher
    function sortVouchers(dataVoucher: IVoucher[], cart: ICart) {
        // Thứ tự ưu tiên lên đầu danh sách -> voucher được chọn - trạng thái kích hoạt - giá đơn tối thiểu (tùy voucher) - ngày kết thúc
        return [...dataVoucher].sort((a: IVoucher, b: IVoucher) => {
            const isChoosenA = cart.voucherUsage[0]?._id === a._id; //check voucher được chọn
            const isChoosenB = cart.voucherUsage[0]?._id === b._id;
            if (isChoosenA !== isChoosenB) return isChoosenA ? -1 : 1;

            const isActiveA = a.isActive; //Check trạng thái kích hoạt
            const isActiveB = b.isActive;
            if (isActiveA !== isActiveB) return isActiveA ? -1 : 1;

            const isValidA = (cart.totalProduct - cart.discountProduct) >= a.minBill; //Check tổng tiền hàng hợp lệ để dùng voucher
            const isValidB = (cart.totalProduct - cart.discountProduct) >= b.minBill;
            if (isValidA !== isValidB) return isValidA ? -1 : 1;

            const isEndA = new Date(a.endDate).getTime(); //check ngày kết thúc
            const isEndB = new Date(b.endDate).getTime();
            const presentDate = new Date().getTime();
            if (isEndA < presentDate && isEndB >= presentDate) return 1; //A hết hạn -> A xuống cuối
            if (isEndB < presentDate && isEndA >= presentDate) return -1;

            if (isEndA !== isEndB) return isEndA - isEndB;

            return 0;
        })
    }

    return (
        <Dialog open={openVoucher} onOpenChange={setOpenVoucher}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Kho Voucher</DialogTitle>
                    <DialogDescription>
                        Chọn Voucher hoặc nhập mã Voucher
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="grid gap-4 mt-4">
                        <div className="grid gap-3">
                            <Label htmlFor="voucherCode">Nhập mã Voucher</Label>
                            <div className="w-full bg-[#F0F0F0] text-primary/40 rounded-[62px] flex items-center gap-x-3 py-3 px-4">
                                <Tag size={screenWidth >= 640 ? 24 : 20} />
                                <input
                                    type="text"
                                    className="sm:text-base text-sm outline-0 w-full text-primary"
                                    placeholder="Add promo code"
                                    {...register('voucherCode')}
                                />
                            </div>
                            <button type='submit' className="font-medium sm:py-3 py-2 sm:px-8 px-6 sm:text-base text-sm bg-primary hover:bg-white border border-primary hover:border-primary/40 text-white hover:text-primary rounded-[62px] cursor-pointer">
                                <p>Apply</p>
                            </button>
                        </div>
                        <div className="grid gap-3">
                            <Label htmlFor="username-2">Chọn Voucher</Label>
                            <div className='max-h-[500px] overflow-auto grid gap-y-2 select-none'>
                                {sortVouchers(dataVoucher, cart).map((voucher: IVoucher) => {
                                    const isChoosen = cart.voucherUsage[0]?._id === voucher._id; //check voucher được chọn
                                    const isNotReady = new Date() < new Date(voucher.startDate); //check ngày bắt đầu
                                    const isEnd = new Date() > new Date(voucher.endDate); //check ngày kết thúc
                                    const isActive = !voucher.isActive; //Check trạng thái kích hoạt
                                    const isValid = (cart.totalProduct - cart.discountProduct) >= voucher.minBill; //Check tổng tiền hàng hợp lệ để dùng voucher
                                    if (isEnd) return null
                                    return (
                                        <div
                                            key={voucher._id}
                                            className={`flex border ${isChoosen ? 'border-primary' : 'cursor-pointer'} gap-x-2 ${(isNotReady || isEnd || isActive || !isValid) === true && 'opacity-50'}`}
                                            onClick={() => !isChoosen ? handleChooseVoucher(voucher) : handleRemoveVoucher(voucher._id as string)}
                                        >
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
                                                <p className='text-base font-bold'>Giảm {voucher.typeOfDiscount === 'fixed' ? formatPriceVietNam(voucher.discount) : `${voucher.discount}%`}</p>
                                                {(voucher.typeOfDiscount === 'percent' && voucher.maxDiscount > 0) && <p className='text-sm font-medium'>Giảm tối đa {formatPriceVietNam(voucher.maxDiscount)}</p>}
                                                <p className='text-xs'>Đơn tối thiểu {formatPriceVietNam(voucher.minBill)}</p>
                                                {/* <p className='text-sm flex'>
                                                        {voucher.categories.map((category: any) => <span key={category._id}>{category.name}</span>)}
                                                    </p> */}
                                                <div className='flex flex-row gap-x-1 items-center'>
                                                    <p className='text-xs'>Còn lại: {voucher.quantity}</p>
                                                    <p>-</p>
                                                    <p className='text-xs truncate text-danger'>HSD: {formatVietnamTime(voucher.endDate).slice(6)}</p>
                                                </div>
                                            </div>
                                            <div className='flex items-center justify-center text-center pr-2'>
                                                <div className={`p-1 rounded-full border border-primary text-white ${isChoosen ? 'bg-primary' : 'bg-white'}`}>
                                                    <Check size={12} strokeWidth={4} />
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                </form>
            </DialogContent>
        </Dialog >
    )
})

export default VoucherWarehouse
