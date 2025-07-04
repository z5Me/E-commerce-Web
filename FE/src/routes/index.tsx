import { Route, Routes } from "react-router"
import LayoutWebsite from "../pages/(website)/layout"
import HomePage from "../pages/(website)/homepage/page"
import ProductDetail from "@/pages/(website)/productdetail/page"
import CategoryPage from "@/pages/(website)/category/page"
import CartPage from "@/pages/(website)/cart/page"
import AuthPage from "@/pages/(website)/auth/page"
// import TestPage from "@/pages/(website)/test/page"

const Router = () => {
    return (
        <Routes>
            <Route path="/" element={<LayoutWebsite />}>
                <Route index element={<HomePage />} />
                <Route path="detail" element={<ProductDetail />} />
                <Route path="category" element={<CategoryPage />} />
                <Route path="cart" element={<CartPage />} />
            </Route>
            <Route path="auth" element={<AuthPage />} />
        </Routes>
    )
}

export default Router