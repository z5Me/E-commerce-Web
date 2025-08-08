import Image from '@/assets/404.webp';
import { Button } from '@/components/ui/button';

const NotFoundPage = () => {
    return (
        <div className='h-screen grid justify-center items-center text-center font-MJSatoshi p-4'>
            <div className='h-fit grid gap-4'>
                <img src={Image} alt="Not found Image" className='aspect-square w-full max-w-[500px]' />
                <p className='font-DKLongreach sm:text-7xl text-4xl font-bold'>404 Not Found</p>
                <p className='sm:text-3xl text-base'>Whoops! That page doesn't exist.</p>
                <p className="sm:text-lg text-sm font-light text-gray-500 dark:text-gray-400">Sorry, we can't find that page. You'll find lots to explore on the home page. </p>
                <div className='flex justify-center items-center sm:gap-16 gap-6 *:hover:opacity-95 *:cursor-pointer *:sm:text-base *:text-xs'>
                    <Button>Go back</Button>
                    <Button>Home page</Button>
                </div>
            </div>
        </div>
    )
}

export default NotFoundPage
