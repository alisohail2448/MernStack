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

const PORT = process.env.PORT;

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

app.listen(PORT, () => {
  console.log(`Server is running on at PORT no ${PORT}`);
});
