import { useAppDispatch } from "@/store/store";
import { authGoogle } from "@/store/thunks/userThunk";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import { useNavigate } from "react-router";
import { toast } from "sonner";

export default function GoogleAuth() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const handleSuccess = async (credentialResponse: any) => {
        const promise = dispatch(authGoogle({ credential: credentialResponse.credential })).unwrap();
        toast.promise(promise, {
            loading: '...loading',
            success: () => {
                navigate(-1);
                return 'Success';
            },
            error: (error) => {
                console.log('Lỗi ở dispatch(authGoogle', error)
                return error
            }
        })
    };

    return (
        <GoogleOAuthProvider clientId="1039339205279-qr7qsrb691pu1rtah76eb97ug5qp41e2.apps.googleusercontent.com">
            <GoogleLogin
                onSuccess={handleSuccess}
                onError={() => {
                    console.log("Login Failed");
                }}
            />
        </GoogleOAuthProvider>
    );
}
