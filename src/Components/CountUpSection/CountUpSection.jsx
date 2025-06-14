import axios from "axios";
import { useEffect, useState } from "react";
import CountUp from "react-countup";


const CountUpSection = () => {

    const [serviceCount, setServiceCount] = useState(0);

    // Static values
    const userCount = 1289;
    const reviewCount = 4526;

    useEffect(() => {
        axios.get("http://localhost:3000/service-count")
            .then(res => setServiceCount(res.data.services || 0))
            .catch(err => console.error("Failed to fetch services count:", err));
    }, []);

    return (
        <div className="bg-gray-100 py-16 px-6 mb-5 md:px-24 text-center rounded-lg shadow">
            <h2 className="text-3xl font-bold mb-8 text-blue-800">Platform Stats</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                <div>
                    <h3 className="text-xl font-semibold">Total Users</h3>
                    <CountUp end={userCount} duration={8} className="text-4xl font-bold text-green-600" />
                </div>
                <div>
                    <h3 className="text-xl font-semibold">Total Services</h3>
                    <CountUp end={serviceCount} duration={8} className="text-4xl font-bold text-purple-600" />
                </div>
                <div>
                    <h3 className="text-xl font-semibold">Total Reviews</h3>
                    <CountUp end={reviewCount} duration={8} className="text-4xl font-bold text-red-600" />
                </div>
            </div>
        </div>
    );
};

export default CountUpSection;