import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useTranslation } from 'react-i18next';
import './Registro.css';

/**
 * Props del componente Registro.
 * @param onBack - Función opcional para volver a la pantalla anterior.
 */
type RegistroProps = {
  onBack?: () => void;
};

/**
 * Estructura de los datos del formulario de registro.
 */
type FormValues = {
  name: string;
  first_lastname: string;
  second_lastname: string;
  birthdate: string;
  email: string;
  password: string;
};

/**
 * Componente de formulario para registrar un nuevo usuario.
 */
function Registro({ onBack }: RegistroProps) {
  const { t } = useTranslation();

   /**
   * Estado que almacena los valores del formulario.
   */
  const [values, setValues] = useState<FormValues>({
    name: "",
    first_lastname: "",
    second_lastname: "",
    birthdate: "",
    email: "",
    password: ""
  });

  /**
   * Actualiza el estado cuando cambia un campo del formulario.
   */
  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = event.target;
    setValues(prev => ({ ...prev, [name]: value }));
  };

  /**
   * Maneja el envío del formulario de registro.
   */
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

   /**
   * Regresa a la pantalla anterior.
   */
  const handleBack = () => onBack ? onBack() : window.history.back();

  return (
    <div className="registro-container">
      <h2>{t('registro.title')}</h2>
      <p className="subtitle">{t('registro.subtitle')}</p>

      <form onSubmit={handleSubmit} className="registro-form">
        {/* Campo Nombre */}
        <div className="form-group">
          <label htmlFor="name">{t('registro.nameLabel')}:</label>
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
          <label htmlFor="first_lastname">{t('registro.firstLastnameLabel')}:</label>
          <input
            type="text"
            id="first_lastname"
            name="first_lastname"
            value={values.first_lastname}
            onChange={handleInputChange}
            className="form-input"
            required
          />
        </div>

        {/* Campo Segundo Apellido */}
        <div className="form-group">
          <label htmlFor="second_lastname">{t('registro.secondLastnameLabel')}:</label>
          <input
            type="text"
            id="second_lastname"
            name="second_lastname"
            value={values.second_lastname}
            onChange={handleInputChange}
            className="form-input"
          />
        </div>

        {/* Campo Fecha de Nacimiento */}
        <div className="form-group">
          <label htmlFor="birthdate">{t('registro.birthdateLabel')}:</label>
          <div className="date-input-container">
            <input
              type="date"
              id="birthdate"
              name="birthdate"
              value={values.birthdate}
              onChange={handleInputChange}
              className="form-input"
              required
            />
          </div>
        </div>

        {/* Campo Email */}
        <div className="form-group">
          <label htmlFor="email">{t('registro.emailLabel')}:</label>
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

        {/* Campo Contraseña */}
        <div className="form-group">
          <label htmlFor="password">{t('registro.passwordLabel')}:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={values.password}
            onChange={handleInputChange}
            className="form-input"
            required
            minLength={6} // en TS se usa número, no string
          />
        </div>

        {/* Botón de Continuar */}
        <button type="submit" className="submit-button">
          {t('registro.submitButton')}
        </button>
      </form>

      {/* Botón de Volver */}
      <button onClick={handleBack} className="back-button">
        {t('registro.backButton')}
      </button>
    </div>
  );
}

export default Registro;  