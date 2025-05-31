import React from 'react'
import { useEffect } from 'react';
import { Outlet, Link } from "react-router-dom";
import AOS from 'aos';
import 'aos/dist/aos.css';


const Home = () => {
   useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (

    <>
      <div className="container d-flex flex-column align-items-center justify-content-center vh-100 text-center">
        <div className="card p-5 shadow-lg">
          <h1 data-aos="fade-down" className="mb-4">Welcome to Our Loan Application</h1>
          <p data-aos="fade-up" className="lead">
            New here? <Link to="/signup" className="btn btn-primary mx-2">Sign Up</Link>
            or
            <span className="mx-2">Already a user?</span>
            <Link to="/login" className="btn btn-outline-primary">Log In</Link>
          </p>
        </div>
      </div>
      <Outlet />
    </>

  );
}

export default Home