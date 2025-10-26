import { Register } from "./components/auth/Register.jsx"
import { ApplicationViews } from "./views/ApplicationViews.jsx"
import { Authorized} from "./views/Authorized.jsx"
import { Routes, Route } from "react-router-dom"
import { Login } from "./components/auth/Login.jsx"

export const App = () => {
  return (
  <>
    <Routes>
      <Route path="/login" element={<Login />}/>
      <Route path="/register" element={<Register/>}/>
      <Route path="*" element={
        <Authorized>
          <ApplicationViews/>
        </Authorized>}/>  
    </Routes>
  </>
  )
}
