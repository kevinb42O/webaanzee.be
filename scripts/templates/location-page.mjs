import { locations, cityPath } from '../../data/locations.mjs';
import { projects } from '../../data/projects.mjs';
import { pricing, euro } from '../../data/pricing.mjs';
import { logoMarkup } from '../../data/brand.mjs';

const esc = (value = '') => String(value).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
export const arrow = '<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7"/></svg>';
const diagonal = '<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M5 19 19 5M5 5h14v14"/></svg>';
const contact = '/#contact';
const projectBySlug = slug => {
  const project = projects.find(p => p.slug === slug);
  if (!project) throw new Error(`Unknown regional project: ${slug}`);
  return project;
};
const link = (href, text, secondary = false) => `<a class="rg-button${secondary ? ' rg-button-quiet' : ''}" href="${href}">${text}${arrow}</a>`;

export function regionNav() {
  return `<a class="rg-skip" href="#inhoud">Ga naar inhoud</a><header class="rg-header"><nav class="rg-nav rg-wrap" aria-label="Hoofdnavigatie"><a class="rg-brand" href="/" aria-label="Webaanzee startpagina">${logoMarkup()}</a><div class="rg-desktop-links"><a href="/diensten/webdesign/">Diensten</a><a href="/cases/">Projecten</a><a href="/webdesign-belgische-kust/">Kustregio</a><a href="/inzichten/">Uitleg en aanpak</a></div><a class="rg-header-contact" href="${contact}">Neem contact op ${diagonal}</a><details class="rg-menu"><summary aria-label="Navigatiemenu"><span></span><span></span></summary><div><a href="/diensten/webdesign/">Diensten</a><a href="/cases/">Projecten</a><a href="/webdesign-belgische-kust/">Kustregio</a><a href="/inzichten/">Uitleg en aanpak</a><a href="${contact}">Bespreek je website</a><a href="tel:+32494816714">0494 81 67 14</a></div></details></nav></header>`;
}

export function regionFooter() {
  return `<footer class="rg-footer"><div class="rg-wrap"><div class="rg-footer-top"><a class="rg-brand" href="/" aria-label="Webaanzee startpagina">${logoMarkup()}</a><p>Ontworpen en gebouwd door Kevin.<br>Vanuit Blankenberge, voor ondernemers aan de kust.</p><a class="rg-inline" href="mailto:kevin@webaanzee.be">kevin@webaanzee.be ${diagonal}</a></div><nav aria-label="Footernavigatie"><a href="/diensten/webdesign/">Webdesign</a><a href="/diensten/webshops/">Webshops</a><a href="/cases/">Alle projecten</a><a href="/webdesign-belgische-kust/">Werkgebied</a><a href="/privacy.html">Privacy</a></nav><div class="rg-footer-bottom"><span>© ${new Date().getFullYear()} Webaanzee</span><a href="tel:+32494816714">0494 81 67 14</a><a href="#inhoud">Terug naar boven ↑</a></div></div></footer>`;
}

function crumbs(loc) {
  return `<nav class="rg-crumbs" aria-label="Kruimelpad"><a href="/">Startpagina</a><span aria-hidden="true">/</span>${loc ? `<a href="/webdesign-belgische-kust/">Belgische kust</a><span aria-hidden="true">/</span><span aria-current="page">${esc(loc.name)}</span>` : '<span aria-current="page">Belgische kust</span>'}</nav>`;
}

function hero(loc) {
  const photo = !loc || loc.slug === 'blankenberge';
  const featured = loc ? projectBySlug(loc.cases[0][0]) : null;
  const place = loc?.short ?? 'de Belgische kust';
  const title = loc ? `Een website voor<br> je zaak in <span>${esc(place)}.</span>` : 'Je kent je vak.<br><span>Laat het online zien.</span>';
  const intro = loc?.intro ?? 'Ik ben Kevin. Vanuit Blankenberge ontwerp en bouw ik websites, webshops en toepassingen voor ondernemers langs de Belgische kust. Van eerste gesprek tot oplevering werk je rechtstreeks met mij.';
  return `<section class="rg-hero ${photo ? 'rg-hero-photo' : 'rg-hero-project'}">${photo ? '<div class="rg-hero-landscape"><img src="/blankenberge-pier-uhd.webp" srcset="/images/coast/blankenberge-pier-960.jpg 960w, /images/coast/blankenberge-pier-1920.jpg 1920w, /blankenberge-pier-uhd.webp 3840w" sizes="100vw" width="3840" height="2160" fetchpriority="high" alt=""></div>' : ''}<div class="rg-wrap rg-hero-layout"><div class="rg-hero-copy">${crumbs(loc)}<p class="rg-location">${esc(loc?.label ?? 'Webdesign & development · Belgische kust')}</p><h1>${title}</h1><p class="rg-hero-intro">${esc(intro)}</p><div class="rg-actions">${link(contact, 'Bespreek je website')}${link('#werk', loc?.slug === 'blankenberge' ? 'Bekijk mijn werk in Blankenberge' : 'Bekijk mijn werk', true)}</div></div>${!photo ? `<a class="rg-hero-project-link" href="/cases/${featured.slug}/" aria-label="Bekijk de case ${esc(featured.title)}"><div class="rg-browser-bar"><span></span><span></span><span></span><span>${esc(featured.title)}</span>${diagonal}</div><img src="${featured.image}" srcset="${featured.previewSrc ?? `/images/cases/previews/${featured.id}.jpg`} 800w, ${featured.image} 1276w" sizes="(max-width: 720px) 100vw, 50vw" width="1276" height="720" fetchpriority="high" alt="Website van ${esc(featured.title)}"><div class="rg-hero-caption"><span>Geselecteerd werk</span><strong>${esc(featured.title)}</strong><span>${esc(featured.place)}</span></div></a>` : ''}</div>${photo ? '<p class="rg-photo-caption">De pier van Blankenberge. Hier begint Webaanzee.</p>' : ''}<a class="rg-scroll-cue" href="#werk">Verder naar het werk ${arrow}</a></section>`;
}

function work(loc) {
  const selected = loc?.cases ?? [
    ['cozy-moments-blankenberge', 'De koffie- en cocktailbar aan de Grote Markt in Blankenberge. Een website met drankkaart, praktische informatie en een digitale spaarkaart.'],
    ['fabrice-goffin-oostende', 'De persoonlijke website voor de schepen van Digitalisering in Oostende. Een uitgesproken presentatie met ruimte voor beleidsprioriteiten en contact met inwoners.'],
    ['daily-grind-blankenberge', 'Boards, streetwear en sneakers in een webshop die ook het verhaal van de Blankenbergse skatecommunity vertelt.'],
  ];
  return `<section class="rg-work rg-section" id="werk" aria-labelledby="werk-titel"><div class="rg-wrap"><div class="rg-section-heading"><h2 id="werk-titel">${esc(loc?.workTitle ?? 'Gemaakt voor zaken met een eigen verhaal.')}</h2><p>${esc(loc?.workIntro ?? 'Van een koffiebar in Blankenberge tot de website voor de Oostendse schepen van Digitalisering. Bekijk de opdrachten, de gemaakte keuzes en het werk zelf.')}</p></div><div class="rg-projects">${selected.map(([slug, reason], i) => {
    const p = projectBySlug(slug);
    return `<article class="rg-project" style="--project-surface:${['#e7e2d7', '#dedfd6', '#e5d8ce'][i % 3]}"><a class="rg-project-media" href="/cases/${p.slug}/" aria-label="Bekijk de case ${esc(p.title)}"><img src="${p.image}" srcset="${p.previewSrc ?? `/images/cases/previews/${p.id}.jpg`} 800w, ${p.image} 1276w" sizes="(max-width: 720px) 100vw, 58vw" alt="Website van ${esc(p.title)}" width="1276" height="720" loading="lazy" decoding="async">${p.videoSrc ? `<video data-src="${p.videoSrc}" muted loop playsinline preload="none" aria-hidden="true" tabindex="-1"></video>` : ''}<span class="rg-project-open">Bekijk de case ${diagonal}</span></a><div class="rg-project-copy"><p class="rg-project-origin">${esc(p.place)} <span aria-hidden="true">/</span> ${esc(p.kind ?? p.tags[0])}</p><h3>${esc(p.title)}</h3><p>${esc(reason)}</p><a class="rg-inline" href="/cases/${p.slug}/">Bekijk de aanpak ${diagonal}</a></div></article>`;
  }).join('')}</div><a class="rg-all-work rg-inline" href="/cases/">Bekijk alle projecten ${arrow}</a></div></section>`;
}

function needs(loc) {
  const items = loc?.needs ?? [
    ['Je zaak en je diensten presenteren', 'Je klanten willen weten waarvoor ze bij je terechtkunnen. Ik werk je aanbod, voorbeelden en contactroute uit tot een website die past bij je zaak.', 'webdesign'],
    ['Producten online verkopen', 'Van productindeling en foto’s tot betalen en verzenden: we bekijken wat je winkel nodig heeft om bestellingen online te ontvangen.', 'webshops'],
    ['Een proces op maat uitwerken', 'Een aanvraag, klantportaal of terugkerende handeling: we brengen één proces in kaart en bouwen de afgesproken toepassing of koppeling.', 'webapplicaties-en-automatisatie'],
  ];
  const labels = { webdesign: 'Bekijk webdesign', 'website-laten-maken': 'Bekijk de websiteaanpak', webshops: 'Bekijk webshops', 'webapplicaties-en-automatisatie': 'Bekijk toepassingen' };
  return `<section class="rg-needs rg-section" id="mogelijkheden"><div class="rg-wrap rg-needs-layout"><div class="rg-sticky-heading"><h2>${esc(loc?.needTitle ?? 'Wat moet je website voor je doen?')}</h2><p>${esc(loc?.needIntro ?? 'Een bezoek voorbereiden, een product bestellen of een opdracht bespreken. De vragen van je klanten bepalen wat we maken.')}</p></div><div class="rg-needs-list">${items.map(([title, text, service]) => `<article><h3>${esc(title)}</h3><p>${esc(text)}</p><a class="rg-inline" href="/diensten/${service}/">${labels[service]} ${diagonal}</a></article>`).join('')}</div></div></section>`;
}

function prices() {
  const offers = [
    ['Website op maat', pricing.website, 'Je aanbod, je verhaal en een route naar contact.', 'Tot 5 pagina’s in één taal. Ontwerp voor mobiel en desktop, contactformulier, basis voor vindbaarheid en 2 gebundelde feedbackrondes. Zonder eigen beheerscherm.', `Inhoud laten wijzigen: ${euro(pricing.hourly)}/uur.`, 'website-laten-maken'],
    ['Website met eigen beheer', pricing.cms, 'Zelf teksten, foto’s of berichten aanpassen.', 'Tot 8 pagina’s, met een beveiligd beheerscherm voor één soort inhoud, bijvoorbeeld nieuws of projecten. Inclusief uitleg over het gebruik.', 'Extra soorten inhoud en functies op offerte.', 'website-laten-maken'],
    ['Webshop', pricing.webshop, 'Producten bekijken, bestellen en online betalen.', 'Productbeheer, winkelmand, één betaalprovider, inrichting van verzending en de eerste 20 producten op basis van jouw teksten, prijzen en foto’s.', 'Transactiekosten en betaalde licenties apart.', 'webshops'],
    ['Toepassing op maat', pricing.application, 'Een klantportaal, dashboard of automatisatie.', 'We starten met één afgebakend proces. Schermen, gebruikersrollen en koppelingen spreken we vooraf af.', 'Hosting, beheer en externe diensten op offerte.', 'webapplicaties-en-automatisatie'],
  ];
  return `<section class="rg-pricing rg-section" id="prijzen" aria-labelledby="prijs-titel"><div class="rg-wrap"><div class="rg-section-heading"><h2 id="prijs-titel">Wat kost<br><span>je website?</span></h2><div><p>Hier zie je waar de verschillende opdrachten starten. Vooraf krijg je een offerte met wat ik maak, wanneer het klaar is en wat het kost.</p><p class="rg-price-note">Alle bedragen zijn exclusief btw. Eenmalige bouw, hosting en technisch beheer staan apart.</p></div></div><div class="rg-prices">${offers.map(([title, price, intro, scope, limit, service]) => `<article><h3>${title}</h3><p class="rg-offer-intro">${intro}</p><p class="rg-price"><span>vanaf</span><strong>${euro(price.price)}</strong><span>eenmalig · excl. btw</span></p><p>${scope}</p><p class="rg-price-limit">${limit}</p>${price.monthly ? `<p class="rg-recurring">Hosting & technisch beheer<br>vanaf ${euro(price.monthly)}/maand</p>` : ''}<a class="rg-inline" href="/diensten/${service}/">Meer over deze aanpak ${diagonal}</a></article>`).join('')}</div><a class="rg-inline rg-pricing-all" href="/#prijzen">Bekijk het volledige aanbod ${arrow}</a></div></section>`;
}

function collaboration() {
  return `<section class="rg-maker rg-section" id="samenwerking"><div class="rg-wrap"><div class="rg-maker-layout"><div class="rg-portrait"><img src="/studiofoto.webp" alt="Kevin Bourguignon, webdesigner en ontwikkelaar van Webaanzee" width="800" height="800" loading="lazy" decoding="async"><p>Kevin Bourguignon<br><span>Webdesigner & ontwikkelaar · Blankenberge</span></p></div><div class="rg-maker-copy"><h2>Je spreekt met mij.<br><span>Ik maak je website.</span></h2><p>Ik ben Kevin. Bij Webaanzee werk je met dezelfde persoon voor je inhoud, het ontwerp en de bouw. We bekijken je zaak, wat je klanten zoeken en wat je zelf wilt kunnen aanpassen.</p><p>Je hoeft bij het eerste gesprek nog geen uitgewerkt plan te hebben. Je bestaande website, enkele voorbeelden of gewoon een uitleg over je zaak zijn genoeg om te beginnen.</p><a class="rg-inline" href="${contact}">Vertel me over je zaak ${diagonal}</a></div></div><ol class="rg-process"><li><span>01</span><h3>Eerst je vraag.</h3><p>We bespreken je zaak, klanten en wat de website moet kunnen. We verzamelen wat er al is aan teksten, beelden en techniek.</p></li><li><span>02</span><h3>Een concreet voorstel.</h3><p>Je krijgt een overzicht van de pagina’s, functies, kosten en planning. We spreken ook af wie welke inhoud aanlevert.</p></li><li><span>03</span><h3>Ontwerpen en bouwen.</h3><p>Ik werk het ontwerp en de website uit. Je geeft feedback op afgesproken momenten, zodat we gericht kunnen bijsturen.</p></li><li><span>04</span><h3>Controleren en live.</h3><p>We controleren inhoud, formulieren en mobiele weergave. Technisch beheer volgt je offerte; wijzigingen en uitbreidingen bespreken we apart.</p></li></ol></div></section>`;
}

function faq(loc) {
  const questions = [
    loc?.question ?? ['Werk je langs de hele Belgische kust?', 'Ja. Ik werk vanuit Blankenberge voor ondernemers van De Panne tot Knokke-Heist, en ook in Brugge en Zeebrugge. We stemmen de gesprekken af op de opdracht: online of ter plaatse wanneer dat nuttig is.'],
    ['Wat kost een website laten maken?', `Een website op maat start vanaf ${euro(pricing.website.price)} excl. btw. Hosting en technisch beheer via Webaanzee starten vanaf ${euro(pricing.website.monthly)}/maand. Eigen beheer, een webshop en toepassingen hebben een andere omvang. Hierboven zie je de startprijzen; je offerte beschrijft de exacte inhoud en kosten.`],
    ['Help je met de teksten en beelden?', 'Ik help bepalen welke teksten en beelden nodig zijn en waar ze op de website komen. Voor de bouw lever je de afgesproken inhoud aan. Tekstschrijven, fotografie, beeldlicenties en vertalingen nemen we apart op in de offerte als je die wilt laten verzorgen.'],
    ['Hoe zit het met vindbaarheid in Google?', 'Ik zorg voor een technische basis met een duidelijke paginastructuur, paginatitels, beschrijvingen en een sitemap. De inhoud moet ook antwoord geven op de vragen van je klanten. Een vaste positie in Google kan ik niet beloven. Verdere inhoud en optimalisatie bespreken we volgens je doelen.'],
    ['Wat gebeurt er na de lancering?', 'Hosting en technisch beheer worden beschreven in je offerte. Wil je later teksten laten aanpassen of functies toevoegen, dan spreken we de omvang en kosten daarvan apart af. Bij een website met eigen beheer kun je de afgesproken inhoud zelf bijwerken.'],
  ];
  return `<section class="rg-faq rg-section" id="vragen"><div class="rg-wrap rg-faq-layout"><h2>Nog iets<br>dat je wilt weten?</h2><div>${questions.map(([q, a]) => `<details><summary>${esc(q)}<span class="rg-plus" aria-hidden="true"></span></summary><div class="rg-answer"><p>${esc(a)}</p></div></details>`).join('')}</div></div></section>`;
}

function closing(loc) {
  const nearby = loc ? loc.nearby.map(slug => {
    const neighbor = locations.find(l => l.slug === slug);
    if (!neighbor) throw new Error(`Unknown neighboring location: ${slug}`);
    return `<a href="${cityPath(slug)}">${esc(neighbor.name)} ${diagonal}</a>`;
  }).join('') : '';
  return `<section class="rg-closing rg-section" id="bespreken"><div class="rg-wrap"><h2>Vertel me wat je<br><span>wilt laten maken.</span></h2><div class="rg-closing-bottom"><p>Een nieuwe website, je huidige site vernieuwen of een webshop starten? Vertel me over je zaak${loc ? ` in ${esc(loc.name)}` : ''} en wat je nodig hebt. Een link naar je bestaande website is welkom.</p><div>${link(contact, 'Bespreek je project')}<a class="rg-inline" href="mailto:kevin@webaanzee.be">kevin@webaanzee.be ${diagonal}</a><a href="tel:+32494816714">0494 81 67 14</a></div></div></div></section>${loc ? `<nav class="rg-nearby rg-wrap" aria-label="Andere regio’s"><p>Ook aan het werk in de buurt</p><div>${nearby}<a href="/webdesign-belgische-kust/">Alle regio’s ${arrow}</a></div></nav>` : ''}`;
}

function cityIndex() {
  return `<section class="rg-regions rg-section" id="regios"><div class="rg-wrap"><div class="rg-section-heading"><h2>Van De Panne<br><span>tot Knokke-Heist.</span></h2><p>Ik werk vanuit Blankenberge voor ondernemers langs de kust, in Brugge en in Zeebrugge. Kies je regio voor voorbeelden van mijn werk en uitleg over je website.</p></div><nav class="rg-region-list" aria-label="Kies je regio">${locations.map(l => `<a href="${cityPath(l.slug)}"><span>${esc(l.name)}</span>${diagonal}</a>`).join('')}</nav></div></section>`;
}

export const locationBody = loc => `${hero(loc)}${work(loc)}${needs(loc)}${prices()}${collaboration()}${faq(loc)}${closing(loc)}`;
export const coastBody = () => `${hero()}${cityIndex()}${work()}${needs()}${prices()}${collaboration()}${faq()}${closing()}`;
