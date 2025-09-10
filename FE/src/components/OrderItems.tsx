import type { IItemCart } from '@/common/types/itemCart'
import type { IOrder } from '@/common/types/order'
import { VietNamPrice } from '@/lib/utils'

const OrderItems = ({ data }: { data: IOrder }) => {
    return (
        <>
            <div className="grid gap-4">
                {data && data.products.length > 0
                    ?
                    <>
                        {data.products.map((item: IItemCart) => {
                            // console.log('item: ', item)
                            return (
                                <div key={item._id} className="flex justify-between items-start gap-4 sm:text-base text-sm">
                                    <div className="aspect-square sm:max-w-[120px] max-w-[100px] w-full rounded-md border overflow-hidden">
                                        <img className="object-contain w-full h-full aspect-square" src={item.variant.image} alt={item.product.name} />
                                    </div>
                                    <div className="flex-1 h-full">
                                        <div className="flex flex-col gap-2 justify-between h-full">
                                            <div className="flex flex-col">
                                                <p>Categories</p>
                                                <p className="font-bold">{item.product.name}</p>
                                            </div>
                                            <div className="flex flex-wrap gap-2">
                                                {item.variant.values.map((item) => (
                                                    <p key={item._id} className="flex gap-1 items-center justify-center">
                                                        {item.name}
                                                    </p>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex gap-4 flex-wrap items-center h-fit justify-end">
                                        <div>
                                            <div className="border rounded-md py-1 px-4 sm:text-sm text-xs font-bold">{item.quantity} x {VietNamPrice(item.variant.price)}<span className="underline">đ</span></div>
                                        </div>
                                        <div>
                                            <p>{VietNamPrice(item.quantity * item.variant.price)}<span className="underline">đ</span></p>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </>
                    :
                    <div></div>
                }
            </div>
            <div className="flex justify-between items-center font-bold sm:text-base text-sm">
                <p>Payment method</p>
                <p className="uppercase">{data.payment}</p>
            </div>
            <div className="flex flex-col gap-y-4 sm:text-base text-sm">
                <div className="flex justify-between">
                    <p>Total product</p>
                    <p>{VietNamPrice(data.totalProduct)}<span className="underline">đ</span></p>
                </div>
                <div className="flex justify-between">
                    <p>Discount product</p>
                    <p className="text-danger font-bold">-{VietNamPrice(data.discountProduct)}<span className="underline">đ</span></p>
                </div>
                <div className="flex justify-between">
                    <p>Discount voucher</p>
                    <p className="text-danger font-bold">-{VietNamPrice(data.discountVoucher)}<span className="underline">đ</span></p>
                </div>
                <div className="flex justify-between">
                    <p>Delivery Fee</p>
                    <p>{VietNamPrice(data.shippingFee)}<span className="underline">đ</span></p>
                </div>
            </div>
            <div className="flex justify-between items-center font-bold sm:text-xl text-base">
                <p>Total</p>
                <p>{VietNamPrice(data.total)}<span className="underline">đ</span></p>
            </div>
        </>
    )
}

export default OrderItems
