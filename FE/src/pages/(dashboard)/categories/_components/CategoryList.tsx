import { DataTable } from '@/components/data-table'
import CategoryForm from './CategoryForm'
import { columns } from './columns'
import { shallowEqual, useSelector } from 'react-redux';

const CategoryList = () => {
    const data = useSelector((state: any) => state.categories.categoriesData, shallowEqual);

    return (
        <div>
            <p className="text-2xl font-bold mb-6">Categories</p>
            <CategoryForm />
            <DataTable data={[...data].reverse()} columns={columns} />
        </div>
    )
}

export default CategoryList
