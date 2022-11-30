import React, { useContext } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { AuthContextInfo } from '../authContext/AuthContext';
import { MDBSpinner } from 'mdb-react-ui-kit';
const Swal = require('sweetalert2');

const CommonPrivateRoutes = ({children}) => {
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
    
    const handleLogOut = () => {
        console.log('click logout btn');
        logOut()
        .then(res => {
              Toast.fire({
                icon: 'success',
                title: 'Logout success'
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
    else if(user && user.uid && (userInfoFromDb?.role === 'seller' || userInfoFromDb?.role === 'admin')){
        return children;
    }
    else if(userInfoFromDb?.role === 'delete'){
        logOut()
        .then(res => {
            Toast.fire({
                icon: 'error',
                title: 'Account deleted ! communicate admin for retrive'
              });
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

export default CommonPrivateRoutes;