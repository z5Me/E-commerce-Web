import CustomerEvaluation from '@/components/CustomerEvaluation';
import DefaultButton from '@/components/DefaultButton';
import { ChevronDown, SlidersVertical } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

const ReviewDetail = ({ screenWidth }: { screenWidth: number }) => {
    const selectDivRef = useRef<HTMLDivElement | null>(null);
    const [selectButton, setSelectButton] = useState<number>(2);
    const [renderReview, setRenderReview] = useState<number>(6);
    const maxRenderReview = 12;

    const handleOnClick = () => {
        setRenderReview(renderReview + 6);
    }

    useEffect(() => {
        if (selectButton && selectDivRef.current) {
            if (selectButton === 1) {
                selectDivRef.current.classList.add('left-1/6');
                selectDivRef.current.classList.remove('left-1/2');
                selectDivRef.current.classList.remove('left-5/6');
            }
            if (selectButton === 2) {
                selectDivRef.current.classList.add('left-1/2');
                selectDivRef.current.classList.remove('left-1/6');
                selectDivRef.current.classList.remove('left-5/6');
            }
            if (selectButton === 3) {
                selectDivRef.current.classList.add('left-5/6');
                selectDivRef.current.classList.remove('left-1/6');
                selectDivRef.current.classList.remove('left-1/2');
            }
        }
    }, [selectButton])

    return (
        <div className="mt-[104px] mb-[64px]">
            <div className="w-full relative">
                <div className="flex w-full items-center *:transition-all *:duration-200 *:sm:pb-6 *:pb-3 *:w-1/3 *:text-center *:cursor-pointer font-Satoshi md:text-[20px] text-base border-b border-b-primary/10">
                    <button onClick={() => setSelectButton(1)} className={`${selectButton === 1 ? 'text-primary font-medium' : 'text-primary/60 font-normal'}`}>{screenWidth > 639 ? 'Product Details' : 'Details'}</button>
                    <button onClick={() => setSelectButton(2)} className={`${selectButton === 2 ? 'text-primary font-medium' : 'text-primary/60 font-normal'}`}>{screenWidth > 639 ? 'Rating & Review' : 'Review'}</button>
                    <button onClick={() => setSelectButton(3)} className={`${selectButton === 3 ? 'text-primary font-medium' : 'text-primary/60 font-normal'}`}>FAQs</button>
                </div>
                <div
                    ref={selectDivRef}
                    className="absolute transition-all duration-200 bottom-0 w-1/3 -translate-x-1/2 h-[2px] bg-primary"
                >
                </div>
            </div>
            {
                selectButton === 1 ?
                    <div className='min-h-[300px] flex justify-center items-center'>
                        <p>...đang phát triển</p>
                    </div>
                    :
                    selectButton === 2 ?
                        <>
                            <div className="flex justify-between items-center py-6 gap-1">
                                <div className="flex sm:gap-x-2 gap-x-[6px] gap-y-0 font-Satoshi items-center flex-wrap">
                                    <p className="sm:text-2xl text-xl font-bold">All Review</p>
                                    <span className="text-base text-primary/60">(451)</span>
                                </div>
                                <div className="flex sm:gap-[10px] gap-2 *:cursor-pointer select-none">
                                    <div className="sm:p-3 p-[10px] rounded-full bg-[#F0F0F0]">
                                        <SlidersVertical size={screenWidth > 640 ? 24 : 20} />
                                    </div>
                                    <div className="py-3 px-5 rounded-full bg-[#F0F0F0] items-center gap-[21px] md:flex hidden">
                                        <p className="font-Satoshi font-medium text-base">Latest</p>
                                        <ChevronDown size={16} />
                                    </div>
                                    <div className="sm:py-3 py-[10px] sm:px-5 px-4 bg-primary rounded-full flex items-center">
                                        <p className="text-white sm:text-base text-xs font-Satoshi font-medium text-nowrap">Write a Review</p>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col gap-y-9 transition-all duration-200">

                                <div className="grid md:grid-cols-2 grid-cols-1 gap-5">
                                    {[...Array(12)].map((_, index) => {
                                        if (index + 1 > renderReview) return;
                                        return (
                                            <CustomerEvaluation key={index} historyPosted={true} moreOptions={true} />
                                        )
                                    })}
                                </div>
                                {renderReview < maxRenderReview &&
                                    <div className="flex justify-center">
                                        <DefaultButton
                                            title="Load More Reviews"
                                            classNameButton="border border-primary/10 rounded-full group hover:bg-primary cursor-pointer"
                                            classNameText="group-hover:text-white"
                                            onClick={handleOnClick}
                                        />
                                    </div>
                                }
                            </div>
                        </>
                        :
                        selectButton === 3 ?
                            <div className='min-h-[300px] flex justify-center items-center'>
                                <p>...đang phát triển</p>
                            </div>
                            :
                            <div className='min-h-[300px]'>
                                <p>???</p>
                            </div>
            }
        </div>
    )
}

export default ReviewDetail