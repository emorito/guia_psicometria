/* quizzes.js - v2 - ADAPTADO para la estructura JSON con claves "p" y "correcta" */

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
 * Renderiza el quiz adaptándose a la estructura JSON del proyecto.
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
    // ========= CAMBIO 1: SE ITERA SOBRE pregunta.opciones (esto estaba bien) =========
    pregunta.opciones.forEach((opcion, i) => {
      opcionesHTML += `
        <label>
          <input type="radio" name="pregunta_${index}" value="${i}" required>
          ${opcion}
        </label>
      `;
      // Se guarda el ÍNDICE (0, 1, 2...) en el 'value' del radio button.
    });

    // ========= CAMBIO 2: SE USA "pregunta.p" EN LUGAR DE "pregunta.pregunta" =========
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
    let resultadosHTML = '<h3>Resultados Detallados</h3>';

    preguntas.forEach((pregunta, index) => {
      const respuestaUsuarioNode = form.querySelector(`input[name="pregunta_${index}"]:checked`);
      
      if (respuestaUsuarioNode) {
        // ========= CAMBIO 3: SE COMPARA EL ÍNDICE ELEGIDO CON EL NÚMERO EN "pregunta.correcta" =========
        const respuestaUsuarioIndex = parseInt(respuestaUsuarioNode.value, 10);
        const esCorrecta = respuestaUsuarioIndex === pregunta.correcta;

        if (esCorrecta) {
          puntaje++;
        }
        
        // Genera una retroalimentación más detallada
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

    const resumenPuntaje = `<div class="quiz-summary"><h2>Has acertado ${puntaje} de ${preguntas.length}</h2></div>`;
    // Muestra el resumen y luego los resultados detallados
    contenedor.innerHTML = resumenPuntaje + resultadosHTML;
  });
}
