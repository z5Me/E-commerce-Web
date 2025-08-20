import { Button } from '@/components/ui/button';
import { Controller, useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message'
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { shallowEqual, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useAppDispatch } from '@/store/store';
import { getAllCategories } from '@/store/thunks/categoriesThunk';
import { Checkbox } from '@/components/ui/checkbox';
import type { ICategory } from '@/common/types/category';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger } from '@/components/ui/select';
import { SelectValue } from '@radix-ui/react-select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { ChevronDownIcon } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import { divIcon } from 'leaflet';

const AddVoucher = () => {
    const dispatch = useAppDispatch();

    const { register, handleSubmit, formState: { errors }, reset, watch, control } = useForm({
        defaultValues: {
            voucherCode: '',
            minBill: 0,
            maxDiscount: 0,
            categories: ['689c68363e8f91fd6ad16fcc', '689d59017569068a08383cc5'],
            typeOfDiscount: 'fixed',
            discount: 0,
            quantity: 0,
            startDate: new Date(),
            endDate: undefined
        }
    });
    const typeOfDiscount = watch('typeOfDiscount');
    const valueStartDate = watch('startDate');

    const onSubmit = (data: any) => {
        console.log('dataFormVoucher', data);
    }

    useEffect(() => {
        dispatch(getAllCategories({}));
    }, []);
    const categoryData = useSelector((state: any) => state.categories.categoriesData, shallowEqual);

    console.log('categoryData')

    return (
        <>
            <p className="text-2xl font-bold">Add Voucher</p>
            <div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className='grid grid-cols-2 gap-x-6 gap-y-8'>
                        <div>
                            <Label htmlFor='voucherCode'>Voucher code</Label>
                            <Input
                                type="text"
                                placeholder='Voucher code'
                                {...register('voucherCode', {
                                    required: false,
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
                                                <SelectItem value='fixed'>Fixed</SelectItem>
                                                <SelectItem value='percent'>Percent</SelectItem>
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
                                render={({ field }) => (
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <Button
                                                variant="outline"
                                                id="date"
                                                className="w-48 justify-between font-normal"
                                            >
                                                {field.value ? field.value.toLocaleDateString() : "Select date"}
                                                <ChevronDownIcon />
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                                            <Calendar
                                                mode="single"
                                                selected={field.value}
                                                captionLayout="dropdown"
                                                onSelect={field.onChange}
                                            />
                                        </PopoverContent>
                                    </Popover>
                                )}
                            />
                            <ErrorMessage errors={errors} name='startDate' render={({ message }) => <p className='text-danger'>{message}</p>} />
                        </div>
                        <div>
                            <Label htmlFor='endDate'>End date (MM/DD/YYYY)</Label>
                            <Controller
                                name='endDate'
                                control={control}
                                rules={{ required: "End date must be required", validate: (value: any) => new Date(value) > new Date(valueStartDate) || 'End date must be older than start date' }}
                                render={({ field }) => (
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <Button
                                                variant="outline"
                                                id="date"
                                                className="w-48 justify-between font-normal"
                                            >
                                                {field.value ? field.value.toLocaleDateString() : "Select date"}
                                                <ChevronDownIcon />
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                                            <Calendar
                                                mode="single"
                                                selected={field.value}
                                                captionLayout="dropdown"
                                                onSelect={field.onChange}
                                            />
                                        </PopoverContent>
                                    </Popover>
                                )}
                            />
                            <ErrorMessage errors={errors} name='endDate' render={({ message }) => <p className='text-danger'>{message}</p>} />
                        </div>
                        <div className='grid gap-y-4'>
                            <Label htmlFor='categories'>Categories</Label>
                            <Controller
                                name='categories'
                                control={control}
                                render={({ field }) => (
                                    categoryData.map((category: ICategory) => (
                                        <div key={category._id}>
                                            <Label htmlFor={category._id}>{category.name}</Label>
                                            <Checkbox
                                                checked={field.value?.includes(category._id as string)}
                                                onCheckedChange={(checked) => {
                                                    // Làm tiếp ở đây
                                                }}
                                            />
                                        </div>
                                    ))
                                )}
                            />
                            <ErrorMessage errors={errors} name='categories' render={({ message }) => <p className='text-danger'>{message}</p>} />
                        </div>
                    </div>
                    <Button type='submit'>Submit</Button>
                </form>
            </div>
        </>
    )
}

export default AddVoucher
