import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContextInfo } from '../authContext/AuthContext';


const BuyerPrivateRoutes = ({children}) => {
    const {user, loading} = useContext(AuthContextInfo);
    if(loading){
        return <div style={{"height":"70vh"}} className='d-flex justify-content-center align-item-center w-100'>
            <p>Loading</p>
        </div>
    }
    if(user && user.uid){
        return children;
    }
    return <Navigate to='/login'></Navigate>
};

export default BuyerPrivateRoutes;