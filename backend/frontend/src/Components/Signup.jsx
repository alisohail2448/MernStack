import React, { useState } from 'react';
import Sign from "../images/sign.gif"
import { NavLink, useHistory } from "react-router-dom";

const Signup = () => {

  const history = useHistory();

  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    work: "",
    password: "",
    cpassword: "",
  });

  let name, value
  const handleInputs = (e) => {
    console.log(e)
    name = e.target.name;
    value = e.target.value;

    setUser({...user, [name]:value});
  }

  const PostData = async (e) =>{
    e.preventDefault();

    const { name, email, phone, work, password, cpassword } = user;

    const res = await fetch("/register", {
      method: "POST",
      headers:{
        "Content-Type" : "application/json",
      },
      body:JSON.stringify({
        name, email, phone, work, password, cpassword
      })
    });

    const data = await res.json()

    if(data.status === 422 || !data ){
      window.alert("Invalid Registeration");
      console.log("Invalid Registeration");
    }
    else{
      window.alert("Registeration Successfull");
      console.log("Registeration Successfull");
      history.push("/login")
    }

  }
   

  return (
    <section className='signup'>
      <div className="container mt-5">
        <div className="signup-content">
          <div className="signup-form">
            <h2 className="form-title">
              SignUp
            </h2>
            <form method='POST' id='register-form' className="register-form">
              
              <div className="form-group">
                <label htmlFor="name"><i className="zmdi zmdi-account material-icons-name"></i></label>
                <input type="text" name='name' 
                value={user.name}
                onChange={handleInputs}
                id='name' 
                autoComplete='off' placeholder='Your Name' />
              </div>

              <div className="form-group">
                <label htmlFor="email"><i className="zmdi zmdi-email material-icons-name"></i></label>
                <input type="email" 
                value={user.email}
                onChange={handleInputs}
                name='email' id='email' 
                autoComplete='off' placeholder='Your Email' />
              </div>

              <div className="form-group">
                <label htmlFor="phone"><i className="zmdi zmdi-phone-in-talk material-icons-name"></i></label>
                <input type="text" name='phone' 
                value={user.phone}
                onChange={handleInputs}
                id='phone' 
                autoComplete='off' placeholder='Your Mobile Number' />
              </div>

              <div className="form-group">
                <label htmlFor="work"><i className="zmdi zmdi-slideshow material-icons-name"></i></label>
                <input type="text" name='work' 
                value={user.work}
                onChange={handleInputs}
                id='work' 
                autoComplete='off' placeholder='Your Profession' />
              </div>

              <div className="form-group">
                <label htmlFor="password"><i className="zmdi zmdi-lock material-icons-name"></i></label>
                <input type="password" 
                value={user.password}
                onChange={handleInputs}
                name='password' id='password' 
                autoComplete='off' placeholder='Your Password' />
              </div>

              <div className="form-group">
                <label htmlFor="cpassword"><i className="zmdi zmdi-lock material-icons-name"></i></label>
                <input type="password" 
                value={user.cpassword}
                onChange={handleInputs}
                name='cpassword' id='cpassword' 
                autoComplete='off' placeholder='Confirm Your Password' />
              </div>

               <div className="form-button">
                 <input type="submit" name='signup' id='signup' className='form-submit' value="register" onClick={PostData} />
               </div>

            </form>

          </div>
            <div className="signup-img">
              <figure>
                <img src={Sign} alt="registeration Pic" />
              </figure>
              <NavLink to="/login" className="signup-image-link">I am already register</NavLink>
            </div>
        </div>
      </div>
    </section>
  )
}

export default Signup;