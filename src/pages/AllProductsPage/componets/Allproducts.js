import React, { useContext, useEffect, useState } from 'react';
import { AuthContextInfo } from '../../../authContext/AuthContext';

const Swal = require('sweetalert2');

const Allproducts = () => {
    const [prod, setProd] = useState([]);
    const [reRender, setRerender] = useState(44);
    const [loading, setLoading] = useState(true);


    const {userInfoFromDb, role} = useContext(AuthContextInfo);

    useEffect(() => {
        if(userInfoFromDb?.role === 'admin'){
            fetch('http://localhost:5000/all-products-admin')
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setProd(data)
                setLoading(false);
            })
            .catch(error => {
            })
        }
    }, [reRender]);


    // delete product
const deleteProduct = (ProductId) => {
    if(role === 'admin'){
        Swal.fire({
            title: 'Sure to delete product?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            if (result.isConfirmed) {
                fetch('http://localhost:5000/delete-reported-product',{
                    method : 'DELETE',
                    headers : {
                        "content-type" : "application/json"
                    },
                    body : JSON.stringify({ProductId})
                }).then(d => d.json())
                .then(resData => {
                    Swal.fire(
                        'Deleted!',
                        'Product delete',
                        'success'
                    )
                    setRerender(Date.now());
                })
            }
          })
    }
}




    return (
        <div>
            <h1 className='text-center my-3 mb-5'>All products ({ prod?.length })</h1>
            {
                loading ? 
                <>
                    <h3>Please wait... Data loading</h3>
                </>
                :
                <>
                    <table className="table align-middle mb-0 bg-white">
                <thead className="bg-light">
                    <tr>
                    <th>Product</th>
                    <th>seller</th>
                    <th>status</th>
                    <th>Advirtised</th>
                    <th>Uploaded at</th>
                    <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        prod?.map( d => 
                        
                <tr key={d._id}>
                    <td>
                        <div className="d-flex align-items-center">
                        <img
                            src={ d.ImgUrl }
                            alt=""
                            style={{"width": "45px", "height":" 45px"}}
                            className="rounded-circle"
                            />
                        <div className="ms-3">
                            <p className="fw-bold mb-1">{ d.catDetails.name }</p>
                            <p className="text-muted mb-0">{ d.phoneModel}</p>
                        </div>
                        </div>
                    </td>
                    <td>
                        <p className="fw-normal mb-1">{ d.userEmail}</p>
                        <p className="text-muted mb-0">{ d.number}</p>
                    </td>
                    <td>
                        {
                            d.status === 'available' &&
                            <span className="badge badge-success rounded-pill d-inline">{ d.status}</span>
                        }
                        {
                            d.status === 'booked' &&
                            <span className="badge badge-info rounded-pill d-inline">{ d.status}</span>
                        }
                        {
                            d.status === 'pending' &&
                            <span className="badge badge-primary rounded-pill d-inline">{ d.status}</span>
                        }
                        {
                            d.status === 'paid' &&
                            <span className="badge badge-danger rounded-pill d-inline">{ d.status}</span>
                        }
                    </td>
                    <td>
                        {
                            d.advirtised ? 
                            <>
                                <p className='text-success fw-normal'>yes</p>
                            </>
                            :
                            <>
                              <p className='text-success fw-normal text-muted' >No</p>
                            </>
                        }
                    </td>
                    <td>
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
                    </td>
                    <td>
                        <button onClick={() => deleteProduct(d._id)} type="button" className="btn btn-danger btn-sm btn-rounded">
                            Delete product
                        </button>
                    </td>
                    </tr>
                        
                        )
                    }

                </tbody>
                    </table>
                </>
            }
        </div>
    );
};

export default Allproducts;