// Navigation shares the desktop scroll controller; mobile keeps native scrolling.
type ScrollController = (top: number, behavior: ScrollBehavior) => void;
let controller: ScrollController | undefined;

export function registerHomeScroll(next: ScrollController) {
  controller = next;
  return () => { if (controller === next) controller = undefined; };
}

export function scrollHomeTo(top: number, behavior: ScrollBehavior = 'smooth') {
  if (controller) controller(top, behavior);
  else window.scrollTo({ top, behavior });
}
