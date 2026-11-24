import React from 'react';
import { useTranslation } from 'react-i18next'; // Hook para traducciones
import { getSvgUrl } from './utils'; // Se obtiene la URL de los iconos SVG

/**
 * Props del componente Button.
 * @param iconName - Nombre del icono SVG a mostrar.
 * @param labelKey - Clave de traducción para el texto del botón.
 * @param onClick - Función opcional que se ejecuta al hacer clic.
 * @param className - Clase CSS opcional para estilos adicionales.
 */
interface ButtonProps {
  iconName: string;         
  labelKey: string;         
  onClick?: () => void;     
  className?: string; 
}


/**
 * Botón reutilizable que muestra un ícono SVG con un label traducido.
 * Permite pasar un handler de clic opcional.
 */

const Button: React.FC<ButtonProps> = ({ iconName, labelKey, onClick }) => {
  const { t } = useTranslation(); // Obtiene la función de traducción

  return (
    <div className="button-container">
      <button
        className="svg-button"
        onClick={onClick}
        aria-label={t(labelKey)}
      >
        <img
          src={getSvgUrl(iconName)} // Obtiene la URL del SVG
          alt=""
          className="button-icon" // Clase CSS para el icono
        />
      </button>
      <span className="button-label">{t(labelKey)}</span>
    </div>
  );
};

export default Button;
