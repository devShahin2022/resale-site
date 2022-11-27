import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContextInfo } from '../../../authContext/AuthContext';
import {
    MDBModal,
    MDBModalDialog,
    MDBModalContent,
    MDBModalBody,
    MDBSpinner ,
} from 'mdb-react-ui-kit';
const Swal = require('sweetalert2');


const AddProd = () => {

    // auth context
    const {user, logOut, role} = useContext(AuthContextInfo);

    // navigate
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


    // all category fake data
    const allCategory = [
        {
            name : 'Symphony'
        },
        {
            name : 'Nokia'
        },
        {
            name : 'Samsung'
        },
        {
            name : 'Symphony'
        },
        {
            name : 'Symphony'
        },
        {
            name : 'Symphony'
        },
        {
            name : 'Symphony'
        }
    ];


    // this state for loading animation
    const [staticModal, setStaticModal] = useState(false);
    const [uploadSuccess, setUploadSuccess] = useState(false);
    const toggleShow = () => setStaticModal(!staticModal);


    // handle add product
    const handleAddProduct = (e) => {
        e.preventDefault();
        toggleShow();
        
        const formData = new FormData();

        const form = e.target;
        const brandName = form.brand.value;
        const phoneModel = form.model.value;
        const phoneCondition = form.condtion.value;
        const brandNewPrice = form.brandNewPrice.value;
        const resalePrice = form.resalePrice.value;
        const phoneUsed = form.used.value;
        const location = form.location.value;
        const number = form.number.value;
        const desc = form.desc.value;
        const file = form.file.files[0];

        // extra field store to db
        const advirtised = false;
        const userEmail = user.email;
        const uploadedTime = Date.now(); // give miliseconds
        const status = 'available'; // available , sold, booked, disabled

        if(userEmail && role === 'seller'){ //user role diye dite hobe
            if(
                brandName !== '' && phoneModel !== '' && phoneCondition !== '' &&
                brandNewPrice !== '' && resalePrice !== '' && phoneUsed !== '' &&
                location !== '' && number !== '' && desc !== '' && file !== ''
            ){
                if(file){
                    const url = `https://api.imgbb.com/1/upload?expiration=600&key=4a3bb29092c702c35c37b163232f9257`;
                    formData.append('image', file);
                     fetch(url, {
                        method : 'POST',
                        body : formData
                    
                    })
                    .then ( res => res.json())
                    .then(  data => {
                        if(data.success){
                            const ImgUrl = data.data.url;
                            if(ImgUrl){
                                // here our we will upload data on server
                                // make a data object
                                const uploadProductData = {
                                    brandName,phoneModel,phoneCondition,
                                    brandNewPrice,resalePrice,phoneUsed,
                                    location,number,desc,ImgUrl,userEmail,
                                    uploadedTime,advirtised, status
                                }

                                fetch('http://localhost:5000/add-product',{
                                    method : 'POST',
                                    headers : {
                                        'content-type':'application/json'
                                    },
                                    body : JSON.stringify({uploadProductData})
                                })
                                .then(res => res.json())
                                .then(data => {
                                    if(data.acknowledged){
                                        form.reset();
                                        setUploadSuccess(true);
                                        Toast.fire({
                                            icon: 'success',
                                            title: 'success fully data insert'
                                        });
                                    }else{
                                        Toast.fire({
                                            icon: 'error',
                                            title: 'fail! data not insert'
                                        });
                                    }
                                })
                                .catch(error => {
                                    setUploadSuccess(true);
                                    console.log(error);
                                })
                            }
                        }else{
                            setUploadSuccess(true);
                            Toast.fire({
                                icon: 'error',
                                title: 'Please input valid file (jpg, png, pdf, gif) upto 32mb'
                            });
                        }
                    })
                    .catch(error => {
                        setUploadSuccess(true);
                        Toast.fire({
                            icon: 'info',
                            title: 'img not upload'
                        });
                    });
                }
            }else{
                setUploadSuccess(true);
                Toast.fire({
                    icon: 'error',
                    title: 'All field are requird'
                });
            }
        }else{
            setUploadSuccess(true);
            logOut()
            .then (res => {
                navigate('/login');
            }) 
        }
    }


// this section for loading animation
if(uploadSuccess){
    setUploadSuccess(false);
    toggleShow();
    navigate('/dashboard/my-products');
}


    return (
        <div className='my-3'>
            <h1 className='mb-4'>Add a product to sell</h1>
            <p className='text-danger'>You are not varified person . Verifed person encourge to buyer perchase a product <button className='btn btn-secondary btn-sm'>Verify now</button></p>
            <form onSubmit={handleAddProduct}>
                <div className='row'>
                    <div className='col-md-6 mb-3'>
                        <span className='fw-bold'>Select brand name </span>
                        <select required name='brand' className='form-control' id="">
                        <option value=''>Select one</option>
                            {
                                allCategory?.map(brand => (
                                    <option value={brand.name}>{brand.name}</option>
                                ))
                            }
                        </select>
                        <span>Not found my require brand</span>
                        <button className='btn btn-sm btn-secondary mt-2'>Message to admin</button>
                    </div>
                    <div className='col-md-6 mb-3'>
                        <span className='fw-bold'>Phone Model</span>
                        <input  required  name='model' type="text" className='form-control' />
                    </div>
                    <div className='col-md-6 mb-3'>
                            <span className='fw-bold'>Phone condition</span>
                            <select  required  name='condtion' className='w-100 form-control'>
                                <option value=''>Select one</option>
                                <option value='Excellent'>Excellent</option>
                                <option value='Good'>Good</option>
                                <option value='Fair one'>Fair one</option>
                            </select>
                    </div>
                    <div className='col-md-6 mb-3'>
                            <span className='fw-bold'>Brand new price</span>
                            <input  required  name='brandNewPrice' min={1} type="number" className='form-control' />
                    </div>
                    <div className='col-md-6 mb-3'>
                            <span className='fw-bold'>Resale price</span>
                            <input  required  name='resalePrice' min={0} type="number" className='form-control' />
                    </div>
                    <div className='col-md-6 mb-3'>
                            <span className='fw-bold'>Used details</span>
                            <select  required  name='used' className='form-control w-100'>
                                <option value=''>Select one</option>
                                <option value='Less than 1 weak'>Less than 1 weak</option>
                                <option value='Less than 1 month'>Less than 1 month</option>
                                <option value='Less than 3 month'>Less than 3 month</option>
                                <option value='Less than 6 month'>Less than 6 month</option>
                                <option value='Less than 1 year'>Less than 1 year</option>
                                <option value='Less than 2 year'>Less than 2 year</option>
                                <option value='Less than 4 year'>Less than 4 year</option>
                                <option value='Less than 6 year'>Less than 6 year</option>
                                <option value='Less than 10 year'>Less than 10 year</option>
                            </select>
                    </div>
                    <div className='col-md-6 mb-3'>
                            <span className='fw-bold'>Location</span>
                            <input  required  name='location' min={0} type="text" className='form-control' />
                    </div>
                    <div className='col-md-6 mb-3'>
                            <span className='fw-bold'>Phone number</span>
                            <input  required  name='number' min={0} type="number" className='form-control' />
                    </div>
                    <div className='col-md-12 mb-3'>
                            <span className='fw-bold'>Description</span>
                            <textarea  required  className='w-100' name="desc" id=""  rows="5"></textarea>
                    </div>
                    <div className='col-md-12 mb-3'>
                            <span className='fw-bold'>Add photo</span>
                            <input  required  name='file' type="file" className='form-control' />
                    </div>
                </div>
                <div className="form-check mb-3">
                    <input checked  required  className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                    <label className="form-check-label" htmlFor="flexCheckDefault">Admin have rights to delete your product</label>
                </div>
                <div className='d-flex justify-content-end'>
                    <button className='btn btn-primary mt-5 mb-4' type='submit'> Upload product </button>
                </div>
            </form>


        {/* Loading modal */}
            <MDBModal staticBackdrop tabIndex='-1' show={staticModal} setShow={setStaticModal}>
            <MDBModalDialog>
                <MDBModalContent>
                <MDBModalBody>
                    <p className='text-center mt-4 mb-2'>Please wait a moment</p>
                    <div className='text-center'>
                        <MDBSpinner className='mb-4' role='status'>
                            <span className='visually-hidden'>Loading...</span>
                        </MDBSpinner>
                    </div>
                </MDBModalBody>
                </MDBModalContent>
            </MDBModalDialog>
            </MDBModal>
        {/* Loading modal end*/}
        </div>
    );
};


export default AddProd;