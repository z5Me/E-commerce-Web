import type { IAttributeValue } from '@/common/types/attributeValue';
import type { IProduct } from '@/common/types/product';
import type { IVariant } from '@/common/types/variant';
import { ChangeQuantity } from '@/components/ChangeQuantity';
import DefaultButton from '@/components/DefaultButton';
import { useDialog } from '@/contexts/DialogContext';
import { useAppDispatch } from '@/store/store';
import { addToCart } from '@/store/thunks/cartThunk';
import { reSignIn } from '@/store/thunks/userThunk';
import { useState } from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';

type Props = {
    productInfor: IVariant,
    fitVariant: IVariant[],
    chooseVariant: IAttributeValue[],
    data: IProduct
}

const AddToCartButton = ({ productInfor, fitVariant, chooseVariant, data }: Props) => {
    // const { idVariant } = useGetParams(['idVariant']);
    const dispatch = useAppDispatch();
    //Xử lý thêm giỏ hàng
    const cartStatus = useSelector((state: any) => state.cart.status, shallowEqual);
    const dataUser = useSelector((state: any) => state.user.dataUser, shallowEqual);
    const [quantity, setQuantity] = useState<number>(1);
    // console.log('quantity: ', quantity)
    const { showDialog } = useDialog()
    const navigate = useNavigate();

    const handleAddToCart = () => {
        const promise = dispatch(addToCart({ idUser: dataUser._id, idProduct: data._id as string, idVariant: productInfor._id as string, quantity: quantity })).unwrap();
        if (!productInfor) {
            toast.warning('Vui lòng chọn đủ biến thể trước khi thêm vào giỏ hàng!');
            return;
        }
        //check chọn đủ biến thể
        if (fitVariant.length === 1 && chooseVariant.length === fitVariant[0].values.length) {
            //check đăng nhập
            if (!dataUser._id) {
                dispatch(reSignIn())
                    .unwrap()
                    .then(() => {
                        toast.promise(promise, {
                            loading: '...loading',
                            success: 'Thêm giỏ hàng thành công',
                            error: (error) => {
                                console.log('error', error);
                                return `Thêm giỏ hàng thất bại`;
                            }
                        });
                    })
                    .catch(() => {
                        toast.warning('Phiên đăng nhập đã hết hạn!');
                        showDialog({
                            title: 'Rời khỏi trang?',
                            description: 'Bạn cần đăng nhập để tiếp tục mua hàng!',
                            onConfirm: () => {
                                navigate('/auth')
                            },
                        });
                    })
                return;
            }
            toast.promise(promise, {
                loading: '...loading',
                success: 'Thêm giỏ hàng thành công',
                error: (error) => {
                    console.log(error);
                    return `Thêm giỏ hàng thất bại`;
                }
            })
        } else {
            toast.warning('Vui lòng chọn đủ biến thể');
            return;
        }

    }

    return (
        <div className="flex sm:gap-5 gap-3">
            <ChangeQuantity
                quantity={quantity}
                setQuantity={setQuantity}
                maxQuantity={productInfor?.countOnStock ?? 99}
                onClickMinus={() => setQuantity(quantity - 1)}
                onClickPlus={() => setQuantity(quantity + 1)}
            />
            <DefaultButton
                onClick={() => handleAddToCart()}
                title="Add to Card"
                classNameButton="bg-primary hover:opacity-90 rounded-full w-full max-sm:px-0"
                classNameText="text-white"
                disabled={cartStatus === 'pending' ? true : false}
            />
        </div>

    )
}

export default AddToCartButton
