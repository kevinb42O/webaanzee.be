/**
 * Smooth-scroll to a section by its ID without changing the URL hash.
 * Accounts for the sticky header height so content isn't hidden behind it.
 */
export const scrollToSection = (
  e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement> | null,
  sectionId: string
) => {
  if (e) e.preventDefault();

  const id = sectionId.replace(/^[/#]+/, '');
  const el = document.getElementById(id);
  if (!el) return;

  // Account for sticky header
  const header = document.querySelector('header');
  const offset = header ? header.getBoundingClientRect().height + 16 : 80;

  const top = el.getBoundingClientRect().top + window.scrollY - offset;

  window.scrollTo({ top, behavior: 'smooth' });
};
