import { Tag } from 'lucide-react'

const PriceList = ({ screenWidth }: { screenWidth: number }) => {
    return (
        <div className="xl:w-[40%] w-full">
            <div className="w-full flex flex-col gap-y-5 p-6 border border-primary/10 rounded-2xl">
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
                <div className="flex flex-col gap-y-4 pb-5 border-b border-b-primary/10">
                    <div className="flex gap-x-3">
                        <div className="w-full bg-[#F0F0F0] text-primary/40 rounded-[62px] flex items-center gap-x-3 py-3 px-4">
                            <Tag size={screenWidth >= 640 ? 24 : 20} />
                            <input type="text" className="sm:text-base text-sm outline-0 w-full text-primary" placeholder="Add promo code" defaultValue={'VOUCHER_CODE_2025'} />
                        </div>
                        <button className="font-medium sm:py-3 py-2 sm:px-8 px-6 sm:text-base text-sm bg-primary hover:bg-white border border-primary hover:border-primary/40 text-white hover:text-primary rounded-[62px] cursor-pointer">
                            <p>Apply</p>
                        </button>
                    </div>
                </div>
                <div className="flex justify-between items-center sm:text-lg text-base">
                    <p className="text-primary font-medium">Total</p>
                    <p className="font-bold">$467</p>
                </div>
                <div className="w-full px-10 flex justify-center items-center bg-[#C8C9CB] hover:bg-primary rounded-full select-none cursor-pointer">
                    <div className="text-white sm:h-[56px] h-[48px] sm:text-lg text-base font-medium flex justify-center items-center gap-x-4">
                        <p>Checkout</p>
                        <div className="bg-white w-[2px] h-3"></div>
                        <p>$467.00</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PriceList