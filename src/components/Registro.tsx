import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import Button from "./Button";
import { getSvgUrl } from "./utils";
import axios from "axios";
import "./Registro.css";

const API_BASE_URL =
  process.env.REACT_APP_API_URL || "http://developer.jquiroz.net:3005";


/**
 * Props del componente Registro.
 * @param onBack - Función opcional que se ejecuta al volver atrás.
 */
interface RegistroProps {
  onBack?: () => void;
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
 * Datos personales del usuario almacenados en localStorage.
 * @property name - Nombre del usuario.
 * @property firstsurname - Primer apellido del usuario.
 * @property secondsurname - Segundo apellido del usuario (opcional).
 * @property dateOfBirth - Fecha de nacimiento en formato YYYY-MM-DD.
 * @property gender - Género del usuario (por ejemplo: "Masculino", "Femenino").
 * @property nationality - Nacionalidad del usuario.
 */
interface PersonalFormData {
  name: string;
  firstsurname: string;
  secondsurname?: string;
  dateOfBirth: string;
  gender: string;
  nationality: string;
}

/**
 * Datos de la cuenta del usuario almacenados en localStorage.
 * @property telephone - Número de teléfono de contacto.
 * @property email - Correo electrónico del usuario.
 * @property username - Nombre de usuario para login.
 * @property user - Usuario secundario o alias (opcional).
 * @property password - Contraseña de la cuenta.
 * @property role - Rol del usuario (ejemplo: "admin", "user").
 * @property occupation - Ocupación del usuario (opcional).
 */
interface CuentaFormData {
  telephone: string;
  email: string;
  username: string;
  user?: string;
  password: string;
  role: string;
  occupation?: string;
}
/**
 * Dirección del usuario almacenada en localStorage.
 * @property postcode - Código postal.
 * @property estate - Estado o provincia.
 * @property CAText - Ciudad.
 * @property ColText - Colonia o barrio.
 * @property Street - Calle principal.
 * @property Exteriornumber - Número exterior de la dirección.
 * @property Interiornumber - Número interior o apartamento (opcional).
 * @property Reference - Referencias adicionales de la dirección (opcional).
 */
interface DireccionFormData {
  postcode: string;
  estate: string;
  CAText: string;
  ColText: string;
  Street: string;
  Exteriornumber: string;
  Interiornumber?: string;
  Reference?: string;
}
/**
 * Datos de la fotografía de perfil del usuario.
 * @property profile_picture - URL o nombre del archivo de la foto de perfil (opcional).
 */
interface FotografiaFormData {
  profile_picture?: string;
}

/**
 * Payload de JWT (JSON Web Token) con información básica del usuario.
 * @property name - Nombre del usuario (opcional).
 * @property username - Nombre de usuario o username (opcional).
 * @property email - Correo electrónico del usuario (opcional).
 */
interface JwtPayload {
  name?: string;
  username?: string;
  email?: string;
}

const Registro: React.FC<RegistroProps> = ({ onBack }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [isRegistering, setIsRegistering] = useState(false);

  const [completedForms, setCompletedForms] = useState<CompletedForms>({
    personal: false,
    cuenta: false,
    direccion: false,
    fotografia: false,
  });

  /**
   * Verifica si los campos requeridos de un formulario están completos.
   * @param formData - Objeto con los datos del formulario
   * @param requiredFields - Campos obligatorios
   * @returns true si todos los campos requeridos tienen valor
   */
  const isFormComplete = (
    formData: Record<string, any> | null,
    requiredFields: string[]
  ): boolean => {
    if (!formData) return false;

    return requiredFields.every((field) => {
      const value = formData[field];
      return (
        value !== undefined &&
        value !== null &&
        value.toString().trim() !== ""
      );
    });
  };

  /**
   * Carga datos desde localStorage y actualiza el estado de formularios completados.
   * Se ejecuta al montar el componente y al dispararse el evento 'storageUpdate'.
   */
  useEffect(() => {
    const checkFormCompletion = () => {
      try {
        const personalData: PersonalFormData | null = JSON.parse(
          localStorage.getItem("personalFormData") || "null"
        );
        const cuentaData: CuentaFormData | null = JSON.parse(
          localStorage.getItem("cuentaFormData") || "null"
        );
        const direccionData: DireccionFormData | null = JSON.parse(
          localStorage.getItem("direccionFormData") || "null"
        );
        const fotografiaData: FotografiaFormData | null = JSON.parse(
          localStorage.getItem("fotografiaFormData") || "null"
        );

        setCompletedForms({
          personal: isFormComplete(personalData, [
            "name",
            "firstsurname",
            "dateOfBirth",
            "gender",
            "nationality",
          ]),
          cuenta: isFormComplete(cuentaData, [
            "telephone",
            "email",
            "username",
            "password",
            "role",
          ]),
          direccion: isFormComplete(direccionData, [
            "postcode",
            "estate",
            "CAText",
            "ColText",
            "Street",
            "Exteriornumber",
          ]),
          fotografia: !!fotografiaData?.profile_picture,
        });
      } catch (error) {
        console.error("Error al verificar formularios:", error);
      }
    };

    checkFormCompletion();
    window.addEventListener("storageUpdate", checkFormCompletion);
    return () =>
      window.removeEventListener("storageUpdate", checkFormCompletion);
  }, []);

  /**
   * Navega a la sección del registro correspondiente.
   * @param sectionName - Nombre de la sección (personal, cuenta, direccion, fotografia)
   */
  const handleButtonClick = (sectionName: keyof CompletedForms) => {
    navigate(`/registro/${sectionName}`);
  };

  /**
   * Función para registrar al usuario.
   * Valida que los formularios estén completos, arma el payload y llama a la API.
   */
  const handleRegistration = async () => {
    setIsRegistering(true);

    try {
      if (
        !completedForms.personal ||
        !completedForms.cuenta ||
        !completedForms.direccion
      ) {
        alert("Por favor complete todos los formularios antes de registrarse.");
        setIsRegistering(false);
        return;
      }

      const personalData: PersonalFormData = JSON.parse(
        localStorage.getItem("personalFormData") || "{}"
      );
      const cuentaData: CuentaFormData = JSON.parse(
        localStorage.getItem("cuentaFormData") || "{}"
      );
      const direccionData: DireccionFormData = JSON.parse(
        localStorage.getItem("direccionFormData") || "{}"
      );
      const fotografiaData: FotografiaFormData = JSON.parse(
        localStorage.getItem("fotografiaFormData") || "{}"
      );

      const userData = {
        username: cuentaData.username,
        password: cuentaData.password,
        email: cuentaData.email,

        first_name: personalData.name,
        last_name:
          personalData.firstsurname +
          (personalData.secondsurname
            ? ` ${personalData.secondsurname}`
            : ""),

        profile_picture: fotografiaData.profile_picture || "",

        nationality: personalData.nationality,
        occupation: cuentaData.occupation || "",
        date_of_birth: personalData.dateOfBirth,
        contact_phone_number: cuentaData.telephone,
        gender: personalData.gender,

        address: direccionData.Street,
        address_number: direccionData.Exteriornumber,
        address_interior_number: direccionData.Interiornumber || "",
        address_complement: direccionData.Reference || "",
        address_neighborhood: direccionData.ColText,
        address_zip_code: direccionData.postcode,
        address_city: direccionData.CAText,
        address_state: direccionData.estate,

        role: cuentaData.role,
        is_active: true,
        is_superuser: false,
      };

      const token = localStorage.getItem("accessToken");
      if (!token) {
        alert("No se encontró token. Inicie sesión nuevamente.");
        navigate("/login");
        return;
      }
      

      const response = await axios.post(
        `${API_BASE_URL}/api/users`,
        userData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Usuario registrado:", response.data);

      // limpiar
      localStorage.removeItem("personalFormData");
      localStorage.removeItem("cuentaFormData");
      localStorage.removeItem("direccionFormData");
      localStorage.removeItem("fotografiaFormData");

      alert("Usuario registrado exitosamente.");
      navigate("/botones");
    } catch (error: any) {
      console.error("Error al registrar usuario:", error);

      if (error.response) {
        alert(error.response.data?.message || "Error del servidor");
      } else {
        alert("Error inesperado");
      }
    } finally {
      setIsRegistering(false);
    }
  };

  return (
    <div className="registro-panel">
      <div className="logo-container"></div>

      <div className="registro-opciones">
        <div className="SCROLLBAR"></div>

        {/* Círculos */}
        <div className="circulos">
          {Object.entries(completedForms).map(([key, completed]) => (
            <div key={key} className={`circulo ${completed ? "circulo-fuerte" : ""}`}>
              {completed && (
                <img
                  src={getSvgUrl("paloma")}
                  alt="Completado"
                  className="icono-paloma"
                />
              )}
            </div>
          ))}
        </div>

        <img src={getSvgUrl("logo-5")} alt="Logo" className="logo" />
        <h1>{t("registerTitle")}</h1>
        <div className="titulo-con-logo">
                <img src={getSvgUrl('Pantera')} alt="Logo" className="pantera-logo" />
                <h2>{t('fulanitoTitle')}</h2>
         </div>
         <div className="linea"></div>


        <Button
          iconName="Usuario"
          labelKey="personalTitle"
          onClick={() => handleButtonClick("personal")}
        />
        <Button
          iconName="Correo_electronico"
          labelKey="accountTitlee"
          onClick={() => handleButtonClick("cuenta")}
        />
        <Button
          iconName="add"
          labelKey="addressTitle"
          onClick={() => handleButtonClick("direccion")}
        />
        <Button
          iconName="Fotografía"
          labelKey="pictureTitle"
          onClick={() => handleButtonClick("fotografia")}
        />

        <button
          type="button"
          className="boton"
          disabled={isRegistering}
          onClick={handleRegistration}
        >
          {isRegistering ? t("Registrando...") : t("RegistrarBoton")}
        </button>
      </div>

      <button className="back-button" onClick={() => navigate("/botones")}>
        <img src={getSvgUrl("Retroceder")} alt="Regresar" className="button-icon" />
      </button>
    </div>
  );
};

export default Registro;
