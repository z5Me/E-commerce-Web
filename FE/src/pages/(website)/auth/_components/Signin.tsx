import Logo from '@/assets/logo.svg';

import { FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

import { Link, useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch } from '@/store/store';
import { useEffect, useState } from 'react';
import { signIn } from '@/store/thunks/userThunk';
import { resetStatus } from '@/store/slices/userSlice';

const Signin = () => {
    const { register, handleSubmit, formState: { errors }, watch } = useForm();
    const email = watch('email');
    const emailFilled = email?.trim();
    const password = watch('password');
    const passwordFilled = password?.trim();

    const dispatch = useDispatch<AppDispatch>();
    const userState = useSelector((state: any) => state.user.status);

    // console.log(userState);

    const onSubmit = (data: any) => {
        // console.log('data: ', data)
        // console.log('userState: ', userState)
        if (isLoading) return;
        dispatch(signIn(data));
    }

    const navigate = useNavigate();
    useEffect(() => {
        if (!userState) return;

        if (userState === 'signIn.fulfilled') {
            setTimeout(() => {
                dispatch(resetStatus());
            }, 1000)
            navigate('/');
        }
    }, [userState]);

    const [isLoading, setIsLoading] = useState<boolean>(false);
    useEffect(() => {
        if (['signIn.pending', 'signIn.fulfilled'].includes(userState)) {
            // console.log('chạy vào đây', userState)
            setIsLoading(true);
        } else {
            setIsLoading(false)
        }
        return;
    }, [userState])


    return (
        <>
            {isLoading && (
                <div className="fixed inset-0 bg-black/30 z-[9999] pointer-events-auto cursor-wait grid place-items-center">
                    <div className="loaderSpinner" />
                </div>
            )}

            <div className='flex flex-col justify-between items-center md:gap-y-10 gap-y-5 w-full h-full'>
                <div className='mt-[4%]'>
                    <img src={Logo} alt="logo" />
                </div>
                <div className='flex-1 grid place-items-center'>
                    <div className='flex flex-col items-center gap-8'>
                        <h1 className='font-bold text-3xl'>Welcome Back</h1>
                        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4'>
                            <div className='relative *:rounded-[5px]'>
                                <input {...register('email', {
                                    required: 'Cannot be left blank',
                                    pattern: {
                                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, // regex kiểm tra định dạng email
                                        message: 'Email is not valid'
                                    }
                                })}
                                    id='email' type="email"
                                    className={`${errors?.email ? 'outline-danger border-danger border' : 'focus:outline-primary border border-gray-300'} disabled:bg-gray-50 px-4 peer z-10 py-2 min-w-[320px]`} />
                                <label
                                    htmlFor="email"
                                    className={`absolute cursor-text transition-all duration-300 ${errors?.email ? 'text-danger' : emailFilled ? 'text-primary' : 'text-gray-500 peer-focus:text-primary'} top-1/2 ${emailFilled ? 'left-0' : 'left-2 peer-focus:left-0'} ${emailFilled ? '-translate-y-[130%]' : '-translate-y-1/2 peer-focus:-translate-y-[130%]'} px-2 ${emailFilled ? 'scale-75' : 'peer-focus:scale-75 scale-100'} ${email ? 'bg-white' : 'bg-transparent peer-focus:bg-white'}`}
                                >
                                    Email address
                                </label>
                            </div>
                            {errors?.email && <p className='text-danger text-sm'>*{errors.email.message?.toString()}</p>}
                            <div className='relative *:rounded-[5px]'>
                                <input {...register('password', {
                                    required: 'Cannot be left blank',
                                    minLength: {
                                        value: 6,
                                        message: 'At least 6 characters'
                                    }
                                })}
                                    id='password' type="password"
                                    className={` ${errors?.password ? 'border border-danger outline-danger' : 'focus:outline-primary border border-gray-300'}  px-4 peer z-10 py-2 min-w-[320px]`}
                                />
                                <label
                                    htmlFor="password"
                                    className={`absolute cursor-text transition-all duration-300 ${errors?.password ? 'text-danger' : passwordFilled ? 'text-primary' : 'peer-focus:text-primary text-gray-500'} top-1/2 ${passwordFilled ? 'left-[1%]' : 'peer-focus:left-[1%] left-2'} ${passwordFilled ? '-translate-y-[130%]' : 'peer-focus:-translate-y-[130%] -translate-y-1/2'} px-2 ${passwordFilled ? 'scale-75' : 'peer-focus:scale-75 scale-100'} z-20 ${passwordFilled ? 'bg-white' : 'peer-focus:bg-white bg-transparent'}`}
                                >
                                    Password
                                </label>
                            </div>
                            {errors?.password && <p className='text-danger text-sm'>*{errors.password.message?.toString()}</p>}
                            <button
                                disabled={isLoading}
                                className='bg-primary text-white flex items-center justify-center border rounded-[5px] py-[10px] cursor-pointer mt-4 disabled:opacity-50 disabled:cursor-not-allowed'
                            >
                                {isLoading
                                    ?
                                    <div className="loader" />
                                    :
                                    <p>Submit</p>
                                }
                            </button>
                            <div className='text-base text-center'>
                                <p>Don't have an account? <Link to={'/auth/signup'}> <span className='font-bold underline cursor-pointer'>Sign up</span> </Link></p>
                            </div>
                            <p className='text-center w-full flex my-4 items-center justify-center text-xs before:content-[""] before:inline-block before:h-[2px] before:flex-1 before:mr-4 before:bg-[#C3C8CF] after:content-[""] after:inline-block after:h-[2px] after:flex-1 after:bg-[#C3C8CF] after:ml-4'>OR</p>
                            <div className='border border-gray-300 bg-transparent hover:bg-gray-100 cursor-pointer rounded-[5px] flex gap-4 font-medium px-4 py-3'>
                                <FaFacebook size={24} color='#4285F4' className='bg-white rounded-full' />
                                <p>Continue with Facebook</p>
                            </div>
                            <div className='border border-gray-300 bg-transparent hover:bg-gray-100 cursor-pointer rounded-[5px] flex gap-4 font-medium px-4 py-3'>
                                <FcGoogle size={24} />
                                <p>Continue with Google</p>
                            </div>
                            <div className='border border-gray-300 bg-transparent hover:bg-gray-100 cursor-pointer rounded-[5px] flex gap-4 font-medium px-4 py-3'>
                                <FaGithub size={24} className='bg-white rounded-full' />
                                <p>Continue with Github</p>
                            </div>
                        </form>
                    </div>
                </div >
            </div >
        </>
    )
}

export default Signin