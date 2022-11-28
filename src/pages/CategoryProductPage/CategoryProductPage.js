import React, { useContext, useEffect, useState } from 'react';
import { Link, useLoaderData } from 'react-router-dom';
import { AuthContextInfo } from '../../authContext/AuthContext';
import Footer from '../../components/Footer/Footer';
import NavBar from '../../components/NavBar/NavBar';

const CategoryProductPage = () => {
    const {user} = useContext(AuthContextInfo);
    const data = useLoaderData();
    const [brand, setBrand] = useState([]);
    useEffect(() => {
        if(data){

            // console.log(data[0]);
            fetch(`http://localhost:5000/single-cat-name?id=${data[0].brandId}`)
            .then(res => res.json())
            .then(brandData => {
                setBrand(brandData);
            })
        }
    }, []);
    console.log(brand);
    return (
        <>
            <NavBar></NavBar>
            <div className='container'>
                <h1 className='text-center my-4 mb-5'>Product for <span className='text-primary'>{ brand[0]?.name }</span>  brand</h1>

                <div className='container'>
                    <div className='row'>
                        <div className='col-md-4'>
                            {
                                data?.map(d => 
                                <>
                                    <div class="card border border-1 pb-2 mb-5">
                                        <img src={d.ImgUrl} class="card-img-top img-fluid w-100" alt=""/>
                                        <div class="p-1 mt-2">
                                            <h5 class="card-title">{brand[0]?.name + ' - '+  d.phoneModel}</h5>
                                            
                                            <div className='d-flex justify-content-between mt-2 flex-wrap'>
                                                <p className=''>New price :<span className='fw-bold'>{d.brandNewPrice}</span>tk </p>
                                                <p className=''>Resale price :<span className='fw-bold'>{d.resalePrice}</span>tk </p>
                                            </div>
                                            <div className='d-flex justify-content-between mt-2 flex-wrap'>
                                            <p className='fs-6 '>
                                                {
                                                    d.isVerified ? 
                                                    <>
                                                        <small className='badge badge-success fs-6 pb-0'>Varified <span className='fw-bold'><i class="fas fa-check-double text-success"></i></span> </small>
                                                    </>
                                                    :
                                                    <>
                                                        <small className='badge badge-danger fs-6 pb-0'>Unknown <span className='fw-bold'><i class="fas fa-check-double text-muted"></i></span> </small>
                                                    </>
                                                }
                                                {/* here will be show time  */}
                                            </p>



                                                <p className='badge badge-info py-2 px-3 fs-6'>
                                                    <i class="far fa-clock"></i>
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
                                            </p>




                                                
                                            </div>
                                            <p className='mt-1 lead muted'>
                                                <small>Phone : {d.number}</small>
                                            </p>
                                            <div className='d-flex justify-content-between mt-2 flex-wrap'>
                                                <button class="btn btn-sm btn-secondary"><i class="far fa-eye"></i></button>
                                                <button class="btn btn-sm btn-primary">Book now</button>
                                            </div>
                                        </div>
                                    </div>
                                </>
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>

            <Footer></Footer>
        </>
    );
};

export default CategoryProductPage;