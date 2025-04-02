import React from 'react'
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    
    <div className="p-5 mb-4 bg-success text-white rounded-3 mt-4 shadow-lg">
      <div className="container text-center py-5">
        <h1 className="display-4 fw-bold">Order Your Favorite Food Here</h1>
        <p className="fs-5 col-lg-8 mx-auto">
          Discover the best food and drinks in Hyderabad, delivered fresh to your door.
        </p>
        <Link
          to="/explore"
          className="btn btn-light btn-lg mt-3 fw-semibold shadow-sm"
        >
          Explore Now
        </Link>
      </div>
    </div>


    
  );
}

export default Header
