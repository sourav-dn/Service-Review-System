import { useContext, useState } from "react";
import { Authcontext } from "../../Provider/AuthProvider";
import { Link, useNavigate } from "react-router";
import { GoogleAuthProvider, signInWithPopup, updateProfile } from "firebase/auth";
import { toast, ToastContainer } from "react-toastify";
import { auth } from "../../Firebase/Firebase.config";
import registerLottieData from "../../assets/Lottie/register.json";
import Lottie from "lottie-react";
import { FaEye, FaEyeSlash, FaUser } from "react-icons/fa";


const Register = () => {


    const { createUser, setUser } = useContext(Authcontext);
    const [error, setError] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const validatePhotoURL = (url) => {
        try {
            new URL(url);
            return true;
        } catch (e) {
            console.log(e)
            return false;
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError({});

        const form = new FormData(e.target);
        const name = form.get("name").trim();
        const email = form.get("email");
        const photoURL = form.get("photo");
        const password = form.get("password");

        const errors = {};

        if (name.length < 4) {
            errors.name = "Name should be at least 4 characters";
        }

        if (!validatePhotoURL(photoURL)) {
            errors.photo = "Please enter a valid URL";
        }

        if (password.length < 6) {
            errors.password = 'Password should be 6 characters or longer';
        } else if (!/[A-Z]/.test(password)) {
            errors.password = 'Password must contain at least one uppercase letter';
        } else if (!/[a-z]/.test(password)) {
            errors.password = 'Password must contain at least one lowercase letter';
        }

        if (Object.keys(errors).length > 0) {
            setError(errors);
            setIsLoading(false);
            return;
        }

        try {
            const userCredential = await createUser(email, password);
            const user = userCredential.user;

            await updateProfile(user, {
                displayName: name,
                photoURL: photoURL || null
            });

            setUser({
                ...user,
                displayName: name,
                photoURL: photoURL || null
            });
            toast.success('Registration successful!');
            setTimeout(() => navigate('/'), 1000);
        } catch (error) {
            console.error("Registration Error:", error.message);
            let errorMessage = "Registration failed! Please try again";

            if (error.code === 'auth/email-already-in-use') {
                errorMessage = "Email is already in use";
            } else if (error.code === 'auth/weak-password') {
                errorMessage = "Password is too weak";
            }

            toast.error(errorMessage);
            setError({ form: errorMessage });
        } finally {
            setIsLoading(false);
        }
    };

    const googleProvider = new GoogleAuthProvider();

    const handleGoogleSignIn = () => {
        setIsLoading(true);
        signInWithPopup(auth, googleProvider)
            .then((result) => {
                console.log(result)
                toast.success("Google sign in successful!");
                navigate('/');
            })
            .catch(error => {
                console.error("Google Sign-in Error:", error.message);
                toast.error("Failed to sign in with Google!");
            })
            .finally(() => setIsLoading(false));
    };


    return (
        <div className='min-h-screen flex justify-center items-center px-4 flex-col lg:flex-row-reverse'>

            <div className="text-center lg:text-left w-96">
                <Lottie animationData={registerLottieData} />
            </div>

            <div className="card bg-base-100 w-full max-w-sm md:max-w-md lg:max-w-lg p-6 md:p-10 shadow-2xl mt-5 mb-5">
                <h2 className='text-2xl md:text-3xl font-bold text-center'>Register Your Account</h2>
                <form onSubmit={handleSubmit} className="card-body">
                    {/* Name input */}
                    <div className="form-control">
                        <label className="label flex mb-2">
                            <span className="label-text">Name</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Your name"
                            name="name"
                            className="input input-bordered w-full"
                            required
                        />
                        {error.name && (
                            <label className="label text-xs text-rose-500">{error.name}</label>
                        )}
                    </div>
                    {/* Photo URL input */}
                    <div className="form-control">
                        <label className="label mb-2">
                            <span className="label-text">Photo URL</span>
                        </label>
                        <div className="relative">
                            <input type="url" placeholder="photo" name='photo' className="input input-bordered w-full pr-10" />
                            <div className="absolute right-3 top-3 text-gray-400">
                                <FaUser />
                            </div>
                        </div>
                        {error.photo && (
                            <label className="label text-xs text-rose-500">{error.photo}</label>
                        )}
                    </div>
                    {/* Email input */}
                    <div className="form-control">
                        <label className="label flex mb-2">
                            <span className="label-text">Email</span>
                        </label>
                        <input
                            type="email"
                            placeholder="your@email.com"
                            className="input input-bordered w-full"
                            name="email"
                            required
                        />
                    </div>
                    {/* Password input */}
                    <div className="form-control relative">
                        <label className="label flex mb-2">
                            <span className="label-text">Password</span>
                        </label>
                        <div className="relative">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                placeholder="Create password"
                                className="input input-bordered w-full pr-10"
                                name="password"
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className='btn btn-ghost btn-sm absolute right-0 top-0 p-2'
                            >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>
                        {error.password && (
                            <label className='label text-xs text-rose-500'>{error.password}</label>
                        )}
                        <div className="text-xs text-gray-500 mt-1">
                            Must be 6+ characters with uppercase and lowercase letters
                        </div>
                    </div>

                    {error.form && (
                        <p className='text-xs text-center text-rose-500'>{error.form}</p>)}

                    <div className="form-control mt-6">
                        <button
                            className="btn bg-blue-600 text-white w-full"
                            disabled={isLoading}
                        >
                            {isLoading ? (<span className="loading loading-spinner"></span>) : 'Register'}
                        </button>
                    </div>
                </form>

                <div className="divider">OR</div>

                <div className='flex justify-center pb-5'>
                    <button onClick={handleGoogleSignIn} className='btn btn-outline w-full max-w-xs'
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <span className="loading loading-spinner"></span>
                        ) : (
                            <>
                                <img
                                    src="https://www.google.com/favicon.ico"
                                    alt="Google"
                                    className="w-5 h-5 mr-2"
                                />
                                Continue with Google
                            </>
                        )}
                    </button>
                </div>

                <div className='text-center'>
                    <p className='font-semibold'>
                        Already have an account?{' '}
                        <Link to="/login" className='text-primary underline'>
                            Login now
                        </Link>
                    </p>
                </div>

                <ToastContainer position='top-center' autoClose={3000} />
            </div>
        </div>
    );
};

export default Register;