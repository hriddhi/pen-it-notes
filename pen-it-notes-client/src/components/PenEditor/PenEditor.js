import { useState } from "react"
import axios from "axios"
import "./PenEditor.scss"

const PenEditor = ({ handleSetNote }) => {
  const [inputTitle, setInputTitle] = useState("")
  const [inputContent, setInputContent] = useState("")
  const [isInputFocused, setIsInputFocused] = useState(false)

  const createNote = (title, content) => {
    console.log(title, content)
    axios
      .post(`/api/note`, { title, content })
      .then((res) => res.data)
      .then((res) => res.data)
      .then((note) => handleSetNote(note))
      .then(() => {
        setInputTitle("")
        setInputContent("")
      })
      .catch((err) => console.error(err))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    createNote(inputTitle, inputContent)
  }

  return (
    <form className="pen-editor" onSubmit={handleSubmit}>
      <div
        className="pen-editor__container"
        style={{
          backgroundColor: isInputFocused
            ? "rgba(255,255,255,0.3)"
            : "transparent",
        }}
      >
        <input
          className="form-control"
          type="text"
          placeholder="Name your pen"
          maxLength={256}
          value={inputTitle}
          onChange={(e) => setInputTitle(e.target.value)}
          onFocus={() => setIsInputFocused(true)}
          onBlur={() => setIsInputFocused(false)}
        />
        <textarea
          className="form-control"
          placeholder="What's on your mind today?"
          maxLength={4096}
          value={inputContent}
          onChange={(e) => setInputContent(e.target.value)}
          onFocus={() => setIsInputFocused(true)}
          onBlur={() => setIsInputFocused(false)}
        />
      </div>
      <div className="d-flex justify-content-end position-relative p-1">
        <button
          className="btn btn-sm btn-outline-light border-0 save-btn"
          type="submit"
          disabled={inputContent.length === 0 && inputTitle.length === 0}
        >
          Save
        </button>
      </div>
    </form>
  )
}

export default PenEditor
