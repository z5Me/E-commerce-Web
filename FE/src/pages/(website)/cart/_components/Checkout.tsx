import Product_Image from '@/assets/product2.svg';
import ProductInCart from '@/components/ProductInCart';
import { shallowEqual, useSelector } from 'react-redux';
import DeliveryAddress from '../../../../components/DeliveryAddress';
import React, { useState } from 'react';
import { Check, CircleDollarSign, CreditCard, Pencil } from 'lucide-react';
import useScreenWidth from '@/common/hooks/useScreenWidth';
import PriceList from './PriceList';

const cart = {
    id: 'cartid1',
    products: [
        {
            id: 'd1',
            product: {
                id: 'e1',
                name: 'Gradient Graphic T-shirt'
            },
            variant: {
                id: 'c1',
                price: 200,
                oldPrice: 250,
                discountPercent: 20,
                image: Product_Image,
                values: [
                    {
                        id: 'b1',
                        name: 'Red',
                        slug: 'red',
                        type: 'Color',
                        value: '#FF0000'
                    },
                    {
                        id: 'b3',
                        name: 'Medium',
                        slug: 'medium',
                        type: 'Size',
                        value: 'medium'
                    },
                    {
                        id: 'b5',
                        name: '5kg',
                        slug: '5kg',
                        type: 'Weight',
                        value: '5kg'
                    }
                ]
            },
            quantity: 1
        },
        {
            id: 'd2',
            product: {
                id: 'e2',
                name: 'Polo with Tipping Details'
            },
            variant: {
                id: 'c4',
                price: 350,
                oldPrice: 400,
                discountPercent: 5,
                image: Product_Image,
                values: [
                    {
                        id: 'b2',
                        name: 'Blue',
                        slug: 'blue',
                        type: 'Color',
                        value: '#0000FF'
                    },
                    {
                        id: 'b4',
                        name: 'Large',
                        slug: 'large',
                        type: 'Size',
                        value: 'large'
                    },
                    {
                        id: 'b6',
                        name: '10kg',
                        slug: '10kg',
                        type: 'Weight',
                        value: '10kg'
                    },
                ]
            },
            quantity: 3
        }
    ],
    totalProducts: 400,
    discount: 10,
    total: 390
}

const Checkout = () => {
    //data of user in redux
    const dataUser = useSelector((state: any) => state.user.dataUser, shallowEqual);

    const [payment, setPayment] = useState<string>('');
    const [terms, setTerms] = useState<boolean>(false);

    const screenWidth = useScreenWidth();

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
                        <div className='border-t-2 border-primary overflow-hidden relative z-10 group'>
                            <div className='transition-all duration-300 group-hover:blur-xs'>
                                {dataUser.address.map((item: any, index: number) => (
                                    item.selected &&
                                    <React.Fragment key={index}>
                                        <DeliveryAddress item={item} />
                                    </React.Fragment>
                                ))}
                            </div>
                            <div className='absolute transition-all duration-300 top-[200%] group-hover:top-1/2 left-1/2 -translate-1/2 z-30 bg-primary rounded-md cursor-pointer text-white'>
                                <div className='flex items-center gap-1 py-1 px-2 shadow-xl select-none'>
                                    <Pencil size={16} />
                                    <p>Edit</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='flex flex-col gap-2'>
                        <p className='sm:text-lg text-base'>Review Products</p>
                        <div className='flex flex-col gap-y-6'>
                            {cart && cart.products && cart.products.map((item: any, index: number) => (
                                <div key={index} className='pb-6 border-b border-b-primary/10' >
                                    <ProductInCart checkout={true} item={item} />
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
            <PriceList />
        </>
    )
}

export default Checkout