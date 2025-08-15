import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import HomePage from "./pages/HomePage"
import RegisterPage from "./pages/RegisterPage"
import LoginPage from "./pages/LoginPage"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import RedirectPage from "./pages/RedirectPage"
import LinksPage from "./pages/LinksPage"
import { useSelector } from "react-redux"

const App = () => {
  const {user} = useSelector(state=>state.auth)
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={user ? <Navigate to={"/"}/> : <RegisterPage />} />
        <Route path="/login" element={user ? <Navigate to={"/"}/> : <LoginPage/>} />
        <Route exact path="/user/links" element={user ? <LinksPage /> : <Navigate to={"/login"}/>} />
        <Route exact path="/:shortId" element={<RedirectPage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App