/* utils.js – helpers genéricos y render de contenido dinámico  */

/* ───────────────────────── 1. Datos fuente ────────────────────────── */

/* 1.1. Bibliografía mínima (APA 7) */
const biblioData = [
  'American Educational Research Association, American Psychological Association, & National Council on Measurement in Education. (2014). <i>Standards for educational and psychological testing</i>.',
  'Boateng, G. O., Neilands, T. B., Frongillo, E. A., Melgar-Quiñonez, H. R., & Young, S. L. (2018). Best practices for developing and validating scales… <i>Frontiers in Public Health, 6</i>, 149.',
  'DeVellis, R. F., & Thorpe, A. (2022). <i>Scale development: Theory and applications</i> (5.ª ed.).',
  'Kyriazos, T. A., & Stalikas, A. (2018). Applied psychometrics… <i>Psychology, 9</i>, 2531-2560.',
  'Streiner, D. L., Norman, G. R., & Cairney, J. (2015). <i>Health measurement scales</i> (5.ª ed.).'
];

/* 1.2. Descargables */
const filesData = [
  'docs/Ficha_tecnica_instrumento.docx',
  'docs/Plan_trabajo_grupo.docx',
  'docs/Plantilla_panel_expertos.docx',
  'docs/Plantilla_informe_final.docx',
  'docs/Rubrica_evaluacion_informe.pdf',
  'docs/Plantilla_reporte_EFA_CFA.docx',
  'docs/Guia_jamovi_analisis.docx',
  'docs/Consentimiento_informado.docx'
];

/* 1.3. Cronograma completo */
const cronogramaData = [
  { etapa: 1, act: 'Inscripción de grupos y selección del instrumento', fechas: '29 jul – 2 ago',  entreg: 'Lista de grupos e instrumento elegido. Breve justificación.' },
  { etapa: 2, act: 'Revisión del instrumento y plan de validación',       fechas: '5 – 9 ago',      entreg: 'Ficha técnica preliminar + plan de trabajo.' },
  { etapa: 3, act: 'Validez de contenido y apariencia',                   fechas: '12 – 23 ago',    entreg: 'Panel de expertos, matrices, versión ajustada.' },
  { etapa: 4, act: 'Estudio piloto y entrevistas cognitivas',             fechas: '26 ago – 6 sep', entreg: 'Resultados del piloto + informe breve.' },
  { etapa: 5, act: 'Recolección de datos principal',                      fechas: '9 – 20 sep',     entreg: 'Base de datos limpia y codificada.' },
  { etapa: 6, act: 'Análisis psicométrico (EFA, fiabilidad, etc.)',       fechas: '23 – 30 sep',    entreg: 'Resultados estadísticos + gráficos (Jamovi).' },
  { etapa: 7, act: 'Redacción y entrega del informe final',               fechas: '1 – 4 oct',      entreg: 'Informe completo + anexos.' }
];

/* 1.4. Test sugeridos (solo visuales, sin botón “Seleccionar”) */
const testsData = [
  { sigla: 'GSE',  it: 10, desc: 'Autoeficacia general percibida.' },
  { sigla: 'PANAS',it: 20, desc: 'Afecto positivo y negativo.' },
  { sigla: 'RSES', it: 10, desc: 'Autoestima global.' },
  { sigla: 'PSS',  it: 10, desc: 'Estrés percibido (último mes).' },
  { sigla: 'DASS-21', it: 21, desc: 'Depresión, ansiedad y estrés (breve).' },
  { sigla: 'SD3',  it: 27, desc: 'Triada oscura (breve).' },
  { sigla: 'OTRO', it: '—', desc: 'Otras propuestas del equipo.' }
];

/* ─────────────────── 2. Funciones de renderizado ──────────────────── */

function renderBibliografia () {
  const ul = document.getElementById('biblio-list');
  if (!ul) return;
  biblioData.forEach(ref => {
    const li = document.createElement('li');
    li.innerHTML = ref;
    ul.appendChild(li);
  });
}

function renderDescargables () {
  const cont = document.getElementById('descargables-list');
  if (!cont) return;
  const ul = document.createElement('ul');
  filesData.forEach(path => {
    const li = document.createElement('li');
    li.innerHTML = `<a href="${path}">${path.split('/').pop()}</a>`;
    ul.appendChild(li);
  });
  cont.appendChild(ul);
}

function renderCronograma () {
  /* Asegúrate de que en tu index.html el <tbody> tenga id="cronograma-body" */
  const tbody = document.getElementById('cronograma-body');
  if (!tbody) return;
  cronogramaData.forEach(r => {
    const tr = document.createElement('tr');
    tr.innerHTML = `<td>${r.etapa}</td><td>${r.act}</td><td>${r.fechas}</td><td>${r.entreg}</td>`;
    tbody.appendChild(tr);
  });
}

function renderTestCards () {
  const cont = document.getElementById('cards-tests');
  if (!cont) return;
  testsData.forEach(t => {
    const card = document.createElement('div');
    card.className = 'card-test';
    card.innerHTML = `<h3>${t.sigla}</h3><p>${t.it} ítems · ${t.desc}</p>`;
    cont.appendChild(card);
  });
}

/* ───────────────────── 3. Utilidades reutilizables ─────────────────── */

export const Utils = {
  /* Carga un JSON remoto/local */
  async loadJSON (path) {
    const res = await fetch(path);
    if (!res.ok) throw new Error(`No se pudo cargar ${path}`);
    return res.json();
  },
  /* Fisher-Yates shuffle */
  shuffle (arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }
};

/* ───────────────────────── 4. Init al cargar ──────────────────────── */

document.addEventListener('DOMContentLoaded', () => {
  renderBibliografia();
  renderDescargables();
  renderCronograma();
  renderTestCards();
});
