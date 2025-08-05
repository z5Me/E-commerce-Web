import { ChevronRight } from 'lucide-react';
import { useEffect, useState } from 'react';
import { shallowEqual, useSelector } from 'react-redux';
//interface
import AccountSetting from './_components/AccountSetting';
import ManageSetting from './_components/ManageSetting';
import { useLoading } from '@/contexts/LoadingScreen';
import { useAppDispatch } from '@/store/store';
import { reSignIn } from '@/store/thunks/userThunk';
import { toast } from 'sonner';
import { useDialog } from '@/contexts/DialogContext';
import { useNavigate } from 'react-router';

const UserPage = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    //Use for Account Setting
    const [openEdit, setOpenEdit] = useState<boolean>(false);
    const [openAccountManage, setOpenAccountManage] = useState<boolean>(false);
    const [openAddAddress, setOpenAddAddress] = useState<boolean>(false);

    //data of user in redux
    const dataUser = useSelector((state: any) => state.user.dataUser, shallowEqual);

    //Loading screen when call API
    const userStatus = useSelector((state: any) => state.user.status, shallowEqual);
    const { show, hide } = useLoading();
    const { showDialog } = useDialog();

    useEffect(() => {
        if (userStatus === 'pending') {
            show();
            return;
        }
        return hide();

    }, [userStatus]);

    useEffect(() => {
        if (!dataUser || !dataUser._id) {
            dispatch(reSignIn()).unwrap().then().catch(() => {
                toast.warning('Phiên đăng nhập đã hết hạn!');
                showDialog({
                    title: 'Rời khỏi trang?',
                    description: 'Bạn cần đăng nhập để tiếp tục chỉnh sửa!',
                    onConfirm() {
                        navigate('/auth');
                    },
                    onCancel() {
                        navigate('/');
                    },
                })
            })
        }
    }, [dataUser])

    return (
        <>
            <section className='flex justify-center'>
                <div className='w-full max-w-[1920px] defaultPadding min-h-[200px] flex flex-col'>
                    {/* điều hướng */}
                    <div className='w-full flex flex-col gap-6 mb-9'>
                        <div className='h-[1px] w-full bg-primary/10'></div>
                        <div className='flex lg:gap-3 gap-[6px]'>
                            <div className='flex gap-1 items-center font-MJSatoshi lg:text-base text-sm text-primary/60'>
                                <p>Home</p>
                                <ChevronRight size={18} />
                            </div>
                            <div className='flex gap-1 items-center font-MJSatoshi lg:text-base text-sm text-primary'>
                                <p>My Account</p>
                                {/* <ChevronRight size={18} /> */}
                            </div>
                        </div>
                    </div>
                    <div className='flex gap-6 sm:gap-12 font-MJSatoshi overflow-hidden'>
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