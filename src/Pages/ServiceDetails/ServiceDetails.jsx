import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { Authcontext } from "../../Provider/AuthProvider";
import { toast } from "react-toastify";
import { Rating } from "@smastrom/react-rating";
import '@smastrom/react-rating/style.css'


const ServiceDetails = () => {

    const { id } = useParams();
    const [service, setService] = useState(null);


    const [reviews, setReviews] = useState([]);
    const [newReview, setNewReview] = useState("");
    const [rating, setRating] = useState(0);
    const { user } = useContext(Authcontext);


    useEffect(() => {
        axios.get(`http://localhost:3000/serviceDetails/${id}`)
            .then((res) => setService(res.data))
            .catch(err => console.error("Error:", err));

        axios.get(`http://localhost:3000/reviews/${id}`)
            .then(res => setReviews(res.data))
            .catch(err => console.error("Review Fetch Error:", err));
    }, [id]);


    const handleReviewSubmit = async (e) => {
        e.preventDefault();
        if (!user) {
            toast.warn("Login required to add review");
            return;
        }

        const review = {
            serviceId: id,
            text: newReview,
            rating,
            serviceTitle: service.title,
            postedDate: new Date().toISOString(),
            userName: user.displayName,
            userPhoto: user.photoURL,
            userEmail: user.email
        };

        try {
            const res = await axios.post("http://localhost:3000/reviews", review, {
                withCredentials: true
            });
            if (res.data.insertedId) {
                toast.success("Review submitted!");
                setReviews([review, ...reviews]);
                setNewReview("");
                setRating(0);
            }
        } catch (err) {
            console.log(err);
            toast.error("Failed to submit review");
        }
    };



    if (!service) return <p className="text-center">Loading...</p>;



    return (
        <div className="p-6 md:p-12 rounded-lg shadow-md mt-5 mb-5">
            <div className="text-center mb-8">
                <img src={service.image} alt={service.title} className="rounded shadow mb-6 w-full max-w-xl mx-auto" />
                <h2 className="text-3xl font-bold mb-4">{service.title}</h2>
                <p className="mb-4 text-gray-700">{service.description}</p>
                <p className="text-lg font-semibold text-green-600">Price: ${service.price}</p>
            </div>
            {/* Reviews Section */}
            <div className="mt-10">
                <h3 className="text-2xl font-bold mb-4">Reviews ({reviews.length})</h3>

                {reviews.map((rev, i) => (
                    <div key={i} className="bg-white border rounded-lg p-4 mb-4 shadow-sm">
                        <div className="flex items-center gap-3 mb-2">
                            <img src={rev.userPhoto} className="w-10 h-10 rounded-full" alt="user" />
                            <div>
                                <p className="font-semibold">{rev.userName}</p>
                                <Rating
                                    style={{ maxWidth: 120 }}
                                    value={rev.rating}
                                    readOnly
                                />
                            </div>
                        </div>
                        <p className="text-gray-700 text-sm">{rev.text}</p>
                        <p className="text-xs text-right text-gray-500">{new Date(rev.postedDate).toLocaleString()}</p>
                    </div>
                ))}

                {/* Review Form */}
                {user && (
                    <form onSubmit={handleReviewSubmit} className="mt-6 border-t pt-6">
                        <h4 className="text-lg font-bold mb-2">Add Your Review</h4>
                        <textarea
                            value={newReview}
                            onChange={(e) => setNewReview(e.target.value)}
                            placeholder="Write your review..."
                            className="textarea textarea-bordered w-full mb-3"
                            required
                        ></textarea>
                        <div className="flex items-center gap-3 mb-4">
                            <span className="font-medium">Rating:</span>
                            <Rating
                                style={{ maxWidth: 180 }}
                                value={rating}
                                onChange={setRating}
                            />
                        </div>
                        <button type="submit" className="btn btn-primary">Submit Review</button>
                    </form>
                )}
            </div>
        </div >
    );
};

export default ServiceDetails;