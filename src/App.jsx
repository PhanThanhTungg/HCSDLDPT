import { RouterProvider } from "react-router-dom"
import { routes } from "../routes/index"

const App = () => {
  return (
    <>
      <RouterProvider router={routes} />
    </>
  )
}
export default App
