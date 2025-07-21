import { useGetParams } from '@/common/hooks/useGetParams'
import type { IAttribute } from '@/common/types/attribute'
import { DataTable } from '@/components/data-table'
import type { AppDispatch } from '@/store/store'
import { getAllAttribute } from '@/store/thunks/attributeThunk'
import { useEffect, useState } from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import AdminAttributeValueForm from './AttributeValueForm'
import { columns } from './columns'

const AdminAttributeValueList = () => {
    const dispatch = useDispatch<AppDispatch>();

    const status = useSelector((state: any) => state.attribute.status, shallowEqual);
    const data2 = useSelector((state: any) => state.attribute.dataAttribute, shallowEqual);
    const [data, setData] = useState<IAttribute[]>([]);

    const { idAttribute } = useGetParams(['idAttribute'])

    useEffect(() => {
        if (data2 && data2.length > 0) {
            const filterData = data2.filter((item: IAttribute) => item._id === idAttribute);
            setData(filterData);
            return
        }
    }, [data2])

    useEffect(() => {
        if (status === 'idle') {
            dispatch(getAllAttribute({ filterDelete: 'true' }));
        }
        return
    }, [status, dispatch]);

    return (
        <div className="grid gap-3">
            <AdminAttributeValueForm />
            <div className="grid w-full">
                <h1 className="sm:text-lg text-base">Attributes list</h1>
                <div className="w-full overflow-x-auto pb-10">
                    <DataTable columns={columns} data={data[0]?.terms ? data[0].terms : []} filterColumn="name" filterPlaceholder="Filter by Name..." />
                </div>
            </div>
        </div>
    )
}

export default AdminAttributeValueList