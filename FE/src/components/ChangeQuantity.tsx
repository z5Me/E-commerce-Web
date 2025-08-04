import useScreenWidth from "@/common/hooks/useScreenWidth";
import { Minus, Plus } from "lucide-react";

type Props = {
    sizeMinus?: number,
    sizePlus?: number,
    quantity: number,
    setQuantity?: (value: number) => void,
    maxQuantity?: number,
    onClickMinus?: () => void,
    onClickPlus?: () => void,
}

export const ChangeQuantity = ({ sizeMinus, quantity, setQuantity, maxQuantity, sizePlus, onClickMinus, onClickPlus }: Props) => {
    const screenWidth = useScreenWidth();

    return (
        <div className={`flex sm:gap-0 gap-[18px] justify-between items-center bg-[#F0F0F0] rounded-full relative sm:min-w-[126px] sm:py-3 py-2 sm:px-5 px-4`}>
            <Minus
                size={sizeMinus ?? (screenWidth > 639 ? 16 : 14)}
                onClick={onClickMinus}
                className={`cursor-pointer select-none sm:text-2xl text-xl`}
            />
            <input
                type="number"
                className="hide-spinner font-MJSatoshi font-medium sm:text-base text-sm text-primary text-center border-none outline-none w-fit sm:absolute static sm:top-1/2 sm:left-1/2 sm:-translate-1/2"
                min={1}
                max={maxQuantity ?? 99}
                value={quantity}
                onChange={(e) => {
                    const newValue = Math.max(1, Math.min(maxQuantity ?? 99, Number(e.target.value) || 1));
                    console.log('newValue: ', newValue);
                    setQuantity && setQuantity(newValue);
                }}
            />
            <Plus
                size={sizePlus ?? (screenWidth > 639 ? 16 : 14)}
                onClick={onClickPlus}
                className={`cursor-pointer select-none sm:text-2xl text-xl`}
            />
        </div>
    )
}