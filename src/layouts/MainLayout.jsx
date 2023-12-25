import Footer from "../components/Footer/Footer";
import Navbar from "../components/Navbar/Navbar";
import { Outlet, useLocation } from "react-router-dom";

const MainLayout = () => {

    const location = useLocation();
    console.log(location?.pathname);


    return (
        <div>
            {
                location?.pathname == '/login' || location?.pathname == '/register' ?
                    ""
                    :
                    <Navbar></Navbar>
            }

            <div>
                <Outlet></Outlet>
            </div>
            {
                location?.pathname == '/login' || location?.pathname == '/register' ?
                    ""
                    :
                    <Footer></Footer>
            }


        </div>
    );
};

export default MainLayout;