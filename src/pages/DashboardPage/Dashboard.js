import { MDBIcon } from 'mdb-react-ui-kit';
import React, {useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContextInfo } from '../../authContext/AuthContext';
import Footer from '../../components/Footer/Footer';
import NavBar from '../../components/NavBar/NavBar';
import './Dashboard.css';

const Dashboard = ({children}) => {
    const [sidenav, setSidenav] = useState(true);
    const [userRole, setUserRole] = useState('');
    const [showMeIcon, setShowIcon] = useState(false);
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
        .then(data => {
            setUserRole(data[0].role);
            setShowIcon(true);
        });
    }

    const openSideBar = () => {
        setSidenav(!sidenav);
    }

    return (
        <>
            <NavBar showMeIcon={showMeIcon} openSideBar = {openSideBar} sidenav = {sidenav} ></NavBar>
           
            <div  className='d-flex'>
                <div  style={{"margin-left":`${sidenav ? '0px' : '-115px'}`}} className='side-nav shadow shadow-lg mt-2'>
                    {
                        userRole === 'admin' ? 
                        <>
                            <Link title='report products' className='sideNav-item-hover nav-link text-dark bg-light' to='/dashboard/all-product'><p className='d-flex justify-content-between align-items-center w-100 text-start mt-2'><span>All products</span>  {sidenav? <MDBIcon fas icon="long-arrow-alt-right" /> : <MDBIcon   className='ms-2' fas icon="user-tie" />}</p></Link>
                            <Link title='All seller' className='sideNav-item-hover nav-link text-dark bg-light' to='/dashboard/total-user'><p className='d-flex justify-content-between align-items-center text-start mt-2'><span>Total users</span>  {sidenav? <MDBIcon fas icon="long-arrow-alt-right" /> : <MDBIcon className='ms-2' fas icon="bug" />}</p></Link>
                            <Link title='All seller' className='sideNav-item-hover nav-link text-dark bg-light' to='/dashboard/all-seller'><p className='d-flex justify-content-between align-items-center text-start mt-2'><span>All buyers</span>  {sidenav? <MDBIcon fas icon="long-arrow-alt-right" /> : <MDBIcon className='ms-2' fas icon="bug" />}</p></Link>
                            <Link title='All Buyer' className='sideNav-item-hover nav-link text-dark bg-light' to='/dashboard/all-buyer'><p className='d-flex justify-content-between align-items-center w-100 text-start mt-2'><span>All seller</span>  {sidenav? <MDBIcon fas icon="long-arrow-alt-right" /> : <MDBIcon  className='ms-2'  fas icon="user-cog" />}</p></Link>
                            <Link title='All products' className='sideNav-item-hover nav-link text-dark bg-light' to='/dashboard/reported-products'><p className='d-flex justify-content-between align-items-center w-100 text-start mt-2'><span>Reported products</span>  {sidenav? <MDBIcon fas icon="long-arrow-alt-right" /> : <MDBIcon  className='ms-2'  fas icon="cloud-upload-alt" />}</p></Link>
                        </>
                        :
                        <>
                            {
                                undefined
                            }
                        </>
                    }
                    {
                        userRole === 'seller' ? 
                        <>
                            <Link title='Add products' className='sideNav-item-hover nav-link text-dark bg-light' to='/dashboard/add-products'><p className='d-flex justify-content-between align-items-center w-100 text-start mt-2'><span>Add a products</span>  {sidenav? <MDBIcon fas icon="long-arrow-alt-right" /> : <MDBIcon   className='ms-2' fas icon="user-tie" />}</p></Link>
                            <Link title='My products' className='sideNav-item-hover nav-link text-dark bg-light' to='/dashboard/my-products'><p className='d-flex justify-content-between align-items-center w-100 text-start mt-2'><span>My products</span>  {sidenav? <MDBIcon fas icon="long-arrow-alt-right" /> : <MDBIcon   className='ms-2' fas icon="user-tie" />}</p></Link>
                            <Link title='My buyers' className='sideNav-item-hover nav-link text-dark bg-light' to='/dashboard/my-buyers'><p className='d-flex justify-content-between align-items-center w-100 text-start mt-2'><span>My buyers</span>  {sidenav? <MDBIcon fas icon="long-arrow-alt-right" /> : <MDBIcon   className='ms-2' fas icon="user-tie" />}</p></Link>
                        </>
                        :
                        <>
                            {
                                undefined
                            }
                        </>
                    }
                </div>
                <div style={{"padding-bottom":"10rem"}} className='container-fluid mt-4'>
                    {/* component load here */}
                    {
                        children ? 
                        
                        <>
                            {children}
                        </>
                        :
                        <>
                            <div className='container'>
                                <h1 className='display-3 text-center my-4 text-primary'>Welcome to your dashboard</h1>
                                <div className='row d-flex justify-content-center'>
                                    <div className='rounded-5 col-md-3 d-flex justify-content-center bg-primary m-3 text-white align-items-center border-rounded py-5 px-2'>
                                        <h3>Your current orders</h3>
                                    </div>
                                    <div className='rounded-5 col-md-3 d-flex justify-content-center bg-danger m-3 text-white align-items-center border-rounded py-5 px-2'>
                                        <h3>Your total products</h3>
                                    </div>
                                    <div className='rounded-5 col-md-3 d-flex justify-content-center bg-success m-3 text-white align-items-center border-rounded py-5 px-2'>
                                        <h3>Advertised product</h3>
                                    </div>
                                    <div className='rounded-5 col-md-3 d-flex justify-content-center bg-info m-3 text-white align-items-center border-rounded py-5 px-2'>
                                        <h3>Booked products</h3>
                                    </div>
                                </div>
                            </div>
                        </>
                    }
                </div>
            </div>
                <Footer></Footer>    
        </>
    );
};

export default Dashboard;