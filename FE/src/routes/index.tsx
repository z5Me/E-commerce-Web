import { lazy, Suspense } from "react"

import DashBoardPage from "@/pages/(dashboard)/dashboard/page"
import LayoutAdmin from "@/pages/(dashboard)/layout"
import AdminProductsList from "@/pages/(dashboard)/products/_components/ProductsList"
import LayoutAdminProductsPage from "@/pages/(dashboard)/products/page"
import Signin from "@/pages/(website)/auth/_components/Signin"
import Signup from "@/pages/(website)/auth/_components/Signup"
import AuthPage from "@/pages/(website)/auth/page"
import Checkout from "@/pages/(website)/cart/_components/Checkout"
import OrderComplete from "@/pages/(website)/cart/_components/OrderComplete"
import ShoppingCart from "@/pages/(website)/cart/_components/ShoppingCart"
import CartPage from "@/pages/(website)/cart/page"
import CategoryPage from "@/pages/(website)/category/page"
import ProductDetail from "@/pages/(website)/productdetail/page"
import UserPage from "@/pages/(website)/user/page"
import { Navigate, Route, Routes } from "react-router"
import HomePage from "../pages/(website)/homepage/page"
import LayoutWebsite from "../pages/(website)/layout"
import AdminAttributesPage from "@/pages/(dashboard)/attributes/page"
import AdminAttributeValuesPage from "@/pages/(dashboard)/attributeValue/page"
import AdminAttributeList from "@/pages/(dashboard)/attributes/_components/AttributeList"
import AdminAttributeValueList from "@/pages/(dashboard)/attributeValue/_components/AttributeValueList"
import AdminAttributeValueEdit from "@/pages/(dashboard)/attributeValue/_components/AttributeValueEdit"
import AdminAttributeEdit from "@/pages/(dashboard)/attributes/_components/AttributeEdit"
import AdminProductsAdd from "@/pages/(dashboard)/products/_components/ProductsAdd"
import ProductsEdit from "@/pages/(dashboard)/products/_components/ProductsEdit"

const Router = () => {
    const TestPage = lazy(() => import('@/pages/(website)/test/page'));

    return (
        <Routes>
            <Route path="/" element={<LayoutWebsite />}>
                <Route index element={<HomePage />} />
                <Route path="test" element={
                    <Suspense fallback={<Signin />}>
                        <TestPage />
                    </Suspense>
                } />
                <Route path="detail" element={<ProductDetail />} />
                <Route path="category" element={<CategoryPage />} />
                <Route path="cart" element={<CartPage />} >
                    <Route index element={<ShoppingCart />} />
                    <Route path="checkout" element={<Checkout />} />
                    <Route path="order" element={<OrderComplete />} />
                </Route>
                <Route path="user" element={<UserPage />} />
            </Route>
            <Route path="auth" element={<AuthPage />}>
                <Route index element={<Navigate to="signin" replace />} />
                <Route path="signin" element={<Signin />} />
                <Route path="signup" element={<Signup />} />
            </Route>
            <Route path="admin" element={<LayoutAdmin />}>
                <Route index element={<DashBoardPage />} />
                <Route path="products" element={<LayoutAdminProductsPage />}>
                    <Route index element={<AdminProductsList />} />
                    <Route path="add" element={<AdminProductsAdd />} />
                    <Route path="attributes" element={<AdminAttributesPage />}>
                        <Route index element={<AdminAttributeList />} />
                        <Route path="edit" element={<AdminAttributeEdit />} />
                        <Route path="terms" element={<AdminAttributeValuesPage />} >
                            <Route index element={<AdminAttributeValueList />} />
                            <Route path="edit" element={<AdminAttributeValueEdit />} />
                        </Route>
                    </Route>
                    <Route path="edit" element={<ProductsEdit />} />
                </Route>
            </Route>
        </Routes>
    )
}

export default Router