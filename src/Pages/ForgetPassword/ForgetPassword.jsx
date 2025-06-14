import { sendPasswordResetEmail } from "firebase/auth";
import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { toast, ToastContainer } from "react-toastify";
import { auth } from "../../Firebase/Firebase.config";


const ForgetPassword = () => {

    const location = useLocation();
    const [email, setEmail] = useState('');
    
     useEffect(() =>{
        document.title = 'Forget Password'
        const queryParams = new URLSearchParams(location.search);
        const emailParams = queryParams.get('email');
        if(emailParams){
            setEmail(emailParams);
        }
     }, [location])
      const handleResetPassword = (e) => {
        e.preventDefault();
        if(!email){
            toast.error('please provide a valid Email.')
        }
        else{
            sendPasswordResetEmail(auth, email)
            .then(()=>{
                toast.success('Reset Password link sent to your Email.')
                window.open('https://mail.google.com/', '_blank');
            })
            .catch((error) => {
                toast.error(error.message || 'something Went Wrong!')
            })
        }
    };

    return (
        <div className='min-h-screen flex justify-center items-center bg-indigo-50'>
            <ToastContainer />
            <div className="card w-full max-w-lg p-10 shrink-0 shadow-2xl">
                <h2 className='text-3xl font-bold text-center'>Reset Your Password</h2>
                <form onSubmit={handleResetPassword} className="card-body">
                    <div className="form-control flex flex-col">
                        <label className="label mb-2">
                            <span className="label-text">Email</span>
                        </label>
                        <input
                            type="email"
                            placeholder="email"
                            className="input input-bordered w-full"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-control mt-6">
                        <button type='submit' className="btn btn-primary w-full">
                            Reset Password</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ForgetPassword;