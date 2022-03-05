import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import pro from "../images/po.jpg";
import user from "../images/user.gif";

const About = () => {

  const [userData, setuserData] = useState({});
  const history = useHistory();

  const callAboutPage = async () =>{
    try{
      const res = await fetch("/about", {
        method: "GET",
        headers:{
          Accept : "application/json",
          "Content-Type" : "application/json",
        },
        credentials: "include"
      });

      const data = await res.json();
      console.log(data);
      setuserData(data);

      if(!res.status === 200) {
        const error = new Error(res.error);
        throw error;
      }
    }
    catch(err){
      console.log(err);
      history.push("/login");
    }
  }


  useEffect(() => {
      callAboutPage();
  }, [])
  


  return (
    <>
      <section className="about">
        <form method="GET">
        <div className="container3">
          <div className="content">
            <div className="col-md-4">
              <div className="profile-image">
                <img src={userData.name === "Sohail Akhtar Ali" ? pro : user} alt="profile" />
                <div className="links">
                  <h5>WORK LINKS</h5>
                  <a href="#"><span><i class="zmdi zmdi-instagram material-icons-name"></i></span> Instagram</a>
                  <a href="#"><span>
                  <i class="zmdi zmdi-github material-icons-name"></i></span> Github</a>
                  <a href="#"><span>
                  <i class="zmdi zmdi-linkedin material-icons-name"></i></span> Linkedin</a>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="profile-head">
              <div>
              <h5>{userData.name}</h5>
                <h6>{userData.work}</h6>
                <p className="profile-rating mt-3 mb-5">
                  RANKINGS: <span> 1/10 </span>
                </p>
              </div>

                <div className="edit-profile">
                  <input
                    type="submit"
                    name="btnAddmore"
                    value="Edit Profile"
                    className="profile-edit-btn"
                  />
                </div>
              </div>
              <div className="tabs">
                <ul class="nav nav-tabs">
                  <li class="nav-item">
                    <a
                      className="nav-link active"
                      id="home-tab"
                      data-toggle="tab"
                      href="#home"
                      role="tab"
                    >
                      About
                    </a>
                  </li>
                  <li class="nav-item">
                    <a
                      className="nav-link"
                      id="profile-tab"
                      data-toggle="tab"
                      href="#profile"
                      role="tab"
                    >
                      Timeline
                    </a>
                  </li>
                </ul>
              </div>

              <div className="about-info">
                <div className="tab-content profile-tab" id="myTabcontent" >
                  <div className="tab-pane fade show active" id="home" role="tabpanel"
                  area-aria-labelledby="home-tab" >
                    <div className="about-content">
                      <div className="info">
                        <label >User</label>
                        <p>8932739432897328</p>
                      </div>
                      <div className="info">
                        <label >Name</label>
                        <p>{userData.name}</p>
                      </div>
                      <div className="info">
                        <label >Email</label>
                        <p>{userData.email}</p>
                      </div>
                      <div className="info">
                        <label >Phone</label>
                        <p>{userData.phone}</p>
                      </div>
                      <div className="info">
                        <label >Profession</label>
                        <p>{userData.work}</p>
                      </div>
                    </div>
                  </div>
                  <div className="tab-panel fade " id="profile" role='tabpanel
                  ' area-aria-labelledby="profile-tab">
                    <div className="about-content">
                    <div className="info">
                        <label >Experience</label>
                        <p>Expert</p>
                      </div>
                    <div className="info">
                        <label >Hourly Rate</label>
                        <p>10$/hr</p>
                      </div>
                    <div className="info">
                        <label >Total Projects</label>
                        <p>Lot of</p>
                      </div>
                    <div className="info">
                        <label >English Level</label>
                        <p>Average</p>
                      </div>
                    <div className="info">
                        <label >Availability</label>
                        <p>6 Months</p>
                      </div>
                    </div>
                  </div>

                </div>
              </div>

            </div>
          </div>
        </div>
        </form>
      </section>
    </>
  );
};

export default About;
