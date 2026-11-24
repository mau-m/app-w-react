import React, { ChangeEvent, FormEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { getSvgUrl } from './utils';
import { useLocalStorage } from './useLocalStorage';
import './Personal.css';

/**
 * Props del componente Direccion.
 * @param onBack - Función opcional para manejar la navegación hacia atrás.
 */
interface DireccionProps {
  onBack?: () => void;
}

/**
 * Estructura de los valores del formulario de dirección.
 * Representa los campos necesarios para capturar una dirección completa.
 * 
 * @property postcode - Código postal.
 * @property estate - Estado o entidad federativa.
 * @property CAText - Alcaldía o municipio.
 * @property ColText - Colonia.
 * @property Street - Nombre de la calle.
 * @property Exteriornumber - Número exterior.
 * @property Interiornumber - Número interior.
 * @property Reference - Referencias adicionales de la dirección.
 */
interface DireccionFormValues {
  postcode: string;
  estate: string;
  CAText: string;
  ColText: string;
  Street: string;
  Exteriornumber: string;
  Interiornumber: string;
  Reference: string;
}
/**
 * Componente Direccion.
 * Permite capturar y persistir la información de dirección del usuario.
 * Los datos se almacenan en localStorage para mantener persistencia.
 */
const Direccion: React.FC<DireccionProps> = ({ onBack }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  /**
   * Estado del formulario sincronizado con localStorage.
   * La clave 'direccionFormData' identifica los datos almacenados.
   */
  const [values, setValues] = useLocalStorage<DireccionFormValues>('direccionFormData', {
    postcode: "",
    estate: "",
    CAText: "",
    ColText: "",
    Street: "",
    Exteriornumber: "",
    Interiornumber: "",
    Reference: ""
  });

  /**
   * Maneja cambios en los inputs del formulario.
   * Actualiza dinámicamente el estado basado en el atributo "name".
   * 
   * @param event - Evento de cambio del input.
   */
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
  };

   /**
   * Maneja el envío del formulario.
   * Guarda los datos en localStorage y notifica mediante un evento personalizado.
   * 
   * @param event - Evento de envío del formulario.
   */
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    localStorage.setItem('direccionFormData', JSON.stringify(values));
    window.dispatchEvent(new Event('storageUpdate'));
    console.log('Datos guardados:', values);
  };

  return (
    <div className="personal-container">
      <div className="personal-header">
        <img src={getSvgUrl('logo-5')} alt="Logo" className="personal-logo" />
      </div>
      <div className="personal-form-container">
        <h1 className="personal-title">{t('addressTitle')}</h1>
        <form onSubmit={handleSubmit} className="personal-form">
          {/* Código postal */}
          <div className="form-group">
            <label htmlFor="postcode" className="form-label">{t('postcode')}*</label>
            <input
              type="text"
              id="postcode"
              name="postcode"
              value={values.postcode}
              onChange={handleInputChange}
              className="form-input"
              required
            />
          </div>

          {/* Estado */}
          <div className="form-group">
            <label htmlFor="estate" className="form-label">{t('estate')}*</label>
            <input
              type="text"
              id="estate"
              name="estate"
              value={values.estate}
              onChange={handleInputChange}
              className="form-input"
              required
            />
          </div>

          {/* Ciudad o alcaldía */}
          <div className="form-group">
            <label htmlFor="CAText" className="form-label">{t('CAText')}*</label>
            <input
              type="text"
              id="CAText"
              name="CAText"
              value={values.CAText}
              onChange={handleInputChange}
              className="form-input"
              required
            />
          </div>

          {/* Colonia */}
          <div className="form-group">
            <label htmlFor="ColText" className="form-label">{t('ColText')}*</label>
            <input
              type="text"
              id="ColText"
              name="ColText"
              value={values.ColText}
              onChange={handleInputChange}
              className="form-input"
              required
            />
          </div>

          {/* Calle */}
          <div className="form-group">
            <label htmlFor="Street" className="form-label">{t('Street')}*</label>
            <input
              type="text"
              id="Street"
              name="Street"
              value={values.Street}
              onChange={handleInputChange}
              className="form-input"
              required
            />
          </div>

          {/* Número exterior */}
          <div className="form-group">
            <label htmlFor="Exteriornumber" className="form-label">{t('Exteriornumber')}*</label>
            <input
              type="text"
              id="Exteriornumber"
              name="Exteriornumber"
              value={values.Exteriornumber}
              onChange={handleInputChange}
              className="form-input"
              required
            />
          </div>

          {/* Número interior */}
          <div className="form-group">
            <label htmlFor="Interiornumber" className="form-label">{t('Interiornumber')}</label>
            <input
              type="text"
              id="Interiornumber"
              name="Interiornumber"
              value={values.Interiornumber}
              onChange={handleInputChange}
              className="form-input"
            />
          </div>

          {/* Referencia */}
          <div className="form-group">
            <label htmlFor="Reference" className="form-label">{t('Reference')}</label>
            <input
              type="text"
              id="Reference"
              name="Reference"
              value={values.Reference}
              onChange={handleInputChange}
              className="form-input"
            />
          </div>

          <button className="back" onClick={() => navigate('/registro')}>
            <img src={getSvgUrl('Retroceder')} alt="Regresar" className="button-icon" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default Direccion;
