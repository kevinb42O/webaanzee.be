// The complete page works as HTML. This module only enhances navigation and media.
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const header = document.querySelector('.rg-header');
const hero = document.querySelector('.rg-hero');
if (header && hero && 'IntersectionObserver' in window) {
  new IntersectionObserver(([entry]) => {
    header.classList.toggle('is-stuck', !entry.isIntersecting);
  }).observe(hero);
}

const menu = document.querySelector('.rg-menu');
menu?.addEventListener('keydown', event => {
  if (event.key === 'Escape' && menu.open) {
    menu.open = false;
    menu.querySelector('summary').focus();
  }
});
document.addEventListener('click', event => {
  if (menu?.open && !menu.contains(event.target)) menu.open = false;
});
menu?.querySelectorAll('a').forEach(anchor => anchor.addEventListener('click', () => { menu.open = false; }));

const media = [...document.querySelectorAll('.rg-project-media')];
const stop = element => {
  const video = element.querySelector('video');
  video?.pause();
  element.classList.remove('is-playing');
};
const stopAll = () => media.forEach(stop);
for (const element of media) {
  const video = element.querySelector('video');
  if (!video) continue;
  let wanted = false;
  const play = async () => {
    if (reducedMotion.matches || document.hidden || window.matchMedia('(hover: none)').matches) return;
    wanted = true;
    if (!video.getAttribute('src')) video.src = video.dataset.src;
    try {
      await video.play();
      if (wanted && !document.hidden && !reducedMotion.matches) element.classList.add('is-playing');
      else stop(element);
    } catch { stop(element); }
  };
  const pause = () => { wanted = false; stop(element); };
  element.addEventListener('pointerenter', play);
  element.addEventListener('pointerleave', pause);
  element.addEventListener('focus', play);
  element.addEventListener('blur', pause);
  video.addEventListener('error', pause);
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(([entry]) => { if (!entry.isIntersecting) pause(); }).observe(element);
  }
}
document.addEventListener('visibilitychange', () => { if (document.hidden) stopAll(); });
reducedMotion.addEventListener('change', stopAll);
