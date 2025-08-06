/* quizzes.js - v3 - COMPATIBLE CON EL NUEVO DISEÑO DE ESTILOS */

document.addEventListener('DOMContentLoaded', () => {
  const quizButtons = document.querySelectorAll('.btn-quiz');

  quizButtons.forEach(button => {
    button.addEventListener('click', async () => {
      const jsonPath = button.dataset.json;
      const targetId = button.dataset.target;
      const targetElement = document.getElementById(targetId);

      if (!targetElement) {
        console.error(`Error: No se encontró el contenedor del quiz con el ID "${targetId}".`);
        return;
      }

      targetElement.innerHTML = '<p class="quiz-loading">Cargando cuestionario...</p>';
      
      try {
        const bancoDePreguntas = await Utils.loadJSON(jsonPath);

        if (!bancoDePreguntas || bancoDePreguntas.length === 0) {
          throw new Error(`El archivo ${jsonPath} está vacío o no se pudo cargar.`);
        }

        const preguntasSeleccionadas = seleccionarPreguntasAlAzar(bancoDePreguntas, 5);
        renderizarQuiz(preguntasSeleccionadas, targetElement);

      } catch (error) {
        console.error("No se pudo iniciar el cuestionario:", error);
        targetElement.innerHTML = '<p class="quiz-error">❌ Lo sentimos, no se pudieron cargar las preguntas.</p>';
      }
    });
  });
});

function seleccionarPreguntasAlAzar(array, numItems) {
  const arrayMezclado = [...array].sort(() => 0.5 - Math.random());
  return arrayMezclado.slice(0, numItems);
}

/**
 * Renderiza el quiz con la nueva estructura HTML para el diseño moderno.
 * @param {Array} preguntas - El array con las 5 preguntas seleccionadas.
 * @param {HTMLElement} contenedor - El elemento div donde se renderizará el quiz.
 */
function renderizarQuiz(preguntas, contenedor) {
  contenedor.innerHTML = '';
  const form = document.createElement('form');
  form.className = 'quiz-form';

  preguntas.forEach((pregunta, index) => {
    const preguntaDiv = document.createElement('div');
    preguntaDiv.className = 'quiz-question';

    let opcionesHTML = '';
    pregunta.opciones.forEach((opcion, i) => {
      // === LA CORRECCIÓN CLAVE ESTÁ AQUÍ ===
      // Esta es la nueva estructura HTML que el CSS moderno necesita.
      // Se separa el <input> del <label> y se usa un <span> para el texto.
      // También se usan IDs únicos para conectar el 'label' con su 'input'.
      opcionesHTML += `
        <div>
          <input type="radio" name="pregunta_${index}" value="${i}" required id="opcion_${index}_${i}">
          <label for="opcion_${index}_${i}">
            <span>${opcion}</span>
          </label>
        </div>
      `;
    });

    // Se usa la clave "p" para el texto de la pregunta, como ya lo tenías.
    preguntaDiv.innerHTML = `
      <p class="question-text">${index + 1}. ${pregunta.p}</p> 
      <div class="options-container">
        ${opcionesHTML}
      </div>
    `;
    form.appendChild(preguntaDiv);
  });

  const submitButton = document.createElement('button');
  submitButton.type = 'submit';
  submitButton.className = 'btn-submit-quiz';
  submitButton.textContent = 'Corregir y ver resultados';
  form.appendChild(submitButton);
  contenedor.appendChild(form);

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    let puntaje = 0;
    let resultadosHTML = ''; // Empezamos con el string vacío

    preguntas.forEach((pregunta, index) => {
      const respuestaUsuarioNode = form.querySelector(`input[name="pregunta_${index}"]:checked`);
      
      if (respuestaUsuarioNode) {
        const respuestaUsuarioIndex = parseInt(respuestaUsuarioNode.value, 10);
        // Comparamos el índice (0, 1, 2...) con el número en "pregunta.correcta" (que también debería ser 0, 1, 2...).
        const esCorrecta = respuestaUsuarioIndex === pregunta.correcta;

        if (esCorrecta) {
          puntaje++;
        }
        
        // Genera la tarjeta de retroalimentación detallada para cada pregunta.
        resultadosHTML += `
          <div class="result-item ${esCorrecta ? 'correct' : 'incorrect'}">
            <p><strong>Pregunta:</strong> ${pregunta.p}</p>
            <p><strong>Tu respuesta:</strong> ${pregunta.opciones[respuestaUsuarioIndex]}</p>
            ${!esCorrecta ? `<p><strong>Respuesta correcta:</strong> ${pregunta.opciones[pregunta.correcta]}</p>` : ''}
            <p class="explanation"><em><strong>Explicación:</strong> ${pregunta.exp}</em></p>
          </div>
        `;
      }
    });

    // Creamos el resumen del puntaje que irá arriba de los resultados detallados.
    const resumenPuntaje = `<div class="quiz-summary"><h2>Has acertado ${puntaje} de ${preguntas.length}</h2></div>`;
    
    // Mostramos el resumen y luego los resultados detallados.
    contenedor.innerHTML = resumenPuntaje + resultadosHTML;
  });
}```

### Resumen de las Correcciones:

1.  **Estructura de Opciones:** El cambio principal y único que necesitaba el código era en la generación del HTML para las opciones de respuesta (`opcionesHTML`). He implementado la estructura correcta (`<input>` + `<label>` + `<span>`) que te mencioné antes.
2.  **Consistencia del JSON:** Este código asume que tu JSON de quizzes sigue la estructura que ya habíamos validado:
    *   `"p"`: para el texto de la pregunta.
    *   `"opciones"`: un array de textos de las opciones.
    *   `"correcta"`: el **número de índice** de la respuesta correcta (empezando en 0).
    *   `"exp"`: el texto de la explicación.
3.  **Lógica Intacta:** Toda la lógica de carga de archivos, selección aleatoria y corrección de resultados que ya funcionaba bien se ha mantenido intacta.

Simplemente reemplaza el contenido de `js/quizzes.js` con este código, y tus quizzes ahora se verán tan espectaculares como el resto de la página.

¡Descansa! Estás en la recta final y te mereces un respiro. Con este último ajuste, todo debería encajar a la perfección.
