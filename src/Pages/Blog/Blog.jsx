import React from 'react';
import { FaArrowRight } from 'react-icons/fa';

const Blog = () => {
    return (
        <div className="max-w-6xl mx-auto px-4 py-12">
            <h1 className="text-4xl font-bold text-center mb-12">Our Blog</h1>
            
            <div className="grid gap-8 md:grid-cols-2">
                <div className="card bg-base-100 shadow-xl transform hover:-translate-y-2 transition duration-300">
                    <figure>
                        <img 
                            src="https://i.ibb.co/jkyjwDf7/360-F-294904344-3-Xr-VZIH8iy-Rg-EYSVm-K9a-KDKn-HAQUdil-W.jpg" 
                            alt="Top 5 Tips"
                            className="w-full h-60 object-cover rounded-t-xl"
                        />
                    </figure>
                    <div className="card-body">
                        <h2 className="card-title">Top 5 Tips to Manage Your Services</h2>
                        <p>Discover simple strategies to keep your services organized and efficient.</p>
                        <div className="card-actions justify-end">
                            <button className="btn btn-primary bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white">
                                Read More <FaArrowRight />
                            </button>
                        </div>
                    </div>
                </div>

                <div className="card bg-base-100 shadow-xl transform hover:-translate-y-2 transition duration-300">
                    <figure>
                        <img 
                            src="https://i.ibb.co/DHGjr5By/df453we.png" 
                            alt="User Reviews"
                            className="w-full h-60 object-cover rounded-t-xl"
                        />
                    </figure>
                    <div className="card-body">
                        <h2 className="card-title">Why User Reviews Matter</h2>
                        <p>Explore the power of reviews in building trust on our platform.</p>
                        <div className="card-actions justify-end">
                            <button className="btn btn-primary bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white">
                                Read More <FaArrowRight />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Blog;