//Image
import ProductsList from '@/components/ProductsList';

const Products = () => {
    return (
        <>
            <section className='flex justify-center'>
                <div className='w-full max-w-[1920px] defaultPadding'>
                    <ProductsList caption='NEW ARRIVALS' className='pt-[72px]' />
                </div>
            </section>
            <section className='h-[2px] w-full flex justify-center items-center my-[64px]'>
                <div className='w-full max-w-[1920px] defaultPadding'>
                    <div className='bg-primary/10 h-[1px] w-full'></div>
                </div>
            </section>
            <section className='flex justify-center'>
                <div className='w-full max-w-[1920px] defaultPadding'>
                    <ProductsList caption='Top selling' className='' />
                </div>
            </section>
        </>
    )
}

export default Products