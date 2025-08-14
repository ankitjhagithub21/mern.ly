import { BrowserRouter, Routes, Route } from "react-router-dom"
import HomePage from "./pages/HomePage"
import RegisterPage from "./pages/RegisterPage"
import LoginPage from "./pages/LoginPage"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import RedirectPage from "./pages/RedirectPage"
import LinksPage from "./pages/LinksPage"

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route exact path="/user/links" element={<LinksPage />} />
        <Route exact path="/:shortId" element={<RedirectPage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App