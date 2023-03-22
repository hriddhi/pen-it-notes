const express = require("express")
const morgan = require("morgan")
const cors = require("cors")
require("dotenv").config()

require("./db/connect")

const app = express()

app.use(express.static("./public"))
app.use(express.json())
app.use(morgan("dev"))
app.use(cors())

const notes = require("./routes/notes")
app.use("/api/note", notes)

const port = process.env.PORT || "8080"

app.listen(port, () => {
  console.log(`Express server listening on port ${port}`)
})
