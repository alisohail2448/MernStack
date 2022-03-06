const dotenv = require("dotenv");
const mongoose = require("mongoose");
const express = require("express");

const app = express();

dotenv.config({ path: "./config.env" });
require("./db/conn.js");
// const User = require('./model/userSchema.js')

app.use(express.json());

// Middlewares
app.use(require("./router/auth.js"));

const PORT = process.env.PORT || 5000;

// app.get("/", (req,res) => {
//     res.send(`Hello from the server`)
// })

// app.get("/about", (req, res) => {
//   res.send(`Hello from the About server`);
// });

// app.get("/contact", (req, res) => {
//   res.cookie("Test", "mern");
//   res.send(`Hello from the contact server`);
// });

app.get("/signin", (req, res) => {
  res.send(`Hello from the signin server`);
});

app.get("/signup", (req, res) => {
  res.send(`Hello from the signup server`);
});


//HEROKU

// if(process.env.NODE_ENV == "production"){
//   app.use(express.static("frontend/build"));
//   const path = require("path");
//   app.get("*", (req, res) =>{
//     res.sendFile(path.resolve(__dirname, "frontend", "build", 'index.html'));
//   })
// }

if(process.env.NODE_ENV == "production"){
  app.use(express.static("frontend/build"))
}



app.listen(PORT, () => {
  console.log(`Server is running on at PORT no ${PORT}`);
});
