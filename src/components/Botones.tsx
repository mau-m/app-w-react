import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Button from './Button';
import { getSvgUrl } from './utils';
import './Botones.css';
import Registro from './Registro';
import { useNavigate } from 'react-router-dom';


/**
 * Acciones disponibles para los botones del menú.
 */
const ACTIONS = {
  ACCOUNT: 'account',
  REGISTER: 'register',
  PRODUCTS: 'products',
  PENDING: 'pending',
  LOGOUT: 'logout'
} as const;

/**
 * Tipo que representa todas las acciones posibles del menú.
 */
type ActionType = typeof ACTIONS[keyof typeof ACTIONS];

/**
 * Componente que renderiza el menú principal con botones de navegación.
 */
const Botones: React.FC = () => {

  const { t } = useTranslation();
  const navigate = useNavigate();
   
  /**
   * Estado que controla si se muestra el componente Registro.
   */
  const [showRegistro, setShowRegistro] = useState<boolean>(false); // Estado tipado

  useEffect(() => {
    /**
   * Se ejecuta al montar el componente.
   * Limpia datos almacenados previamente en localStorage.
   */
    localStorage.removeItem('personalFormData');
    localStorage.removeItem('cuentaFormData');
    localStorage.removeItem('direccionFormData');
  }, []);

   /**
   * Maneja la acción cuando se presiona un botón del menú.
   * @param buttonName - Acción asociada al botón seleccionado.
   */
  const handleButtonClick = (buttonName: ActionType) => {
    console.log(`Botón clickeado: ${buttonName}`);

     // Navega a la pantalla de registro
    if (buttonName === ACTIONS.REGISTER) {
      navigate('/registro');
    }
     // Redirige al inicio al cerrar sesión
    if (buttonName === ACTIONS.LOGOUT){
      navigate('/')
    }
  };

  if (showRegistro) {
    return <Registro onBack={() => setShowRegistro(false)} />;
  }

  return (
    <div className="Container">
      <div className="logo-container">
        <img src={getSvgUrl('logo-5')} alt="Logo principal" className="logo-principal" />
      </div>
      <div className="buttons-container">
        <Button
          iconName="Usuario"
          labelKey={t('accountTitle')}
          onClick={() => handleButtonClick(ACTIONS.ACCOUNT)}
        />

        <Button
          iconName="Usuario"
          labelKey={t('registerTitle')}
          onClick={() => handleButtonClick(ACTIONS.REGISTER)}
        />

        <Button
          iconName="Usuario"
          labelKey={t('productsTitle')}
          onClick={() => handleButtonClick(ACTIONS.PRODUCTS)}
        />

        <Button
          iconName="Usuario"
          labelKey={t('pendingTitle')}
          onClick={() => handleButtonClick(ACTIONS.PENDING)}
        />

        <Button
          iconName="Usuario"
          labelKey={t('pendingTitle')}
          onClick={() => handleButtonClick(ACTIONS.PENDING)}
        />

        <Button
          iconName="Cerrar_sesion"
          labelKey={t('logoutTitle')}
          onClick={() => handleButtonClick(ACTIONS.LOGOUT)}
        />
      </div>
    </div>
  );
};

export default Botones;
