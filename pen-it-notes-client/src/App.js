import Home, { loader as homeLoader } from "./pages/Home/Home"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import "./App.scss"
import Pen, { loader as penLoader } from "./pages/Pen/Pen"

const router = createBrowserRouter([
  {
    path: "/",
    loader: homeLoader,
    element: <Home />,
  },
  {
    path: "/pen/:_id",
    loader: penLoader,
    element: <Pen />,
  },
])

const App = () => {
  return <RouterProvider router={router} />
}

export default App
