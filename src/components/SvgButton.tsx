import React from 'react';
import { useTranslation } from 'react-i18next';
import { getSvgUrl } from './utils';
import './Button.css';

/**
 * Props del componente SvgButton.
 * @param iconName - Nombre del ícono SVG a mostrar.
 * @param labelKey - Clave de traducción utilizada por i18n.
 * @param onClick - Función que se ejecuta al hacer clic en el botón.
 */
type SvgButtonProps = {
  iconName: string;      // nombre del ícono a mostrar
  labelKey: string;      // clave de traducción (i18n)
  onClick: () => void;   // función que se ejecuta al hacer clic
};


/**
 * Botón reutilizable que muestra un ícono SVG con una etiqueta traducida.
 */
const SvgButton: React.FC<SvgButtonProps> = ({ iconName, labelKey, onClick }) => {
  
   // Hook para obtener las traducciones
  const { t } = useTranslation();


  return (
    <div className="button-container">
      <button
        className="svg-button"
        onClick={onClick}
        aria-label={t(labelKey)}
      >
        <img src={getSvgUrl(iconName)} 
              alt={t(labelKey)} 
              className="button-icon" />
      </button>
      <span className="button-label">{t(labelKey)}</span>
    </div>
  );
};

export default SvgButton;