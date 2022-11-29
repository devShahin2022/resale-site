import React, { useContext, useEffect, useState } from 'react';
import { AuthContextInfo } from '../../authContext/AuthContext';
import Footer from '../../components/Footer/Footer';
import NavBar from '../../components/NavBar/NavBar';

const MyOrders = () => {
// state
const [orderData, setOrderData] = useState([]);
const [loading, setLoading] = useState(true);

// get context
const {role, userInfoFromDb} = useContext(AuthContextInfo);

// use effect for loading data
useEffect(() => {
    if(userInfoFromDb?.role === 'buyer'){
        const email = userInfoFromDb.email ;
        fetch('http://localhost:5000/booked-products-data',{
            method : 'POST',
            headers : {
                'content-type' : 'application/json'
            },
            body : JSON.stringify({email})
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            setOrderData(data);
            setLoading(false);
        })
    }
}, [role,userInfoFromDb]);



    return (
        <div>
            <NavBar></NavBar>
            <div className='container'>
                <h1 className='text-center my-4 mb-5' >My Orders page</h1>


            <div style={{"minWidth" : "1100px"}} className=" mb-5">

            {
                loading ? 
                <>
                    <p>Data loading...</p>
                </>
                :
                <>
                {
                    orderData?.length > 0 ?
                    <>
                    <table  className="table align-middle mb-0 bg-white text-light">
                    <thead className="bg-primary">
                        <tr>
                            <th>Product</th>
                            <th>Contact with seller</th>
                            <th>Payment status</th>
                            <th>Order status</th>
                            <th>Booking date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            orderData?.map(eachOrder => (
                                <>
                                <tr key={eachOrder.bookedDate} >
                                    <td>
                                        <div className="d-flex align-items-center">
                                        <img
                                            src={eachOrder?.productDetails?.ImgUrl}
                                            alt=""
                                            style={{"width": "7rem"}}
                                            className="rounded-circle"
                                            />
                                        <div className="ms-3">
                                            <p className="  text-muted mb-0 fw-bold ">{eachOrder.categoryInfo.name}- {eachOrder.productDetails.phoneModel}</p>
                                            
                                            <p className="text-muted mb-0">Resale : {eachOrder.productDetails.resalePrice} tk</p>
                                            <p className="text-muted mb-0">used : {eachOrder.productDetails.phoneUsed}</p>
                                            <small className='badge badge-success fs-6 pb-0'>{eachOrder.productDetails.phoneCondition}<span className='fw-bold'><i className="fas fa-check-double text-success"></i></span> </small>
                                            
                                        </div>
                                        </div>
                                    </td>
                                    <td>
                                        <p className="fw-normal text-muted mb-1">Email : {eachOrder.productDetails.userEmail}</p>
                                        <p className="text-muted mb-0">Phone : {eachOrder.productDetails.number}</p>
                                        {
                                            eachOrder.productDetails.isVerified ? 
                                            <>
                                                <small className='badge badge-success fs-6 pb-0'>Varified <span className='fw-bold'><i className="fas fa-check-double text-success"></i></span> </small>
                                            </>
                                            :
                                            <>
                                                <small className='badge badge-danger fs-6 pb-0'>Unknown <span className='fw-bold'><i className="fas fa-check-double text-muted"></i></span> </small>
                                            </>
                                        }
                                    </td>
                                    <td>
                                    {
                                        eachOrder.paymentStatus ? 
                                        <>
                                            <small className='badge badge-success fs-6 pb-0'>paid <span className='fw-bold'></span> </small>
                                        </>
                                        :
                                        <>
                                            <small className='badge badge-danger fs-6 pb-0'>unpaid <span className='fw-bold'></span> </small>
                                        </>
                                    }
                                    </td>
                                    <td>


                                    {
                                    eachOrder.orderStatus === "pending" && 
                                        <>
                                            <small className='badge badge-info fs-6 pb-0'> Pending <span className='fw-bold'></span> </small>
                                        </>
                                    }
                                    {
                                    eachOrder.orderStatus === "booked" && 
                                        <>
                                            <small className='badge badge-success fs-6 pb-0'>Booked <span className='fw-bold'></span> </small>
                                        </>
                                    }
                                    {
                                    eachOrder.orderStatus === "cancel" && 
                                        <>
                                            <small className='badge badge-danger fs-6 pb-0'>Cancel <span className='fw-bold'></span> </small>
                                        </>
                                    }
                                    </td>
                                    <td className='text-muted'>
                                    { 
                                    ((Date.now()  - eachOrder.bookedDate) / 1000) < 15 && 
                                    <>
                                        <small>just now</small>
                                    </>
                                }
                                { 
                                    ((Date.now()  - eachOrder.bookedDate) / 1000) < 60 && (parseInt(((Date.now()  - eachOrder.bookedDate) / 1000)) > 14) &&
                                    <>
                                        <small>{ parseInt(((Date.now()  - eachOrder.bookedDate) / 1000))}s ago</small>
                                    </>
                                }
                                { 
                                    (( Date.now()  - eachOrder.bookedDate) / (1000*60)) < 60 && (parseInt((( Date.now()  - eachOrder.bookedDate) / (1000*60))) > 0) &&
                                    <>
                                         <small>{ parseInt((( Date.now()  - eachOrder.bookedDate) / (1000*60)))}m ago</small>
                                    </>
                                } 
                                { 
                                    (( Date.now()  - eachOrder.bookedDate ) / (1000*60*60)) < 24 && (parseInt((( Date.now()  - eachOrder.bookedDate ) / (1000*60*60))) > 0) &&
                                    <>
                                         <small>{ parseInt((( Date.now()  - eachOrder.bookedDate ) / (1000*60*60)))}h ago</small>
                                    </>
                                }
                                { 
                                   ( ((Date.now()  - eachOrder.bookedDate) / (1000*60*60*24)) < 30) && (parseInt(((Date.now()  - eachOrder.bookedDate) / (1000*60*60*24))) > 0 ) &&
                                    <>
                                         <small>{ parseInt(((Date.now()  - eachOrder.bookedDate) / (1000*60*60*24)))}d ago</small>
                                    </>
                                }
                                { 
                                    (((Date.now()  - eachOrder.bookedDate) / (1000*60*60*24*30)) < 12) && ( parseInt(((Date.now()  - eachOrder.bookedDate) / (1000*60*60*30))) > 0) &&
                                    <>
                                         <small>{ parseInt(((Date.now()  - eachOrder.bookedDate) / (1000*60*60*30)))}m ago</small>
                                    </>
                                }
                                { 
                                    ((Date.now()  - eachOrder.bookedDate) / (1000*60*60*24*30*12)) && (parseInt(((Date.now()  - eachOrder.bookedDate) / (1000*60*60*24*30*12))) > 0 ) &&
                                    <>
                                         <small>{ parseFloat(((Date.now()  - eachOrder.bookedDate) / (1000*60*60*24*30*12))).toFixed(1)}y ago</small>
                                    </>
                                }
                                    </td>
                                    <td>
                                        <button type="button " className="btn btn-sm btn-danger btn-rounded">
                                           Cancel
                                        </button>
                                        <button type="button" className="btn btn-sm btn-rounded btn-primary  mt-1">
                                            Pay now
                                        </button>
                                    </td>
                                    </tr>
                                </>
                            ))
                        }
                    </tbody>
                </table>
                    </>
                    :
                    <>
                        <h3 className='my-3 text-center'>No data found</h3>
                    </>
                }
                </>
            }
            </div>
                
            </div>
            <Footer></Footer>
        </div>
    );
};

export default MyOrders;