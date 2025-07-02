import {
  createBrowserRouter,
  RouterProvider,
} from "react-router";
import Root from "../Root/Root";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import ServiceDetails from "../Pages/ServiceDetails/ServiceDetails";
import PrivateRoute from "./PrivateRoute";
import AddServices from "../Pages/AddServices/AddServices";
import AllService from "../Pages/AllService/AllService";
import MyServices from "../Pages/MyServices/MyServices";
import MyReviews from "../Pages/MyReviews/MyReviews";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import CountUpSection from "../Components/CountUpSection/CountUpSection";
import About from "../Pages/About/About";
import Contact from "../Pages/Contact/Contact";
import Faq from "../Pages/Faq/Faq";
import Blog from "../Pages/Blog/Blog";



export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
        {
            index: true,
            Component: Home
        },
        {
          path:"/about",
          Component: About
        },
        {
          path: "/contact",
          Component: Contact
        },
        {
          path: "/faq",
          Component: Faq
        },
        {
          path: "/blog",
          Component: Blog
        },
        {
          path: "/allService",
          Component: AllService
        },
        {
          path: "/service-count",
          Component: CountUpSection
        },
        {
          path: "/login",
          Component: Login
        },
        {
          path: "/register",
          Component: Register
        },
        {
          path: "/serviceDetails/:id",
          Component: ServiceDetails
        },
        {
          path: "/add-services",
          element: <PrivateRoute><AddServices></AddServices></PrivateRoute>
        },
        {
          path: "/my-services",
          element: <PrivateRoute><MyServices></MyServices></PrivateRoute>
        },
        {
          path: "/my-reviews",
          element: <PrivateRoute><MyReviews></MyReviews></PrivateRoute>
        }
        
    ]
  },
]);