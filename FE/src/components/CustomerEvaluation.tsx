// Icons
import { Ellipsis } from "lucide-react";
import { FaStar } from "react-icons/fa";
import { FaCircleCheck } from "react-icons/fa6";

const CustomerEvaluation = ({ historyPosted = false, moreOptions = false, index }: { historyPosted?: boolean, moreOptions?: boolean, index?: number }) => {
    return (
        <div className='flex flex-col sm:gap-y-6 gap-y-4 border border-primary/10 rounded-[20px] lg:px-8 lg:py-7 px-6 py-6'>
            <div className="flex flex-col sm:gap-y-4 gap-y-3">
                <div className="flex justify-between items-center">
                    <div className='flex gap-x-[6px]'>
                        <FaStar className='w-[18px] h-[18px]' color='#FFC633' />
                        <FaStar className='w-[18px] h-[18px]' color='#FFC633' />
                        <FaStar className='w-[18px] h-[18px]' color='#FFC633' />
                        <FaStar className='w-[18px] h-[18px]' color='#FFC633' />
                        <FaStar className='w-[18px] h-[18px]' color='#FFC633' />
                    </div>
                    {moreOptions && <Ellipsis size={24} className="text-primary/60 cursor-pointer" />}
                </div>
                <div className='flex flex-col sm:gap-y-3 gap-y-2'>
                    <div className='flex gap-x-1 items-center'>
                        <p className='font-Satoshi font-bold lg:text-xl text-base'>Sarah {index ? index + 1 : 1}.</p>
                        <FaCircleCheck size={20} color='#01AB31' className='pb-[2px]' />
                    </div>
                    <p className='font-Satoshi font-base lg:text-base text-sm text-primary/60'>
                        "I'm blown away by the quality and style of the clothes I received from Shop.co. From casual wear to elegant dresses, every piece I've bought has exceeded my expectations.”
                    </p>
                </div>
            </div>
            {historyPosted && <p className="font-Satoshi sm:text-base text-sm font-medium text-primary/60">Posted on August 18, 2023</p>}
        </div>
    )
}

export default CustomerEvaluation