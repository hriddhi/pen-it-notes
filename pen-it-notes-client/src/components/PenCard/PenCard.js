import { useNavigate } from "react-router-dom"
import moment from "moment"
import { MdDelete, MdSave } from "react-icons/md"
import "./PenCard.scss"
import { toPng } from "html-to-image"
import React, { useRef } from "react"

const PenCard = ({ note, windowSize, handleDeleteNote }) => {
  const navigate = useNavigate()
  const ref = useRef(null)

  const handleNoteCardClick = (note) => {
    navigate(`/pen/${note._id}`)
  }

  const generateImage = () => {
    // ref.current.style.background =
    //   "linear-gradient(rgba(255,255,255,0.5), rgba(255,255,255,0.5)), linear-gradient(45deg, #0ed100, #00bfff)"
    toPng(ref.current, {
      cacheBust: true,
      style: {
        background:
          "linear-gradient(rgba(255,255,255,0.5), rgba(255,255,255,0.5)), linear-gradient(45deg, #0ed100, #00bfff)",
      },
    })
      .then((dataUrl) => {
        const link = document.createElement("a")
        link.download = `${note._id}.png`
        link.href = dataUrl
        link.click()
      })
      .catch((err) => console.error(err))
  }

  return (
    <div key={note._id} className="col-sm-12 col-md-4 col-lg-3 p-1">
      <div className="card pen-card__container">
        <div
          ref={ref}
          className="card-body pen-card__body"
          onClick={() =>
            windowSize[0] >= 768 ? handleNoteCardClick(note) : null
          }
        >
          {note.title.length > 0 ? (
            <div className="mb-1 pen-card__text--title">{note.title}</div>
          ) : null}
          <div className="pen-card__text--content">{note.content}</div>
          <div className="pen-card__text--metadata">
            {moment(note.createdAt).format("LLL")}
          </div>
        </div>
        <div className="pen-card__action-container pen-card__action-container--md">
          <MdDelete
            className="mb-2"
            opacity={0.9}
            size={24}
            cursor="pointer"
            onClick={() => handleDeleteNote(note._id)}
          />
          <MdSave
            opacity={0.9}
            size={24}
            cursor="pointer"
            onClick={() => generateImage()}
          />
        </div>
        <div className="pen-card__action-container pen-card__action-container--sm">
          <MdDelete
            opacity={0.9}
            size={28}
            cursor="pointer"
            style={{ marginRight: 8 }}
            onClick={() => handleDeleteNote(note._id)}
          />
          <MdSave
            opacity={0.9}
            size={28}
            cursor="pointer"
            onClick={() => generateImage()}
          />
          <div
            className="pen-card__view-btn pen-card__view-btn--outer"
            onClick={() => handleNoteCardClick(note)}
          >
            More
          </div>
        </div>
      </div>
    </div>
  )
}

export default PenCard
