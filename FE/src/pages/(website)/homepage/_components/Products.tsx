//Image
import ProductsList from '@/components/ProductsList';

const Products = () => {
    return (
        <>
            <section>
                <ProductsList caption='NEW ARRIVALS' className='pt-[72px] defaultPadding' />
            </section>
            <section className='h-[2px] w-full defaultPadding flex justify-center items-center my-[64px]'>
                <div className='bg-primary/10 h-[1px] w-full'></div>
            </section>
            <section>
                <ProductsList caption='Top selling' className='defaultPadding' />
            </section>
        </>
    )
}

export default Products