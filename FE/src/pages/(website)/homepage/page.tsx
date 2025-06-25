//React
import { useEffect, useState } from 'react';
import Banner from './_components/Banner';
import Categories from './_components/Categories';
import Evaluate from './_components/Evaluate';
import Products from './_components/Products';

const HomePage = () => {
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handdleResize = () => {
            setScreenWidth(window.innerWidth)
        }

        window.addEventListener('resize', handdleResize);

        return () => window.removeEventListener('resize', handdleResize);
    }, [])

    return (
        <>
            <Banner />
            <Products />
            <Categories />
            <Evaluate screenWidth={screenWidth} />
        </>
    )
}

export default HomePage