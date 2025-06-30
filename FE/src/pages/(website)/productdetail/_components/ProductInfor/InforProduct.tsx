//Icons
import { Check, Minus, Plus } from 'lucide-react';

//Components
import DefaultButton from "@/components/DefaultButton";
import DiscountIcon from "@/components/Discount";
import ShowRatingStar from "@/components/ShowRatingStar";

//Hook
import React, { useEffect, useState } from 'react';
import { extractAllVariant, filterVariantByChoose } from '@/lib/utils';

const variant = [
    //brown
    {
        id: 10,
        color: {
            id: 1,
            name: 'brown',
            value: '#4F4631',
            type: 'circle',
        },
        size: {
            id: 4,
            name: 'Small',
            value: 'small',
            type: 'button'
        },
        price: 210,
        oldPrice: 250,
        discountPercent: 16
    },
    {
        id: 11,
        color: {
            id: 1,
            name: 'brown',
            value: '#4F4631',
            type: 'circle'
        },
        size: {
            id: 5,
            name: 'Medium',
            value: 'medium',
            type: 'button'
        },
        price: 320,
        oldPrice: 350,
        discountPercent: 9
    },
    {
        id: 12,
        color: {
            id: 1,
            name: 'brown',
            value: '#4F4631',
            type: 'circle'
        },
        size: {
            id: 6,
            name: 'Large',
            value: 'large',
            type: 'button'
        },
        price: 280,
        oldPrice: 320,
        discountPercent: 13
    },
    //green
    {
        id: 13,
        color: {
            id: 2,
            name: 'green',
            value: '#314F4A',
            type: 'circle'
        },
        size: {
            id: 4,
            name: 'Small',
            value: 'small',
            type: 'button'
        },
        price: 230,
        oldPrice: 270,
        discountPercent: 15
    },
    {
        id: 14,
        color: {
            id: 2,
            name: 'green',
            value: '#314F4A',
            type: 'circle'
        },
        size: {
            id: 5,
            name: 'Medium',
            value: 'medium',
            type: 'button'
        },
        price: 310,
        oldPrice: 340,
        discountPercent: 8
    },
    {
        id: 15,
        color: {
            id: 2,
            name: 'green',
            value: '#314F4A',
            type: 'circle'
        },
        size: {
            id: 6,
            name: 'Large',
            value: 'large',
            type: 'button'
        },
        price: 270,
        oldPrice: 310,
        discountPercent: 13
    },
    {
        id: 16,
        color: {
            id: 2,
            name: 'green',
            value: '#314F4A',
            type: 'circle'
        },
        size: {
            id: 7,
            name: 'X-Large',
            value: 'x-large',
            type: 'button'
        },
        price: 290,
        oldPrice: 330,
        discountPercent: 12
    },
    //purple
    {
        id: 17,
        color: {
            id: 3,
            name: 'purple',
            value: '#31344F',
            type: 'circle'
        },
        size: {
            id: 7,
            name: 'X-Large',
            value: 'x-large',
            type: 'button'
        },
        material: {
            id: 8,
            name: 'Vải',
            value: 'vai',
            type: 'button'
        },
        price: 370,
        oldPrice: 410,
        discountPercent: 10
    },
    {
        id: 18,
        color: {
            id: 3,
            name: 'purple',
            value: '#31344F',
            type: 'circle'
        },
        size: {
            id: 7,
            name: 'X-Large',
            value: 'x-large',
            type: 'button'
        },
        material: {
            id: 9,
            name: 'Vải cao cấp',
            value: 'vai-cao-cap',
            type: 'button'
        },
        price: 430,
        oldPrice: 510,
        discountPercent: 16
    }
]

const InforProduct = () => {
    const [quantity, setQuantity] = useState<number>(1);
    const [chooseVariant, setChooseVariant] = useState<any>({
        color: { id: 1, name: 'brown', value: '#4F4631', type: 'circle' },
        size: { id: 4, name: 'Small', value: 'small', type: 'button' }
    });
    const [productInfor, setProductInfor] = useState<any>();


    const allVariant = extractAllVariant(variant);
    const filterVariant = filterVariantByChoose(variant, chooseVariant);

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

    //Chọn biến thể
    const handleChooseVariant = ({ key, item }: any) => {

        if (key && item) {
            if (chooseVariant[key]?.id === item.id) {
                // console.log('Chạy vào delete key');
                delete chooseVariant[key];
            } else {
                // console.log('Thay item');
                chooseVariant[key] = item;
            }
        }

        return setChooseVariant({ ...chooseVariant });
    }

    //Thay đổi thông tin khi đổi biến thể
    useEffect(() => {
        if (filterVariant && filterVariant.length === 1) {
            if (productInfor !== filterVariant[0]) {
                // console.log('Phát hiện biến thể khác');

                //Đếm số lượng các biến thể
                const countObjectFilterVariant = Object.values(filterVariant[0]).filter(
                    (value) => typeof (value) === 'object' && value !== null && !Array.isArray(value)
                ).length
                //Đếm số lượng các biến thể được chọn
                const countObjectChooseVariant = Object.values(chooseVariant).length

                //Nếu cả 2 bằng nhau mới thay thông tin biến thể mới vào state
                if (countObjectFilterVariant === countObjectChooseVariant) {
                    setProductInfor(filterVariant[0]);
                }

                return;
            }
            return;
        }
    }, [filterVariant]);

    return (
        <div className='flex flex-col font-Satoshi'>
            <div className="flex flex-col sm:gap-[14px] gap-3">
                <p className='font-IntegralCF uppercase sm:text-[40px] text-2xl font-bold text-primary'>One Life Graphic T-shirt</p>
                <div className='flex gap-4 items-center'>
                    <div className="flex text-[#FFC633] gap-[7px] ">
                        <ShowRatingStar className="gap-[7px] sm:*:text-2xl text-lg" size={28} rating={4.5} />
                    </div>
                    <p className="sm:text-base text-sm pt-1">4.5/<span className="text-primary/60">5</span></p>
                </div>
                <DiscountIcon
                    className="gap-3"
                    classNamePrice="sm:text-[32px] text-2xl"
                    classNameOldPrice="sm:text-[32px] text-2xl"
                    classNameDPercent="sm:text-base text-sm"
                    price={(productInfor && productInfor.price ? productInfor.price : 0)}
                    oldPrice={(productInfor && productInfor.oldPrice ? productInfor.oldPrice : 0)}
                    discountPercent={(productInfor && productInfor.discountPercent ? productInfor.discountPercent : 0)}
                />
                <span className="sm:text-base text-sm text-primary/60 pt-2">
                    This graphic t-shirt which is perfect for any occasion. Crafted from a soft and breathable fabric, it offers superior comfort and style.
                </span>
            </div>
            <div className="w-full h-[1px] bg-primary/10 my-6"></div>
            {allVariant && Object.entries(allVariant).map(([key, value]: any) => {
                return (
                    <React.Fragment key={key}>
                        <div className="flex flex-col sm:gap-[21px] gap-4">
                            <p className="font-Satoshi sm:text-base text-sm text-primary/60">Select {key}</p>
                            <div className="flex sm:gap-[21px] gap-3">
                                {value && value.map((item: any) => {
                                    //kiểm tra những biến thể còn khả dụng
                                    const item_filter = filterVariant.find((v: any) => v[key]?.id === item.id);
                                    //kiểm tra những biến thể được chọn
                                    const isChoose = chooseVariant && chooseVariant[key]?.id === item.id;

                                    return (
                                        (item && item.type === 'circle')
                                            ?
                                            <button
                                                key={item.name}
                                                style={{ backgroundColor: item.value }}
                                                onClick={() => item_filter && handleChooseVariant({ key: key, item: item })}
                                                className={`ms:p-6 p-5 rounded-full relative overflow-hidden ${item_filter ? 'opacity-100 cursor-pointer' : 'opacity-50 cursor-not-allowed'}`}
                                            >
                                                {isChoose && <Check color="#fff" className="absolute top-1/2 left-1/2 -translate-1/2" />}
                                            </button>
                                            :
                                            <button
                                                key={item.value}
                                                onClick={() => item_filter && handleChooseVariant({ key: key, item: item })}
                                                className={`${item_filter ? `opacity-100 cursor-pointer ${isChoose ? 'bg-primary' : 'bg-[#F0F0F0] hover:bg-primary'}` : 'opacity-50 cursor-not-allowed bg-[#c2c2c2]'} sm:py-4 py-[10px] sm:px-8 px-5 rounded-full relative group overflow-hidden`}
                                            >
                                                <span className={`${item_filter ? `${isChoose ? 'text-white' : 'text-primary/60 group-hover:text-white'}` : 'text-primary/60'}  text-nowrap capitalize`}>
                                                    {item.name}
                                                </span>
                                            </button>
                                    )

                                })}
                            </div>
                        </div>
                        <div className="w-full h-[1px] bg-primary/10 my-6"></div>
                    </React.Fragment>
                )
            })}
            <div className="flex sm:gap-5 gap-3">
                <div className="flex sm:py-4 py-3 sm:px-5 px-4 sm:min-w-[170px] w-auto sm:gap-0 gap-[18px] justify-between items-center bg-[#F0F0F0] rounded-full relative">
                    <Minus
                        onClick={() => (quantity > 1) && setQuantity((prev) => prev - 1)}
                        className="cursor-pointer sm:text-2xl text-xl select-none"
                    />
                    <input
                        type="number"
                        className="hide-spinner font-Satoshi font-medium sm:text-base text-sm text-primary text-center border-none outline-none w-1/3 sm:absolute static sm:top-1/2 sm:left-1/2 sm:-translate-1/2"
                        min={1}
                        max={99}
                        value={quantity}
                        onChange={(e) => onChangeValue(e.target.value)}
                    />
                    <Plus
                        onClick={() => (quantity < 99 && setQuantity((prev) => prev + 1))}
                        className="cursor-pointer sm:text-2xl text-xl select-none"
                    />
                </div>
                <DefaultButton
                    title="Add to Card"
                    classNameButton="bg-primary rounded-full w-full cursor-pointer max-sm:px-0"
                    classNameText="text-white"
                />
            </div>
        </div>
    )
}

export default InforProduct