import DefaultButton from '@/components/DefaultButton';
import { Check, ChevronRight, SlidersVertical, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

const Filter = ({ screenWidth, openFilter, setOpenFilter }: { screenWidth: number, openFilter: boolean, setOpenFilter: (open: boolean) => void }) => {
    const minRef = useRef<HTMLInputElement>(null);
    const maxRef = useRef<HTMLInputElement>(null);
    const maxRangeValue = 1000;
    const [minValue, setMinValue] = useState(maxRangeValue * 0.2);
    const [maxValue, setMaxValue] = useState(maxRangeValue * 0.8);
    const divParentRef = useRef<HTMLDivElement>(null);
    const divChildrenRef = useRef<HTMLDivElement>(null);

    const handleCloseFilter = () => {
        setOpenFilter(false);
    }

    useEffect(() => {
        //mở filter
        if (openFilter) {
            window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });

            document.body.classList.add('overflow-hidden');
            document.body.classList.add('relative');

            divParentRef.current?.classList.remove('hidden');
            divParentRef.current?.classList.add('grid');
            divParentRef.current?.classList.add('absolute');
            divParentRef.current?.classList.add('w-full');
            divParentRef.current?.classList.add('h-screen');
            divParentRef.current?.classList.add('inset-0');
            divParentRef.current?.classList.add('z-50');
            divParentRef.current?.classList.add('bg-primary/50');
            divParentRef.current?.classList.add('place-items-end');
            divParentRef.current?.classList.add('overflow-y-scroll');
            setTimeout(() => {
                divParentRef.current?.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
                divParentRef.current?.classList.remove('pt-[200%]');
                divParentRef.current?.classList.add('pt-[10%]');
                setTimeout(() => {
                    divChildrenRef.current?.classList.remove('opacity-10');
                    divChildrenRef.current?.classList.add('opacity-100');
                }, 200);
            }, 100);

            divChildrenRef.current?.classList.remove('hidden');
            divChildrenRef.current?.classList.remove('rounded-[20px]');
            divChildrenRef.current?.classList.add('grid');
            divChildrenRef.current?.classList.add('rounded-tl-[20px]');
            divChildrenRef.current?.classList.add('rounded-tr-[20px]');
            divChildrenRef.current?.classList.add('rounded-bl-0');
            divChildrenRef.current?.classList.add('rounded-br-0');
        }

        //Đóng filter
        if (!openFilter) {
            //Tự đóng khi screen >= 1024
            if (screenWidth >= 1024) {
                divChildrenRef.current?.classList.add('opacity-100');
                document.body.classList.remove('overflow-hidden');
                document.body.classList.remove('relative');

                divParentRef.current?.classList.add('hidden');
                divParentRef.current?.classList.remove('grid');
                divParentRef.current?.classList.remove('absolute');
                divParentRef.current?.classList.remove('w-full');
                divParentRef.current?.classList.remove('h-screen');
                divParentRef.current?.classList.remove('inset-0');
                divParentRef.current?.classList.remove('z-50');
                divParentRef.current?.classList.remove('bg-primary/50');
                divParentRef.current?.classList.remove('place-items-end');
                divParentRef.current?.classList.remove('overflow-y-scroll');

                divChildrenRef.current?.classList.add('hidden');
                divChildrenRef.current?.classList.add('rounded-[20px]');
                divChildrenRef.current?.classList.remove('grid');
                divChildrenRef.current?.classList.remove('rounded-tl-[20px]');
                divChildrenRef.current?.classList.remove('rounded-tr-[20px]');
                divChildrenRef.current?.classList.remove('rounded-bl-0');
                divChildrenRef.current?.classList.remove('rounded-br-0');
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
                    document.body.classList.remove('overflow-hidden');
                    document.body.classList.remove('relative');

                    divParentRef.current?.classList.add('hidden');
                    divParentRef.current?.classList.remove('grid');
                    divParentRef.current?.classList.remove('absolute');
                    divParentRef.current?.classList.remove('w-full');
                    divParentRef.current?.classList.remove('h-screen');
                    divParentRef.current?.classList.remove('inset-0');
                    divParentRef.current?.classList.remove('z-50');
                    divParentRef.current?.classList.remove('bg-primary/50');
                    divParentRef.current?.classList.remove('place-items-end');
                    divParentRef.current?.classList.remove('overflow-y-scroll');

                    divChildrenRef.current?.classList.add('hidden');
                    divChildrenRef.current?.classList.add('rounded-[20px]');
                    divChildrenRef.current?.classList.remove('grid');
                    divChildrenRef.current?.classList.remove('rounded-tl-[20px]');
                    divChildrenRef.current?.classList.remove('rounded-tr-[20px]');
                    divChildrenRef.current?.classList.remove('rounded-bl-0');
                    divChildrenRef.current?.classList.remove('rounded-br-0');

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

    useEffect(() => {
        updateRangeTrack(minValue, maxValue);
    }, [minValue, maxValue]);

    return (
        <div
            ref={divParentRef}
            onClick={() => handleCloseFilter()}
            className='lg:grid hidden lg:pt-0 pt-[200%] overflow-hidden transition-all duration-300'
        >
            <div
                ref={divChildrenRef}
                onClick={(e) => e.stopPropagation()}
                className='lg:grid hidden bg-white w-full opacity-10 gap-6 border border-primary/10 rounded-[20px] py-5 px-6 font-Satoshi select-none h-fit'
            >
                <div className='flex justify-between'>
                    <p className='font-bold text-xl'>Filters</p>
                    <button
                        onClick={() => openFilter && setOpenFilter(false)}
                        className={`text-primary/40 ${openFilter && 'cursor-pointer'}`}>
                        {openFilter ? <X /> : <SlidersVertical />}
                    </button>
                </div>

                <div className='h-[1px] w-full bg-primary/10'></div>

                <div className='grid gap-5 text-base *:hover:text-primary *:cursor-pointer *:hover:font-medium'>
                    <div className='flex justify-between items-center text-primary/60'>
                        <p>T-shirts</p>
                        <div>
                            <ChevronRight size={20} />
                        </div>
                    </div>

                    <div className='flex justify-between items-center text-primary/60'>
                        <p>Shorts</p>
                        <div>
                            <ChevronRight size={20} />
                        </div>
                    </div>

                    <div className='flex justify-between items-center text-primary/60'>
                        <p>Shirts</p>
                        <div>
                            <ChevronRight size={20} />
                        </div>
                    </div>

                    <div className='flex justify-between items-center text-primary/60'>
                        <p>Hoodie</p>
                        <div>
                            <ChevronRight size={20} />
                        </div>
                    </div>

                    <div className='flex justify-between items-center text-primary/60'>
                        <p>Jeans</p>
                        <div>
                            <ChevronRight size={20} />
                        </div>
                    </div>
                </div>

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


                <div className='h-[1px] w-full bg-primary/10'></div>

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
                </div>

                <div className='h-[1px] w-full bg-primary/10'></div>

                <div className='grid gap-5'>
                    <div className='flex justify-between items-center'>
                        <p className='font-bold text-xl'>Size</p>
                        <button className='text-primary -rotate-90'>
                            <ChevronRight size={20} />
                        </button>
                    </div>
                    <div className='flex flex-wrap gap-2 text-sm *:hover:bg-primary *:hover:text-white'>
                        <button
                            className={`py-[10px] px-5 bg-primary text-white cursor-pointer rounded-[62px]`}
                        >
                            <p>XX-Small</p>
                        </button>
                        <button
                            className={`py-[10px] px-5 bg-[#F0F0F0] text-primary/60 cursor-pointer rounded-[62px]`}
                        >
                            <p>X-Small</p>
                        </button>
                        <button
                            className={`py-[10px] px-5 bg-[#F0F0F0] text-primary/60 cursor-pointer rounded-[62px]`}
                        >
                            <p>Small</p>
                        </button>
                        <button
                            className={`py-[10px] px-5 bg-[#F0F0F0] text-primary/60 cursor-pointer rounded-[62px]`}
                        >
                            <p>Medium</p>
                        </button>
                        <button
                            className={`py-[10px] px-5 bg-[#F0F0F0] text-primary/60 cursor-pointer rounded-[62px]`}
                        >
                            <p>Large</p>
                        </button>
                        <button
                            className={`py-[10px] px-5 bg-[#F0F0F0] text-primary/60 cursor-pointer rounded-[62px]`}
                        >
                            <p>X-Large</p>
                        </button>
                        <button
                            className={`py-[10px] px-5 bg-[#F0F0F0] text-primary/60 cursor-pointer rounded-[62px]`}
                        >
                            <p>XX-Large</p>
                        </button>
                        <button
                            className={`py-[10px] px-5 bg-[#F0F0F0] text-primary/60 cursor-pointer rounded-[62px]`}
                        >
                            <p>3X-Large</p>
                        </button>
                        <button
                            className={`py-[10px] px-5 bg-[#F0F0F0] text-primary/60 cursor-pointer rounded-[62px]`}
                        >
                            <p>4X-Large</p>
                        </button>
                    </div>
                </div>

                <div className='h-[1px] w-full bg-primary/10'></div>

                <div className='grid gap-5'>
                    <div className='flex justify-between items-center'>
                        <p className='font-bold text-xl capitalize'>Dress Style</p>
                        <button className='text-primary -rotate-90'>
                            <ChevronRight size={20} />
                        </button>
                    </div>
                    <div className='grid gap-5 text-base *:hover:text-primary *:cursor-pointer *:hover:font-medium'>
                        <div
                            className='flex justify-between items-center text-primary/60'>
                            <p>Causal</p>
                            <div>
                                <ChevronRight size={20} />
                            </div>
                        </div>

                        <div
                            className='flex justify-between items-center text-primary/60'>
                            <p>Formal</p>
                            <div>
                                <ChevronRight size={20} />
                            </div>
                        </div>

                        <div
                            className='flex justify-between items-center text-primary/60'>
                            <p>Party</p>
                            <div>
                                <ChevronRight size={20} />
                            </div>
                        </div>

                        <div
                            className='flex justify-between items-center text-primary/60'>
                            <p>Gym</p>
                            <div>
                                <ChevronRight size={20} />
                            </div>
                        </div>
                    </div>
                </div>

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