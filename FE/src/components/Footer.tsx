// Icons
import { Facebook, Github, Instagram, Twitter } from 'lucide-react';
//Image
import Logo from '@/assets/logo.svg';

const Footer = () => {
    return (
        <>
            <footer>
                <div className='bg-[#F0F0F0] py-[50px] defaultPadding'>
                    <div className='lg:flex grid grid-cols-2 lg:gap-12 gap-6 justify-between'>
                        <div className='flex flex-col justify-between lg:gap-y-[35px] gap-y-5 col-span-full'>
                            <div className='flex flex-col lg:gap-y-[25px] gap-y-[14px]'>
                                <img className='max-w-[167px] max-h-[32px]' src={Logo} alt="Logo" />
                                <p className='text-sm font-Satoshi text-primary/60 lg:max-w-[248px] w-full'>
                                    We have clothes that suits your style and which you’re proud to wear. From women to men.
                                </p>
                            </div>
                            <div className='flex gap-x-3'>
                                <div className='rounded-full border border-primary/20 buttonWhite p-2'>
                                    <Twitter />
                                </div>
                                <div className='rounded-full border border-primary/20 buttonWhite p-2'>
                                    <Facebook />
                                </div>
                                <div className='rounded-full border border-primary/20 buttonWhite p-2'>
                                    <Instagram />
                                </div>
                                <div className='rounded-full border border-primary/20 buttonWhite p-2'>
                                    <Github />
                                </div>
                            </div>
                        </div>
                        <div className='flex flex-col lg:gap-y-[25px] gap-y-4'>
                            <p className='uppercase font-Satoshi font-medium lg:text-base text-sm tracking-[3px]'>company</p>
                            <div className='flex flex-col justify-between lg:gap-y-0 gap-y-4 lg:text-base text-sm text-primary/60 h-full *:hover:underline *:cursor-pointer'>
                                <p>About</p>
                                <p>Features</p>
                                <p>Works</p>
                                <p>Career</p>
                            </div>
                        </div>
                        <div className='flex flex-col lg:gap-y-[25px] gap-y-4'>
                            <p className='uppercase font-Satoshi font-medium lg:text-base text-sm tracking-[3px]'>help</p>
                            <div className='flex flex-col justify-between lg:gap-y-0 gap-y-4 lg:text-base text-sm text-primary/60 h-full *:hover:underline *:cursor-pointer'>
                                <p>Customer Support</p>
                                <p>Delivery Details</p>
                                <p>Terms & Conditions</p>
                                <p>Privacy Policy</p>
                            </div>
                        </div>
                        <div className='flex flex-col lg:gap-y-[25px] gap-y-4'>
                            <p className='uppercase font-Satoshi font-medium lg:text-base text-sm tracking-[3px]'>FAQ</p>
                            <div className='flex flex-col justify-between lg:gap-y-0 gap-y-4 lg:text-base text-sm text-primary/60 h-full *:hover:underline *:cursor-pointer'>
                                <p>Account</p>
                                <p>Manage Deliveries</p>
                                <p>Orders</p>
                                <p>Payments</p>
                            </div>
                        </div>
                        <div className='flex flex-col lg:gap-y-[25px] gap-y-4'>
                            <p className='uppercase font-Satoshi font-medium lg:text-base text-sm tracking-[3px]'>resources</p>
                            <div className='flex flex-col justify-between lg:gap-y-0 gap-y-4 lg:text-base text-sm text-primary/60 h-full *:hover:underline *:cursor-pointer'>
                                <p>Free eBooks</p>
                                <p>Development Tutorial</p>
                                <p>How to - Blog</p>
                                <p>Youtube Playlish</p>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    )
}

export default Footer