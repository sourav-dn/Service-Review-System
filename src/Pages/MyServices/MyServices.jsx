import { useContext, useEffect, useState } from "react";
import { Authcontext } from "../../Provider/AuthProvider";
import axios from "axios";
import { toast } from "react-toastify";
import LoadingPage from "../LoadingPage/LoadingPage";


const MyServices = () => {

    const { user } = useContext(Authcontext);
    const [services, setServices] = useState([]);
    const [editingService, setEditingService] = useState(null);
    const [updatedData, setUpdatedData] = useState({});
    const [loading, setLoading] = useState(true); // ✅ Set loading state to true initially

    useEffect(() => {
        if (user?.email) {
            setLoading(true); // Set loading to true when the data starts fetching
            axios.get(`http://localhost:3000/my-services?email=${user.email}`, {
                withCredentials: true,
            })
                .then(res => {
                    setServices(res.data);
                    setLoading(false);
                })
                .catch(err => {
                    console.error(err);
                    setLoading(false); // Set loading to false in case of error
                });
        }
    }, [user]);

    const handleDelete = async (id) => {
        const confirm = window.confirm("Are you sure?");
        if (!confirm) return;
        await axios.delete(`http://localhost:3000/services/${id}`);
        setServices(prev => prev.filter(s => s._id !== id));
        toast.success("Deleted!");
    };

    // const handleUpdateSubmit = async (e) => {
    //     e.preventDefault();
    //     await axios.put(`http://localhost:3000/services/${editingService._id}`, updatedData,{
    //         withCredentials: true
    //     });
    //     toast.success("Updated!");
    //     setEditingService(null);
    //     setServices(prev =>
    //         prev.map(s => s._id === editingService._id ? { ...s, ...updatedData } : s)
    //     );
    // };

    const handleUpdateSubmit = async (e) => {
        e.preventDefault();
        try {
            // Destructure _id out of updatedData to prevent sending it to the server
            // MongoDB's _id field is immutable and cannot be updated.
            const { _id, ...dataToSend } = updatedData;

            const response = await axios.put(`http://localhost:3000/services/${editingService._id}`, dataToSend, {
                withCredentials: true
            });
            if (response.status === 200) {
                toast.success("Service updated successfully!");
                setEditingService(null); // Close the modal
                // Update the services list with the new data
                setServices(prev =>
                    prev.map(s =>
                        s._id === editingService._id ? { ...s, ...updatedData } : s
                    )
                );
            } else {
                toast.error(response.data.message || "Failed to update service.");
            }
        } catch (error) {
            console.error("Error updating service:", error);
            // More specific error messages can be added based on error.response.data
            toast.error(error.response?.data?.message || "An error occurred during update.");
        }
    };

    // Handle input changes for the update form
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUpdatedData(prev => ({
            ...prev,
            [name]: value
        }));
    };




    






    // ✅ If data is still loading, show the spinner (loading page)
    if (loading) {
        return <LoadingPage />; // Display the loading spinner component
    }


    return (
        <div className="p-8 min-h-screen mt-5 mb-5">
            <h2 className="text-3xl font-bold text-blue-700 text-center mb-6">My Services</h2>
            <div className="overflow-x-auto border-2 rounded-4xl">
                <table className="table table-zebra w-full">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Price</th>
                            <th>Category</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {services.map(service => (
                            <tr key={service._id}>
                                <td>{service.title}</td>
                                <td>${service.price}</td>
                                <td>{service.category}</td>
                                <td className="flex gap-2">
                                    <button
                                        onClick={() => {
                                            setEditingService(service);
                                            setUpdatedData(service);
                                        }}
                                        className="btn btn-warning btn-sm"
                                    >
                                        Update
                                    </button>
                                    <button
                                        onClick={() => handleDelete(service._id)}
                                        className="btn btn-error btn-sm"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {editingService && (
                <div className="modal modal-open">
                    <div className="modal-box">
                        <h3 className="font-bold text-lg mb-2">Update Service</h3>
                        <form onSubmit={handleUpdateSubmit} className="space-y-3">
                            {/* <input
                                className="input input-bordered w-full"
                                value={updatedData.title}
                                onChange={(e) => setUpdatedData({ ...updatedData, title: e.target.value })}
                            />
                            <input
                                className="input input-bordered w-full"
                                value={updatedData.price}
                                onChange={(e) => setUpdatedData({ ...updatedData, price: e.target.value })}
                            />
                            <input
                                className="input input-bordered w-full"
                                value={updatedData.category}
                                onChange={(e) => setUpdatedData({ ...updatedData, category: e.target.value })}
                            /> */}

                            <div>
                                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                                <input
                                    id="title"
                                    name="title"
                                    type="text"
                                    className="input input-bordered w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                    value={updatedData.title || ''}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">Price</label>
                                <input
                                    id="price"
                                    name="price"
                                    type="number"
                                    step="0.01"
                                    className="input input-bordered w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                    value={updatedData.price || ''}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                                <input
                                    id="category"
                                    name="category"
                                    type="text"
                                    className="input input-bordered w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                    value={updatedData.category || ''}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="modal-action">
                                <button type="submit" className="btn btn-success btn-sm">Save</button>
                                <button
                                    onClick={() => setEditingService(null)}
                                    className="btn btn-ghost btn-sm"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MyServices;