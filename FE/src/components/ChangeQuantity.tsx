import { Minus, Plus } from 'lucide-react';
import { useState } from 'react';

const ChangeQuantity = ({ className = 'sm:min-w-[170px] sm:py-4 py-3 sm:px-5 px-4', sizeMinus, sizePlus }: { className?: string, sizeMinus?: number, sizePlus?: number }) => {
    const [quantity, setQuantity] = useState<number>(1);

    //Xử lý số lượng sản phẩm muốn mua
    const onChangeValue = (value: string) => {
        const valueNumber = parseInt(value);
        if (value !== "") {
            if (valueNumber < 100) {
                setQuantity(valueNumber);
                return;
            }
        }
    }

    return (
        <div className={`flex sm:gap-0 gap-[18px] justify-between items-center bg-[#F0F0F0] rounded-full relative ${className}`}>
            <Minus
                size={sizeMinus}
                onClick={() => (quantity > 1) && setQuantity((prev) => prev - 1)}
                className={`cursor-pointer select-none sm:text-2xl text-xl`}
            />
            <input
                type="number"
                className="hide-spinner font-Satoshi font-medium sm:text-base text-sm text-primary text-center border-none outline-none w-fit sm:absolute static sm:top-1/2 sm:left-1/2 sm:-translate-1/2"
                min={1}
                max={99}
                value={quantity}
                onChange={(e) => onChangeValue(e.target.value)}
            />
            <Plus
                size={sizePlus}
                onClick={() => (quantity < 99 && setQuantity((prev) => prev + 1))}
                className={`cursor-pointer select-none sm:text-2xl text-xl`}
            />
        </div>
    )
}

export default ChangeQuantity