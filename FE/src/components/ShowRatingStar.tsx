// Icons
import { FaStar } from "react-icons/fa";
import { FaStarHalfAlt } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa";

const ShowRatingStar = ({ rating, size, className }: { rating: number, size?: number, className?: string }) => {
    const fullStar = Math.floor(rating);
    const halfStar = rating - fullStar >= 0.5; //Trả về true hoặc false (true nếu kết quả >= 0.5)
    const emptyStar = 5 - fullStar - (halfStar === true ? 1 : 0);

    return (
        <div className={`flex ${className}`}>
            {[...Array(fullStar)].map((_, index) => (
                <FaStar key={index} size={size} className='w-[18px] h-[18px]' color='#FFC633' />
            ))}

            {halfStar && <FaStarHalfAlt size={size} className='w-[18px] h-[18px]' color='#FFC633' />}

            {[...Array(emptyStar)].map((_, index) => (
                <FaRegStar key={index} size={size} className='w-[18px] h-[18px]' color='#FFC633' />
            ))}
        </div>
    )
}

export default ShowRatingStar