import { FaFacebookSquare, FaGithub, FaLinkedin } from "react-icons/fa";
import { Link } from "react-router";


const Footer = () => {
    return (
        <footer className="footer footer-horizontal footer-center bg-base-200 text-base-content rounded p-10">
            <div>
                <img className='size-15' src="/service-related-img.png" alt="" />
                <a className="text-xl font-bold">ServiceScope</a>
                <a className="link link-hover">About us</a>
                <a className="link link-hover">Contact</a>
            </div>

            <ul className="flex flex-wrap pl-3 space-x-4 sm:space-x-8">
                <li>
                    <Link to='https://github.com/sourav-dn' target="_blank">
                        <FaGithub className='text-2xl' />
                    </Link>
                </li>
                <li>
                    <Link to='https://www.linkedin.com/in/sourav-dn/' target="_blank">
                        <FaLinkedin className='text-2xl' />
                    </Link>
                </li>
                <li>
                    <Link to='https://www.facebook.com/sourav81.bd/' target="_blank">
                        <FaFacebookSquare className='text-2xl' />
                    </Link>
                </li>
            </ul>

            <div>
                <p>Copyright © {new Date().getFullYear()} - All right reserved by <a className=" font-bold text-blue-600">ServiceScope</a></p>
            </div>


        </footer>
    );
};

export default Footer;