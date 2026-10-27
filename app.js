'use strict';

// Historical reference data, not independently verified current gameplay advice.
const stats = [
  { id: 'speed', name: 'Speed', value: '1500 ↑', extra: '(1600)', symbol: '»', color: '#d8eaf0', ink: '#4a91aa', note: 'The reference lists 1500 ↑, with 1600 in parentheses. The meaning of the parenthetical target needs presenter confirmation.' },
  { id: 'stamina', name: 'Stamina', value: '600', symbol: '♡', color: '#f5dfd7', ink: '#bc7666', note: 'The CM18 reference lists a stamina target of 600. No recovery-skill requirement is specified on this slide.' },
  { id: 'power', name: 'Power', value: '1200', sub: 'Stat threshold / 1101 ↑', symbol: '↗', color: '#f1e6c3', ink: '#b7933f', note: 'The reference lists a power target of 1200 and separately notes a stat threshold of 1101 ↑. The threshold calculation has not been independently checked.' },
  { id: 'guts', name: 'Guts', value: '600 ↑', symbol: '♧', color: '#eddfeb', ink: '#a37e9b', note: 'The reference lists a guts target of 600 or higher. No additional explanation is provided in the supplied slide.' },
  { id: 'wit', name: 'Wit', value: '1200', symbol: '◇', color: '#dceadd', ink: '#709479', note: 'The reference lists a wit target of 1200. Stat labels are presentation labels; values follow the supplied PDF.' }
];
const styles = [
  { id: 'front', name: 'Front', color: '#cf8f86', acceleration: [{ name: 'Unrestrained', note: 'Acceleration +0.4' }], speedSlots: 1 },
  { id: 'pace', name: 'Pace', color: '#d5b575', acceleration: [{ name: 'Straight Descent', note: 'Acceleration +0.2' }], speedSlots: 3 },
  { id: 'late', name: 'Late', color: '#9fbb76', acceleration: [{ name: 'Flash Forward', note: 'Acceleration +0.4' }, { name: 'Updrafts', note: 'Acceleration +0.2' }], speedSlots: 3 },
  { id: 'end', name: 'End', color: '#84b9bd', acceleration: [{ name: 'Flash Forward', note: 'Acceleration +0.4' }], speedSlots: 3 }
];
const $ = (selector) => document.querySelector(selector);
const all = (selector) => [...document.querySelectorAll(selector)];
let slide = 0;
let pinnedOverview = null;
let pinnedSkill = null;
let expandedStyle = null;

const localImages = document.documentElement.dataset.assets === 'local';
// Public exports never request or bundle PDF-derived images.
function portrait(file, alt, label) {
  return localImages
    ? `<img src="assets/local/${file}.png" alt="${alt}" data-fallback="${label}">`
    : `<span class="missing-art" role="img" aria-label="${alt}; reference artwork omitted">${label}</span>`;
}
$('#featured-image').innerHTML = portrait('featured', 'Featured reference character', 'REFERENCE ART');
if (!localImages) {
  document.querySelector('.art-caption').textContent = 'Review preview · artwork omitted';
  document.querySelector('.studio-label').innerHTML = '<span class="live-dot"></span> CM18 SAMPLE / PUBLIC REVIEW';
}

$('#stats').innerHTML = stats.map(s => `<button class="stat-row" data-stat="${s.id}" aria-pressed="false"><span class="stat-icon" style="--icon-bg:${s.color};--icon-fg:${s.ink}">${s.symbol}</span><span class="stat-copy"><span class="stat-name">${s.name}</span><span class="stat-number">${s.value} ${s.extra ? `<small>${s.extra}</small>` : ''}</span>${s.sub ? `<span class="stat-extra">${s.sub}</span>` : ''}</span><span class="stat-arrow">↗</span></button>`).join('');
$('#featured-picks').innerHTML = [1, 2, 3].map(n => `<button class="pick" data-pick="featured-${n}" aria-pressed="false" aria-label="Select reference pick ${n}"><span class="pick-index">REF. 0${n}</span><span class="pick-portrait">${portrait(`pick-0${n}`, `Reference character ${n} from PDF page 4`, `PICK 0${n}`)}</span><span class="pick-label">Reference pick 0${n}</span></button>`).join('');
$('#roster').innerHTML = Array.from({ length: 8 }, (_, i) => `<button class="mini-pick" data-pick="roster-${i+1}" aria-label="Select roster reference ${i+1}" aria-pressed="false">${portrait(`roster-${String(i+1).padStart(2,'0')}`, `Roster reference ${i+1}`, String(i+1).padStart(2,'0'))}</button>`).join('');
$('#skill-rows').innerHTML = styles.map(s => `<div class="skill-row" data-style-row="${s.id}"><button class="style-button" data-style="${s.id}" aria-expanded="false" title="Focus ${s.name}; click again to show all"><span class="style-dot" style="--style-color:${s.color}"></span>${s.name}<span aria-hidden="true">↗</span></button><div class="skill-stack">${s.acceleration.map((skill, i) => `<button class="skill-button" data-skill="${s.id}-${i}" aria-pressed="false"><span class="skill-symbol">↗</span><span class="skill-text">${skill.name}<small>${skill.note} · PDF reference</small></span></button>`).join('')}</div><div class="skill-stack"><button class="skill-button speed-slot" data-speed="${s.id}" aria-pressed="false"><span class="skill-symbol">»</span><span class="skill-text">${s.speedSlots} reference ${s.speedSlots === 1 ? 'pick' : 'picks'}<small>Character / unique IDs pending</small></span></button></div></div>`).join('');

function showOverview(item = pinnedOverview) {
  let title = 'Your explanation, in focus.';
  let note = 'Hover over a stat or reference pick to explore. Click to pin the explanation while you speak.';
  let kicker = 'PRESENTER FOCUS';
  if (item?.type === 'stat') {
    const s = stats.find(s => s.id === item.id);
    title = `${s.name} · ${s.value}`;
    note = s.note;
    kicker = 'TARGET STAT / PDF p.4';
  } else if (item?.type === 'pick') {
    const [group, num] = item.id.split('-');
    title = `${group === 'featured' ? 'Reference pick' : 'Roster reference'} ${num.padStart(2, '0')}`;
    note = 'Cropped from your CM18 slide. Character name, outfit, tier placement and recommendation details need confirmation. Numbering is not a ranking.';
    kicker = 'CHARACTER / IDENTITY PENDING';
  }
  $('#overview-detail').innerHTML = `<span class="detail-kicker">${kicker}</span><h3>${title}</h3><p>${note}</p>`;
}
function setOverview(item) {
  pinnedOverview = pinnedOverview?.id === item.id && pinnedOverview?.type === item.type ? null : item;
  all('[data-stat], [data-pick]').forEach(el => {
    const active = !!pinnedOverview && (el.dataset.stat ? pinnedOverview.type === 'stat' && el.dataset.stat === pinnedOverview.id : pinnedOverview.type === 'pick' && el.dataset.pick === pinnedOverview.id);
    el.classList.toggle('selected', active);
    el.setAttribute('aria-pressed', String(active));
  });
  showOverview();
}
all('[data-stat], [data-pick]').forEach(el => {
  const item = el.dataset.stat ? { type: 'stat', id: el.dataset.stat } : { type: 'pick', id: el.dataset.pick };
  el.addEventListener('pointerenter', () => showOverview(item));
  el.addEventListener('pointerleave', () => showOverview());
  el.addEventListener('focus', () => showOverview(item));
  el.addEventListener('blur', () => showOverview());
  el.addEventListener('click', () => setOverview(item));
});
function showSkill(item = pinnedSkill) {
  let title = 'Start with a running style.';
  let note = 'Select a row to enlarge it. Select a named skill to keep its reference details on screen.';
  let kicker = 'INHERITANCE / OVERVIEW';
  if (item?.type === 'skill') {
    const [id, index] = item.id.split('-');
    const style = styles.find(s => s.id === id);
    const skill = style.acceleration[Number(index)];
    title = skill.name;
    note = `${style.name} · ${skill.note}, as listed in your PDF. Activation conditions and suitability are not verified here; no additional gameplay advice has been added.`;
    kicker = 'ACCELERATION / PDF p.5';
  } else if (item?.type === 'speed') {
    const style = styles.find(s => s.id === item.id);
    title = `${style.name} · Speed`;
    note = `The reference shows ${style.speedSlots} character ${style.speedSlots === 1 ? 'portrait' : 'portraits'} in this speed cell. Their unique-skill names and exact outfit IDs remain to be confirmed.`;
    kicker = 'SPEED / IDENTITIES PENDING';
  } else if (expandedStyle) {
    title = `${styles.find(s => s.id === expandedStyle).name} focus`;
    note = 'This row is enlarged for recording. Select a skill to explain it, or choose “Show all styles” to return to the comparison.';
  }
  $('#skill-detail').innerHTML = `<span class="detail-kicker">${kicker}</span><h4>${title}</h4><p>${note}</p>`;
}
function markSkills() {
  all('[data-skill], [data-speed]').forEach(el => {
    const active = !!pinnedSkill && (el.dataset.skill ? pinnedSkill.type === 'skill' && el.dataset.skill === pinnedSkill.id : pinnedSkill.type === 'speed' && el.dataset.speed === pinnedSkill.id);
    el.classList.toggle('selected', active);
    el.setAttribute('aria-pressed', String(active));
  });
}
all('[data-skill], [data-speed]').forEach(el => {
  const item = el.dataset.skill ? { type: 'skill', id: el.dataset.skill } : { type: 'speed', id: el.dataset.speed };
  el.addEventListener('pointerenter', () => showSkill(item));
  el.addEventListener('pointerleave', () => showSkill());
  el.addEventListener('focus', () => showSkill(item));
  el.addEventListener('blur', () => showSkill());
  el.addEventListener('click', () => {
    pinnedSkill = pinnedSkill?.id === item.id && pinnedSkill?.type === item.type ? null : item;
    markSkills(); showSkill();
  });
});
function expandStyle(id) {
  expandedStyle = expandedStyle === id ? null : id;
  pinnedSkill = null;
  all('[data-style-row]').forEach(row => {
    row.hidden = !!expandedStyle && row.dataset.styleRow !== expandedStyle;
    row.classList.toggle('expanded', row.dataset.styleRow === expandedStyle);
  });
  all('[data-style]').forEach(el => el.setAttribute('aria-expanded', String(el.dataset.style === expandedStyle)));
  markSkills(); showSkill();
}
all('[data-style]').forEach(el => el.addEventListener('click', () => expandStyle(el.dataset.style)));
$('#show-all').addEventListener('click', () => expandStyle(null));
function changeSlide(n) {
  slide = Math.max(0, Math.min(1, n));
  $('#overview').hidden = slide !== 0;
  $('#inheritance').hidden = slide !== 1;
  $('#slide-name').textContent = slide ? 'INHERITANCE & SKILLS' : 'TARGETS & RUNNERS';
  $('#page-count').innerHTML = `0${slide+1} <i>/ 02</i>`;
  all('[data-slide]').forEach(el => {
    const active = Number(el.dataset.slide) === slide;
    el.classList.toggle('active', active);
    el.setAttribute('aria-pressed', String(active));
  });
  $('#prev').disabled = slide === 0;
  $('#next').disabled = slide === 1;
}
all('[data-slide]').forEach(el => el.addEventListener('click', () => changeSlide(Number(el.dataset.slide))));
$('#prev').addEventListener('click', () => changeSlide(slide - 1));
$('#next').addEventListener('click', () => changeSlide(slide + 1));
function reset() {
  pinnedOverview = null;
  all('[data-stat], [data-pick]').forEach(el => { el.classList.remove('selected'); el.setAttribute('aria-pressed', 'false'); });
  showOverview(); expandStyle(null);
}
$('#reset').addEventListener('click', reset);
$('#zoom').addEventListener('click', () => {
  const zoomed = $('#canvas-viewport').classList.toggle('zoomed');
  $('#zoom').setAttribute('aria-pressed', String(zoomed));
  $('#zoom').textContent = zoomed ? 'Fit to screen' : 'Zoom in';
  if (!zoomed) $('#canvas-viewport').scrollLeft = 0;
});
function toggleClean() {
  const active = document.body.classList.toggle('clean');
  $('#restore').hidden = !active;
  if (active && document.activeElement instanceof HTMLElement) document.activeElement.blur();
  if (!active) $('#recording').focus({ preventScroll: true });
}
$('#recording').addEventListener('click', toggleClean);
$('#restore').addEventListener('click', toggleClean);
async function toggleFullscreen() {
  try {
    if (document.fullscreenElement) await document.exitFullscreen();
    else await document.documentElement.requestFullscreen();
  } catch {
    $('#fullscreen').title = 'Fullscreen is unavailable in this browser. Use clean view (H) instead.';
  }
}
$('#fullscreen').addEventListener('click', toggleFullscreen);
$('#sources-button').addEventListener('click', () => $('#sources').showModal());
$('#close-sources').addEventListener('click', () => $('#sources').close());
document.addEventListener('keydown', e => {
  if ($('#sources').open || e.ctrlKey || e.metaKey || e.altKey || /INPUT|TEXTAREA|SELECT/.test(e.target.tagName) || e.target.isContentEditable) return;
  if (e.key === 'ArrowRight') { e.preventDefault(); changeSlide(slide + 1); }
  if (e.key === 'ArrowLeft') { e.preventDefault(); changeSlide(slide - 1); }
  if (e.key === 'Escape') reset();
  if (e.key.toLowerCase() === 'h') { e.preventDefault(); toggleClean(); }
  if (e.key.toLowerCase() === 'f') { e.preventDefault(); toggleFullscreen(); }
});
// A clean checkout still works before local reference images are supplied.
all('img[data-fallback]').forEach(img => {
  const fallback = () => {
    const placeholder = document.createElement('span');
    placeholder.className = 'missing-art';
    placeholder.textContent = img.dataset.fallback;
    placeholder.setAttribute('role', 'img');
    placeholder.setAttribute('aria-label', `${img.alt}; local reference image not installed`);
    img.replaceWith(placeholder);
  };
  img.addEventListener('error', fallback, { once: true });
  if (img.complete && !img.naturalWidth) fallback();
});
showOverview(); showSkill(); changeSlide(0);
