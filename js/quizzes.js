/* quizzes.js - v4 - VERSIÓN FINAL CORREGIDA CON SINTAXIS VERIFICADA */

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

function renderizarQuiz(preguntas, contenedor) {
  contenedor.innerHTML = '';
  const form = document.createElement('form');
  form.className = 'quiz-form';

  preguntas.forEach((pregunta, index) => {
    const preguntaDiv = document.createElement('div');
    preguntaDiv.className = 'quiz-question';

    let opcionesHTML = '';
    pregunta.opciones.forEach((opcion, i) => {
      // === SINTAXIS CORREGIDA Y VERIFICADA ===
      // Se asegura que todas las comillas y etiquetas estén correctamente anidadas.
      opcionesHTML += `
        <div>
          <input type="radio" name="pregunta_${index}" value="${i}" required id="opcion_${index}_${i}">
          <label for="opcion_${index}_${i}">
            <span>${opcion}</span>
          </label>
        </div>
      `;
    });

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
    let resultadosHTML = '';

    preguntas.forEach((pregunta, index) => {
      const respuestaUsuarioNode = form.querySelector(`input[name="pregunta_${index}"]:checked`);
      
      if (respuestaUsuarioNode) {
        const respuestaUsuarioIndex = parseInt(respuestaUsuarioNode.value, 10);
        const esCorrecta = respuestaUsuarioIndex === pregunta.correcta;

        if (esCorrecta) {
          puntaje++;
        }
        
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
    contenedor.innerHTML = resumenPuntaje + resultadosHTML;

    // Marcar sección como completada
const key = jsonPath.match(/quiz_(\w+)\.json/)[1];
window.markSectionComplete?.(key);
    
  });
}

