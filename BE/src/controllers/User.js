import User from "../models/User";
import bcrypt from 'bcryptjs';
import { generateToken } from "../utils/generateToken";
import { OAuth2Client } from "google-auth-library";
import Product from "../models/Product";

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
const defaultPassword = process.env.DEFAULT_PASSWORD;

export const SignUp = async (req, res) => {
    const { email, password, userNameFile, userName, avatar } = req.body;
    // console.log('req.body: ', req.body);
    try {
        if (!email || !password) {
            return res.status(400).json({ error: "Thiếu email hoặc password" });
        };

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ error: "Email đã tồn tại" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({ email, password: hashedPassword, userNameFile, userName, avatar });
        return res.status(201).json(user);
    } catch (error) {
        console.error('Lỗi SignUp BE:', error);
        return res.status(500).json({ message: 'Lỗi server', error: error.message });

    }
}

export const SignIn = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ error: 'Email chưa được đăng kí' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ error: 'Sai mật khẩu' });

        const token = generateToken({ userId: user._id });

        // const newUser = { ...user, user.password }

        return res.status(200).json({ user, token });
    } catch (error) {
        console.log('Lỗi SignIn BE: ', error);
        return res.status(500).json({ message: 'Lỗi server', error: error.message });
    }
}

export const reSignIn = async (req, res) => {
    // console.log('req.user: ', req.user);
    if (req.user === null) return res.status(404).json({ error: 'Account not found' })
    return res.status(200).json(req.user);
}

export const logOut = async (req, res) => {
    res.clearCookie('token');
    res.status(200).json({ error: 'Đã đăng xuất' });
}


export const saveUserInformation = async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(
            req.body._id,
            req.body,
            { new: true, runValidators: true, select: '-password' }
        );

        if (!updatedUser) {
            return res.status(401).json({ error: 'Không tìm thấy user' });
        }

        return res.status(200).json(updatedUser);
    } catch (error) {
        console.log('Lỗi saveUserInformation BE')
        return res.status(500).json({ message: 'Lỗi server', error: error.message });
    }
}

export const saveAddress = async (req, res) => {
    console.log(req.body)
    try {
        const findUser = await User.findOne({ _id: req.body._id }).select('-password');
        if (!findUser) return res.status(404).json({ error: 'Không tìm thấy user' });
        // if (!findUser.phone) return res.status(401).json({ error: 'Vui lòng xác minh số điện thoại trước' });
        const newAddress = {
            receiver: findUser.userNameFile,
            phone: findUser.phone,
            addressName: req.body.addressName,
            lat: req.body.lat,
            lng: req.body.lng,
            selected: findUser.address.length === 0
        }

        findUser.address.push(newAddress);
        await findUser.save();

        return res.status(200).json(newAddress);
    } catch (error) {
        console.log('Lỗi saveAddress BE');
        return res.status(500).json({ message: 'Lỗi server', error: error.message })
    }
}

export const authGoogle = async (req, res) => {
    try {
        const { email, name, picture } = req.body;
        //Tìm tài khoản
        const findUser = await User.findOne({ email });
        //Đăng nhập nếu tài khoản tồn tại
        if (findUser) {
            const token = generateToken({ userId: findUser._id });
            return res.status(200).json({ user: findUser, token });
        };

        const hashedPassword = await bcrypt.hash(defaultPassword, 10);

        const createUser = await User.create({
            email: email,
            password: hashedPassword,
            userNameFile: name,
            userName: name,
            avatar: picture
        });
        if (!createUser) {
            console.log('Lỗi ở authGoogle');
            return res.status(400).json({ error: 'Lỗi khi tạo tài khoản!' })
        }
        const token = generateToken({ userId: createUser._id });
        //check lỗi khi call API này

        return res.status(201).json({ user: createUser, token });
    } catch (error) {
        console.log('Lỗi ở authGoogle', error);
        return res.status(500).json({ message: 'Internal Server', error: error.message })
    }
}

export const addWishList = async (req, res) => {
    const { idProduct, idUser } = req.body;
    try {
        if (!idProduct || !idUser) return res.status(409).json({ error: 'Thiếu dữ liệu' });

        const findUser = await User.findOne({ _id: idUser });
        if (!findUser) return res.status(404).json({ error: 'User not found' });

        const findProduct = await Product.findOne({ _id: idProduct }).populate('variants');
        if (!findProduct) return res.status(404).json({ error: 'Product not found' });

        //kiểm tra trùng lặp trước khi add
        const newWishList = { idProduct };
        const findWish = findUser.wishList.findIndex(item => item.idProduct === idProduct);
        //Phát hiện trùng lặp, loại khỏi danh sách
        if (findWish !== -1) {
            findUser.wishList = findUser.wishList.filter((_, index) => index !== findWish);
            await findUser.save();
            return res.status(200).json({ wishList: findUser.wishList });
        }
        //Không trùng lặp thì thêm vào danh sách
        findUser.wishList.push(newWishList);
        await findUser.save();

        return res.status(200).json({ wishList: findUser.wishList });
    } catch (error) {
        console.log('Lỗi ở addWishList', error);
        return res.status(500).json({ message: 'Internal Server', error: error.message });
    }
}