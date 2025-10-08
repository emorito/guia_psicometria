/* export-pdf.js – Exportar resultados con jsPDF */
function exportQuizPDF(key, total, score) {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();
  doc.setFontSize(16);
  doc.text('Resultados del quiz: ' + key, 14, 22);
  doc.setFontSize(12);
  doc.text('Preguntas: ' + total, 14, 32);
  doc.text('Aciertos: ' + score, 14, 40);
  doc.text('Fecha: ' + new Date().toLocaleDateString(), 14, 48);
  doc.save('resultados_' + key + '.pdf');
}
