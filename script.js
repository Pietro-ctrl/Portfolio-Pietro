const iconBase = 'assets/icons/';
const hardSkills = [
  ['html5', 'HTML5'], ['css3', 'CSS3'], ['figma', 'FIGMA'],
  ['javascript', 'JAVASCRIPT'], ['mysql', 'MYSQL'], ['csharp', 'C#']
];
const learningSkills = [
  ['cplusplus', 'C++'], ['typescript', 'TYPESCRIPT'], ['nodejs', 'NODEJS'], ['react', 'REACT']
];

function renderSkills(list, elementId) {
  const container = document.getElementById(elementId);
  container.innerHTML = list.map(([icon, name]) => `
    <div><img src="${iconBase}${icon === 'nodejs' ? 'nodejs-wordmark' : icon}.svg" alt="Logo oficial ${name}"><b>${name}</b></div>
  `).join('');
}
renderSkills(hardSkills, 'hardSkills');
renderSkills(learningSkills, 'learningSkills');

const projects = [
  { type: 'web', title: 'SITE E-COMMERCE', text: 'Plataforma de comércio eletrônico para vestuário urbano.', image: 'assets/project_ecommerce.png', url: 'https://pietro-ctrl.github.io/Ecommerce-Drip/' },
  { type: 'web', title: 'LANDING PAGE E-COMMERCE', text: 'Landing page promocional de streetwear.', image: 'assets/project_landing.png', url: 'https://pietro-ctrl.github.io/Drip-Landing-Page-Pietro/' },
  { type: 'web', title: 'SITE DE ACADEMIA', text: 'Página para apresentar treinos, planos e horários.', image: 'assets/project_car.png', status: 'EM DESENVOLVIMENTO' },
  { type: 'web', title: 'SITE DE VIAGENS', text: 'Página para apresentar destinos e experiências de viagem.', image: 'assets/project_car2.png', status: 'EM DESENVOLVIMENTO' },
  { type: 'web', title: 'SITE DE RESTAURANTE', text: 'Conceito de cardápio digital, pedidos e reservas.', image: 'assets/project_neon.png', status: 'EM DESENVOLVIMENTO' },
  { type: 'design', title: 'IDENTIDADE DE NEGÓCIO', text: 'Estudo visual para uma empresa e seu ambiente de trabalho.', image: 'assets/project_hex.png', status: 'EM DESENVOLVIMENTO' }
];

function renderProjects(filter = 'all') {
  const grid = document.getElementById('projectGrid');
  grid.innerHTML = projects.filter(p => filter === 'all' || p.type === filter).map((p, index) => `
    <article class="project-card${p.url ? ' featured-project' : ''}">
      ${p.url ? `<a class="project-cover" href="${p.url}" target="_blank" rel="noopener noreferrer" aria-label="Abrir ${p.title}"><img src="${p.image}" alt="${p.title}"></a>` : `<img src="${p.image}" alt="${p.title}">`}
      <div class="project-info"><h3>${p.title}</h3>${p.status ? `<span class="project-status">${p.status}</span>` : ''}<p>${p.text}</p><div class="project-actions"><button class="text-button project-details" data-index="${index}">VER MAIS</button>${p.url ? `<a class="text-button project-live-link" href="${p.url}" target="_blank" rel="noopener noreferrer">ABRIR SITE ↗</a>` : ''}</div></div>
    </article>
  `).join('');
  document.querySelectorAll('.project-details').forEach(button => button.addEventListener('click', () => {
    const p = projects[button.dataset.index];
    openModal(p.title, p.text);
  }));
}
renderProjects();

document.querySelectorAll('.filters button').forEach(button => {
  button.addEventListener('click', () => {
    document.querySelectorAll('.filters button').forEach(b => b.classList.remove('active'));
    button.classList.add('active');
    renderProjects(button.dataset.filter);
    enableCardTilt();
  });
});

const words = ['DESENVOLVEDOR FRONT-END & TI', 'ESTUDANTE COTEMIG FLORESTA', 'UI/UX DESIGNER NO FIGMA'];
let wordIndex = 0, charIndex = 0, deleting = false;
function type() {
  const element = document.getElementById('typewriter');
  const word = words[wordIndex];
  element.textContent = deleting ? word.slice(0, --charIndex) : word.slice(0, ++charIndex);
  let delay = deleting ? 45 : 80;
  if (!deleting && charIndex === word.length) { deleting = true; delay = 1800; }
  else if (deleting && charIndex === 0) { deleting = false; wordIndex = (wordIndex + 1) % words.length; delay = 500; }
  setTimeout(type, delay);
}
type();

function setTheme(theme) {
  document.body.classList.toggle('dark', theme === 'dark');
  localStorage.setItem('pietro-theme', theme);
  const moonIcon = '<svg class="theme-svg" viewBox="0 0 24 24" aria-hidden="true"><path d="M20.4 15.2A8.5 8.5 0 0 1 8.8 3.6 8.5 8.5 0 1 0 20.4 15.2Z"/></svg>';
  const sunIcon = '<svg class="theme-svg" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="3.5"/><path d="M12 2v2M12 20v2M4.93 4.93l1.42 1.42M17.65 17.65l1.42 1.42M2 12h2M20 12h2M4.93 19.07l1.42-1.42M17.65 6.35l1.42-1.42"/></svg>';
  document.querySelectorAll('.theme-button').forEach(button => {
    button.innerHTML = theme === 'dark' ? sunIcon : moonIcon;
    button.setAttribute('aria-label', theme === 'dark' ? 'Ativar modo claro' : 'Ativar modo escuro');
  });
}
setTheme(localStorage.getItem('pietro-theme') || 'light');
document.querySelectorAll('.theme-button').forEach(button => button.addEventListener('click', () => setTheme(document.body.classList.contains('dark') ? 'light' : 'dark')));

const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => navbar.classList.toggle('scrolled', window.scrollY > 40));
const menuButton = document.getElementById('menuButton');
menuButton.addEventListener('click', () => document.getElementById('mobileNav').classList.toggle('show'));
document.querySelectorAll('.mobile-nav a').forEach(link => link.addEventListener('click', () => document.getElementById('mobileNav').classList.remove('show')));

const modal = document.getElementById('modal');
function openModal(title, text) { modal.querySelector('h2').textContent = title; modal.querySelector('p').textContent = text; modal.classList.add('show'); }
function closeModal() { modal.classList.remove('show'); }
document.getElementById('aboutButton').addEventListener('click', () => openModal('Sobre Pietro', 'Estudante de TI, desenvolvedor Front-End em formação e interessado em UI/UX, C#, SQL e interfaces responsivas.'));
document.getElementById('modalClose').addEventListener('click', closeModal);
document.getElementById('modalOk').addEventListener('click', closeModal);
modal.addEventListener('click', event => { if (event.target === modal) closeModal(); });

const phone = document.getElementById('telefone');
phone.addEventListener('input', () => {
  let value = phone.value.replace(/\D/g, '').slice(0, 11);
  if (value.length > 2) value = `(${value.slice(0, 2)}) ${value.slice(2)}`;
  if (value.length > 10) value = value.replace(/(\d{5})(\d{4})$/, '$1-$2');
  else if (value.length > 9) value = value.replace(/(\d{4})(\d{4})$/, '$1-$2');
  phone.value = value;
});

document.getElementById('contactForm').addEventListener('submit', event => {
  event.preventDefault();
  const form = event.target;
  const message = document.getElementById('formMessage');
  if (!form.nome.value.trim() || !form.email.value.trim() || !form.telefone.value.trim() || !form.mensagem.value.trim()) {
    message.textContent = 'Preencha todos os campos obrigatórios.';
    message.className = 'form-message error';
    return;
  }
  message.textContent = 'Mensagem enviada! (Simulação da atividade.)';
  message.className = 'form-message ok';
  form.reset();
});


const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.light-section, .intro, .cards-3 article, .skill-grid div, .project-card').forEach((element, index) => {
  element.classList.add('reveal');
  element.style.transitionDelay = `${(index % 4) * 70}ms`;
  revealObserver.observe(element);
});

const scrollProgress = document.getElementById('scrollProgress');
function updateScrollProgress() {
  const pageHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = pageHeight > 0 ? (window.scrollY / pageHeight) * 100 : 0;
  scrollProgress.style.width = `${progress}%`;
}
window.addEventListener('scroll', updateScrollProgress, { passive: true });
updateScrollProgress();

function enableCardTilt() {
  if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
  document.querySelectorAll('.project-card:not([data-tilt-ready])').forEach(card => {
    card.dataset.tiltReady = 'true';
    let frame = null;
    let pointerX = 0;
    let pointerY = 0;

    card.addEventListener('pointermove', event => {
      const box = card.getBoundingClientRect();
      pointerX = ((event.clientX - box.left) / box.width - 0.5) * 12;
      pointerY = ((event.clientY - box.top) / box.height - 0.5) * -12;
      if (frame) return;
      frame = requestAnimationFrame(() => {
        card.style.setProperty('--tilt-x', `${pointerY}deg`);
        card.style.setProperty('--tilt-y', `${pointerX}deg`);
        card.classList.add('is-tilting');
        frame = null;
      });
    });

    card.addEventListener('pointerleave', () => {
      if (frame) cancelAnimationFrame(frame);
      frame = null;
      card.classList.remove('is-tilting');
      card.style.setProperty('--tilt-x', '0deg');
      card.style.setProperty('--tilt-y', '0deg');
    });
  });
}
enableCardTilt();

const hero = document.querySelector('.hero');
const suit = document.querySelector('.hero-visual img');
let suitFrame = null;
hero.addEventListener('pointermove', event => {
  if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
  const x = (event.clientX / window.innerWidth - 0.5) * 12;
  const y = (event.clientY / window.innerHeight - 0.5) * 8;
  if (suitFrame) cancelAnimationFrame(suitFrame);
  suitFrame = requestAnimationFrame(() => {
    suit.style.setProperty('--mouse-x', `${x}px`);
    suit.style.setProperty('--mouse-y', `${y}px`);
    suitFrame = null;
  });
});
hero.addEventListener('pointerleave', () => {
  if (suitFrame) cancelAnimationFrame(suitFrame);
  suitFrame = null;
  suit.style.setProperty('--mouse-x', '0px');
  suit.style.setProperty('--mouse-y', '0px');
});
