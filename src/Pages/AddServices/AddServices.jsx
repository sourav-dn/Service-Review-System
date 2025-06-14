import { useContext } from "react";
import { Authcontext } from "../../Provider/AuthProvider";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
// import { useNavigate } from "react-router";


const AddServices = () => {

    // const navigate = useNavigate();

    const { user } = useContext(Authcontext);

    const handleAddService = async (e) => {
        e.preventDefault();
        const form = e.target;

        const newService = {
            image: form.image.value,
            title: form.title.value,
            company: form.company.value,
            website: form.website.value,
            description: form.description.value,
            category: form.category.value,
            price: parseFloat(form.price.value),
            userEmail: user?.email || "unknown",
            addedDate: new Date().toISOString(),
        };

        try {
            const res = await axios.post("http://localhost:3000/services", newService);
            if (res.data.insertedId) {
                toast.success("Service added successfully!");
                form.reset();
                // navigate("/services");
            }
        } catch (err) {
            console.error(err);
            toast.error("Failed to add service.");
        }
    };

    return (
        <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-md my-10">
            <h2 className="text-2xl font-bold text-center mb-6 text-blue-700">Add a New Service</h2>
            <form onSubmit={handleAddService} className="space-y-4">
                <input type="text" name="image" placeholder="Service Image URL" className="input input-bordered w-full" required />
                <input type="text" name="title" placeholder="Service Title" className="input input-bordered w-full" required />
                <input type="text" name="company" placeholder="Company Name" className="input input-bordered w-full" required />
                <input type="url" name="website" placeholder="Website Link" className="input input-bordered w-full" required />
                <textarea name="description" placeholder="Description" className="textarea textarea-bordered w-full" required></textarea>
                <input type="text" name="category" placeholder="Category" className="input input-bordered w-full" required />
                <input type="number" step="0.01" name="price" placeholder="Price ($)" className="input input-bordered w-full" required />

                <input type="submit" value="Add Service" className="btn btn-primary w-full mt-4" />
            </form>
            <ToastContainer position='top-right' autoClose={3000} />
        </div>
    );
};

export default AddServices;