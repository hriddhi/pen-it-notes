import { useEffect, useState } from "react"
import axios from "axios"
import "./Home.scss"
import PenEditor from "../../components/PenEditor/PenEditor"
import { useLoaderData } from "react-router-dom"
import Header from "../../components/Header/Header"
import PenCard from "../../components/PenCard/PenCard"

const fetchNotes = async () => {
  return await axios
    .get(`/api/note`)
    .then((res) => res.data)
    .then((res) => res.data)
    .catch((err) => console.error(err))
}

export const loader = async () => {
  return fetchNotes()
}

const Home = () => {
  const [notes, setNotes] = useState(useLoaderData())
  const [windowSize, setWindowSize] = useState([
    window.innerWidth,
    window.innerHeight,
  ])

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowSize([window.innerWidth, window.innerHeight])
    }

    window.addEventListener("resize", handleWindowResize)

    return () => {
      window.removeEventListener("resize", handleWindowResize)
    }
  }, [])

  const handleSetNote = (note) => {
    setNotes([note, ...notes])
  }

  const handleDeleteNote = async (_id) => {
    console.log("_id", _id)
    try {
      await axios.delete(`/api/note`, { data: { _id } })
      setNotes(await fetchNotes())
    } catch (err) {
      console.error(err)
    }
  }

  const renderNotes = () => {
    return notes.map((note) => (
      <PenCard
        note={note}
        windowSize={windowSize}
        handleDeleteNote={handleDeleteNote}
      />
    ))
  }

  return (
    <>
      <Header />
      <div className="container p-3 pt-0">
        <div className="row">
          <div className="col-sm-12 col-md-8 col-lg-6 p-1 input-container">
            <PenEditor handleSetNote={handleSetNote} />
          </div>
          {renderNotes()}
        </div>
      </div>
    </>
  )
}

export default Home
