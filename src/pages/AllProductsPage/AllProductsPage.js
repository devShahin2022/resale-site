import React from 'react';
import Dashboard from '../DashboardPage/Dashboard';
import Allproducts from './componets/Allproducts';

const AllProductsPage = () => {
    return (
        <div>
            <Dashboard>  <Allproducts></Allproducts> </Dashboard>
        </div>
    );
};

export default AllProductsPage;