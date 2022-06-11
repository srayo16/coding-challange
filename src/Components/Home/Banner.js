import React from 'react';
import banner from '../../Images/welcome3.jpg';

const Banner = () => {
    return (
        <div className='container'>
            <img src={banner} className='img-fluid' alt="banner" />
        </div>
    );
};

export default Banner;