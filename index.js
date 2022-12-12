const express = require("express");
const app = express();
var jwt = require("jsonwebtoken");
var cors = require('cors')
require("dotenv").config()


const { connection } = require("./config/db");
const { UserRouter } = require("./Routes/users.route");
const { NoteRouter } = require("./Routes/notes.route");


app.use(express.json());
app.use(cors({
  origin: "*"
}))
app.use("/users", UserRouter);
app.use("/notes", NoteRouter);

console.log(process.env.name)

app.get("/", (req, res) => {
  res.send({ msg: `welcome Mr. ${process.env.NAME}` });
});

app.get("/about", (req, res) => {
  res.send({ msg: "Welcome to about" });
});

app.get("/contact", (req, res) => {
  res.send({ msg: "Welcome to contact" });
});


app.get("/weather", (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  try {
    jwt.verify(token, "secret", (err, decoded) => {
      if (decoded) {
        res.send({ msg: "Welcome to weather" });
      } else {
        console.log(err);
        res.send({ err: "please login to access this endpoint" });
      }
    });
  } catch (err) {
    console.log("ERROR", err);
    res.send({ err: "some error occured" });
  }
});


app.get("/purchase", (req, res) => {
    const token = req.headers.authorization?.split(" ")[1];
    try {
      jwt.verify(token, "secret", (err, decoded) => {
        if (decoded) {
            res.send({ msg: "Welcome to purchase" });
        } else {
          console.log(err);
          res.send({ err: "please login to access this endpoint" });
        }
      });
    } catch (err) {
      console.log("ERROR", err);
      res.send({ err: "some error occured" });
    }
 
});







app.listen(7500, async () => {
  try {
    await connection;
    console.log("Connected to db successfully");
  } catch (err) {
    console.log("ERROR in connecting to db");
    console.log(err);
  }
  console.log(`Listening at PORT 7500`);
});
