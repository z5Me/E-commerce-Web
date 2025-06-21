import Footer from "@/components/Footer"
import Header from "@/components/Header"
import { Outlet } from "react-router"

const LayoutWebsite = () => {
    return (
        <>
            <Header />
            <Outlet />
            <Footer />
        </>
    )
}

export default LayoutWebsite