import React from 'react'
import { Outlet, Link } from "react-router-dom";

const Home = () => {
  return (

    <>
    <div><h1>Welcome to our Loan Application</h1>
      <p>Click to <Link to="/signup">Signup</Link> or Already a user? <Link to="/login">Login</Link></p>
    </div>
      <Outlet />
    </>

  );
}

export default Home