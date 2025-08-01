import { useChangeStatusCart } from "@/common/hooks/useChangeStatusCart";
import { Link } from "react-router";
import { toast } from "sonner";

const PriceList = ({ cart, terms }: { cart: any, terms?: boolean }) => {
    const { url } = useChangeStatusCart();
    console.log('url: ', url)
    // console.log('cart', cart)

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
                <Link to={(url === '/cart/order') ? terms && url : url} onClick={() => (url === '/cart/order') && (!terms && toast.warning('Vui lòng tích vào ô điều khoản để tiếp tục'))}>
                    <div className="w-full px-10 flex justify-center items-center bg-[#C8C9CB] hover:bg-primary rounded-full select-none cursor-pointer">
                        <div className="text-white sm:h-[56px] h-[48px] sm:text-lg text-base font-medium flex justify-center items-center gap-x-4">
                            <p>Checkout</p>
                            <div className="bg-white w-[2px] h-3"></div>
                            <p>$467.00</p>
                        </div>
                    </div>
                </Link>
            </div>
        </div>
    )
}

export default PriceList