import { Archive, ArrowDownUp, ChevronRight, CircleUserRound, Heart, MessageCircleQuestion, MessagesSquare } from 'lucide-react';
import { useEffect, useState } from 'react';
import { shallowEqual, useSelector } from 'react-redux';

import { useDialog } from '@/contexts/DialogContext';
import { useLoading } from '@/contexts/LoadingScreen';
import { useAppDispatch } from '@/store/store';
import { Outlet, useLocation, useNavigate } from 'react-router';
import ManageSetting from './_components/ManageSetting';

const columns = [
    {
        title: 'Manage',
        items: [
            {
                name: 'My orders',
                url: '/user/order',
                icon: Archive
            },
            {
                name: 'My Wishlist',
                url: '1',
                icon: Heart
            }
        ]
    },
    {
        title: 'Setting',
        items: [
            {
                name: 'Profile',
                url: '/user/profile',
                icon: CircleUserRound
            },
            {
                name: 'Feedback',
                url: '2',
                icon: MessageCircleQuestion
            }
        ]
    },
    {
        title: 'Others',
        items: [
            {
                name: 'FAQ',
                url: '3',
                icon: MessagesSquare
            }
        ]
    }
]

const UserPage = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    //Use for Account Setting
    const [openAccountManage, setOpenAccountManage] = useState<boolean>(false);

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

    // useEffect(() => {
    //     if (!dataUser || !dataUser._id) {
    //         dispatch(reSignIn()).unwrap().then().catch(() => {
    //             toast.warning('Phiên đăng nhập đã hết hạn!');
    //             showDialog({
    //                 title: 'Rời khỏi trang?',
    //                 description: 'Bạn cần đăng nhập để tiếp tục chỉnh sửa!',
    //                 onConfirm() {
    //                     navigate('/auth');
    //                 },
    //                 onCancel() {
    //                     navigate('/');
    //                 },
    //             })
    //         })
    //     }
    // }, [dataUser]);

    const urlWeb = useLocation().pathname;
    const [itemName, setItemName] = useState<string>('');

    useEffect(() => {
        let findItemsIndex = -1;
        const findTitleIndex = columns.findIndex((column: any) => (
            column.items.some((item: any) => item.url === urlWeb)
        ));

        if (findTitleIndex !== -1) {
            findItemsIndex = columns[findTitleIndex].items.findIndex((item: any) => (
                item.url = urlWeb
            ))

        }

        if (findTitleIndex !== -1 && findItemsIndex !== -1) {
            const name = columns[findTitleIndex].items[findItemsIndex].name;
            if (name) return setItemName(name);
        }

        return;
    }, [urlWeb]);

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
                                <p>{itemName}</p>
                            </div>
                        </div>
                    </div>
                    <div className='flex gap-6 sm:gap-12 font-MJSatoshi overflow-hidden'>
                        <ManageSetting
                            openAccountManage={openAccountManage}
                            setOpenAccountManage={setOpenAccountManage}
                            avatar={dataUser?.avatar}
                            columns={columns}
                        />
                        <div className='w-full flex flex-col gap-4 pb-12'>
                            <div className='flex md:hidden justify-end'>
                                <div onClick={() => setOpenAccountManage(true)} className='flex gap-2 items-center border py-1 px-2 rounded-sm cursor-pointer'>
                                    <ArrowDownUp
                                        size={16}
                                    />
                                    <p className='text-sm'>Setting</p>
                                </div>
                            </div>
                            <div className='py-2'>
                                <Outlet />
                            </div>
                        </div>
                    </div>
                </div >
            </section >
        </>
    )
}

export default UserPage