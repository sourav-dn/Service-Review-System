import { useContext, useEffect, useState } from "react";
import { Link, NavLink } from "react-router";
import { Authcontext } from "../../Provider/AuthProvider";



const Navbar = () => {
    const { user, logOut } = useContext(Authcontext);

    const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

    const handleToggle = (e) => {
        setTheme(e.target.checked ? "dark" : "light");
    };

    useEffect(() => {
        localStorage.setItem("theme", theme);
        document.querySelector("html").setAttribute("data-theme", theme);
    }, [theme]);


    const navLinks = (
        <>
            <li><NavLink to="/" className={({ isActive }) => isActive ? "text-blue-600 font-bold" : ""}>Home</NavLink></li>
            <li><NavLink to="/allService" className={({ isActive }) => isActive ? "text-blue-600 font-bold" : ""}>All Service</NavLink></li>
            {user && (
                <>
                    <li><NavLink to="/add-services" className={({ isActive }) => isActive ? "text-blue-600 font-bold" : ""}>Add Services</NavLink></li>
                    <li><NavLink to="/my-services" className={({ isActive }) => isActive ? "text-blue-600 font-bold" : ""}>My Services</NavLink></li>
                    <li><NavLink to="/my-reviews" className={({ isActive }) => isActive ? "text-blue-600 font-bold" : ""}>My Reviews</NavLink></li>
                </>
            )}
        </>
    )



    return (
        <div>
            <div className="navbar bg-base-100">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                        </div>
                    </div>
                    <Link to="/" className="text-xl font-bold flex items-center gap-2">
                        ServiceScope
                        <img className="w-8 h-8 rounded-xl" src="/service-related-img.png" alt="logo" />
                    </Link>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        {navLinks}
                    </ul>
                </div>
                <div className="navbar-end">

                    {/* Theme Toggle */}
                    <label className="swap swap-rotate mr-2">
                        <input
                            type="checkbox"
                            onChange={handleToggle}
                            checked={theme === "dark"}
                        />
                        {/* Sun icon */}
                        <svg
                            className="swap-on h-6 w-6 fill-current"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                        >
                            <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
                        </svg>
                        {/* Moon icon */}
                        <svg
                            className="swap-off h-6 w-6 fill-current"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                        >
                            <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
                        </svg>
                    </label>

                    {user?.email ? (
                        <div className="flex items-center gap-3">
                            <div
                                className="tooltip tooltip-bottom"
                                data-tip={user.displayName}
                            >
                                <img
                                    className="w-10 h-10 rounded-full cursor-pointer"
                                    src={user?.photoURL || "/default-avatar.png"}
                                    alt="User"
                                />
                            </div>
                            <button onClick={logOut} className="btn btn-sm btn-info text-white md:btn">
                                Logout
                            </button>
                        </div>
                    ) : (
                        <div className="flex flex-col sm:flex-row gap-2">
                            <Link to="/login">
                                <button className="btn btn-sm bg-blue-600 text-white">Login</button>
                            </Link>
                            <Link to="/register">
                                <button className="btn btn-sm bg-blue-600 text-white">Register</button>
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Navbar;