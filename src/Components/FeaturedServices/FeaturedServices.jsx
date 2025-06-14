import axios from "axios";
import { useEffect, useState } from "react";
import FeaturedServicesCard from "../FeaturedServicesCard/FeaturedServicesCard";
import { Link } from "react-router";
import LoadingPage from "../../Pages/LoadingPage/LoadingPage";


const FeaturedServices = () => {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        axios.get("http://localhost:3000/featured-services")
            .then(res => {
                setServices(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <LoadingPage />;
    }

    return (
        <div className="mb-10 px-4 sm:px-2 lg:px-8">
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