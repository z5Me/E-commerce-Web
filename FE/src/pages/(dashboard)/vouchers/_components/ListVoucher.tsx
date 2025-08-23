import { DataTable } from '@/components/data-table'
import { shallowEqual, useSelector } from 'react-redux'
import { columns } from './columns';

const ListVoucher = () => {
    const data = useSelector((state: any) => state.voucher.dataVoucher, shallowEqual);

    return (
        <div className="grid gap-4 md:gap-6">
            <div className="grid w-full">
                <h1 className="sm:text-2xl text-lg font-bold">Voucher list</h1>
                <div className="w-full overflow-x-auto pb-10">
                    <DataTable data={[...data].reverse()} columns={columns} filterColumn={'voucherCode'} />
                </div>
            </div>
        </div>
    )
}

export default ListVoucher
