import { HashRouter as Router, Routes, Route, useLocation } from "react-router-dom"
import Navbar from './Components/Navbar'
import Home from './screens/Home.jsx'
import Proyecto1 from './pages/Proyecto1'
import Proyecto2 from './pages/Proyecto2'
import Proyecto2n2 from './pages/Proyecto2n2'
import Proyecto1n2 from './pages/Proyecto1n2'
import Info from './Screens/Info.jsx'
import Beneficios from'./Screens/Beneficios.jsx'
import { useEffect } from "react"

function ScrollToSection() {
  const location = useLocation()

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace("#", "") // ejemplo: #projects → "projects"
      const element = document.getElementById(id)
      if (element) {
        setTimeout(() => {
        element.scrollIntoView({ behavior: "smooth" })
      }, 800)
     }
    }
  }, [location]);

  return null;
}

function App() {
  return (
    <Router>
      <Navbar /> 
      <ScrollToSection />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/proyecto1" element={<Proyecto1 key={window.location.pathname + Date.now()} />} />
        <Route path="/proyecto2" element={<Proyecto2 key={window.location.pathname + Date.now()} />} />
        <Route path="/proyecto1n2" element={<Proyecto1n2 key={window.location.pathname + Date.now()} />} />
        <Route path="/proyecto2n2" element={<Proyecto2n2 key={window.location.pathname + Date.now()} />} />
        <Route path="/Info" element={<Info/>} />
        <Route path="/Beneficios" element={<Beneficios/>} />
      </Routes>
    </Router>
  )
}

export default App
