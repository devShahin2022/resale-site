import React, { useContext, useEffect, useState } from 'react';
import { AuthContextInfo } from '../../../authContext/AuthContext';
import Swal from 'sweetalert2'

const AllSecondaryAdmin = () => {

    
    const [AllAdmin, SetAllAdmin] = useState([]);
    const [reRender, setRerender] = useState(44);
    const [loading, setLoading] = useState(true);

    const {role, userInfoFromDb , user} = useContext(AuthContextInfo);


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

    useEffect(() => {
        if(userInfoFromDb?.role === 'admin'){
            fetch('http://localhost:5000/get-all-secondary-admin')
            .then(res => res.json())
            .then(data => {
                SetAllAdmin(data);
                setLoading(false);
            })
            .catch(error => {
            })
        }
    }, [reRender]);


   const makeUnverified = (id) => {
        if(userInfoFromDb?.role === 'admin'){
            fetch('http://localhost:5000/make-unverified',{
                method : "POST",
                headers : {
                    'content-type' : 'application/json'
                },
                body : JSON.stringify({id})
            })
            .then(res => res.json())
            .then(data => {
                if(data.acknowledged){
                    console.log(data);
                    setRerender(Date.now());
                    setLoading(false);
                    Toast.fire({
                        icon: 'success',
                        title: 'maked unverified'
                    });
                }
            })
            .catch(error => {
            })
        }
   }

   const makeVerified = (id) => {
    if(userInfoFromDb?.role === 'admin'){
        fetch('http://localhost:5000/make-verified',{
            method : "POST",
            headers : {
                'content-type' : 'application/json'
            },
            body : JSON.stringify({id})
        })
        .then(res => res.json())
        .then(data => {
            if(data.acknowledged){ 
            setRerender(Date.now());
            setLoading(false);
            Toast.fire({
                icon: 'success',
                title: 'maked verified'
            });
            }
        })
        .catch(error => {
        })
    }
}


// make seller
const makeSeller = (id) => {
    if(userInfoFromDb?.role === 'admin'){
        fetch('http://localhost:5000/make-seller',{
            method : "POST",
            headers : {
                'content-type' : 'application/json'
            },
            body : JSON.stringify({id})
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            if(data.acknowledged){ 
            console.log(data)
            setRerender(Date.now());
            setLoading(false);
            Toast.fire({
                icon: 'success',
                title: 'maked seller success'
            });
            }
        })
        .catch(error => {

        })
    }
}

// make admin
const makeBuyer = (id) => {
    if(userInfoFromDb?.role === 'admin'){
        fetch('http://localhost:5000/make-buyer',{
            method : "POST",
            headers : {
                'content-type' : 'application/json'
            },
            body : JSON.stringify({id})
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            if(data.acknowledged){ 
            console.log(data)
            setRerender(Date.now());
            setLoading(false);
            Toast.fire({
                icon: 'success',
                title: 'maked buyer success'
            });
            }
        })
        .catch(error => {

        })
    }
}


    return (
        <div className='text-center'>
            <h1 className='my-3 text-center'>All Admins ({AllAdmin?.length})</h1>

            {
                loading ? 
                <>
                    <h3 className='text-center my-3'>Please wait... data loading</h3>
                </>
                :
                <>
                    {
                       AllAdmin?.length < 1 ?
                       <>
                        <h3 className='my-4'> No secodary  admin found </h3>
                       </> 
                       :
                       <>
                        <table className="table align-middle mb-0 bg-white">
                            <thead className="bg-light">
                                <tr className='bg-primary text-light fw-bold'>
                                    <th>Buyer</th>
                                    <th>Role</th>
                                    <th>verify</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    AllAdmin?.map(d =>
                                    <tr key={d._id}>
                                    <td>
                                        <div className="d-flex align-items-center">
                                        <img
                                            src={d?.photo}
                                            alt=""
                                            style={{"width": "45px", "height":" 45px"}}
                                            className="rounded-circle"
                                            />
                                        <div className="ms-3">
                                            <p className="fw-bold mb-1">Email : {d.email} </p>
                                            <p className="text-muted mb-1">Name : {d?.name} </p>
                                        </div>
                                        </div>
                                    </td>
                                    <td>
                                        <span className="badge badge-success rounded-pill d-inline">{d.role}  
                                        </span>
                                    </td>
                                    <td>
                                        {
                                            d.isVerified ? 
                                            <div className='d-flex flex-wrap align-items-center'>
                                                <span className="badge badge-success rounded-pill d-inline my-1 mx-1">verfied</span>
                                                <button onClick={() => makeUnverified(d._id)} className='btn btn-sm btn-rounded btn-muted my-1 my-1 mx-1'>make unverified</button>
                                            </div>
                                            :
                                            <div className='d-flex flex-wrap align-items-center'>
                                                <span className="badge badge-danger rounded-pill d-inline my-1 mx-1">Unverfied</span>
                                                <button onClick={() => makeVerified(d._id)} className='btn btn-sm btn-rounded btn-info my-1 my-1 mx-1'>make Verified</button>
                                            
                                            </div> 
                                        }
                                    </td>
                                    {
                                        ( d.role === "admin" && user.email === 'shahinsss1949@gmail.com' ) ?
                                        <>
                                            <td>
                                                {
                                                    ( d.role === "admin" && d.email === 'shahinsss1949@gmail.com' ) ?
                                                        <>
                                                            <span className="badge badge-success rounded-pill d-inline my-1 mx-1">Primary admin</span>
                                                        </>
                                                        :
                                                        <>
                                                            <button onClick={()=> makeSeller(d._id)} className='btn btn-sm btn-secondary btn-rounded mx-1'>Make Seller</button>
                                                            <button onClick={()=> makeBuyer(d._id)}  className='btn btn-sm btn-primary btn-rounded mx-1'>Make Buyer</button>
                                                        </>
                                                }
                                            </td>
                                        </>
                                        :
                                        <>
                                            <td>
                                                <span className="badge badge-success rounded-pill d-inline my-1 mx-1">Secondary admin</span>
                                            </td>
                                        </>
                                    }

                                    </tr>
                                    )
                                }
                            </tbody>
                        </table>
                       </>
                    }
                </>
            }

        </div>
    );
};

export default AllSecondaryAdmin;