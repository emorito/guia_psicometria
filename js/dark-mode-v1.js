/* dark-mode-v1.js – Toggle y persistencia */
(function () {
  const button = document.getElementById('theme-toggle');
  const html = document.documentElement;

  // Lee preferencia del usuario (sistema o localStorage)
  const stored = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const initial = stored ? stored : (prefersDark ? 'dark' : 'light');
  html.setAttribute('data-theme', initial);

  // Toggle al hacer clic
  button.addEventListener('click', () => {
    const current = html.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
  });
})();
