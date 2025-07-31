/* utils.js – helpers centrales
   --------------------------------------------------------------*/
document.addEventListener('DOMContentLoaded', () => {
  renderBibliografia();
  renderDescargables();
  renderCronograma();
  renderTests();
});

/* ---------- Bibliografía APA mínima ---------- */
function renderBibliografia() {
  const refs = [
    `American Educational Research Association, American Psychological Association, & National Council on Measurement in Education. (2014). <i>Standards for educational and psychological testing</i>.`,
    `Boateng, G. O., Neilands, T. B., Frongillo, E. A., Melgar-Quiñonez, H. R., & Young, S. L. (2018). Best practices for developing and validating scales… <i>Frontiers in Public Health, 6</i>, 149.`,
    `DeVellis, R. F., & Thorpe, A. (2022). <i>Scale development: Theory and applications</i>.`,
    `Kyriazos, T. A., & Stalikas, A. (2018). Applied psychometrics… <i>Psychology, 9</i>, 2531–2560.`,
    `Streiner, D. L., Norman, G. R., & Cairney, J. (2015). <i>Health measurement scales</i>.`
  ];
  const ul = document.getElementById('biblio-list');
  refs.forEach(txt => {
    const li = document.createElement('li');
    li.innerHTML = txt;
    ul.appendChild(li);
  });
}

/* ---------- Descargables ---------- */
function renderDescargables() {
  const archivos = [
    'Ficha_tecnica_instrumento.docx',
    'Plan_trabajo_grupo.docx',
    'Plantilla_panel_expertos.docx',
    'Plantilla_informe_final.docx',
    'Rubrica_evaluacion_informe.pdf',
    'Plantilla_reporte_EFA_CFA.docx',
    'Guia_jamovi_analisis.docx',
    'Consentimiento_informado.docx'
  ];
  const cont = document.getElementById('descargables-list');
  const ul = document.createElement('ul');
  archivos.forEach(file => {
    const li = document.createElement('li');
    li.innerHTML = `<a href="docs/${file}">${file}</a>`;
    ul.appendChild(li);
  });
  cont.appendChild(ul);
}

/* ---------- Cronograma (completo) ---------- */
const cronogramaData = [
  {et:1, act:'Inscripción de grupos y selección del instrumento', fechas:'29 jul – 2 ago',  ent:'Lista de grupos e instrumento elegido. Breve justificación.'},
  {et:2, act:'Revisión del instrumento y plan de validación',      fechas:'5 – 9 ago',      ent:'Ficha técnica preliminar, definición de constructo, plan de trabajo.'},
  {et:3, act:'Validez de contenido y apariencia',                  fechas:'12 – 23 ago',    ent:'Panel de expertos, matrices de evaluación, versión ajustada.'},
  {et:4, act:'Estudio piloto y entrevistas cognitivas',            fechas:'26 ago – 6 sep', ent:'Resultados del piloto y revisiones. Informe breve.'},
  {et:5, act:'Recolección de datos principal',                     fechas:'9 – 20 sep',     ent:'Base de datos limpia y codificada. Condiciones de aplicación.'},
  {et:6, act:'Análisis psicométrico (EFA, fiabilidad, etc.)',      fechas:'23 – 30 sep',    ent:'Resultados estadísticos y gráficos (Jamovi). Tabla de normas si aplica.'},
  {et:7, act:'Redacción y entrega del informe final',              fechas:'1 – 4 oct',      ent:'Informe completo + anexos (base de datos, salidas Jamovi).'}
];

function renderCronograma(){
  const tbody = document.getElementById('cronograma-body');
  cronogramaData.forEach(r=>{
    const tr = document.createElement('tr');
    tr.innerHTML = `<td>${r.et}</td><td>${r.act}</td><td>${r.fechas}</td><td>${r.ent}</td>`;
    tbody.appendChild(tr);
  });
}

/* ---------- Tests sugeridos (solo visual) ---------- */
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
  {sigla:'OTRO',  nombre:'Otro',                                     desc:'Espacio abierto a propuesta del grupo.'}
];

function renderTests(){
  const cont = document.getElementById('cards-tests');
  testsData.forEach(t=>{
    const card = document.createElement('div');
    card.className = 'card-test';
    card.innerHTML = `<h3>${t.nombre}</h3><p>${t.desc}</p>`;   // sin botón
    cont.appendChild(card);
  });
}

/* ---------- Utilidades generales ---------- */
export const Utils = {
  async loadJSON(path){
    const res = await fetch(path);
    if(!res.ok) throw new Error(`No se pudo cargar ${path}`);
    return res.json();
  },
  shuffle(arr){
    for(let i=arr.length-1;i>0;i--){
      const j=Math.floor(Math.random()*(i+1));
      [arr[i],arr[j]]=[arr[j],arr[i]];
    }
    return arr;
  }
};
