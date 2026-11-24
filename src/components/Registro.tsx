import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import Button from './Button';
import { getSvgUrl } from './utils';
import './Registro.css';

/**
 * Props del componente Registro.
 * @param onBack - Función opcional para regresar a la pantalla anterior.
 */
interface RegistroProps {
  onBack?: () => void; // Función opcional para volver atrás
}


/**
 * Estado que representa el progreso de cada formulario.
 * Cada propiedad indica si la sección correspondiente está completa.
 * 
 * @property personal - Estado del formulario de datos personales.
 * @property cuenta - Estado del formulario de cuenta.
 * @property direccion - Estado del formulario de dirección.
 * @property fotografia - Estado del formulario de fotografía.
 */
interface CompletedForms {
  personal: boolean;
  cuenta: boolean;
  direccion: boolean;
  fotografia: boolean;
}

/**
 * Componente Registro.
 * Actúa como panel principal del flujo de registro,
 * mostrando el progreso de cada sección y permitiendo navegación.
 */
const Registro: React.FC<RegistroProps> = ({ onBack }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [completedForms, setCompletedForms] = useState<CompletedForms>({
    personal: false,
    cuenta: false,
    direccion: false,
    fotografia: false
  });

  /**
   * Verifica si un formulario está completo.
   * Evalúa que todos los campos requeridos tengan valores válidos.
   * 
   * @param formData - Objeto con los datos del formulario.
   * @param requiredFields - Lista de campos obligatorios.
   * @returns true si todos los campos requeridos están completos.
   */
  const isFormComplete = (
    formData: Record<string, any> | null,
    requiredFields: string[]
  ): boolean => {
    if (!formData) return false;

    return requiredFields.every(field => {
      const value = formData[field];
      return value !== undefined && value !== null && value.toString().trim() !== "";
    });
  };

  /**
   * Efecto que verifica el estado de los formularios almacenados en localStorage.
   * Se ejecuta al montar el componente y cuando se dispara el evento 'storageUpdate'.
   */
  useEffect(() => {
    const checkFormCompletion = () => {
      try {
        const personalData = JSON.parse(localStorage.getItem('personalFormData') || 'null');
        const cuentaData = JSON.parse(localStorage.getItem('cuentaFormData') || 'null');
        const direccionData = JSON.parse(localStorage.getItem('direccionFormData') || 'null');

        setCompletedForms({
          personal: isFormComplete(personalData, ['name', 'firstsurname', 'dateOfBirth', 'gender', 'nationality']),
          cuenta: isFormComplete(cuentaData, ['telephone', 'email', 'username', 'user', 'password', 'role']),
          direccion: isFormComplete(direccionData, ['postcode', 'estate', 'CAText', 'ColText', 'Street', 'Exteriornumber']),
          fotografia: completedForms.fotografia // Se mantiene igual
        });
      } catch (error) {
        console.error("Error al verificar formularios:", error);
      }
    };

    checkFormCompletion();
    window.addEventListener('storageUpdate', checkFormCompletion);
    return () => window.removeEventListener('storageUpdate', checkFormCompletion);
  }, []);

  const handleButtonClick = (sectionName: keyof CompletedForms) => {
    navigate(`/registro/${sectionName}`);
  };

  return (
    <div className="registro-panel">
      <div className="logo-container"></div>

      <div className="registro-opciones">
        <div className="SCROLLBAR"></div>

        {/* Círculos de progreso */}
        <div className="circulos">
          {Object.entries(completedForms).map(([key, completed]) => (
            <div key={key} className={`circulo ${completed ? 'circulo-fuerte' : ''}`}>
              {completed && (
                <img
                  src={getSvgUrl('paloma')}
                  alt="Completado"
                  className="icono-paloma"
                />
              )}
            </div>
          ))}
        </div>

        <img src={getSvgUrl('logo-5')} alt="Logo" className="logo" />
        <h1>{t('registerTitle')}</h1>
        <div className="titulo-con-logo">
          <img src={getSvgUrl('Pantera')} alt="Logo" className="pantera-logo" />
          <h2>{t('fulanitoTitle')}</h2>
        </div>
        <div className="linea"></div>

        <Button
          iconName="Usuario"
          labelKey={t('personalTitle')}
          onClick={() => handleButtonClick('personal')}
          className="registro-opcion"
        />
        <Button
          iconName="Correo_electronico"
          labelKey={t('accountTitlee')}
          onClick={() => handleButtonClick('cuenta')}
          className="registro-opcion"
        />
        <Button
          iconName="add"
          labelKey={t('addressTitle')}
          onClick={() => handleButtonClick('direccion')}
          className="registro-opcion"
        />
        <Button
          iconName="Fotografía"
          labelKey={t('pictureTitle')}
          onClick={() => handleButtonClick('fotografia')}
          className="registro-opcion"
        />

        <button type="submit" className="boton">{t('RegistrarBoton')}</button>
      </div>

      <button className="back-button" onClick={() => navigate('/botones')}>
        <img src={getSvgUrl('Retroceder')} alt="Regresar" className="button-icon" />
      </button>
    </div>
  );
};

export default Registro;
