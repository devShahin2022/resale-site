import React, { useContext } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { AuthContextInfo } from '../authContext/AuthContext';
import { MDBSpinner } from 'mdb-react-ui-kit';
const Swal = require('sweetalert2');


const SellerPrivateRoutes = ({children}) => {
    const {user, loading, logOut, userInfoFromDb} = useContext(AuthContextInfo);
    const navigate = useNavigate();
    

    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      });

    // console.log('from private route', user, userInfoFromDb);
    const handleLogOut = () => {
        console.log('click logout btn');
        logOut()
        .then(res => {
            Toast.fire({
                icon: 'error',
                title: 'Account delete ! communicate admin for retrive'
            });
              return  navigate('/login');
        })
        .catch(error => console.log(error));
    }


    if(loading){
        return <div style={{"height":"100vh"}} className='d-flex justify-content-center w-100 align-items-center'>
                <MDBSpinner role='status'>
                        <span className='visually-hidden'>Loading...</span>
                </MDBSpinner>
            </div>
    }
    else if(user && user.uid && (userInfoFromDb?.role === 'seller') ){
        return children;
    }
    else if(userInfoFromDb?.role === 'delete' ){
        logOut()
        .then(res => {

        })
        return <Navigate to='/login'></Navigate>
    }
    else if(!user){
        return <Navigate to='/login'></Navigate>
    }
    else{
        handleLogOut();
    }
};

export default SellerPrivateRoutes;