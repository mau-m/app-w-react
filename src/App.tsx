import React, { Suspense } from 'react';
import './App.css';
import './i18';
import { useTranslation } from 'react-i18next';
import ButtonGallery from './components/ButtonGallery';

// Definimos el tipo de idioma permitido (opcional pero recomendado)
type Language = 'es' | 'en';

function Welcome() {
  // Tipamos el hook de traducción
  const { i18n } = useTranslation();


  // Tipamos el parámetro del idioma
  const changeLanguage = (lng: Language): void => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="App">
      <header className="App-header">
        <div>
          <div className="language-selector">
            <button onClick={() => changeLanguage('es')}>Español</button>
            <button onClick={() => changeLanguage('en')}>English</button>
          </div>

          {/* Galería de botones */}
          <ButtonGallery />
        </div>
      </header>
    </div>
  );
}


function App(){
  return (
    // Suspense se usa por si las traducciones tardan en cargar
    <Suspense fallback={<div>Cargando...</div>}>
      <Welcome />
    </Suspense>
  );
}

export default App; 