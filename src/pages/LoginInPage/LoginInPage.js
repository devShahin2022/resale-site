import React, { useContext } from 'react';
import {
    MDBRow,
    MDBCol,
    MDBInput,
    MDBCheckbox,
    MDBBtn,
    MDBIcon
  } from 'mdb-react-ui-kit';
import NavBar from '../../components/NavBar/NavBar';
import { Link, useNavigate } from 'react-router-dom';
import Footer from '../../components/Footer/Footer';
import { AuthContextInfo } from '../../authContext/AuthContext';
import { GoogleAuthProvider } from 'firebase/auth';

const LoginInPage = () => {
    const {providerLogin} = useContext(AuthContextInfo);
    const navigate = useNavigate();

    const googleProvider = new GoogleAuthProvider();
    const handleGoogleLogin = () => {
        console.log('clicked handle google login');
        providerLogin(googleProvider)
        .then(result => {
            const email = result.user.email;
            console.log('email',email);
            console.log('successfull login');
            navigate("/dashboard");
        })
        .catch(error => {
            console.log(error);
        });
    }
    const handleEmailLogin = e => {
        e.preventDefault()
    }

    return (
        <>
        <NavBar></NavBar>
        {/* <button  onClick={handleGoogleLogin}>google</button> */}
        <div className='container-fluid'>
            <form onSubmit={handleEmailLogin} className='m-auto bg-white p-3 py-5 rounded-4 my-5 shadow-5-strong' style={{"max-width":"360px"}}>
            <div className='text-center mb-3'>
              <p>Log in with:</p>

              <button style={{"width":"36px","height":"36px"}} className='p-0 mx-1 btn btn-primary rounded-circle '>
                <MDBIcon fab icon='facebook-f' />
              </button>

              <button onClick={handleGoogleLogin} style={{"width":"36px","height":"36px"}} className='p-0 mx-1 btn btn-primary rounded-circle '>
                <MDBIcon fab icon='google' />
              </button>

              <button style={{"width":"36px","height":"36px"}} className='p-0 mx-1 btn btn-primary rounded-circle '>
                <MDBIcon fab icon='github' />
              </button>
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

            <button type='submit' className='btn btn-primary w-100 mb-4' block>
              Log in
            </button>

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