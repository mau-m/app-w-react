import React, { useState, FC } from 'react';
import { useTranslation } from 'react-i18next';
import { getSvgUrl } from './utils';
import Botones from './Botones';
import './Login.css';
import { useNavigate } from 'react-router-dom';

/**
 * Componente Login.
 * Permite al usuario ingresar sus credenciales para autenticarse en la aplicación.
 * Maneja estado local para email, contraseña y estado de sesión.
 */
const Login: FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  
  /**
   * Estado que indica si el usuario ha iniciado sesión.
   * Actualmente no se utiliza en la lógica, pero puede servir para control futuro.
   */
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  
  /**
   * Maneja el envío del formulario de login.
   * Previene el comportamiento por defecto, registra los datos
   * y redirige al usuario a la pantalla principal.
   * 
   * @param e - Evento de envío del formulario.
   */
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Login:', email, password);
    navigate('/botones');
  };

  return (
    <div className="pagina-login">
      <div className="logo-1">
        <img src={getSvgUrl('logo-5')} alt="Logo principal" className="logo-principal" />
      </div>
      <div className="logo-2">
        <img src={getSvgUrl('UsuarioLogin')} alt="Logo de usuario" className="logo-usuario" />
      </div>
      <div className="inicio">
        <h1 className="titulo-app">{t('title')}</h1>
        <h2 className="subtitulo">{t('subtitle')}</h2>

        <form onSubmit={handleSubmit}>
          <div className="grupo">
            <label>{t('email')}</label>
            <input
              type="email"
              className="campo"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="grupo">
            <label>{t('password')}</label>
            <input
              type="password"
              className="campo"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="opciones">
            <label className="recordar">
              <input type="checkbox" /> {t('remember')}
            </label>
          </div>
          <button type="submit" className="boton">{t('login')}</button>
          <a href="forgot" className="olvidar">{t('forgot')}</a>
        </form>
      </div>
    </div>
  );
};

export default Login;
