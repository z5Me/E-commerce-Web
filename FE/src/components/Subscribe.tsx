//Icons
import { HiOutlineMail } from "react-icons/hi";


const Subscribe = () => {
    return (
        <>
            <section className='bg-[linear-gradient(to_bottom,white_0%,white_50%,#F0F0F0_50%,#F0F0F0_100%)]'>
                <div className='defaultPadding'>
                    <div className='bg-primary rounded-[20px] px-[64px] py-[36px] flex md:flex-row flex-col md:gap-y-0 gap-y-8 gap-x-4 justify-between items-center'>
                        <p className='uppercase lg:text-[40px] text-[28px] font-IntegralCF font-bold text-white max-w-[551px] w-full'>STAY UPTO DATE ABOUT OUR LATEST OFFERS</p>
                        <div className='flex flex-col w-full lg:max-w-[349px] max-w-[311px] gap-y-4'>
                            <div className='flex px-4 py-3 bg-white rounded-full gap-x-3 items-center'>
                                <HiOutlineMail size={24} className='text-primary/40' />
                                <input className='border-none outline-none w-full text-primary/40 lg:text-base text-sm' type="text" placeholder='Enter your email address' />
                            </div>
                            <button className='px-4 py-3 bg-white rounded-full cursor-pointer'>
                                <p className='font-Satoshi font-medium text-primary lg:text-base text-sm'>Subscribe to Newsletter</p>
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Subscribe