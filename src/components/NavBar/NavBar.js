import React, { useContext, useState } from 'react';
import { Link } from "react-router-dom";
import { MDBIcon } from 'mdb-react-ui-kit';
import { AuthContextInfo } from '../../authContext/AuthContext';

const NavBar = ({showIcon, openSideBar, sidenav}) => {
    const [userRole, setUserRole] = useState('');

    // get current login user from context api
    const {user} = useContext(AuthContextInfo);
    if(user && user.email){
        const currentUserEmail = user.email;
        fetch('http://localhost:5000/current-user-data',{
            method : "POST",
            headers : {
                'content-type' : 'application/json'
            },
            body : JSON.stringify({currentUserEmail})
        })
        .then(res => res.json())
        .then(data => setUserRole(data[0].role));
    }

    return (
    <nav className=" navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
            <div className='d-flex align-items-center'>
                {
                    showIcon && <div className='toggleBtn'>
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
                src="https://mdbcdn.b-cdn.net/img/logo/mdb-transaprent-noshadows.webp"
                height="15"
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
                    userRole === 'admin' || 'seller' ?  <li className="nav-item">
                            <Link className="nav-link" to="/dashboard">Dashboard</Link>
                        </li>
                        :
                        <>
                        
                        </>
                }
                {
                  userRole === 'buyer' ? <>
                    <li className="nav-item">
                        <Link className="nav-link" to="/my-orders">My orders</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/wishlist">Wishlist</Link>
                    </li>
                  </>
                  :
                  <>
                  
                  </>
                }
                
            </ul>
            </div>
            <div className="d-flex align-items-center">
                {
                    user && user?.email ? <>
                        <img
                        title={user?.displayName}
                        src={user?.photoURL}
                        className="rounded-circle me-2 border-2"
                        height="30"
                        alt="img"
                        loading="lazy"
                        />
                        <button title='logout' className="btn bg-white text-reset me-3 rounded" to="#">
                            <MDBIcon className='text-danger' fas icon="sign-out-alt fs-6" />
                        </button>
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