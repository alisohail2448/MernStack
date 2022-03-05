import React, { useEffect, useState } from 'react';
import main from "../images/main2.gif";


const Home = () => {


  const [userName, setuserName] = useState('');
  const [show, setShow] = useState(false);

  const userHomePage = async () =>{
    try{
      const res = await fetch("/getdata", {
        method: "GET",
        headers:{
          "Content-Type" : "application/json",
        },
      });

      const data = await res.json();
      console.log(data);
      setuserName(data.name);
      setShow(true);
    }
    catch(err){
      console.log(err);
    }
  }


  useEffect(() => {
      userHomePage();
  }, [])

  return (
    <div className="main">
      <div className="left">
        <p>{show ? "Happy, to see you back" : "WELCOME"}</p>
        <h1><span className='name'>{userName}</span></h1>
        <h1>We Are The MERN <span>Developer❤</span></h1>
      </div>
      <div className="right">
        <img src={main} alt="Developer" />
      </div>
    </div>
  )
}

export default Home