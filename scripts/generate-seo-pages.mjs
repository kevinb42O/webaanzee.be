import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { pricingSummary, pricing, euro } from '../data/pricing.mjs';
import { logoMarkup } from '../data/brand.mjs';
import { locations, cityPath } from '../data/locations.mjs';
import { locationBody, coastBody, regionNav, regionFooter } from './templates/location-page.mjs';
import { projects as cases } from '../data/projects.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const publicDir = path.join(root, 'public');
const origin = 'https://www.webaanzee.be';
const updated = '2026-10-22';


const services = [
  {
    "slug": "webdesign",
    "title": "Een website voor je aanbod en je klanten",
    "short": "Pagina-indeling, ontwerp en bouw voor mobiel en desktop.",
    "intro": "Wat doet je zaak, voor wie werk je en hoe kunnen klanten je bereiken? Die vragen vormen het vertrekpunt voor je website. Ik werk de inhoudsindeling, het ontwerp en de technische bouw met je uit.",
    "items": [
      "Pagina-indeling op basis van je aanbod en klantvragen",
      "Ontwerp voor mobiel en desktop",
      "Technische bouw en contactformulier",
      "Begeleiding bij de indeling van teksten en beelden"
    ],
    "detail": "De website op maat omvat tot vijf pagina’s in één taal en twee gebundelde feedbackrondes. Je levert teksten en beelden aan. Wil je zelf inhoud aanpassen, dan is er een afzonderlijk aanbod met beheerscherm.",
    "question": "Wat zit er in het ontwerp?",
    "answer": "We werken uit welke informatie op elke pagina komt, hoe bezoekers door het aanbod gaan en waar ze contact opnemen. Het ontwerp wordt daarna gebouwd voor mobiel en desktop. Extra pagina’s, talen en functies staan apart in je offerte."
  },
  {
    "slug": "website-laten-maken",
    "title": "Een website laten maken: dit spreken we af",
    "short": "Van je eerste aanvraag tot inhoud, planning en oplevering.",
    "intro": "Je hoeft vooraf geen platform of technische oplossing te kiezen. Vertel wat je zaak doet en wat je wilt veranderen. Ik maak een voorstel met de pagina’s, functies, aan te leveren inhoud en kosten.",
    "items": [
      "Je vraag en gewenste opleverdatum bespreken",
      "Pagina’s, functies en aan te leveren inhoud vastleggen",
      "Ontwerp en feedbackmomenten afspreken",
      "Bouw, oplevering en beheer in de offerte opnemen"
    ],
    "detail": "Stuur de link van je huidige website mee als je die hebt. Geef ook aan welke teksten en beelden al klaarstaan en of je de inhoud later zelf wilt aanpassen. Daarmee kan ik de benodigde werkzaamheden en planning bepalen.",
    "question": "Wanneer krijg ik een planning?",
    "answer": "Bij het voorstel. Ik bekijk de gewenste opleverdatum, beschikbare ruimte, functies en inhoud. Voor de start spreken we de bouw en feedbackmomenten af; een algemene doorlooptijd zou die verschillen niet weergeven."
  },
  {
    "slug": "webshops",
    "title": "Een webshop voor je assortiment",
    "short": "Producten vinden, een bestelling samenstellen en online betalen.",
    "intro": "Een webshop vraagt keuzes over producten, varianten, betalen en leveren. We bekijken je assortiment en dagelijkse verwerking van bestellingen voordat de winkel wordt ingericht.",
    "items": [
      "Product- en categorie-indeling",
      "Productbeheer, winkelmand en online betalen",
      "Eén betaalprovider en de afgesproken verzending inrichten",
      "De eerste 20 producten invoeren met jouw teksten en beelden"
    ],
    "detail": "Je levert productteksten, foto’s, prijzen en verzendinformatie aan. We leggen vast welke varianten, talen en betaalmethoden nodig zijn. Kosten per transactie en externe licenties staan apart.",
    "question": "Wat moet ik voor mijn webshop aanleveren?",
    "answer": "Je assortiment met prijzen, productteksten en beelden, plus informatie over voorraad, levering en retouren. Geef ook aan welke maten of kleuren je verkoopt en of je bestaande systemen wilt koppelen. De precieze inrichting staat in je offerte."
  },
  {
    "slug": "webapplicaties-en-automatisatie",
    "title": "Een toepassing voor terugkerend werk",
    "short": "Aanvragen, klanten of gegevens beheren met software op maat.",
    "intro": "Verwerk je aanvragen of gegevens nog handmatig? We brengen één proces in kaart en bepalen welke schermen, toegangsrechten en koppelingen nodig zijn. Daarvoor bouw ik een webapplicatie.",
    "items": [
      "Het proces en de benodigde gegevens in kaart brengen",
      "Schermen en gebruikersrollen afspreken",
      "Koppelingen met bestaande systemen afbakenen",
      "Bouw, controle en beheer van de toepassing"
    ],
    "detail": "We beginnen met één afgebakend proces. Bestaande systemen, gegevensoverdracht en toegangsrechten bepalen mee wat nodig is. Je krijgt een voorstel waarin ook hosting, beheer en kosten van externe diensten staan.",
    "question": "Hoe bepaal je wat er gebouwd moet worden?",
    "answer": "We lopen het bestaande proces door: wie doet welke stap, welke gegevens zijn nodig en waar wordt werk herhaald? Daarna bakenen we de eerste versie af. Uitbreidingen nemen we alleen op als ze nodig zijn voor dat proces."
  }
];

const routeRecords = [];
const esc = (value='') => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const json = value => JSON.stringify(value).replace(/</g, '\\u003c');

function nav(){return `<a class="skip" href="#inhoud">Ga naar inhoud</a><div class="topline"><span>Webdesign &amp; development vanuit Blankenberge</span><a href="tel:+32494816714">0494 81 67 14</a></div><header class="site-header"><nav class="nav" aria-label="Hoofdnavigatie"><a class="brand" href="/" aria-label="Webaanzee startpagina">${logoMarkup()}</a><div class="nav-links"><a href="/diensten/webdesign/">Diensten</a><a href="/cases/">Projecten</a><a href="/webdesign-belgische-kust/">Kustregio</a><a href="/inzichten/">Uitleg &amp; aanpak</a><a class="nav-cta" href="/#contact">Vertel over je project <span aria-hidden="true">↗</span></a></div><details class="mobile-nav"><summary>Menu</summary><div><a href="/diensten/webdesign/">Diensten</a><a href="/cases/">Projecten</a><a href="/webdesign-belgische-kust/">Kustregio</a><a href="/inzichten/">Uitleg &amp; aanpak</a><a href="/#contact">Contact</a></div></details></nav></header>`}
function footer(){return `<footer class="site-footer"><div class="footer-inner"><div class="footer-intro"><a class="brand" href="/" aria-label="Webaanzee startpagina">${logoMarkup()}</a><p>Websites, webshops en toepassingen. Ontworpen en gebouwd door Kevin in Blankenberge.</p><a class="footer-mail" href="mailto:kevin@webaanzee.be">kevin@webaanzee.be</a></div><nav class="footer-links" aria-label="Diensten"><strong>Diensten</strong><a href="/diensten/webdesign/">Webdesign</a><a href="/diensten/website-laten-maken/">Aanpak</a><a href="/diensten/webshops/">Webshops</a><a href="/diensten/webapplicaties-en-automatisatie/">Webapplicaties</a></nav><nav class="footer-links" aria-label="Ontdek"><strong>Ontdek</strong><a href="/cases/">Projecten</a><a href="/webdesign-belgische-kust/">Belgische kust</a><a href="/inzichten/">Uitleg &amp; aanpak</a><a href="/privacy.html">Privacy</a></nav></div><div class="footer-bottom"><span>© ${new Date().getFullYear()} Webaanzee</span><span>Ontworpen en gebouwd in Blankenberge.</span></div></footer>`}
function breadcrumbs(items){return `<nav class="breadcrumbs" aria-label="Kruimelpad">${items.map((x,i)=>i===items.length-1?`<span aria-current="page">${esc(x[0])}</span>`:`<a href="${x[1]}">${esc(x[0])}</a> <span aria-hidden="true">/</span> `).join('')}</nav>`}
function shell({pathname,title,description,crumbs,body,type='WebPage',areaServed,regional=false,photo=false}){
  const url=origin+pathname;
  const modified=regional?'2026-10-22':updated;
  const graph=[
    {'@type':'Organization','@id':origin+'/#organization',name:'Webaanzee',url:origin+'/',logo:origin+'/logo.png',email:'kevin@webaanzee.be',telephone:'+32494816714',founder:{'@id':origin+'/#kevin'}},
    {'@type':'Person','@id':origin+'/#kevin',name:'Kevin Bourguignon',jobTitle:'Webdesigner en developer',url:origin+'/'},
    {'@type':'WebSite','@id':origin+'/#website',url:origin+'/',name:'Webaanzee',inLanguage:'nl-BE',publisher:{'@id':origin+'/#organization'}},
    {'@type':type,'@id':url+'#webpage',url,name:title,description,inLanguage:'nl-BE',isPartOf:{'@id':origin+'/#website'},about:{'@id':origin+'/#organization'},dateModified:modified}
  ];
  if(areaServed) graph.push({'@type':'Service','@id':url+'#service',name:`Webdesign voor ondernemers in ${areaServed}`,serviceType:'Webdesign en webdevelopment',provider:{'@id':origin+'/#organization'},areaServed:{'@type':'AdministrativeArea',name:areaServed},url});
  if(crumbs.length>1) graph.push({'@type':'BreadcrumbList',itemListElement:crumbs.map((x,i)=>({'@type':'ListItem',position:i+1,name:x[0],item:origin+x[1]}))});
  routeRecords.push({pathname,lastmod:modified});
  return `<!doctype html><html lang="nl-BE"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${esc(title)}</title><meta name="description" content="${esc(description)}"><meta name="robots" content="index,follow,max-image-preview:large,max-snippet:-1"><link rel="canonical" href="${url}"><meta property="og:type" content="website"><meta property="og:title" content="${esc(title)}"><meta property="og:description" content="${esc(description)}"><meta property="og:url" content="${url}"><meta property="og:site_name" content="Webaanzee"><meta property="og:image" content="${origin}/og-image.webp"><meta property="og:locale" content="nl_BE"><meta name="twitter:card" content="summary_large_image"><link rel="icon" href="/favicon.ico" sizes="any"><link rel="icon" href="/favicon.svg" type="image/svg+xml"><link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png"><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&family=DM+Serif+Display:ital@0;1&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet"><link rel="stylesheet" href="${regional?'/location-pages.css':'/seo-pages.css'}">${regional?'<script type="module" src="/location-pages.js"></script>':''}<script type="application/ld+json">${json({'@context':'https://schema.org','@graph':graph})}</script></head><body${regional?` class="rg-page${photo?' rg-page-photo':''}"`:''}>${regional?regionNav():nav()}${regional?'':breadcrumbs(crumbs)}<main id="inhoud">${body}</main>${regional?regionFooter():footer()}</body></html>`;
}
async function emit(pathname, html){const target=path.join(publicDir,pathname.replace(/^\//,''),'index.html');await mkdir(path.dirname(target),{recursive:true});await writeFile(target,html);}
const hero=(eyebrow,title,lead,aside='Je bespreekt de inhoud, het ontwerp en de bouw rechtstreeks met Kevin.')=>`<section class="hero"><div class="hero-main"><p class="eyebrow">${esc(eyebrow)}</p><h1>${title}</h1><p class="lead">${esc(lead)}</p><div class="hero-actions"><a class="button" href="/#contact">Bespreek je project <span aria-hidden="true">↗</span></a><a class="button secondary" href="/cases/">Bekijk projecten</a></div></div><aside class="hero-aside"><img class="aside-mark" src="/brand-symbol.png" width="88" height="35" alt="" aria-hidden="true"><div><strong>Kevin · webdesigner in Blankenberge</strong><p>${esc(aside)}</p></div></aside></section>`;
const sectionTitle=(eyebrow,title,lead='')=>`<div class="section-head"><div><h2>${title}</h2>${lead?`<p class="section-lead">${esc(lead)}</p>`:''}</div></div>`;
const process=()=>`<section class="section process-section"><div class="container">${sectionTitle('','Van aanvraag tot oplevering.')}<ol class="steps"><li><span>01</span><div><h3>Je vraag bespreken</h3><p>Vertel wat je zaak doet, wie je wilt bereiken en wat je wilt laten maken of verbeteren.</p></div></li><li><span>02</span><div><h3>De opdracht vastleggen</h3><p>De offerte vermeldt pagina’s, functies, inhoud, kosten en planning. We spreken af wanneer je feedback geeft.</p></div></li><li><span>03</span><div><h3>Ontwerpen en bouwen</h3><p>Ik werk de website uit en controleer de pagina’s op mobiel en desktop vóór de oplevering.</p></div></li><li><span>04</span><div><h3>Beheer afspreken</h3><p>Hosting, technisch beheer en eventuele wijzigingen na de oplevering verlopen volgens je offerte.</p></div></li></ol></div></section>`;
const serviceGrid=(exclude)=>`<div class="service-grid">${services.filter(s=>s.slug!==exclude).map(s=>`<a class="service-card" href="/diensten/${s.slug}/"><h3>${esc(s.title)}</h3><p>${esc(s.short)}</p><span class="card-link">Bekijk de aanpak <b aria-hidden="true">↗</b></span></a>`).join('')}</div>`;
const caseCard=c=>`<article class="case-card"><a class="case-image" href="${c.casePath}"><img src="${c.image}" alt="${esc(c.title)}: ${esc(c.kind.toLowerCase())}" width="800" height="500" loading="lazy"></a><div class="case-content"><div><span class="case-place">${esc(c.place)} · ${esc(c.kind)}</span><h3><a href="${c.casePath}">${esc(c.title)}</a></h3></div><p>${esc(c.summary)}</p><a class="text-link" href="${c.casePath}">Bekijk het project <span aria-hidden="true">↗</span></a></div></article>`;
const cta=(title='Wat wil je laten maken of verbeteren?',text='Vertel wat je zaak doet en stuur de link van je huidige website mee als je die hebt. Ik bekijk met je welke pagina’s en functies nodig zijn.',action='Neem contact op')=>`<section class="cta"><div class="cta-inner"><div><h2>${esc(title)}</h2><p>${esc(text)}</p></div><div class="cta-actions"><a class="button light" href="/#contact">${esc(action)} <span aria-hidden="true">↗</span></a><a href="mailto:kevin@webaanzee.be">kevin@webaanzee.be</a><a href="tel:+32494816714">0494 81 67 14</a></div></div></section>`;

for(const service of services){
  const relevant=cases.filter(c=>c.services.includes(service.slug)).slice(0,3);
  const body=hero('Webaanzee · diensten',esc(service.title),service.intro,service.short)+`<section class="section white"><div class="container">${sectionTitle('','Wat werken we uit?',service.detail)}<ul class="deliverables">${service.items.map(x=>`<li><strong>${esc(x)}</strong><i aria-hidden="true">✓</i></li>`).join('')}</ul></div></section><section class="section"><div class="container">${sectionTitle('','Kosten en afspraken',pricingSummary)}<p><a class="text-link" href="/#prijzen">Bekijk wat in de startprijzen zit →</a></p><div class="faq"><details><summary>${esc(service.question)}</summary><p>${esc(service.answer)}</p></details></div></div></section>${process()}<section class="section white"><div class="container">${sectionTitle('','Voorbeelden van mijn werk','Bekijk welke informatie en functies bij deze projecten zijn uitgewerkt.')}<div class="case-grid">${relevant.map(caseCard).join('')}</div></div></section><section class="section"><div class="container">${sectionTitle('','Andere mogelijkheden')}${serviceGrid(service.slug)}</div></section>${cta(service.slug==='webshops'?'Wil je je assortiment online verkopen?':service.slug==='webapplicaties-en-automatisatie'?'Welk werk wil je vereenvoudigen?':'Wat wil je met je website veranderen?',service.slug==='webshops'?'Vertel wat je verkoopt, hoe je bestellingen verwerkt en welke productinformatie al klaarstaat.':'Beschrijf je vraag. Ik werk een voorstel uit met de werkzaamheden, planning en kosten.','Bespreek je vraag')}`;
  await emit(`/diensten/${service.slug}/`,shell({pathname:`/diensten/${service.slug}/`,title:`${service.title} | Webaanzee`,description:service.short,crumbs:[['Startpagina','/'],['Diensten','/diensten/webdesign/'],[service.title,`/diensten/${service.slug}/`]],body,areaServed:'Belgische kust'}));
}

await emit('/webdesign-belgische-kust/',shell({pathname:'/webdesign-belgische-kust/',title:'Webdesigner Belgische kust | Webaanzee',description:'Websites, webshops en toepassingen voor ondernemers aan de Belgische kust. Werk rechtstreeks met Kevin vanuit Blankenberge. Bekijk projecten, aanpak en prijzen.',crumbs:[['Home','/'],['Webdesign Belgische kust','/webdesign-belgische-kust/']],body:coastBody(),areaServed:'Belgische Kust',regional:true,photo:true}));

for(const loc of locations){
  await emit(cityPath(loc.slug),shell({pathname:cityPath(loc.slug),title:`${loc.label} | Website laten maken | Webaanzee`,description:`Een website of webshop voor je zaak in ${loc.name}? Werk rechtstreeks met Kevin. Bekijk voorbeelden, de aanpak en startprijzen vanaf ${euro(pricing.website.price)} excl. btw.`,crumbs:[['Home','/'],['Belgische kust','/webdesign-belgische-kust/'],[loc.name,cityPath(loc.slug)]],body:locationBody(loc),areaServed:loc.name,regional:true,photo:loc.slug==='blankenberge'}));
}

const casesIndex=hero('Portfolio','Websites, webshops<br><em>en digitale producten.</em>','Bekijk wat er bij elk project is uitgewerkt: van aanbod en praktische informatie tot productbeheer en software voor de winkelvloer.','Bij elk project lees je de vraag, de uitgewerkte onderdelen en wat bezoekers ermee kunnen doen.')+`<section class="section white"><div class="container">${sectionTitle('','Projecten','De selectie bevat websites voor zaken en organisaties, platforms en het eigen softwareproduct PWAYMENT.')}<div class="case-grid case-grid-large">${cases.map(caseCard).join('')}</div></div></section>${cta()}`;
await emit('/cases/',shell({pathname:'/cases/',title:'Websites, webshops en projecten | Webaanzee',description:'Bekijk projecten van Webaanzee: websites, webshops, digitale collecties en software. Met uitleg over de vraag en de uitgewerkte onderdelen.',crumbs:[['Startpagina','/'],['Projecten','/cases/']],body:casesIndex}));

for(const c of cases){
  const videoSrc = c.introVideoSrc || c.videoSrc;
  const body=hero(`${c.kind} · ${c.place}`,`${esc(c.title)}.<br><em>${esc(c.headline)}</em>`,c.summary,`${c.kind}. Ontwerp en ontwikkeling door Webaanzee.`)+`<section class="project-stage"><div class="container">${videoSrc ? `<figure class="case-intro"><video class="case-visual" controls playsinline preload="none" poster="${esc(c.introVideoPoster ?? c.image)}" width="1280" height="720" aria-label="Websitevideo van ${esc(c.title)}"><source src="${esc(videoSrc)}" type="video/mp4"><a href="${esc(videoSrc)}">Bekijk de websitevideo van ${esc(c.title)}</a></video><figcaption>${esc(c.videoCaption ?? `De website van ${c.title} in beweging`)}</figcaption></figure>` : ''}<img class="case-visual" src="${c.image}" alt="${esc(c.title)}: ${esc(c.kind.toLowerCase())}" width="1400" height="875" loading="eager"></div></section><section class="section white"><div class="container"><div class="project-story"><div><h2>${esc(c.challengeTitle)}</h2><p>${esc(c.challenge)}</p></div><div><h2>${esc(c.solutionTitle)}</h2><p>${esc(c.solution)}</p><p>${esc(c.result)}</p><a class="button secondary" href="${c.url}" target="_blank" rel="noreferrer">Bekijk ${c.id==='pwayment'?'het platform':'de website'} <span aria-hidden="true">↗</span></a></div></div></div></section><section class="section dark"><div class="container">${sectionTitle('','Uitgewerkt in dit project')}<div class="value-grid">${c.choices.map(([title,text])=>`<article><h3>${esc(title)}</h3><p>${esc(text)}</p></article>`).join('')}</div></div></section>${cta(`Ook een ${c.kind==='Eigen softwareproduct'?'toepassing':c.kind.toLowerCase()} laten maken?`,'Vertel welke informatie of functies je nodig hebt. Ik bekijk met je hoe het project kan worden afgebakend.','Bespreek je project')}`;
  await emit(c.casePath,shell({pathname:c.casePath,title:`${c.title} — ${c.kind.toLowerCase()} | Webaanzee`,description:c.summary,crumbs:[['Startpagina','/'],['Projecten','/cases/'],[c.title,c.casePath]],body}));
}

const insightsBody=hero('Uitleg en aanpak','Wat moet je website<br><em>voor je zaak doen?</em>','Lees wat een eigen website toevoegt, bekijk hoe ik een opdracht aanpak of verken het werkgebied.','Begin bij je aanbod en de vragen van je klanten. De techniek volgt uit wat je website moet kunnen.')+`<section class="section white"><div class="container">${sectionTitle('','Verder lezen')}<div class="insight-grid"><a class="insight-card featured" href="/blog/waarom-website-nodig-2026.html"><span>Artikel</span><h3>Waarom heeft je zaak een eigen website nodig?</h3><p>Wat voegt een website toe naast sociale media, en wanneer is een nieuwe website niet je eerste prioriteit?</p><b>Lees het artikel ↗</b></a><a class="insight-card" href="/diensten/website-laten-maken/"><span>Aanpak</span><h3>Een website laten maken</h3><p>Dit spreken we af over inhoud, ontwerp, planning, oplevering en beheer.</p><b>Bekijk de aanpak ↗</b></a><a class="insight-card" href="/webdesign-belgische-kust/"><span>Werkgebied</span><h3>Webdesign aan de Belgische kust</h3><p>Bekijk de regio’s en voorbeelden van projecten in Blankenberge en Oostende.</p><b>Bekijk het werkgebied ↗</b></a></div></div></section>${cta()}`;
await emit('/inzichten/',shell({pathname:'/inzichten/',title:'Uitleg over websites en de aanpak | Webaanzee',description:'Wat heeft je zaak aan een eigen website? Lees het artikel, bekijk de aanpak van Webaanzee en verken het werkgebied aan de Belgische kust.',crumbs:[['Startpagina','/'],['Uitleg en aanpak','/inzichten/']],body:insightsBody}));

routeRecords.unshift({pathname:'/',lastmod:updated},{pathname:'/klantenkaart.html',lastmod:updated},{pathname:'/pwayment.html',lastmod:updated},{pathname:'/blog/waarom-website-nodig-2026.html',lastmod:updated});
const sitemap=`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${routeRecords.map(r=>`  <url><loc>${origin}${r.pathname}</loc><lastmod>${r.lastmod}</lastmod></url>`).join('\n')}\n</urlset>\n`;
await writeFile(path.join(publicDir,'sitemap.xml'),sitemap);
console.log(`Generated ${routeRecords.length} canonical URLs and sitemap.xml`);
