import Logo from '@/assets/logo.svg';

import { FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

import { Link, useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch } from '@/store/store';
import { signIn, signUp } from '@/store/thunks/userThunk';
import { useEffect, useState } from 'react';

const Signup = () => {
    const { register, handleSubmit, formState: { errors }, watch } = useForm();
    const email = watch('email');
    const emailFilled = email?.trim();
    const password = watch('password');
    const passwordFilled = password?.trim();
    const confirmPassword = watch('confirmPassword');
    const confirmPasswordFilled = confirmPassword?.trim();

    const dispatch = useDispatch<AppDispatch>();
    const userState = useSelector((state: any) => state.user.status);

    const onSubmit = (data: any) => {
        const name = data.email.split('@')[0];
        const filledData = {
            ...data,
            avatar: 'https://avatars.githubusercontent.com/u/124599?v=4',
            userNameFile: name,
            userName: name,
        }

        const { confirmPassword, ...payload } = filledData;

        dispatch(signUp(payload));
    }

    const navigate = useNavigate();
    useEffect(() => {
        if (!userState) return;

        if (userState === 'signUp.fulfilled') {
            dispatch(signIn({ email: email, password: password }));
            return;
        }

        if (userState === 'signIn.fulfilled') {
            navigate('/');
            return;
        }
    }, [userState]);

    const [isLoading, setIsLoading] = useState<boolean>(false);
    useEffect(() => {
        if (['signIn.pending', 'signIn.fulfilled', 'signUp.pending', 'signUp.fulfilled'].includes(userState)) {
            // console.log('chạy vào đây', userState)
            setIsLoading(true);
        } else {
            setIsLoading(false)
        }
        return;
    }, [userState]);

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
                        <h1 className='font-bold text-3xl'>Welcome</h1>
                        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4'>
                            <div className='relative *:rounded-[5px]'>
                                <input {...register('email', {
                                    required: 'Cannot be left blank',
                                    pattern: {
                                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, // regex kiểm tra định dạng email
                                        message: 'Email is not valid'
                                    }
                                })}
                                    disabled={['signUp.pending', 'signUp.fulfilled', 'signIn.pending'].includes(userState)}
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
                                    disabled={['signUp.pending', 'signUp.fulfilled', 'signIn.pending'].includes(userState)}
                                    id='password' type="text"
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
                            <div className='relative *:rounded-[5px]'>
                                <input {...register('confirmPassword', {
                                    required: 'Cannot be left blank',
                                    validate: (value) => value === password || 'Passwords do not match'

                                })}
                                    disabled={['signUp.pending', 'signUp.fulfilled', 'signIn.pending'].includes(userState)}
                                    id='confirmPassword' type="text"
                                    className={`${errors?.confirmPassword ? 'border border-danger outline-danger' : 'focus:outline-primary border border-gray-300'} px-4 peer z-10 py-2 min-w-[320px] disabled:bg-gray-100 disabled:cursor-not-allowed`}
                                />
                                <label
                                    htmlFor="confirmPassword"
                                    className={`absolute cursor-text transition-all duration-300 ${errors?.confirmPassword ? 'text-danger' : confirmPasswordFilled ? 'text-primary' : 'peer-focus:text-primary text-gray-500'} top-1/2 ${confirmPasswordFilled ? '-left-[1%]' : 'peer-focus:-left-[1%] left-2'} ${confirmPasswordFilled ? '-translate-y-[130%]' : 'peer-focus:-translate-y-[130%] -translate-y-1/2'} px-2 ${confirmPasswordFilled ? 'scale-75' : 'peer-focus:scale-75 scale-100'} z-20 ${confirmPasswordFilled ? 'bg-white' : 'peer-focus:bg-white bg-transparent'}`}
                                >
                                    Confirm Password
                                </label>
                            </div>
                            {errors?.confirmPassword && <p className='text-danger text-sm'>*{errors.confirmPassword.message?.toString()}</p>}
                            <button
                                disabled={['signUp.pending', 'signUp.fulfilled', 'signIn.pending'].includes(userState)}
                                className='bg-primary text-white flex items-center justify-center border rounded-[5px] py-[10px] cursor-pointer mt-4 disabled:opacity-50 disabled:cursor-not-allowed'
                            >
                                {['signUp.pending', 'signUp.fulfilled', 'signIn.pending'].includes(userState)
                                    ?
                                    <div className="loader" />
                                    :
                                    <p>Submit</p>
                                }
                            </button>
                            <div className='text-base text-center'>
                                <p>Already have an account? <Link to={'/auth/signin'}> <span className='font-bold underline cursor-pointer'>Sign in</span> </Link></p>
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

export default Signup