import React, { useState } from 'react';
import {
    MDBInput,
    MDBCheckbox,
    MDBBtn,
    MDBIcon
  } from 'mdb-react-ui-kit';
import { Link } from 'react-router-dom';
import NavBar from '../../components/NavBar/NavBar';
import './RegisterPage.css';
import Footer from '../../components/Footer/Footer';


const RegisterPage = () => {
    const [isActiveSeller, setIsActiveSeller] = useState(false);
    const [isActiveBuyer, setIsActiveBuyer] = useState(false);
    return (
        <>
            <NavBar></NavBar>
            <div className='container-fluid'>
                <form className='m-auto bg-white p-3 py-5 rounded-4 my-5 shadow-5-strong' style={{"max-width":"380px"}}>
                <div className='text-center mb-3'>
                <p>Register with:</p>

                <MDBBtn floating className='mx-1'>
                    <MDBIcon fab icon='facebook-f' />
                </MDBBtn>

                <MDBBtn floating className='mx-1'>
                    <MDBIcon fab icon='google' />
                </MDBBtn>

                <MDBBtn floating className='mx-1'>
                    <MDBIcon fab icon='github' />
                </MDBBtn>
                </div>

                <p className='text-center'>or:</p>
                <span className='fw-bold'>Select an account type</span>
                <div className='d-flex justify-content-between mb-4'>
                    <label onClick={() => {setIsActiveSeller(!isActiveSeller); setIsActiveBuyer(false) }} style={{"width":"47%"}} className={`acc-type border border-primary rounded-2 px-2 py-2 text-center my-2 ${isActiveSeller && ' bg-primary text-white'}`} htmlFor="seller">As a Seller</label>
                    <input style={{"transform" : "scale(0)"}} className='' name='account-type' id='seller' type="radio" />
                    <label  onClick={() => {setIsActiveBuyer(!isActiveBuyer); setIsActiveSeller(false) }}  style={{"width":"47%"}} className={`acc-type border border-primary rounded-2 px-2 py-2 text-center my-2 ${isActiveBuyer && ' bg-primary text-white'}`} htmlFor="buyer"> As a Buyer</label>
                    <input style={{"transform" : "scale(0)"}}  className='' name='account-type' id='buyer' type="radio" />
                </div>
                <MDBInput className='mb-4' id='form8Example1' label='Name' />
                <MDBInput className='mb-4' type='email' id='form8Example3' label='Email address' />
                <MDBInput className='mb-4' type='password' id='form8Example4' label='Password' />
                <p className='mb-2 fw-bold'>Choose profile image</p>
                <input type="file" className='from-control bordered mb-4' />
                <MDBCheckbox
                wrapperClass='d-flex justify-content-center mb-4'
                id='form8Example6'
                label='I have read and agree to the terms'
                defaultChecked
                />

                <MDBBtn type='submit' className='mb-4' block>
                Register free
                </MDBBtn>
                <div className='text-center'>
                <p>
                Already have account? <Link to='/login'>Login</Link>
                </p>
                </div>
            </form>
            </div>
            <Footer></Footer>
        </>
    );
};

export default RegisterPage;