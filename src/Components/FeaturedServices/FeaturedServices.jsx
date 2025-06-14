import axios from "axios";
import { useEffect, useState } from "react";
import FeaturedServicesCard from "../FeaturedServicesCard/FeaturedServicesCard";
import { Link } from "react-router";
import LoadingPage from "../../Pages/LoadingPage/LoadingPage";


const FeaturedServices = () => {

    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true); // ✅ Add loading state

    useEffect(() => {
        axios.get("http://localhost:3000/featured-services") // Replace with your hosted URL
            .then(res => {
                setServices(res.data);
                setLoading(false); // Set loading to false when data is fetched
            })
            .catch(err => {
                console.error(err);
                setLoading(false); // Set loading to false even in case of error
            });
    }, []);

    // ✅ Show the loading spinner while data is being fetched
    if (loading) {
        return <LoadingPage />;  // Show loading spinner
    }

    return (
        <div className="mb-10">
            <h1 className="text-3xl font-bold text-center mb-6">Featured Services</h1>
            <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6">
                {services.map(service => (
                    <FeaturedServicesCard key={service._id} service={service} />
                ))}
            </div>
            <div className="my-10 text-center">
                <Link to={"/allService"}>
                    <button className="btn bg-blue-700 text-white">See All ...</button>
                </Link>
            </div>
        </div>
    );
};

export default FeaturedServices;