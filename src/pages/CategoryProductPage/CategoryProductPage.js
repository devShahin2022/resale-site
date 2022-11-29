import React, {useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Footer from '../../components/Footer/Footer';
import NavBar from '../../components/NavBar/NavBar';
import { AuthContextInfo } from '../../authContext/AuthContext';
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

const CategoryProductPage = () => {

    // loader data
    const [scrollableModal, setScrollableModal] = useState(false);
    const [productName, setProductName] = useState();
    const [productPrice, setProductPrice] = useState();
    const [MeetingLocation,setMeetingLocation] = useState('');
    const [PhoneNumber,setPhoneNumber] = useState('');
    const [productId, setProductId] = useState();
    const [productCat, setProductCat] = useState();
    const [brand, setBrand] = useState([]);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);


    const {user,logOut, role, userInfoFromDb} = useContext(AuthContextInfo);

    // get params from url
    const params = useParams();
    const catId = params.id;

    // useeffect for fetchind data from db
    useEffect(()=>{
        fetch(`http://localhost:5000/getdata-by-brand?id=${catId}`)
        .then(res => res.json())
        .then(availableProduct => {
            if(availableProduct){
                setData(availableProduct);
                // fetch brand name
                if(availableProduct[0]?.brandId){
                        setProductCat(data[0]?.brandId);
                        fetch(`http://localhost:5000/single-cat-name?id=${availableProduct[0]?.brandId}`)
                        .then(res => res.json())
                        .then(brandData => {
                            setBrand(brandData);
                            setLoading(false);
                    })
                }
            }else{
                setData([]);
                setLoading(false);
            }
        })
        setLoading(false);
    },[catId, data]);

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

//   get targeted product info
const handleBookedProduct = (targetProd) => {
    setScrollableModal(!scrollableModal);
    if(role === 'buyer'){
        const fullProductName = (brand[0].name +' - '+ targetProd.phoneModel) ; 
        setProductName(fullProductName);
        setProductPrice(targetProd.resalePrice);
        setProductId(targetProd._id);
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
        const sellerEmail = data.userEmail;
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
            // console.log(result);
            if(result.acknowledged && result.modifiedCount > 0){
                Toast.fire({
                    icon: 'success',
                    title: 'booked cofirm! please check my orders page'
                });
                fetch(`http://localhost:5000/getdata-by-brand?id=${productCat}`)
                .then(againCall => againCall.json())
                .then(againCallData => {
                    // console.log( 'Data for again call ', againCallData);
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



// Wishlist functionality

const handleWishListProduct = (targetProd, i) => {

    const wishlistBtn = document.getElementsByClassName('wishListAnimation');

    wishlistBtn[i].innerHTML = `<div class="spinner-grow" role="status">
                                     <span class="visually-hidden">Loading...</span>
                                 </div> ` ;
    wishlistBtn[i].disabled = true;


    if(role === 'buyer'){
        // save fill to database
        const buyerId =  userInfoFromDb._id;
        const buyerEmail =  userInfoFromDb.email;
        const prodId = targetProd._id;
        const bookedDate = Date.now();

        // by default 
        const sellerEmail = data.userEmail;

        const  wishListProductInfo = {
            buyerId, buyerEmail, prodId, bookedDate ,sellerEmail
        }

        // place to database
        fetch('http://localhost:5000/store-wishlist-data',{
            method : "POST",
            headers : {
                'content-type' : 'application/json'
            },
            body : JSON.stringify({wishListProductInfo})
        })
        .then(res => res.json())
        .then(result => {
            if(result.status){
                // for animation
                console.log(i);
                    wishlistBtn[i].innerHTML = `Added` ;
                    wishlistBtn[i].disabled = false;
                Toast.fire({
                    icon: 'success',
                    title: 'Success! product added wishlist'
                });
            }else{
                // console.log(wishlistBtn[i].innerHTML = '');
                // for animation
                wishlistBtn[i].innerHTML = 'Added' ;
                console.log(wishlistBtn[i].innerText);
                wishlistBtn[i].disabled = false;
                Toast.fire({
                    icon: 'error',
                    title: 'Product exist your wishlist'
                });
            }
        });

    }else{
        logOut()
        .then(res => {

        })
    }
}



    return (
        <>
            <NavBar></NavBar>
            <div className='container'>
                <h1 className='text-center my-4 mb-5'>Product for <span className='text-primary'>{ brand[0]?.name }</span>  brand</h1>

                <>
                    {
                        loading ? 
                        <>
                            <h4>Please wait ! data loading</h4>
                        </>
                        :
                        <>
                            {
                        data?.length > 0 ?
                        <>
                        <div className='row'>
                        
                            <>
                                {
                                    data?.map((d, i) => 
                                    <div className='col-md-4'>
                                        <div key={d._id} className="card border border-1 pb-2 mb-5">
                                            <img src={d.ImgUrl} className="card-img-top img-fluid w-100" alt=""/>
                                            <div className="p-1 mt-2">
                                                <h5 className="card-title">{brand[0]?.name + ' - '+  d.phoneModel}</h5>
                                                
                                                <div className='d-flex justify-content-between mt-2 flex-wrap'>
                                                    <p className=''>New price :<span className='fw-bold'>{d.brandNewPrice}</span>tk </p>
                                                    <p className=''>Resale price :<span className='fw-bold'>{d.resalePrice}</span>tk </p>
                                                </div>
                                                <div className='d-flex justify-content-between mt-2 flex-wrap'>
                                                <p className='fs-6 '>
                                                    {
                                                        d.isVerified ? 
                                                        <>
                                                            <small className='badge badge-success fs-6 pb-0'>Varified <span className='fw-bold'><i className="fas fa-check-double text-success"></i></span> </small>
                                                        </>
                                                        :
                                                        <>
                                                            <small className='badge badge-danger fs-6 pb-0'>Unknown <span className='fw-bold'><i className="fas fa-check-double text-muted"></i></span> </small>
                                                        </>
                                                    }
                                                    {/* here will be show time  */}
                                                </p>



                                                    <p className='badge badge-info py-2 px-3 fs-6'>
                                                        <i className="far fa-clock"></i>
                                                    { 
                                                        ((Date.now()  - d.uploadedTime) / 1000) < 15 && 
                                                        <>
                                                            <small>just now</small>
                                                        </>
                                                    }
                                                    { 
                                                        ((Date.now()  - d.uploadedTime) / 1000) < 60 && (parseInt(((Date.now()  - d.uploadedTime) / 1000)) > 14) &&
                                                        <>
                                                            <small>{ parseInt(((Date.now()  - d.uploadedTime) / 1000))}s ago</small>
                                                        </>
                                                    }
                                                    { 
                                                        (( Date.now()  - d.uploadedTime) / (1000*60)) < 60 && (parseInt((( Date.now()  - d.uploadedTime) / (1000*60))) > 0) &&
                                                        <>
                                                            <small>{ parseInt((( Date.now()  - d.uploadedTime) / (1000*60)))}m ago</small>
                                                        </>
                                                    } 
                                                    { 
                                                        (( Date.now()  - d.uploadedTime ) / (1000*60*60)) < 24 && (parseInt((( Date.now()  - d.uploadedTime ) / (1000*60*60))) > 0) &&
                                                        <>
                                                            <small>{ parseInt((( Date.now()  - d.uploadedTime ) / (1000*60*60)))}h ago</small>
                                                        </>
                                                    }
                                                    { 
                                                    ( ((Date.now()  - d.uploadedTime) / (1000*60*60*24)) < 30) && (parseInt(((Date.now()  - d.uploadedTime) / (1000*60*60*24))) > 0 ) &&
                                                        <>
                                                            <small>{ parseInt(((Date.now()  - d.uploadedTime) / (1000*60*60*24)))}d ago</small>
                                                        </>
                                                    }
                                                    { 
                                                        (((Date.now()  - d.uploadedTime) / (1000*60*60*24*30)) < 12) && ( parseInt(((Date.now()  - d.uploadedTime) / (1000*60*60*30))) > 0) &&
                                                        <>
                                                            <small>{ parseInt(((Date.now()  - d.uploadedTime) / (1000*60*60*30)))}m ago</small>
                                                        </>
                                                    }
                                                    { 
                                                        ((Date.now()  - d.uploadedTime) / (1000*60*60*24*30*12)) && (parseInt(((Date.now()  - d.uploadedTime) / (1000*60*60*24*30*12))) > 0 ) &&
                                                        <>
                                                            <small>{ parseFloat(((Date.now()  - d.uploadedTime) / (1000*60*60*24*30*12))).toFixed(1)}y ago</small>
                                                        </>
                                                    }
                                                </p>  
                                                </div>
                                                <div className="d-flex justify-content-between flex-wrap">
                                                    <p className='mt-1 lead muted'>
                                                        <small>Phone : {d.number}</small>
                                                    </p>
                                                    <p className='mt-1 lead muted'>
                                                        <small>used : {d.phoneUsed}</small>
                                                    </p>
                                                </div>
                                                <div className='d-flex justify-content-between mt-2 flex-wrap'>
                                                    <div className='d-flex'>
                                                        <button title='See details' className="btn btn-sm btn-secondary me-2"><i className="far fa-eye"></i></button>
                                                        <button onClick={()=>handleWishListProduct(d, i)} title='add to wishlist' className="btn btn-sm btn-secondary wishListAnimation">
                                                            <i className="far fa-heart"></i>
                                                        </button>
                                                    </div>
                                                    <button onClick={()=>handleBookedProduct(d)} className="btn btn-sm btn-primary">Book now</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    )
                                }
                            </>
                        
                         </div>
                        </>
                        :
                        <>
                            <h2>No available product found</h2>
                        </>
                    }
                        </>
                    }
                </>
            </div>

            <Footer></Footer>


{/* Modal */}

{/* <button onClick={() => setScrollableModal(!scrollableModal)}>LAUNCH DEMO MODAL</button> */}

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

        </>
    );
};

export default CategoryProductPage;