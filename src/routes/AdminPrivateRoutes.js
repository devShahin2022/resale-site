import React, { useContext } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { AuthContextInfo } from '../authContext/AuthContext';
const Swal = require('sweetalert2');


const AdminPrivateRoute = ({children}) => {
    const {user, loading, logOut, userInfoFromDb} = useContext(AuthContextInfo);
    const navigate = useNavigate();
    

    // console.log('from private route', user, userInfoFromDb);
    const handleLogOut = () => {
        console.log('click logout btn');
        logOut()
        .then(res => {
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
              Toast.fire({
                icon: 'success',
                title: 'Logout success'
              });
              return  navigate('/login');
        })
        .catch(error => console.log(error));
    }


    if(loading){
        return <div style={{"height":"70vh"}} className='d-flex justify-content-center align-item-center w-100'>
            <p>Loading</p>
        </div>
    }
    else if(user && user.uid && (userInfoFromDb.role === 'admin') ){
        return children;
    }
    else if(!user){
        return <Navigate to='/login'></Navigate>
    }
    else{
        handleLogOut();
    }
};

export default AdminPrivateRoute;