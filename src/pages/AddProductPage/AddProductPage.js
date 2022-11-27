import React from 'react';
import Dashboard from '../DashboardPage/Dashboard';
import AddProd from './Component/AddProd';

const AddProductPage = () => {
    const clickMe = () => {
        alert('Iam ok');
    }
    return (
        <Dashboard> <AddProd clickMe={clickMe} ></AddProd> </Dashboard>
    );
};

export default AddProductPage;