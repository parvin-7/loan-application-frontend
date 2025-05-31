import React from 'react'
import { Outlet, Link } from "react-router-dom";

const Home = () => {
  return (

    <>
      <div className="container d-flex flex-column align-items-center justify-content-center vh-100 text-center">
        <div className="card p-5 shadow-lg">
          <h1 className="mb-4">Welcome to Our Loan Application</h1>
          <p className="lead">
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