// The wave monogram is used independently for the favicon and brand stamp.
export const markPath = 'M12 34 29 78C35 94 49 94 55 78L72 36 89 78C95 94 109 94 115 78L132 34';
// Production wordmark generated with ImageGen; full prompt in design-experiments.
export function logoMarkup() {
  return '<span class="brand-images" aria-hidden="true"><img class="brand-light" src="/wordmark.png" width="1823" height="220" alt="" decoding="async"><img class="brand-dark" src="/wordmark-dark.png" width="1823" height="220" alt="" decoding="async"></span>';
}
