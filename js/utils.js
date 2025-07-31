/* utils.js – helpers genéricos y carga de bibliografía/descargables */
document.addEventListener('DOMContentLoaded', () => {
  renderBibliografia();
  renderDescargables();
  renderTestCards();
});

function renderBibliografia() {
  const refs = [
    `American Educational Research Association, American Psychological Association, & National Council on Measurement in Education. (2014). <i>Standards for educational and psychological testing</i>.`,
    `Boateng, G. O., et al. (2018). Best practices for developing and validating scales... <i>Frontiers in Public Health, 6</i>, 149.`,
    `DeVellis, R. F., & Thorpe, A. (2022). <i>Scale development: Theory and applications</i>.`,
    `Kyriazos, T. A., & Stalikas, A. (2018). Applied psychometrics... <i>Psychology, 9</i>, 2531–2560.`,
    `Streiner, D. L., Norman, G. R., & Cairney, J. (2015). <i>Health measurement scales</i>.`
  ];
  const ul = document.getElementById('biblio-list');
  if (!ul) return;
  refs.forEach(r => {
    const li = document.createElement('li');
    li.innerHTML = r;
    ul.appendChild(li);
  });
}

function renderDescargables() {
  const archivos = [
    'docs/Ficha_tecnica_instrumento.docx',
    'docs/Plan_trabajo_grupo.docx',
    'docs/Plantilla_panel_expertos.docx',
    'docs/Plantilla_informe_final.docx',
    'docs/Rubrica_evaluacion_informe.pdf',
    'docs/Plantilla_reporte_EFA_CFA.docx',
    'docs/Guia_jamovi_analisis.docx',
    'docs/Consentimiento_informado.docx'
  ];
  const container = document.getElementById('descargables-list');
  if (!container) return;
  const ul = document.createElement('ul');
  archivos.forEach(r => {
    const li = document.createElement('li');
    li.innerHTML = `<a href="${r}">${r.split('/').pop()}</a>`;
    ul.appendChild(li);
  });
  container.appendChild(ul);
}

function renderTestCards() {
  // lista reducida; añade/elimina según tus necesidades
  const tests = [
    {sigla:'GSE', it:10, desc:'Autoeficacia general percibida.'},
    {sigla:'PANAS', it:20, desc:'Afecto positivo y negativo.'},
    {sigla:'RSES', it:10, desc:'Autoestima global.'},
    {sigla:'PSS', it:10, desc:'Estrés percibido (último mes).'},
    {sigla:'DASS-21', it:21, desc:'Depresión, ansiedad, estrés (breve).'}
  ];
  const cont = document.getElementById('cards-tests');
  if (!cont) return;
  tests.forEach(t=>{
    const div = document.createElement('div');
    div.className = 'card-test';
    div.innerHTML = `<h3>${t.sigla}</h3><p>${t.it} ítems · ${t.desc}</p>`;
    cont.appendChild(div);
  });
}
/* utils.js  – pequeñas funciones de apoyo */

const Utils = {
  /* Carga y devuelve un JSON remoto */
  async loadJSON(path) {
    const res = await fetch(path);
    if (!res.ok) throw new Error(`No se pudo cargar ${path}`);
    return res.json();
  },

  /* Mezcla aleatoriamente un array (Fisher-Yates) */
  shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }
};
