import React, { useContext, useEffect, useState } from 'react';
import { AuthContextInfo } from '../../../authContext/AuthContext';
import Swal from 'sweetalert2'

const Sellers = () => {

    
    const [AllSeller, SetAllSeller] = useState([]);
    const [reRender, setRerender] = useState(44);
    const [loading, setLoading] = useState(true);

    const {userInfoFromDb} = useContext(AuthContextInfo);


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
            fetch('http://localhost:5000/get-all-seller')
            .then(res => res.json())
            .then(data => {
                SetAllSeller(data);
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
            console.log(data)
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



const makeAdmin = (id) => {
    if(userInfoFromDb?.role === 'admin'){
        fetch('http://localhost:5000/make-admin',{
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
                title: 'Admin maked success'
            });
            }
        })
        .catch(error => {

        })
    }
}

// delete a buyer or seller

const DeleteSellerOrBuyer = (id) => {
    if(userInfoFromDb?.role === 'admin'){
        Swal.fire({
            title: 'Are you sure to delete?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            if (result.isConfirmed) {
                fetch('http://localhost:5000/delete-seller-buyer',{
                    method : "DELETE",
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
                        title: 'Account delete success'
                    });
                    }
                })
                .catch(error => {
        
                })
            }
          });
    }
} 


    return (
        <div className='text-center'>
            <h1 className='my-3 text-center'>All Sellers ({AllSeller?.length})</h1>
            {
                loading ? 
                <>
                <h3>Please wait... Data loading</h3>
                </>
                :
                <>
                    {
                        AllSeller?.length < 1 ?
                        <>
                            <h3 className='my-3 text-center'>No data found</h3>
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
                                        AllSeller?.map(d =>
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
                                        <td>
                                            <button  onClick={() => DeleteSellerOrBuyer(d._id)}  type="button" className="btn btn-danger btn-sm btn-rounded mx-1">
                                                Delete buyer
                                            </button>


                                            {
                                                d.role === "buyer" &&
                                                <button onClick={() => makeAdmin(d._id)} className='btn btn-sm btn-primary btn-rounded mx-1'>Make admin</button>
                                            }
                                            {
                                                d.role === "seller" &&
                                                <button  onClick={() => makeAdmin(d._id)} className='btn btn-sm btn-primary btn-rounded mx-1'>Make admin</button>
                                            }


                                        </td>
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

export default Sellers;