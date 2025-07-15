//Icons
import { Check } from 'lucide-react';

//Components
import DefaultButton from "@/components/DefaultButton";
import DiscountIcon from "@/components/Discount";
import ShowRatingStar from "@/components/ShowRatingStar";

//Hook
import ChangeQuantity from '@/components/ChangeQuantity';
import { extractAttribute, findFitVariant } from '@/lib/utils';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '@/store/store';
import { logOut } from '@/store/slices/userSlice';

const attribute = [
    {
        id: 'a1',
        name: 'Color',
        slug: 'color',
        type: 'String',
        values: [
            {
                id: 'b1',
                name: 'Red',
                slug: 'red',
                type: 'Color',
                value: '#FF0000'
            },
            {
                id: 'b2',
                name: 'Blue',
                slug: 'blue',
                type: 'Color',
                value: '#0000FF'
            },
            {
                id: 'b7',
                name: 'Green',
                slug: 'green',
                type: 'Color',
                value: '#008000'
            }
        ]
    },
    {
        id: 'a2',
        name: 'Size',
        slug: 'size',
        type: 'String',
        values: [
            {
                id: 'b3',
                name: 'Medium',
                slug: 'medium',
                type: 'Size',
                value: 'medium'
            },
            {
                id: 'b4',
                name: 'Large',
                slug: 'large',
                type: 'Size',
                value: 'large'
            }
        ]
    },
    {
        id: 'a3',
        name: 'Weight',
        slug: 'weight',
        type: 'Number',
        values: [
            {
                id: 'b5',
                name: '5kg',
                slug: '5kg',
                type: 'Weight',
                value: '5kg'
            },
            {
                id: 'b6',
                name: '10kg',
                slug: '10kg',
                type: 'Weight',
                value: '10kg'
            }
        ]
    },
    {
        id: 'a4',
        name: 'Material',
        slug: 'material',
        type: 'String',
        values: [
            {
                id: 'b8',
                name: 'Cao Cap',
                slug: 'cao cap',
                type: 'Material',
                value: 'cao cap'
            }
        ]
    }
]

const attributeValue = [
    {
        id: 'b1',
        name: 'Red',
        slug: 'red',
        type: 'Color',
        value: '#FF0000'
    },
    {
        id: 'b2',
        name: 'Blue',
        slug: 'blue',
        type: 'Color',
        value: '#0000FF'
    },
    {
        id: 'b3',
        name: 'Medium',
        slug: 'medium',
        type: 'Size',
        value: 'medium'
    },
    {
        id: 'b4',
        name: 'Large',
        slug: 'large',
        type: 'Size',
        value: 'large'
    },
    {
        id: 'b5',
        name: '5kg',
        slug: '5kg',
        type: 'Weight',
        value: '5kg'
    },
    {
        id: 'b6',
        name: '10kg',
        slug: '10kg',
        type: 'Weight',
        value: '10kg'
    },
    {
        id: 'b7',
        name: 'Green',
        slug: 'green',
        type: 'Color',
        value: '#008000'
    },
    {
        id: 'b8',
        name: 'Cao Cap',
        slug: 'cao cap',
        type: 'Material',
        value: 'cao cap'
    },
]

const variants = [
    {
        id: 'c1',
        price: 200,
        oldPrice: 250,
        discountPercent: 20,
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
    {
        id: 'c2',
        price: 250,
        oldPrice: 300,
        discountPercent: 15,
        values: [
            {
                id: 'b1',
                name: 'Red',
                slug: 'red',
                type: 'Color',
                value: '#FF0000'
            },
            {
                id: 'b4',
                name: 'Large',
                slug: 'large',
                type: 'Size',
                value: 'large'
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
    {
        id: 'c3',
        price: 300,
        oldPrice: 350,
        discountPercent: 10,
        values: [
            {
                id: 'b2',
                name: 'Blue',
                slug: 'blue',
                type: 'Color',
                value: '#0000FF'
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
    {
        id: 'c4',
        price: 350,
        oldPrice: 400,
        discountPercent: 5,
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
    {
        id: 'c5',
        price: 100,
        oldPrice: 200,
        discountPercent: 50,
        values: [
            {
                id: 'b3',
                name: 'Medium',
                slug: 'medium',
                type: 'Size',
                value: 'medium'
            },
            {
                id: 'b7',
                name: 'Green',
                slug: 'green',
                type: 'Color',
                value: '#008000'
            }
        ]
    }
]

const InforProduct = () => {
    const [chooseVariant, setChooseVariant] = useState<any>([
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
    ]);

    const handleChooseVariant = (variant: any) => (
        setChooseVariant((prev: any) => {
            const exitVariant = prev.findIndex((item: any) => item.id === variant.id);
            if (exitVariant > -1) {
                return prev.filter((_: any, index: number) => index !== exitVariant);
            }

            const findIndex = prev.findIndex((item: any) => item.type === variant.type);

            if (findIndex > -1) {
                const newVariants = [...prev];
                newVariants[findIndex] = variant;
                return newVariants;
            }

            return [...prev, variant];
        })
    );


    const allAttributes = extractAttribute(variants, attribute);
    const fitVariant = findFitVariant(variants, chooseVariant);

    // console.log('fitVariant: ', fitVariant);

    const [productInfor, setProductInfor] = useState<any>();
    useEffect(() => {
        if (fitVariant.length === 1 && chooseVariant.lenght === fitVariant[0].values.lenght) {
            setProductInfor(fitVariant[0]);
            return;
        } else {
            console.log('Vui lòng chọn đủ biến thể');
            return;
        }

    }, [chooseVariant])

    const dispatch = useDispatch<AppDispatch>();

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
                    classNameDPercent="sm:text-base text-sm lg:mb-[6px] m-0"
                    price={(productInfor && productInfor.price ? productInfor.price : 0)}
                    oldPrice={(productInfor && productInfor.oldPrice ? productInfor.oldPrice : 0)}
                    discountPercent={(productInfor && productInfor.discountPercent ? productInfor.discountPercent : 0)}
                />
                <span className="sm:text-base text-sm text-primary/60 pt-2">
                    This graphic t-shirt which is perfect for any occasion. Crafted from a soft and breathable fabric, it offers superior comfort and style.
                </span>
            </div>
            <div className="w-full h-[1px] bg-primary/10 my-6"></div>
            {allAttributes && allAttributes.map((attributes: any) => (
                <React.Fragment key={attributes.id}>
                    <div className="flex flex-col sm:gap-[21px] gap-4">
                        <p className="font-Satoshi sm:text-base text-sm text-primary/60">Select {attributes.name}</p>
                        <div className="flex sm:gap-[21px] gap-3">
                            {attributes.values.map((item: any) => {
                                const isChoose = chooseVariant?.some(
                                    (choosed: any) => choosed.id === item.id && choosed.type === item.type
                                ) ?? false;
                                const item_filter = fitVariant.some((vari: any) => vari.values.some((v: any) => v.id === item.id))

                                return (item && item.type === 'Color')
                                    ?
                                    <button
                                        key={item.name}
                                        style={{ backgroundColor: item.value }}
                                        onClick={() => item_filter && handleChooseVariant(item)}
                                        className={`ms:p-6 p-5 rounded-full relative overflow-hidden ${item_filter ? 'opacity-100 cursor-pointer' : 'opacity-50 cursor-not-allowed'}`}
                                    >
                                        {isChoose && <Check color="#fff" className="absolute top-1/2 left-1/2 -translate-1/2" />}
                                    </button>
                                    :
                                    <button
                                        key={item.value}
                                        onClick={() => item_filter && handleChooseVariant(item)}
                                        className={`${item_filter ? `opacity-100 cursor-pointer ${isChoose ? 'bg-primary' : 'bg-[#F0F0F0] hover:bg-primary'}` : 'opacity-50 cursor-not-allowed bg-[#c2c2c2]'} sm:py-4 py-[10px] sm:px-8 px-5 rounded-full relative group overflow-hidden`}
                                    >
                                        <span className={`${item_filter ? `${isChoose ? 'text-white' : 'text-primary/60 group-hover:text-white'}` : 'text-primary/60'}  text-nowrap capitalize`}>
                                            {item.name}
                                        </span>
                                    </button>
                            })}
                        </div>
                    </div>
                    <div className="w-full h-[1px] bg-primary/10 my-6"></div>
                </React.Fragment>

            ))}

            <div className="flex sm:gap-5 gap-3">
                <ChangeQuantity />
                <DefaultButton
                    onClick={() => dispatch(logOut())}
                    title="Add to Card"
                    classNameButton="bg-primary rounded-full w-full cursor-pointer max-sm:px-0"
                    classNameText="text-white"
                />
            </div>
        </div>
    )
}

export default InforProduct