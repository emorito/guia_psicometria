/* quizzes.js - Lógica para cargar y gestionar todos los cuestionarios del sitio */

// Espera a que todo el HTML esté cargado antes de ejecutar cualquier código.
document.addEventListener('DOMContentLoaded', () => {
  // 1. Busca TODOS los botones que tienen la clase 'btn-quiz'.
  const quizButtons = document.querySelectorAll('.btn-quiz');

  // 2. Añade un "escuchador" de clics a CADA UNO de esos botones.
  quizButtons.forEach(button => {
    button.addEventListener('click', async () => {
      // Cuando se hace clic en un botón:
      const jsonPath = button.dataset.json; // Lee la ruta del archivo JSON del atributo data-json.
      const targetId = button.dataset.target; // Lee el ID del contenedor del atributo data-target.
      const targetElement = document.getElementById(targetId); // Busca el div donde irá el quiz.

      if (!targetElement) {
        console.error(`Error: No se encontró el contenedor del quiz con el ID "${targetId}".`);
        return;
      }

      // Muestra un mensaje de "Cargando..." para el usuario.
      targetElement.innerHTML = '<p class="quiz-loading">Cargando cuestionario...</p>';
      
      try {
        // 3. Usa nuestra función Utils para cargar el banco de preguntas.
        const bancoDePreguntas = await Utils.loadJSON(jsonPath);

        // Si el archivo JSON no se pudo cargar o está vacío, muestra un error.
        if (!bancoDePreguntas || bancoDePreguntas.length === 0) {
          throw new Error(`El archivo ${jsonPath} está vacío o no se pudo cargar.`);
        }

        // 4. Selecciona 5 preguntas al azar.
        const preguntasSeleccionadas = seleccionarPreguntasAlAzar(bancoDePreguntas, 5);

        // 5. "Dibuja" el quiz en la página.
        renderizarQuiz(preguntasSeleccionadas, targetElement);

      } catch (error) {
        console.error("No se pudo iniciar el cuestionario:", error);
        targetElement.innerHTML = '<p class="quiz-error">❌ Lo sentimos, no se pudieron cargar las preguntas.</p>';
      }
    });
  });
});

/**
 * Mezcla un array y devuelve un número específico de elementos.
 * @param {Array} array - El array de preguntas completo.
 * @param {number} numItems - El número de preguntas a seleccionar.
 * @returns {Array} Un nuevo array con el número de preguntas seleccionadas al azar.
 */
function seleccionarPreguntasAlAzar(array, numItems) {
  // Clonamos y mezclamos el array usando el algoritmo Fisher-Yates.
  const arrayMezclado = [...array].sort(() => 0.5 - Math.random());
  // Devolvemos los primeros 'numItems' elementos.
  return arrayMezclado.slice(0, numItems);
}

/**
 * Genera el HTML para el cuestionario y lo inserta en el contenedor.
 * @param {Array} preguntas - El array con las 5 preguntas seleccionadas.
 * @param {HTMLElement} contenedor - El elemento div donde se renderizará el quiz.
 */
function renderizarQuiz(preguntas, contenedor) {
  // Limpia el mensaje de "Cargando...".
  contenedor.innerHTML = '';

  // Crea el formulario.
  const form = document.createElement('form');
  form.className = 'quiz-form';

  // Por cada pregunta, crea su bloque de HTML.
  preguntas.forEach((pregunta, index) => {
    const preguntaDiv = document.createElement('div');
    preguntaDiv.className = 'quiz-question';

    let opcionesHTML = '';
    pregunta.opciones.forEach((opcion, i) => {
      // Creamos un radio button para cada opción.
      // El `name` es único para cada pregunta para que solo se pueda seleccionar una respuesta.
      // El `value` guarda el texto de la opción.
      opcionesHTML += `
        <label>
          <input type="radio" name="pregunta_${index}" value="${opcion}" required>
          ${opcion}
        </label>
      `;
    });

    preguntaDiv.innerHTML = `
      <p class="question-text">${index + 1}. ${pregunta.pregunta}</p>
      <div class="options-container">
        ${opcionesHTML}
      </div>
    `;
    form.appendChild(preguntaDiv);
  });

  // Añade el botón para enviar el formulario.
  const submitButton = document.createElement('button');
  submitButton.type = 'submit';
  submitButton.className = 'btn-submit-quiz';
  submitButton.textContent = 'Corregir y ver resultados';
  form.appendChild(submitButton);

  // Inserta el formulario completo en el div contenedor.
  contenedor.appendChild(form);

  // AHORA, lo más importante: qué hacer cuando el usuario envía sus respuestas.
  form.addEventListener('submit', (event) => {
    event.preventDefault(); // Evita que la página se recargue.

    let puntaje = 0;
    preguntas.forEach((pregunta, index) => {
      // Busca la respuesta que el usuario seleccionó para esta pregunta.
      const respuestaUsuario = form.querySelector(`input[name="pregunta_${index}"]:checked`);
      
      if (respuestaUsuario && respuestaUsuario.value === pregunta.respuesta_correcta) {
        puntaje++;
      }
    });

    // Muestra la retroalimentación.
    const totalPreguntas = preguntas.length;
    const retroalimentacion = `
      <div class="quiz-results">
        <h3>Resultados</h3>
        <p>Has acertado ${puntaje} de ${totalPreguntas} preguntas.</p>
        <p>${puntaje > totalPreguntas / 2 ? '¡Buen trabajo!' : '¡Sigue repasando!'}</p>
      </div>
    `;
    // Reemplaza el formulario con los resultados.
    contenedor.innerHTML = retroalimentacion;
  });
}
