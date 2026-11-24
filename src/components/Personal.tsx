import React, { ChangeEvent, FormEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { getSvgUrl } from './utils';
import { useLocalStorage } from './useLocalStorage';
import './Personal.css';

/**
 * Props del componente Personal.
 * @param onBack - Función opcional para manejar la acción de regresar.
 */
interface PersonalProps {
  onBack?: () => void;
}

/**
 * Estructura de los valores del formulario personal.
 * Representa la información básica del usuario.
 * 
 * @property name - Nombre(s) del usuario.
 * @property firstsurname - Primer apellido.
 * @property secondsurname - Segundo apellido.
 * @property dateOfBirth - Fecha de nacimiento.
 * @property gender - Género del usuario.
 * @property nationality - Nacionalidad.
 */
interface PersonalFormValues {
  name: string;
  firstsurname: string;
  secondsurname: string;
  dateOfBirth: string;
  gender: string;
  nationality: string;
}

/**
 * Componente Personal.
 * Permite capturar información personal del usuario
 * y persistirla en localStorage.
 */
const Personal: React.FC<PersonalProps> = ({ onBack }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  /**
   * Estado del formulario sincronizado con localStorage.
   * La clave 'personalFormData' permite persistir los datos.
   */
  const [values, setValues] = useLocalStorage<PersonalFormValues>('personalFormData', {
    name: "",
    firstsurname: "",
    secondsurname: "",
    dateOfBirth: "",
    gender: "",
    nationality: ""
  });

  /**
   * Maneja cambios en los inputs del formulario.
   * Actualiza dinámicamente el estado usando la propiedad "name".
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
    localStorage.setItem('personalFormData', JSON.stringify(values));
    window.dispatchEvent(new Event('storageUpdate'));
    console.log('Datos guardados:', values);
  };

  return (
    <div className="personal-container">
      <div className="personal-header">
        <img src={getSvgUrl('logo-5')} alt="Logo" className="personal-logo" />
      </div>
      <div className="personal-form-container">
        <h1 className="personal-title">{t('personalTitle')}</h1>
        <form onSubmit={handleSubmit} className="personal-form">
          {/* Campo Nombre */}
          <div className="form-group">
            <label htmlFor="name" className="form-label">{t('name')}*</label>
            <input
              type="text"
              id="name"
              name="name"
              value={values.name}
              onChange={handleInputChange}
              className="form-input"
              required
            />
          </div>

          {/* Campo Primer Apellido */}
          <div className="form-group">
            <label htmlFor="firstsurname" className="form-label">{t('firstsurname')}*</label>
            <input
              type="text"
              id="firstsurname"
              name="firstsurname"
              value={values.firstsurname}
              onChange={handleInputChange}
              className="form-input"
              required
            />
          </div>

          {/* Campo Segundo Apellido */}
          <div className="form-group">
            <label htmlFor="secondsurname" className="form-label">{t('secondsurname')}</label>
            <input
              type="text"
              id="secondsurname"
              name="secondsurname"
              value={values.secondsurname}
              onChange={handleInputChange}
              className="form-input"
            />
          </div>

          {/* Campo Fecha de Nacimiento */}
          <div className="form-group">
            <label htmlFor="dateOfBirth" className="form-label">{t('Date of Birth')}*</label>
            <input
              type="date"
              id="dateOfBirth"
              name="dateOfBirth"
              value={values.dateOfBirth}
              onChange={handleInputChange}
              className="form-input"
              required
            />
          </div>

          {/* Campo Género */}
          <div className="form-group">
            <label htmlFor="gender" className="form-label">{t('Gener')}*</label>
            <input
              type="text"
              id="gender"
              name="gender"
              value={values.gender}
              onChange={handleInputChange}
              className="form-input"
              required
            />
          </div>

          {/* Campo Nacionalidad */}
          <div className="form-group">
            <label htmlFor="nationality" className="form-label">{t('Nationality')}*</label>
            <input
              type="text"
              id="nationality"
              name="nationality"
              value={values.nationality}
              onChange={handleInputChange}
              className="form-input"
              required
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

export default Personal;
