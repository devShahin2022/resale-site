import { MDBIcon } from 'mdb-react-ui-kit';
import React, {useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContextInfo } from '../../authContext/AuthContext';
import NavBar from '../../components/NavBar/NavBar';
import './Dashboard.css';

const Dashboard = () => {
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
           
            <div className='position-sticky sticky-top d-flex'>
                <div  style={{"margin-left":`${sidenav ? '0px' : '-115px'}`}} className='side-nav shadow shadow-lg mt-2'>
                    {
                        userRole === 'admin' ? 
                        <>
                            <Link title='report products' className='sideNav-item-hover nav-link text-dark bg-light' to='/'><p className='d-flex justify-content-between align-items-center w-100 text-start mt-2'><span>All products</span>  {sidenav? <MDBIcon fas icon="long-arrow-alt-right" /> : <MDBIcon   className='ms-2' fas icon="user-tie" />}</p></Link>
                            <Link title='All seller' className='sideNav-item-hover nav-link text-dark bg-light' to='/'><p className='d-flex justify-content-between align-items-center text-start mt-2'><span>Total users</span>  {sidenav? <MDBIcon fas icon="long-arrow-alt-right" /> : <MDBIcon className='ms-2' fas icon="bug" />}</p></Link>
                            <Link title='All seller' className='sideNav-item-hover nav-link text-dark bg-light' to='/'><p className='d-flex justify-content-between align-items-center text-start mt-2'><span>All buyers</span>  {sidenav? <MDBIcon fas icon="long-arrow-alt-right" /> : <MDBIcon className='ms-2' fas icon="bug" />}</p></Link>
                            <Link title='All Buyer' className='sideNav-item-hover nav-link text-dark bg-light' to='/'><p className='d-flex justify-content-between align-items-center w-100 text-start mt-2'><span>All seller</span>  {sidenav? <MDBIcon fas icon="long-arrow-alt-right" /> : <MDBIcon  className='ms-2'  fas icon="user-cog" />}</p></Link>
                            <Link title='All products' className='sideNav-item-hover nav-link text-dark bg-light' to='/'><p className='d-flex justify-content-between align-items-center w-100 text-start mt-2'><span>Reported products</span>  {sidenav? <MDBIcon fas icon="long-arrow-alt-right" /> : <MDBIcon  className='ms-2'  fas icon="cloud-upload-alt" />}</p></Link>
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
                            <Link title='report products' className='sideNav-item-hover nav-link text-dark bg-light' to='/'><p className='d-flex justify-content-between align-items-center w-100 text-start mt-2'><span>My products</span>  {sidenav? <MDBIcon fas icon="long-arrow-alt-right" /> : <MDBIcon   className='ms-2' fas icon="user-tie" />}</p></Link>
                            <Link title='report products' className='sideNav-item-hover nav-link text-dark bg-light' to='/'><p className='d-flex justify-content-between align-items-center w-100 text-start mt-2'><span>Add a products</span>  {sidenav? <MDBIcon fas icon="long-arrow-alt-right" /> : <MDBIcon   className='ms-2' fas icon="user-tie" />}</p></Link>
                            <Link title='report products' className='sideNav-item-hover nav-link text-dark bg-light' to='/'><p className='d-flex justify-content-between align-items-center w-100 text-start mt-2'><span>My buyers</span>  {sidenav? <MDBIcon fas icon="long-arrow-alt-right" /> : <MDBIcon   className='ms-2' fas icon="user-tie" />}</p></Link>
                        </>
                        :
                        <>
                            {
                                undefined
                            }
                        </>
                    }
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