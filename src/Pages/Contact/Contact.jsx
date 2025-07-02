import { FaCommentDots, FaEnvelope, FaUser } from "react-icons/fa";


const Contact = () => {
    return (
        <div className="min-h-screen flex items-center justify-center  px-4">
            <div className="card w-full max-w-lg shadow-2xl bg-base-100 p-8">
                <h1 className="text-4xl font-bold text-center mb-6">Contact Us</h1>
                
                <form>
                    {/* Name */}
                    <div className="form-control mb-4">
                        <label className="label">
                            <span className="label-text flex items-center gap-2">
                                <FaUser /> Name
                            </span>
                        </label>
                        <input type="text" placeholder="Your name" className="input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-primary" />
                    </div>

                    {/* Email */}
                    <div className="form-control mb-4">
                        <label className="label">
                            <span className="label-text flex items-center gap-2">
                                <FaEnvelope /> Email
                            </span>
                        </label>
                        <input type="email" placeholder="Your email" className="input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-primary" />
                    </div>

                    {/* Message */}
                    <div className="form-control mb-6">
                        <label className="label">
                            <span className="label-text flex items-center gap-2">
                                <FaCommentDots /> Message
                            </span>
                        </label>
                        <textarea className="textarea textarea-bordered h-32 w-full focus:outline-none focus:ring-2 focus:ring-primary" placeholder="Your message"></textarea>
                    </div>

                    {/* Submit */}
                    <div className="text-center">
                        <button className="btn btn-primary bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white w-full">
                            Send Message
                        </button>
                    </div>
                </form>

                <div className="text-center mt-8 text-sm text-gray-500">
                    <p>Email: <span className="font-semibold">support@servicescope.com</span></p>
                    <p>Phone: <span className="font-semibold">+123 456 7890</span></p>
                </div>
            </div>
        </div>
    );
};

export default Contact;