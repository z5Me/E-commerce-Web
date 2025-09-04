import { VietNamPrice } from "@/lib/utils"

const DiscountIcon = (
    { price, oldPrice, discountPrice, className, classNamePrice, classNameOldPrice, classNameDPercent }:
        { price: number, oldPrice?: number, discountPrice?: number, className?: string, classNamePrice?: string, classNameOldPrice?: string, classNameDPercent?: string }
) => {

    return (
        <div className={`flex items-center ${className}`}>
            <p className={`font-bold ${classNamePrice}`}>{(VietNamPrice(price))}<span className="underline">đ</span></p>
            {(oldPrice && oldPrice > 0 && price < oldPrice)
                ?
                <p className={`font-bold text-primary/30 line-through ${classNameOldPrice}`}>{VietNamPrice(oldPrice)}<span className="underline">đ</span></p>
                :
                ''
            }
            {
                (discountPrice && discountPrice > 0)
                    ?
                    <div>
                        <p className={`text-danger font-bold px-[14px] py-[6px] bg-danger/10 rounded-full ${classNameDPercent}`}>
                            -{((discountPrice / (price + discountPrice)) * 100).toString().slice(0, 4)}%
                        </p>
                    </div>
                    :
                    ''
            }

        </div >
    )
}

export default DiscountIcon