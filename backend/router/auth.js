const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const cookieParser =require("cookie-parser");
router.use(cookieParser())


require("../db/conn.js");
const User = require("../model/userSchema.js");
const authenticate = require("../middlewares/authenticate.js")

router.get("/", (req, res) => {
  res.send("Hello World from auth.js");
});

//REGISTER ROUTE
// using Promisses!!!!!

// router.post("/register", (req, res) => {
//   const { name, email, phone, work, password, cpassword } = req.body;

//   if (!name || !email || !phone || !work || !password || !cpassword) {
//     return res.status(422).json({ error: "Plz fill all fields properly" });
//   }

//   User.findOne({ email: email }).then((userExist) => {
//     if (userExist) {
//       return res.status(422).json({ error: "Email already Exist" });
//     }
//     const user = new User({ name, email, phone, work, password, cpassword })

//     user.save().then(() =>{
//         res.status(201).json({message: "User registered Successfully"});
//     }).catch((err) => res.status(500).json({error: "Failed to registered"}))

//   }).catch(err => { console.log(err);})

//   // console.log(name);
//   // console.log(email);

//   // console.log(req.body);
//   // res.json({message: req.body})
// });

// using async await

router.post("/register", async (req, res) => {
  const { name, email, phone, work, password, cpassword } = req.body;

  if (!name || !email || !phone || !work || !password || !cpassword) {
    return res.status(422).json({ error: "Plz fill all fields properly" });
  }

  try {
    const userExist = await User.findOne({ email: email });
    if (userExist) {
      return res.status(422).json({ error: "Email already Exist" });
    } else if (password != cpassword) {
      return res.status(422).json({ error: "password are not matching" });
    } else {
      const user = new User({ name, email, phone, work, password, cpassword });

      await user.save();

      // console.log(`${user} User Registerd Successfully`);
      // console.log(userRegister);

      res.status(201).json({ message: "User registered Successfully" });
    }
  } catch (err) {
    console.log(err);
  }
});

//LOGIN ROUTE

router.post("/signin", async (req, res) => {
  // console.log(req.body);
  // res.json({message: "DOne"})

  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "Plz filled the data " });
    }

    const userLogin = await User.findOne({ email: email });
    // console.log(userLogin);
    if (userLogin) {
      const isMatch = await bcrypt.compare(password, userLogin.password);
        
      const token = await userLogin.genrateAuthToken();
      console.log(token);

      res.cookie("jwtoken", token, {
        expires: new Date(Date.now() + 25892000000),
        httpOnly: true
      })

      if (!isMatch) {
        res.status(400).json({ message: "Invalid Credentials" });
      } else {
        res.json({ message: "User Signin Successfully" });
      }
    } else {
      res.status(400).json({ message: "Invalid Credentials" });
    }
  } catch (err) {
    console.log(err);
  }
});


router.get("/about",authenticate , (req, res) => {
  console.log("Hello my about");
  res.send(req.rootUser);
});


//get data for home and contact page
router.get("/getdata",authenticate , (req, res) => {
  console.log("Hello my Getdata");
  res.send(req.rootUser);
});


router.post("/contact", authenticate, async (req, res) => {
  try{
    const {name, email, phone, message} = req.body;

    if(!name || !email || !phone || !message){
      console.log("ERrr in contact form");
      return res.json({error: "plz filled the contact form"})
    }

    const userContact = await User.findOne({_id:req.userID})

    if(userContact){
      const userMessage = await userContact.addMessage(name, email, phone, message);
      await userContact.save();
      
      res.status(201).json({message: "User contact Successfully"});
    }

   }
  catch(err){
    console.log(err);
  }
});



router.get("/logout", (req, res) => {
  console.log("Hello my logout");
  res.clearCookie('jwtoken', {path : '/'});
  res.status(200).send("User Logout");
});


module.exports = router;

// {
//     "name": "sohail",
//     "email": "sohailakhtar7249@gmail.com",
//     "phone": 9847389229,
//     "work": "web dev",
//     "password": "mern",
//     "cpassword": "mern"
// }
