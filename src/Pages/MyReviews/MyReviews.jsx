import { useContext, useEffect, useState } from "react";
import { Authcontext } from "../../Provider/AuthProvider";
import axios from "axios";
import { toast } from "react-toastify";
import { Rating } from "@smastrom/react-rating";
import LoadingPage from "../LoadingPage/LoadingPage";


const MyReviews = () => {

    const { user } = useContext(Authcontext);
    const [reviews, setReviews] = useState([]);
    const [editing, setEditing] = useState(null);
    const [updatedText, setUpdatedText] = useState("");
    const [updatedRating, setUpdatedRating] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user?.email) {
            setLoading(true);
            axios.get(`http://localhost:3000/my-reviews?email=${user.email}`, {
                withCredentials: true,
            })
                .then(res => {
                    setReviews(res.data);
                    setLoading(false); 
                })
                .catch(err => {
                    console.error(err);
                    setLoading(false);
                });
        }
    }, [user]);

    const handleDelete = async (id) => {
        const confirm = window.confirm("Are you sure you want to delete this review?");
        if (!confirm) return;

        try {
            await axios.delete(`http://localhost:3000/reviews/${id}`, {
                withCredentials: true
            });
            setReviews(reviews.filter(r => r._id !== id));
            toast.success("Review deleted");
        } catch (err) {
            console.log(err)
            toast.error("Delete failed");
        }
    };

    const openEdit = (review) => {
        setEditing(review._id);
        setUpdatedText(review.text);
        setUpdatedRating(review.rating);
    };


    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`http://localhost:3000/reviews/${editing}`, {
                text: updatedText,
                rating: updatedRating
            }, { withCredentials: true });

            if (response.status === 200) {
                setReviews(reviews.map(r => r._id === editing ? { ...r, text: updatedText, rating: updatedRating } : r));
                setEditing(null);
                toast.success("Review updated successfully!");
            } else {
                toast.error(response.data?.error || "Review update failed. Please try again.");
            }

        } catch (err) {
            const errorMessage = err.response
                ? err.response.status === 401
                    ? "Unauthorized: Please log in again."
                    : err.response.data?.error || "An error occurred during update."
                : err.request
                    ? "No response from server. Check your network connection."
                    : "Error setting up the request.";

            toast.error(errorMessage);
        }
    };


    if (loading) {
        return <LoadingPage />; 
    }

    return (
        <div className="p-6 md:p-12 min-h-screen">
            <h2 className="text-3xl font-bold text-center text-blue-700 mb-6">My Reviews</h2>

            {reviews.length === 0 ? (
                <p className="text-center">You have not submitted any reviews.</p>
            ) : (
                <div className="space-y-6 max-w-2xl mx-auto">
                    {reviews.map(review => (
                        <div key={review._id} className="p-4 border shadow rounded bg-white">
                            {editing === review._id ? (
                                <form onSubmit={handleUpdate} className="space-y-3">
                                    <input
                                        value={review.serviceTitle || "Service Title"}
                                        readOnly
                                        className="input input-bordered w-full bg-gray-100"
                                    />
                                    <textarea
                                        value={updatedText}
                                        onChange={(e) => setUpdatedText(e.target.value)}
                                        className="textarea textarea-bordered w-full"
                                    ></textarea>
                                    <div className="flex items-center gap-3">
                                        <span>Rating:</span>
                                        <Rating
                                            style={{ maxWidth: 180 }}
                                            value={updatedRating}
                                            onChange={setUpdatedRating}
                                        />
                                    </div>
                                    <div className="flex gap-4 mt-2">
                                        <button type="submit" className="btn btn-success btn-sm">Save</button>
                                        <button type="button" onClick={() => setEditing(null)} className="btn btn-ghost btn-sm">Cancel</button>
                                    </div>
                                </form>
                            ) : (
                                <>
                                    <h3 className="text-lg font-bold">{review.serviceTitle || "Service Title"}</h3>
                                    <p className="text-gray-700">{review.text}</p>
                                    <Rating
                                        style={{ maxWidth: 120 }}
                                        value={review.rating}
                                        readOnly
                                    />
                                    <div className="mt-3 flex gap-3">
                                        <button onClick={() => openEdit(review)} className="btn btn-warning btn-sm">Update</button>
                                        <button onClick={() => handleDelete(review._id)} className="btn btn-error btn-sm">Delete</button>
                                    </div>
                                </>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MyReviews;