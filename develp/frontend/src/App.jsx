import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar.jsx";
import HomePage from "./pages/HomePage.jsx";
import NotFound from "./pages/NotFound.jsx";
import Loading from "./pages/Loading.jsx";
import Entities from "./pages/Entities.jsx";
import Providers from "./pages/Providers.jsx";
import Graph from "./pages/Graph.jsx";

const App = () => {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        {/* Otras rutas de tu aplicación */}
        <Route path="/" element={<HomePage />} />
        {/* Ruta para mostrar el cargando mientras se cargan datos */}
        <Route path="/loading" element={<Loading />} />
        {/* Ruta para mostrar las entitidades */}
        <Route path="/entities" element={<Entities />} />
        {/* Ruta para mostrar los proveedores */}
        <Route path="/entities/:id" element={<Graph />} />
        <Route path="/providers" element={<Providers />} />
        <Route path="/providers/:id" element={<Graph />} />
        {/* Ruta 404 para manejar páginas no encontradas */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
