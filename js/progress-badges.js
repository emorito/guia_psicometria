/* progress-badges.js – placeholder funcional */
(function () {
  const bar = document.getElementById('progress-bar');
  const percent = document.getElementById('progress-percent');
  const badges = document.getElementById('badges');
  if (!bar || !percent || !badges) return;

  // Muestra barra y valores iniciales
  bar.style.display = 'flex';
  percent.textContent = '0 %';
  badges.innerHTML = '<span>📝</span><span>🧪</span><span>📊</span><span>📥</span><span>📈</span><span>🏆</span>';
})();
