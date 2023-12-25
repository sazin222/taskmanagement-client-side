import { Link } from "react-router-dom";
import BannerBg from "./../../assets/banner.jpg";
// import { Button } from "@mui/material";
import 'aos/dist/aos.css';
import AOS from "aos";
import { useEffect } from "react";

const Banner = () => {

    useEffect(() => {
        AOS.init({
            offset: 200,
            duration: 600,
            easing: 'ease-in-sine',
            delay: 100,
        })
    }, [])


    return (
        <div className="relative max-w-[1280px] mx-auto" data-aos="zoom-in">
            <img className="h-[550px] object-cover w-full" src={BannerBg} alt="banner bg" />
            {/* <div className="bg-[#00000090] z-20 w-full h-[550px] absolute top-0 left-0"></div>
            <div className="absolute top-0 text-white left-0 h-[550px] space-y-3 w-full flex flex-col items-center justify-center">
                <h2 className="font-bold text-5xl ">TaskMaster Pro</h2>
                <p className="text-center text-sm">Your Task Management and Productivity Optimization</p>
                <button className="bg-red-600 text-lg px-6 py-2 rounded-full">
                    Let’s Explore
                </button>
            </div> */}
            <div className="h-[550px] w-full bg-[#00000090] text-white absolute top-0 left-0 flex  flex-col items-center justify-center space-y-5">
                <h2 className="font-bold text-5xl ">TaskMaster Pro</h2>
                <p className="text-center">Your Task Management and Productivity Optimization</p>
                <Link to="/tasks-manager" className="btn btn-info text-whit border-2 text-lg px-6 py-2 rounded-full">
                    Let’s Explore
                </Link>
                {/* <Button sx={{borderRadius: '20px', paddingX: '30px', paddingY: '8px'}} variant="contained">Let's Explore</Button> */}
                
            </div>
        </div>
    );
};

export default Banner;