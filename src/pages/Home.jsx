import Banner from "../components/Banner/Banner";
import Used from "../components/Used/Used";

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <div className="py-10"></div>
            <Used></Used>
            <div className="py-12"></div>
        </div>
    );
};

export default Home;