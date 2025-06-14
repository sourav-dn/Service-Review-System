import { Outlet } from 'react-router';
import Navbar from '../Pages/Shared/Navbar';
import Footer from '../Pages/Shared/Footer';
import { ToastContainer } from 'react-toastify';

const Root = () => {
    return (
        <div className='max-w-7xl mx-auto'>
            <Navbar></Navbar>
            <ToastContainer></ToastContainer>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default Root;