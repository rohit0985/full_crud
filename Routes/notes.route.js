const express = require("express");
const NoteRouter = express.Router();
var jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { isAuthrised } = require("../Middlewares/authorization");

const { NoteModel } = require("../Models/Note.model");

NoteRouter.get("/", async (req, res) => {
  try {
    const notes = await NoteModel.find();
    res.send(notes);
  } catch (err) {
    console.log("ERROR", err);
    res.send({ err: "error occured" });
  }
});

NoteRouter.post("/create", isAuthrised, async (req, res) => {
  const payload = req.body;
  try {
    await NoteModel.create(req.body);
    res.send({ msg: "note created" });
  } catch (err) {
    console.log("ERROR", err);
    res.send({ err: "error occured" });
  }
});

NoteRouter.patch("/update/:noteID", isAuthrised, async (req, res) => {
  const paylod = req.body;
  const { noteID } = req.params;
  try {
    const note = await NoteModel.findOne({ _id: noteID });
    if (note.userID === paylod.userID) {
      console.log(note.userID, paylod.userID);
      await NoteModel.findByIdAndUpdate({ _id: noteID }, paylod);
      res.send({ msg: "note updated" });
    } else {
      res.send({ err: "excess denied" });
    }
  } catch (err) {
    console.log("ERROR", err);
    res.send({ err: "error occured" });
  }
});

NoteRouter.delete("/delete/:noteID", isAuthrised, async (req, res) => {
  const { noteID } = req.params;
  const payload = req.body;
  try {
    const note = await NoteModel.findOne({ _id: noteID });
    if (note.userID === payload.userID) {
      await NoteModel.findByIdAndDelete({ _id: noteID });
      res.send({ msg: "note deleted" });
    } else {
      res.send({ err: "excess denied" });
    }
  } catch (err) {
    console.log("ERROR", err);
    res.send({ err: "error occured" });
  }
});




module.exports = { NoteRouter };
