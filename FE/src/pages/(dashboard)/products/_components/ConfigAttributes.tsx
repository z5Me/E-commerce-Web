import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AlignJustify, ChevronDown, X } from 'lucide-react';
import { useState } from 'react';

const AdminConfigAttributes = () => {
    const [openAttribute, setOpenAttribute] = useState<string>('size');
    const [openDropdownTerms, setOpenDropdownTerms] = useState<string>('');
    return (
        <div className="w-full flex flex-col gap-[1px] select-none">
            <div className="flex items-center gap-2 mb-2 pl-3 *:select-none">
                <div className="border broder-primary px-2 py-1.5 rounded-sm">Add new</div>
                <Select>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select a fruit" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectItem value="apple">Apple</SelectItem>
                            <SelectItem value="banana">Banana</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>
            <div id="size" className={`transition-all duration-300 ${openAttribute === 'size' ? 'h-[228px]' : 'h-[38px]'} overflow-hidden`}>
                <div
                    onClick={() => setOpenAttribute((prev) => {
                        if (prev === 'size') return '';
                        return 'size';
                    })}
                    className="flex justify-between items-center border p-2"
                >
                    <p>Size</p>
                    <div className="text-[#737373] flex gap-3 *:cursor-pointer">
                        <p className="text-danger hover:underline">Remove</p>
                        <AlignJustify size={18} />
                        <ChevronDown size={18} className={`transition-all duration-300 ${openAttribute === 'size' && 'rotate-180'}`} />
                    </div>
                </div>
                <div className="grid grid-cols-[max-content_auto] gap-x-4 pt-2 *:gap-1">
                    <div className="flex flex-col">
                        <p>Name:</p>
                        <p className="font-medium">Size</p>
                    </div>
                    <div className="flex flex-col max-w-[860px] overflow-hidden">
                        <p>Value(s):</p>
                        <div className="p-1 border rounded-sm">
                            <div
                                onClick={() => setOpenDropdownTerms((prev) => {
                                    if (prev === 'size') return '';
                                    return 'size';
                                })}
                                className="flex gap-2 *:cursor-pointer *:hover:bg-gray-300"
                            >
                                <div onClick={(e) => e.stopPropagation()} className="flex items-center bg-gray-200 gap-1 px-2 py-1 border rounded-sm">
                                    <X size={16} className="text-gray-500" />
                                    <p>Large</p>
                                </div>
                                <div onClick={(e) => e.stopPropagation()} className="flex items-center bg-gray-200 gap-1 px-2 py-1 border rounded-sm">
                                    <X size={16} className="text-gray-500" />
                                    <p>Medium</p>
                                </div>
                                <div onClick={(e) => e.stopPropagation()} className="flex items-center bg-gray-200 gap-1 px-2 py-1 border rounded-sm">
                                    <X size={16} className="text-gray-500" />
                                    <p>Small</p>
                                </div>
                            </div>
                        </div>
                        <div className={`*:p-2 *:hover:bg-gray-200 transition-all duration-300 ${openDropdownTerms === 'size' ? 'h-[110px] border' : 'h-0'} overflow-auto rounded-b-sm flex flex-col z-50 bg-white shadow`}>
                            <div className="cursor-pointer">
                                <p>Large</p>
                            </div>
                            <div className="cursor-pointer">
                                <p>Medium</p>
                            </div>
                            <div className="cursor-pointer">
                                <p>Small</p>
                            </div>
                            <div className="cursor-pointer">
                                <p>Large</p>
                            </div>
                            <div className="cursor-pointer">
                                <p>Medium</p>
                            </div>
                            <div className="cursor-pointer">
                                <p>Small</p>
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <div className="px-2 py-1.5 border rounded-sm">Select-all</div>
                            <div className="px-2 py-1.5 border rounded-sm">Clear-all</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="h-[38px]">
                <div className="flex justify-between items-center border p-2">
                    <p>Color</p>
                    <div className="text-[#737373] flex gap-3 *:cursor-pointer">
                        <p className="text-danger hover:underline">Remove</p>
                        <AlignJustify size={18} />
                        <ChevronDown size={18} />
                    </div>
                </div>
            </div>
            <div className="flex mt-6 pl-3">
                <div className="border px-2 py-1.5 rounded-sm">Save attributes</div>
            </div>
        </div>
    )
}

export default AdminConfigAttributes