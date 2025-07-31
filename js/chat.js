/* chat.js – Q&A sin servidor */

let qa_conceptos = [], qa_decisiones = [];

fetch('data/qa_conceptos.json').then(r=>r.json()).then(d=>qa_conceptos=d);
fetch('data/qa_decisiones.json').then(r=>r.json()).then(d=>qa_decisiones=d);

document.getElementById('sendBtn').addEventListener('click', reply);
document.getElementById('userQuestion').addEventListener('keydown', e=>{
  if(e.key==='Enter') reply();
});

function reply(){
  const scope = document.getElementById('scope').value;
  const q = document.getElementById('userQuestion').value.trim().toLowerCase();
  if(!q){ alert('Escribe tu pregunta.'); return; }

  const db = scope === 'qa_conceptos' ? qa_conceptos : qa_decisiones;
  const hit = db.find(item => item.q.toLowerCase().includes(q) ||
                              item.tags?.some(t=>q.includes(t)));
  const answer = hit ? hit.a : 'No encontré una respuesta exacta. Intenta con otra palabra clave.';
  document.getElementById('chatAnswer').textContent = answer;
}
