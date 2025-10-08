/* progress-badges.js – Barra + insignias sin estilos complejos */
(function () {
  const fill = document.getElementById('progress-fill');
  const percent = document.getElementById('progress-percent');
  const badges = document.getElementById('badges');

  const sections = ['validez', 'prepiloto', 'items', 'recoleccion', 'psicometrico', 'informe'];
  const icons = { validez: '🏆', prepiloto: '🧪', items: '📊', recoleccion: '📥', psicometrico: '📈', informe: '📝' };

  function load() {
    return JSON.parse(localStorage.getItem('progress') || '{}');
  }

  function save(data) {
    localStorage.setItem('progress', JSON.stringify(data));
  }

  function render() {
    const data = load();
    const earned = sections.filter(s => data[s]).length;
    const p = Math.round((earned / sections.length) * 100);
    fill.style.width = p + '%';
    percent.textContent = p + ' %';
    badges.innerHTML = sections.map(s => `<span style="filter:${data[s] ? 'none' : 'grayscale(1) opacity(0.4)'};" title="${s}">${icons[s]}</span>`).join('');
  }

  // Función global para marcar completado (la llamaremos desde quizzes.js)
  window.markSectionComplete = function (key) {
    const data = load();
    if (!data[key]) { data[key] = true; save(data); render(); }
  };

  // Inicializa
  render();
})();
