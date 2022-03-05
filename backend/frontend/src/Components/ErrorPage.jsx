import React from 'react';
import err from "../images/err4.gif";
import { NavLink } from "react-router-dom";

const ErrorPage = () => {
  return (
    <>
    <div className='notfound'>
        <img src={err} alt="" />
    </div>
    <div className="error-cont">
    <h2>WE ARE SORRY, PAGE NOT FOUND!</h2>
        <NavLink className='notfoundbtn' to="/">Back to Home Page{' >'}</NavLink>
    </div>
    </>
  )
}

export default ErrorPage