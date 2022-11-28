import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import NavBar from '../../components/NavBar/NavBar';

const CategoryPage = () => {
    const [brand, setBrand] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(()=> {
        fetch('http://localhost:5000/all-category')
        .then(res => res.json())
        .then(data => {
            console.log(data);
            setBrand(data);
            setLoading(false);
        })
    }, []) ;
    return (
    
    <>
        <NavBar></NavBar>
        <div className='container'>
            <h1 className='text-center my-4 mb-5'>See current available brand</h1>
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
                                        <p class="card-text">
                                        
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
    </>
        
    );
};

export default CategoryPage;