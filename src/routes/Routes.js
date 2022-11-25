import { createBrowserRouter } from "react-router-dom";
import BlogPage from "../pages/BlogPage/BlogPage";
import CategoryPage from "../pages/CategoryPage/CategoryPage";
import Dashboard from "../pages/DashboardPage/Dashboard";
import HomePage from "../pages/HomePage/HomePage";
import LoginInPage from "../pages/LoginInPage/LoginInPage";
import RegisterPage from "../pages/RegisterPage/RegisterPage";
import BuyerPrivateRoutes from "./BuyerPrivateRoutes";

export const router = createBrowserRouter([
    // public route
    {
        path : '/',
        element : <HomePage></HomePage>
    },
    {
        path : '/home',
        element : <HomePage></HomePage>
    },
    {
        path : '/blogs',
        element : <BlogPage></BlogPage>
    },
    {
        path : '/category',
        element : <CategoryPage></CategoryPage>
    },

    // buyer private route


    // admin private routes


    // seller private routes

    {
        path : '/dashboard',
        element : <BuyerPrivateRoutes><Dashboard></Dashboard></BuyerPrivateRoutes>
    },
    {
        path : '/login',
        element : <LoginInPage></LoginInPage>
    },
    {
        path : '/register',
        element :  <RegisterPage></RegisterPage>
    },
    {
        path : '*',
        element : <h1>page not found</h1>
    }
])