import React from 'react';

const Faq = () => {
    return (
        <div className="max-w-3xl mx-auto p-8 min-h-screen my-10">
            <h1 className="text-4xl font-bold text-center mb-8">Frequently Asked Questions</h1>
            <div className="space-y-4">
                <div className="collapse collapse-plus bg-base-200">
                    <input type="checkbox" /> 
                    <div className="collapse-title text-xl font-medium">
                        How do I register?
                    </div>
                    <div className="collapse-content"> 
                        <p>Click on the Register button in the navbar and fill out the signup form.</p>
                    </div>
                </div>
                <div className="collapse collapse-plus bg-base-200">
                    <input type="checkbox" /> 
                    <div className="collapse-title text-xl font-medium">
                        Can I add my own services?
                    </div>
                    <div className="collapse-content"> 
                        <p>Yes! Once logged in, you can add services through the Add Services page.</p>
                    </div>
                </div>
                <div className="collapse collapse-plus bg-base-200">
                    <input type="checkbox" /> 
                    <div className="collapse-title text-xl font-medium">
                        How do I contact support?
                    </div>
                    <div className="collapse-content"> 
                        <p>Use the Contact page to find our email and phone number.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Faq;