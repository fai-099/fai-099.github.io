'use strict';

// Publication metadata transcribed from the supplied CV; no inferred results or abstracts.
const publications = [
  { year: '2026', type: 'APPLIED AI', topic: 'DIETARY MONITORING', title: 'Enhancing Personal Wellness Through AI: Object IQ’s Image-Based Dietary Monitoring and Personalized Recommendations', authors: ['Javaid, M. T.', 'Hameed, I.', 'Sohail, M. F.', 'Ali, G.', 'Yaqoob, N.'], journal: 'Spectrum of Engineering Sciences', volume: '4', issue: '2', pages: '289–307', url: 'https://thesesjournal.com/index.php/1/article/view/1986' },
  { year: '2026', type: 'COMPUTER VISION', topic: 'IMAGE RETRIEVAL', title: 'Convolutional Neural Network Architectures for Robust Image Feature Representation in Retrieval Systems', authors: ['Salahuddin', 'Sohail, M. F.', 'Khan, H. R.', 'Meeran, M. T.'], journal: 'Kashf Journal of Multidisciplinary Research', volume: '3', issue: '2', pages: '109–113', url: 'https://kjmr.com.pk/kjmr/article/view/840' },
  { year: '2026', type: 'HEALTHCARE AI', topic: 'IoT SYSTEMS', title: 'Design of an Intelligent IoT-Driven Real-Time Continuous Remote Patient Care Framework Using Machine Learning', authors: ['Shahid, M.', 'Meeran, M. T.', 'Hussain, N.', 'Ali, G.', 'Sohail, M. F.'], journal: 'Spectrum of Engineering Sciences', volume: '4', issue: '4', pages: '311–322', url: 'https://thesesjournal.com/index.php/1/article/view/2416' },
  { year: '2025', type: 'HEALTHCARE AI', topic: 'PREDICTIVE MONITORING', title: 'AI-Integrated IoT System Using Machine Learning Techniques for Continuous Health Tracking and Predictive Patient Monitoring', authors: ['Khan, M. A.', 'Arshad, H. A.', 'Sohail, M. F.', 'Salahuddin'], journal: 'Kashf Journal of Multidisciplinary Research', volume: '2', issue: '12', pages: '24–38', url: 'https://kjmr.com.pk/kjmr/article/view/767' },
];
const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];
const escapeHtml = (text) => String(text).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
let selectedYear = 'all';
let toastTimer;
function showToast(message) {
  clearTimeout(toastTimer);
  $('#toast').textContent = message;
  $('#toast').hidden = false;
  toastTimer = setTimeout(() => { $('#toast').hidden = true; }, 3200);
}
async function copyText(text, title, success) {
  try {
    if (!navigator.clipboard?.writeText) throw new Error('Clipboard not available');
    await navigator.clipboard.writeText(text);
    showToast(success);
  } catch {
    $('#copy-dialog-title').textContent = title;
    $('#copy-text').value = text;
    $('#copy-dialog').showModal();
    $('#copy-text').focus();
    $('#copy-text').select();
  }
}
function renderPublications() {
  const query = $('#publication-search').value.trim().toLowerCase();
  const visible = publications.filter((p) => (selectedYear === 'all' || p.year === selectedYear) && [p.title, p.type, p.topic, p.journal, ...p.authors].join(' ').toLowerCase().includes(query));
  $('#publication-list').innerHTML = visible.map((p) => {
    const index = publications.indexOf(p);
    return `<article class="publication"><span class="publication-year">${p.year}</span><div><div class="publication-meta"><span>${escapeHtml(p.type)}</span><span class="meta-separator" aria-hidden="true"></span><span>${escapeHtml(p.topic)}</span></div><h3><a href="${p.url}" target="_blank" rel="noopener noreferrer">${escapeHtml(p.title)}</a></h3><p class="authors">${p.authors.map((a) => a === 'Sohail, M. F.' ? `<strong>${escapeHtml(a)}</strong>` : escapeHtml(a)).join(' · ')}</p><p class="journal">${escapeHtml(p.journal)} · Vol. ${p.volume}, No. ${p.issue} · pp. ${p.pages}</p><div class="publication-actions"><a class="paper-link" href="${p.url}" target="_blank" rel="noopener noreferrer">Read paper <span aria-hidden="true">↗</span></a><button class="citation-button" data-citation="${index}" aria-label="Copy citation for ${escapeHtml(p.title)}"><svg class="icon" aria-hidden="true"><use href="#i-copy"/></svg>Copy citation</button></div></div><a class="publication-arrow" href="${p.url}" target="_blank" rel="noopener noreferrer" aria-label="Open ${escapeHtml(p.title)}"><span aria-hidden="true">↗</span></a></article>`;
  }).join('');
  $('#publication-empty').hidden = visible.length > 0;
  $('#publication-status').textContent = `${visible.length} publication${visible.length === 1 ? '' : 's'} shown.`;
}
$$('[data-year]').forEach((button) => button.addEventListener('click', () => {
  selectedYear = button.dataset.year;
  $$('[data-year]').forEach((b) => { b.classList.toggle('active', b === button); b.setAttribute('aria-pressed', String(b === button)); });
  renderPublications();
}));
$('#publication-search').addEventListener('input', renderPublications);
$('#publication-list').addEventListener('click', (event) => {
  const button = event.target.closest('[data-citation]');
  if (!button) return;
  const p = publications[Number(button.dataset.citation)];
  const citation = `${p.authors.join('; ')} (${p.year}). ${p.title}. ${p.journal}, ${p.volume}(${p.issue}), ${p.pages}. ${p.url}`;
  copyText(citation, 'Copy citation', 'Citation copied to clipboard');
});
$('#copy-email').addEventListener('click', () => copyText('faisal.sohail099@gmail.com', 'Copy email address', 'Email address copied'));
renderPublications();

// Empty settings remain explicit placeholders, without fake account links.
$$('[data-profile]').forEach((link) => {
  const url = window.FAISAL_PROFILE?.[link.dataset.profile]?.trim();
  if (!url) return;
  try {
    const parsed = new URL(url);
    if (parsed.protocol !== 'https:') return;
    link.href = parsed.href;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.removeAttribute('aria-disabled');
    link.removeAttribute('role');
    link.removeAttribute('title');
    link.classList.remove('profile-pending');
    const subtitle = link.querySelector('.pending-label');
    if (subtitle) {
      subtitle.textContent = link.dataset.profile === 'scholar' ? 'Publications & citations' : 'Code & projects';
      subtitle.classList.remove('pending-label');
    }
  } catch { /* Leave the placeholder visible for an incomplete URL. */ }
});

const menuButton = $('.menu-toggle');
const navigation = $('#navigation');
function closeMenu() { navigation.classList.remove('open'); menuButton.setAttribute('aria-expanded', 'false'); menuButton.setAttribute('aria-label', 'Open navigation'); }
menuButton.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') !== 'true';
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
  navigation.classList.toggle('open', open);
});
navigation.addEventListener('click', (e) => { if (e.target.closest('a')) closeMenu(); });
document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && navigation.classList.contains('open')) { closeMenu(); menuButton.focus(); } });
document.addEventListener('click', (e) => { if (!e.target.closest('.site-header')) closeMenu(); });
const mobileQuery = matchMedia('(max-width: 680px)');
mobileQuery.addEventListener('change', closeMenu);
if ('IntersectionObserver' in window) {
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      $$('nav a').forEach((link) => link.classList.toggle('current', link.getAttribute('href') === `#${entry.target.id}`));
    });
  }, { rootMargin: '-15% 0px -50% 0px', threshold: 0 });
  $$('main [id]').filter((s) => navigation.querySelector(`a[href="#${s.id}"]`)).forEach((s) => sectionObserver.observe(s));
}

const research = {
  vision: { title: 'Making sense of the visual world.', description: 'Camera localization, structure from motion, and 3D reconstruction — understanding where we are and what surrounds us.', tags: ['Camera localization', '3D reconstruction'], label: '3D SCENE RECONSTRUCTION', index: '01' },
  learning: { title: 'Learning patterns. Building understanding.', description: 'Deep learning, neural networks, and visual recognition — exploring how models learn useful representations from data.', tags: ['Deep learning', 'Neural networks', 'Visual recognition'], label: 'NEURAL NETWORK REPRESENTATION', index: '02' },
  ai: { title: 'Intelligence with real-world purpose.', description: 'Image analysis, healthcare AI, and IoT-based intelligent systems — connecting machine learning with everyday applications.', tags: ['Healthcare AI', 'Image analysis', 'Intelligent IoT'], label: 'CONNECTED INTELLIGENT SYSTEMS', index: '03' },
};
let researchMode = 'vision';
function selectResearch(tab, focus = false) {
  researchMode = tab.dataset.research;
  const item = research[researchMode];
  $$('[data-research]').forEach((button) => { button.setAttribute('aria-selected', String(button === tab)); button.tabIndex = button === tab ? 0 : -1; });
  $('#research-panel').setAttribute('aria-labelledby', tab.id);
  $('#research-title').textContent = item.title;
  $('#research-description').textContent = item.description;
  $('#visual-label').textContent = item.label;
  $('.research-index').textContent = `${item.index} / 03`;
  $('#research-tags').innerHTML = item.tags.map((tag) => `<span>${escapeHtml(tag)}</span>`).join('');
  $('#research-canvas').setAttribute('aria-label', `Interactive conceptual visualization: ${item.label.toLowerCase()}`);
  if (focus) tab.focus();
  drawResearch();
}
$$('[data-research]').forEach((tab, index, tabs) => {
  tab.addEventListener('click', () => selectResearch(tab));
  tab.addEventListener('keydown', (e) => {
    let next;
    if (e.key === 'ArrowRight') next = (index + 1) % tabs.length;
    if (e.key === 'ArrowLeft') next = (index - 1 + tabs.length) % tabs.length;
    if (e.key === 'Home') next = 0;
    if (e.key === 'End') next = tabs.length - 1;
    if (next !== undefined) { e.preventDefault(); selectResearch(tabs[next], true); }
  });
});

// Original procedural illustrations. These are conceptual, not project outputs.
const canvas = $('#research-canvas');
const ctx = canvas.getContext('2d');
const stage = $('.visual-stage');
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
let motionOn = !reducedMotion.matches;
let visible = true;
let frame = 0;
let time = 0;
let lastTimestamp = 0;
let pointer = { x: 0, y: 0 };
let canvasWidth = 1;
let canvasHeight = 1;
let seed = 47;
function rand() { seed = (seed * 1664525 + 1013904223) >>> 0; return seed / 4294967296; }
const cloud = [];
// A small architectural scene: two facades, a pitched roof, and the ground plane.
for (let i = 0; i < 1350; i++) {
  const side = i % 5;
  let x = rand() * 2.3 - 1.15, y = rand() * 1.25 - .7, z = rand() * 1.55 - .775;
  if (side === 0) z = .775;
  if (side === 1) x = -1.15;
  if (side === 2) { y = -.7 - (.8 - Math.abs(z)) * .7; }
  if (side === 3) { y = .57; x *= 1.6; z *= 1.7; }
  if (side === 4) { x = 1.15; }
  // Cut windows into the front face.
  if (side === 0 && y > -.42 && y < .25 && (Math.abs(x - .6) < .16 || Math.abs(x + .6) < .16)) continue;
  cloud.push({ x, y, z, brightness: rand() });
}
function resizeCanvas() {
  canvasWidth = stage.clientWidth;
  canvasHeight = stage.clientHeight;
  const scale = Math.min(devicePixelRatio || 1, 2);
  canvas.width = Math.round(canvasWidth * scale);
  canvas.height = Math.round(canvasHeight * scale);
  ctx?.setTransform(scale, 0, 0, scale, 0, 0);
  drawResearch();
}
function line(a, b, color, width = .6) {
  ctx.beginPath(); ctx.strokeStyle = color; ctx.lineWidth = width; ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
}
function point(x, y, size, color) { ctx.beginPath(); ctx.fillStyle = color; ctx.arc(x, y, size, 0, Math.PI * 2); ctx.fill(); }
function project(x, y, z) {
  const angle = -.55 + Math.sin(time * .12) * .14 + pointer.x * .22;
  const rx = x * Math.cos(angle) + z * Math.sin(angle);
  const rz = -x * Math.sin(angle) + z * Math.cos(angle);
  const tilt = -.23 + pointer.y * .12;
  const ry = y * Math.cos(tilt) - rz * Math.sin(tilt);
  const depth = y * Math.sin(tilt) + rz * Math.cos(tilt);
  const scale = canvasWidth * .245 / (1 + depth * .14);
  return { x: canvasWidth * .53 + rx * scale, y: canvasHeight * .48 + ry * scale, depth };
}
function drawVision() {
  for (let i = -4; i <= 4; i++) {
    line(project(i * .5, .62, -2), project(i * .5, .62, 2), '#71a68a15');
    line(project(-2, .62, i * .5), project(2, .62, i * .5), '#71a68a15');
  }
  const projected = cloud.map((p) => ({ ...project(p.x, p.y, p.z), brightness: p.brightness })).sort((a, b) => b.depth - a.depth);
  for (const p of projected) point(p.x, p.y, .6 + p.brightness * .65, `rgba(175,214,159,${.28 + p.brightness * .64})`);
  const camera = { x: canvasWidth * .19, y: canvasHeight * .62 };
  const corners = [[-.6, -.45, .8], [.6, -.45, .8], [.6, .3, .8], [-.6, .3, .8]].map((p) => project(...p));
  corners.forEach((p, i) => { line(camera, p, '#9acaa13b'); line(p, corners[(i + 1) % 4], '#a3d3a353'); });
  point(camera.x, camera.y, 3, '#c5dfad');
  ctx.font = '7px monospace';ctx.fillStyle = '#95b7a1';ctx.fillText('CAM_01', camera.x - 15, camera.y + 16);
  line({ x: canvasWidth * .85, y: canvasHeight * .24 }, project(.2, -.5, .8), '#b5d59a55');
  point(canvasWidth * .85, canvasHeight * .24, 2.3, '#bad6a3');
  ctx.fillText('POSE', canvasWidth * .85 - 10, canvasHeight * .24 - 10);
}
function drawLearning() {
  const layers = [4, 6, 7, 6, 3];
  const nodes = layers.map((count, l) => Array.from({ length: count }, (_, n) => ({ x: canvasWidth * (.14 + l * .18) + pointer.x * (l - 2) * 5, y: canvasHeight * .47 + (n - (count - 1) / 2) * 24 + pointer.y * 8 })));
  nodes.forEach((layer, l) => layer.forEach((node, n) => {
    nodes[l + 1]?.forEach((next, j) => line(node, next, `rgba(157,194,152,${.055 + (Math.sin(time * .7 + l + n + j) + 1) * .05})`));
    const pulse = (Math.sin(time * 1.6 - l + n) + 1) / 2;
    point(node.x, node.y, 2.2 + pulse, `rgba(195,225,175,${.4 + pulse * .55})`);
  }));
  ctx.font = '7px monospace';ctx.fillStyle = '#95b7a1';
  ctx.fillText('INPUT', canvasWidth * .14 - 10, canvasHeight * .88);
  ctx.fillText('REPRESENTATION', canvasWidth * .43 - 10, canvasHeight * .88);
  ctx.fillText('OUTPUT', canvasWidth * .85 - 10, canvasHeight * .88);
}
function drawAi() {
  const center = { x: canvasWidth * .5, y: canvasHeight * .46 };
  const radius = Math.min(canvasWidth * .29, canvasHeight * .33);
  const labels = ['VISION', 'HEALTH', 'DATA', 'IoT', 'LEARNING', 'SIGNALS'];
  labels.forEach((label, i) => {
    const angle = i * Math.PI / 3 - Math.PI / 2 + pointer.x * .1;
    const node = { x: center.x + Math.cos(angle) * radius * 1.35, y: center.y + Math.sin(angle) * radius * .9 };
    line(center, node, '#afcba054');
    ctx.beginPath();ctx.strokeStyle = '#95be8e50';ctx.arc(node.x, node.y, 12, 0, Math.PI * 2);ctx.stroke();
    const progress = ((time * .22 + i * .17) % 1 + 1) % 1;
    point(center.x + (node.x - center.x) * progress, center.y + (node.y - center.y) * progress, 2, '#d4e6be');
    point(node.x, node.y, 3, '#a9cc98');
    ctx.font = '7px monospace';ctx.textAlign = 'center';ctx.fillStyle = '#aac3ac';ctx.fillText(label, node.x, node.y + 25);
  });
  ctx.beginPath();ctx.strokeStyle = '#b6d3a344';ctx.arc(center.x, center.y, 27, 0, Math.PI * 2);ctx.stroke();
  ctx.fillStyle = '#183930';ctx.fill();
  ctx.font = '12px monospace';ctx.fillStyle = '#d3e5bc';ctx.textAlign = 'center';ctx.fillText('AI', center.x, center.y + 4);ctx.textAlign = 'left';
}
function drawResearch() {
  if (!ctx) return;
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);
  if (researchMode === 'vision') drawVision();
  else if (researchMode === 'learning') drawLearning();
  else drawAi();
}
function animate(timestamp) {
  frame = 0;
  if (!motionOn || !visible || document.hidden) { lastTimestamp = 0; return; }
  if (lastTimestamp) time += Math.min((timestamp - lastTimestamp) / 1000, .05);
  lastTimestamp = timestamp;
  drawResearch();
  frame = requestAnimationFrame(animate);
}
function updateAnimation() {
  if (frame) cancelAnimationFrame(frame);
  frame = 0;
  lastTimestamp = 0;
  const button = $('#motion-toggle');
  button.textContent = motionOn ? 'Ⅱ' : '▷';
  button.setAttribute('aria-label', motionOn ? 'Pause research animation' : 'Play research animation');
  button.title = motionOn ? 'Pause animation' : 'Play animation';
  if (motionOn && visible && !document.hidden) frame = requestAnimationFrame(animate);
  else drawResearch();
}
$('#motion-toggle').addEventListener('click', () => { motionOn = !motionOn; updateAnimation(); });
reducedMotion.addEventListener('change', () => { motionOn = !reducedMotion.matches; updateAnimation(); });
document.addEventListener('visibilitychange', updateAnimation);
stage.addEventListener('pointermove', (e) => {
  if (reducedMotion.matches || e.pointerType === 'touch') return;
  const rect = stage.getBoundingClientRect();
  pointer = { x: (e.clientX - rect.left) / rect.width - .5, y: (e.clientY - rect.top) / rect.height - .5 };
  if (!motionOn) drawResearch();
});
stage.addEventListener('pointerleave', () => { pointer = { x: 0, y: 0 }; if (!motionOn) drawResearch(); });
if ('IntersectionObserver' in window) new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; updateAnimation(); }, { threshold: 0 }).observe(canvas);
if ('ResizeObserver' in window) new ResizeObserver(resizeCanvas).observe(stage);
else window.addEventListener('resize', resizeCanvas);
resizeCanvas();
updateAnimation();
