export interface IAddress {
    _id?: string;
    addressName?: string;
    lat?: string;
    lng?: string;
    selected?: boolean
}

export type IUser = {
    _id?: string;
    userNameFile?: string;
    userName?: string;
    address?: IAddress[];
    email?: string;
    avatar?: string;
    phone?: string;
    gender?: 'male' | 'female' | 'other' | '';
    birthday?: any;
    password?: string;
    role?: 'user' | 'admin';
};