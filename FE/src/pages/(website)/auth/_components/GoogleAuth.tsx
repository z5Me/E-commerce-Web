import { useAppDispatch } from "@/store/store";
import { authGoogle, getUserInfo, signIn } from "@/store/thunks/userThunk";
import { GoogleOAuthProvider, useGoogleLogin } from "@react-oauth/google";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router";
import { toast } from "sonner";

const defaultPassword = import.meta.env.VITE_DEFAULT_PASSWORD;

function CustomGoogleButton() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const login = useGoogleLogin({
        onSuccess: async (tokenResponse: any) => {
            // tokenResponse.access_token
            dispatch(getUserInfo(tokenResponse.access_token)).unwrap()
                .then((data) => {
                    console.log('data', data)
                    dispatch(authGoogle(data)).unwrap()
                        .then((data) => {
                            // console.log('data2', data)
                            const promise = dispatch(signIn({ email: data.user.email, password: defaultPassword })).unwrap();
                            toast.promise(promise, {
                                loading: '...loading',
                                success: () => {
                                    navigate(-1);
                                    return 'Success';
                                },
                                error: (error) => {
                                    console.log('error', error);
                                    return error
                                }
                            })
                        })
                })
                .catch((error) => {
                    // console.log('error', error);
                    return toast.error(error);
                });
        },
        onError: () => {
            console.log("Login Failed");
        },
    })

    return (
        <div
            className='border border-gray-300 bg-transparent hover:bg-gray-100 cursor-pointer rounded-[5px] flex gap-4 font-medium px-4 py-3'
            onClick={() => login()}
        >
            <FcGoogle size={24} />
            <p>Continue with Google</p>
        </div>
    )
}

export default function GoogleAuth() {

    return (
        <GoogleOAuthProvider clientId="1039339205279-qr7qsrb691pu1rtah76eb97ug5qp41e2.apps.googleusercontent.com">
            <CustomGoogleButton />
        </GoogleOAuthProvider>
    );
}
