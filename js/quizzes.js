/* quizzes.js – gestor único de autoevaluaciones  */

const Quiz = {
  data: [],          // banco de preguntas cargado vía JSON
  current: 0,        // índice de la pregunta mostrada
  score: 0,          // aciertos
  asked: [],         // preguntas seleccionadas (5)

  /* Carga banco según nombre recibido p.e. quiz_validez */
  async init(nombreJSON, titulo = 'Quiz') {
    // Resetea interfaz
    document.getElementById('quiz-zone').classList.remove('hidden');
    document.getElementById('quiz-title').textContent = titulo;
    document.getElementById('quiz-score').textContent = '';
    document.getElementById('quiz-feedback').textContent = '';
    document.getElementById('quiz-next').disabled = true;
    document.getElementById('quiz-reload').classList.add('hidden');

    // Carga banco
    this.data = await Utils.loadJSON(`data/${nombreJSON}.json`);
    this.asked = Utils.shuffle([...this.data]).slice(0, 5);
    this.current = 0;
    this.score = 0;
    this.render();
  },

  /* Pinta la pregunta actual */
  render() {
    const q = this.asked[this.current];
    document.getElementById('quiz-question').textContent = q.p;

    // Opciones
    const box = document.getElementById('quiz-options');
    box.innerHTML = '';
    q.opciones.forEach((txt, idx) => {
      const btn = document.createElement('button');
      btn.textContent = txt;
      btn.className = 'option';
      btn.onclick = () => this.pick(idx);
      box.appendChild(btn);
    });
  },

  /* Cuando el usuario elige */
  pick(idx) {
    const q = this.asked[this.current];
    const opciones = document.querySelectorAll('#quiz-options .option');

    opciones.forEach((b, i) => {
      b.disabled = true;
      if (i === q.correcta) b.classList.add('ok');
      if (i === idx && idx !== q.correcta) b.classList.add('bad');
    });

    // Feedback
    const fb = document.getElementById('quiz-feedback');
    if (idx === q.correcta) {
      this.score++;
      fb.textContent = '✅ ¡Correcto!';
    } else {
      fb.textContent = `❌ Incorrecto. ${q.exp}`;
    }

    // botón siguiente
    document.getElementById('quiz-next').disabled = false;
    document.getElementById('quiz-next').onclick = () => this.next();
  },

  /* Avanza de pregunta o muestra resultado final */
  next() {
    this.current++;
    document.getElementById('quiz-feedback').textContent = '';
    document.getElementById('quiz-next').disabled = true;

    if (this.current < this.asked.length) {
      this.render();
    } else {
      // Resultado final
      const ok = this.score;
      const total = this.asked.length;
      const aprobado = ok >= 4;   // 4/5
      document.getElementById('quiz-question').textContent = 'Resultados';
      document.getElementById('quiz-options').innerHTML = '';
      document.getElementById('quiz-score').textContent =
        `Tu puntuación: ${ok}/${total} – ${aprobado ? 'Aprobado 🎉' : 'Repasa y vuelve a intentarlo'}`;
      document.getElementById('quiz-reload').classList.remove('hidden');
    }
  },

  /* Reiniciar */
  reset() {
    document.getElementById('quiz-zone').classList.add('hidden');
  }
};

/* :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::: */
/*  Ejemplo de activación:                                             
      <button onclick="Quiz.init('quiz_validez', 'Quiz · Validez de contenido')">Probar Quiz</button>
   Crea botones similares en cada sección.                             */
/* :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::: */
