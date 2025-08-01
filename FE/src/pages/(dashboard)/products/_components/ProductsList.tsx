import { DataTable } from '@/components/data-table';
import { columns } from './columns';
import { shallowEqual, useSelector } from 'react-redux';
import { useAppDispatch } from '@/store/store';
import { useEffect } from 'react';
import { getAllProducts } from '@/store/thunks/productThunk';

const AdminProductsList = () => {
    const dispatch = useAppDispatch();

    const data = useSelector((state: any) => state.product.dataProducts, shallowEqual);
    const statusProducts = useSelector((state: any) => state.product.status, shallowEqual);

    useEffect(() => {
        if (statusProducts && statusProducts === 'idle') {
            dispatch(getAllProducts({}));
        }
        return;
    }, [statusProducts]);

    // console.log('dataProduct: ', data);

    return (
        <div className="grid gap-4 md:gap-6">
            <div className="grid w-full">
                <h1 className="sm:text-2xl text-lg font-bold">Products list</h1>
                <div className="w-full overflow-x-auto pb-10">
                    <DataTable columns={columns} data={data} filterColumn="name" filterPlaceholder="Filter by Name..." />
                </div>
            </div>
        </div>
    )
}

export default AdminProductsList