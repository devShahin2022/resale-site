import React, { useContext, useEffect, useState } from 'react';
import { AuthContextInfo } from '../../../authContext/AuthContext';
const Swal = require('sweetalert2');

const Reported = () => {
    const [data, setData] = useState([]);
    const [loading , setLoading] = useState(true);
    const [reRender, setRerender] = useState(44);

    const {role} = useContext(AuthContextInfo);

    useEffect(() => {
        fetch('http://localhost:5000/reported-product')
        .then(res => res.json())
        .then(result => {
            console.log(result);
            setData(result);
            setLoading(false);
        })
    }, [reRender]);

// delete reported product
const deleteReportedProduct = (info) => {
    if(role === 'admin'){

        const reportId = info._id;
        const ProductId = info.prod._id;

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
                })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                  if(data.acknowledged){
                    fetch('http://localhost:5000/delete-report',{
                        method : 'DELETE',
                        headers : {
                            "content-type" : "application/json"
                        },
                        body : JSON.stringify({reportId})
                    }).then(d => d.json())
                    .then(resData => {
                        console.log(resData);
                        Swal.fire(
                            'Deleted!',
                            'Reported product delete',
                            'success'
                          )
                          setRerender(Date.now());
                    })
                  }
                })
            }
          })
    }
}

// delete report
const deleteReporte = (id) => {
    const reportId = id;
    if(role === 'admin'){
        Swal.fire({
            title: 'Sure to delete report?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            if (result.isConfirmed) {
                fetch('http://localhost:5000/delete-report',{
                    method : 'DELETE',
                    headers : {
                        "content-type" : "application/json"
                    },
                    body : JSON.stringify({reportId})
                }).then(d => d.json())
                .then(resData => {
                    Swal.fire(
                        'Deleted!',
                        'Report delete',
                        'success'
                    )
                    setRerender(Date.now());
                })
            }
          })
    }
}

    return (
        <div className='container-fluid'>
            <h1 className='text-center my-4 mb-5'>This is report page ({data?.length})</h1>
            {
                data?.length > 0 ?
                <>
                <table className="table align-middle mb-0 bg-white">
                <thead className="bg-light">
                    <tr>
                    <th>Product</th>
                    <th>seller</th>
                    <th>Reporter</th>
                    <th>Report text</th>
                    <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data?.map(d => <>
                        
                    <tr key={d._id}>
                        <td>
                        <div className="d-flex align-items-center">
                            <img
                            src={d.prod.ImgUrl}
                            alt=""
                            style={{"width" : "7rem"}}
                            className="rounded-circle"
                            />
                            <div>
                                <p className='fw-normal text-muted ms-2'>Location : {d.prod.location}</p>
                            </div>
                        </div>
                        
                        
                    </td>
                    <td>
                        <p className="fw-normal mb-1">Email : {d.prod.userEmail}</p>
                        <p className="fw-normal mb-1">Phone : {d.prod.number}</p>
                    </td>
                    <td>
                        <p className="fw-normal mb-1">Email : {d.reporter.email}</p>
                    </td>
                    <td>
                        <p className="fw-normal mb-1"> {d.msg} </p>
                    </td>
                    <td>
                        <button onClick={() => deleteReportedProduct(d)} type="button" className="btn btn-danger btn-sm btn-rounded my-1">
                            Delete Product
                        </button>
                        <button onClick={() => deleteReporte(d._id)} type="button" className="btn btn-warning btn-sm btn-rounded my-1">
                            Delete Report
                        </button>
                    </td>
                    </tr>
                        
                        </>)
                    }
                    
                </tbody>
                </table>
                </>
                :
                <>
                    <h3>No report product found</h3>
                </>
            }
        </div>
    );
};

export default Reported;