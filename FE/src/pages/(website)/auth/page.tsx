import { useLoading } from "@/contexts/LoadingScreen"
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router"

const AuthPage = () => {
    const { show, hide } = useLoading();
    const userStatus = useSelector((state: any) => state.user.status);

    useEffect(() => {
        if (userStatus && userStatus === 'pending') {
            show();
            return;
        }
        return hide();
    }, [userStatus]);

    return (
        <div className='w-screen h-screen bg-white grid place-items-center'>
            <div className='w-full max-w-[1920px] h-full font-MJSatoshi grid grid-cols-1 place-items-center gap-10 justify-center items-center defaultPadding'>
                <Outlet />
            </div>
        </div>
    )
}

export default AuthPage