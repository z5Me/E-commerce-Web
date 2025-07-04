//Icons
import { ChevronRight } from 'lucide-react';

//Components
import Casual from './_components/Casual';
import Filter from './_components/Filter';

import { useEffect, useState } from 'react';


const CategoryPage = () => {
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handdleResize = () => {
            setScreenWidth(window.innerWidth)
        }

        window.addEventListener('resize', handdleResize);

        return () => window.removeEventListener('resize', handdleResize);
    }, [])

    //Scroll to top
    useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }, []);

    const [openFilter, setOpenFilter] = useState<boolean>(false);

    return (
        <section className='flex justify-center pb-[80px]'>
            <div className='max-w-[1920px] w-full defaultPadding'>
                {/* điều hướng */}
                <div className='w-full flex flex-col gap-6 mb-9'>
                    <div className='h-[1px] w-full bg-primary/10'></div>
                    <div className='flex lg:gap-3 gap-[6px]'>
                        <div className='flex gap-1 items-center font-Satoshi lg:text-base text-sm text-primary/60'>
                            <p>Home</p>
                            <ChevronRight size={18} />
                        </div>
                        <div className='flex gap-1 items-center font-Satoshi lg:text-base text-sm text-primary'>
                            <p>Casual</p>
                            {/* <ChevronRight size={18} /> */}
                        </div>
                    </div>
                </div>
                <div className='grid lg:grid-cols-[300px_auto] grid-cols-1 grid-rows-1 gap-x-5'>
                    {/* Filter  */}
                    <Filter screenWidth={screenWidth} openFilter={openFilter} setOpenFilter={setOpenFilter} />

                    {/* Casual  */}
                    <Casual screenWidth={screenWidth} openFilter={openFilter} setOpenFilter={setOpenFilter} />
                </div>
            </div>
        </section>
    )
}

export default CategoryPage