// hooks/useAccountForm.ts
import { useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import type { IUser } from '@/common/types/user';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '@/store/store';
import { saveUserInformation } from '@/store/thunks/userThunk';

type IUseAccountFormProps = {
    dataUser: IUser;
    openEdit: boolean;
    setOpenEdit: (value: boolean) => void;
    setOpenAddAddress: (value: boolean) => void;
};

export const useAccountForm = ({ dataUser, openEdit, setOpenEdit, setOpenAddAddress }: IUseAccountFormProps) => {
    //redux
    const dispatch = useDispatch<AppDispatch>();

    const { register, handleSubmit, watch, formState: { errors }, reset, } = useForm<IUser>({ mode: 'onChange' });
    const isFirstLoad = useRef(true);

    // reset form khi có data
    useEffect(() => {
        if (dataUser && dataUser._id && isFirstLoad.current) {
            reset({
                userName: dataUser.userName,
                userNameFile: dataUser.userNameFile,
                email: dataUser.email,
                phone: dataUser.phone,
                gender: dataUser.gender,
                birthday: dataUser.birthday
                    ? new Date(dataUser.birthday).toISOString().split("T")[0]
                    : new Date(),
            });
            isFirstLoad.current = false;
        }
    }, [dataUser, reset]);

    const selectedGender = watch('gender');

    //submit
    const onSubmit = (value: any) => {
        const data = {
            ...value,
            _id: dataUser._id,
            address: dataUser.address || []
        }
        // console.log(data)
        dispatch(saveUserInformation(data))
        setOpenEdit(false);
    }

    //close form address
    useEffect(() => {
        if (!openEdit) {
            setOpenAddAddress(false);
        }
    }, [openEdit, setOpenAddAddress]);

    return {
        register,
        handleSubmit,
        watch,
        errors,
        reset,
        selectedGender,
        onSubmit,
    };
};
