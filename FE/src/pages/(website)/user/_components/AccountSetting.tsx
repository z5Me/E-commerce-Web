import { useAccountForm } from '@/common/hooks/useAccountForm';
import DeliveryAddress from '@/components/DeliveryAddress';
import { setSelected } from '@/store/slices/userSlice';
import type { AppDispatch } from '@/store/store';
import { MapPinPlus, Save, UserRoundPen, X } from 'lucide-react';
import { useState } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import GoogleMap from '../../test/googleMap';

const AccountSetting = () => {
    //Use for Account Setting
    const [openEdit, setOpenEdit] = useState<boolean>(false);
    const [openAddAddress, setOpenAddAddress] = useState<boolean>(false);

    //data of user in redux
    const dataUser = useSelector((state: any) => state.user.dataUser, shallowEqual);

    //redux
    const dispatch = useDispatch<AppDispatch>();

    //Xử lý form
    const { register, handleSubmit, errors, selectedGender, onSubmit, reset } = useAccountForm({ dataUser, openEdit, setOpenEdit, setOpenAddAddress, });
    const [prevImage, setPreviewImage] = useState<string | null>(null);

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className='flex flex-col gap-3 lg:gap-6 w-full text-sm sm:text-base'
        >
            <div className='flex justify-center'>
                <div className='group flex flex-col items-center gap-2'>
                    <img className='rounded-full w-[70px] sm:w-[100px]' src={prevImage !== null ? prevImage : dataUser.avatar} alt="Avatar" />
                    {openEdit &&
                        <div className='flex *:cursor-pointer'>
                            <label htmlFor="fileUpload" className='text-sm sm:text-base border border-gray-200 rounded-[6px] px-3 sm:px-4 py-1 bg-gray-200 hover:bg-gray-300'>Choose file</label>
                            <input
                                className='hidden'
                                type="file"
                                id="fileUpload"
                                onChange={(e: any) => {
                                    const file = e.target.files?.[0];
                                    if (file) {
                                        const url = URL.createObjectURL(file);
                                        setPreviewImage(url);
                                    }
                                }}
                            />
                        </div>
                    }
                </div>
            </div>
            <div className='flex flex-col lg:flex-row gap-3 lg:gap-8 w-full'>
                <div className='flex flex-col w-full gap-1'>
                    <label className={`${errors.userName ? 'text-danger' : 'text-primary'} after:ml-0.5 after:text-red-500 after:content-["*"]`} htmlFor="userName">Login name</label>
                    <input
                        disabled={!openEdit}
                        id='userName'
                        type="text"
                        className={`bg-gray-50 disabled:bg-gray-200 hover:bg-gray-100 focus:bg-gray-50 border ${errors.userName ? 'border-danger focus:outline-danger' : 'border-gray-300 focus:outline-primary'} rounded-lg text-primary disabled:text-gray-600 px-3 sm:px-4 py-2`}
                        {...register("userName", {
                            validate: (value) => {
                                if (!value?.trim()) return 'Cannot be empty'
                                if (value.trim().length < 3) return 'Must be more than 3 characters'
                                return true
                            }
                        })}
                    />
                    <span className='text-sm text-gray-400'>Login name can only be changed once.</span>
                    {(errors && errors.userName) && <span className='text-danger sm:text-sm text-xs font-sans'>{errors.userName.message?.toString()}</span>}
                </div>
                <div className='flex flex-col w-full gap-1'>
                    <label
                        className={`${errors.userNameFile ? 'text-danger' : 'text-primary'} after:ml-0.5 after:text-red-500 after:content-["*"]`}
                        htmlFor="userNameFile"
                    >
                        User name
                    </label>
                    <input
                        disabled={!openEdit}
                        id='userNameFile'
                        type="text"
                        className={`bg-gray-50 disabled:bg-gray-200 hover:bg-gray-100 focus:bg-gray-50 border ${errors.userNameFile ? 'border-danger focus:outline-danger' : 'border-gray-300 focus:outline-primary'} rounded-lg text-primary disabled:text-gray-600 px-3 sm:px-4 py-2`}
                        {...register("userNameFile", {
                            validate: (value) => {
                                if (!value?.trim()) return 'Cannot be empty'
                                if (value.trim().length < 3) return 'Must be more than 3 characters'
                                return true
                            }
                        })}
                    />
                    {(errors && errors.userNameFile) && <span className='text-danger sm:text-sm text-xs font-sans'>{errors.userNameFile.message?.toString()}</span>}
                </div>
            </div>
            <div className='flex flex-col lg:flex-row gap-3 lg:gap-8 w-full'>
                <div className='flex flex-col w-full gap-1'>
                    <label className={`${errors.email ? 'text-danger' : 'text-primary'} after:ml-0.5 after:text-red-500 after:content-["*"]`} htmlFor="email">Email</label>
                    <input
                        disabled={!openEdit}
                        id='email'
                        type="text"
                        className={`bg-gray-50 disabled:bg-gray-200 hover:bg-gray-100 focus:bg-gray-50 border ${errors.email ? 'border-danger focus:outline-danger' : 'border-gray-300 focus:outline-primary'} rounded-lg text-primary disabled:text-gray-600 px-3 sm:px-4 py-2`}
                        {...register('email', {
                            required: 'Is required',
                            pattern: {
                                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, // regex kiểm tra định dạng email
                                message: 'Email is not valid'
                            }
                        })}
                    />
                    {(errors && errors.email) && <span className='text-danger sm:text-sm text-xs font-sans'>{errors.email.message?.toString()}</span>}
                </div>
                <div className='flex flex-col w-full gap-1'>
                    <label className={`${errors.phone ? 'text-danger' : 'text-primary'} after:ml-0.5 after:text-red-500 after:content-["*"]`} htmlFor="phone">Phone</label>
                    <input
                        disabled={!openEdit}
                        id='phone'
                        type="text"
                        className={`bg-gray-50 disabled:bg-gray-200 hover:bg-gray-100 focus:bg-gray-50 border ${errors.phone ? 'border-danger focus:outline-danger' : 'border-gray-300 focus:outline-primary'} rounded-lg text-primary disabled:text-gray-600 px-3 sm:px-4 py-2`}
                        {...register("phone", {
                            required: 'Is required',
                            pattern: {
                                value: /^(0|\+84)[0-9]{9}$/,
                                message: "Invalid phone number"
                            }
                        })}
                    />
                    {(errors && errors.phone) && <span className='text-danger sm:text-sm text-xs font-sans'>{errors.phone.message?.toString()}</span>}
                </div>
            </div>
            <div className='flex flex-col lg:flex-row gap-3 lg:gap-8 w-full'>
                <div className='flex flex-col w-full gap-1'>
                    <label htmlFor="gender">Gender</label>
                    <div className='flex gap-4 py-2 select-none'>
                        <div className='flex items-center gap-[6px] *:cursor-pointer'>
                            <input
                                disabled={!openEdit}
                                value={'male'}
                                checked={selectedGender === 'male'}
                                type="radio"
                                id='male'
                                className='w-4 h-4 focus:bg-primary text-primary'
                                {...register("gender")}
                            />
                            <label className={`${openEdit ? 'text-primary' : 'text-gray-400'}`} htmlFor="male">Male</label>
                        </div>
                        <div className='flex items-center gap-[6px] *:cursor-pointer'>
                            <input
                                disabled={!openEdit}
                                value={'female'}
                                checked={selectedGender === 'female'}
                                type="radio"
                                id='female'
                                className='w-4 h-4'
                                {...register("gender")}
                            />
                            <label className={`${openEdit ? 'text-primary' : 'text-gray-400'}`} htmlFor="female">Female</label>
                        </div>
                        <div className='flex items-center gap-[6px] *:cursor-pointer'>
                            <input
                                disabled={!openEdit}
                                value={'other'}
                                checked={selectedGender === 'other'}
                                type="radio"
                                id='other'
                                className='w-4 h-4'
                                {...register("gender")}
                            />
                            <label className={`${openEdit ? 'text-primary' : 'text-gray-400'}`} htmlFor="other">Other</label>
                        </div>
                    </div>
                </div>
                <div className='flex flex-col w-full gap-1'>
                    <label htmlFor="birthday">Birthday</label>
                    <input
                        disabled={!openEdit}
                        id='birthday'
                        type="date"
                        className='bg-gray-50 disabled:bg-gray-200 hover:bg-gray-100 focus:bg-gray-50 focus:outline-primary border border-gray-300 rounded-lg text-primary disabled:text-gray-600 px-3 sm:px-4 py-2'
                        {...register("birthday")}
                    />
                </div>
            </div>
            <div className='flex flex-col w-full gap-1'>
                <label htmlFor="address">Address</label>
                <div
                    onClick={() => {
                        if (openEdit) {
                            if (dataUser.address && dataUser.address.length > 1) return
                            setOpenAddAddress(!openAddAddress)
                        }
                        return
                    }}
                    className={`flex items-center gap-2 font-MJSatoshi px-4 py-2 border ${openEdit ? 'bg-gray-50 hover:bg-gray-100 cursor-pointer text-primary' : ' bg-gray-200 text-gray-600'} rounded-lg select-none`}
                >
                    <MapPinPlus size={20} />
                    <p>Add address</p>
                </div>
                {openAddAddress && <GoogleMap setOpenAddAddress={setOpenAddAddress} dataUser={dataUser} />}
                {(dataUser.address && dataUser.address.length > 0) &&
                    <>
                        {dataUser.address.map((item: any, index: number) => (
                            <div
                                onClick={() => {
                                    if (openEdit) {
                                        dispatch(setSelected({ index }))
                                    }
                                    return
                                }}
                                key={index}
                                className={`border ${item.selected && 'border-primary'} rounded-lg overflow-hidden`}
                            >
                                <DeliveryAddress item={item} openEdit={openEdit} />
                            </div>
                        ))}
                    </>
                }
            </div>
            <div className='flex items-center justify-end gap-3 mt-4 lg:mt-0'>
                {!openEdit ?
                    <button
                        className='flex items-center gap-1 px-3 py-1 border border-primary bg-primary hover:bg-white text-white hover:text-primary rounded-[6px] cursor-pointer'
                        onClick={(e) => {
                            e.preventDefault();
                            setOpenEdit(true);
                            if (dataUser.address && dataUser.address.length < 1) setOpenAddAddress(true)
                        }}
                    >
                        <UserRoundPen size={16} />
                        <p className='text-base'>Edit</p>
                    </button>
                    :
                    <>
                        <button
                            className='flex items-center gap-1 px-3 py-1 border border-primary bg-primary hover:bg-white text-white hover:text-primary rounded-[6px] cursor-pointer'
                        // onClick={(e) => { e.preventDefault() }}  
                        >
                            <Save size={16} />
                            <p className='text-base'>Save</p>
                        </button>
                        <button
                            className='flex items-center gap-1 px-3 py-1 border border-danger bg-danger hover:bg-white text-white hover:text-danger rounded-[6px] cursor-pointer'
                            onClick={(e) => { e.preventDefault(); setOpenEdit(false); setPreviewImage(null); reset() }}
                        >
                            <X size={16} />
                            <p className='text-base'>Cancel</p>
                        </button>
                    </>
                }
            </div>
        </form>
    )
}

export default AccountSetting