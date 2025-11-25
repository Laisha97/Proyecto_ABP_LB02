import { Routes, Route, useLocation } from "react-router-dom"
import Navbar from './Components/Navbar'
import Home from './Screens/Home.jsx'
import Inicio from './Screens/Inicio.jsx'
import Proyecto1 from './pages/Proyecto1.jsx'
import Proyecto2 from './pages/Proyecto2.jsx'
import Proyecto2n2 from './pages/Proyecto2n2.jsx'
import Proyecto1n2 from './pages/Proyecto1n2.jsx'
import Info from './Screens/Info.jsx'
import Beneficios from './Screens/Beneficios.jsx'
import { useEffect } from "react"

function ScrollToSection() {
  const location = useLocation()

  useEffect(() => {
    let sectionId = null

    if (location.hash) {
      sectionId = location.hash.replace("#", "")
    }

    const params = new URLSearchParams(location.search)
    if (params.get("scroll")) {
      sectionId = params.get("scroll")
    }

    if (sectionId) {
      setTimeout(() => {
        const element = document.getElementById(sectionId)
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" })
        }
      }, 300)
    }
  }, [location])

  return null
}


function AppRoutes() {
  const location = useLocation()
  const showNavbar = location.pathname !== '/'

  return (
    <>
      {showNavbar && <Navbar />}
      <ScrollToSection />
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/home" element={<Home />} />
        <Route path="/proyecto1" element={<Proyecto1 />} />
        <Route path="/proyecto2" element={<Proyecto2 />} />
        <Route path="/proyecto1n2" element={<Proyecto1n2 />} />
        <Route path="/proyecto2n2" element={<Proyecto2n2 />} />
        <Route path="/Info" element={<Info />} />
        <Route path="/Beneficios" element={<Beneficios />} />
      </Routes>
    </>
  )
}

export default AppRoutes
