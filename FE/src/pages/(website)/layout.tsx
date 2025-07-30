import Footer from "@/components/Footer"
import Header from "@/components/Header"
import { Outlet } from "react-router"

const LayoutWebsite = () => {
    return (
        <>
            <div className="font-MJSatoshi">
                <Header />
                <Outlet />
                <Footer />
            </div>
        </>
    )
}

export default LayoutWebsite