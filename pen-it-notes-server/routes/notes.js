const express = require("express")

const router = express.Router()

const {
  getAllNotes,
  getSingleNote,
  createNote,
  updateNote,
  deleteNote,
} = require("../controllers/notes")

router
  .get("/", getAllNotes)
  .get("/:_id", getSingleNote)
  .post("/", createNote)
  .put("/", updateNote)
  .delete("/", deleteNote)

module.exports = router
