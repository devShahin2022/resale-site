import React, { useContext, useEffect, useState } from 'react';
import { AuthContextInfo } from '../../authContext/AuthContext';
import Footer from '../../components/Footer/Footer';
import NavBar from '../../components/NavBar/NavBar';
import { useNavigate } from 'react-router-dom';
import {
    MDBModal,
    MDBModalDialog,
    MDBModalContent,
    MDBModalHeader,
    MDBModalTitle,
    MDBModalBody,
    MDBModalFooter,
} from 'mdb-react-ui-kit';
const Swal = require('sweetalert2');



const MyOrders = () => {
// state
const [orderData, setOrderData] = useState([]);
const [loading, setLoading] = useState(true);
const [reRender, setRerender] = useState(454); //just for rerender


// add booked product
const [scrollableModal, setScrollableModal] = useState(false);
const [productName, setProductName] = useState();
const [productPrice, setProductPrice] = useState();
const [MeetingLocation,setMeetingLocation] = useState('');
const [PhoneNumber,setPhoneNumber] = useState('');
const [productId, setProductId] = useState();
const [sellsManEmail, setSellerEmail] = useState();
const [wishListProductId, setWishlistProductId] = useState();




// get context
const {role, userInfoFromDb, user, logOut} = useContext(AuthContextInfo);

const navigate = useNavigate();

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


// use effect for loading data
useEffect(() => {
    if(userInfoFromDb?.role === 'buyer'){
        const email = userInfoFromDb.email ;
        fetch('http://localhost:5000/wishlist-product',{
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





//   get targeted product info
const handleWishListProduct = (targetProd) => {
    setScrollableModal(!scrollableModal);
    setWishlistProductId(targetProd[0].prodId);
    console.log(targetProd);
    // console.log(targetProd);
    if(role === 'buyer'){
        const fullProductName = (targetProd[0].categoryInfo.name +' - '+ targetProd[0].productDetails.phoneModel) ; 
        setProductName(fullProductName);
        setProductPrice(targetProd[0].productDetails.resalePrice);
        setProductId(targetProd[0].productDetails._id);
        setSellerEmail(targetProd[0].productDetails.userEmail);
    }else{
        logOut()
        .then(res => {

        })
    }
}

// confirm booking

const confirmBooking = () => {
    if(MeetingLocation !=='' && PhoneNumber !== '' && productId !== ''){
        // save fill to database
        const buyerId =  userInfoFromDb._id;
        const buyerEmail =  userInfoFromDb.email;
        const prodId = productId;
        const bookedDate = Date.now();
        // by default 
        const paymentStatus = false;
        const orderStatus = "pending";
        const sellerEmail = sellsManEmail;
        const  bookedInformation = {
            buyerId, buyerEmail, prodId, bookedDate ,paymentStatus, orderStatus,sellerEmail
        }

        // store data to database 
        fetch('http://localhost:5000/store-booked-data',{
            method : "POST",
            headers : {
                'content-type' : 'application/json'
            },
            body : JSON.stringify({bookedInformation})
        })
        .then(res => res.json())
        .then(result => {
            console.log(result);
            if(result.acknowledged && result.modifiedCount > 0){
                const id = wishListProductId;
                console.log(wishListProductId);
                fetch(`http://localhost:5000/cancel-wishlist-product`,{
                    method : 'DELETE',
                    headers : {
                        'content-type' : 'application/json'
                    },
                    body : JSON.stringify({id})
                })
                .then(res => res.json())
                .then(dataRes => {
                    if(dataRes.acknowledged){
                        navigate('/my-orders') //navigate my order page
                        Toast.fire({
                            icon: 'success',
                            title: 'booked cofirm! please check my orders page'
                        });
                        
                    }
                })
                setScrollableModal(!scrollableModal);
            }
        })
    }else {
        Toast.fire({
            icon: 'error',
            title: 'Please fill the form correctly'
        });
    }
}







// cancel wishlist product
const cancelWishListProduct = (id) => {
    if(role === 'buyer') {
        Swal.fire({
          title: 'Are you sure to remove?',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          cancelButtonText: "Don't remove",
          confirmButtonText: 'Yes, remove it!'
        }).then((result) => {
          if (result.isConfirmed) {

              fetch('http://localhost:5000/cancel-wishlist-product',{
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
              'Removed',
              'Wishlist product remove',
              'success'
            )
            setRerender(Date.now());
          }
         
        })
  }
}

// booked product from wishlist page




    return (
        <div>
            <NavBar></NavBar>
            <div className='container'>
                <h1 className='text-center my-4 mb-5' >My Wishlist page</h1>


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
                    <table  className="table align-middle mb-0 bg-white text-dark">
                    <thead className="bg-secondary">
                        <tr>
                            <th>Product</th>
                            <th>Contact with seller</th>
                            <th>Time</th>
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
                                        <button onClick={()=> cancelWishListProduct(eachOrder.prodId)} type="button " className="me-1 btn btn-sm btn-danger btn-rounded">
                                           Remove
                                        </button>
                                        <button type="button" className="me-1 btn btn-sm btn-rounded btn-primary  mt-1">
                                            Pay now
                                        </button>
                                        <button onClick={ () => handleWishListProduct(orderData) } type="button" className="me-1 btn btn-sm btn-rounded btn-info  mt-1">
                                            Book now
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





            <MDBModal show={scrollableModal} setShow={setScrollableModal} tabIndex='-1'>
  <MDBModalDialog scrollable size='lg'>
    <MDBModalContent>
      <MDBModalHeader>
        <MDBModalTitle>Booking product</MDBModalTitle>
        <button
          className='btn-close'
          color='none'
          onClick={() => setScrollableModal(!scrollableModal)}
        ></button>
      </MDBModalHeader>
      <MDBModalBody>

      <div className='row'>
            <div className='col-md-6 mt-3' >
                <span>Your Name</span>
                <input readOnly type="text" defaultValue={user.displayName} disabled className='form-control bg-secondary text-dark' />
            </div>
            <div className='col-md-6 mt-3' >
                <span>Your eamil</span>
                <input readOnly type="text" defaultValue={user.email} disabled className='form-control bg-secondary text-dark' />
            </div>
            <div className='col-md-6 mt-3' >
                <span>Product name</span>
                <input defaultValue={productName} readOnly type="text" disabled className='form-control bg-secondary text-dark' />
            </div>
            <div className='col-md-6 mt-3' >
                <span>Product price</span>
                <input defaultValue={productPrice}  readOnly type="text" disabled className='form-control bg-secondary text-dark' />
            </div>
            <div className='col-md-6 mt-3' >
                <span>Meeting point</span>
                <input defaultValue={MeetingLocation}  onChange={(e) => setMeetingLocation(e.target.value)} autoFocus type="text" className='form-control' />
            </div>
            <div className='col-md-6 mt-3' >
                <span>Your phone number</span>
                <input  defaultValue={PhoneNumber} onChange={(e) => setPhoneNumber(e.target.value)}  type="number" className='form-control' />
            </div>
            
       </div>
       
      </MDBModalBody>
      <MDBModalFooter>
        <button className='btn btn-danger' color='secondary' onClick={() => { setScrollableModal(!setScrollableModal)}}>
          Close
        </button>
        <button onClick={confirmBooking} className='btn btn-primary'>Confirm booking</button>
      </MDBModalFooter>
    </MDBModalContent>
  </MDBModalDialog>
</MDBModal>







        </div>
    );
};

export default MyOrders;