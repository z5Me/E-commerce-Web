import { Grid2x2, SquareChartGantt } from "lucide-react";
import AdminConfigAttributes from "./ConfigAttributes";
import AdminConfigVariant from "./ConfigVariant";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { shallowEqual, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useAppDispatch } from "@/store/store";
import { generateVariant } from "@/store/thunks/variantThunk";
import { toast } from "sonner";
import type { UseFormReturn } from "react-hook-form";
import type z from "zod";
import type { productSchema } from "@/common/schemas/productSchema";
import { useLocation } from "react-router";

const ProductData = ({ form }: { form: UseFormReturn<z.infer<typeof productSchema>> }) => {
    const dispatch = useAppDispatch();

    const [switchCase, setSwitchCase] = useState<string>('attributes');
    const location = useLocation();
    useEffect(() => {
        if (location.pathname === '/admin/products/edit') return setSwitchCase('variants');

        return;
    }, [location]);

    const dataAttribute = useSelector((state: any) => state.attribute.dataAttribute, shallowEqual);

    const dataGenerateVariant = useSelector((state: any) => state.attribute.dataGenerateVariant, shallowEqual);
    const handleGenerate = () => {
        if (dataGenerateVariant.length !== 0) {
            dispatch(generateVariant(dataGenerateVariant));
            return;
        }
        toast.warning('Choose and save attributes to continue');
    }

    const dataVariant = useSelector((state: any) => state.variant.dataVariant, shallowEqual);
    useEffect(() => {
        if (dataVariant && dataVariant.length > 0) {
            form.reset({
                ...form.getValues(),
                variants: dataVariant,
            })
        }
    }, [dataVariant]);

    return (
        <Accordion type="single" collapsible defaultValue="item-1">
            <AccordionItem value="item-1">
                <AccordionTrigger className="p-0 mb-6 border-b rounded-none">Product data</AccordionTrigger>
                <AccordionContent>
                    <div className="w-full flex gap-x-4 py-1">
                        <div className="w-[200px] h-[200px]">
                            <div onClick={() => setSwitchCase('attributes')} className={`px-2 py-3 flex gap-2 items-center cursor-pointer ${switchCase === 'attributes' ? 'bg-gray-100' : 'bg-transparent hover:bg-gray-100'} `}>
                                <SquareChartGantt size={20} />
                                <p>Attributes</p>
                            </div>
                            <div onClick={() => setSwitchCase('variants')} className={`px-2 py-3 flex gap-2 items-center cursor-pointer ${switchCase === 'variants' ? 'bg-gray-100' : 'bg-transparent hover:bg-gray-100'} `}>
                                <Grid2x2 size={20} />
                                <p>Varaints</p>
                            </div>
                        </div>
                        {(switchCase && switchCase === 'attributes')
                            ?
                            <>
                                <AdminConfigAttributes dataAttribute={dataAttribute} />
                            </>
                            :
                            switchCase === 'variants'
                                ?
                                < div className="flex flex-col gap-3 w-full">
                                    <div className="">
                                        <div
                                            onClick={() => handleGenerate()}
                                            className="border w-fit px-2 py-1.5 rounded-sm hover:bg-gray-100 cursor-pointer select-none"
                                        >
                                            Generate variants
                                        </div>
                                    </div>

                                    {dataVariant && dataVariant.length > 0 && dataVariant.map((item: any, index: number) => (
                                        <AdminConfigVariant key={item._id} data={item} form={form} index={index} />
                                    ))}
                                </div>
                                :
                                <div></div>
                        }

                    </div>
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    )
}

export default ProductData
