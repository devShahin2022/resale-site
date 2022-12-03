import React, { useContext } from 'react';
import { Link } from "react-router-dom";
import { MDBIcon } from 'mdb-react-ui-kit';
import { AuthContextInfo } from '../../authContext/AuthContext';
const Swal = require('sweetalert2');

const NavBar = ({showMeIcon, openSideBar, sidenav}) => {
    let defaultIconShow = showMeIcon || false;
    // get current login user from context api
    const {user, logOut, manageRole, role} = useContext(AuthContextInfo);
    if(user && user.email){
        const currentUserEmail = user.email;
        fetch('https://ass-12-resale.vercel.app/current-user-data',{
            method : "POST",
            headers : {
                'content-type' : 'application/json'
            },
            body : JSON.stringify({currentUserEmail})
        })
        .then(res => res.json())
        .then(data => {
            manageRole(data[0]?.role);
            // set to context api
        });
    }

    // handle logout
    const handleLogOut = () => {
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
            // setUserRole('');
        })
        .catch(error => console.log(error));
    }

    return (
    <nav className=" navbar navbar-expand-md navbar-light bg-light">
        <div className="container-fluid">
            <div className='d-flex align-items-center'>
                {
                    defaultIconShow && <div className='toggleBtn'>
                        <span  className='mt-2 p-2 bg-light' onClick={()=>openSideBar(sidenav)} >
                            {sidenav ? 
                            <MDBIcon className='fs-4' fas icon="chevron-circle-left" /> 
                            :  
                            <MDBIcon className='fs-4' fas icon="chevron-circle-right" />
                            }
                        </span>
                    </div>
                }
                <button
                    className="navbar-toggler"
                    type="button"
                    data-mdb-toggle="collapse"
                    data-mdb-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                    >
                    <i className="fas fa-bars"></i>
                </button>
            </div>
            

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <Link className="navbar-brand mt-2 mt-lg-0" to="#">
                <img
                src="https://png.pngtree.com/png-vector/20190302/ourlarge/pngtree-vector-cell-phone-icon-png-image_745261.jpg"
                height="40"
                alt="MDB Logo"
                loading="lazy"
                />
            </Link>
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                    <Link className="nav-link" to="/home">Home</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/category">Category</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/blogs">Blogs</Link>
                </li>
                {
                    role === 'admin'  &&
                        <li className="nav-item">
                            <Link className="nav-link" to="/dashboard">Dashboard</Link>
                        </li>
                }
                {
                    role === 'seller'  &&
                        <li className="nav-item">
                            <Link className="nav-link" to="/dashboard">Dashboard</Link>
                        </li>
                }
                {
                  role === 'buyer' ? <>
                    <li className="nav-item">
                        <Link className="nav-link" to="/my-orders">My orders</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/wishlist">Wishlist</Link>
                    </li>
                  </>
                  :
                  <>
                    {
                        undefined
                    }
                  </>
                }
                
            </ul>
            </div>
            <div className="d-flex align-items-center">
                {
                    user && user?.email ? 
                    <>
                        {
                            role !== 'admin' ? 
                            <>
                                <div className="dropdown">
                                <button
                                    style={{"backgroundColor":"transparent"}}
                                    className="btn p-0 m-0 dropdown-toggle me-2 shadow-0 border p-1 border-1"
                                    type="button"
                                    id="dropdownMenuButton"
                                    data-mdb-toggle="dropdown"
                                    aria-expanded="false"
                                >
                                    <small className='me-1'>{user?.displayName}</small>
                                    <img
                                    width="30"
                                    title={user?.email}
                                    src={user?.photoURL}
                                    className="rounded-circle border-2"
                                    height="30"
                                    alt="img"
                                    loading="lazy"
                                    />
                                </button>
                                <ul style={{"zIndex" : "222222"}} className="dropdown-menu bg-dark p-3 shadow shadow-3" aria-labelledby="dropdownMenuButton">
                                    <button className='btn btn-dark w-100'>Switch to buyer mood</button>
                                </ul>
                                </div>
                                <button onClick={handleLogOut} title='logout' className="btn bg-white text-reset me-3 rounded" to="#">
                                    <MDBIcon className='text-danger' fas icon="sign-out-alt fs-6" />
                                </button>
                            </>
                            :
                            <>
                                <small className='me-1'>{user?.displayName}</small>
                                    <img
                                    width="30"
                                    title={user?.email}
                                    src={user?.photoURL}
                                    className="rounded-circle border-2 me-2"
                                    height="30"
                                    alt="img"
                                    loading="lazy"
                                    />
                                <button onClick={handleLogOut} title='logout' className="btn bg-white text-reset me-3 rounded" to="#">
                                    <MDBIcon className='text-danger' fas icon="sign-out-alt fs-6" />
                                </button>
                            </>
                        }
                    </>
                    :
                    <>
                        <Link to='/login'><button className='btn btn-danger me-2'>Login</button></Link>
                        <Link to='/register'><button className='btn btn-outline-primary'>Register</button></Link>
                    </>
                }
            </div>
            </div>
    </nav>
    );
};

export default NavBar;