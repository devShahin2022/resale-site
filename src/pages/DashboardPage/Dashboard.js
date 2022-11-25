import { MDBIcon } from 'mdb-react-ui-kit';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = () => {
    const [sidenav, setSidenav] = useState(true);
    return (
        <>
            <nav className=" navbar navbar-expand-lg navbar-light bg-light position-relative">
                    <div className="container-fluid">
                        <div className='d-flex align-items-center'>
                            <div className='bg-danger toggleBtn'><span  className='mt-2 p-2 bg-light' onClick={()=>setSidenav(!sidenav)} >{sidenav ? <MDBIcon className='fs-4' fas icon="chevron-circle-left" />  :  <MDBIcon className='fs-4' fas icon="chevron-circle-right" /> }</span></div>
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
                                <Link className="nav-link" to="#">Home</Link>
                            </li>
                            <li id='' className="nav-item hover-blogs d-flex align-items-center">
                                <Link  className="nav-link" to="#">Blogs</Link>
                                <span className="me-2" to="#"><MDBIcon fas icon="chevron-down" /></span>
                                <ul id='submenu' className='position-absolute border'>
                                    <Link className="nav-link p-1" to="#">blogs</Link>
                                    <Link className="nav-link p-1" to="#">Blogs</Link>
                                    <Link className="nav-link p-1" to="#">Blogs</Link>
                                    <Link className="nav-link p-1" to="#">Blogs</Link>
                                    <Link className="nav-link p-1" to="#">Blogs</Link>
                                </ul>
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
            <div className='position-sticky sticky-top d-flex'>
                <div  style={{"margin-left":`${sidenav ? '0px' : '-115px'}`}} className='side-nav shadow shadow-lg mt-2'>
                    <Link title='All seller' className='sideNav-item-hover nav-link text-dark bg-light' to='/'><p className='d-flex justify-content-between align-items-center text-start mt-2'><span>Users</span>  {sidenav? <MDBIcon fas icon="long-arrow-alt-right" /> : <MDBIcon className='ms-2' fas icon="bug" />}</p></Link>
                    <Link title='All seller' className='sideNav-item-hover nav-link text-dark bg-light' to='/'><p className='d-flex justify-content-between align-items-center text-start mt-2'><span>All buyers</span>  {sidenav? <MDBIcon fas icon="long-arrow-alt-right" /> : <MDBIcon className='ms-2' fas icon="bug" />}</p></Link>
                    <Link title='All Buyer' className='sideNav-item-hover nav-link text-dark bg-light' to='/'><p className='d-flex justify-content-between align-items-center w-100 text-start mt-2'><span>All seller</span>  {sidenav? <MDBIcon fas icon="long-arrow-alt-right" /> : <MDBIcon  className='ms-2'  fas icon="user-cog" />}</p></Link>
                    <Link title='All products' className='sideNav-item-hover nav-link text-dark bg-light' to='/'><p className='d-flex justify-content-between align-items-center w-100 text-start mt-2'><span>Reported items</span>  {sidenav? <MDBIcon fas icon="long-arrow-alt-right" /> : <MDBIcon  className='ms-2'  fas icon="cloud-upload-alt" />}</p></Link>
                    <Link title='report products' className='sideNav-item-hover nav-link text-dark bg-light' to='/'><p className='d-flex justify-content-between align-items-center w-100 text-start mt-2'><span>All products</span>  {sidenav? <MDBIcon fas icon="long-arrow-alt-right" /> : <MDBIcon   className='ms-2' fas icon="user-tie" />}</p></Link>
                    <Link title='report products' className='sideNav-item-hover nav-link text-dark bg-light' to='/'><p className='d-flex justify-content-between align-items-center w-100 text-start mt-2'><span>My products</span>  {sidenav? <MDBIcon fas icon="long-arrow-alt-right" /> : <MDBIcon   className='ms-2' fas icon="user-tie" />}</p></Link>
                    <Link title='report products' className='sideNav-item-hover nav-link text-dark bg-light' to='/'><p className='d-flex justify-content-between align-items-center w-100 text-start mt-2'><span>Add a products</span>  {sidenav? <MDBIcon fas icon="long-arrow-alt-right" /> : <MDBIcon   className='ms-2' fas icon="user-tie" />}</p></Link>
                    <Link title='report products' className='sideNav-item-hover nav-link text-dark bg-light' to='/'><p className='d-flex justify-content-between align-items-center w-100 text-start mt-2'><span>My buyers</span>  {sidenav? <MDBIcon fas icon="long-arrow-alt-right" /> : <MDBIcon   className='ms-2' fas icon="user-tie" />}</p></Link>
                </div>
                <div className='container-fluid mt-2'>
                    <h1>Hello </h1>
                    <h2>What is your name my name is shahin alam my mptjer name is</h2>
                </div>
            </div>
        </>
    );
};

export default Dashboard;