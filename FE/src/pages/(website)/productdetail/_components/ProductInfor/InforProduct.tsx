//Icons
import { Check } from 'lucide-react';

//Components
import DefaultButton from "@/components/DefaultButton";
import DiscountIcon from "@/components/Discount";
import ShowRatingStar from "@/components/ShowRatingStar";

//Hook
import { useGetParams } from '@/common/hooks/useGetParams';
import type { IVariant } from '@/common/types/variant';
import ChangeQuantity from '@/components/ChangeQuantity';
import { extractAttribute, findFitVariant } from '@/lib/utils';
import { logOut } from '@/store/slices/userSlice';
import { useAppDispatch } from '@/store/store';
import { getAllAttribute } from '@/store/thunks/attributeThunk';
import React, { useEffect, useState } from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import type { IProduct } from '@/common/types/product';

type Props = {
    data: IProduct,
    variants: IVariant[],
    imageList: string[],
    mainSwiperRef: any
}

const InforProduct = ({ data, variants, imageList, mainSwiperRef }: Props) => {
    const dispatch = useAppDispatch();
    const attribute = useSelector((state: any) => state.attribute.dataAttribute, shallowEqual);
    const attributeStatus = useSelector((state: any) => state.attribute.status, shallowEqual);

    useEffect(() => {
        if (attributeStatus === 'idle') {
            dispatch(getAllAttribute({}))
            return;
        }
        return;
    }, [attributeStatus]);

    //Set giá trị mặc định cho phần chọn biến thể lúc vào trang
    const { idVariant } = useGetParams(['idVariant']);
    const [chooseVariant, setChooseVariant] = useState<any>([]);
    useEffect(() => {
        if (idVariant) {
            const filterVariant = variants.filter(item => item._id.toString() === idVariant.toString());
            if (filterVariant) {
                setChooseVariant(filterVariant[0].values);
                return;
            }
            return;
        }
    }, [idVariant])

    //Chức năng chọn biến thể
    const handleChooseVariant = ({ variant }: any) => (
        setChooseVariant((prev: any) => {
            // console.log('variant: ', variant)
            const exitVariant = prev.findIndex((item: any) => item._id === variant._id);
            if (exitVariant > -1) {
                // console.log('Chạy vào lọc prev')
                return prev.filter((_: any, index: number) => index !== exitVariant);
            }

            return [...prev, variant];
        })
    );

    //Hiển thị UI
    const allAttributes = extractAttribute(variants, attribute);
    //Giá trị ban đầu
    const fitVariant = findFitVariant(variants, chooseVariant);

    const [productInfor, setProductInfor] = useState<any>();
    useEffect(() => {
        if (fitVariant.length === 1 && chooseVariant.length === fitVariant[0].values.length) {
            setProductInfor(fitVariant[0]);
            //tìm vị trí ảnh và target vào
            const imgIndex = imageList.findIndex((item: any) => item === fitVariant[0].image);
            mainSwiperRef.current?.slideTo(imgIndex);
            return;
        } else {
            // toast.warning('Vui lòng chọn đủ biến thể');
            return;
        }

    }, [chooseVariant])

    // console.log('productInfor: ', productInfor)

    return (
        <div className='flex flex-col font-MJSatoshi'>
            <div className="flex flex-col sm:gap-[14px] gap-3">
                <p className='font-DKLongreach uppercase sm:text-[40px] text-2xl font-bold tracking-[2px] text-primary'>{data.name}</p>
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
                    price={productInfor?.price - productInfor?.discount}
                    oldPrice={productInfor?.price}
                    discountPrice={productInfor?.discount}
                />
                <span className="sm:text-base text-sm text-primary/60 pt-2">
                    {data.shortDesc}
                </span>
            </div>
            <div className="w-full h-[1px] bg-primary/10 my-6"></div>
            {allAttributes && allAttributes.length > 0 && allAttributes.map((attributes: any) => (
                <React.Fragment key={attributes._id}>
                    <div className="flex flex-col sm:gap-[21px] gap-4">
                        <p className="font-MJSatoshi sm:text-base text-sm text-primary/60">Select {attributes.name}</p>
                        <div className="flex sm:gap-[21px] gap-3">
                            {attributes.value.map((item: any) => {
                                const isChoose = chooseVariant?.some(
                                    (choosed: any) => choosed._id === item._id && choosed.type === item.type
                                ) ?? false;
                                const item_filter = fitVariant.some((vari: any) => vari.values.some((v: any) => v._id === item._id))

                                return (item && item.type === 'color')
                                    ?
                                    <button
                                        key={item.name}
                                        style={{ backgroundColor: item.value }}
                                        onClick={() => item_filter && handleChooseVariant({ variant: item })}
                                        className={`ms:p-6 p-5 rounded-full relative overflow-hidden ${item_filter ? 'opacity-100 cursor-pointer' : 'opacity-50 cursor-not-allowed'}`}
                                    >
                                        {isChoose && <Check color="#fff" className="absolute top-1/2 left-1/2 -translate-1/2" />}
                                    </button>
                                    :
                                    <button
                                        key={item.value}
                                        onClick={() => item_filter && handleChooseVariant({ variant: item })}
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