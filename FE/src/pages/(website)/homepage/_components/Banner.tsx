//Image
import Customer from '@/assets/banner.svg';
import Calvin_Klein from '@/assets/logo_brands/calvin klein.svg';
import Gucci from '@/assets/logo_brands/gucci.svg';
import Prada from '@/assets/logo_brands/prada.svg';
import Versace from '@/assets/logo_brands/versace.svg';
import Zara from '@/assets/logo_brands/zara.svg';
import DefaultButton from '@/components/DefaultButton';

const Banner = () => {
    return (
        <>
            <section className='BANNER flex lg:flex-row flex-col justify-between defaultPadding bg-[#F2F0F1] overflow-hidden'>
                <div className='lg:w-1/2 w-full lg:pt-[100px] pt-10 lg:pb-[100px] pb-0 flex flex-col lg:gap-y-8 gap-y-5'>
                    <p className='font-IntegralCF md:text-6xl text-4xl xl:w-[493px] w-auto inline xl:block lg:text-start text-center'>
                        FIND CLOTHES THAT MATCHES YOUR STYLE
                    </p>
                    <p className='xl:w-[545px] w-auto md:text-base text-sm inline xl:block font-Satoshi text-black/60 lg:text-start text-center'>
                        Browse through our diverse range of meticulously crafted garments, designed to bring out your individuality and cater to your sense of style.
                    </p>
                    <div className='flex lg:justify-start justify-center'>
                        <DefaultButton title='Shop now' classNameButton='bg-primary hover:cursor-pointer lg:w-auto md:w-[50%] w-full text-center' classNameText='text-white' />
                    </div>
                    <div className='pt-4 font-Satoshi flex lg:flex-row flex-col gap-x-[17px] lg:items-start items-center'>
                        <div className='flex gap-x-[17px]'>
                            <div className='flex flex-col'>
                                <p className='text-primary font-bold text-2xl md:text-[40px]'>200+</p>
                                <p className='text-primary/60 md:text-base text-xs'>International Brands</p>
                            </div>

                            <div className='bg-primary/10 min-w-[2px]'></div>

                            <div className='flex flex-col'>
                                <p className='text-primary font-bold text-2xl md:text-[40px]'>2,000+</p>
                                <p className='text-primary/60 md:text-base text-xs'>High-Quality Products</p>
                            </div>
                        </div>

                        <div className='bg-primary/10 min-w-[2px] h-full lg:block hidden'></div>

                        <div className='flex flex-col'>
                            <p className='text-primary font-bold text-2xl md:text-[40px]'>30,000+</p>
                            <p className='text-primary/60 md:text-base text-xs'>Happy Customers</p>
                        </div>
                    </div>
                </div>
                <div className='lg:w-1/2 w-full  h-[428px]'>
                    <img className="object-cover" src={Customer} alt="Banner" />
                </div>
            </section>
            <section>
                <div className="flex flex-wrap lg:justify-between justify-center items-center bg-primary defaultPadding py-10 gap-6">
                    <img src={Calvin_Klein} alt="Calvin_Klein" className="w-24 sm:w-28 md:w-32 object-contain" />
                    <img src={Gucci} alt="Gucci" className="w-24 sm:w-28 md:w-32 object-contain" />
                    <img src={Prada} alt="Prada" className="w-24 sm:w-28 md:w-32 object-contain" />
                    <img src={Versace} alt="Versace" className="w-24 sm:w-28 md:w-32 object-contain" />
                    <img src={Zara} alt="Zara" className="w-24 sm:w-28 md:w-32 object-contain" />
                </div>
            </section>
        </>
    )
}

export default Banner