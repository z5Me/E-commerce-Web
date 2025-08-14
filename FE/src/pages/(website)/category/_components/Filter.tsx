import type { IAttribute } from '@/common/types/attribute';
import type { ICategory } from '@/common/types/category';
import DefaultButton from '@/components/DefaultButton';
import { debounce, getMaxPrice } from '@/lib/utils';
import { useAppDispatch } from '@/store/store';
import { getAllAttribute } from '@/store/thunks/attributeThunk';
import { getAllCategories } from '@/store/thunks/categoriesThunk';
import { getAllProducts } from '@/store/thunks/productThunk';
import { ChevronRight, SlidersVertical, X } from 'lucide-react';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import { useLocation } from 'react-router';

const Filter = ({ screenWidth, openFilter, setOpenFilter }: { screenWidth: number, openFilter: boolean, setOpenFilter: (open: boolean) => void }) => {
    const minRef = useRef<HTMLInputElement>(null);
    const maxRef = useRef<HTMLInputElement>(null);
    const [maxRangeValue, setMaxRangeValue] = useState<number>(0);
    const [minValue, setMinValue] = useState(0);
    const [maxValue, setMaxValue] = useState(maxRangeValue);
    const divParentRef = useRef<HTMLDivElement>(null);
    const divChildrenRef = useRef<HTMLDivElement>(null);

    const handleCloseFilter = () => {
        setOpenFilter(false);
    }

    useEffect(() => {
        //mở filter
        if (openFilter) {
            window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });

            document.body.classList.add('overflow-hidden', 'relative');

            divParentRef.current?.classList.remove('hidden');
            divParentRef.current?.classList.add('grid', 'absolute', 'w-full', 'h-screen', 'inset-0', 'z-50', 'bg-primary/50', 'place-items-end', 'overflow-y-scroll');
            setTimeout(() => {
                divParentRef.current?.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
                divParentRef.current?.classList.remove('pt-[200%]');
                divParentRef.current?.classList.add('pt-[10%]');
                setTimeout(() => {
                    divChildrenRef.current?.classList.remove('opacity-10');
                    divChildrenRef.current?.classList.add('opacity-100');
                }, 200);
            }, 100);

            divChildrenRef.current?.classList.remove('hidden', 'rounded-[20px]');
            divChildrenRef.current?.classList.add('grid', 'rounded-tl-[20px]', 'rounded-tr-[20px]', 'rounded-bl-0', 'rounded-br-0');
        }

        //Đóng filter
        if (!openFilter) {
            //Tự đóng khi screen >= 1024
            if (screenWidth >= 1024) {
                divChildrenRef.current?.classList.add('opacity-100');
                document.body.classList.remove('overflow-hidden', 'relative');

                divParentRef.current?.classList.add('hidden');
                divParentRef.current?.classList.remove('grid', 'absolute', 'w-full', 'h-screen', 'inset-0', 'z-50', 'bg-primary/50', 'place-items-end', 'overflow-y-scroll');

                divChildrenRef.current?.classList.add('hidden', 'rounded-[20px]');
                divChildrenRef.current?.classList.remove('grid', 'rounded-tl-[20px]', 'rounded-tr-[20px]', 'rounded-bl-0', 'rounded-br-0');
                setOpenFilter(false);
                return
            }

            //Đóng filter (màn nhỏ)
            divParentRef.current?.classList.remove('pt-[10%]');
            divParentRef.current?.classList.add('pt-[200%]');
            setTimeout(() => {
                divChildrenRef.current?.classList.remove('opacity-100');
                divChildrenRef.current?.classList.add('opacity-10');
                setTimeout(() => {
                    document.body.classList.remove('overflow-hidden', 'relative');

                    divParentRef.current?.classList.add('hidden');
                    divParentRef.current?.classList.remove('grid', 'absolute', 'w-full', 'h-screen', 'inset-0', 'z-50', 'bg-primary/50', 'place-items-end', 'overflow-y-scroll');

                    divChildrenRef.current?.classList.add('hidden', 'rounded-[20px]');
                    divChildrenRef.current?.classList.remove('grid', 'rounded-tl-[20px]', 'rounded-tr-[20px]', 'rounded-bl-0', 'rounded-br-0');

                    setOpenFilter(false);
                }, 300)
            }, 100);
        }

    }, [openFilter, screenWidth]);

    const updateRangeTrack = (min: number, max: number) => {
        const minPercent = (min / maxRangeValue) * 100;
        const maxPercent = (max / maxRangeValue) * 100;

        const background = `linear-gradient(to right, 
      #e5e7eb 0%, 
      #e5e7eb ${minPercent}%,
      #000 ${minPercent}%,
      #000 ${maxPercent}%,
      #e5e7eb ${maxPercent}%,
      #e5e7eb 100%)`;

        if (minRef.current) minRef.current.style.background = background;
        if (maxRef.current) maxRef.current.style.background = background;
    };

    const updatePriceURL = (minValue: number, maxValue: number) => {
        const newURL = new URLSearchParams(searchParams);
        newURL.set('min', minValue.toString());
        newURL.set('max', maxValue.toString());

        setSearchParmas(newURL);
    }

    const debouncedUpdatePriceURL = useCallback(
        debounce((min: number, max: number) => {
            updatePriceURL(min, max);
        }, 500), []);

    useEffect(() => {
        updateRangeTrack(minValue, maxValue);
        debouncedUpdatePriceURL(minValue, maxValue);

    }, [minValue, maxValue]);

    const dispatch = useAppDispatch();
    const allCategories = useSelector((state: any) => state.categories.categoriesData, shallowEqual);
    const allProducts = useSelector((state: any) => state.product.dataProducts, shallowEqual);
    const allAttribute = useSelector((state: any) => state.attribute.dataAttribute, shallowEqual);
    useEffect(() => {
        dispatch(getAllCategories({}));
        dispatch(getAllProducts({}));
        dispatch(getAllAttribute({}));
    }, [])

    useEffect(() => {
        if (allProducts && allProducts.length > 0) {
            const maxPrice = getMaxPrice(allProducts);
            if (maxPrice) {
                setMaxRangeValue(maxPrice);
                setMaxValue(maxPrice);
                updatePriceURL(0, maxPrice);
            }
        }
    }, [allProducts]);

    const getQueryParams = () => {
        const params = new URLSearchParams(window.location.search);
        const ojb: Record<string, string> = {};
        params.forEach((value, key) => (
            ojb[key] = value
        ))

        return ojb
    }

    const location = useLocation();
    // console.log('location.search', allAttribute)
    const [searchParams, setSearchParmas] = useState(new URLSearchParams(window.location.search));
    useEffect(() => {
        const newURL = `${location.pathname}?${searchParams.toString()}`;
        window.history.replaceState({}, '', newURL);

        // const query = getQueryParams();
        // console.log('getQuery', query);
        // dispatch(getAllProducts({}))
    }, [searchParams]);

    const handleFilter = () => {

    }

    return (
        <div
            ref={divParentRef}
            onClick={() => handleCloseFilter()}
            className='lg:grid hidden lg:pt-0 pt-[200%] overflow-hidden transition-all duration-300'
        >
            <div
                ref={divChildrenRef}
                onClick={(e) => e.stopPropagation()}
                className='lg:grid hidden bg-white w-full opacity-10 gap-6 border border-primary/10 rounded-[20px] py-5 px-6 font-MJSatoshi select-none h-fit'
            >
                <div className='flex justify-between'>
                    <p className='font-bold text-xl'>Filters</p>
                    <button
                        onClick={() => openFilter && setOpenFilter(false)}
                        className={`text-primary/40 ${openFilter && 'cursor-pointer'}`}>
                        {openFilter ? <X /> : <SlidersVertical />}
                    </button>
                </div>
                {allCategories && allCategories.length > 0 &&
                    <>
                        <div className='h-[1px] w-full bg-primary/10'></div>

                        <div className='grid gap-5 text-base *:hover:text-primary *:cursor-pointer *:hover:font-medium'>
                            {allCategories.map((item: ICategory) => (
                                <div
                                    key={item._id}
                                    className='flex justify-between items-center text-primary/60'
                                    onClick={() => {
                                        const newParams = new URLSearchParams(searchParams);
                                        newParams.set('category', item.slug as string);
                                        setSearchParmas(newParams);
                                    }}
                                >
                                    <p>{item.name}</p>
                                    <div>
                                        <ChevronRight size={20} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                }

                {maxRangeValue && maxRangeValue > 0 &&
                    <>
                        <div className='h-[1px] w-full bg-primary/10'></div>

                        <div className='grid gap-5'>
                            <div className='flex justify-between items-center'>
                                <p className='font-bold text-xl'>Price</p>
                                <button className='text-primary -rotate-90'>
                                    <ChevronRight size={20} />
                                </button>
                            </div>
                            <div className="relative w-full mx-auto">
                                {/* MAX range dưới */}
                                <input
                                    ref={maxRef}
                                    type="range"
                                    min="0"
                                    max={maxRangeValue}
                                    value={maxValue}
                                    step="1"
                                    onChange={(e) => {
                                        const val = Math.max(Number(e.target.value), minValue + (maxRangeValue * 0.05));
                                        setMaxValue(val);
                                    }}
                                    className="custom-range absolute w-full"
                                />
                                {/* MIN range trên */}
                                <input
                                    ref={minRef}
                                    type="range"
                                    min="0"
                                    max={maxRangeValue}
                                    value={minValue}
                                    step="1"
                                    onChange={(e) => {
                                        const val = Math.min(Number(e.target.value), maxValue - (maxRangeValue * 0.05));
                                        setMinValue(val);
                                    }}
                                    className="custom-range absolute w-full"
                                />
                                <p className="mt-4 text-sm text-center text-gray-700">
                                    Giá: {minValue} - {maxValue}
                                </p>
                            </div>
                        </div>
                    </>
                }

                {/* <div className='h-[1px] w-full bg-primary/10'></div>

                <div className='grid gap-5'>
                    <div className='flex justify-between items-center'>
                        <p className='font-bold text-xl'>Colors</p>
                        <button className='text-primary -rotate-90'>
                            <ChevronRight size={20} />
                        </button>
                    </div>
                    <div className="flex flex-wrap gap-4 items-center *:cursor-pointer">
                        <button
                            className='w-full max-w-[37px] h-[49px] max-h-[37px] bg-[#00C12B] border border-primary/20 rounded-full relative'>
                            <div className='absolute top-1/2 left-1/2 -translate-1/2 text-white'>
                                <Check />
                            </div>
                        </button>

                        <button
                            className='w-full max-w-[37px] h-[49px] max-h-[37px] bg-[#F50606] border border-primary/20 rounded-full relative'>
                        </button>

                        <button
                            className='w-full max-w-[37px] h-[49px] max-h-[37px] bg-[#F5DD06] border border-primary/20 rounded-full relative'>
                        </button>

                        <button
                            className='w-full max-w-[37px] h-[49px] max-h-[37px] bg-[#F57906] border border-primary/20 rounded-full relative'>
                        </button>

                        <button
                            className='w-full max-w-[37px] h-[49px] max-h-[37px] bg-[#06CAF5] border border-primary/20 rounded-full relative'>
                        </button>

                        <button
                            className='w-full max-w-[37px] h-[49px] max-h-[37px] bg-[#063AF5] border border-primary/20 rounded-full relative'>
                        </button>

                        <button
                            className='w-full max-w-[37px] h-[49px] max-h-[37px] bg-[#7D06F5] border border-primary/20 rounded-full relative'>
                        </button>

                        <button
                            className='w-full max-w-[37px] h-[49px] max-h-[37px] bg-[#F506A4] border border-primary/20 rounded-full relative'>
                        </button>

                        <button
                            className='w-full max-w-[37px] h-[49px] max-h-[37px] bg-[#FFFFFF] border border-primary/20 rounded-full relative'>
                        </button>

                        <button
                            className='w-full max-w-[37px] h-[49px] max-h-[37px] bg-[#000000] border border-primary/20 rounded-full relative'>
                        </button>
                    </div>
                </div> */}

                {allAttribute && allAttribute.length > 0 &&
                    allAttribute.map((attribute: IAttribute) => (
                        <React.Fragment key={attribute._id}>
                            <div className='h-[1px] w-full bg-primary/10'></div>

                            <div className='grid gap-5'>
                                <div className='flex justify-between items-center'>
                                    <p className='font-bold text-xl'>{attribute.name}</p>
                                    <button className='text-primary -rotate-90'>
                                        <ChevronRight size={20} />
                                    </button>
                                </div>
                                <div className='flex flex-wrap gap-2 text-sm '>
                                    {attribute.value && attribute.value.length > 0 &&
                                        attribute.value.map((item) => (
                                            <button
                                                key={item._id}
                                                onClick={() => {
                                                    const newParams = new URLSearchParams(searchParams);
                                                    newParams.set(attribute.type, item.value);
                                                    setSearchParmas(newParams);
                                                }}
                                                className={`py-[10px] px-5 bg-[#F0F0F0] text-primary/60 cursor-pointer rounded-[62px] hover:bg-primary hover:text-white`}
                                            >
                                                <p>{item.name}</p>
                                            </button>
                                        ))

                                    }

                                </div>
                            </div>
                        </React.Fragment>
                    ))
                }

                <DefaultButton
                    title='Apply Filter'
                    classNameButton='bg-primary border border-primary hover:border-primary/10 hover:bg-white group cursor-pointer'
                    classNameText='text-white group-hover:text-primary'
                    onClick={() => setOpenFilter(false)}
                />
            </div>
        </div>
    )
}

export default Filter