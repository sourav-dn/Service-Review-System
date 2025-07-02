import React from 'react';

const About = () => {
    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <img src="/service-related-img.png" className="max-w-sm rounded-lg shadow-2xl" alt="About"/>
                <div>
                    <h1 className="text-5xl font-bold">About ServiceScope</h1>
                    <p className="py-6 text-lg">
                        ServiceScope is your trusted platform to find, add, and review services. 
                        Our mission is to connect people with quality services easily and efficiently.
                    </p>
                    <button className="btn btn-primary">Get Started</button>
                </div>
            </div>
        </div>
    );
};

export default About;