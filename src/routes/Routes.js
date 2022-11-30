import { createBrowserRouter } from "react-router-dom";
import AddProductPage from "../pages/AddProductPage/AddProductPage";
import AllBuyerPage from "../pages/AllBuyerPage/AllBuyerPage";
import AllProductsPage from "../pages/AllProductsPage/AllProductsPage";
import AllSeller from "../pages/AllSeller/AllSeller";
import BlogPage from "../pages/BlogPage/BlogPage";
import CategoryPage from "../pages/CategoryPage/CategoryPage";
import CategoryProductPage from "../pages/CategoryProductPage/CategoryProductPage";
import Dashboard from "../pages/DashboardPage/Dashboard";
import HomePage from "../pages/HomePage/HomePage";
import LoginInPage from "../pages/LoginInPage/LoginInPage";
import MyBuyer from "../pages/MyBuyerPage/MyBuyer";
import MyOrders from "../pages/MyOrders/MyOrders";
import MyProductPage from "../pages/MyProductPage/MyProductPage";
import RegisterPage from "../pages/RegisterPage/RegisterPage";
import ReportedProduct from "../pages/ReportedProduct/ReportedProduct";
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
    {
        path : '/brand/:id',
        element : <BuyerPrivateRoutes><CategoryProductPage ></CategoryProductPage></BuyerPrivateRoutes>
    },

    // {
    //     path : '/brand/:id',
    //     loader : ({params}) => fetch(`http://localhost:5000/getdata-by-brand?id=${params.id}`),
    //     element : <BuyerPrivateRoutes><CategoryProductPage ></CategoryProductPage></BuyerPrivateRoutes>
    // },
    // other private route
    
    {
        path : '/dashboard',
        children : [

            // common private route
            {
                path : '/dashboard',
                element : <CommonPrivateRoutes><Dashboard></Dashboard></CommonPrivateRoutes>
            },
            
            // seller private routes
            {
                path : '/dashboard/add-products',
                element : <SellerPrivateRoutes> <AddProductPage></AddProductPage> </SellerPrivateRoutes>
            },
            {
                path : '/dashboard/my-products',
                element : <SellerPrivateRoutes> <MyProductPage></MyProductPage> </SellerPrivateRoutes>
            },
            {
                path : '/dashboard/my-buyers',
                element : <SellerPrivateRoutes> <MyBuyer></MyBuyer> </SellerPrivateRoutes>
            },

            // admin private routes
            {
                path : '/dashboard/all-product',
                element : <AdminPrivateRoute> <AllProductsPage></AllProductsPage></AdminPrivateRoute>
            },
            {
                path : '/dashboard/total-user',
                element : <AdminPrivateRoute> <TotalUserPage></TotalUserPage> </AdminPrivateRoute>
            },
            {
                path : '/dashboard/all-seller',
                element : <AdminPrivateRoute> <AllSeller></AllSeller> </AdminPrivateRoute>
            },
            {
                path : '/dashboard/all-buyer',
                element : <AdminPrivateRoute> <AllBuyerPage></AllBuyerPage> </AdminPrivateRoute>
            },
            {
                path : '/dashboard/reported-products',
                element : <AdminPrivateRoute> <ReportedProduct></ReportedProduct> </AdminPrivateRoute>
            }
        ]  
    },
    
    // 404 page
    {
        path : '*',
        element : <h1>page not found</h1>
    }
])