// Icons
import { ChevronDown, CircleUserRound, Menu, Search, ShoppingCart, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

//Image
import Logo from '@/assets/logo.svg';

//React
import { Link } from 'react-router';

const Header = () => {
    const [openMenu, setOpenMenu] = useState<boolean>(false);
    const smallMenuRef = useRef<HTMLDivElement>(null);
    const smallMenuChildrenRef = useRef<HTMLDivElement>(null);
    const [openSearch, setOpenSearch] = useState<boolean>(false);
    const inputSearchRef = useRef<HTMLInputElement>(null);
    const navRef = useRef<HTMLElement>(null);
    const headerRef = useRef<HTMLHeadElement>(null);

    useEffect(() => {
        if (openSearch === true) {
            navRef.current?.classList.remove('flex');
            navRef.current?.classList.add('hidden');
            return;

        } else {
            setTimeout(() => {
                navRef.current?.classList.remove('hidden');
                navRef.current?.classList.add('flex');
                return;
            }, 300)
        }
    }, [openSearch])

    useEffect(() => {
        if (openMenu) {
            window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
            document.body.classList.add('overflow-hidden');
            smallMenuRef.current?.classList.remove('hidden');
            smallMenuRef.current?.classList.add('flex');
            headerRef.current?.classList.add('relative');
            headerRef.current?.classList.add('z-10');
            setTimeout(() => {
                smallMenuChildrenRef.current?.classList.remove('w-0')
                smallMenuChildrenRef.current?.classList.add('w-1/2');
            }, 1)

            return;
        } else {
            smallMenuChildrenRef.current?.classList.remove('w-1/2')
            smallMenuChildrenRef.current?.classList.add('w-0');
            setTimeout(() => {
                smallMenuRef.current?.classList.remove('flex');
                smallMenuRef.current?.classList.add('hidden');
                headerRef.current?.classList.remove('relative');
                headerRef.current?.classList.remove('z-10');
                document.body.classList.remove('overflow-hidden');
            }, 150)
        }
    }, [openMenu]);

    return (
        <>
            <section className='FIRST_TIME_SIGN_UP bg-primary text-white font-Satoshi flex select-none text-xs sm:text-sm py-[9px] defaultPadding'>
                <p className='flex-1 text-center font-light'>Sign up and get 20% off to your first order. <span className='font-normal underline underline-offset-4 cursor-pointer'>Sign Up Now</span></p>
                <X className='hidden sm:inline' />
            </section>
            <header ref={headerRef} className='bg-white defaultPadding py-6 select-none'>
                <div className='NAV flex justify-between items-center lg:gap-x-10 gap-x-4 z-10'>
                    <button
                        onClick={() => setOpenMenu(!openMenu)}
                        className='inline md:hidden cursor-pointer'
                    >
                        <Menu />
                    </button>
                    <div className='LOGO cursor-pointer flex md:flex-none flex-1'>
                        <Link to={''} >
                            <img className='' src={Logo} alt="Logo" />
                        </Link>
                    </div>
                    <nav ref={navRef} className={`flex justify-center transition-all duration-1000`}>
                        <ul className='md:flex hidden lg:gap-x-6 gap-x-4 *:cursor-pointer *:text-nowrap'>
                            <li className='flex justify-center items-center lg:gap-x-[6px] gap-x-1 group'>
                                <div className='group-hover:underline'>
                                    <Link to=''>Shop</Link>
                                </div>
                                <ChevronDown className='pt-[1px]' size={20} color='#000000' strokeWidth={2} />
                            </li>
                            <li>
                                <div className='transition-all duration-300 hover:underline'>
                                    <Link to=''>On Sale</Link>
                                </div>
                            </li>
                            <li>
                                <div className='hover:underline'>
                                    <Link to=''>New Arrivals</Link>

                                </div>
                            </li>
                            <li>
                                <div className='hover:underline'>
                                    <Link to=''>Brands</Link>
                                </div>
                            </li>
                        </ul>
                    </nav>
                    <div className='SEARCH bg-[#F0F0F0] flex-1 rounded-full lg:gap-x-[14px] gap-x-2 px-[18px] items-center min-w-[125px] lg:flex hidden'>
                        <Search />
                        <input className='w-full py-3 border-0 outline-0' type="text" placeholder='Search for product...' />
                    </div>
                    <div className={`CART flex items-center justify-end gap-x-[14px] ${openSearch === true ? 'w-full' : 'w-[100px] lg:w-auto'} transition-all duration-500 lg:self-auto self-end`}>
                        <button
                            onClick={() => setOpenSearch(!openSearch)}
                            className={`SEARCH transition-all duration-500 ${openSearch === true ? 'bg-[#F0F0F0] gap-x-2 px-[18px] w-full' : 'bg-transparent gap-x-0 px-0 w-6'} flex lg:hidden items-center rounded-full`}
                        >
                            <Search className='lg:hidden flex cursor-pointer' />
                            <input
                                ref={inputSearchRef}
                                onClick={(e) => e.stopPropagation()}
                                className={`${openSearch === true ? 'w-full' : 'w-0'} transition-all duration-500 py-3 border-0 outline-0`}
                                type="text"
                                placeholder='Search for product...'
                            />
                        </button>
                        <div className='block cursor-pointer'>
                            <ShoppingCart />
                        </div>
                        <div className='block cursor-pointer'>
                            <CircleUserRound />
                        </div>

                    </div>
                </div>
            </header >
            {/* Menu con */}
            < div
                ref={smallMenuRef}
                onClick={() => setOpenMenu(!openMenu)}
                className={`${openMenu ? 'z-20' : '-z-10'} cursor-pointer w-full left-0 absolute top-0 transition-all duration-300 bg-white/50 backdrop-blur-xs h-screen overflow-hidden`}
            >
                <div
                    ref={smallMenuChildrenRef}
                    onClick={(e) => e.stopPropagation()}
                    className={`${openMenu ? 'bg-white z-30' : 'bg-transparent -z-10'} w-0 transition-all duration-300 h-screen px-4 py-6 shadow-2xl`}
                >
                    <button onClick={() => setOpenMenu(false)}>
                        <X />
                    </button>
                </div>
            </div >
        </>
    )
}

export default Header