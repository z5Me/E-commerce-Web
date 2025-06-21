import { Route, Routes } from "react-router"
import LayoutWebsite from "../pages/(website)/layout"
import HomePage from "../pages/(website)/homepage/page"

const Router = () => {
    return (
        <Routes>
            <Route path="/" element={<LayoutWebsite />}>
                <Route index element={<HomePage />} />
            </Route>
        </Routes>
    )
}

export default Router