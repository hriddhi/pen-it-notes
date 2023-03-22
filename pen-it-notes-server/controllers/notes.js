const Note = require("../models/Note")

const createNote = async (req, res) => {
  const { title, content } = req.body
  console.log(title, content)

  if (title === "" && content === "")
    return res
      .status(400)
      .json({ err: { message: "Both title and content cannot be empty" } })

  try {
    const data = await Note.create({ title, content })
    res.status(201).json({ data })
  } catch (err) {
    res.status(400).json({ err })
  }
}

const getAllNotes = async (req, res) => {
  try {
    let data = await Note.find({}).sort({ createdAt: -1 }).lean()
    data = data.map((e) =>
      e.content.length > 500
        ? { ...e, content: e.content.slice(0, 500), sliced: true }
        : { ...e, sliced: false }
    )
    res.status(200).json({ data })
  } catch (err) {
    console.error(err)
    res.status(400).json({ err })
  }
}

const getSingleNote = async (req, res) => {
  const { _id } = req.params

  try {
    const data = await Note.findOne({ _id })
    res.status(200).json({ data })
  } catch (err) {
    res.status(400).json({ err })
  }
}

const updateNote = async (req, res) => {
  const { _id, title, content } = req.body

  try {
    const data = await Note.findByIdAndUpdate(
      _id,
      { title, content },
      { returnDocument: "after" }
    )
    if (!data)
      return res.status(404).json({ err: `Note not found with ID ${_id}` })
    res.status(200).json({ data })
  } catch (err) {
    res.status(400).json({ err })
  }
}

const deleteNote = async (req, res) => {
  const { _id } = req.body

  try {
    const data = await Note.findByIdAndRemove(_id)
    if (!data)
      return res.status(404).json({ err: `Note not found with ID ${_id}` })
    res.status(200).json({ data })
  } catch (err) {
    res.status(400).json({ err })
  }
}

module.exports = {
  createNote,
  updateNote,
  deleteNote,
  getAllNotes,
  getSingleNote,
}
