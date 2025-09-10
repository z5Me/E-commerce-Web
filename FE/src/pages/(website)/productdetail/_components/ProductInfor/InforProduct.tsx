//Icons
import { Check, Heart, HeartPlus } from 'lucide-react';

//Components
import DiscountIcon from "@/components/Discount";
import ShowRatingStar from "@/components/ShowRatingStar";

//types
import type { IProduct } from '@/common/types/product';
import type { IVariant } from '@/common/types/variant';

//redux
import { useGetParams } from '@/common/hooks/useGetParams';
import { extractAttribute, findFitVariant } from '@/lib/utils';
import { useAppDispatch } from '@/store/store';
import { getAllAttribute } from '@/store/thunks/attributeThunk';

//Hook
import type { IAttribute } from '@/common/types/attribute';
import type { IAttributeValue } from '@/common/types/attributeValue';
import React, { useEffect, useState } from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import AddToCartButton from './AddToCartButton';
import { addWishList } from '@/store/thunks/userThunk';
import { toast } from 'sonner';

type Props = {
    data: IProduct,
    variants: IVariant[],
    imageList: string[],
    mainSwiperRef: any,
    checkWishList: boolean
}

const InforProduct = ({ data, variants, imageList, mainSwiperRef, checkWishList }: Props) => {
    const dispatch = useAppDispatch();
    const attribute = useSelector((state: any) => state.attribute.dataAttribute, shallowEqual);
    const attributeStatus = useSelector((state: any) => state.attribute.status, shallowEqual);
    const dataUser = useSelector((state: any) => state.user.dataUser, shallowEqual);

    useEffect(() => {
        if (attributeStatus === 'idle') {
            dispatch(getAllAttribute({}))
            return;
        }
        return;
    }, [attributeStatus]);

    //Set giá trị mặc định cho phần chọn biến thể lúc vào trang
    const { idVariant } = useGetParams(['idVariant']);
    const [chooseVariant, setChooseVariant] = useState<IAttributeValue[]>([]);
    useEffect(() => {
        if (idVariant) {
            const filterVariant = variants.filter(item => item._id.toString() === idVariant.toString());
            if (filterVariant) {
                setChooseVariant(filterVariant[0].values);
                return;
            }
            return;
        }
    }, [idVariant]);

    //Chức năng chọn biến thể
    const handleChooseVariant = ({ variant }: { variant: IAttributeValue }) => (
        setChooseVariant((prev: IAttributeValue[]) => {
            const exitVariant = prev.findIndex((item: IAttributeValue) => item._id === variant._id);
            if (exitVariant > -1) {
                return prev.filter((_: IAttributeValue, index: number) => index !== exitVariant);
            }

            return [...prev, variant];
        })
    );

    //Hiển thị UI
    const allAttributes = extractAttribute(variants, attribute);
    //Giá trị ban đầu và tìm giá trị phù hợp với những biến thể đã chọn
    const fitVariant = findFitVariant(variants, chooseVariant);

    //Lưu thông tin sản phẩm và hiển thị ra UI
    const [productInfor, setProductInfor] = useState<IVariant>();
    useEffect(() => {
        if (fitVariant.length === 1 && chooseVariant.length === fitVariant[0].values.length) {
            setProductInfor(fitVariant[0]);
            //tìm vị trí ảnh và target dựa vào các biến thể đã chọn
            const imgIndex = imageList.findIndex((item: string) => item === fitVariant[0].image);
            mainSwiperRef.current?.slideTo(imgIndex);
            return;
        } else {
            // toast.warning('Vui lòng chọn đủ biến thể');
            return;
        }

    }, [chooseVariant]);

    //Thêm vào mục sản phẩm yêu thích
    const handleAddWishList = () => {
        dispatch(addWishList({ idProduct: data._id as string, idUser: dataUser._id })).unwrap()
            .then(() => {
                toast.success('Sản phầm đã được thêm vào danh sách yêu thích');
            })
            .catch((error) => {
                console.log('Lỗi ở addWishList', error);
                return error;
            })
    }

    return (
        <>
            <div className='flex flex-col font-MJSatoshi'>
                <div className="flex flex-col sm:gap-[14px] gap-3">
                    <p className='font-Satoshi-Bold sm:text-[40px] text-2xl text-primary'>{data.name}</p>
                    <div className='flex gap-x-4 items-center'>
                        <div className='flex gap-4 items-center'>
                            <div className="flex text-[#FFC633] gap-[7px] ">
                                <ShowRatingStar className="gap-[7px] sm:*:text-2xl text-lg" size={28} rating={4.5} />
                            </div>
                            <p className="sm:text-base text-sm pt-1">4.5/<span className="text-primary/60">5</span></p>
                        </div>
                        <div
                            onClick={() => handleAddWishList()}
                            className={`${checkWishList ? 'text-danger' : 'text-gray-500'} hover:text-danger cursor-pointer select-none`}
                        >
                            {checkWishList ? <Heart size={24} /> : <HeartPlus size={24} />}
                        </div>
                    </div>
                    <DiscountIcon
                        className="gap-3"
                        classNamePrice="sm:text-[32px] text-2xl"
                        classNameOldPrice="sm:text-[32px] text-2xl"
                        classNameDPercent="sm:text-base text-sm lg:mb-[6px] m-0"
                        price={(productInfor?.price ?? 0) - (productInfor?.discount ?? 0)}
                        oldPrice={productInfor?.price ?? 0}
                        discountPrice={productInfor?.discount ?? 0}
                    />
                    <span className="sm:text-base text-sm text-primary/60 pt-2">
                        {data.shortDesc}
                    </span>
                </div>
                <div className="w-full h-[1px] bg-primary/10 my-6"></div>
                {allAttributes && allAttributes.length > 0 && allAttributes.map((attributes: IAttribute) => (
                    <React.Fragment key={attributes._id}>
                        <div className="flex flex-col sm:gap-[21px] gap-4">
                            <p className="font-MJSatoshi sm:text-base text-sm text-primary/60">Select {attributes.name}</p>
                            <div className="flex sm:gap-[21px] gap-3">
                                {attributes.value.map((item: IAttributeValue) => {
                                    const isChoose = chooseVariant?.some(
                                        (choosed: IAttributeValue) => choosed._id === item._id && choosed.type === item.type
                                    ) ?? false;
                                    const item_filter = fitVariant.some((vari: IVariant) => vari.values.some((v: IAttributeValue) => v._id === item._id))

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
                {productInfor && <AddToCartButton
                    data={data}
                    productInfor={productInfor}
                    fitVariant={fitVariant}
                    chooseVariant={chooseVariant}
                />}

            </div>
        </>
    )
}

export default InforProduct