import { ChevronRight } from 'lucide-react';
import { useEffect, useState } from 'react';
import { shallowEqual, useSelector } from 'react-redux';
//interface
import AccountSetting from './_components/AccountSetting';
import ManageSetting from './_components/ManageSetting';

const UserPage = () => {
    //Use for Account Setting
    const [openEdit, setOpenEdit] = useState<boolean>(false);
    const [openAccountManage, setOpenAccountManage] = useState<boolean>(false);
    const [openAddAddress, setOpenAddAddress] = useState<boolean>(false);

    //data of user in redux
    const dataUser = useSelector((state: any) => state.user.dataUser, shallowEqual);

    //Loading screen when call API
    const userStatus = useSelector((state: any) => state.user.status, shallowEqual);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    useEffect(() => {
        const loading = ['saveUserInformation.pending', 'saveAddress.pending'].includes(userStatus);
        setIsLoading((prev) => {
            if (prev !== loading) return loading;
            return prev;
        });
    }, [userStatus]);

    return (
        <>
            {isLoading && (
                <div className="fixed inset-0 bg-black/30 z-[9999] pointer-events-auto cursor-wait grid place-items-center">
                    <div className="loaderSpinner" />
                </div>
            )}
            <section className='flex justify-center'>
                <div className='w-full max-w-[1920px] defaultPadding min-h-[200px] flex flex-col'>
                    {/* điều hướng */}
                    <div className='w-full flex flex-col gap-6 mb-9'>
                        <div className='h-[1px] w-full bg-primary/10'></div>
                        <div className='flex lg:gap-3 gap-[6px]'>
                            <div className='flex gap-1 items-center font-Satoshi lg:text-base text-sm text-primary/60'>
                                <p>Home</p>
                                <ChevronRight size={18} />
                            </div>
                            <div className='flex gap-1 items-center font-Satoshi lg:text-base text-sm text-primary'>
                                <p>My Account</p>
                                {/* <ChevronRight size={18} /> */}
                            </div>
                        </div>
                    </div>
                    <div className='flex gap-6 sm:gap-12 font-Satoshi overflow-hidden'>
                        <ManageSetting openAccountManage={openAccountManage} avatar={dataUser?.avatar} />
                        <AccountSetting
                            openAccountManage={openAccountManage}
                            setOpenAccountManage={setOpenAccountManage}
                            openEdit={openEdit}
                            setOpenEdit={setOpenEdit}
                            openAddAddress={openAddAddress}
                            setOpenAddAddress={setOpenAddAddress}
                            dataUser={dataUser}
                        />
                    </div>
                </div >
            </section >
        </>
    )
}

export default UserPage