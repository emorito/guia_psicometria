/* utils.js - Contiene funciones de utilidad reutilizables como la carga de datos */

const Utils = {
  /**
   * Carga un archivo JSON desde una ruta y lo devuelve como un objeto JavaScript.
   * Es una función 'async' que usa fetch.
   * @param {string} ruta - La ruta al archivo JSON.
   * @returns {Promise<Object|null>} El contenido del JSON o null si hay un error.
   */
  async loadJSON(ruta) {
    try {
      const respuesta = await fetch(ruta);
      if (!respuesta.ok) {
        // Lanza un error si el archivo no se encuentra o hay otro problema de red.
        throw new Error(`Error HTTP ${respuesta.status} al cargar ${ruta}`);
      }
      // Si todo va bien, convierte la respuesta a JSON y la devuelve.
      return await respuesta.json();
    } catch (error) {
      // Muestra un error claro en la consola del desarrollador si algo falla.
      console.error("Error grave al cargar el archivo JSON:", error);
      return null; // Devuelve null para evitar que el resto del script se rompa.
    }
  }
};
