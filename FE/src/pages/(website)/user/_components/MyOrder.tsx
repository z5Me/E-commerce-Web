import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Check, ClipboardList, Download, Hourglass, PackagePlus, Search, Truck, X } from "lucide-react";

const MyOrder = () => {

    return (
        <div className="grid gap-4">
            {/* Search and filter */}
            <div className="grid grid-cols-2 items-center justify-between">
                <div className="w-full">
                    <div className="flex w-full max-w-[448px] border border-primary rounded-md items-center h-10 overflow-hidden">
                        <Search size={24} className="mx-2 select-none" />
                        <div className="w-full py-2">
                            <input type="text" className="w-full relative text-base outline-0" placeholder="Search by Order ID" />
                        </div>
                        <div className="h-full flex items-center bg-primary text-white px-4 hover:opacity-85 cursor-pointer select-none">
                            <p>Search</p>
                        </div>
                    </div>
                </div>
                <div className="w-full flex items-center justify-end">
                    <div className="w-fit flex px-1 items-center gap-2">
                        <label htmlFor="status-select">Status</label>
                        <Select>
                            <SelectTrigger id="status-select" className="w-[180px]">
                                <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="pending">Pending</SelectItem>
                                <SelectItem value="processing">Processing</SelectItem>
                                <SelectItem value="shipping">Shipping</SelectItem>
                                <SelectItem value="complete">Complete</SelectItem>
                                <SelectItem value="cancel">Cancel</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            </div>

            {/* Order list */}
            <div className="grid gap-4">
                {/* Order */}
                <div className="border border-[#e5e7eb] rounded-md p-4 grid gap-4">
                    <div className="grid grid-cols-2">
                        <div className="flex flex-col gap-x-4 gap-y-2">
                            <div className="flex flex-wrap gap-4">
                                <p className="text-[#6b7280] font-medium">Order ID: <span className="text-primary font-semibold">#FWB1273643</span></p>
                                <div>
                                    <div className="flex items-center gap-2 py-1 px-3 rounded-sm text-xs text-[#1e40af] bg-[#dbeafe]">
                                        <Truck size={12} />
                                        <p>Shipping</p>
                                    </div>
                                </div>
                            </div>
                            <div className="flex gap-2 items-center text-[#1d4ed8] font-semibold hover:underline cursor-pointer">
                                <Download size={18} />
                                <p>Download invoice</p>
                            </div>
                        </div>
                        <div className="flex flex-wrap justify-end select-none gap-4">
                            <div>
                                <div className="bg-danger hover:opacity-85 cursor-pointer text-white px-3 py-1 rounded-sm p-2">Cancel order</div>
                            </div>
                            <div>
                                <div className="border cursor-pointer text-primary px-3 py-1 rounded-sm p-2 flex items-center gap-1 hover:bg-primary/5">
                                    <ClipboardList size={16} />
                                    <p>Cancel order</p>
                                </div>
                            </div>
                            <div>
                                <div className="border cursor-pointer text-primary px-3 py-1 rounded-sm p-2 flex items-center gap-1 hover:bg-primary/5">
                                    <p>Order details</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="w-full h-[1px] bg-primary/8"></div>
                    <div className="flex flex-wrap gap-4">
                        <div>
                            <div className="flex gap-2">
                                <p className="font-semibold">Order date:</p>
                                <p className="">24 January 2024</p>
                            </div>
                        </div>
                        <div>
                            <div className="flex gap-2">
                                <p className="font-semibold">Email:</p>
                                <p className="">hoang@gmail.com</p>
                            </div>
                        </div>
                        <div>
                            <div className="flex gap-2">
                                <p className="font-semibold">Payment method:</p>
                                <p className="">COD</p>
                            </div>
                        </div>
                    </div>
                    <div className="rounded-md bg-[#dbeafe] flex text-[#1e40af] py-2 px-4 items-center gap-2">
                        <Truck size={18} />
                        <p>Expected delivery on <span className="font-semibold">Monday 16 Jul 2024</span> </p>
                    </div>
                </div>

                <div className="border border-[#e5e7eb] rounded-md p-4 grid gap-4">
                    <div className="grid grid-cols-2">
                        <div className="flex flex-col gap-x-4 gap-y-2">
                            <div className="flex flex-wrap gap-4">
                                <p className="text-[#6b7280] font-medium">Order ID: <span className="text-primary font-semibold">#FWB1273643</span></p>
                                <div>
                                    <div className="flex items-center gap-2 py-1 px-3 rounded-sm text-xs text-danger bg-[#fde8e8]">
                                        <X size={12} />
                                        <p>Cancelled</p>
                                    </div>
                                </div>
                            </div>
                            <div className="flex gap-2 items-center text-[#1d4ed8] font-semibold hover:underline cursor-pointer">
                                <Download size={18} />
                                <p>Download invoice</p>
                            </div>
                        </div>
                        <div className="flex flex-wrap justify-end select-none gap-4">
                            <div>
                                <div className="bg-danger hover:opacity-85 cursor-pointer text-white px-3 py-1 rounded-sm p-2">Cancel order</div>
                            </div>
                            <div>
                                <div className="border cursor-pointer text-primary px-3 py-1 rounded-sm p-2 flex items-center gap-1 hover:bg-primary/5">
                                    <ClipboardList size={16} />
                                    <p>Cancel order</p>
                                </div>
                            </div>
                            <div>
                                <div className="border cursor-pointer text-primary px-3 py-1 rounded-sm p-2 flex items-center gap-1 hover:bg-primary/5">
                                    <p>Order details</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="w-full h-[1px] bg-primary/8"></div>
                    <div className="flex flex-wrap gap-4">
                        <div>
                            <div className="flex gap-2">
                                <p className="font-semibold">Order date:</p>
                                <p className="">24 January 2024</p>
                            </div>
                        </div>
                        <div>
                            <div className="flex gap-2">
                                <p className="font-semibold">Email:</p>
                                <p className="">hoang@gmail.com</p>
                            </div>
                        </div>
                        <div>
                            <div className="flex gap-2">
                                <p className="font-semibold">Payment method:</p>
                                <p className="">COD</p>
                            </div>
                        </div>
                    </div>
                    <div className="rounded-md bg-[#f7f7f7] flex text-primary py-2 px-4 items-center gap-2">
                        <X size={18} />
                        <p>Cancelled on <span className="font-semibold">Monday 16 Jul 2024</span> </p>
                    </div>
                </div>

                <div className="border border-[#e5e7eb] rounded-md p-4 grid gap-4">
                    <div className="grid grid-cols-2">
                        <div className="flex flex-col gap-x-4 gap-y-2">
                            <div className="flex flex-wrap gap-4">
                                <p className="text-[#6b7280] font-medium">Order ID: <span className="text-primary font-semibold">#FWB1273643</span></p>
                                <div>
                                    <div className="flex items-center gap-2 py-1 px-3 rounded-sm text-xs text-[#03543f] bg-[#def7ec]">
                                        <Check size={12} />
                                        <p>Completed</p>
                                    </div>
                                </div>
                            </div>
                            <div className="flex gap-2 items-center text-[#1d4ed8] font-semibold hover:underline cursor-pointer">
                                <Download size={18} />
                                <p>Download invoice</p>
                            </div>
                        </div>
                        <div className="flex flex-wrap justify-end select-none gap-4">
                            <div>
                                <div className="bg-danger hover:opacity-85 cursor-pointer text-white px-3 py-1 rounded-sm p-2">Cancel order</div>
                            </div>
                            <div>
                                <div className="border cursor-pointer text-primary px-3 py-1 rounded-sm p-2 flex items-center gap-1 hover:bg-primary/5">
                                    <ClipboardList size={16} />
                                    <p>Cancel order</p>
                                </div>
                            </div>
                            <div>
                                <div className="border cursor-pointer text-primary px-3 py-1 rounded-sm p-2 flex items-center gap-1 hover:bg-primary/5">
                                    <p>Order details</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="w-full h-[1px] bg-primary/8"></div>
                    <div className="flex flex-wrap gap-4">
                        <div>
                            <div className="flex gap-2">
                                <p className="font-semibold">Order date:</p>
                                <p className="">24 January 2024</p>
                            </div>
                        </div>
                        <div>
                            <div className="flex gap-2">
                                <p className="font-semibold">Email:</p>
                                <p className="">hoang@gmail.com</p>
                            </div>
                        </div>
                        <div>
                            <div className="flex gap-2">
                                <p className="font-semibold">Payment method:</p>
                                <p className="">COD</p>
                            </div>
                        </div>
                    </div>
                    <div className="rounded-md bg-[#f7f7f7] flex text-primary py-2 px-4 items-center gap-2">
                        <Check size={18} />
                        <p>Completed on <span className="font-semibold">Monday 16 Jul 2024</span> </p>
                    </div>
                </div>

                <div className="border border-[#e5e7eb] rounded-md p-4 grid gap-4">
                    <div className="grid grid-cols-2">
                        <div className="flex flex-col gap-x-4 gap-y-2">
                            <div className="flex flex-wrap gap-4">
                                <p className="text-[#6b7280] font-medium">Order ID: <span className="text-primary font-semibold">#FWB1273643</span></p>
                                <div>
                                    <div className="flex items-center gap-2 py-1 px-3 rounded-sm text-xs text-[#8a2c0d] bg-[#fff8f1]">
                                        <Hourglass size={12} />
                                        <p>Pending</p>
                                    </div>
                                </div>
                            </div>
                            <div className="flex gap-2 items-center text-[#1d4ed8] font-semibold hover:underline cursor-pointer">
                                <Download size={18} />
                                <p>Download invoice</p>
                            </div>
                        </div>
                        <div className="flex flex-wrap justify-end select-none gap-4">
                            <div>
                                <div className="bg-danger hover:opacity-85 cursor-pointer text-white px-3 py-1 rounded-sm p-2">Cancel order</div>
                            </div>
                            <div>
                                <div className="border cursor-pointer text-primary px-3 py-1 rounded-sm p-2 flex items-center gap-1 hover:bg-primary/5">
                                    <ClipboardList size={16} />
                                    <p>Cancel order</p>
                                </div>
                            </div>
                            <div>
                                <div className="border cursor-pointer text-primary px-3 py-1 rounded-sm p-2 flex items-center gap-1 hover:bg-primary/5">
                                    <p>Order details</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="w-full h-[1px] bg-primary/8"></div>
                    <div className="flex flex-wrap gap-4">
                        <div>
                            <div className="flex gap-2">
                                <p className="font-semibold">Order date:</p>
                                <p className="">24 January 2024</p>
                            </div>
                        </div>
                        <div>
                            <div className="flex gap-2">
                                <p className="font-semibold">Email:</p>
                                <p className="">hoang@gmail.com</p>
                            </div>
                        </div>
                        <div>
                            <div className="flex gap-2">
                                <p className="font-semibold">Payment method:</p>
                                <p className="">COD</p>
                            </div>
                        </div>
                    </div>
                    <div className="rounded-md bg-[#fff8f1] flex text-[#8a2c0d] py-2 px-4 items-center gap-2">
                        <Hourglass size={18} />
                        <p>Pending on <span className="font-semibold">Monday 16 Jul 2024</span> </p>
                    </div>
                </div>

                <div className="border border-[#e5e7eb] rounded-md p-4 grid gap-4">
                    <div className="grid grid-cols-2">
                        <div className="flex flex-col gap-x-4 gap-y-2">
                            <div className="flex flex-wrap gap-4">
                                <p className="text-[#6b7280] font-medium">Order ID: <span className="text-primary font-semibold">#FWB1273643</span></p>
                                <div>
                                    <div className="flex items-center gap-2 py-1 px-3 rounded-sm text-xs text-[#723b13] bg-[#fdf6b2]">
                                        <PackagePlus size={12} />
                                        <p>Processing</p>
                                    </div>
                                </div>
                            </div>
                            <div className="flex gap-2 items-center text-[#1d4ed8] font-semibold hover:underline cursor-pointer">
                                <Download size={18} />
                                <p>Download invoice</p>
                            </div>
                        </div>
                        <div className="flex flex-wrap justify-end select-none gap-4">
                            <div>
                                <div className="bg-danger hover:opacity-85 cursor-pointer text-white px-3 py-1 rounded-sm p-2">Cancel order</div>
                            </div>
                            <div>
                                <div className="border cursor-pointer text-primary px-3 py-1 rounded-sm p-2 flex items-center gap-1 hover:bg-primary/5">
                                    <ClipboardList size={16} />
                                    <p>Cancel order</p>
                                </div>
                            </div>
                            <div>
                                <div className="border cursor-pointer text-primary px-3 py-1 rounded-sm p-2 flex items-center gap-1 hover:bg-primary/5">
                                    <p>Order details</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="w-full h-[1px] bg-primary/8"></div>
                    <div className="flex flex-wrap gap-4">
                        <div>
                            <div className="flex gap-2">
                                <p className="font-semibold">Order date:</p>
                                <p className="">24 January 2024</p>
                            </div>
                        </div>
                        <div>
                            <div className="flex gap-2">
                                <p className="font-semibold">Email:</p>
                                <p className="">hoang@gmail.com</p>
                            </div>
                        </div>
                        <div>
                            <div className="flex gap-2">
                                <p className="font-semibold">Payment method:</p>
                                <p className="">COD</p>
                            </div>
                        </div>
                    </div>
                    <div className="rounded-md  bg-[#fdf6b2] flex text-[#723b13] py-2 px-4 items-center gap-2">
                        <PackagePlus size={18} />
                        <p>Delivered on <span className="font-semibold">Monday 16 Jul 2024</span> </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MyOrder
