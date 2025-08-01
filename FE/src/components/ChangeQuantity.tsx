import { useAppDispatch } from '@/store/store';
import { updateQuantity } from '@/store/thunks/cartThunk';
import { Minus, Plus } from 'lucide-react';
import { useCallback, useState } from 'react';
import { toast } from 'sonner';

type Props = {
    className?: string,
    sizeMinus?: number,
    sizePlus?: number,
    defaultQuantity: number,
    idUser: string,
    idProduct: string,
    idVariant: string,
    maxQuantity: number
}

const ChangeQuantity = ({ className = 'sm:min-w-[170px] sm:py-4 py-3 sm:px-5 px-4', sizeMinus, sizePlus, defaultQuantity = 0, idUser, idProduct, idVariant, maxQuantity }: Props) => {
    const [quantity, setQuantity] = useState<number>(defaultQuantity);
    const dispatch = useAppDispatch();
    //Xử lý số lượng sản phẩm muốn mua
    const debounce = (func: any, delay: number) => {
        let timer: any;
        return (...args: any[]) => {
            clearTimeout(timer);
            timer = setTimeout(() => func(...args), delay);
        };
    };

    const debouncedUpdateQuantity = useCallback(
        debounce((value: number) => {
            dispatch(updateQuantity({
                idUser,
                idProduct,
                idVariant,
                quantity: value
            }));
        }, 500),
        [dispatch, idUser, idProduct, idVariant]
    );

    const handleDecrease = () => {
        if (quantity > 1) {
            const newValue = quantity - 1;
            setQuantity(newValue);
            debouncedUpdateQuantity(newValue);
        }
    };

    const handleIncrease = () => {
        if (quantity < maxQuantity) {
            const newValue = quantity + 1;
            setQuantity(newValue);
            debouncedUpdateQuantity(newValue);
            return;
        }
        toast.warning('Max count on stock')
    };

    return (
        <div className={`flex sm:gap-0 gap-[18px] justify-between items-center bg-[#F0F0F0] rounded-full relative ${className}`}>
            <Minus
                size={sizeMinus}
                onClick={handleDecrease}
                className={`cursor-pointer select-none sm:text-2xl text-xl`}
            />
            <input
                type="number"
                className="hide-spinner font-MJSatoshi font-medium sm:text-base text-sm text-primary text-center border-none outline-none w-fit sm:absolute static sm:top-1/2 sm:left-1/2 sm:-translate-1/2"
                min={1}
                max={99}
                value={quantity}
                onChange={(e) => {
                    const newValue = Math.max(1, Math.min(maxQuantity, Number(e.target.value) || 1));
                    setQuantity(newValue);
                    debouncedUpdateQuantity(newValue);
                }}
            />
            <Plus
                size={sizePlus}
                onClick={handleIncrease}
                className={`cursor-pointer select-none sm:text-2xl text-xl`}
            />
        </div>
    )
}

export default ChangeQuantity