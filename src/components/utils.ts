/**
 * Genera la URL de un archivo SVG basado en su nombre.
 * 
 * Esta función construye dinámicamente la ruta hacia un recurso SVG
 * ubicado en la carpeta `/images`.
 * 
 * @param iconName - Nombre del archivo SVG sin extensión.
 * @returns Ruta completa del archivo SVG.
 * 
 * @example
 * getSvgUrl('logo-5'); 
 * // Retorna: '/images/logo-5.svg'
 */
export function getSvgUrl(iconName: string): string {
  return `/images/${iconName}.svg`;
}
