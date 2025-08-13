import { useLoading } from "@/contexts/LoadingScreen"
import CategoryForm from "./_components/CategoryForm"
import { shallowEqual, useSelector } from "react-redux";
import { useEffect } from "react";
import { DataTable } from "@/components/data-table";
import { columns } from "./_components/columns";
import { useAppDispatch } from "@/store/store";
import { getAllCategories } from "@/store/thunks/categoriesThunk";

const CategoriesPage = () => {
    const { show, hide } = useLoading();
    const dispatch = useAppDispatch();
    const categoriesStatus = useSelector((state: any) => state.categories.status, shallowEqual);
    useEffect(() => {
        if (categoriesStatus && categoriesStatus === 'pending') {
            show();
            return;
        }
        hide();
        return;
    }, [categoriesStatus]);

    const data = useSelector((state: any) => state.categories.categoriesData, shallowEqual);
    useEffect(() => {
        dispatch(getAllCategories({}));
    }, []);

    return (
        <div className='grid gap-y-8'>
            <p className="text-2xl font-bold">Categories</p>
            <CategoryForm />
            <DataTable data={[...data].reverse()} columns={columns} />
        </div>
    )
}

export default CategoriesPage
