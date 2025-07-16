import { Navigate, Route, Routes } from "react-router"
import LayoutWebsite from "../pages/(website)/layout"
import HomePage from "../pages/(website)/homepage/page"
import ProductDetail from "@/pages/(website)/productdetail/page"
import CategoryPage from "@/pages/(website)/category/page"
import CartPage from "@/pages/(website)/cart/page"
import AuthPage from "@/pages/(website)/auth/page"
import Signup from "@/pages/(website)/auth/_components/Signup"
import Signin from "@/pages/(website)/auth/_components/Signin"
import TestPage from "@/pages/(website)/test/page"
import UserPage from "@/pages/(website)/user/page"
import ShoppingCart from "@/pages/(website)/cart/_components/ShoppingCart"
import Checkout from "@/pages/(website)/cart/_components/Checkout"
import OrderComplete from "@/pages/(website)/cart/_components/OrderComplete"

const Router = () => {
    return (
        <Routes>
            <Route path="/" element={<LayoutWebsite />}>
                <Route index element={<HomePage />} />
                <Route path="test" element={<TestPage />} />
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
        </Routes>
    )
}

export default Router