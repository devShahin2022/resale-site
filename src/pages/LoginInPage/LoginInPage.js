import React, { useContext } from 'react';
import {
    MDBRow,
    MDBCol,
    MDBInput,
    MDBCheckbox,
    MDBIcon
  } from 'mdb-react-ui-kit';
import NavBar from '../../components/NavBar/NavBar';
import { Link, useNavigate } from 'react-router-dom';
import Footer from '../../components/Footer/Footer';
import { AuthContextInfo } from '../../authContext/AuthContext';
import { GithubAuthProvider, GoogleAuthProvider } from 'firebase/auth';
import Swal from 'sweetalert2';

const LoginInPage = () => {
    const {providerLogin, signIn} = useContext(AuthContextInfo);
    const navigate = useNavigate();
// tostify
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

    // data save to database
    const saveRegisDataDb = (user, role) => {
      const userData = {
          name : user.name,
          email : user.email,
          role : role,
          status : true,
          isVerified : user.emailVerified
      }
      
      fetch('http://localhost:5000/add-user',{
              method : 'POST',
              headers : {
                  'content-type' : 'application/json'
              },
              body : JSON.stringify({userData})
          })
          .then(res => res.json())
          .then(data => {
              console.log(data);
          })
          .catch(error => {
              console.log(error);
          })

      return ;
    }
  


    // provider login
    // google provider login
    const googleProvider = new GoogleAuthProvider();
    const handleGoogleLogin = () => {
        providerLogin(googleProvider)
        .then(result => {
            Toast.fire({
              icon: 'success',
              title: 'Login success'
            });
            saveRegisDataDb(result.user, 'buyer');
            navigate("/home");
        })
        .catch(error => {
          Toast.fire({
            icon: 'error',
            title: 'Login error'
          });
        });
    }

    //  git hub login
    const gitHubProvider = new GithubAuthProvider();
    const handleGitHubLogin = () => {
      providerLogin(gitHubProvider)
      .then(result => {
        console.log(result);
          Toast.fire({
            icon: 'success',
            title: 'Login success'
          });
          saveRegisDataDb(result.user, 'buyer');
          navigate("/home");
      })
      .catch(error => {
        console.log('error code', error.code);
        console.log('error message', error.message);
        if( error.code === 'auth/account-exists-with-different-credential'){
          Toast.fire({
            icon: 'error',
            title: 'Fail! email already exits'
          });
        }else{
          Toast.fire({
            icon: 'error',
            title: 'Unknown error'
          });
        }
        
      });
    }
   
    // email/password login
    const handleEmailLogin = e => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        if(email === '' || password ===''){
          Toast.fire({
            icon: 'info',
            title: 'email or password required'
          });
        }else{
          signIn(email, password)
          .then(res => {
            Toast.fire({
              icon: 'success',
              title: 'login success'
            });
            navigate("/home");
          })
          .catch(error => {
            if( error.code ==="auth/user-not-found"){
              Toast.fire({
                icon: 'error',
                title: 'Account not exits'
              });
            }else{
              Toast.fire({
                icon: 'error',
                title: 'Unknown error'
              });
            }
          })
        }
    }
    return (
        <>
        <NavBar></NavBar>
        {/* <button  onClick={handleGoogleLogin}>google</button> */}
        <div className='container-fluid'>
            <form onSubmit={handleEmailLogin} className='m-auto bg-white p-3 py-5 rounded-4 my-5 shadow-5-strong' style={{"max-width":"360px"}}>
            <div className='text-center mb-3'>
              <p>Log in with:</p>

              <button onClick={handleGoogleLogin} style={{"width":"36px","height":"36px"}} className='p-0 mx-1 btn btn-primary rounded-circle '>
                <MDBIcon fab icon='google' />
              </button>
              <button onClick={handleGitHubLogin} style={{"width":"36px","height":"36px"}} className='p-0 mx-1 btn btn-primary rounded-circle '>
                <MDBIcon fab icon='github' />
              </button>
            </div>

            <p className='text-center'>or:</p>

            <MDBInput required name='email' className='mb-4' type='email' id='form7Example1' label='Email address' />
            <MDBInput required name='password' className='mb-4' type='password' id='form7Example2' label='Password' />

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