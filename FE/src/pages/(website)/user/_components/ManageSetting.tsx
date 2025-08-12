import useScreenWidth from '@/common/hooks/useScreenWidth';
import { ArrowRight } from 'lucide-react';
import React, { useCallback, useEffect, useRef } from 'react';
import { Link } from 'react-router';

type ManageSettingProps = {
    openAccountManage: boolean;
    setOpenAccountManage: (value: boolean) => void;
    avatar: string;
    columns: any
}

const ManageSetting = ({ ...props }: ManageSettingProps) => {
    const {
        openAccountManage,
        setOpenAccountManage,
        avatar,
        columns
    } = props;

    const divParent = useRef<HTMLDivElement>(null);
    const divChildren = useRef<HTMLDivElement>(null);
    const screenWidth = useScreenWidth();

    const handleCloseAccountManage = useCallback((event: MouseEvent) => {
        if (divChildren.current && !divChildren.current.contains(event.target as Node)) {
            setOpenAccountManage(false);
        }
    }, []);


    useEffect(() => {
        if (openAccountManage && screenWidth < 768) {
            document.body.classList.add('overflow-hidden', 'relative');

            divParent.current?.classList.remove('hidden');
            divParent.current?.classList.add('absolute', 'pt-[12%]', 'bg-primary/20', 'inset-0', 'z-50');

            divChildren.current?.classList.add('h-screen');

            setTimeout(() => {
                divChildren.current?.classList.remove('mt-[200%]');
                divChildren.current?.classList.add('mt-0');
            }, 1);

            setTimeout(() => {
                document.addEventListener('click', handleCloseAccountManage);
            }, 2);
        } else {
            setOpenAccountManage(false);
            divChildren.current?.classList.remove('mt-0');
            divChildren.current?.classList.add('mt-[200%]');

            setTimeout(() => {
                document.body.classList.remove('overflow-hidden', 'relative');

                divParent.current?.classList.remove('absolute', 'bg-primary/20', 'pt-[12%]', 'inset-0', 'z-50');
                divParent.current?.classList.add('hidden');

                divChildren.current?.classList.remove('h-screen');
            }, 300);
        }

        return () => {
            document.removeEventListener('click', handleCloseAccountManage);
        }
    }, [openAccountManage, screenWidth]);

    return (
        <div ref={divParent} className='hidden md:flex flex-col'>
            <div
                ref={divChildren}
                className='flex flex-col gap-6 md:p-0 p-4 bg-white md:mt-0 mt-[200%] transition-all duration-300'
                onClick={(e) => e.stopPropagation()}
            >
                <div className='flex gap-2'>
                    <img className='w-10 h-10 rounded-full' src={avatar || 'https://avatars.githubusercontent.com/u/124599?v=4'} alt="Avatar" />
                    <div className='flex flex-col justify-between truncate'>
                        <p className='font-semibold truncate text-sm sm:text-base'>xinphepgiauten456</p>
                        <span className='text-primary/50 text-xs sm:text-sm truncate'>xinphepgiauten456@gmail.com</span>
                    </div>
                </div>
                <div className='w-full h-[1px] bg-primary/20'></div>
                {columns.map((column: any) => (
                    <div key={column.title} className='flex flex-col gap-3'>
                        <p className='font-semibold text-sm sm:text-base'>{column.title}</p>
                        <div className='border border-primary/10 rounded-[10px] overflow-hidden'>
                            {column.items.map((item: any) => (
                                <React.Fragment key={item.name}>
                                    <Link to={item.url}>
                                        <button className='flex justify-between items-center text-sm sm:text-base px-4 py-2 gap-2 bg-white hover:bg-primary/5 cursor-pointer w-full lg:min-w-[300px]'>
                                            <item.icon size={18} />
                                            <div className='flex-1 flex'>
                                                <p>{item.name}</p>
                                            </div>
                                            <ArrowRight size={18} />
                                        </button>
                                    </Link>
                                </React.Fragment>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ManageSetting