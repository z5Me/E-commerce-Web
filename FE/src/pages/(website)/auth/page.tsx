import { Outlet } from "react-router"

const AuthPage = () => {
    return (
        <div className='w-screen h-screen bg-white grid place-items-center'>
            <div className='w-full max-w-[1920px] h-full font-Satoshi grid grid-cols-1 place-items-center gap-10 justify-center items-center defaultPadding'>
                <Outlet />
            </div>
        </div>
    )
}

export default AuthPage