import 'aos/dist/aos.css';
import AOS from "aos";
import { useEffect } from "react";

const Used = () => {
    useEffect(() => {
        AOS.init({
            offset: 200,
            duration: 600,
            easing: 'ease-in-sine',
            delay: 100,
        })
    }, [])

    return (
        <div className="max-w-[1280px] w-[95%] mx-auto flex flex-col items-center justify-center" data-aos="zoom-in">
            <h2 className="text-center font-bold text-2xl my-5">Our App User</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                <div className="bg-white drop-shadow-lg text-center text-black p-4 rounded-lg">
                    <h3>Web Developer</h3>
                </div>
                <div className="bg-white drop-shadow-lg text-center text-black p-4 rounded-lg">
                    <h3>Software Engineer</h3>
                </div>
                <div className="bg-white drop-shadow-lg text-center text-black p-4 rounded-lg">
                    <h3>Professional Doctor</h3>
                </div>
                <div className="bg-white drop-shadow-lg text-center text-black p-4 rounded-lg">
                    <h3>College Students</h3>
                </div>
                <div className="bg-white drop-shadow-lg text-center text-black p-4 rounded-lg">
                    <h3>University Professors</h3>
                </div>
                <div className="bg-white drop-shadow-lg text-center text-black p-4 rounded-lg">
                    <h3>Architect</h3>
                </div>
                <div className="bg-white drop-shadow-lg text-center text-black p-4 rounded-lg">
                    <h3>Electrician</h3>
                </div>
                <div className="bg-white drop-shadow-lg text-center text-black p-4 rounded-lg">
                    <h3>CEO</h3>
                </div>
                <div className="bg-white drop-shadow-lg text-center text-black p-4 rounded-lg">
                    <h3>Product manager</h3>
                </div>
                <div className="bg-white drop-shadow-lg text-center text-black p-4 rounded-lg">
                    <h3>Dentist</h3>
                </div>
            </div>
        </div>
    );
};

export default Used;