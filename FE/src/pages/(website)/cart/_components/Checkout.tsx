import useScreenWidth from '@/common/hooks/useScreenWidth';
import type { IAddress } from '@/common/types/address';
import DeliveryAddress from '@/components/DeliveryAddress';
import ProductInCart from '@/components/ProductInCart';
import { useDialog } from '@/contexts/DialogContext';
import { useAppDispatch } from '@/store/store';
import { getSingleCart } from '@/store/thunks/cartThunk';
import { Check, CircleDollarSign, CreditCard, Pencil, Plus } from 'lucide-react';
import { useEffect, useState } from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import GoogleMap from '../../test/googleMap';
import PriceList from './PriceList';
import type { IItemCart } from '@/common/types/itemCart';

const Checkout = () => {
    const { showDialog } = useDialog();
    const [payment, setPayment] = useState<string>('cod');
    const [terms, setTerms] = useState<boolean>(true);
    const navigate = useNavigate();

    const screenWidth = useScreenWidth();
    const dispatch = useAppDispatch();
    const cart = useSelector((state: any) => state.cart.cartData, shallowEqual);
    const dataUser = useSelector((state: any) => state.user.dataUser, shallowEqual);

    useEffect(() => {
        if (dataUser && dataUser._id) {
            dispatch(getSingleCart({ idUser: dataUser._id }));
        }
    }, [dataUser]);

    const changePage = useSelector((state: any) => state.cart.changePage, shallowEqual);
    useEffect(() => {
        if (changePage !== '/cart/checkout') {
            navigate('/cart');
            return;
        }
        return;
    }, []);

    const [openAddAddress, setOpenAddAddress] = useState<boolean>(false);

    return (
        <>
            <div className='xl:w-[60%] w-full'>
                <div className="flex justify-between items-center border-b border-b-primary/10 sm:pb-6 pb-2">
                    <p className="text-xl font-medium">Shipping</p>
                    <p className="text-base">(3)</p>
                </div>
                <div className='grid gap-4 my-4 min-h-[200px]'>
                    <div className='flex flex-col gap-2 border-b border-b-primary/10 pb-6'>
                        <p className='sm:text-lg text-base after:ml-0.5 after:text-red-500 after:content-["*"]'>Delivery address</p>
                        <div className='overflow-hidden relative z-10 '>
                            <div className='transition-all duration-300'>
                                {dataUser.address.length > 0
                                    ?
                                    dataUser.address.map((item: IAddress, index: number) => (
                                        item.selected &&
                                        <div className='group-hover:blur-[2px] group border-t-2 border-primary' key={index}>
                                            <DeliveryAddress item={item} />
                                            <div className='absolute transition-all duration-300 top-[200%] group-hover:top-1/2 left-1/2 -translate-1/2 z-30 bg-primary rounded-md cursor-pointer text-white'>
                                                <div onClick={() => showDialog({})} className='flex items-center gap-1 py-1 px-2 shadow-xl select-none'>
                                                    <Pencil size={16} />
                                                    <p>Edit</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                    :
                                    <>
                                        <div
                                            onClick={() => setOpenAddAddress(!openAddAddress)}
                                            className='w-full flex justify-center p-2 mb-4 border rounded-sm bg-gray-100 hover:bg-gray-300 cursor-pointer select-none'
                                        >
                                            <div className='flex items-center gap-2'>
                                                <Plus size={16} />
                                                <p>Thêm địa chỉ</p>
                                            </div>
                                        </div>
                                        {openAddAddress && <GoogleMap setOpenAddAddress={setOpenAddAddress} dataUser={dataUser} />}

                                    </>
                                }
                            </div>
                        </div>
                    </div>

                    <div className='flex flex-col gap-2'>
                        <p className='sm:text-lg text-base'>Review Products</p>
                        <div className='flex flex-col gap-y-6'>
                            {cart && cart.products && cart.products.map((item: IItemCart, index: number) => (
                                <div key={index} className='pb-6 border-b border-b-primary/10' >
                                    <ProductInCart checkout={true} item={item} cart={cart} dataUser={dataUser} />
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className='flex flex-col gap-2 border-b border-b-primary/10 pb-6'>
                        <p className='sm:text-lg text-base after:ml-0.5 after:text-red-500 after:content-["*"]'>Payment Method</p>
                        <div className='flex justify-between sm:gap-6 gap-3 *:cursor-pointer'>
                            <div onClick={() => setPayment('cod')} className={`flex px-4 py-2 items-center gap-2 border rounded-md ${payment === 'cod' && 'border-primary bg-gray-100'} w-full`}>
                                <div>
                                    <div className={`sm:p-[3px] p-[2px] ${payment === 'cod' ? 'bg-primary' : 'bg-white'} outline-0 outline-primary outline-offset-2 rounded-full border border-primary/50`}>
                                        <div className='sm:p-[4px] p-[3px] rounded-full bg-white'></div>
                                    </div>
                                </div>
                                <div className='flex items-center gap-1'>
                                    <CircleDollarSign size={screenWidth > 639 ? 20 : 16} />
                                    <p className='sm:text-base text-sm font-medium'>COD</p>
                                </div>
                            </div>
                            <div onClick={() => setPayment('momo')} className={`flex px-4 py-2 items-center gap-2 border rounded-md ${payment === 'momo' && 'border-primary bg-gray-100'} w-full`}>
                                <div>
                                    <div className={`sm:p-[3px] p-[2px] ${payment === 'momo' ? 'bg-primary' : 'bg-white'} outline-0 outline-primary outline-offset-2 rounded-full border border-primary/50`}>
                                        <div className='sm:p-[4px] p-[3px] rounded-full bg-white'></div>
                                    </div>
                                </div>
                                <div className='flex items-center gap-1'>
                                    <CreditCard size={screenWidth > 639 ? 20 : 16} />
                                    <p className='sm:text-base text-sm font-normal'>MOMO</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='flex flex-col gap-2 '>
                        <div onClick={() => setTerms(!terms)} className='flex py-2 items-start gap-[6px] rounded-[4px] w-fit select-none cursor-pointer'>
                            <div className='sm:mt-[2px] mt-[1px]'>
                                <div className={`${terms ? 'bg-primary' : 'bg-white'}  outline-0 outline-primary outline-offset-2 rounded-[4px] border border-primary/50 text-white`}>
                                    <Check size={screenWidth > 639 ? 18 : 14} strokeWidth={'3px'} />
                                </div>
                            </div>
                            <p className='font-normal sm:text-base text-sm after:ml-0.5 after:text-red-500 after:content-["*"]'>I confirm that my address is 100% correct and WILL NOT hold SHOP.CO liable if this shipment is sent to an incorrect address.</p>
                        </div>
                    </div>

                </div>
            </div>
            <PriceList cart={cart} terms={terms} payment={payment} />
        </>
    )
}

export default Checkout