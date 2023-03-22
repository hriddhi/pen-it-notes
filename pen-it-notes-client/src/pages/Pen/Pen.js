import axios from "axios"
import { useLoaderData } from "react-router-dom"
import Header from "../../components/Header/Header"
import "./Pen.scss"

export const loader = async ({ params }) => {
  const { _id } = params

  const data = await axios
    .get(`/api/note/${_id}`)
    .then((res) => res.data)
    .then((res) => res.data)
    .catch((err) => console.error(err))

  return { ...params, data }
}

const Pen = () => {
  const { _id, data } = useLoaderData()

  return (
    <>
      <Header />
      <div className="container pen__container">
        <div className="row">
          <div className="col-md-8 col-sm-12">
            <div className="pen__card">
              <div className="pen__card-body">
                {data.title.length > 0 ? (
                  <div className="pen__card-text pen__card-text--title">
                    {data.title}
                  </div>
                ) : null}
                <div className="pen__card-text pen__card-text--content">
                  {data.content}
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-4"></div>
        </div>
      </div>
    </>
  )
}

export default Pen
