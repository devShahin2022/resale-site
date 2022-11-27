import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContextInfo } from '../../../authContext/AuthContext';

const Myprod = () => {
    const [product, setProduct] = useState([]);
    const {user, role, logOut} = useContext(AuthContextInfo);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();
    const currentUserEmail = user.email;

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

    return (
        <div>
            <h1>My uploaded products ({product?.length})</h1>
            {
                loading ? 
                <>
                    <p>Loding</p>
                </>
                :
                <>
                    <p>data fetch here</p>
                    {
                        product?.length> 0 ?
                        <>
                            <h2>{product?.length}</h2>
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