import type { IAttribute } from "@/common/types/attribute";
import type { IAttributeValue } from "@/common/types/attributeValue";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { addValue, clearAllValue, removeValue, saveAttributes, selectAllValue, setIsDeleteFalse, setIsDeleteTrue } from "@/store/slices/attributeSlice";
import type { AppDispatch } from "@/store/store";
import { AlignJustify, ChevronDown, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useDispatch } from "react-redux";
import { toast } from "sonner";

const AdminConfigAttributes = ({ dataAttribute }: { dataAttribute: IAttribute[] }) => {
    const [openAttribute, setOpenAttribute] = useState<string>('');
    const [openDropdownTerms, setOpenDropdownTerms] = useState<string>('');
    const dispatch = useDispatch<AppDispatch>();

    const [selectAttribute, setSelectAttribute] = useState<string>('');

    const addNew = () => {
        if (selectAttribute !== '') {
            return dispatch(setIsDeleteFalse({ idAttribute: selectAttribute }));
        }
        toast.warning('Choose an attribute');
    }

    useEffect(() => {
        const body = document.body;
        const closeDropdown = () => setOpenDropdownTerms('');

        if (!body) return;

        if (openDropdownTerms !== '') {
            body.classList.add('overflow-y-hidden');
            setTimeout(() => {
                body.addEventListener('click', closeDropdown);
            }, 1)
        } else {
            body.classList.remove('overflow-y-hidden');
            body.removeEventListener('click', closeDropdown);
        }

        return () => {
            body.classList.remove('overflow-y-hidden');
            body.removeEventListener('click', closeDropdown);
        }
    }, [openDropdownTerms]);

    return (
        <div className="w-full flex flex-col gap-[1px] select-none overflow-y-">
            <div className="flex items-center gap-2 mb-2 *:select-none">
                <div
                    onClick={() => addNew()}
                    className="border broder-primary bg-primary text-white px-4 py-2 rounded-md cursor-pointer hover:opacity-85"
                >
                    Add attribute
                </div>
                <Select onValueChange={(value) => setSelectAttribute(value)}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select an attribute" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            {dataAttribute.map((item: IAttribute) => (
                                <SelectItem
                                    key={item._id}
                                    value={item._id as string}
                                    className={`${item.isDelete === false && 'opacity-50'}`}
                                    disabled={item.isDelete === false}
                                >
                                    {item.name}
                                </SelectItem>
                            ))}
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>
            {dataAttribute && dataAttribute.length > 0
                ?
                (() => {
                    const filterAttribute = dataAttribute.filter((item) => item.isDelete === false);

                    if (filterAttribute.length === 0) return (
                        <div className="flex w-full h-full justify-center items-center">
                            <p className="px-4 py-2 rounded-full bg-gray-100">Select an attribute and "Add attribute"</p>
                        </div>
                    )
                    return filterAttribute.map((attri) => (
                        <div key={attri._id} className={`transition-all duration-300 ${openAttribute === attri.slug ? 'h-[228px]' : 'h-[38px]'} overflow-hidden`}>
                            <div
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setOpenAttribute((prev) => {
                                        if (prev === attri.slug) return '';
                                        return attri.slug ?? '';
                                    });
                                }}
                                className="flex justify-between items-center border p-2"
                            >
                                <p>{attri.name}</p>
                                <div className="text-[#737373] flex gap-3 *:cursor-pointer">
                                    <p
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            dispatch(setIsDeleteTrue({ idAttribute: attri._id }));
                                        }}
                                        className="text-danger hover:underline"
                                    >
                                        Remove
                                    </p>
                                    <AlignJustify size={18} />
                                    <ChevronDown size={18} className={`transition-all duration-300 ${openAttribute === attri.slug && 'rotate-180'}`} />
                                </div>
                            </div>
                            <div className="grid grid-cols-[max-content_auto] gap-x-4 pt-2 *:gap-1">
                                <div className="flex flex-col">
                                    <p>Name:</p>
                                    <p className="font-medium">{attri.name}</p>
                                </div>
                                <div className="flex flex-col max-w-[860px] overflow-hidden">
                                    <p>Value(s):</p>
                                    <div className="p-1 border rounded-sm">
                                        <div
                                            onClick={() => setOpenDropdownTerms((prev) => {
                                                if (prev === attri.slug) return '';
                                                return attri.slug ?? '';
                                            })}
                                            className="flex gap-2"
                                        >
                                            {attri.value && attri.value.length > 0
                                                ?
                                                attri.value.map((items: IAttributeValue) => (
                                                    <div
                                                        key={items._id}
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            dispatch(removeValue({ idAttribute: attri._id, idValue: items._id }));
                                                        }}
                                                        className="flex items-center cursor-pointer hover:bg-gray-300 bg-gray-200 gap-1 px-2 py-1 border rounded-sm"
                                                    >
                                                        <X size={16} className="text-gray-500" />
                                                        <p>{items.name}</p>
                                                    </div>
                                                ))
                                                :
                                                <p className="px-2 py-[5px] rounded-sm text-gray-500">Choose a value</p>
                                            }
                                        </div>
                                    </div>
                                    <div
                                        onClick={(e) => e.stopPropagation()}
                                        className={`*:p-2 transition-all duration-300 ${openDropdownTerms === attri.slug ? 'h-[110px] border' : 'h-0'} overflow-y-auto rounded-b-sm flex flex-col z-50 bg-white shadow`}
                                    >
                                        {attri.terms && attri.terms.length > 0
                                            ?
                                            (() => {
                                                const filterTerm = attri.terms.filter((term: IAttributeValue) => (
                                                    attri.value && !attri.value.some((val: IAttributeValue) => val._id === term._id)
                                                ));

                                                if (filterTerm.length === 0) {
                                                    return (
                                                        <div className="flex h-full w-full items-center justify-center">
                                                            <p>All values has been choose.</p>
                                                        </div>
                                                    )
                                                }

                                                return filterTerm.map((term: IAttributeValue) => (
                                                    <div
                                                        onClick={() => dispatch(addValue({ idAttribute: attri._id, idTerm: term._id }))}
                                                        key={term._id}
                                                        className="cursor-pointer hover:bg-gray-200"
                                                    >
                                                        <p>{term.name}</p>
                                                    </div>
                                                ))
                                            })()
                                            :
                                            <div className="flex w-full h-full justify-center items-center">
                                                <p>No result.</p>
                                            </div>
                                        }
                                    </div>
                                    <div className="flex gap-2">
                                        <div
                                            onClick={() => dispatch(selectAllValue({ idAttribute: attri._id }))}
                                            className="px-3 py-1.5 rounded-md bg-primary text-white cursor-pointer hover:opacity-85"
                                        >
                                            Select-all
                                        </div>
                                        <div
                                            onClick={() => dispatch(clearAllValue({ idAttribute: attri._id }))}
                                            className="px-3 py-1.5 rounded-md bg-primary text-white cursor-pointer hover:opacity-85"
                                        >
                                            Clear-all
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                })()
                :
                <p>No result.</p >
            }
            <div className="flex mt-6">
                <div
                    onClick={() => dispatch(saveAttributes())}
                    className="border px-4 py-2 bg-primary text-white rounded-md hover:opacity-85 cursor-pointer"
                >
                    Save attributes
                </div>
            </div>
        </div >
    )
}

export default AdminConfigAttributes