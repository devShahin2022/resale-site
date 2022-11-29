import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContextInfo } from '../../../authContext/AuthContext';
import { MDBIcon } from 'mdb-react-ui-kit';
const Swal = require('sweetalert2');

const Myprod = () => {
    const [product, setProduct] = useState([]);
    const {user, role, logOut} = useContext(AuthContextInfo);
    const [loading, setLoading] = useState(true);
    // uploadedTime
    const navigate = useNavigate();
    const currentUserEmail = user.email;
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



    useEffect(()=>{
        if(role === 'seller'){
            fetch('http://localhost:5000/fetch-my-products',{
                method : 'POST',
                headers : {
                    'content-type' : 'application/json'
                },
                body : JSON.stringify({currentUserEmail})
            })
            .then(res => res.json())
            .then(data => {
                setProduct(data);
                setLoading(false);
            })
        }
        if(role === 'buyer' || role === 'admin'){
            logOut()
            .then(res => {
                navigate('/login');
            })
        }
    },[role,product,currentUserEmail]);

    const makeAdvirtised = (id) => {
        if(role === 'seller'){
            fetch('http://localhost:5000/make-advirtised', {
                method : "PUT",
                headers : {
                    "content-type" : "application/json"
                },
                body : JSON.stringify({id})
            })
            .then(res => res.json())
            .then(data => {
                if(data.acknowledged){
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'success ! product ready to advertised',
                        showConfirmButton: false,
                        timer: 1500
                      })
                }
            })
            .catch(error => {
                Toast.fire({
                    icon: 'error',
                    title: 'fail ! something wrong'
                });
            })
        }else{
            logOut()
            .then(res => {
                navigate('/login');
            })
        }
    }

    // delete product 
    const deleteProduct = (id) => {
        if(role === 'seller') {
              Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
              }).then((result) => {
                if (result.isConfirmed) {

                    fetch('http://localhost:5000/delete-product',{
                    method : 'DELETE',
                    headers : {
                        "content-type" : "application/json"
                    },
                    body : JSON.stringify({id})
                    })
                    .then(res => res.json())
                    .then(data => {
                        console.log(data)
                    })
                    .catch(error => {
                        console.log(error);
                    })
                  Swal.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                  )
                }
              })
        }
    }

    return (
        <div>
            <h1>My uploaded products ({product?.length})</h1>
            {
                loading ? 
                <>
                   <div style={{"height" : "100vh"}} className='w-100 d-flex justify-content-center align-items-center'> 
                        <div className="spinner-border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                   </div>
                </>
                :
                <>
                    {
                        product?.length> 0 ?
                        <>

        <table className="table align-middle mb-0 bg-white">
            <thead className="bg-light">
                <tr>
                <th>photo</th>
                <th>Name</th>
                <th>status</th>
                <th>resale price</th>
                <th>Uploaded at</th>
                <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {
                    product?.map(each => 
                        <>
                        <tr key={each._id}
                        
                        >
                            <td>
                                <div className="d-flex align-items-center">
                                <img
                                    src={each.ImgUrl}
                                    alt=""
                                    width="50"
                                    height = "50"
                                    />
                                </div>
                            </td>
                            <td>
                                <p className="fw-normal mb-1">{ each.brandName  }<small>{ each.phoneModel}</small></p>
                            </td>
                            <td>
                                {
                                    each.status === 'available' && <span className="badge badge-success rounded-pill d-inline">{ each.status  }</span>
                                }
                                {
                                    each.status === 'sold' && <span className="badge badge-info rounded-pill d-inline">{ each.status  }</span>
                                }
                                {
                                    each.status === 'booked' && <span className="badge badge-primary rounded-pill d-inline">{ each.status  }</span>
                                }
                                {
                                    each.status === 'disabled' && <span className="badge badge-muted rounded-pill d-inline">{ each.status  }</span>
                                }
                                
                            </td>
                            <td>{ each.resalePrice }</td>
                            <td>
                                { 
                                    ((Date.now()  - each.uploadedTime) / 1000) < 15 && 
                                    <>
                                        <small>just now</small>
                                    </>
                                }
                                { 
                                    ((Date.now()  - each.uploadedTime) / 1000) < 60 && (parseInt(((Date.now()  - each.uploadedTime) / 1000)) > 14) &&
                                    <>
                                        <small>{ parseInt(((Date.now()  - each.uploadedTime) / 1000))}s ago</small>
                                    </>
                                }
                                { 
                                    (( Date.now()  - each.uploadedTime) / (1000*60)) < 60 && (parseInt((( Date.now()  - each.uploadedTime) / (1000*60))) > 0) &&
                                    <>
                                         <small>{ parseInt((( Date.now()  - each.uploadedTime) / (1000*60)))}m ago</small>
                                    </>
                                } 
                                { 
                                    (( Date.now()  - each.uploadedTime ) / (1000*60*60)) < 24 && (parseInt((( Date.now()  - each.uploadedTime ) / (1000*60*60))) > 0) &&
                                    <>
                                         <small>{ parseInt((( Date.now()  - each.uploadedTime ) / (1000*60*60)))}h ago</small>
                                    </>
                                }
                                { 
                                   ( ((Date.now()  - each.uploadedTime) / (1000*60*60*24)) < 30) && (parseInt(((Date.now()  - each.uploadedTime) / (1000*60*60*24))) > 0 ) &&
                                    <>
                                         <small>{ parseInt(((Date.now()  - each.uploadedTime) / (1000*60*60*24)))}d ago</small>
                                    </>
                                }
                                { 
                                    (((Date.now()  - each.uploadedTime) / (1000*60*60*24*30)) < 12) && ( parseInt(((Date.now()  - each.uploadedTime) / (1000*60*60*30))) > 0) &&
                                    <>
                                         <small>{ parseInt(((Date.now()  - each.uploadedTime) / (1000*60*60*30)))}m ago</small>
                                    </>
                                }
                                { 
                                    ((Date.now()  - each.uploadedTime) / (1000*60*60*24*30*12)) && (parseInt(((Date.now()  - each.uploadedTime) / (1000*60*60*24*30*12))) > 0 ) &&
                                    <>
                                         <small>{ parseFloat(((Date.now()  - each.uploadedTime) / (1000*60*60*24*30*12))).toFixed(1)}y ago</small>
                                    </>
                                }
                            </td>
                            <td className=''>
                                <button onClick={() => deleteProduct(each._id)} type="button" className="px-3 py-2 me-1 btn btn-sm btn-rounded btn-danger">
                                    <MDBIcon fas icon="trash" />
                                </button>
                                <button type="button" className="px-3 py-2 me-1 btn btn-sm btn-rounded btn-info">
                                    <MDBIcon far icon="edit" />
                                </button>
                                {
                                    !each.advirtised && <button onClick={() => makeAdvirtised(each._id)} type="button" className="px-3 py-2 me-1 btn btn-sm btn-rounded btn-primary">
                                            Make advirtised
                                        </button>
                                }
                            </td>
                            </tr>
                        </>
                    )
                }
            </tbody>
        </table>
                        </>
                        :
                        <>
                            <h4 className='text center my-4'>No product found</h4>
                        </>
                    }
                </>
            }
        </div>
    );
};

export default Myprod;