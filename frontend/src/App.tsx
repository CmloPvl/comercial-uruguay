import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Registro from "./pages/Registro"
import Perfil from "./pages/Perfil"
import Productos from "./pages/Productos"
import ProductoDetalle from "./pages/ProductoDetalle"
import CrearPublicacion from "./pages/CrearPublicacion"
import Carrito from "./pages/Carrito"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/perfil" element={<Perfil />} />
        <Route path="/productos" element={<Productos />} />
        <Route path="/producto/:id" element={<ProductoDetalle />} />
        <Route path="/crear-publicacion" element={<CrearPublicacion />} />
        <Route path="/carrito" element={<Carrito />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App