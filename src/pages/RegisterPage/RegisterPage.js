import React, { useContext, useState } from 'react';
import {
    MDBInput,
    MDBCheckbox,
    MDBIcon,
    MDBModal,
    MDBModalDialog,
    MDBModalContent,
    MDBModalBody,
    MDBSpinner ,
  } from 'mdb-react-ui-kit';
import { Link, useNavigate } from 'react-router-dom';
import NavBar from '../../components/NavBar/NavBar';
import './RegisterPage.css';
import Footer from '../../components/Footer/Footer';
import { AuthContextInfo } from '../../authContext/AuthContext';
import Swal from 'sweetalert2'
import { GithubAuthProvider, GoogleAuthProvider } from 'firebase/auth';


const RegisterPage = () => {
    const [isActiveSeller, setIsActiveSeller] = useState(false);
    const [isActiveBuyer, setIsActiveBuyer] = useState(false);

    // this state for loading animation
    const [staticModal, setStaticModal] = useState(false);
    const [uploadSuccess, setUploadSuccess] = useState(false);
    const toggleShow = () => setStaticModal(!staticModal);


    // get auth information
    const {providerLogin, createUser, addProfileNameAndImg, manageRole} = useContext(AuthContextInfo);
    

    const navigate = useNavigate();

    // tosatify
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

    // data save into db 
      const saveRegisDataDb = (user, role) => {
        const userData = {
            name : user.displayName,
            photo : user.photoURL,
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
                // console.log(data);
            })
            .catch(error => {
                console.log(error);
            })

        return ;
      }
      // provider login
    // google provider login
    const googleProvider = new GoogleAuthProvider();
    const handleGoogleLoginR = () => {
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
            console.log(error);
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
        saveRegisDataDb(result.user, 'buyer');
          Toast.fire({
            icon: 'success',
            title: 'Login success'
          });
          navigate("/home");
      })
      .catch(error => {
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
    // create a new account
    // default img url
    let profileImageLink = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmPMqmhCs3WJiUvLOkJnw_Ol4RYS2kV3YTjQ&usqp=CAU';
    const formData = new FormData();
    const createAccount = async (e) => {
        e.preventDefault();
        toggleShow();

        const form = e.target;
        const name = form.fullname.value;
        const email = form.email.value;
        const password = form.password.value;
        const accountType = form.accountType.value;
        const profileImage = form.file.files[0];
        if(name ==='' || email === '' || password === '' || accountType === ''){
            Toast.fire({
                icon: 'info',
                title: 'Every field are required'
            });
        }else if(password.length < 6){
            Toast.fire({
                icon: 'info',
                title: 'Minimum password length 6 we accept'
            });
        }else{
            if(profileImage){
                const url = `https://api.imgbb.com/1/upload?expiration=600&key=4a3bb29092c702c35c37b163232f9257`;
                formData.append('image', profileImage);
                await fetch(url, {
                    method : 'POST',
                    body : formData
                
                })
                .then (async res => res.json())
                .then( async data => {
                    if(data.success){
                        const ImgUrl =await data.data.url;
                        profileImageLink = ImgUrl;
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
            // here all requiement and sign
            // first signup with email and password
            await createUser(email, password)
            .then(data => {
                // console.log(data.user);
                // here updata profile images
                addProfileNameAndImg(name, profileImageLink)
                .then(res => {
                    setUploadSuccess(true);
                    Toast.fire({
                        icon: 'success',
                        title: 'Account create success'
                    });
                    saveRegisDataDb(data.user, accountType);
                    manageRole(accountType);
                    navigate('/home');
                })
                .catch(error => {
                    setUploadSuccess(true);
                    Toast.fire({
                        icon: 'error',
                        title: error.code
                    });
                    navigate('/home');
                })
            })
            .catch(error => {
                if(error.code === 'auth/email-already-in-use'){
                    setUploadSuccess(true);
                    Toast.fire({
                        icon: 'error',
                        title: 'Email already used'
                    });
                }else if( error.code ==='auth/weak-password'){
                    setUploadSuccess(true);
                    Toast.fire({
                        icon: 'error',
                        title: 'Please give a strong a password minimum 6 character'
                    });
                }else{
                    setUploadSuccess(true);
                    Toast.fire({
                        icon: 'error',
                        title: error.code
                    });
                }
            });
        }
    }

    // this section for loading animation
if(uploadSuccess){
    setUploadSuccess(false);
    toggleShow();
}


    return (
        <>
            <NavBar></NavBar>
            <div className='container-fluid'>
                <form onSubmit={createAccount} className='m-auto bg-white p-3 py-5 rounded-4 my-5 shadow-5-strong' style={{"maxWidth":"380px"}}>
                <div className='text-center mb-3'>
                <p>Register with:</p>

                <button onClick={handleGoogleLoginR} style={{"width":"36px","height":"36px"}} className='p-0 mx-1 btn btn-primary rounded-circle '>
                <MDBIcon fab icon='google' />
              </button>
              <button onClick={handleGitHubLogin} style={{"width":"36px","height":"36px"}} className='p-0 mx-1 btn btn-primary rounded-circle '>
                <MDBIcon fab icon='github' />
              </button>
                </div>

                <p className='text-center'>or:</p>
                <span className='fw-bold'>Select an account type</span>
                <div className='d-flex justify-content-between mb-4'>
                    <label  onClick={() => {setIsActiveSeller(!isActiveSeller); setIsActiveBuyer(false) }} style={{"width":"47%"}} className={`acc-type border border-primary rounded-2 px-2 py-2 text-center my-2 ${isActiveSeller && ' bg-primary text-white'}`} htmlFor="seller">As a Seller</label>
                    <input required defaultValue='seller' style={{"transform" : "scale(0)"}} className='' name='accountType' id='seller' type="radio" />
                    <label  onClick={() => {setIsActiveBuyer(!isActiveBuyer); setIsActiveSeller(false) }}  style={{"width":"47%"}} className={`acc-type border border-primary rounded-2 px-2 py-2 text-center my-2 ${isActiveBuyer && ' bg-primary text-white'}`} htmlFor="buyer"> As a Buyer</label>
                    <input required defaultValue='buyer' style={{"transform" : "scale(0)"}}  className='' name='accountType' id='buyer' type="radio" />
                </div>
                <MDBInput required name='fullname' className='mb-4' id='form8Example1' label='Name' />
                <MDBInput required name='email' className='mb-4' type='email' id='form8Example3' label='Email address' />
                <MDBInput required name='password' className='mb-4' type='password' id='form8Example4' label='Password' />
                <p className='mb-2 fw-bold'>Choose profile image (optional)</p>
                <input name='file' type="file" className='from-control bordered mb-4' />
                <MDBCheckbox
                wrapperClass='d-flex justify-content-center mb-4'
                id='form8Example6'
                label='I have read and agree to the terms'
                defaultChecked
                />

                <button type='submit' className='mb-4 btn btn-primary w-100'>
                Register free
                </button>
                <div className='text-center'>
                <p>
                Already have account? <Link to='/login'>Login</Link>
                </p>
                </div>
            </form>
            </div>
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

            <Footer></Footer>
        </>
    );
};

export default RegisterPage;