/* quizzes.js – v5 LIMPIO Y FUNCIONAL */
document.addEventListener('DOMContentLoaded', () => {
  const quizButtons = document.querySelectorAll('.btn-quiz');

  quizButtons.forEach(button => {
    button.addEventListener('click', async () => {
      const jsonPath = button.dataset.json;
      const targetId = button.dataset.target;
      const targetElement = document.getElementById(targetId);
      if (!targetElement) return;

      targetElement.innerHTML = '<p>Cargando cuestionario...</p>';

      try {
        const bancoDePreguntas = await fetch(jsonPath).then(r => {
          if (!r.ok) throw new Error('404');
          return r.json();
        });
        const preguntasSeleccionadas = [...bancoDePreguntas].sort(() => 0.5 - Math.random()).slice(0, 5);
        renderizarQuiz(preguntasSeleccionadas, targetElement, jsonPath);
      } catch (e) {
        targetElement.innerHTML = '<p>❌ No se pudieron cargar las preguntas.</p>';
      }
    });
  });
});

function renderizarQuiz(preguntas, contenedor, jsonPath) {
  contenedor.innerHTML = '';
  const form = document.createElement('form');
  form.className = 'quiz-form';

  preguntas.forEach((pregunta, index) => {
    const preguntaDiv = document.createElement('div');
    preguntaDiv.className = 'quiz-question';

    let opcionesHTML = '';
    pregunta.opciones.forEach((opcion, i) => {
      opcionesHTML += `
        <div>
          <input type="radio" name="pregunta_${index}" value="${i}" required id="opcion_${index}_${i}">
          <label for="opcion_${index}_${i}">${opcion}</label>
        </div>
      `;
    });

    preguntaDiv.innerHTML = `
      <p class="question-text">${index + 1}. ${pregunta.p}</p>
      <div class="options-container">${opcionesHTML}</div>
    `;
    form.appendChild(preguntaDiv);
  });

  const submitButton = document.createElement('button');
  submitButton.type = 'submit';
  submitButton.className = 'btn-submit-quiz';
  submitButton.textContent = 'Corregir y ver resultados';
  form.appendChild(submitButton);

  form.addEventListener('submit', e => {
    e.preventDefault();
    let puntaje = 0;
    let resultadosHTML = '';

    preguntas.forEach((pregunta, index) => {
      const respuestaUsuarioNode = form.querySelector(`input[name="pregunta_${index}"]:checked`);
      if (!respuestaUsuarioNode) return;

      const respuestaUsuarioIndex = parseInt(respuestaUsuarioNode.value, 10);
      const esCorrecta = respuestaUsuarioIndex === pregunta.correcta;
      if (esCorrecta) puntaje++;

      resultadosHTML += `
        <div class="result-item ${esCorrecta ? 'correct' : 'incorrect'}">
          <p><strong>Pregunta:</strong> ${pregunta.p}</p>
          <p><strong>Tu respuesta:</strong> ${pregunta.opciones[respuestaUsuarioIndex]}</p>
          ${!esCorrecta ? `<p><strong>Respuesta correcta:</strong> ${pregunta.opciones[pregunta.correcta]}</p>` : ''}
          <p class="explanation"><em><strong>Explicación:</strong> ${pregunta.exp}</em></p>
        </div>
      `;
    });

    const resumenPuntaje = `<div class="quiz-summary"><h2>Has acertado ${puntaje} de ${preguntas.length}</h2></div>`;
    contenedor.innerHTML = resumenPuntaje + resultadosHTML;

    // Exportar PDF
    const key = jsonPath.match(/quiz_(\w+)\.json/)[1];
    window.exportQuizPDF?.(key, preguntas.length, puntaje);
    window.markSectionComplete?.(key);
  });

  contenedor.appendChild(form);
}
