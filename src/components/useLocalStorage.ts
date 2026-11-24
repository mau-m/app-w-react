import { useState } from "react";

/**
 * Tipo para la función que actualiza el valor almacenado.
 * 
 * @template T - Tipo genérico del valor almacenado.
 * @param value - Nuevo valor a guardar.
 */
type SetValue<T> = (value: T) => void;

/**
 * Tipo para la función que valida si un formulario está completo.
 * 
 * @param requiredFields - Lista de campos obligatorios.
 * @returns true si todos los campos contienen valores válidos.
 */
type IsFormComplete = (requiredFields: string[]) => boolean;

/**
 * Hook personalizado para manejar estado sincronizado con localStorage.
 * Permite:
 * - Leer un valor inicial desde localStorage
 * - Actualizar el estado y persistirlo automáticamente
 * - Validar si un formulario está completo
 * 
 * @template T - Tipo del objeto almacenado
 * @param key - Clave utilizada en localStorage
 * @param initialValue - Valor inicial en caso de que no exista en storage
 * 
 * @returns [storedValue, setValue, isFormComplete]
 */
export function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? (JSON.parse(item) as T) : initialValue;
    } catch {
      return initialValue;
    }
  });

  /**
   * Actualiza el estado y sincroniza el nuevo valor con localStorage.
   * 
   * @param value - Nuevo valor a almacenar
   */
  const setValue: SetValue<T> = (value) => {
    try {
      setStoredValue(value);
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(error);
    }
  };

  /**
   * Verifica si todos los campos requeridos del formulario están completos.
   * Considera como válido:
   * - Que el campo exista
   * - Que sea string
   * - Que no esté vacío (trim)
   * 
   * @param requiredFields - Lista de campos obligatorios
   * @returns true si el formulario está completo
   */
  const isFormComplete: IsFormComplete = (requiredFields) => {
    return requiredFields.every(
      (field) =>
        (storedValue as any)[field] &&
        typeof (storedValue as any)[field] === "string" &&
        (storedValue as any)[field].trim() !== ""
    );
  };

  return [storedValue, setValue, isFormComplete] as const;
}
