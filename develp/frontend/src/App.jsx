import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import NotFound from "./pages/NotFound.jsx";
import Loading from "./pages/Loading.jsx";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Otras rutas de tu aplicación */}
        <Route path="/" element={<HomePage />} />
        {/* Ruta para mostrar el cargando mientras se cargan datos */}
        <Route path="/loading" element={<Loading />} />
        {/* Ruta 404 para manejar páginas no encontradas */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
