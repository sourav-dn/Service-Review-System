import { Link } from "react-router";



const FeaturedServicesCard = ({ service }) => {

    const { _id, image, title, description, price } = service;

    return (
            <div>
                <div className="card bg-base-100 w-96 shadow-sm">
                    <figure>
                        <img className="w-full h-48 object-cover rounded"
                            src={image}
                            alt="services" />
                    </figure>
                    <div className="card-body">
                        <h2 className="card-title">
                            {title}
                            <div className="badge badge-secondary">{price}</div>
                        </h2>
                        <p>{description}</p>
                        <Link to={`/serviceDetails/${service._id}`}>
                            <button className="btn btn-sm bg-blue-600 text-white mt-4">See Details</button>
                        </Link>
                    </div>
                </div>
            </div>
        
    );
};

export default FeaturedServicesCard;