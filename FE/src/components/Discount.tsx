
const DiscountIcon = (
    { price, oldPrice, discountPercent, className, classNamePrice, classNameOldPrice, classNameDPercent }:
        { price: number, oldPrice?: number, discountPercent?: number, className?: string, classNamePrice?: string, classNameOldPrice?: string, classNameDPercent?: string }
) => {

    return (
        <div className={`flex items-center ${className}`}>
            <p className={`font-bold ${classNamePrice}`}>${price}</p>
            {(oldPrice && oldPrice > 0)
                ?
                <p className={`font-bold text-primary/30 line-through ${classNameOldPrice}`}>${oldPrice}</p>
                :
                ''
            }
            {
                (discountPercent && discountPercent > 0)
                    ?
                    <div>
                        <p className={`text-danger font-medium px-[14px] py-[6px] bg-danger/10 rounded-full ${classNameDPercent}`}>
                            -{discountPercent}%
                        </p>
                    </div>
                    :
                    ''
            }

        </div >
    )
}

export default DiscountIcon