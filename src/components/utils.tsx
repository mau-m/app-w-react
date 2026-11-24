
/**
 * Componente que sirve para ubucar una imagen en la carpeta imagenes. 
 * @param iconName - Nombre de la imagen que se quiero buscar
 * @returns 
 */
export const getSvgUrl = (iconName: string): string => {
  return `/images/${iconName}.svg`;
};
