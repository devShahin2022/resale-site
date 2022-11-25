import React from 'react';
import {
    MDBRow,
    MDBCol,
    MDBInput,
    MDBCheckbox,
    MDBBtn,
    MDBIcon
  } from 'mdb-react-ui-kit';
import NavBar from '../../components/NavBar/NavBar';
import { Link } from 'react-router-dom';
import Footer from '../../components/Footer/Footer';

const LoginInPage = () => {
    return (
        <>
        <NavBar></NavBar>
        <div className='container-fluid'>
            <form className='m-auto bg-white p-3 py-5 rounded-4 my-5 shadow-5-strong' style={{"max-width":"360px"}}>
            <div className='text-center mb-3'>
              <p>Log in with:</p>

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

            <MDBInput className='mb-4' type='email' id='form7Example1' label='Email address' />
            <MDBInput className='mb-4' type='password' id='form7Example2' label='Password' />

            <MDBRow className='mb-4'>
              <MDBCol className='d-flex justify-content-center'>
                <MDBCheckbox id='form7Example3' label='Remember me' defaultChecked />
              </MDBCol>
              <MDBCol>
                <a href='#!'>Forgot password?</a>
              </MDBCol>
            </MDBRow>

            <MDBBtn type='submit' className='mb-4' block>
              Log in
            </MDBBtn>

            <div className='text-center'>
              <p>
                Don't have account? <Link to='/register'>Register</Link>
              </p>
            </div>
          </form>
        </div>
        <Footer></Footer>
        </>
    );
};

export default LoginInPage;