import { useChangeStatusCart } from "@/common/hooks/useChangeStatusCart";
import type { IAddress } from "@/common/types/address";
import type { ICart } from "@/common/types/cart";
import type { IProduct } from "@/common/types/product";
import { useDialog } from "@/contexts/DialogContext";
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
            // console.log('filterAddress', filterAddress[0])

            const data = {
                userId: dataUser._id,
                address: filterAddress[0],
                products: cart.products.map((item: any) => ({
                    _id: item._id,
                    name: item.name,
                    desc: item.desc,
                    shortDesc: item.shortDesc,
                    productImage: item.productImage,
                    variants: item.variants,
                })),
                payment: payment as "cod" | "momo",
                total: cart.total,
                updateStatus: [{
                    title: 'Chờ xác nhận',
                    desc: 'Chờ xác nhận bên phía người bán',
                    date: new Date(),
                    status: 'pending',
                    orderCode: '',
                    creator: {
                        userId: dataUser._id,
                        name: dataUser.userName,
                        email: dataUser.email,
                        role: dataUser.role
                    }
                }]
            }

            if (data.products.length === 0) {
                toast.warning('Giỏ hàng rỗng');
                showDialog({
                    title: 'Rời khỏi trang?',
                    description: 'Rời khỏi trang và bắt đầu mua sắm nào!',
                    onCancel: () => naviagte('/cart'),
                    onConfirm: () => naviagte('/')
                })
                return;
            }

            dispatch(createOrder(data)).unwrap()
                .then(() => {
                    dispatch(setChangePage(url))
                    naviagte('/cart/order');
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
                        <p className="font-bold">$565</p>
                    </div>
                    <div className="flex justify-between items-center sm:text-base text-sm">
                        <p className="text-primary/60">Discount</p>
                        <p className="font-bold text-danger">-$113</p>
                    </div>
                    <div className="flex justify-between items-center sm:text-base text-sm">
                        <p className="text-primary/60">Delivery Fee</p>
                        <p className="font-bold">$15</p>
                    </div>
                    <div className="flex justify-between items-center sm:text-base text-sm">
                        <p className="text-primary/60">Voucher</p>
                        <p className="font-bold text-danger">-$10</p>
                    </div>
                </div>
                <div className="flex justify-between items-center sm:text-lg text-base">
                    <p className="text-primary font-medium">Total</p>
                    <p className="font-bold">${cart?.total}</p>
                </div>
                <div onClick={() => handleCreateOrder()}>
                    <div className="w-full px-10 flex justify-center items-center bg-[#C8C9CB] hover:bg-primary rounded-full select-none cursor-pointer">
                        <div className="text-white sm:h-[56px] h-[48px] sm:text-lg text-base font-medium flex justify-center items-center gap-x-4">
                            <p>{url === '/cart/checkout' ? 'Checkout' : url === '/cart/order' && 'Order'}</p>
                            <div className="bg-white w-[2px] h-3"></div>
                            <p>$467.00</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PriceList