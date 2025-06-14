import { easeOut, motion } from "motion/react"
import { Link } from "react-router";


const Motion = () => {
    return (
        <div>
            <div className="my-20 px-2">
                <div className="hero bg-base-200 min-h-96">
                    <div className="hero-content flex-col lg:flex-row">
                        <div className="flex-1">
                            <motion.img
                                src="https://i.ibb.co/NgBQnRqm/i11.png"
                                animate={{ y: [40, 80, 40] }}
                                transition={{ duration: 10, repeat: Infinity }}
                                className="max-w-sm rounded-t-[40px] rounded-br-[40px] border-l-4 border-b-4 border-yellow-500 lg:w-64 md:w-64 w-44 shadow-2xl"
                            />
                            <motion.img
                                src="https://i.ibb.co/4nC9pcQz/i12.jpg"
                                animate={{ x: [50, 100, 50] }}
                                transition={{ duration: 10, delay: 5, repeat: Infinity }}
                                className="max-w-sm rounded-t-[40px] rounded-br-[40px] border-l-4 border-b-4 border-yellow-500 lg:w-64 md:w-64 w-40 shadow-2xl"
                            />
                        </div>
                        <div className="flex-1">
                            <motion.h1
                                animate={{ x: 100, color: ["#031e40"] }}
                                transition={{
                                    duration: 2,
                                    delay: 1,
                                    ease: easeOut,
                                    repeat: Infinity,
                                }}
                                className="text-2xl sm:text-2xl md:text-4xl lg:text-5xl font-bold"
                            >
                                Service
                                <motion.span
                                    animate={{ color: ["#FFC300", "#94fd03", "#e56e32"] }}
                                    transition={{ duration: 1.5, repeat: Infinity }}
                                >
                                    {" "}
                                    Scope{" "}
                                </motion.span>
                            </motion.h1>
                            <p className="py-4 text-sm sm:text-base md:text-lg lg:text-lg">
                                Service Scope is a full-stack platform where users can add, review, and manage services.
                            </p>
                            <Link to="/">
                                <button className="btn bg-blue-700 text-white">
                                    Get Started
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Motion;