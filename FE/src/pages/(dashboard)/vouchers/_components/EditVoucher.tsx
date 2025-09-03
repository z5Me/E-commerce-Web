import { useGetParams } from '@/common/hooks/useGetParams';
import type { ICategory } from '@/common/types/category';
import type { IVoucher } from '@/common/types/voucher';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger } from '@/components/ui/select';
import { uploadSingleImage } from '@/lib/utils';
import { useAppDispatch } from '@/store/store';
import { getAllCategories } from '@/store/thunks/categoriesThunk';
import { editVoucher, getOneVoucher } from '@/store/thunks/voucherThunk';
import { ErrorMessage } from '@hookform/error-message';
import { SelectValue } from '@radix-ui/react-select';
import { ChevronDownIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { shallowEqual, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';

const initValue = {
    voucherCode: '',
    image: '',
    minBill: 0,
    maxDiscount: 0,
    categories: [],
    typeOfDiscount: 'fixed' as 'fixed' | 'percent',
    discount: 0,
    quantity: 0,
    startDate: new Date(),
    endDate: undefined
}

const EditVoucher = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { idVoucher } = useGetParams(['idVoucher']);

    const { register, handleSubmit, formState: { errors }, reset, watch, control } = useForm<IVoucher>({
        defaultValues: initValue
    });
    const typeOfDiscount = watch('typeOfDiscount');
    const valueStartDate = watch('startDate');
    const [openStartDate, setOpenStartDate] = useState<boolean>(false);
    const [openEndDate, setOpenEndDate] = useState<boolean>(false);
    const [previewImage, setPreviewImage] = useState<string>('');

    const categoryData = useSelector((state: any) => state.categories.categoriesData, shallowEqual);

    useEffect(() => {
        if (categoryData.length === 0) {
            dispatch(getAllCategories({}));
        }
    }, []);

    const onSubmit = async (data: IVoucher) => {
        console.log('dataFormVoucher', data);
        let uploadImage = '';

        //Nếu thay ảnh mới thì upload ảnh và lấy URL
        if (data.image.length > 0) {
            uploadImage = await uploadSingleImage(data.image[0]);
        } else {
            uploadImage = previewImage;
        }

        dispatch(editVoucher({ ...data, image: uploadImage })).unwrap()
            .then(() => {
                toast.success('Success');
                navigate(-1);
            })
            .catch((error) => {
                console.log('error', error);
                toast.error('Lỗi edit');
            })

    }

    useEffect(() => {
        if (idVoucher) {
            dispatch(getOneVoucher(idVoucher)).unwrap()
                .then((data) => {
                    console.log('data', data);
                    setPreviewImage(data.image);
                    reset({
                        ...data,
                        image: undefined,
                        startDate: data.startDate ? new Date(data.startDate) : undefined,
                        endDate: data.endDate ? new Date(data.endDate) : undefined
                    });
                })
                .catch((error) => {
                    toast.error('Lỗi khi lấy thông tin voucher');
                    console.log('error', error);
                    return navigate(-1);
                });
        }
    }, []);

    return (
        <>
            <p className="text-2xl font-bold">Edit Voucher</p>
            <div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className='grid grid-cols-2 gap-x-6 gap-y-8 *:grid *:gap-y-1 *:h-max'>
                        <div className='w-full'>
                            <Label htmlFor='image'>Voucher image</Label>
                            <Input
                                type='file'
                                // accept='image/*'
                                id='image'
                                {...register('image', {
                                    validate: {
                                        lessThan2MB: (files: any) => files?.[0] ? files?.[0]?.size <= 2 * 1024 * 1024 || 'Ảnh tối đa 2MB' : true,
                                        acceptFormat: (files) => files?.[0] ? ['image/jpeg', 'image/jpg', 'image/png', 'image/svg', 'image/webp+xml'].includes(files[0]?.type) || 'Chỉ chấp nhập JPEG/JPG/PNG/SVG/WebP' : true
                                    }
                                })}
                            />
                            <ErrorMessage errors={errors} name='image' render={({ message }) => <p className='text-danger'>{message}</p>} />
                        </div>
                        <div>
                            <Label>Preview image</Label>
                            <div className='flex items-center'>
                                {previewImage && previewImage !== '' && <img className='border-2 border-dotted max-h-[300px]' src={previewImage} alt='voucher image' />}
                            </div>
                        </div>
                        <div>
                            <Label htmlFor='voucherCode'>Voucher code</Label>
                            <Input
                                type="text"
                                placeholder='Voucher code'
                                {...register('voucherCode', {
                                    required: false,
                                    onChange: (e) => e.target.value = e.target.value.toUpperCase(), //Ép dữ liệu thành UpperCase
                                    validate: {
                                        minLength: (value) => value.length > 3 || 'Voucher code phải có ít nhất 3 kí tự',
                                        noSpace: (value) => !/\s/.test(value) || 'Voucher code không được chứa khoảng trắng',
                                        onlyUppercase: (value) => /^[A-Z0-9]+$/.test(value) || 'Voucher code chỉ được chứa chữ in hoa và số'
                                    }
                                })}
                            />
                            <ErrorMessage errors={errors} name='voucherCode' render={({ message }) => <p className='text-danger'>{message}</p>} />
                        </div>
                        <div>
                            <Label htmlFor='minBill'>Min bill</Label>
                            <Input
                                type='number'
                                {...register('minBill', {
                                    required: false,
                                })}
                            />
                            <ErrorMessage errors={errors} name='minBill' render={({ message }) => <p className='text-danger'>{message}</p>} />
                        </div>
                        <div>
                            <Label htmlFor='maxDiscount'>Max Discount</Label>
                            <Input
                                type='number'
                                {...register('maxDiscount', {
                                    required: false
                                })}
                            />
                            <ErrorMessage errors={errors} name='maxDiscount' render={({ message }) => <p className='text-danger'>{message}</p>} />
                        </div>
                        <div>
                            <Label htmlFor='typeOfDiscount'>Type Discount</Label>
                            <Controller
                                name='typeOfDiscount'
                                control={control}
                                rules={{ required: "Type discount is required" }}
                                render={({ field }) => (
                                    <Select value={field.value} onValueChange={field.onChange}>
                                        <SelectTrigger className='w-full'>
                                            <SelectValue placeholder='Select type' />
                                        </SelectTrigger>
                                        <SelectContent id='typeOfDiscount'>
                                            <SelectGroup>
                                                <SelectItem value='fixed'>Fixed (VNĐ)</SelectItem>
                                                <SelectItem value='percent'>Percent (%)</SelectItem>
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                )}
                            />

                            <ErrorMessage errors={errors} name='typeOfDiscount' render={({ message }) => <p className='text-danger'>{message}</p>} />
                        </div>
                        <div>
                            <Label htmlFor='discount'>Discount</Label>
                            <Input
                                type='number'
                                {...register('discount', {
                                    required: false,
                                    valueAsNumber: true,
                                    validate: {
                                        min: (value) => value > 0 || 'Discount must be higher than 0',
                                        max: (value) => typeOfDiscount === 'percent' ? value < 100 || 'Discount must be lower than 100' : true
                                    }
                                })}
                            />
                            <ErrorMessage errors={errors} name='discount' render={({ message }) => <p className='text-danger'>{message}</p>} />
                        </div>
                        <div>
                            <Label htmlFor='quantity'>Quantity</Label>
                            <Input
                                type='number'
                                {...register('quantity')}
                            />
                            <ErrorMessage errors={errors} name='quantity' render={({ message }) => <p className='text-danger'>{message}</p>} />
                        </div>
                        <div>
                            <Label htmlFor='startDate'>Start date (MM/DD/YYYY)</Label>
                            <Controller
                                name='startDate'
                                control={control}
                                render={({ field }) => {
                                    return (
                                        <Popover open={openStartDate} onOpenChange={setOpenStartDate}>
                                            <PopoverTrigger asChild>
                                                <Button
                                                    variant="outline"
                                                    id="date"
                                                    className="w-48 justify-between font-normal"
                                                >
                                                    {field.value instanceof Date && !isNaN(field.value.getTime())
                                                        ? field.value.toLocaleDateString()
                                                        : "Select date"}
                                                    <ChevronDownIcon />
                                                </Button>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                                                <Calendar
                                                    mode="single"
                                                    selected={field.value}
                                                    captionLayout="dropdown"
                                                    onSelect={(date) => {
                                                        setOpenStartDate(false);
                                                        return field.onChange(date);
                                                    }}
                                                />
                                            </PopoverContent>
                                        </Popover>
                                    );
                                }}
                            />
                            <ErrorMessage errors={errors} name='startDate' render={({ message }) => <p className='text-danger'>{message}</p>} />
                        </div>
                        <div>
                            <Label htmlFor='endDate'>End date (MM/DD/YYYY)</Label>
                            <Controller
                                name='endDate'
                                control={control}
                                rules={{ required: "End date must be required", validate: (value: any) => new Date(value) > new Date(valueStartDate) || 'End date must be older than start date' }}
                                render={({ field }) => {
                                    const value = field.value as Date | undefined;
                                    return (
                                        <Popover open={openEndDate} onOpenChange={setOpenEndDate}>
                                            <PopoverTrigger asChild>
                                                <Button
                                                    variant="outline"
                                                    id="date"
                                                    className="w-48 justify-between font-normal"
                                                >
                                                    {value instanceof Date && !isNaN(value.getTime())
                                                        ? value.toLocaleDateString()
                                                        : "Select date"}
                                                    <ChevronDownIcon />
                                                </Button>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                                                <Calendar
                                                    mode="single"
                                                    selected={value}
                                                    captionLayout="dropdown"
                                                    onSelect={(date) => {
                                                        setOpenEndDate(false);
                                                        return field.onChange(date);
                                                    }}

                                                />
                                            </PopoverContent>
                                        </Popover>
                                    );
                                }}
                            />
                            <ErrorMessage errors={errors} name='endDate' render={({ message }) => <p className='text-danger'>{message}</p>} />
                        </div>
                        <div className='grid gap-y-4'>
                            <Label htmlFor='categories'>Categories</Label>
                            <Controller
                                name='categories'
                                control={control}
                                render={({ field }) => (
                                    <div className='grid gap-y-3 overflow-y-auto max-h-[200px]'>
                                        {categoryData.map((category: ICategory) => (
                                            <div key={category._id} className='flex gap-x-2'>
                                                <Checkbox
                                                    id={category._id}
                                                    checked={field.value?.includes(category._id as string)}
                                                    onCheckedChange={(checked) => {
                                                        return checked
                                                            ? field.onChange([...field.value, category._id])
                                                            : field.onChange(field.value.filter((value) => value !== category._id))
                                                    }}
                                                />
                                                <Label htmlFor={category._id}>{category.name}</Label>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            />
                            <ErrorMessage errors={errors} name='categories' render={({ message }) => <p className='text-danger'>{message}</p>} />
                        </div>
                    </div>
                    <Button className='mt-6' type='submit'>Submit</Button>
                </form>
            </div>
        </>
    )
}

export default EditVoucher
