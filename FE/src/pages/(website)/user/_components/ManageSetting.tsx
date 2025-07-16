import { Archive, ArrowRight, CircleUserRound, Heart, MessageCircleQuestion, MessagesSquare } from 'lucide-react';
import { useEffect, useRef } from 'react';

type ManageSettingProps = {
    openAccountManage: boolean;
    avatar: string;
}

const ManageSetting = ({ ...props }: ManageSettingProps) => {
    const {
        openAccountManage,
        avatar
    } = props;

    const divParent = useRef<HTMLDivElement>(null);
    const divChildren = useRef<HTMLDivElement>(null);
    useEffect(() => {
        if (openAccountManage) {
            document.body.classList.add('overflow-hidden', 'relative');

            divParent.current?.classList.remove('hidden');
            divParent.current?.classList.add('absolute', 'bg-primary/20', 'pt-[12%]', 'inset-0', 'z-50');

            divChildren.current?.classList.add('h-screen', 'pt-4');
        } else {
            document.body.classList.remove('overflow-hidden', 'relative');

            divParent.current?.classList.remove('absolute', 'bg-primary/20', 'pt-[12%]', 'inset-0', 'z-50');
            divParent.current?.classList.add('hidden');

            divChildren.current?.classList.remove('h-screen', 'pt-4');
        }
    }, [openAccountManage])

    return (
        <div ref={divParent} className='hidden md:flex flex-col'>
            <div ref={divChildren} className='flex flex-col gap-6 bg-white'>
                <div className='flex gap-2'>
                    <img className='w-10 h-10 rounded-full' src={avatar || 'https://avatars.githubusercontent.com/u/124599?v=4'} alt="Avatar" />
                    <div className='flex flex-col justify-between truncate'>
                        <p className='font-semibold truncate text-sm sm:text-base'>xinphepgiauten456</p>
                        <span className='text-primary/50 text-xs sm:text-sm truncate'>xinphepgiauten456@gmail.com</span>
                    </div>
                </div>
                <div className='w-full h-[1px] bg-primary/20'></div>
                <div className='flex flex-col gap-3'>
                    <p className='font-semibold text-sm sm:text-base'>Manage</p>
                    <div className='border border-primary/10 rounded-[10px]'>
                        <button className='flex justify-between items-center text-sm sm:text-base px-4 py-2 gap-2 bg-white hover:bg-primary/5 cursor-pointer w-full md:min-w-[300px] rounded-tl-[10px] rounded-tr-[10px]'>
                            <Archive size={18} />
                            <div className='flex-1 flex'>
                                <p>My orders</p>
                            </div>
                            <ArrowRight size={18} />
                        </button>
                        <button className='flex justify-between items-center text-sm sm:text-base px-4 py-2 gap-2 bg-white hover:bg-primary/5 cursor-pointer w-full md:min-w-[300px] rounded-bl-[10px] rounded-br-[10px]'>
                            <Heart size={18} />
                            <div className='flex-1 flex'>
                                <p>My wishlist</p>
                            </div>
                            <ArrowRight size={18} />
                        </button>
                    </div>
                </div>

                <div className='flex flex-col gap-3'>
                    <p className='font-semibold text-sm sm:text-base'>Settings</p>
                    <div className='border border-primary/10 rounded-[10px]'>
                        <button className='flex justify-between items-center text-sm sm:text-base px-4 py-2 gap-2 bg-primary/5 cursor-pointer w-full md:min-w-[300px] rounded-tl-[10px] rounded-tr-[10px]'>
                            <CircleUserRound size={18} />
                            <div className='flex-1 flex'>
                                <p>Account settings</p>
                            </div>
                            <ArrowRight size={18} />
                        </button>
                        <button className='flex justify-between items-center text-sm sm:text-base px-4 py-2 gap-2 bg-white hover:bg-primary/5 cursor-pointer w-full md:min-w-[300px] rounded-bl-[10px] rounded-br-[10px]'>
                            <MessageCircleQuestion size={18} />
                            <div className='flex-1 flex'>
                                <p>Feedback</p>
                            </div>
                            <ArrowRight size={18} />
                        </button>
                    </div>
                </div>

                <div className='flex flex-col gap-3'>
                    <p className='font-semibold text-sm sm:text-base'>Others</p>
                    <div className='border border-primary/10 rounded-[10px]'>
                        <button className='flex justify-between items-center text-sm sm:text-base px-4 py-2 gap-2 bg-white hover:bg-primary/5 cursor-pointer w-full md:min-w-[300px] rounded-[10px]'>
                            <MessagesSquare size={18} />
                            <div className='flex-1 flex'>
                                <p>FAQ</p>
                            </div>
                            <ArrowRight size={18} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ManageSetting