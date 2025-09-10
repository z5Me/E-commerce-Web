import { useChangeStatusCart } from "@/common/hooks/useChangeStatusCart";
import type { IAddress } from "@/common/types/address";
import type { ICart } from "@/common/types/cart";
import { useDialog } from "@/contexts/DialogContext";
import { VietNamPrice } from "@/lib/utils";
import { setChangePage } from "@/store/slices/cartSlice";
import { useAppDispatch } from "@/store/store";
import { createOrder } from "@/store/thunks/orderThunk";
import { shallowEqual, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { toast } from "sonner";

const PriceList = ({ cart, terms, payment }: { cart: ICart, terms?: boolean, payment?: string }) => {
    const dispatch = useAppDispatch();
    const { url } = useChangeStatusCart();
    const dataUser = useSelector((state: any) => state.user.dataUser, shallowEqual);
    const orderError = useSelector((state: any) => state.order.error);
    const { showDialog } = useDialog();
    const naviagte = useNavigate();

    const handleCreateOrder = () => {
        if (url === '/cart/checkout') {
            if (dataUser && dataUser.phone === '') {
                showDialog({
                    title: 'Số điện thoại chưa được xác thực',
                    description: 'Bạn cần xác minh số điện thoại để tiếp tục mua hàng!',
                    onConfirm() {
                        naviagte('/user/profile')
                    },
                })
                return
            }
            if (cart && cart.products && cart.products.length === 0) return toast.warning('Giỏ hàng rỗng :(')
            dispatch(setChangePage(url));
            naviagte(url);
            return;
        }

        if (url === '/cart/order') {
            if (!terms) {
                toast.warning('Vui lòng tích vào ô điều khoản để tiếp tục');
                return
            }
            const filterAddress = dataUser.address.filter((item: IAddress) => item.selected === true);
            if (!filterAddress[0]) return toast.warning('Vui lòng cung cấp thông tin địa chỉ');
            // console.log(cart.products)
            const data = {
                userId: dataUser._id,
                address: filterAddress[0],
                products: cart.products,
                payment: payment as "cod" | "momo",
                totalProduct: cart.totalProduct,
                discountProduct: cart.discountProduct,
                discountVoucher: cart.discountVoucher,
                shippingFee: cart.shippingFee,
                total: cart.total,
                updateStatus: [{
                    title: 'Chờ xác nhận',
                    desc: 'Chờ xác nhận bên phía người bán',
                    date: new Date(),
                    status: "pending" as "pending",
                    orderCode: '',
                    creator: {
                        userId: dataUser._id,
                        name: dataUser.userName,
                        email: dataUser.email,
                        role: dataUser.role
                    }
                }]
            }
            // console.log('data', data);
            dispatch(createOrder(data)).unwrap()
                .then((data) => {
                    dispatch(setChangePage(url))
                    naviagte('/cart/order', { state: { orderCode: data.orderCode } });
                })
                .catch(() => {
                    console.log('orderError: ', orderError)
                    toast.error(`Lỗi tạo đơn hàng, vui lòng thử lại sau`)
                });
        }
        return;
    }

    return (
        <div className="xl:w-[40%] w-full">
            <div className="w-full flex flex-col gap-y-5 p-6 border border-primary/10 rounded-2xl">
                <div className="flex flex-col gap-y-4 border-b pb-5 border-b-primary/10">
                    <p className='sm:text-lg text-base font-semibold'>Order Summary</p>
                </div>
                <div className="flex flex-col gap-y-4 border-b pb-5 border-b-primary/10">
                    <div className="flex justify-between items-center sm:text-base text-sm">
                        <p className="text-primary/60">Subtotal</p>
                        <p className="font-bold">{VietNamPrice(cart.totalProduct)}<span className="underline">đ</span></p>
                    </div>
                    <div className="flex justify-between items-center sm:text-base text-sm">
                        <p className="text-primary/60">Discount</p>
                        <p className="font-bold text-danger">-{VietNamPrice(cart.discountProduct)}<span className="underline">đ</span></p>
                    </div>
                    <div className="flex justify-between items-center sm:text-base text-sm">
                        <p className="text-primary/60">Voucher</p>
                        <p className="font-bold text-danger">-{VietNamPrice(cart.discountVoucher)}<span className="underline">đ</span></p>
                    </div>
                    {url === '/cart/order' &&
                        <div className="flex justify-between items-center sm:text-base text-sm">
                            <p className="text-primary/60">Delivery Fee</p>
                            <p className="font-bold">{VietNamPrice(cart.shippingFee)}<span className="underline">đ</span></p>
                        </div>
                    }
                </div>
                <div className="flex justify-between items-center sm:text-lg text-base">
                    <p className="text-primary font-medium">Total</p>
                    <p className="font-bold">{url !== '/cart/order' ? VietNamPrice(cart.total - cart.shippingFee) : VietNamPrice(cart.total)}<span className="underline">đ</span></p>
                </div>
                <div onClick={() => handleCreateOrder()}>
                    <div className="w-full px-10 flex justify-center items-center bg-[#C8C9CB] hover:bg-primary rounded-full select-none cursor-pointer">
                        <div className="text-white sm:h-[56px] h-[48px] sm:text-lg text-base font-medium flex justify-center items-center gap-x-4">
                            <p>{url === '/cart/checkout' ? 'Checkout' : url === '/cart/order' && 'Order'}</p>
                            <div className="bg-white w-[2px] h-3"></div>
                            <p>{url !== '/cart/order' ? VietNamPrice(cart.total - cart.shippingFee) : VietNamPrice(cart.total)}<span className="underline">đ</span></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PriceList