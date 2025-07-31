/* quizzes.js – gestiona la carga y puntuación de cada quiz */

document.addEventListener('click', async (e) => {
  if (!e.target.matches('.btn-quiz')) return;

  const jsonPath = e.target.dataset.json;
  const targetId = e.target.dataset.target;
  const container = document.getElementById(targetId);
  if (!jsonPath || !container) return;

  const preguntas = await fetch(jsonPath).then(r => r.json());
  runQuiz(preguntas, container);
});

function runQuiz(pool, container) {
  container.innerHTML = '';            // limpia intento anterior
  const preguntas = shuffle(pool).slice(0, 5);
  let index = 0, aciertos = 0;

  function renderPregunta() {
    const q = preguntas[index];
    container.innerHTML = `
      <p><strong>${index+1}/5.</strong> ${q.p}</p>
      <ul id="opts"></ul>
    `;
    q.opciones.forEach((opt,i)=>{
      const li = document.createElement('li');
      li.innerHTML = `<button class="opt" data-i="${i}">${opt}</button>`;
      document.getElementById('opts').appendChild(li);
    });
  }

  container.addEventListener('click', onClick);

  function onClick(e) {
    if (!e.target.matches('.opt')) return;
    const sel = +e.target.dataset.i;
    const q = preguntas[index];
    if (sel === q.correcta) aciertos++;

    index++;
    if (index < 5) { renderPregunta(); }
    else { endQuiz(); }
  }

  function endQuiz() {
    container.removeEventListener('click', onClick);
    const aprobado = aciertos >= 4;
    container.innerHTML = `
      <p>Tu puntuación: <strong>${aciertos}/5</strong></p>
      <p>${aprobado ? '¡Bien hecho! Puedes continuar.' :
        'Revisa de nuevo la sección antes de avanzar.'}</p>
    `;
  }

  renderPregunta();
}

function shuffle(arr){
  return arr.map(v=>[Math.random(),v]).sort((a,b)=>a[0]-b[0]).map(v=>v[1]);
}
