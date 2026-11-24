import './App.css';
import { useTranslation } from 'react-i18next';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Login from './components/Login';
import Botones from './components/Botones';
import Registro from './components/Registro';
import Personal from './components/Personal';
import Cuenta from './components/Cuenta';
import Direccion from './components/Direccion';
import Fotografia from './components/Fotografia';

/**
 * Componente principal de la aplicación.
 * 
 * Configura el enrutamiento global utilizando React Router,
 * definiendo las rutas disponibles y los componentes asociados.
 */

const App: React.FC = () => {
  // i18n no se usa, pero lo dejamos por si lo necesitas después
  const { i18n } = useTranslation();

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/botones" element={<Botones />} />
          <Route path="/registro" element={<Registro />} />
          <Route path="/registro/personal" element={<Personal />} />
          <Route path="/registro/cuenta" element={<Cuenta />} />
          <Route path="/registro/direccion" element={<Direccion />} />
          <Route path="/registro/fotografia" element={<Fotografia />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
