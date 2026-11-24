import React, { ChangeEvent, FormEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { getSvgUrl } from './utils';
import { useLocalStorage } from './useLocalStorage';
import './Personal.css';


/**
 * Props del componente Cuenta.
 * @param onBack - Función opcional para manejar la acción de regresar.
 */
interface CuentaProps {
  onBack?: () => void;
}

/**
 * Estructura de los valores del formulario de cuenta.
 * Define los campos controlados del formulario.
 * 
 * @property telephone - Número telefónico del usuario.
 * @property email - Correo electrónico.
 * @property username - Nombre visible o alias.
 * @property user - Usuario para autenticación.
 * @property password - Contraseña del usuario.
 * @property contract - Tipo o número de contrato (opcional).
 * @property occupation - Ocupación del usuario.
 * @property role - Rol asignado dentro del sistema.
 */
interface CuentaFormValues {
  telephone: string;
  email: string;
  username: string;
  user: string;
  password: string;
  contract?: string;
  occupation: string;
  role: string;
}

/**
 * Componente Cuenta.
 * Maneja la captura y persistencia de datos de una cuenta de usuario.
 * Utiliza localStorage para mantener los datos incluso después de recargar.
 */
const Cuenta: React.FC<CuentaProps> = ({ onBack }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [values, setValues] = useLocalStorage<CuentaFormValues>('cuentaFormData', {
    telephone: "",
    email: "",
    username: "",
    user: "",
    password: "",
    contract: "",
    occupation: "",
    role: ""
  });

  /**
   * Maneja los cambios en los inputs del formulario.
   * Actualiza dinámicamente el estado basado en el atributo "name".
   * 
   * @param event - Evento de cambio del input.
   */
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
  };

  /**
   * Maneja la acción de regresar a la pantalla anterior.
   * Redirige a la ruta '/registro'.
   * 
   * @param event - Evento de clic del botón.
   */
  const handleBack = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    navigate('/registro');
  };

  /**
   * Maneja el envío del formulario.
   * Guarda los datos en localStorage y dispara un evento personalizado.
   * 
   * @param event - Evento de envío del formulario.
   */
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    localStorage.setItem('cuentaFormData', JSON.stringify(values));
    window.dispatchEvent(new Event('storageUpdate'));
    console.log('Datos guardados:', values);
  };

  return (
    <div className="personal-container">
      <div className="personal-header">
        <img src={getSvgUrl('logo-5')} alt="Logo" className="personal-logo" />
      </div>
      <div className="personal-form-container">
        <h1 className="personal-title">{t('accountTitle')}</h1>
        <form onSubmit={handleSubmit} className="personal-form">

          {/* Campo Teléfono */}
          <div className="form-group">
            <label htmlFor="telephone" className="form-label">{t('TelephoneText')}*</label>
            <input
              type="tel"
              id="telephone"
              name="telephone"
              value={values.telephone}
              onChange={handleInputChange}
              className="form-input"
              required
            />
          </div>

          {/* Campo Correo electrónico */}
          <div className="form-group">
            <label htmlFor="email" className="form-label">{t('email')}*</label>
            <input
              type="email"
              id="email"
              name="email"
              value={values.email}
              onChange={handleInputChange}
              className="form-input"
              required
            />
          </div>

          {/* Campo Nombre de usuario */}
          <div className="form-group">
            <label htmlFor="username" className="form-label">{t('UserName')}*</label>
            <input
              type="text"
              id="username"
              name="username"
              value={values.username}
              onChange={handleInputChange}
              className="form-input"
              required
            />
          </div>

          {/* Campo Usuario */}
          <div className="form-group">
            <label htmlFor="user" className="form-label">{t('User')}*</label>
            <input
              type="text"
              id="user"
              name="user"
              value={values.user}
              onChange={handleInputChange}
              className="form-input"
              required
            />
          </div>

          {/* Campo Contraseña */}
          <div className="form-group">
            <label htmlFor="password" className="form-label">{t('password')}*</label>
            <input
              type="password"
              id="password"
              name="password"
              value={values.password}
              onChange={handleInputChange}
              className="form-input"
              required
            />
          </div>

          {/* Campo Carga u Ocupación */}
          <div className="form-group">
            <label htmlFor="occupation" className="form-label">{t('load or occupation')}</label>
            <input
              type="text"
              id="occupation"
              name="occupation"
              value={values.occupation}
              onChange={handleInputChange}
              className="form-input"
            />
          </div>

          {/* Campo Rol */}
          <div className="form-group">
            <label htmlFor="role" className="form-label">{t('rol')}*</label>
            <input
              type="text"
              id="role"
              name="role"
              value={values.role}
              onChange={handleInputChange}
              className="form-input"
              required
            />
          </div>

          {/* Botones */}
          <div className="form-buttons">
            <button type="button" className="back" onClick={handleBack}>
              <img src={getSvgUrl('Retroceder')} alt="Regresar" className="button-icon" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Cuenta;
