import React, { useContext, useEffect, useState } from 'react';
import { AuthContextInfo } from '../../../authContext/AuthContext';
const Swal = require('sweetalert2');

const MyBuyers = () => {
// state
const [orderData, setOrderData] = useState([]);
const [loading, setLoading] = useState(true);
const [reRender, setRerender] = useState(454); //just for rerender

// get context
const {role, userInfoFromDb} = useContext(AuthContextInfo);

// use effect for loading data
useEffect(() => {
    if(userInfoFromDb?.role === 'seller'){
        const email = userInfoFromDb.email ;
        fetch('http://localhost:5000/seller/booked-products-data',{
            method : 'POST',
            headers : {
                'content-type' : 'application/json'
            },
            body : JSON.stringify({email})
        })
        .then(res => res.json())
        .then(data => {
            setOrderData(data);
            setLoading(false);
        })
        .catch(error => {
            setLoading(false);
        })
    }
}, [role,userInfoFromDb,reRender]);


// cancel booked order
const cancelBookedOrder = (id) => {
    if(role === 'seller') {
        Swal.fire({
          title: 'Are you sure to cacel?',
          text: "You won't be able to revert this!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, cancel it!'
        }).then((result) => {
          if (result.isConfirmed) {

              fetch('http://localhost:5000/cancel-order',{
              method : 'DELETE',
              headers : {
                  "content-type" : "application/json"
              },
              body : JSON.stringify({id})
              })
              .then(res => res.json())
              .then(data => {
                //   console.log(data);
                if(data.acknowledged){

                }
              })

            Swal.fire(
              'Deleted!',
              'Your order is canceled successfully',
              'success'
            )
            setRerender(Date.now());
          }
         
        })
  }
}

    // toast
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

// accepted order
const acceptedOrder = (id) => {
        if(role === 'seller'){
            fetch('http://localhost:5000/accepted-order',{
            method : 'POST',
            headers : {
                "content-type" : "application/json"
            },
            body : JSON.stringify({id})
            })
            .then(res => res.json())
            .then(data => {
                if(data.acknowledged){
                    Toast.fire({
                        icon: 'success',
                        title: 'Order accepted'
                    });
                }
            })
        setRerender(Date.now());
  }
}

// keep pending order data 
const keepPending = (id) => {
    if(role === 'seller'){
        fetch('http://localhost:5000/keep-pending-order',{
        method : 'POST',
        headers : {
            "content-type" : "application/json"
        },
        body : JSON.stringify({id})
        })
        .then(res => res.json())
        .then(data => {
            if(data.acknowledged){
                Toast.fire({
                    icon: 'success',
                    title: 'Order maked panding'
                });
            }
        })
        setRerender(Date.now());
    }
}

    return (
        <div>
            <div className='container'>
                <h1 className='text-center my-4 mb-5' >My buyers</h1>


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
                            <th>Contact with Buyer</th>
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
                                        <p className="fw-normal text-muted mb-1">Email : {eachOrder.buyerInfo.email}</p>
                                        <p className="text-muted mb-0">Phone : {eachOrder.productDetails.number}</p>
                                        <p className="text-muted mb-0">Meeting Location : { eachOrder.MeetingLocation }</p>
                                        {
                                            eachOrder.buyerInfo.isVerified ? 
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
                                            <small className='badge badge-danger fs-6 pb-0'>Order Cancel <span className='fw-bold'></span> </small>
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
                                        <button onClick={()=> cancelBookedOrder(eachOrder.prodId)} type="button " className="btn btn-sm btn-danger btn-rounded">
                                           Cancel
                                        </button>
                                        {
                                            eachOrder.orderStatus === "booked" && 
                                            <button onClick={()=> keepPending(eachOrder._id)} type="button" className="btn btn-sm btn-rounded btn-primary  mt-1">
                                                Keep pending
                                            </button>

                                        }
                                        {
                                             eachOrder.orderStatus === "pending" && 
                                             <button onClick={()=> acceptedOrder(eachOrder._id)} type="button" className="btn btn-sm btn-rounded btn-info  mt-1">
                                                 Accepted order
                                             </button>
                                        }
                                        
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
        </div>
    );
};

export default MyBuyers;