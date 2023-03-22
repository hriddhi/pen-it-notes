const mongoose = require("mongoose")

const NoteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      default: "",
      trim: true,
      maxLength: [256, "Title can't be more than 256 characters long"],
    },
    content: {
      type: String,
      default: "",
      trim: true,
      maxLength: [4096, "Title can't be more than 4096 characters long"],
    },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model("Note", NoteSchema)
