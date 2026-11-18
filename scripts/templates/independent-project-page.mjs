const esc = (value = '') => String(value).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const arrow = '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="M5 19 19 5M5 5h14v14"/></svg>';
const photo = (image, hero = false) => `<figure class="ip-figure${hero ? ' ip-figure-hero' : ''}"><a class="ip-image-link" href="${esc(image.full)}" target="_blank" rel="noopener" aria-label="Vergroot afbeelding: ${esc(image.alt)} (nieuw tabblad)"><img src="${esc(image.src)}" srcset="${esc(image.srcSet)}" sizes="(max-width: 760px) calc(100vw - 40px), (max-width: 1440px) calc(100vw - 96px), 1320px" width="${image.width}" height="${image.height}" alt="${esc(image.alt)}" ${hero ? 'fetchpriority="high"' : 'loading="lazy"'} decoding="async"><span class="ip-enlarge">Vergroot afbeelding ${arrow}</span></a><figcaption>${esc(image.caption)}</figcaption></figure>`;

export function independentProjectBody(project, other) {
  return `<article class="ip-project ip-${project.slug}">
    <header class="ip-opening ip-wrap">
      <div class="ip-heading"><h1>${esc(project.title)}</h1><p class="ip-status">${esc(project.status)}</p></div>
      <div class="ip-introduction"><p class="ip-headline">${esc(project.headline)}</p><p>${esc(project.summary)}</p><div class="ip-meta"><span>${esc(project.platform)}</span><a href="#het-project">Ontdek het project ${arrow}</a></div></div>
    </header>
    <div class="ip-wrap">${photo(project.hero, true)}</div>
    <section class="ip-story ip-wrap" id="het-project" aria-labelledby="ip-idea-title"><h2 id="ip-idea-title">${esc(project.ideaTitle)}</h2><p>${esc(project.idea)}</p></section>
    <div class="ip-features">${project.sections.map((section, i) => `<section class="ip-feature ip-wrap" aria-labelledby="ip-feature-${i}"><div class="ip-feature-copy"><h2 id="ip-feature-${i}">${esc(section.title)}</h2><p>${esc(section.text)}</p></div>${photo(section.image)}</section>`).join('')}</div>
    <section class="ip-engineering" aria-labelledby="ip-contribution-title"><div class="ip-wrap"><div class="ip-story"><h2 id="ip-contribution-title">Wat ik hier bouw.</h2><p>${esc(project.contribution)}</p></div><dl class="ip-systems">${project.systems.map(([title, text]) => `<div><dt>${esc(title)}</dt><dd>${esc(text)}</dd></div>`).join('')}</dl><div class="ip-foundation"><h3>Gebruikte techniek</h3><ul>${project.stack.map(tech => `<li>${esc(tech)}</li>`).join('')}</ul><p>${esc(project.credits)}</p></div></div></section>
    <section class="ip-closing ip-wrap" aria-labelledby="ip-closing-title"><div><h2 id="ip-closing-title">${esc(project.ctaTitle)}</h2><p>${esc(project.title)} is een persoonlijk project in ontwikkeling. Heb je zelf een idee voor een website of toepassing? Vertel me wat je wilt maken.</p><a class="ip-action" href="/#contact">${esc(project.cta)} ${arrow}</a></div><a class="ip-next" href="${other.path}"><span>Ontdek ook</span><strong>${esc(other.title)}</strong><span>${esc(other.kind)} ${arrow}</span></a></section>
    <div class="ip-back ip-wrap"><a href="/#eigen-projecten">Terug naar eigen projecten</a></div>
  </article>`;
}
