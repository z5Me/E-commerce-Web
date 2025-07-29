import type { productSchema } from "@/common/schemas/productSchema";
import type { variantSchema } from "@/common/schemas/variantSchema";
import type { IAttributeValue } from "@/common/types/attributeValue";
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import { useAppDispatch } from "@/store/store";
import { removeVariant } from "@/store/thunks/variantThunk";
import { ImagePlus } from "lucide-react";
import { useEffect, useState } from "react";
import type { UseFormReturn } from "react-hook-form";
import type z from "zod";

type Props = {
    form: UseFormReturn<z.infer<typeof productSchema>>;
    index: number;
    data: z.infer<typeof variantSchema>;
};
const AdminConfigVariant = ({ data, form, index }: Props) => {
    const dispatch = useAppDispatch();
    const [openDropdownVariant, setOpenDropdownVariant] = useState<string>('id');
    const [previewImagesVariant, setPreviewImagesVariant] = useState<Record<number, string>>({});

    useEffect(() => {
        if (data && data.image) {
            setPreviewImagesVariant((prev) => ({
                ...prev,
                [index]: typeof data.image === "string" ? data.image : "",
            }))
        };
    }, [data]);

    return (
        <>
            <div className="flex flex-col gap-1">
                <div
                    onClick={() => setOpenDropdownVariant((prev) => {
                        if (prev === 'id') return '';
                        return 'id';
                    })}
                    className="flex justify-between items-center gap-2 border-b pb-2"
                >
                    <p className="font-bold">#{data._id?.slice(-4)}</p>
                    <div className="flex-1 flex gap-1 *:select-none">
                        {data.values?.map((item: IAttributeValue) => (
                            <div key={item._id} className="border px-4 py-1 rounded-sm font-medium">
                                {item.name}
                            </div>
                        ))}
                    </div>
                    <div className="flex gap-4 font-medium *:hover:underline *:cursor-pointer">
                        <p
                            onClick={(e) => {
                                e.stopPropagation();
                                dispatch(removeVariant({ idVariant: data._id as string }));
                            }}
                            className="text-danger"
                        >
                            Remove
                        </p>
                        <p className="text-blue-500">Edit</p>
                    </div>
                </div>

                <div className={`w-full grid px-1 ${openDropdownVariant === 'id' ? 'h-[400px] border-b pt-4' : 'h-0 p-0'} overflow-hidden transition-all duration-300`}>
                    <div className="grid grid-cols-2 gap-x-4">
                        <div>
                            <FormField
                                control={form.control}
                                name={`variants.${index}.image`}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel htmlFor={`image${index}`}>
                                            {previewImagesVariant[index] ? (
                                                <img
                                                    src={previewImagesVariant[index]}
                                                    alt="Preview"
                                                    className="w-24 h-24 object-cover rounded-md border"
                                                />
                                            ) : (
                                                <ImagePlus size={48} />
                                            )}
                                        </FormLabel>

                                        <FormControl>
                                            <Input
                                                id={`image${index}`}
                                                type="file"
                                                accept="image/*"
                                                className="hidden"
                                                onChange={(e) => {
                                                    const file = e.target.files?.[0];
                                                    if (file) {
                                                        field.onChange(file);
                                                        const url = URL.createObjectURL(file);
                                                        setPreviewImagesVariant((prev) => ({
                                                            ...prev,
                                                            [index]: url,
                                                        }));
                                                    }
                                                }}
                                            />
                                        </FormControl>

                                        <FormDescription>Image for this variant.</FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div>
                            <FormField
                                control={form.control}
                                name={`variants.${index}.sku`}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>SKU</FormLabel>
                                        <FormControl>
                                            <Input placeholder="SKU..." {...field} />
                                        </FormControl>
                                        <FormDescription>
                                            The SKU of variant
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-x-4">
                        <div>
                            <FormField
                                control={form.control}
                                name={`variants.${index}.countOnStock`}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Count on stock</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                value={field.value ?? 0}
                                                onChange={(e) => field.onChange(e.target.value)}
                                            />
                                        </FormControl>
                                        <FormDescription>
                                            Count on stock.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div>
                            <FormField
                                control={form.control}
                                name={`variants.${index}.typeDiscount`}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Type Discount</FormLabel>
                                        <Select onValueChange={field.onChange} value={field.value ?? "fixed"}>
                                            <FormControl className="w-full">
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select a type" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="fixed">Fixed</SelectItem>
                                                <SelectItem value="percent">Percent</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormDescription>
                                            Type of discount.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-x-4">
                        <div>
                            <FormField
                                control={form.control}
                                name={`variants.${index}.price`}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Price</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                step="any"
                                                value={field.value ?? 0}
                                                onChange={(e) => {
                                                    const value = e.target.value;
                                                    field.onChange(value === "" ? "" : parseFloat(value));
                                                }}
                                            />
                                        </FormControl>
                                        <FormDescription>
                                            Price of this variant.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                        </div>
                        <div>
                            <FormField
                                control={form.control}
                                name={`variants.${index}.discount`}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Discount</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                step="any"
                                                value={field.value ?? 0}
                                                onChange={(e) => {
                                                    const value = e.target.value;
                                                    field.onChange(value === "" ? "" : parseFloat(value));
                                                }}
                                            />
                                        </FormControl>
                                        <FormDescription>
                                            Discount of this variant.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AdminConfigVariant