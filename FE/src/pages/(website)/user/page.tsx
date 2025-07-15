import { AlignJustify, Archive, ArrowRight, ChevronRight, CircleUserRound, Heart, MessageCircleQuestion, MessagesSquare, PanelsTopLeft, Save, UserRoundPen, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

const UserPage = () => {
    const [openEdit, setOpenEdit] = useState<boolean>(false);
    const [openAccountManage, setOpenAccountManage] = useState<boolean>(false);

    const divParent = useRef<HTMLDivElement>(null);
    const divChildren = useRef<HTMLDivElement>(null)
    useEffect(() => {
        if (openAccountManage) {
            window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });

            document.body.classList.add('overflow-hidden');
            document.body.classList.add('relative');

            divParent.current?.classList.add('absolute')
            divParent.current?.classList.add('bg-primary/20')
            divParent.current?.classList.add('pt-[12%]')
            divParent.current?.classList.add('inset-0')
            divParent.current?.classList.add('z-50')

            divParent.current?.classList.remove('hidden')

            divChildren.current?.classList.add('h-screen')
            divChildren.current?.classList.add('pt-4')
        } else {
            document.body.classList.remove('overflow-hidden');
            document.body.classList.remove('relative');

            divParent.current?.classList.remove('absolute')
            divParent.current?.classList.remove('bg-primary/20')
            divParent.current?.classList.remove('pt-[12%]')
            divParent.current?.classList.remove('inset-0')
            divParent.current?.classList.remove('z-50')

            divParent.current?.classList.add('hidden')

            divChildren.current?.classList.remove('h-screen')
            divChildren.current?.classList.remove('pt-4')
        }
    }, [openAccountManage])

    return (
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
                    <div ref={divParent} className='hidden md:flex flex-col'>
                        <div ref={divChildren} className='flex flex-col gap-6 bg-white'>
                            <div className='flex gap-2'>
                                <img className='w-10 h-10 rounded-full' src={'https://avatars.githubusercontent.com/u/124599?v=4'} alt="Avatar" />
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
                    <div className='w-full flex flex-col gap-4 pb-12'>
                        <div className='flex items-center justify-between'>
                            <div className='flex flex-col'>
                                <h1 className='text-base sm:text-lg font-bold'>Account settings</h1>
                                <p className='text-sm sm:text-base text-gray-500'>Manage your account</p>
                            </div>
                            <AlignJustify onClick={() => setOpenAccountManage(!openAccountManage)} className='block md:hidden cursor-pointer' />
                        </div>
                        <div className='w-full h-[1px] bg-primary/20'></div>
                        <div className='py-2'>
                            <form className='flex flex-col gap-3 lg:gap-6 w-full text-sm sm:text-base'>
                                <div className='flex justify-center'>
                                    <div className='group flex flex-col items-center gap-2'>
                                        <img className='rounded-full w-[70px] sm:w-[100px]' src={'https://avatars.githubusercontent.com/u/124599?v=4'} alt="Avatar" />
                                        {openEdit &&
                                            <div className='flex *:cursor-pointer'>
                                                <label htmlFor="fileUpload" className='text-sm sm:text-base border border-gray-200 rounded-[6px] px-3 sm:px-4 py-1 bg-gray-200 hover:bg-gray-300'>Choose file</label>
                                                <input className='hidden' type="file" id="fileUpload" />
                                            </div>
                                        }
                                    </div>
                                </div>
                                <div className='flex flex-col lg:flex-row gap-3 lg:gap-8 w-full'>
                                    <div className='flex flex-col w-full gap-1'>
                                        <label htmlFor="userName">Login name</label>
                                        <input
                                            disabled={!openEdit}
                                            id='userName'
                                            type="text"
                                            className='bg-gray-50 border border-gray-300 rounded-lg text-primary disabled:text-gray-600 px-3 sm:px-4 py-2'
                                            defaultValue='xinphepgiauten456'
                                        />
                                        <span className='text-sm text-gray-400'>Login name can only be changed once.</span>
                                    </div>
                                    <div className='flex flex-col w-full gap-1'>
                                        <label htmlFor="userNameFile">Name</label>
                                        <input disabled={!openEdit} id='userNameFile' type="text" className='bg-gray-50 border border-gray-300 rounded-lg text-primary disabled:text-gray-600 px-3 sm:px-4 py-2' defaultValue='xinphepgiauten' />
                                    </div>
                                </div>
                                <div className='flex flex-col lg:flex-row gap-3 lg:gap-8 w-full'>
                                    <div className='flex flex-col w-full gap-1'>
                                        <label htmlFor="email">Email</label>
                                        <input disabled={!openEdit} id='email' type="text" className='bg-gray-50 border truncate border-gray-300 rounded-lg text-primary disabled:text-gray-600 px-3 sm:px-4 py-2' defaultValue='xinphepgiauten456@gmail.com' />
                                    </div>
                                    <div className='flex flex-col w-full gap-1'>
                                        <label htmlFor="phone">Phone</label>
                                        <input disabled={!openEdit} id='phone' type="text" className='bg-gray-50 border border-gray-300 rounded-lg text-primary disabled:text-gray-600 px-3 sm:px-4 py-2' defaultValue='0876554987' />
                                    </div>
                                </div>
                                <div className='flex flex-col lg:flex-row gap-3 lg:gap-8 w-full'>
                                    <div className='flex flex-col w-full gap-1'>
                                        <label htmlFor="gender">Gender</label>
                                        <div className='flex gap-4 py-2'>
                                            <div className='flex items-center gap-[6px]'>
                                                <input disabled={!openEdit} checked type="radio" id='male' name='default_raido' className='w-4 h-4 focus:bg-primary text-primary' />
                                                <label htmlFor="male">Male</label>
                                            </div>
                                            <div className='flex items-center gap-[6px]'>
                                                <input disabled={!openEdit} type="radio" id='female' name='default_raido' className='w-4 h-4' />
                                                <label htmlFor="female">Female</label>
                                            </div>
                                            <div className='flex items-center gap-[6px]'>
                                                <input disabled={!openEdit} type="radio" id='other' name='default_raido' className='w-4 h-4' />
                                                <label htmlFor="other">Other</label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='flex flex-col w-full gap-1'>
                                        <label htmlFor="birthday">Birthday</label>
                                        <input disabled={!openEdit} id='birthday' type="date" className='bg-gray-50 border border-gray-300 rounded-lg text-primary disabled:text-gray-600 px-3 sm:px-4 py-2' />
                                    </div>
                                </div>
                                <div className='flex flex-col w-full gap-1'>
                                    <label htmlFor="address">Address</label>
                                    <input disabled={!openEdit} id='address' type="text" className='bg-gray-50 border truncate border-gray-300 rounded-lg text-primary disabled:text-gray-600 px-3 sm:px-4 py-2' defaultValue='xinphepgiauten456@gmail.com' />
                                </div>
                                <div className='flex items-center justify-end gap-3 mt-4 lg:mt-0'>
                                    {!openEdit ?
                                        <button
                                            className='flex items-center gap-1 px-3 py-1 border border-primary bg-primary hover:bg-white text-white hover:text-primary rounded-[6px] cursor-pointer'
                                            onClick={(e) => { e.preventDefault(); setOpenEdit(true) }}
                                        >
                                            <UserRoundPen size={16} />
                                            <p className='text-base'>Edit</p>
                                        </button>
                                        :
                                        <>
                                            <button
                                                className='flex items-center gap-1 px-3 py-1 border border-primary bg-primary hover:bg-white text-white hover:text-primary rounded-[6px] cursor-pointer'
                                                onClick={(e) => { e.preventDefault(); setOpenEdit(false) }}
                                            >
                                                <Save size={16} />
                                                <p className='text-base'>Save</p>
                                            </button>
                                            <button
                                                className='flex items-center gap-1 px-3 py-1 border border-danger bg-danger hover:bg-white text-white hover:text-danger rounded-[6px] cursor-pointer'
                                                onClick={(e) => { e.preventDefault(); setOpenEdit(false) }}
                                            >
                                                <X size={16} />
                                                <p className='text-base'>Cancel</p>
                                            </button>
                                        </>
                                    }
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default UserPage