// LoadingFallback.js
import React from 'react';
import loading from '../assets/loading.gif';

const LoadingFallback = () => (
  <div className="loading-container">
    <img className='loading' src={loading} alt="Loading" />
  </div>
);

export default LoadingFallback;
