import { createBrowserRouter } from "react-router-dom";
import Dashboard from "../pages/DashboardPage/Dashboard";
import LoginInPage from "../pages/LoginInPage/LoginInPage";
import RegisterPage from "../pages/RegisterPage/RegisterPage";

export const router = createBrowserRouter([
    {
        path : '/dashboard',
        element : <Dashboard></Dashboard>
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