/* utils.js — Helpers centrales (v1.0)  ────────────────────────────────
   ▸ Renderiza bibliografía, descargables, cronograma y tarjetas de tests
   ▸ Evita duplicados y múltiples listeners
   ▸ Todas las llamadas se hacen una sola vez en DOMContentLoaded
------------------------------------------------------------------------*/

document.addEventListener('DOMContentLoaded', () => {
  renderBibliografia();
  renderDescargables();
  renderCronograma();
  renderTestCards();
});

/* === 1. Bibliografía APA 7 ========================================= */
function renderBibliografia() {
  const refs = [
    `American Educational Research Association, American Psychological Association, & National Council on Measurement in Education. (2014). <i>Standards for educational and psychological testing</i>. Washington, DC: AERA.`,
    `Boateng, G. O., Neilands, T. B., Frongillo, E. A., Melgar-Quiñonez, H. R., & Young, S. L. (2018). Best practices for developing and validating scales... <i>Frontiers in Public Health, 6</i>, 149.`,
    `DeVellis, R. F., & Thorpe, A. (2022). <i>Scale development: Theory and applications (5ª ed.)</i>. Sage.`,
    `Kyriazos, T. A., & Stalikas, A. (2018). Applied psychometrics... <i>Psychology, 9</i>, 2531-2560.`,
    `Streiner, D. L., Norman, G. R., & Cairney, J. (2015). <i>Health measurement scales (5ª ed.)</i>. Oxford University Press.`
  ];
  const ul = document.getElementById('biblio-list');
  if (!ul) return;
  refs.forEach(txt => {
    const li = document.createElement('li');
    li.innerHTML = txt;
    ul.appendChild(li);
  });
}

/* === 2. Descargables ================================================= */
function renderDescargables() {
  const files = [
    'docs/Ficha_tecnica_instrumento.docx',
    'docs/Plan_trabajo_grupo.docx',
    'docs/Plantilla_panel_expertos.docx',
    'docs/Plantilla_informe_final.docx',
    'docs/Rubrica_evaluacion_informe.pdf',
    'docs/Plantilla_reporte_EFA_CFA.docx',
    'docs/Guia_jamovi_analisis.docx',
    'docs/Consentimiento_informado.docx'
  ];
  const wrap = document.getElementById('descargables-list');
  if (!wrap) return;
  const ul = document.createElement('ul');
  files.forEach(f => {
    const li = document.createElement('li');
    li.innerHTML = `<a href="${f}">${f.split('/').pop()}</a>`;
    ul.appendChild(li);
  });
  wrap.appendChild(ul);
}

/* === 3. Cronograma completo ========================================= */
const cronogramaRows = [
  { n:1, act:'Inscripción de grupos y selección del instrumento',        fechas:'29 jul – 2 ago',   ent:'Lista de grupos e instrumento elegido. Breve justificación.' },
  { n:2, act:'Revisión del instrumento y plan de validación',           fechas:'5 – 9 ago',        ent:'Ficha técnica preliminar, definición de constructo, plan de trabajo.' },
  { n:3, act:'Validez de contenido y apariencia',                       fechas:'12 – 23 ago',      ent:'Panel de expertos, matrices de evaluación, versión ajustada.' },
  { n:4, act:'Estudio piloto y entrevistas cognitivas',                 fechas:'26 ago – 6 sep',   ent:'Resultados del piloto y revisiones. Informe breve.' },
  { n:5, act:'Recolección de datos principal',                          fechas:'9 – 20 sep',       ent:'Base de datos limpia y codificada. Condiciones de aplicación.' },
  { n:6, act:'Análisis psicométrico (EFA, fiabilidad, etc.)',           fechas:'23 – 30 sep',      ent:'Resultados estadísticos y gráficos (Jamovi). Tabla de normas.' },
  { n:7, act:'Redacción y entrega del informe final',                   fechas:'1 – 4 oct',        ent:'Informe completo + anexos (base de datos, salidas Jamovi).' }
];

function renderCronograma() {
  const tbody = document.getElementById('cronograma-body');
  if (!tbody) return;
  cronogramaRows.forEach(r => {
    const tr = document.createElement('tr');
    tr.innerHTML = `<td>${r.n}</td><td>${r.act}</td><td>${r.fechas}</td><td>${r.ent}</td>`;
    tbody.appendChild(tr);
  });
}

/* === 4. Tarjetas de Tests (sólo informativas) ======================== */
const testsData = [
  {sigla:'GSE',   nombre:'Escala de Autoeficacia General',           desc:'Percibida capacidad de manejar situaciones.'},
  {sigla:'PANAS', nombre:'PANAS',                                    desc:'Afecto positivo y negativo.'},
  {sigla:'RSES',  nombre:'Escala de Autoestima de Rosenberg',        desc:'Autoestima global.'},
  {sigla:'ERS-14',nombre:'ERS-14 (Resiliencia)',                     desc:'Capacidad de recuperación ante la adversidad.'},
  {sigla:'PSS',   nombre:'PSS',                                      desc:'Estrés percibido (último mes).'},
  {sigla:'SIAS',  nombre:'SIAS',                                     desc:'Ansiedad social (interacciones).'},
  {sigla:'PSWQ',  nombre:'PSWQ',                                     desc:'Tendencia a la preocupación excesiva.'},
  {sigla:'EES',   nombre:'Escala de Somnolencia de Epworth',         desc:'Somnolencia diurna.'},
  {sigla:'AUDIT', nombre:'AUDIT',                                    desc:'Tamizaje de consumo de alcohol.'},
  {sigla:'DAST-10',nombre:'DAST-10',                                 desc:'Uso de drogas y problemas asociados.'},
  {sigla:'CUBI-18',nombre:'CUBI-18 (Ideación suicida)',              desc:'Conductas e ideación suicida.'},
  {sigla:'SD3',   nombre:'Triada Oscura Abreviada (SD3)',            desc:'Maldad, narcisismo y psicopatía.'},
  {sigla:'CREA',  nombre:'Escala de Autopercepción de Creatividad',  desc:'Autoevaluación de creatividad.'},
];

function renderTestCards() {
  const cont = document.getElementById('cards-tests');
  if (!cont) return;
  testsData.forEach(t => {
    cont.insertAdjacentHTML(
      'beforeend',
      `<article class="card-test">
         <h3>${t.nombre}</h3>
         <p><strong>${t.it}</strong> ítems · ${t.desc}</p>
       </article>`
    );
  });
}

