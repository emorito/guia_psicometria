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

/* === 1. Bibliografía APA 7 (Versión Final Interactiva) ========================================= */
function renderBibliografia() {
  // Nueva estructura de datos: un array de objetos, cada uno con la referencia, el comentario y el enlace.
  const refs = [
    {
      ref: `American Educational Research Association, American Psychological Association, & National Council on Measurement in Education. (2014). <i>Standards for educational and psychological testing</i>. American Educational Research Association.`,
      url: 'https://drive.google.com/file/d/1A3SzT6xnbJxTc1fS_dd13CjW-z6xXlNj/view?usp=sharing',
      comentario: `Este es el documento fundamental en psicometría, la "biblia" de los estándares para el desarrollo, uso e interpretación de tests. Es crucial para entender los principios éticos y técnicos que rigen la validación de cualquier instrumento.`
    },
    {
      ref: `Carretero-Dios, H., & Pérez, C. (2005). Normas para el desarrollo y revisión de estudios instrumentales. <i>International Journal of Clinical and Health Psychology, 5</i>(3), 521-551.`,
      url: 'https://www.redalyc.org/pdf/337/33705307.pdf',
      comentario: `Este artículo es una guía práctica y accesible para diseñar y revisar instrumentos de investigación. Es excelente para entender el "paso a paso" de un estudio instrumental, desde la conceptualización hasta el análisis.`
    },
    {
      ref: `Sireci, S. G., & Benítez Baena, I. (2023). Evidencias sobre la validación de los tests: Una guía práctica. <i>Psicothema, 35</i>(3), 217-224.`,
      url: 'https://scielo.isciii.es/pdf/psicothema/v35n3/1886-144X-psicothema-35-03-217.pdf',
      comentario: `Esta "guía práctica" es esencial para comprender los diferentes tipos de evidencia de validez (contenido, constructo, criterio) y cómo se recogen. Ofrece una visión concisa y actualizada de las mejores prácticas.`
    },
    {
      ref: `Pérez-Rivas, F. J., et al. (2023). Design and content validation using expert opinions of an instrument assessing the lifestyle of adults: The ‘PONTE A 100’ Questionnaire. <i>Healthcare, 11</i>(20), 2038.`,
      url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC10379326/pdf/healthcare-11-02038.pdf',
      comentario: `Este artículo es un ejemplo muy claro y reciente de cómo realizar la validez de contenido utilizando el juicio de expertos. Es particularmente útil para la primera fase del proyecto.`
    },
    {
      ref: `Holguín Villamil, O. A. (2021). Proceso de validación y fiabilidad del instrumento de investigación transmedia. <i>REIDU: Revista de Investigación y Desarrollo Universitario, 10</i>(1), 107-120.`,
      url: 'https://reidu.cl/index.php/REIDU/article/view/92',
      comentario: `Aunque se centra en un instrumento específico, este texto es útil porque describe el proceso completo de validación y fiabilidad de manera aplicada, ayudando a visualizar las etapas y análisis involucrados.`
    }
  ];
  
  const ul = document.getElementById('biblio-list');
  if (!ul) return;
  ul.innerHTML = ''; // Limpiamos la lista por si acaso

  // Ahora, creamos el HTML para cada tarjeta desplegable
  refs.forEach((item, index) => {
    const li = document.createElement('li');
    li.className = 'biblio-item';
    
    // Usamos el truco del checkbox oculto para controlar el despliegue
   li.innerHTML = `
     <div class="ref-text">${item.ref}</div>
     <div class="ref-actions">
       <a href="${item.url}" target="_blank">Acceder al documento</a>
       <span class="action-separator">|</span>
       <label for="biblio-toggle-${index}">Leer comentario</label>
     </div>
     <input type="checkbox" id="biblio-toggle-${index}" class="biblio-toggle">
     <div class="ref-comment">${item.comentario}</div>
   `;
    ul.appendChild(li);
  });
}

/* ==================================================================== */
/* ===       RENDER-PAGE.JS - VERSIÓN FINAL Y MEJORADA            === */
/* ==================================================================== */

// El resto de tu archivo (DOMContentLoaded, renderBibliografia, etc.) se queda igual...

/* --- FUNCIÓN A REEMPLAZAR --- */

/* === 2. Descargables ================================================= */
function renderDescargables() {
  // En lugar de una lista de strings, usamos una lista de objetos.
  // Cada objeto tiene la ruta 'path' y el nombre amigable 'name'.
  const files = [
    { path: 'docs/Ficha_tecnica_instrumento.docx', name: 'Ficha Técnica del Instrumento' },
    { path: 'docs/Plan_trabajo_grupo.docx', name: 'Plan de Trabajo del Grupo' },
    { path: 'docs/Plantilla_panel_expertos.docx', name: 'Plantilla para Panel de Expertos' },
    { path: 'docs/Consentimiento_informado.docx', name: 'Modelo de Consentimiento Informado' },
    { id: 'open-jamovi-guide', name: 'Guía Interactiva de Jamovi' },
    { path: 'docs/Plantilla_reporte_EFA_CFA.docx', name: 'Plantilla para Reporte EFA/CFA' },
    { path: 'docs/Plantilla_informe_final.docx', name: 'Plantilla del Informe Final' },
    { path: 'docs/Rubrica_evaluacion_informe.pdf', name: 'Rúbrica de Evaluación del Informe' }
  ];
  
  const wrap = document.getElementById('descargables-list');
  if (!wrap) return;

  // Creamos la lista <ul>
  const ul = document.createElement('ul');
  
  // Ahora, iteramos sobre la nueva lista de objetos.
  files.forEach(file => {
  const li = document.createElement('li');
  if (file.id) {
    // Si tiene un ID, es un botón, no un enlace de descarga
    li.innerHTML = `<button id="${file.id}" class="btn-jamovi-guide">${file.name}</button>`;
  } else {
    // Si tiene 'path', es un enlace de descarga normal
    li.innerHTML = `<a href="${file.path}">${file.name}</a>`;
  }
  ul.appendChild(li);
});
   
  
  // Limpiamos el contenedor y añadimos la nueva lista.
  wrap.innerHTML = '';
  wrap.appendChild(ul);
}


// El resto de funciones (renderCronograma, renderTestCards) se quedan igual...

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
// Este array contiene los datos actualizados de los tests.
// Se ha añadido el nombre completo para las siglas y se ha
// ampliado la descripción para ser más clara y concisa.
// También se ha incluido la cantidad de ítems ('it') para cada instrumento.
const testsData = [
  {sigla:'GSE', nombre:'Escala de Autoeficacia General', desc:'Evalúa la creencia de una persona en su capacidad para manejar situaciones difíciles y afrontar nuevos desafíos.', it:10},
  {sigla:'PANAS', nombre:'Escala de Afecto Positivo y Negativo', desc:'Mide las dimensiones de afecto positivo (entusiasmo, actividad, alerta) y afecto negativo (miedo, tristeza, irritabilidad).', it:20},
  {sigla:'RSES', nombre:'Escala de Autoestima de Rosenberg', desc:'Evalúa los sentimientos globales de valía personal y aceptación de uno mismo.', it:10},
  {sigla:'ERS-14', nombre:'Escala de Resiliencia ERS-14', desc:'Mide la capacidad de una persona para adaptarse y recuperarse positivamente ante situaciones de adversidad, trauma o estrés.', it:14},
  {sigla:'PSS', nombre:'Escala de Estrés Percibido', desc:'Cuantifica el grado en que las situaciones de la vida de una persona son evaluadas como estresantes en el último mes.', it:10},
  {sigla:'SIAS', nombre:'Escala de Ansiedad Social', desc:'Evalúa el miedo y la ansiedad en situaciones de interacción social y de actuación en público.', it:20},
  {sigla:'PSWQ', nombre:'Cuestionario de Preocupación de Penn State', desc:'Mide la tendencia a experimentar una preocupación excesiva, intrusiva y difícil de controlar en diversas áreas.', it:16},
  {sigla:'EES', nombre:'Escala de Somnolencia de Epworth', desc:'Evalúa la probabilidad de quedarse dormido en diferentes situaciones cotidianas, midiendo la somnolencia diurna general.', it:8},
  {sigla:'AUDIT', nombre:'Cuestionario de Identificación de Trastornos por Consumo de Alcohol', desc:'Es una herramienta de cribado para identificar el consumo de alcohol de riesgo, perjudicial o dependiente.', it:10},
  {sigla:'DAST-10', nombre:'Test de Abuso de Drogas de 10 ítems', desc:'Identifica el uso problemático de drogas y los problemas asociados en el último año.', it:10},
  {sigla:'CUBI-18', nombre:'Cuestionario de Urgencia, Búsqueda e Impulsividad', desc:'Evalúa la impulsividad a través de tres subtipos principales: impulsividad por imprevisión, búsqueda de sensaciones y urgencia compulsiva', it:18},
  {sigla:'SD3', nombre:'Triada Oscura Abreviada', desc:'Mide los rasgos de personalidad de la triada oscura: Maquiavelismo, Narcisismo y Psicopatía.', it:27},
  {sigla:'CREA', nombre:'Escala de Autopercepción de Creatividad', desc:'Evalúa la percepción de una persona sobre su propia capacidad para generar ideas originales, resolver problemas y crear.', it:30},
];

// Esta función se encarga de renderizar dinámicamente las tarjetas de los tests.
// El HTML generado ahora incluye todos los datos solicitados de forma clara.
function renderTestCards() {
  const cont = document.getElementById('cards-tests');
  if (!cont) return;
  cont.innerHTML = '';

  testsData.forEach(t => {
    // Definimos las variables con los datos del test, usando fallbacks seguros.
    const siglaTest = t.sigla || 'N/A';
    const nombreTest = t.nombre || 'Nombre no disponible';
    const descripcionTest = t.desc || 'Descripción no disponible.';
    const itemsTest = t.it ? `<strong>${t.it}</strong> ítems` : 'N/A';
    
    // Insertamos la tarjeta con todos los elementos formateados.
    cont.insertAdjacentHTML(
      'beforeend',
      `<article class="card-test p-4 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
         <h3 class="text-xl font-bold text-gray-800 mb-2">
           <span class="text-blue-600">${siglaTest}</span>: ${nombreTest}
         </h3>
         <p class="text-gray-600 text-sm mb-2">${descripcionTest}</p>
         <p class="text-gray-500 text-xs font-semibold">${itemsTest}</p>
       </article>`
    );
  });
}






