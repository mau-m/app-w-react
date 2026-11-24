import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import SvgButton from './SvgButton';
import Registro from './Registro';
import './Button.css';

/**
 * Acciones disponibles para los botones del menú.
 */

type ActionType =
  | 'account'
  | 'register'
  | 'notifications'
  | 'chatbot'
  | 'privacy'
  | 'logout';

/**
 * Mapa de acciones del menú para manejar los clics de forma centralizada.
 */
const ACTIONS: Record<string, ActionType> = {
  ACCOUNT: 'account',
  REGISTER: 'register',
  NOTIFICATIONS: 'notifications',
  CHATBOT: 'chatbot',
  PRIVACY: 'privacy',
  LOGOUT: 'logout',
};

/**
 * Componente que renderiza la galería de botones del menú principal.
 * Permite navegar a distintas secciones y abrir la vista de Registro.
 */
const ButtonGallery: React.FC = () => {
  const { t } = useTranslation();
   // Estado que controla si se muestra el componente Registro
  const [showRegistro, setShowRegistro] = useState<boolean>(false);

  /**
   * Maneja la acción al presionar un botón del menú.
   */  
  const handleButtonClick = (buttonName: ActionType): void => {
    if (buttonName === ACTIONS.REGISTER) {
      setShowRegistro(true);
    }
  };

   // Si el usuario entra a registro, se renderiza ese componente
  if (showRegistro) {
    
    return <Registro onBack={() => setShowRegistro(false)} />;
  }

  return (
    <div className="button-gallery">
      <div className="buttons-container">
        <SvgButton
          iconName="Usuario"
          labelKey={t('menu.accountTitle')}
          onClick={() => handleButtonClick(ACTIONS.ACCOUNT)}
        />

        <SvgButton
          iconName="Registro"
          labelKey={t('menu.registerTitle')}
          onClick={() => handleButtonClick(ACTIONS.REGISTER)}
        />

        <SvgButton
          iconName="Notificaciones"
          labelKey={t('menu.notificationsTitle')}
          onClick={() => handleButtonClick(ACTIONS.NOTIFICATIONS)}
        />

        <SvgButton
          iconName="Pantera"
          labelKey={t('menu.chatbotTitle')}
          onClick={() => handleButtonClick(ACTIONS.CHATBOT)}
        />

        <SvgButton
          iconName="Aviso_de_privacidad"
          labelKey={t('menu.privacyTitle')}
          onClick={() => handleButtonClick(ACTIONS.PRIVACY)}
        />

        <SvgButton
          iconName="Cerrar_sesion"
          labelKey={t('menu.logoutTitle')}
          onClick={() => handleButtonClick(ACTIONS.LOGOUT)}
        />
      </div>
    </div>
  );
};

export default ButtonGallery;