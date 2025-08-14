import { useLoading } from "@/contexts/LoadingScreen";
import { useAppDispatch } from "@/store/store";
import { getAllCategories } from "@/store/thunks/categoriesThunk";
import { useEffect } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { Outlet } from "react-router";

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


    useEffect(() => {
        dispatch(getAllCategories({}));
    }, []);

    return (
        <div className='grid gap-y-8'>
            <Outlet />
        </div>
    )
}

export default CategoriesPage
