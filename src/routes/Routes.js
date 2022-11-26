import { createBrowserRouter } from "react-router-dom";
import AddProductPage from "../pages/AddProductPage/AddProductPage";
import AllBuyerPage from "../pages/AllBuyerPage/AllBuyerPage";
import AllProductsPage from "../pages/AllProductsPage/AllProductsPage";
import AllSeller from "../pages/AllSeller/AllSeller";
import BlogPage from "../pages/BlogPage/BlogPage";
import CategoryPage from "../pages/CategoryPage/CategoryPage";
import Dashboard from "../pages/DashboardPage/Dashboard";
import HomePage from "../pages/HomePage/HomePage";
import LoginInPage from "../pages/LoginInPage/LoginInPage";
import MyBuyer from "../pages/MyBuyerPage/MyBuyer";
import MyOrders from "../pages/MyOrders/MyOrders";
import MyProductPage from "../pages/MyProductPage/MyProductPage";
import RegisterPage from "../pages/RegisterPage/RegisterPage";
import ReportedProducts from "../pages/ReportedProducts/ReportedProducts";
import TotalUserPage from "../pages/TotalUserPage/TotalUserPage";
import WishList from "../pages/WishList/WishList";
import AdminPrivateRoute from "./AdminPrivateRoutes";
import BuyerPrivateRoutes from "./BuyerPrivateRoutes";
import CommonPrivateRoutes from "./CommonPrivate";
import SellerPrivateRoutes from "./SellerPrivateRoutes";

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
    {
        path : '/login',
        element : <LoginInPage></LoginInPage>
    },
    {
        path : '/register',
        element :  <RegisterPage></RegisterPage>
    },

    // buyer private route
    {
        path : '/my-orders',
        element : <BuyerPrivateRoutes><MyOrders></MyOrders></BuyerPrivateRoutes>
    },
    {
        path : '/wishlist',
        element : <BuyerPrivateRoutes><WishList></WishList> </BuyerPrivateRoutes>
    },
    
    // seller private routes
    {
        path : '/add-products',
        element : <SellerPrivateRoutes> <AddProductPage></AddProductPage> </SellerPrivateRoutes>
    },
    {
        path : '/my-products',
        element : <SellerPrivateRoutes> <MyProductPage></MyProductPage> </SellerPrivateRoutes>
    },
    {
        path : '/my-buyers',
        element : <SellerPrivateRoutes> <MyBuyer></MyBuyer> </SellerPrivateRoutes>
    },
    // admin private routes
    {
        path : '/all-product',
        element : <AdminPrivateRoute> <AllProductsPage></AllProductsPage></AdminPrivateRoute>
    },
    {
        path : '/total-user',
        element : <AdminPrivateRoute> <TotalUserPage></TotalUserPage> </AdminPrivateRoute>
    },
    {
        path : '/all-seller',
        element : <AdminPrivateRoute> <AllSeller></AllSeller> </AdminPrivateRoute>
    },
    {
        path : '/all-buyer',
        element : <AdminPrivateRoute> <AllBuyerPage></AllBuyerPage> </AdminPrivateRoute>
    },
    {
        path : '/reported-products',
        element : <AdminPrivateRoute> <ReportedProducts></ReportedProducts> </AdminPrivateRoute>
    },

    // common private route
    {
        path : '/dashboard',
        element : <CommonPrivateRoutes><Dashboard></Dashboard></CommonPrivateRoutes>
    },
    
    // 404 page
    {
        path : '*',
        element : <h1>page not found</h1>
    }
])