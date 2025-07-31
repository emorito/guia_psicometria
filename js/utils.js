/* utils.js – helpers para renderizar contenidos dinámicos
   ====================================================== */

document.addEventListener('DOMContentLoaded', () => {
  renderBibliografia();
  renderDescargables();
  renderCronograma();
  renderTestCards();
});

/* ---------- 1. Bibliografía (APA 7) ------------------- */
function renderBibliografia() {
  const refs = [
    `American Educational Research Association, American Psychological Association, & National Council on Measurement in Education. (2014). <i>Standards for Educational and Psychological Testing</i>.`,
    `Boateng, G. O., Neilands, T. B., Frongillo, E. A., Melgar-Quiñonez, H. R., & Young, S. L. (2018). Best practices for developing and validating scales… <i>Frontiers in Public Health, 6</i>, 149.`,
    `DeVellis, R. F., & Thorpe, A. (2022). <i>Scale Development: Theory and Applications</i>.`,
    `Kyriazos, T. A., & Stalikas, A. (2018). Applied psychometrics… <i>Psychology, 9</i>, 2531-2560.`,
    `Streiner, D. L., Norman, G. R., & Cairney, J. (2015). <i>Health Measurement Scales</i>.`
  ];
  const ul = document.getElementById('biblio-list');
  if (!ul) return;
  refs.forEach(txt => {
    const li = document.createElement('li');
    li.innerHTML = txt;
    ul.appendChild(li);
  });
}

/* ---------- 2. Descargables --------------------------- */
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
  const div = document.getElementById('descargables-list');
  if (!div) return;
  const ul = document.createElement('ul');
  files.forEach(path => {
    const li = document.createElement('li');
    li.innerHTML = `<a href="${path}">${path.split('/').pop()}</a>`;
    ul.appendChild(li);
  });
  div.appendChild(ul);
}

/* ---------- 3. Cronograma ----------------------------- */
const cronogramaData = [
  { etapa: 1, actividad: 'Inscripción de grupos y selección del instrumento', fechas: '29 jul – 2 ago',    entreg: 'Lista de grupos + justificación.' },
  { etapa: 2, actividad: 'Revisión del instrumento y plan de validación',      fechas: '5 – 9 ago',        entreg: 'Ficha técnica + plan.' },
  { etapa: 3, actividad: 'Validez de contenido y apariencia',                  fechas: '12 – 23 ago',      entreg: 'Panel de expertos, CVI/V de Aiken.' },
  { etapa: 4, actividad: 'Estudio piloto e entrevistas cognitivas',            fechas: '26 ago – 6 sep',    entreg: 'Informe de piloto y revisiones.' },
  { etapa: 5, actividad: 'Recolección de datos principal',                     fechas: '9 – 20 sep',       entreg: 'Base de datos limpia.' },
  { etapa: 6, actividad: 'Análisis psicométrico (EFA, fiabilidad, etc.)',      fechas: '23 – 30 sep',      entreg: 'Resultados Jamovi + tablas.' },
  { etapa: 7, actividad: 'Redacción y entrega del informe final',              fechas: '1 – 4 oct',        entreg: 'Informe completo + anexos.' }
];

function renderCronograma() {
  const tbody = document.getElementById('cronograma-body');   // <-- asegúrate de tener este id
  if (!tbody) return;
  cronogramaData.forEach(r => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${r.etapa}</td>
      <td>${r.actividad}</td>
      <td>${r.fechas}</td>
      <td>${r.entreg}</td>`;
    tbody.appendChild(tr);
  });
}

/* ---------- 4. Tarjetas de tests ---------------------- */
/*   Sin botones de selección (el Google Form se encarga) */
const testsData = [
  { sigla:'GSE',   name:'Escala de Autoeficacia General',           it:10, desc:'Percibida capacidad para afrontar dificultades.' },
  { sigla:'PANAS', name:'PANAS',                                    it:20, desc:'Afecto positivo y negativo.' },
  { sigla:'RSES',  name:'Escala de Autoestima de Rosenberg',        it:10, desc:'Autoestima global.' },
  { sigla:'RS14',  name:'ERS-14 (Resiliencia)',                     it:14, desc:'Capacidad de recuperación ante la adversidad.' },
  { sigla:'PSS',   name:'PSS',                                      it:10, desc:'Estrés percibido (último mes).' },
  { sigla:'SIAS',  name:'SIAS (Ansiedad Social)',                   it:20, desc:'Miedo a la evaluación social.' },
  { sigla:'PSWQ',  name:'PSWQ (Preocupación Patológica)',           it:16, desc:'Tendencia a la preocupación excesiva.' },
  { sigla:'EES',   name:'Escala de Somnolencia de Epworth',         it:8,  desc:'Somnolencia diurna.' },
  { sigla:'AUDIT', name:'AUDIT',                                    it:10, desc:'Consumo de alcohol y riesgos asociados.' },
  { sigla:'DAST',  name:'DAST-10',                                  it:10, desc:'Consumo de drogas (tamizaje).' },
  { sigla:'CUBI',  name:'CUBI-18 (Ideación suicida)',               it:18, desc:'Conductas e ideación suicida.' },
  { sigla:'SD3',   name:'Triada Oscura Abreviada (SD3)',            it:27, desc:'Maldad, narcisismo, psicopatía.' },
  { sigla:'CREA',  name:'Escala de Autopercepción de Creatividad',  it:12, desc:'Autoevaluación de creatividad.' },
  { sigla:'OTRO',  name:'Otro',                                     it:'—', desc:'Propuesta libre del equipo.' }
];

function renderTestCards() {
  const cont = document.getElementById('cards-tests');
  if (!cont) return;
  testsData.forEach(t => {
    const card = document.createElement('article');
    card.className = 'test-card';
    card.innerHTML = `
      <h3>${t.name}</h3>
      <p><strong>${t.sigla}</strong> · ${t.it} ítems</p>
      <p class="small">${t.desc}</p>`;
    cont.appendChild(card);
  });
}

/* ---------- 5. Utils genéricos ------------------------ */
const Utils = {
  async loadJSON(path) {
    const res = await fetch(path);
    if (!res.ok) throw new Error(`No se pudo cargar ${path}`);
    return res.json();
  },
  shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }
};
