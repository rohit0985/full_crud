const mongoose = require("mongoose")

const noteSchema = mongoose.Schema({
   "title": String,
   "content": String,
   "category": ["important", "urgent"],
   "userID" : ""
},{versionKey: false})

const NoteModel = mongoose.model("note", noteSchema)

module.exports = { NoteModel }