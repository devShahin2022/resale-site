import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../../components/Footer/Footer';
import NavBar from '../../components/NavBar/NavBar';
import axios from 'axios';

const HomePage = () => {

    const [brand, setBrand] = useState([]);
    const [loading, setLoading] = useState(true);
    const [advirtisedProd, setAdvirtisedProd] = useState([]);

    useEffect(()=> {
        fetch('http://localhost:5000/all-category')
        .then(res => res.json())
        .then(data => {
            setBrand(data);
            setLoading(false);
        });

        axios.get(`http://localhost:5000/advirtised-product`)
        .then(res => {
          console.log(res.data);
          setAdvirtisedProd(res.data);
        })

    }, []) ;



    return (
        <div>
            <NavBar></NavBar>
            {/* banner section */}
            <div style={{"height" : "100vh" , "overflow":"auto"}} className='bg-primary d-flex justify-content center align-items-center'>
                <div className="container">
                    <h1 className="display-2 text-center text-light">Upload your oldest phone or buy oldest phone</h1>
                    <p className="lead text-center text-light" > Secure | Fastest | Trusted</p>
                </div>
            </div>
                <div className="container">
                    {
                        advirtisedProd?.length > 0 &&
                        <>
                            <div style={{"marginBottom" : "3rem"}} className="advirtised-prod ">
                            <h1 className='text-center my-4' >Advirtised product</h1>
                            <div className="row ">
                                {
                                    advirtisedProd?.map(prod =>(
                                        <div key={prod._id} className="col-md-3 my-3">
                                            <img className='img-fluid w-100' src={prod.ImgUrl} alt="" />
                                            <div className='mt-2 d-flex flex-wrap justify-content-between'>
                                                <p className='m-1'>
                                                   <span className="fw-bold">Model : </span> {prod.phoneModel}
                                                </p>
                                                <p className='m-1'>
                                                <span className="fw-bold">Resale : </span> {prod.resalePrice} tk
                                                </p>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                            </div>
                        </>
                    }
                    <div style={{"marginBottom" : "4rem"}} className="prod-category">
                        <h1 className='text-center my-4 mb-5' >Product category</h1>
                        <div className='row'>
           {
            loading ? 
            <>
                <h4>Data loading</h4>
            </>
            :
            <>
            {
                brand?.length > 0 ?
                    <>
                       { 
                       
                        brand?.map(b => (
                            <div key={b._id} className='col-lg-3 col-md-4 my-2'>
                                <div className="card">
                                    <div className="bg-image hover-overlay ripple" data-mdb-ripple-color="light">
                                        <img src={b.image} alt='' className="img-fluid w-100"/>
                                        <Link to={`/brand/${b._id}`} >
                                        <div className="mask" style={{"backgroundColor": "rgba(251, 251, 251, 0.15)"}}></div>
                                        </Link>
                                    </div>
                                    <div className="card-body">
                                        <h5 className="card-title">{b.name}</h5>
                                        <p className="card-text">
                                        
                                       { 
                                        
                                         b.desc?.length > 100 ?

                                         <>
                                            {
                                               ` ${b.desc.slice(0,100)}...`
                                            }
                                         </>
                                         :
                                         <>
                                            {
                                               b.desc
                                            }
                                         </>
                                    
                                        }
                                       </p>
                                        <Link to={`/brand/${b._id}`}><button className="btn btn-primary">Visit brand</button></Link>
                                    </div>
                                </div>
                            </div>
                        ))
                       
                    }
                    </>
                    :
                    <>
                        <h3>No category data found</h3>
                    </>
                }
            </>
           } 
                         </div>
                    </div>
                    <div className="plan">
                        <h1 className='text-center my-4 mb-5'>Explore our plan</h1>
                        <div className="row">
                            <div className="col-md-4">
                                <div className='bg-light mb-4'>
                                    <h4>Basic plan</h4>
                                    <div className='text-muted'>
                                        <span className="muted">Per day 3 product upload</span>
                                          <br/>
                                        <span className="muted">Max advirtised product 1</span>
                                        <br/>
                                        <span className="muted">Your advirtised product active 3 days</span>
                                        <br/>
                                        <span className="muted">No email support</span>
                                        <p className="lead text-primary">Price : 0 tk / 1year</p>
                                    </div>
                                    <button className='btn btn-primary mt-3'>Explore now</button>
                                </div>
                            </div>
                            <div className="col-md-4">
                            <div className='bg-light mb-4'>
                                    <h4>Premium plan</h4>
                                    <div className='text-muted'>
                                        <span className="muted">Per day 30 product upload</span>
                                          <br/>
                                        <span className="muted">Max advirtised product 20</span>
                                        <br/>
                                        <span className="muted">Your advirtised product active 30 days</span>
                                        <br/>
                                        <span className="muted">Email support</span>
                                        <p className="lead text-primary">Price : 500 tk / 1year</p>
                                    </div>
                                    <button className='btn btn-primary mt-3'>Explore now</button>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className='bg-light mb-4'>
                                    <h4>Free plan</h4>
                                    <div className='text-muted'>
                                        <span className="muted">Per day 3 product upload</span>
                                          <br/>
                                        <span className="muted">Max advirtised product 1</span>
                                        <br/>
                                        <span className="muted">Your advirtised product active 3 days</span>
                                        <br/>
                                        <span className="muted">No email support</span>
                                        <p className="lead text-primary">Price : 100 tk / 1year</p>
                                    </div>
                                    <button className='btn btn-primary mt-3'>Explore now</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            <Footer></Footer>
        </div>
    );
};

export default HomePage;