/* ============================================================
   NOW SOLUÇÕES — now.js
   Interações extraídas do design system canônico
   (now-design-system-v1-3.html) + navegação do site.
   ============================================================ */

const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const fine = window.matchMedia('(hover:hover) and (pointer:fine)').matches;

/* ---------- tema claro/escuro ----------
   Escuro é o padrão da marca. Preferência salva quando possível
   (try/catch: em ambientes sem storage, só vale pra sessão). */
(function theme(){
  const root = document.documentElement;
  let saved = null;
  try{ saved = localStorage.getItem('now-theme'); }catch(e){}
  if (saved === 'light') root.setAttribute('data-theme','light');

  const toggle = document.getElementById('themeToggle');
  if (!toggle) return;
  toggle.addEventListener('click', ()=>{
    const next = root.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
    root.classList.add('theming');
    if (next === 'light') root.setAttribute('data-theme','light');
    else root.removeAttribute('data-theme');
    try{ localStorage.setItem('now-theme', next); }catch(e){}
    clearTimeout(window.__themeT);
    window.__themeT = setTimeout(()=> root.classList.remove('theming'), 550);
  });
})();

/* ---------- intro do hero (monólito → composição) ---------- */
if (reduced){
  document.body.classList.add('no-intro');
} else {
  /* .built dispara a cascata de entrada dos elementos reais */
  requestAnimationFrame(()=> document.body.classList.add('built'));
}

/* ---------- menu mobile ---------- */
(function mobileMenu(){
  const btn = document.getElementById('menuBtn');
  const menu = document.getElementById('mobileMenu');
  if (!btn || !menu) return;
  btn.addEventListener('click', ()=>{
    const open = menu.classList.toggle('open');
    btn.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
  /* fecha ao navegar por âncora interna */
  menu.querySelectorAll('a').forEach(a=>{
    a.addEventListener('click', ()=>{
      menu.classList.remove('open');
      btn.setAttribute('aria-expanded','false');
    });
  });
})();

/* ---------- nav flutuante dentro do hero (Home) ----------
   Nasce transparente e solta, dentro do card do hero. Assim que a
   página rola, a nav se compacta e se fixa no topo — permanecendo
   SEMPRE visível durante toda a rolagem (não some ao descer). No
   topo da página volta ao estado solto/transparente. */
(function floatingNav(){
  if (!document.body.classList.contains('home')) return;
  const nav = document.querySelector('.topnav');
  const menuBtn = document.getElementById('menuBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  if (!nav) return;

  const TOP = 32;

  function update(){
    const menuOpen = !!(mobileMenu && mobileMenu.classList.contains('open'));
    nav.classList.remove('nav-hidden');
    nav.classList.toggle('scrolled', window.scrollY > TOP || menuOpen);
  }
  update();
  window.addEventListener('scroll', update, { passive:true });
  if (menuBtn) menuBtn.addEventListener('click', update);
})();

/* ---------- rolagem suave (lerp por interceptação de wheel) ----------
   Mantém o layout nativo (IntersectionObserver e âncoras seguem
   funcionando). Touch e reduced-motion ficam com rolagem nativa. */
(function smoothScroll(){
  if (reduced || !fine) return;
  let target = window.scrollY;
  let current = target;
  let rafId = null;
  const EASE = 0.095;
  const max = () => document.documentElement.scrollHeight - window.innerHeight;

  function update(){
    current += (target - current) * EASE;
    if (Math.abs(target - current) < 0.5){
      current = target;
      window.scrollTo(0, current);
      rafId = null;
      return;
    }
    window.scrollTo(0, current);
    rafId = requestAnimationFrame(update);
  }
  function kick(){ if(!rafId) rafId = requestAnimationFrame(update); }

  window.addEventListener('wheel', (e)=>{
    if (e.ctrlKey) return;              /* preserva zoom por pinch/ctrl */
    e.preventDefault();
    target = Math.max(0, Math.min(target + e.deltaY, max()));
    kick();
  }, { passive:false });

  /* sync quando o usuário usa a barra de rolagem ou teclado */
  window.addEventListener('scroll', ()=>{
    if (rafId === null){ target = current = window.scrollY; }
  }, { passive:true });

  /* âncoras da página com a mesma suavidade */
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click', (e)=>{
      const href = a.getAttribute('href');
      if (!href || href === '#') return;
      const el = document.querySelector(href);
      if(!el) return;
      e.preventDefault();
      target = Math.max(0, Math.min(el.getBoundingClientRect().top + window.scrollY - 80, max()));
      kick();
    });
  });
})();

/* ---------- reveal + stagger ----------
   Blocos mais altos que a tela nunca atingem 50% visível (ex.: grades
   de card com foto, no mobile) — usam um limiar bem menor pra não
   ficar preso em opacity:0 pra sempre. */
const io = new IntersectionObserver((entries)=>{
  entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); } });
},{threshold:.5});
const ioTall = new IntersectionObserver((entries)=>{
  entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('in'); ioTall.unobserve(e.target); } });
},{threshold:.15});
document.querySelectorAll('.reveal, .stagger').forEach(el=>{
  const tall = el.getBoundingClientRect().height > window.innerHeight * 1.3;
  (tall ? ioTall : io).observe(el);
});

/* fluxo: dispara desenho das linhas quando entra na tela */
const flow = document.getElementById('flowDiagram');
if (flow){
  const fio = new IntersectionObserver((es)=>{
    es.forEach(e=>{ if(e.isIntersecting){ flow.classList.add('in'); fio.unobserve(flow); } });
  },{threshold:.3});
  fio.observe(flow);
}

/* ---------- spotlight nos .glass ---------- */
if (fine){
  document.querySelectorAll('.glass').forEach(card=>{
    card.addEventListener('pointermove', (e)=>{
      const r = card.getBoundingClientRect();
      card.style.setProperty('--mx', ((e.clientX - r.left) / r.width * 100) + '%');
      card.style.setProperty('--my', ((e.clientY - r.top) / r.height * 100) + '%');
    });
  });

  const bp = document.getElementById('blueprint');
  if (bp && !reduced){
    bp.addEventListener('pointermove', (e)=>{
      const r = bp.getBoundingClientRect();
      const rx = ((e.clientY - r.top) / r.height - .5) * -7;
      const ry = ((e.clientX - r.left) / r.width - .5) * 9;
      bp.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg)`;
    });
    bp.addEventListener('pointerleave', ()=>{ bp.style.transform = ''; });
  }
}

/* ---------- contador nos specs ----------
   Igual ao canônico, com suporte a data-prefix / data-suffix
   pra valores como "+110", "–50%" e "20 mil". */
const specIO = new IntersectionObserver((entries)=>{
  entries.forEach(entry=>{
    if(!entry.isIntersecting) return;
    const el = entry.target;
    const t0 = performance.now();
    const targetN = parseInt(el.dataset.count, 10);
    const prefix = el.dataset.prefix || '';
    const suffix = el.dataset.suffix || '';
    const pad = el.textContent.trim().startsWith('0');
    function step(t){
      const p = Math.min((t - t0)/1200, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      let v = Math.round(targetN * eased);
      el.textContent = prefix + (pad && v < 10 ? '0'+v : v) + suffix;
      if(p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
    specIO.unobserve(el);
  });
},{threshold:.5});
if(!reduced){
  document.querySelectorAll('.spec .n[data-count]').forEach(el=>specIO.observe(el));
}

/* ---------- carrossel genérico (hero + onde aplicamos) ----------
   Crossfade com avanço automático, dots, setas e pausa no hover.
   `data-slide` marca cada slide, `data-goto` os dots. */
function initCarousel(root, opts){
  if (!root) return;
  const interval = (opts && opts.interval) || 6000;
  const slides = [...root.querySelectorAll('[data-slide]')];
  const dots = [...root.querySelectorAll('[data-goto]')];
  if (slides.length < 2) return;
  let idx = Math.max(0, slides.findIndex(s => s.classList.contains('is-active')));
  let timer = null;

  function show(next){
    next = (next + slides.length) % slides.length;
    if (next === idx) return;
    slides[idx].classList.remove('is-active');
    if (dots[idx]) dots[idx].classList.remove('is-active');
    idx = next;
    slides[idx].classList.add('is-active');
    if (dots[idx]) dots[idx].classList.add('is-active');
  }
  function play(){ stop(); if (reduced) return; timer = setInterval(()=> show(idx + 1), interval); }
  function stop(){ if (timer) clearInterval(timer); timer = null; }

  dots.forEach((d, i)=> d.addEventListener('click', ()=>{ show(i); play(); }));
  root.querySelectorAll('[data-prev]').forEach(b=> b.addEventListener('click', ()=>{ show(idx - 1); play(); }));
  root.querySelectorAll('[data-next]').forEach(b=> b.addEventListener('click', ()=>{ show(idx + 1); play(); }));

  if (fine){
    root.addEventListener('pointerenter', stop);
    root.addEventListener('pointerleave', play);
  }
  play();
}
initCarousel(document.getElementById('heroCarousel'), { interval: 6500 });

/* ---------- montagem por rolagem (onde aplicamos) ----------
   As colunas entram pelas laterais (as da esquerda vêm da
   esquerda, as da direita vêm da direita) na proporção exata
   de quanto a seção já rolou pra dentro da tela. Não é um
   reveal de uma vez só: soltar o scroll a qualquer altura
   deixa as colunas paradas naquele tanto, e rolar pra cima
   desmonta na mesma proporção — sem passo fixo de animação. */
(function scrollAssemble(){
  const section = document.getElementById('ondeAplicamos');
  if (!section) return;
  const cols = [...section.querySelectorAll('[data-assemble]')];
  if (!cols.length) return;

  if (reduced || window.innerWidth < 720){
    cols.forEach(c=>{ c.style.opacity = 1; c.style.transform = 'none'; });
    return;
  }

  const half = Math.ceil(cols.length / 2);
  const stagger = 0.09; /* defasagem por card — cada um tem seu próprio tempo */
  const totalStagger = stagger * (cols.length - 1);
  let ticking = false;

  function update(){
    ticking = false;
    const r = section.getBoundingClientRect();
    const vh = window.innerHeight;
    /* termina montado quando a seção chega no MEIO da tela, não no
       fim do scroll — janela de vh*1.0 (entrando) até vh*0.5 (centro). */
    let raw = (vh * 1.0 - r.top) / (vh * 0.5);
    raw = Math.max(0, Math.min(1, raw));
    cols.forEach((col, i)=>{
      const fromLeft = i < half;
      /* cada card começa sua própria janela um pouco depois do
         anterior, mas todos terminam juntos quando raw chega em 1 */
      let p = (raw - i * stagger) / (1 - totalStagger);
      p = Math.max(0, Math.min(1, p));
      const eased = 1 - Math.pow(1 - p, 2);
      const dist = (1 - eased) * 70; /* em vw: sai de fora da tela de verdade */
      const dir = fromLeft ? -1 : 1;
      col.style.transform = `translateX(${dir * dist}vw)`;
      col.style.opacity = String(eased);
    });
  }
  function onScroll(){ if (!ticking){ ticking = true; requestAnimationFrame(update); } }

  window.addEventListener('scroll', onScroll, { passive:true });
  window.addEventListener('resize', onScroll);
  update();
})();

/* ---------- linhas conectoras: "impacto" → "o que fazemos" ----------
   Mesmo traço tracejado azul do conector "o que fazemos → cidade", só
   que com um ramo saindo de cada um dos 4 números de Impacto (+110,
   +15, 20 mil, +140) e convergindo num único ponto no topo do painel
   azul de "O que fazemos" — como se os números alimentassem o
   ecossistema descrito ali dentro. */
(function appConnectorLines(){
  const svg = document.getElementById('appConnectorSvg');
  const target = document.getElementById('whatWeDoCard');
  const node = document.getElementById('appConnectorNode');
  const paths = [0, 1, 2, 3].map(i => document.getElementById('appConnectorPath' + i));
  const specs = [...document.querySelectorAll('#impacto .spec')];
  if (!svg || !target || !node || paths.some(p => !p) || specs.length !== 4) return;

  if (reduced){
    [0,1,2,3].forEach(i=>{
      const motion = document.getElementById('appConnectorMotion' + i);
      if (motion) motion.setAttribute('repeatCount', '0');
    });
  }

  function update(){
    if (window.innerWidth <= 760){ svg.classList.remove('in'); return; }

    const sx = window.scrollX, sy = window.scrollY;
    const targetR = target.getBoundingClientRect();
    const end = { x: targetR.left + targetR.width / 2 + sx, y: targetR.top + sy };
    const starts = specs.map(s=>{
      const r = s.getBoundingClientRect();
      return { x: r.left + r.width / 2 + sx, y: r.bottom + sy };
    });

    const xs = [end.x, ...starts.map(s => s.x)];
    const ys = [end.y, ...starts.map(s => s.y)];
    const minX = Math.min(...xs) - 16, maxX = Math.max(...xs) + 16;
    const minY = Math.min(...ys) - 16, maxY = Math.max(...ys) + 16;

    svg.style.left = minX + 'px';
    svg.style.top = minY + 'px';
    svg.style.width = (maxX - minX) + 'px';
    svg.style.height = (maxY - minY) + 'px';
    svg.setAttribute('viewBox', `0 0 ${maxX - minX} ${maxY - minY}`);

    const E = { x: end.x - minX, y: end.y - minY };
    starts.forEach((s, i)=>{
      const S = { x: s.x - minX, y: s.y - minY };
      paths[i].setAttribute('d', elbowPath(S.x, S.y, E.x, E.y, 18));
    });
    node.setAttribute('cx', E.x);
    node.setAttribute('cy', E.y);

    svg.classList.add('in');
  }

  update();
  window.addEventListener('load', update);
  window.addEventListener('resize', update);
  document.querySelector('#impacto .reveal')?.addEventListener('transitionend', update);
  document.querySelector('#whatWeDoCard .reveal')?.addEventListener('transitionend', update);
})();

/* ---------- drawer "Fale com um especialista" (Home) ----------
   Painel lateral aberto pelos CTAs do menu e do fim do site.
   Formulário com validação client-side + envio direto pro
   WhatsApp com os dados preenchidos, mesmo canal dos outros CTAs. */
(function contactDrawer(){
  const drawer = document.getElementById('contactDrawer');
  const backdrop = document.getElementById('drawerBackdrop');
  const closeBtn = document.getElementById('drawerClose');
  const triggers = document.querySelectorAll('[data-open-drawer]');
  if (!drawer || !backdrop || !triggers.length) return;

  function open(e){
    if (e) e.preventDefault();
    drawer.classList.add('open');
    backdrop.classList.add('open');
    drawer.setAttribute('aria-hidden', 'false');
    document.body.classList.add('drawer-open');
    const firstField = drawer.querySelector('input, textarea');
    if (firstField) setTimeout(()=> firstField.focus(), 450);
  }
  function close(){
    drawer.classList.remove('open');
    backdrop.classList.remove('open');
    drawer.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('drawer-open');
  }

  triggers.forEach(t => t.addEventListener('click', open));
  closeBtn.addEventListener('click', close);
  backdrop.addEventListener('click', close);
  document.addEventListener('keydown', (e)=>{
    if (e.key === 'Escape' && drawer.classList.contains('open')) close();
  });

  const form = document.getElementById('drawerForm');
  if (!form) return;
  const status = document.getElementById('drawerStatus');
  const submitBtn = form.querySelector('button[type="submit"]');
  const submitLabel = submitBtn.textContent;

  function setInvalid(field, invalid){
    field.closest('.field').classList.toggle('invalid', invalid);
    return !invalid;
  }
  function validate(){
    const name = form.elements['nome'];
    const phone = form.elements['telefone'];
    const email = form.elements['email'];
    const okName = setInvalid(name, name.value.trim().length < 2);
    const okPhone = setInvalid(phone, phone.value.replace(/\D/g,'').length < 10);
    const okEmail = setInvalid(email, !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim()));
    return okName && okPhone && okEmail;
  }
  form.querySelectorAll('input, textarea').forEach(el=>{
    el.addEventListener('input', ()=> el.closest('.field')?.classList.remove('invalid'));
  });

  form.addEventListener('submit', (e)=>{
    e.preventDefault();
    status.className = 'form-status';
    if (!validate()){
      status.textContent = 'Confira os campos destacados e tente novamente.';
      status.classList.add('fail');
      return;
    }
    submitBtn.disabled = true;
    submitBtn.textContent = 'Enviando...';
    const nome = form.elements['nome'].value.trim();
    const telefone = form.elements['telefone'].value.trim();
    const email = form.elements['email'].value.trim();
    const mensagem = form.elements['mensagem'].value.trim();
    const arquivo = form.elements['arquivo'].files[0];

    let msg = 'Olá! Meu nome é ' + nome + ', meu telefone é ' + telefone +
      ' e meu email é ' + email + '. Gostaria de falar com um especialista da NOW.';
    if (mensagem) msg += '\n\nSobre o que preciso: ' + mensagem;
    if (arquivo) msg += '\n\n(Vou anexar aqui um arquivo: ' + arquivo.name + ')';

    setTimeout(()=>{
      window.open('https://wa.me/551152835040?text=' + encodeURIComponent(msg), '_blank', 'noopener');
      status.textContent = arquivo
        ? 'Perfeito! Abrimos o WhatsApp com seus dados. Não esqueça de anexar o arquivo por lá.'
        : 'Perfeito! Abrimos o WhatsApp com seus dados preenchidos, é só enviar.';
      status.classList.add('ok');
      submitBtn.disabled = false;
      submitBtn.textContent = submitLabel;
      form.reset();
    }, 500);
  });
})();

/* ---------- formulário de contato ----------
   Validação client-side + estados de loading/sucesso/erro.
   Sem backend: envia via mailto como fallback.
   TODO integração: apontar action pra um endpoint real
   (ex.: Formspree, Netlify Forms ou API própria) e remover
   o mailto abaixo. */
(function contactForm(){
  const form = document.getElementById('contactForm');
  if (!form) return;
  const status = document.getElementById('formStatus');
  const submitBtn = form.querySelector('button[type="submit"]');
  const submitLabel = submitBtn.textContent;

  function setInvalid(field, invalid){
    field.closest('.field').classList.toggle('invalid', invalid);
    return !invalid;
  }
  function validate(){
    const name = form.elements['nome'];
    const email = form.elements['email'];
    const subject = form.elements['assunto'];
    const message = form.elements['mensagem'];
    const okName = setInvalid(name, name.value.trim().length < 2);
    const okEmail = setInvalid(email, !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim()));
    const okSubject = setInvalid(subject, subject.value.trim().length < 2);
    const okMessage = setInvalid(message, message.value.trim().length < 10);
    return okName && okEmail && okSubject && okMessage;
  }
  form.querySelectorAll('input, textarea').forEach(el=>{
    el.addEventListener('input', ()=> el.closest('.field').classList.remove('invalid'));
  });

  form.addEventListener('submit', (e)=>{
    e.preventDefault();
    status.className = 'form-status';
    if (!validate()){
      status.textContent = 'Confira os campos destacados e tente novamente.';
      status.classList.add('fail');
      return;
    }
    submitBtn.disabled = true;
    submitBtn.textContent = 'Enviando...';
    try{
      const subject = encodeURIComponent('[Site] ' + form.elements['assunto'].value.trim());
      const body = encodeURIComponent(
        form.elements['mensagem'].value.trim() +
        '\n\n— ' + form.elements['nome'].value.trim() +
        ' · ' + form.elements['email'].value.trim()
      );
      window.location.href = 'mailto:contato@nowsolucoes.com.br?subject=' + subject + '&body=' + body;
      setTimeout(()=>{
        status.textContent = 'Mensagem preparada no seu aplicativo de email. Se preferir, fale direto com a gente pelo WhatsApp.';
        status.classList.add('ok');
        submitBtn.disabled = false;
        submitBtn.textContent = submitLabel;
        form.reset();
      }, 600);
    }catch(err){
      status.textContent = 'Ocorreu um erro ao enviar a mensagem. Por favor, tente novamente.';
      status.classList.add('fail');
      submitBtn.disabled = false;
      submitBtn.textContent = submitLabel;
    }
  });
})();

/* ---------- linha conectora: cartão "O que fazemos" -> "cidade" ----------
   Sai do centro (base) do painel azul de "O que fazemos" e desce até
   o topo do título centralizado "Da portaria à cidade". SVG posicionado
   em coordenadas de página (não de viewport), recalculado no load/resize
   e quando os elementos terminam de entrar (.reveal). */
/* elbow ortogonal: desce reto, faz um canto arredondado de raio fixo,
   segue reto na horizontal, outro canto, desce reto até o alvo — nunca
   uma curva orgânica, sempre ângulos retos com o mesmo raio.
   Compartilhado pelos conectores "o que fazemos" e "onde aplicamos". */
function elbowPath(x1, y1, x2, y2, r){
  if (Math.abs(x2 - x1) < 2) return `M${x1},${y1} L${x2},${y2}`;
  const dir  = x2 > x1 ? 1 : -1;
  const vDir = y2 > y1 ? 1 : -1;
  const rr = Math.min(r, Math.abs(y2 - y1) / 2, Math.abs(x2 - x1) / 2);
  const turnY = y1 + (y2 - y1) / 2;
  return (
    `M${x1},${y1} L${x1},${turnY - vDir * rr} ` +
    `Q${x1},${turnY} ${x1 + dir * rr},${turnY} ` +
    `L${x2 - dir * rr},${turnY} ` +
    `Q${x2},${turnY} ${x2},${turnY + vDir * rr} ` +
    `L${x2},${y2}`
  );
}

(function connectorLine(){
  const svg = document.getElementById('connectorSvg');
  const path = document.getElementById('connectorPath');
  const card = document.getElementById('whatWeDoCard');
  const heading = document.querySelector('#autoridade .autoridade-head h2');
  const motion = document.getElementById('connectorMotion');
  if (!svg || !path || !card || !heading) return;

  if (reduced && motion) motion.setAttribute('repeatCount', '0');

  function update(){
    if (window.innerWidth <= 760){ svg.classList.remove('in'); return; }

    const cardR = card.getBoundingClientRect();
    const headingR = heading.getBoundingClientRect();
    const sx = window.scrollX, sy = window.scrollY;

    const a = { x: cardR.left + cardR.width * 0.5 + sx, y: cardR.bottom + sy };
    const b = { x: headingR.left + headingR.width / 2 + sx, y: headingR.top + sy };

    const minX = Math.min(a.x, b.x) - 16;
    const maxX = Math.max(a.x, b.x) + 16;
    const minY = Math.min(a.y, b.y) - 16;
    const maxY = Math.max(a.y, b.y) + 16;

    svg.style.left = minX + 'px';
    svg.style.top = minY + 'px';
    svg.style.width = (maxX - minX) + 'px';
    svg.style.height = (maxY - minY) + 'px';
    svg.setAttribute('viewBox', `0 0 ${maxX - minX} ${maxY - minY}`);

    const A = { x: a.x - minX, y: a.y - minY };
    const B = { x: b.x - minX, y: b.y - minY };

    path.setAttribute('d', elbowPath(A.x, A.y, B.x, B.y, 16));
    svg.classList.add('in');
  }

  update();
  window.addEventListener('load', update);
  window.addEventListener('resize', update);
  card.addEventListener('transitionend', update);
  document.getElementById('autoridade')?.querySelector('.reveal')?.addEventListener('transitionend', update);
})();
