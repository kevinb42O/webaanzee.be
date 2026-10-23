/**
 * Smooth-scroll to a section by its ID without changing the URL hash.
 * Accounts for the sticky header height so content isn't hidden behind it.
 */
import { scrollToHomeMoment } from './homeChoreography';
import { scrollHomeTo } from './homeScroll';
export const scrollToSection = (
  e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement> | null,
  sectionId: string,
  behavior?: ScrollBehavior
) => {
  if (e) {
    e.preventDefault();
  }

  const id = sectionId.replace(/^[/#]+/, '');
  const el = document.getElementById(id);
  
  if (!el) {
    return;
  }

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const motion = behavior ?? (reduceMotion ? 'auto' : 'smooth');
  const mobileSequence = el.closest<HTMLElement>('[data-mobile-sequence]');
  if (mobileSequence && el.dataset.mobileMoment !== undefined) {
    window.scrollTo({ top: mobileSequence.getBoundingClientRect().top + window.scrollY + Number(el.dataset.mobileMoment), behavior: motion });
    return;
  }
  const sequence = el.closest<HTMLElement>('[data-home-sequence]');
  if (sequence && (el.dataset.homeMoment !== undefined || id === 'home')) {
    scrollToHomeMoment(sequence, Number(el.dataset.homeMoment ?? 0), Number(sequence.dataset.homeTotal), motion);
    return;
  }

  // Account for sticky header
  const header = document.querySelector('header');
  const offset = header ? header.getBoundingClientRect().height + 16 : 80;

  const top = el.getBoundingClientRect().top + window.scrollY - offset;

  scrollHomeTo(top, motion);
};
