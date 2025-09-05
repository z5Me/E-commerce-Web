import { Outlet } from 'react-router'

const ConfirmPage = () => {
    return (
        <div className='flex flex-col justify-center items-center md:gap-y-10 gap-y-5 w-screen h-screen sm:p-4 p-1'>
            <Outlet />
        </div >
    )
}

export default ConfirmPage
