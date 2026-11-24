import React from 'react';
import { useTranslation } from 'react-i18next';
import { getSvgUrl } from './utils';
import './Fotografia.css';
import { useNavigate } from 'react-router-dom';

/**
 * Props del componente Fotografia.
 * @param onBack - Función opcional para manejar la acción de regresar.
 */
interface FotografiaProps {
  onBack?: () => void; 
}

/**
 * Componente Fotografia.
 * Muestra instrucciones para la carga de una fotografía del usuario,
 * incluyendo requisitos y acciones de navegación.
 */
const Fotografia: React.FC<FotografiaProps> = ({ onBack }) => {
  
  /** Hook para traducciones (i18n) */
  const { t } = useTranslation();
  /** Hook para navegación entre rutas */
  const navigate = useNavigate();

  return (
    <div className="fotografia-container">
      <img src={getSvgUrl('logo-5')} alt="Logo" className="logo" />

      <h1 className="fotografia-title">{t('PictureTitle')}</h1>

      <img src={getSvgUrl('account')} alt="Foto" className="picture" />

      <div className="instructions-container">
        <p className="instruction-text">{t('TextOne')}</p>

        <ul className="requirements-list">
          <li className="requirement">{t('TextTwo')}</li>
          <li className="requirement">{t('TextThree')}</li>
          <li className="requirement">{t('TextFour')}</li>
          <li className="requirement">{t('TextFive')}</li>
          <li className="requirement">{t('TextSix')}</li>
        </ul>
      </div>

      <div className="botton">
        <button
          className="back"
          onClick={onBack}
        >
          <img src={getSvgUrl('Retroceder')} alt="Regresar" className="button-icon" />
        </button>

        <button
          className="back"
          onClick={() => navigate('/registro')}
        >
          <img src={getSvgUrl('Retroceder')} alt="Regresar" className="button-icon" />
        </button>

        <button className="continue-button">
          {t('ContinueButton')}
        </button>
      </div>
    </div>
  );
};

export default Fotografia;
