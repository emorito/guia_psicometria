/* chat.js – mini Q&A sin servidor  */

const Chat = {
  bancos: {
    conceptos: null,
    decisiones: null
  },

  async init() {
    // carga ambos JSON (una sola vez)
    if (!this.bancos.conceptos)
      this.bancos.conceptos = await Utils.loadJSON('data/qa_conceptos.json');
    if (!this.bancos.decisiones)
      this.bancos.decisiones = await Utils.loadJSON('data/qa_decisiones.json');

    // listeners UI
    document.getElementById('chat-send').onclick = () => this.responder();
    document.getElementById('chat-input').addEventListener('keydown', e => {
      if (e.key === 'Enter') this.responder();
    });
  },

  /* Responde a la entrada del usuario */
  responder() {
    const txt = document.getElementById('chat-input').value.trim().toLowerCase();
    if (!txt) return;

    const dominio = document.getElementById('chat-domain').value;
    const banco = this.bancos[dominio];

    // Busca coincidencia simple en tags o pregunta
    const hit = banco.find(item =>
      item.tags?.some(t => txt.includes(t)) ||
      item.q.toLowerCase().includes(txt)
    );

    const log = document.getElementById('chat-log');
    const cardQ = `<div class="bubble user">${txt}</div>`;
    const cardA = hit
      ? `<div class="bubble bot">${hit.a}</div>`
      : `<div class="bubble bot">❓ No encontré una respuesta guardada. Intenta otra palabra clave.</div>`;

    log.insertAdjacentHTML('beforeend', cardQ + cardA);
    log.scrollTop = log.scrollHeight;

    document.getElementById('chat-input').value = '';
  }
};

/* inicia cuando cargue el DOM */
document.addEventListener('DOMContentLoaded', () => Chat.init());
