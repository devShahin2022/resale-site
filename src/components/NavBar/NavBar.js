import React from 'react';
import { Link } from "react-router-dom";
import { MDBIcon } from 'mdb-react-ui-kit';

const NavBar = () => {
    return (
    <nav className=" navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
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
                    <Link className="nav-link" to="#">Home</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="#">Category</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="#">Blogs</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="#">Dashboard</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="#">My orders</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="#">Wishlist</Link>
                </li>
            </ul>
            </div>
            <div className="d-flex align-items-center">
                <Link to='/login'><button className='btn btn-danger me-2'>Login</button></Link>
                <Link to='/register'><button className='btn btn-outline-primary'>Register</button></Link>
                <img
                    title='Md Shahin Alam' 
                    src="https://mdbcdn.b-cdn.net/img/new/avatars/2.webp"
                    className="rounded-circle me-2"
                    height="30"
                    alt="Black and White Portrait of a Man"
                    loading="lazy"
                />
                <button title='logout' className="btn bg-white text-reset me-3 rounded" to="#">
                    <MDBIcon className='text-danger' fas icon="sign-out-alt fs-6" />
                </button>
            </div>
            </div>
    </nav>
    );
};

export default NavBar;