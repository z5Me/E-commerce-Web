
type Iitem = {
    receiver: string,
    phone: string,
    addressName: string,
    selected: boolean
}

const DeliveryAddress = ({ item, openEdit = true }: { item: Iitem, openEdit?: boolean }) => {
    return (
        <div className={`flex font-MJSatoshi flex-col gap-1 px-4 py-2 ${openEdit ? 'bg-gray-50 hover:bg-gray-100 cursor-pointer text-primary' : 'bg-gray-200 text-gray-600'}  focus:bg-gray-50 focus:outline-primary`} >
            <p>Receiver: {item.receiver}</p>
            <span>Phone: {item.phone}</span>
            <p>Address: {item.addressName}</p>
            {item.selected &&
                <div>
                    <span className='font-Satoshi text-xs px-2 py-1 rounded-[6px] text-white bg-primary'>Default</span>
                </div>
            }
        </div>
    )
}

export default DeliveryAddress