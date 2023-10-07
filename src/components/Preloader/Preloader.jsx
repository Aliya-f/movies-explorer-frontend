import React from 'react'
import './Preloader.css'

const Preloader = ({ isLoading }) => {
  return (
    <div className={isLoading ? `preloader` : `preloader preloader_unactive`}>
      <div className="preloader__container">
        <span className="preloader__elem"></span>
      </div>
    </div>
  )
};

export default Preloader