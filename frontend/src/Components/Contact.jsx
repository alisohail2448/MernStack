import React, { useEffect, useState } from "react";
import Phone from "../images/phone.png";
import add from "../images/add.png";
import email from "../images/email.png";

const Contact = () => {


  const [userData, setuserData] = useState({name:"", email:"", phone:"", message:""});

  const userContact = async () =>{
    try{
      const res = await fetch("/getdata", {
        method: "GET",
        headers:{
          "Content-Type" : "application/json",
        },
      });

      const data = await res.json();
      console.log(data);
      setuserData({...userData, name:data.name, email:data.email, phone: data.phone});

      if(!res.status === 200) {
        const error = new Error(res.error);
        throw error;
      }
    }
    catch(err){
      console.log(err);
    }
  }


  useEffect(() => {
      userContact();
  }, [])

  const handleInputs = (e) =>{
      const name = e.target.name;
      const value = e.target.value;

      setuserData({...userData, [name]:value});
  }

  const sendMessage = async (e) =>{
    e.preventDefault()

    const {name, email, phone, message} = userData;

   const res = await fetch("/contact", {
      method: "POST",
      headers:{
        "Content-Type" : "application/json",
      },
      body:JSON.stringify({
        name, email, phone, message
      })
    });

    const data = await res.json();
    if(!data){
      console.log("Message Not Send");
    }
    else{
      alert("Message Sent Successfully");
      setuserData({...userData, message:""});
    }
  }
  

  return (
    <>
      <div className="contact_info">
        <div className="container-fluid">
          <div className="row">
            <div className="contact-info-item">
              <img src={Phone} alt="phone" />
              <div className="contact-info-content">
                <div className="contact-info-title">Phone</div>
                <div className="contact-info-text">+91 1111 543 2323</div>
              </div>
            </div>

            <div className="contact-info-item">
              <img src={email} alt="phone" />
              <div className="contact-info-content">
                <div className="contact-info-title">Email</div>
                <div className="contact-info-text">contact@sohail.com</div>
              </div>
            </div>

            <div className="contact-info-item">
              <img src={add} alt="address" />
              <div className="contact-info-content">
                <div className="contact-info-title">Address</div>
                <div className="contact-info-text">Pune MH India</div>
              </div>
            </div>
          </div>
        </div>
        <section className="send">
          <div className="container2">
            <form method="POST">
            <div className="message">
            <h2 className="touch">Get in Touch</h2>
            <div className="input-col">
              <input type="text" id="contact-form-name" onChange={handleInputs} name="name" value={userData.name} placeholder="Your Name" required="true"/>
              <input type="email" 
              id="contact-form-email" onChange={handleInputs} name="email" value={userData.email} placeholder="Your Email" required="true"/>
              <input type="text" 
              id="contact-form-phone" onChange={handleInputs} name="phone" value={userData.phone} placeholder="Your Phone Number" required="true"/>
            </div>
            <div className="textarea">
              <textarea name="message" id="textarea" onChange={handleInputs}  value={userData.message} placeholder="Message" ></textarea>
            </div>
            <div className="form-button">
              <input
                type="submit"
                name="send"
                id="send"
                className="form-submit"
                onClick={sendMessage}
                  value="Send Message"
              />
            </div>
            </div>
            </form>
          </div>
        </section>
      </div>
    </>
  );
};

export default Contact;
