import React from 'react';

const AddProd = ({clickMe}) => {
    return (
        <div>
            <h1>Iam add product component</h1>
            <button onClick={clickMe}>click</button>
        </div>
    );
};

export default AddProd;