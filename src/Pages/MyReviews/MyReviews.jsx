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
            axios.get(`https://service-scope-server-sigma.vercel.app/my-reviews?email=${user.email}`, {
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
            await axios.delete(`https://service-scope-server-sigma.vercel.app/reviews/${id}`, {
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
            const response = await axios.put(`https://service-scope-server-sigma.vercel.app/reviews/${editing}`, {
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
            <h2 className="text-3xl font-bold text-center text-blue-700 mb-8">My Reviews</h2>

            {loading ? (
                <LoadingPage />
            ) : reviews.length === 0 ? (
                <p className="text-center">You have not submitted any reviews.</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="table w-full">
                        <thead>
                            <tr>
                                <th>Service</th>
                                <th>Review</th>
                                <th>Rating</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {reviews.map(review => (
                                <tr key={review._id}>
                                    <td className="font-semibold">{review.serviceTitle || "Service Title"}</td>
                                    <td>
                                        {editing === review._id ? (
                                            <textarea
                                                value={updatedText}
                                                onChange={(e) => setUpdatedText(e.target.value)}
                                                className="textarea textarea-bordered w-full"
                                            ></textarea>
                                        ) : (
                                            <span>{review.text}</span>
                                        )}
                                    </td>
                                    <td>
                                        {editing === review._id ? (
                                            <Rating
                                                style={{ maxWidth: 140 }}
                                                value={updatedRating}
                                                onChange={setUpdatedRating}
                                            />
                                        ) : (
                                            <Rating
                                                style={{ maxWidth: 120 }}
                                                value={review.rating}
                                                readOnly
                                            />
                                        )}
                                    </td>
                                    <td className="space-x-2">
                                        {editing === review._id ? (
                                            <>
                                                <button onClick={handleUpdate} className="btn btn-success btn-sm">Save</button>
                                                <button onClick={() => setEditing(null)} className="btn btn-ghost btn-sm">Cancel</button>
                                            </>
                                        ) : (
                                            <>
                                                <button onClick={() => openEdit(review)} className="btn btn-warning btn-sm">Update</button>
                                                <button onClick={() => handleDelete(review._id)} className="btn btn-error btn-sm">Delete</button>
                                            </>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default MyReviews;