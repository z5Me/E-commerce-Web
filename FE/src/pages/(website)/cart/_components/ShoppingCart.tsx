import Product_Image from '@/assets/product2.svg';
import ProductInCart from '@/components/ProductInCart';
import PriceList from './PriceList';
import useScreenWidth from '@/common/hooks/useScreenWidth';
import { Tag } from 'lucide-react';

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

const ShoppingCart = () => {
    //Theo dõi chiều ngang của web
    const screenWidth = useScreenWidth();

    return (
        <>
            <div className="xl:w-[60%] w-full">
                <div className="flex justify-between items-center border-b border-b-primary/10 sm:pb-6 pb-2">
                    <p className="text-xl font-medium">Your Cart</p>
                    <p className="text-base">(3)</p>
                </div>
                <div className="flex flex-col py-5 gap-y-6">
                    {cart && cart.products && cart.products.map((item: any) => (
                        <div key={item.id} className='pb-6 border-b border-b-primary/10'>
                            <ProductInCart item={item} />
                        </div>
                    ))}
                </div>
                <div className="flex sm:flex-row flex-col-reverse justify-between sm:items-center items-end gap-4 pb-5">
                    <div className="flex gap-x-3 w-full max-w-[783px]">
                        <div className="w-full bg-[#F0F0F0] text-primary/40 rounded-[62px] flex items-center gap-x-3 py-3 px-4">
                            <Tag size={screenWidth >= 640 ? 24 : 20} />
                            <input type="text" className="sm:text-base text-sm outline-0 w-full text-primary" placeholder="Add promo code" defaultValue={'VOUCHER_CODE_2025'} />
                        </div>
                        <button className="font-medium sm:py-3 py-2 sm:px-8 px-6 sm:text-base text-sm bg-primary hover:bg-white border border-primary hover:border-primary/40 text-white hover:text-primary rounded-[62px] cursor-pointer">
                            <p>Apply</p>
                        </button>
                    </div>
                    <p className='sm:text-base text-sm font-semibold underline cursor-pointer text-nowrap'>Clear cart</p>
                </div>
            </div>
            <PriceList />
        </>
    )
}

export default ShoppingCart