import { Check, PackageCheck, ShoppingBasket, Wallet } from 'lucide-react'
import { useEffect, useRef, useState } from 'react';

const ShoppingStatus = ({ screenWidth }: any) => {
    //Sau này thay bằng theo dõi url
    const [changeStatus, setChangeStatus] = useState<number>(1);

    const pCartRef = useRef<HTMLParagraphElement>(null);
    const pCheckoutRef = useRef<HTMLParagraphElement>(null);
    const pOrderRef = useRef<HTMLParagraphElement>(null);

    //animation khi status (chuyển trang) thay đổi
    useEffect(() => {
        if (screenWidth < 768) {
            if (changeStatus > 1) {
                pCartRef.current?.classList.remove('w-[93px]');
                pCartRef.current?.classList.add('w-0');
                setTimeout(() => {
                    pCartRef.current?.classList.remove('block');
                    pCartRef.current?.classList.add('hidden');
                }, 200);
            } else {
                pCartRef.current?.classList.remove('hidden');
                setTimeout(() => {
                    pCartRef.current?.classList.add('w-[93px]');
                    pCartRef.current?.classList.remove('w-0');
                }, 1);
            }

            if (changeStatus === 2) {
                pCheckoutRef.current?.classList.remove('hidden');
                setTimeout(() => {
                    pCheckoutRef.current?.classList.remove('w-0');
                    pCheckoutRef.current?.classList.add('w-[61px]');
                }, 1)
            } else {
                pCheckoutRef.current?.classList.remove('w-[61px]');
                pCheckoutRef.current?.classList.add('w-0');
                setTimeout(() => {
                    pCheckoutRef.current?.classList.add('hidden');
                }, 200);
            }

            if (changeStatus === 3) {
                pOrderRef.current?.classList.remove('hidden');
                setTimeout(() => {
                    pOrderRef.current?.classList.add('w-[103px]');
                    pOrderRef.current?.classList.remove('w-0');
                }, 1)
            } else {
                pOrderRef.current?.classList.remove('w-[103px]');
                pOrderRef.current?.classList.add('w-0');
                setTimeout(() => {
                    pOrderRef.current?.classList.add('hidden');
                }, 200)
            }
        }
        else {
            pCartRef.current?.classList.remove('hidden');
            pCheckoutRef.current?.classList.remove('hidden');
            pOrderRef.current?.classList.remove('hidden');
        }

    }, [changeStatus, screenWidth]);

    return (
        <div className="w-full py-7 bg-[#F4F4F4] flex justify-center items-center font-Satoshi">
            <div className="max-w-[1920px] w-full md:p-0 px-4 flex items-center justify-center">
                <div className="flex gap-x-4 items-center sm:w-fit w-full">
                    <div className="flex gap-x-2 items-center">
                        <div className={`p-2 ${changeStatus === 1 ? 'bg-primary text-white' : ' bg-primary/10 text-black'} rounded-full transition-all duration-200`}>
                            {changeStatus === 1
                                ?
                                <ShoppingBasket size={screenWidth >= 640 ? 16 : 14} />
                                :
                                <Check size={screenWidth >= 640 ? 16 : 14} />
                            }
                        </div>
                        <p ref={pCartRef} className={`text-primary transition-all duration-300 md:text-base text-sm font-medium text-nowrap md:w-auto w-[93px] overflow-hidden`}>Shopping Cart</p>
                    </div>
                    <div className="h-[1px] lg:w-[105px] sm:w-[50px] w-full bg-[#C3D2CC] relative">
                        <div className={`transition-all duration-300 h-[2px] ${changeStatus === 1 ? 'w-0' : 'w-full'} bg-primary absolute inset-0`}></div>
                    </div>
                    <div className="flex gap-x-2 items-center">
                        <div className={`p-2 ${changeStatus === 2 ? 'bg-primary text-white' : changeStatus >= 3 ? 'bg-primary/10 text-primary' : 'bg-white text-primary'} rounded-full transition-all duration-300`}>
                            {changeStatus >= 3
                                ?
                                <Check size={screenWidth >= 640 ? 16 : 14} />
                                :
                                <Wallet size={screenWidth >= 640 ? 16 : 14} />
                            }

                        </div>
                        <p ref={pCheckoutRef} className={`text-primary transition-all duration-300 md:text-base text-sm font-medium text-nowrap md:w-auto w-[61px] overflow-hidden`}>Checkout</p>
                    </div>
                    <div className="h-[1px] lg:w-[105px] sm:w-[50px] w-full bg-[#C3D2CC] relative">
                        <div className={`transition-all duration-300 h-[2px] ${changeStatus >= 3 ? 'w-full' : 'w-0'} bg-primary absolute inset-0`}></div>
                    </div>
                    <div className="flex gap-x-2 items-center">
                        <div className={`p-2 ${changeStatus >= 4 ? 'bg-primary/10 text-primary' : 'bg-white text-primary'} rounded-full transition-all duration-300`}>
                            {changeStatus >= 4
                                ?
                                <Check size={screenWidth >= 640 ? 16 : 14} />
                                :
                                <PackageCheck size={screenWidth >= 640 ? 16 : 14} />
                            }
                        </div>
                        <p ref={pOrderRef} className={`text-primary transition-all duration-300 md:text-base text-sm font-medium text-nowrap md:block hidden md:w-auto w-[103px] overflow-hidden`}>Order Complete</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ShoppingStatus