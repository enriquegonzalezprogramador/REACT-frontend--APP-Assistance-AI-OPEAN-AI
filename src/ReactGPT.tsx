import { RouterProvider } from "react-router-dom"
import { router } from "./presentation/router"
import './index.css';

export const ReactGPT = () => {
  return (
    <RouterProvider router={ router }/>
  )
}
