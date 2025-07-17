import { lazy, Suspense } from "react"

import { Navigate, Route, Routes } from "react-router"
import LayoutWebsite from "../pages/(website)/layout"
import HomePage from "../pages/(website)/homepage/page"
import ProductDetail from "@/pages/(website)/productdetail/page"
import CategoryPage from "@/pages/(website)/category/page"
import CartPage from "@/pages/(website)/cart/page"
import AuthPage from "@/pages/(website)/auth/page"
import Signup from "@/pages/(website)/auth/_components/Signup"
import Signin from "@/pages/(website)/auth/_components/Signin"
import UserPage from "@/pages/(website)/user/page"
import ShoppingCart from "@/pages/(website)/cart/_components/ShoppingCart"
import Checkout from "@/pages/(website)/cart/_components/Checkout"
import OrderComplete from "@/pages/(website)/cart/_components/OrderComplete"
import LoadingScreen from "@/components/LoadingScreen"
import LayoutAdmin from "@/pages/(dashboard)/layout"
import DashBoardPage from "@/pages/(dashboard)/dashboard/page"
import AdminProductsPage from "@/pages/(dashboard)/products/page"

const Router = () => {
    const TestPage = lazy(() => import('@/pages/(website)/test/page'));

    return (
        <Routes>
            <Route path="/" element={<LayoutWebsite />}>
                <Route index element={<HomePage />} />
                <Route path="test" element={
                    <Suspense fallback={<LoadingScreen />}>
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
                <Route path="products" element={<AdminProductsPage />} />
            </Route>
        </Routes>
    )
}

export default Router