const express = require("express");
const UserRouter = express.Router();
var jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const { UserModel } = require("../Models/User.model");

UserRouter.get("/", async (req, res) => {
  try {
    const users = await UserModel.find();
    res.send(users);
  } catch (err) {
    console.log("ERROR", err);
    res.send({ err: "error occured" });
  }
});

UserRouter.post("/signup", async (req, res) => {
  const payload = req.body;

  const { name, age, email, password } = payload;
  try {
    bcrypt.hash(password, 5, async function (err, hash) {
      const user = new UserModel({ name, age, email, password: hash });
      await user.save();
      res.send({ mgs: "user created" });
    });
  } catch (err) {
    console.log("ERROR", err);
    res.send({ err: "error occured" });
  }
});

UserRouter.post("/signin", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.find({ email });
    if (user.length > 0) {
      bcrypt.compare(password, user[0].password, function (err, result) {
        if (result) {
          var token = jwt.sign({ userId: user[0]._id }, "secret");
          
          res.send({ msg: "Login successfully", name: user[0].name, token: token });
        } else {
         
          res.send({ err: "error occured" });
        }
        
      });
    } else {
      res.send({ err: "error occured" });
    }
  } catch (err) {
    console.log("ERROR", err);
    res.send({ err: "error occured" });
  }
});

UserRouter.patch("/update/:id", async (req, res) => {
  const payload = req.body;
  const { id } = req.params;
  try {
    await UserModel.findByIdAndUpdate({ _id: id }, payload);
    res.send({ mgs: "user updated" });
  } catch (err) {
    console.log("ERROR", err);
    res.send({ err: "error occured" });
  }
});

UserRouter.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await UserModel.findByIdAndDelete({ _id: id });
    res.send({ mgs: "user delted" });
  } catch (err) {
    console.log("ERROR", err);
    res.send({ err: "error occured" });
  }
});

module.exports = { UserRouter };
