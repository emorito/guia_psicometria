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
/* === CRONOGRAMA ===================================================== */
const cronogramaData = [
  { etapa: 1, act: 'Inscripción de grupos y selección del instrumento',             fechas: '29 jul – 2 ago',   entreg: 'Lista de grupos e instrumento elegido. Breve justificación.' },
  { etapa: 2, act: 'Revisión del instrumento y plan de validación',                fechas: '5 – 9 ago',        entreg: 'Ficha técnica preliminar, definición de constructo, plan de trabajo.' },
  { etapa: 3, act: 'Validez de contenido y apariencia',                            fechas: '12 – 23 ago',      entreg: 'Panel de expertos, matrices de evaluación, versión ajustada.' },
  { etapa: 4, act: 'Estudio piloto y entrevistas cognitivas',                      fechas: '26 ago – 6 sep',   entreg: 'Resultados del piloto y revisiones. Informe breve.' },
  { etapa: 5, act: 'Recolección de datos principal',                               fechas: '9 – 20 sep',       entreg: 'Base de datos limpia y codificada. Condiciones de aplicación.' },
  { etapa: 6, act: 'Análisis psicométrico (EFA, fiabilidad, etc.)',                fechas: '23 – 30 sep',      entreg: 'Resultados estadísticos y gráficos (Jamovi). Tabla de normas si aplica.' },
  { etapa: 7, act: 'Redacción y entrega del informe final',                        fechas: '1 – 4 oct',        entreg: 'Informe completo + anexos (base de datos, salidas Jamovi).' }
];

function renderCronograma(){
  const tbody = document.getElementById('cronograma-body');
  if(!tbody) return;
  cronogramaData.forEach(r=>{
     const tr=document.createElement('tr');
     tr.innerHTML = `<td>${r.etapa}</td><td>${r.act}</td><td>${r.fechas}</td><td>${r.entreg}</td>`;
     tbody.appendChild(tr);
  });
}

document.addEventListener('DOMContentLoaded', ()=>{
  renderCronograma();
  renderTests();       // ← función de tarjetas (ver bloque 2)
  renderDescargables();// ← si ya la tienes
});


/* === TARJETAS DE TESTS ============================================= */
const testsData = [
  { nombre:'Escala de Autoeficacia General',           codigo:'AEG',  desc:'Percibida capacidad de manejar situaciones.'},
  { nombre:'PANAS',                                    codigo:'PANAS',desc:'Afecto positivo y negativo.'},
  { nombre:'Escala de Autoestima de Rosenberg',        codigo:'ROS',  desc:'Autoestima global.'},
  { nombre:'ERS-14 (Resiliencia)',                     codigo:'ERS',  desc:'Capacidad de recuperación ante la adversidad.'},
  { nombre:'PSS (Percceived Stress Scale)',            codigo:'PSS',  desc:'Percepción de estrés percibido.'},
  { nombre:'SIAS (Ansiedad Social)',                   codigo:'SIAS', desc:'Miedo a evaluaciones sociales.'},
  { nombre:'PSWQ (Preocupación Patológica)',           codigo:'PSWQ', desc:'Tendencia a la preocupación excesiva.'},
  { nombre:'Escala de Somnolencia de Epworth',         codigo:'EES',  desc:'Somnolencia diurna.'},
  { nombre:'AUDIT',                                    codigo:'AUDIT',desc:'Uso de alcohol y riesgos asociados.'},
  { nombre:'DAST-10',                                  codigo:'DAST', desc:'Consumo y problemas relacionados con drogas.'},
  { nombre:'CUBI-18 (Ideación suicida)',               codigo:'CUBI', desc:'Conductas e ideación suicida.'},
  { nombre:'Triada Oscura Abreviada (SD3)',            codigo:'SD3',  desc:'Maldad, narcisismo, psicopatía.'},
  { nombre:'Escala de Autopercepción de Creatividad',  codigo:'CREA', desc:'Autoevaluación de creatividad.'},
  { nombre:'Otro',                                     codigo:'OTRO', desc:'Espacio abierto para propuestas del equipo.'}
];

function renderTests(){
  const cont=document.getElementById('cards-tests');
  if(!cont) return;
  testsData.forEach(t=>{
    const card=document.createElement('article');
    card.className='test-card';
    card.innerHTML = `
       <h3>${t.nombre}</h3>
       <p>${t.desc}</p>
       <button onclick="alert('Has seleccionado: ${t.nombre}')">Seleccionar</button>`;
    cont.appendChild(card);
  });
}
