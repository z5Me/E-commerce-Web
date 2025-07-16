import Product_Image from '@/assets/product2.svg';
import { Check } from 'lucide-react';

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

const OrderComplete = () => {
    return (
        <div className='flex flex-col w-full items-center gap-4'>
            <div className='flex'>
                <div className='bg-primary text-white p-2 rounded-full'>
                    <Check />
                </div>
            </div>
            <div className='flex flex-col items-center gap-1'>
                <p className='text-2xl font-bold'>Your order is completed!</p>
                <span className='text-sm text-primary/50'>Thank you. Your Order has been received.</span>
            </div>
            {/* Tiếp tục phần này */}
            <div className='flex items-center'>
                <div className='border rounded-lg'>

                </div>
            </div>
        </div>
    )
}

export default OrderComplete