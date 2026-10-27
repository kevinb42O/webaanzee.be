// The poster and all page content remain available without JavaScript or autoplay.
const video = document.querySelector('[data-wd-video]');
const toggle = document.querySelector('.wd-motion');
const reduced = matchMedia('(prefers-reduced-motion: reduce)');
const saveData = navigator.connection?.saveData;
if (video && toggle && !saveData) {
  let inView = false;
  let userPaused = false;
  let failed = false;
  const sync = async () => {
    if (failed || userPaused || reduced.matches || document.hidden || !inView) {
      video.pause();
      return;
    }
    if (!video.getAttribute('src')) video.src = video.dataset.src;
    try {
      await video.play();
      if (userPaused || reduced.matches || document.hidden || !inView) video.pause();
    } catch {
      toggle.hidden = true;
    }
  };
  video.addEventListener('playing', () => {
    video.classList.add('is-playing');
    toggle.hidden = false;
  });
  video.addEventListener('error', () => {
    failed = true;
    video.classList.remove('is-playing');
    toggle.hidden = true;
  });
  toggle.addEventListener('click', () => {
    userPaused = !userPaused;
    toggle.setAttribute('aria-pressed', String(userPaused));
    toggle.querySelector('span').textContent = userPaused ? 'Video afspelen' : 'Video pauzeren';
    toggle.querySelector('path').setAttribute('d', userPaused ? 'm8 5 11 7-11 7Z' : 'M8 5v14M16 5v14');
    sync();
  });
  reduced.addEventListener('change', () => { toggle.hidden = reduced.matches; sync(); });
  document.addEventListener('visibilitychange', sync);
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(([entry]) => { inView = entry.isIntersecting; sync(); }, { threshold:.15 }).observe(video);
  }
}
