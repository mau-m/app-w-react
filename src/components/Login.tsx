import React, { useState, FC, FormEvent, ChangeEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { getSvgUrl } from './utils';
//import Botones from './Botones';
import './Login.css';
import { useNavigate } from 'react-router-dom';
import axios, {AxiosResponse} from 'axios';

const API_BASE_URL =
  process.env.REACT_APP_API_URL || 'http://developer.jquiroz.net:3005';

/**
 * Interfaz que describe la respuesta del login.
 * Contiene tokens de acceso y refresco.
 */
interface LoginResponse {
  accessToken: string;
  refreshToken: string;
}

/**
 * Componente Login.
 * Permite al usuario autenticarse contra la API y guardar sus tokens.
 */
const Login: FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  // Estados tipados
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  /**
   * Actualiza el estado de email o contraseña según el campo modificado.
   * @param event - Evento de cambio del input.
   */
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    if (name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  };

  
  /**
   * Maneja el envío del formulario de login.
   * Realiza llamada POST a la API y guarda tokens en localStorage si la respuesta es válida.
   * 
   * @param e - Evento de envío del formulario
   */
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Login:', email, password);

    try {
      const user = {
        email: email,
        password: password
      };
       // Llamada POST a la API de login
       const response: AxiosResponse<LoginResponse> = await axios.post(
        `${API_BASE_URL}/api/users/login`,
        user,
        {
          headers: {
            'Content-Type': 'application/json',
            accept: '*/*'
          }
        }
      );

      
       // Verifica si la respuesta es correcta y guarda tokens
      if (response.status === 200 && response.data.accessToken) {
        localStorage.setItem('accessToken', response.data.accessToken);
        localStorage.setItem('refreshToken', response.data.refreshToken);
         // Navega a la pantalla principal de botones
        navigate('/botones');
      } else {
        throw new Error('Respuesta inválida del servidor');
      }

    } catch (error) {
      console.error('Error en el login:', error);
      alert('Error al iniciar sesión. Intenta nuevamente.');
    }
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
            name="email"
            className="campo"
            value={email}
            onChange={handleChange}
          />
          </div>
          <div className="grupo">
            <label>{t('password')}</label>
            <input
            type="password"
            name="password"
            className="campo"
            value={password}
            onChange={handleChange}
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
