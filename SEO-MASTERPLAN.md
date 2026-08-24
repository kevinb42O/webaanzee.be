# SEO-masterplan Webaanzee

Datum audit: 24 augustus 2026  
Doelgebied: de tien Belgische kustgemeenten  
Primair commercieel doel: kwalitatieve aanvragen voor webdesign en development  
Ambitie: organisch zo hoog mogelijk scoren, met positie 1 als richtinggevend doel per kustgemeente

## 1. Managementsamenvatting

De huidige site heeft geen probleem dat met alleen een nieuwe sitemap kan worden opgelost. De technische basis, informatiearchitectuur, lokale relevantie, bewijsvoering, snelheid en meetinrichting moeten als één programma worden aangepakt.

De grootste huidige beperking is eenvoudig: Webaanzee heeft nauwelijks indexeerbare pagina's waarop Google een specifieke zoekintentie aan een specifieke kustgemeente kan koppelen. De homepage probeert tegelijk te scoren voor Brugge, Blankenberge, de hele Belgische kust, webdesign, development en meerdere productaanbiedingen. De sitemap bevat slechts vier URL's, waaronder een `noindex`-pagina, terwijl een bestaande commerciële pagina ontbreekt.

De aanbevolen volgorde is:

1. Meetbasis en Search Console-bewijs veiligstellen.
2. Canonicalisatie, sitemap, robots, metadata en foutieve structured data herstellen.
3. De enorme mediabelasting terugbrengen en belangrijke content statisch prerenderen.
4. Een heldere sitestructuur bouwen met diensten, cases, een kusthub en tien waardevolle gemeentepagina's.
5. Eerst locaties publiceren waarvoor echt lokaal bewijs bestaat; andere locaties pas publiceren zodra elke pagina zelfstandig nuttig en aantoonbaar uniek is.
6. Google Business Profile, reviews, lokale vermeldingen, klantlinks en PR systematisch uitbouwen.
7. Wekelijks meten op query, pagina, gemeente en conversie; maandelijks herprioriteren.

Positie 1 is niet te garanderen. Google bepaalt lokale zichtbaarheid onder meer op relevantie, afstand en bekendheid. Vooral in Maps kan een concurrent met een echte vestiging in de gezochte gemeente een afstandsvoordeel hebben. Het plan maximaliseert daarom zowel organische relevantie als lokale bekendheid, zonder neplocaties of vrijwel identieke stadspagina's te maken.

## 2. Vastgestelde beginsituatie

### 2.1 Search Console-screenshot

De screenshot toont vier uitsluitingsredenen:

- `Pagina met omleiding`: 2 URL's.
- `Uitgesloten door tag noindex`: 1 URL.
- `Alternatieve pagina met correcte canonieke tag`: 1 URL.
- `Gecrawld - momenteel niet geïndexeerd`: 0 URL's.

Deze categorieën zijn niet automatisch fouten. Redirects, een bewust `noindex`-privacydocument en een correct gecanonicaliseerde duplicaat-URL mogen uitgesloten zijn. De echte vraag is welke URL's eronder vallen en of dat precies de bedoelde URL's zijn. De knop “Validatie niet gestart” betekent alleen dat nog geen herstelvalidatie is gestart; het is geen afzonderlijke rankingstraf.

Actie vóór wijzigingen: exporteer per reden alle voorbeeld-URL's en bewaar screenshots en exports als nulmeting. Zonder die lijst mogen we niet raden welke vier URL's Google bedoelt.

### 2.2 Live technische bevindingen

Op 24 augustus 2026 is vastgesteld:

- `https://webaanzee.be/` en `https://www.webaanzee.be/` geven beide status 200. Er is dus geen serverredirect naar één voorkeursdomein.
- `http://webaanzee.be/` redirect wel met 308 naar HTTPS, maar naar de versie zonder `www`.
- `https://www.webaanzee.be/index.html` geeft status 200 in plaats van naar `/` te redirecten.
- De homepage declareert juist `https://www.webaanzee.be/` als canonical. Canonical is nuttig, maar een serverredirect is voor duplicaten een sterker en duidelijker signaal.
- `privacy.html` staat in de sitemap, maar bevat `noindex,follow`. Een URL die bewust niet in Google hoort, hoort niet in de XML-sitemap.
- `pwayment.html` is een indexeerbare commerciële pagina maar ontbreekt in de sitemap.
- Alle `lastmod`-waarden in de sitemap staan op 15 maart 2026 en lijken handmatig beheerd. Ze moeten de laatste inhoudelijk belangrijke wijziging per URL weergeven.
- De sitemap gebruikt `priority` en `changefreq`; Google negeert beide velden.
- `robots.txt` bevat `Crawl-delay: 1`. Googlebot ondersteunt deze instructie niet. Afzonderlijke Googlebot- en Bingbot-blokken voegen hier niets toe.
- PWAYMENT heeft geen expliciete robots-meta, Open Graph-data of structured data. Indexeren mag standaard wel, maar de implementatie is inconsistent.
- De 404-pagina heeft een canonical naar de homepage. Een echte 404 hoort status 404 te behouden en niet te suggereren dat de homepage inhoudelijk equivalent is.
- De homepage en commerciële pagina's leveren de hoofdinhoud pas na client-side JavaScript. Google kan JavaScript renderen, maar statische prerendering maakt content sneller en robuuster beschikbaar voor Google en andere crawlers.

### 2.3 Metadata en structured data zijn inhoudelijk uit sync

De homepage communiceert in metadata en JSON-LD nog:

- een startprijs van €450;
- levering binnen zeven dagen;
- pakketten van €450 en €950.

De zichtbare huidige pagina communiceert daarentegen een startprijs van €950 en €1.950 en doet geen algemene belofte van zeven dagen. Structured data moet de zichtbare, actuele inhoud beschrijven. Deze tegenstrijdigheid moet in de eerste herstelrelease verdwijnen.

Andere opschoonpunten:

- `meta keywords`, `revisit-after`, `rating`, `distribution` en oude geo-meta-tags leveren geen moderne Google-rankingwinst op.
- Zes losse schema-blokken op de homepage zijn meer dan nodig. Eén consistente graph is eenvoudiger betrouwbaar te houden.
- `streetAddress: "Blankenberge"` is geen echt straatadres. Gebruik alleen een volledig, verifieerbaar adres wanneer klanten daar daadwerkelijk ontvangen worden; anders modelleer Webaanzee als service-area business zonder verzonnen bezoekadres.
- FAQ structured data mag semantisch blijven als het exact overeenkomt met zichtbare vragen, maar gewone commerciële websites krijgen normaal geen FAQ-rich result meer. Het mag dus niet als “rich snippet-goud” worden gepland.
- Beweringen, testimonials en cijfers in cases moeten aantoonbaar zijn. Bewaar bewijs of toestemming per claim.

### 2.4 Performance-risico

Een mobiele browsercontrole van de live homepage zag 45 requests. De door responses opgegeven lengtes liepen door herhaalde range-requests voor video samen tot ongeveer 237 MB. Dat is geen zuivere “volledig gedownloade bytes”-meting, maar het toont wel een ernstig mediaprobleem.

Belangrijkste oorzaak:

- `/videos/seascape.mp4` is circa 95 MB en werd in meerdere grote byte-ranges opgevraagd.
- De acht casevideo's laden metadata en veroorzaken extra requests, ook voordat de gebruiker ermee interageert.
- Veel casebeelden zijn 500–860 kB; enkele ongebruikte bronbestanden zijn tientallen MB groot.
- De externe hero-poster is afhankelijk van Unsplash in plaats van een voorspelbare, lokaal geoptimaliseerde asset.

Dit schaadt mobiele ervaring, dataverbruik, crawlrendering en mogelijk Core Web Vitals. De formele doelen op het 75e percentiel zijn: LCP maximaal 2,5 s, INP maximaal 200 ms en CLS maximaal 0,1.

### 2.5 Huidige inhoud en interne structuur

- De homepage bevat na rendering ongeveer 1.173 woorden en één correcte H1, maar de H1 noemt noch webdesign noch een kernregio.
- De belangrijkste navigatie bestaat vooral uit ankers op één pagina.
- Er zijn sterke projecten voor onder meer Blankenberge en Oostende, maar geen interne casepagina's die de aanpak, lokale ervaring en resultaten uitlegbaar en indexeerbaar maken.
- De site heeft maar één blogartikel en geen blogindex; `/blog/` geeft 404 terwijl de breadcrumb van het artikel wel naar `/blog/` verwijst.
- Er bestaat nog geen dienstenarchitectuur en geen locatiehub.
- Het contactformulier gebruikt `mailto:`. Dat is kwetsbaar op apparaten zonder correct ingestelde mailclient en geeft geen betrouwbare succesvolle-leadmeting.

## 3. Doelen en grenzen

### 3.1 Primaire SEO-doelen

Per kustgemeente willen we één sterke URL laten ranken voor één cluster, niet één URL per synoniem:

- `webdesigner [gemeente]`
- `webdesign [gemeente]`
- `website laten maken [gemeente]`
- relevante natuurlijke varianten zoals `webbureau`, `websitebouwer` en `webontwikkelaar`

De tien officiële kustgemeenten zijn:

1. De Panne
2. Koksijde, inclusief Oostduinkerke
3. Nieuwpoort
4. Middelkerke, inclusief Westende
5. Oostende
6. Bredene
7. De Haan, inclusief Wenduine
8. Blankenberge
9. Brugge, met een specifieke Zeebrugge-context
10. Knokke-Heist, inclusief Knokke, Heist, Duinbergen en het Zoute waar inhoudelijk relevant

Plaatsdelen worden in de gemeentepagina verwerkt. Ze krijgen niet automatisch een aparte pagina; dat zou snel tot dunne of concurrerende pagina's leiden.

### 3.2 Bedrijfsdoelen

Rankings zijn een tussenmetric. De echte doelen zijn:

- meer gekwalificeerde organische aanvragen;
- meer telefoongesprekken, WhatsApp-starts en correct verzonden formulieren;
- een hogere verhouding aanvraag → gesprek → offerte → klant;
- inzicht in omzet en leadkwaliteit per pagina en gemeente.

### 3.3 Niet doen

- Geen garantie “nummer 1 binnen X weken”.
- Geen tien gekopieerde pagina's waarop alleen de plaatsnaam verandert.
- Geen nepadressen, virtuele kantoren of extra Google-profielen per kustplaats.
- Geen gekochte reviewpakketten, PBN-links, massale directoryspam of verborgen tekst.
- Geen pagina publiceren zonder zelfstandig nut, echt lokaal detail en een plaats in de browsebare sitestructuur.
- Geen datum aanpassen puur om content vers te laten lijken.
- Geen keywordvarianten opsplitsen over concurrerende pagina's.

## 4. Gewenste informatiearchitectuur

Aanbevolen eindstructuur:

```text
/
├── diensten/
│   ├── webdesign/
│   ├── website-laten-maken/
│   ├── webshops/
│   ├── webapplicaties-en-automatisatie/
│   └── lokale-seo/                 alleen als dit echt als dienst wordt verkocht
├── webdesign-belgische-kust/
│   ├── webdesigner-blankenberge/
│   ├── webdesigner-oostende/
│   ├── webdesigner-brugge-zeebrugge/
│   ├── webdesigner-de-haan/
│   ├── webdesigner-bredene/
│   ├── webdesigner-knokke-heist/
│   ├── webdesigner-middelkerke/
│   ├── webdesigner-nieuwpoort/
│   ├── webdesigner-koksijde/
│   └── webdesigner-de-panne/
├── cases/
│   ├── hond-aan-zee/
│   ├── fabrice-goffin-oostende/
│   ├── cozy-moments-blankenberge/
│   ├── daily-grind-blankenberge/
│   ├── de-wulk-blankenberge/
│   └── ...
├── oplossingen/
│   ├── digitale-klantenkaart/
│   └── pwayment-pos/
├── inzichten/
│   ├── indexpagina
│   └── artikelen/
├── over-kevin/
├── contact/
└── privacy/
```

Niet alle URL's hoeven in één release live. Diensten, cases en locatiepagina's moeten in golven worden uitgebouwd. Bestaande `.html`-URL's kunnen voorlopig blijven of gecontroleerd naar clean URLs migreren. Als ze migreren, is voor elke oude URL een één-op-één 308 nodig; er mogen geen redirectketens ontstaan.

## 5. Paginamapping en zoekintentie

### 5.1 Homepage

Rol: merk, positionering en routekeuze. Niet langer de enige pagina voor alle lokale termen.

- Primaire intentie: `Webaanzee`, `webdesigner Belgische kust`, merkoriëntatie.
- Nieuwe title-richting: `Webdesigner aan de Belgische kust | Webaanzee`.
- Nieuwe H1 moet duidelijk maken wat het bedrijf doet en voor wie, zonder de huidige onderscheidende propositie te verliezen.
- Link prominent naar diensten, de kusthub, drie relevante cases en contact.
- Toon één actuele prijslogica; metadata, zichtbare content en schema moeten gelijk zijn.

### 5.2 Dienstenpagina's

Elke dienst krijgt een eigen probleem, proces, bewijs, prijscontext, FAQ en conversiedoel. Alleen diensten publiceren die Webaanzee werkelijk levert en kan onderbouwen.

Voorbeeld voor `/diensten/webdesign/`:

- H1: professioneel webdesign voor zelfstandigen en kleine ondernemingen.
- Uitleg van strategie, copy, ontwerp, bouw, mobiel, snelheid en begeleiding.
- Link naar relevante cases.
- Vergelijking van een presentatiesite, leadsite, webshop en webapp.
- Heldere voorwaarden en startprijs.
- CTA naar een echt webformulier.

### 5.3 Kusthub

`/webdesign-belgische-kust/` wordt een echte regionale gids, geen lijstje links.

- Leg uit welke lokale sectoren Webaanzee begrijpt: horeca, retail, toerisme, vrije beroepen, lokale handel en diensten.
- Toon een kaart/lijst van alle tien gemeenten.
- Koppel aantoonbare kustcases en concrete resultaten.
- Leg de werkwijze voor bezoeken en samenwerking langs de kust uit.
- Link naar alle gepubliceerde gemeentepagina's en relevante cases.

### 5.4 Gemeentepagina-template met kwaliteitsdrempel

Elke gemeentepagina bevat minimaal:

1. Een unieke title, description en H1 rond het hoofdcluster.
2. Een lokale openingssectie die verder gaat dan de plaatsnaam.
3. Een uitleg van relevante lokale klanttypes en digitale problemen, gebaseerd op echt onderzoek.
4. Minstens één direct lokale case, getuigenis, samenwerking of eigen veldobservatie; als die ontbreekt, een aantoonbaar nabijgelegen case en transparante formulering.
5. Een concreet aanbod en proces dat past bij die markt.
6. Eigen foto's, screenshots, mini-audit of originele lokale gegevensvisualisatie waar mogelijk.
7. Een korte sectie “waarom Webaanzee voor [plaats]” met verifieerbare claims.
8. Prijs- en timingcontext die gelijkloopt met de hoofddienstenpagina.
9. Unieke FAQ's die echte bezwaren uit die gemeente beantwoorden.
10. Links naar één dienst, twee cases, de kusthub en logische buurgemeenten.
11. Auteur/eigenaar, datum van inhoudelijke update en correcte contactgegevens.
12. Eén primaire CTA en gemeten secundaire CTA's.

Publicatiepoort: de pagina gaat pas live/indexeerbaar als zij ook nuttig zou zijn voor iemand die rechtstreeks op de URL landt. Alleen plaatsnamen wisselen is afkeur.

### 5.5 Casepagina's

Cases zijn de belangrijkste bewijslaag en verdienen prioriteit boven generieke blogproductie.

Vaste structuur:

- klant en locatie;
- uitgangssituatie en doel;
- onderzoek en keuzes;
- ontworpen oplossing;
- gebruikte techniek, alleen waar relevant voor de klant;
- screenshots en mobiel resultaat;
- meetbaar resultaat met periode, bron en context;
- testimonial met toestemming;
- link naar live site;
- gerelateerde dienst en gemeentepagina;
- CTA voor een vergelijkbaar project.

Elke claim krijgt intern een bewijsnotitie: bron, meetperiode, toestemming en datum. Vermijd onbewezen superlatieven.

## 6. Gefaseerde lokale uitrol

### Golf 1 — sterkste bestaande bewijs (week 4–7)

1. Blankenberge: COZY Moments, Daily Grind en De Wulk geven directe lokale relevantie.
2. Oostende: Fabrice Goffin is een directe lokale case.
3. Brugge/Zeebrugge: huidige merkpositionering noemt Brugge; verzamel vóór publicatie minstens één concrete case, testimonial, partner of originele lokale analyse die de claim verdiept.

### Golf 2 — nabij en commercieel kansrijk (week 7–10)

4. De Haan/Wenduine.
5. Bredene.
6. Knokke-Heist.

Voor elke pagina eerst minimaal drie lokale gesprekken of SERP/marktobservaties documenteren en één bruikbaar bewijsitem verwerven. Knokke-Heist heeft zichtbare lokale concurrenten met een echte vestiging en jaren ervaring; daar zijn designkwaliteit, lokale cases en autoriteit belangrijker dan extra keywordherhaling.

### Golf 3 — westkust (week 10–14)

7. Middelkerke/Westende.
8. Nieuwpoort.
9. Koksijde/Oostduinkerke.
10. De Panne.

Deze golf pas indexeren wanneer de pagina's niet op golf 2 gekopieerd zijn. Bouw gericht bewijs via één lokale pilotcase, partnerships, interviews, een mini-site-auditactie of een concreet sectoronderzoek aan de westkust.

## 7. Technisch herstelplan

### Release T0 — nulmeting en veiligheid (dag 1–2)

- Exporteer Search Console Performance over 16 maanden: query, pagina, land, apparaat, datum en zoektype.
- Exporteer Page Indexing, Sitemaps, Core Web Vitals, Manual Actions, Security Issues en Links.
- Inspecteer de vier uitgesloten voorbeeld-URL's uit de screenshot.
- Leg huidige indexstatus vast voor alle bekende URL's.
- Noteer huidige leads en omzet per kanaal voor zover beschikbaar.
- Maak een volledige crawl van `www`, non-`www`, HTTP, `/index.html`, parameters en trailing-slashvarianten.
- Bewaar voor elke URL: status, redirectdoel, canonical, robots, title, description, H1, woordenaantal, interne links, sitemapstatus en renderstatus.

Acceptatie:

- Er is één reproduceerbare nulmeting.
- Elke huidige URL heeft een beoogde eindstatus: indexeren, redirecten, `noindex` of 404/410.

### Release T1 — indexeerbaarheid en één URL-waarheid (dag 3–5)

- Kies `https://www.webaanzee.be/` als voorkeursvariant, omdat alle huidige canonicals en sitemap-URL's die variant gebruiken.
- Configureer 308: HTTP → HTTPS, apex → `www`, `/index.html` → `/`.
- Definieer één consistente trailing-slashregel voor nieuwe directory-URL's.
- Zorg dat redirects direct naar het einddoel gaan.
- Laat elke indexeerbare pagina 200 geven met self-canonical.
- Houd privacy `noindex,follow` en verwijder haar uit de sitemap.
- Verwijder de homepage-canonical uit de 404-pagina; behoud echte 404-status.
- Voeg PWAYMENT alleen aan de sitemap toe als de pagina bewust onderdeel van Webaanzee Search moet zijn. Anders `noindex` en niet opnemen.

Acceptatie:

- Elke niet-voorkeursvariant redirect in één hop.
- Geen indexeerbare 200-duplicaten op host-, protocol- of `index.html`-niveau.
- Canonical, redirect en sitemap wijzen voor elke pagina naar exact dezelfde URL.

### Release T2 — gegenereerde sitemap en robots (dag 4–6)

- Maak één route/contentmanifest als bron van waarheid.
- Genereer `sitemap.xml` tijdens de build.
- Neem alleen absolute, canonieke, indexeerbare 200-URL's op.
- Gebruik `lastmod` alleen wanneer deze uit een echte inhoudelijke wijzigingsdatum komt.
- Verwijder `priority` en `changefreq`.
- Voeg beeldinformatie alleen toe voor relevante, crawlbare eigen beelden; niet standaard het logo bij elk artikel.
- Automatiseer een buildtest die faalt bij een niet-bestaande sitemap-URL, duplicate loc, `noindex`, redirect of verkeerde host.
- Vereenvoudig robots tot een algemeen blok en één sitemapregel. Verwijder `Crawl-delay` en overbodige botblokken.

Acceptatie:

- Sitemap valideert als XML.
- Iedere sitemap-URL geeft 200, is indexeerbaar en self-canonical.
- Iedere belangrijke indexeerbare URL staat erin.
- Search Console accepteert de sitemap zonder parse- of fetchfout.

### Release T3 — prerendering en semantische HTML (week 2)

- Prerender alle marketing-, dienst-, case-, artikel- en gemeentepagina's naar volledige HTML bij de build.
- React-hydration mag animatie/interactie toevoegen, maar title, description, canonical, H1, hoofdtekst, navigatie en structured data moeten al in de eerste response staan.
- Gebruik echte `<a href>`-links voor crawlbare navigatie.
- Zorg voor één beschrijvende H1 per pagina en logische H2/H3-hiërarchie.
- Voeg een echte `/inzichten/`-index toe voordat breadcrumbs ernaar verwijzen.
- Laat belangrijke content niet alleen verschijnen na scroll, hover of mislukte animatie.

Acceptatie:

- `curl` op iedere indexeerbare URL toont de primaire tekst, H1 en interne links zonder JavaScript.
- Google URL Inspection live test toont dezelfde hoofdinhoud als een gebruiker.
- JavaScript uitgeschakeld laat een leesbare, navigeerbare kernpagina zien.

### Release T4 — metadata en schema (week 2)

- Centraliseer per route: title, description, canonical, OG/Twitter, robots en updated date.
- Verwijder verouderde metadata en alle prijs-/timingclaims die niet zichtbaar en actueel zijn.
- Bouw één consistente JSON-LD-graph met `Organization`/`ProfessionalService`, `Person`, `WebSite` en per pagina `WebPage`.
- Voeg `Service` alleen op echte dienstenpagina's toe.
- Voeg `BreadcrumbList` toe waar de zichtbare hiërarchie dat ondersteunt.
- Gebruik `Article` voor artikelen en passende creatieve werk-/case-semantiek voor cases, zonder niet-ondersteunde rich results te beloven.
- Gebruik `areaServed` voor echte bediende regio's; kopieer geen fictief adres naar elke stadspagina.
- Structured data moet zichtbaar bewijs en actuele content exact weerspiegelen.
- Valideer met Schema Markup Validator en Google Rich Results Test; bewaar testrapport per template.

Acceptatie:

- Geen syntaxfouten, conflicterende entities of onzichtbare/misleidende claims.
- Prijzen en diensten verschillen nergens tussen zichtbare tekst, metadata en schema.

### Release T5 — performance (week 2–3)

- Vervang de hero-video van 95 MB door een korte, visueel geschikte encode. Richtbudget: maximaal 1,5–2 MB mobiel, met moderne codec plus MP4-fallback.
- Lever een eigen AVIF/WebP-poster in de juiste afmetingen; preload alleen het echte LCP-beeld, niet de video.
- Zet casevideo's op `preload="none"` en voeg de `src` pas toe bij zichtbaarheid of bewuste interactie.
- Gebruik op touch/mobile standaard een geoptimaliseerde still in plaats van acht videopreviews.
- Converteer PNG-cases naar AVIF/WebP, lever `srcset`/`sizes` en expliciete width/height.
- Stel assetbudgetten in: hero-afbeelding circa 150 kB, cardbeeld 80–120 kB, initiële JS gzip bij voorkeur onder 150 kB en initiële totale paginatransfer onder circa 1,5 MB.
- Lazy-load alles onder de vouw; laad chat pas na interactie of idle.
- Onderzoek waarom meerdere mediarequests met `ERR_ABORTED` eindigen en voorkom onnodige range-herstarts.
- Verwijder ongebruikte zware bronmedia uit de productie-output of laat de deploy uitsluitend expliciet gebruikte assets kopiëren.
- Meet Lighthouse in CI en echte gebruikersdata met `web-vitals`/CrUX zodra volume dat toelaat.

Acceptatie:

- Mobiel lab: Performance minimaal 90 als kwaliteitsdoel, zonder kritieke regressie.
- Velddata op p75: LCP ≤2,5 s, INP ≤200 ms, CLS ≤0,1.
- Geen 95 MB asset of automatisch geladen casevideo in de initiële mobiele route.

## 8. On-page kwaliteitskader

Voor iedere indexeerbare commerciële pagina geldt:

- Title circa 45–60 zichtbare tekens als werkdoel, uniek en menselijk; geen vaste harde Google-limiet veronderstellen.
- Description circa 140–160 tekens als schrijfdoel, uniek, concreet en zonder onbewezen belofte.
- Eén duidelijke zoekintentie en één primaire CTA.
- Hoofdterm in title, H1, introductie en natuurlijke tussenkop waar logisch; geen dichtheidspercentage.
- Synoniemen en vragen worden natuurlijk beantwoord op dezelfde pagina.
- Afbeeldingen hebben beschrijvende bestandsnamen en alttekst als ze inhoud dragen; decoratieve beelden krijgen lege alttekst.
- Minstens drie betekenisvolle interne links in en drie uit de pagina, afhankelijk van type.
- Geen generiek minimumwoordenaantal. De pagina moet de intentie vollediger en geloofwaardiger oplossen dan de huidige resultaten.
- Feiten hebben bron of eigen bewijs; ervaring wordt met echte cases en procesdetails getoond.
- Contact-, bedrijfs-, prijs- en auteursinformatie is eenvoudig verifieerbaar.

## 9. Google Business Profile en lokale zichtbaarheid

### 9.1 Profielconfiguratie

Status 24 augustus 2026: bewust uitgesteld. Webaanzee heeft nog geen officieel btw-nummer en maakt tot de ondernemingsgegevens volledig en verifieerbaar zijn geen Google Business Profile aan. De website gebruikt intussen geen fictieve lokale vestigingen.

- Controleer eigenaarschap, verificatie, bedrijfsnaam, telefoon, website, openingstijden en primaire categorie.
- Gebruik de echte merknaam zonder plaats- of keywordtoevoegingen die niet in de echte naam voorkomen.
- Als klanten niet op het adres worden ontvangen: verberg het woon-/kantooradres en gebruik één service-area-profiel.
- Voeg de tien kustgemeenten toe als nauwkeurige servicegebieden; Google staat tot twintig gebieden toe.
- Maak geen extra profiel per gemeente tenzij daar een echte, permanent bemande en volgens beleid geschikte vestiging bestaat.
- Link het profiel naar de meest relevante algemene landingspagina, niet via trackingredirect; gebruik UTM op de uiteindelijke URL.
- Vul echte diensten, beschrijving, startdatum, foto's, logo en relevante updates volledig in.

### 9.2 Reviewsysteem

- Vraag elke echte klant kort na een betekenisvol resultaat om een eerlijke review.
- Geef geen voorgeschreven keywordtekst. Vraag wel om in eigen woorden de opdracht, samenwerking en uitkomst te beschrijven.
- Reageer persoonlijk op iedere review, zonder plaatsnamen kunstmatig te stapelen.
- Registreer reviewdatum, klant, dienst, plaats en toestemming voor hergebruik op de site.
- Doel: continu ritme, niet een verdachte eenmalige piek.

### 9.3 Citations en vermeldingen

- Maak NAP/bedrijfsgegevens consistent in KBO, Google, Bing Places, Apple Business Connect en kwalitatieve Belgische/lokale bedrijvengidsen.
- Prioriteer officiële of relevante lokale registers boven tientallen generieke directories.
- Zoek vermeldingen via klantwebsites, lokale handelsverenigingen, partnerpagina's, evenementen, gemeentelijke bedrijvengidsen en regionale pers.
- Controleer ieder kwartaal inconsistenties en dubbele profielen.

## 10. Autoriteit en linkverdienplan

Volgorde van hoogste geloofwaardigheid:

1. Casecredit/link vanaf websites van echte klanten, waar gepast en vrijwillig.
2. Diepgaande gezamenlijke case met klant en meetbaar resultaat.
3. Lokale pers rond een aantoonbaar project, onderzoek of ondernemersinitiatief.
4. Samenwerking met handelsverenigingen, coworkingruimtes, sectororganisaties en lokale events.
5. Originele kustdata of mini-onderzoek dat anderen willen citeren.
6. Praktische gastbijdragen voor relevante ondernemerskanalen.
7. Selectieve, kwalitatieve bedrijvengidsen.

Maandelijks minimumproces:

- identificeer tien relevante prospects;
- doe vijf persoonlijke outreachacties;
- publiceer of verbeter één linkwaardig bewijsstuk;
- volg nieuwe en verloren links op;
- wijs iedere verdiende link aan de inhoudelijk juiste pagina toe.

Geen exacte aantallen links als succesgarantie gebruiken. Kwaliteit, lokale/sectorale relevantie en natuurlijkheid wegen zwaarder.

## 11. Contentprogramma voor twaalf maanden

### Prioriteit 1: bewijscontent

- Zes tot acht volwaardige casepagina's.
- Eén overzicht “websites voor ondernemers aan de Belgische kust” met cases per sector.
- Voor/na-analyses met screenshots, proces en meetmethode.
- Een transparante werkwijze- en over-Kevin-pagina.

### Prioriteit 2: commerciële uitleg

- Kosten van een website laten maken in België/West-Vlaanderen.
- Website, webshop of webapp: welke oplossing past wanneer?
- Wat zit in professioneel webdesign en welke terugkerende kosten bestaan er?
- Hoe lang duurt een websiteproject werkelijk?
- Hoe meet je of een website aanvragen oplevert?

### Prioriteit 3: lokale, originele inhoud

Geen tien generieke artikelen. Kies onderwerpen die aantoonbaar bij de kustmarkt passen, bijvoorbeeld:

- digitale seizoensplanning voor kusthoreca;
- websites voor vakantieverhuur zonder afhankelijkheid van één platform;
- meertalige bezoekersstromen aan de kust;
- lokale vindbaarheid voor handelaars met toeristen én vaste inwoners;
- mobiele snelheid op drukke toeristische momenten;
- analyse van digitale frictie bij een steekproef van kustzaken, met transparante methode.

### Publicatieritme

- Maand 1–3: vooral technische basis, diensten, cases en gemeentepagina's.
- Maand 4–6: twee hoogwaardige stukken per maand, waarvan minstens één case/lokaal bewijsstuk.
- Maand 7–12: ritme baseren op Search Console-gaten en salesvragen; geen volume om het volume.
- Elk kwartaal: content decay-audit, feiten en aanbiedingen bijwerken, interne links verbeteren, zwakke pagina's samenvoegen of `noindex`/verwijderen waar nodig.

## 12. Conversie en meting

### 12.1 Trackingstack

- Search Console Domain Property voor alle host/protocolvarianten.
- GA4 of een privacybewust alternatief voor gedrag en conversies; Search Console blijft bron voor Google Search-prestaties.
- Vercel Analytics kan aanvullend blijven, maar vervangt query- en conversieanalyse niet.
- Koppel Search Console en analytics waar mogelijk.
- Definieer één lead-ID of CRM-notitie om bron en uiteindelijke omzet terug te koppelen.

### 12.2 Events

Minimaal meten:

- `contact_form_start`
- `contact_form_submit_success`
- `contact_form_error`
- `phone_click`
- `whatsapp_click`
- `email_click`
- `case_visit`
- `service_cta_click`
- `location_cta_click`

Parameters: pagina, paginatype, gemeente, dienst, CTA-positie en apparaat. Geen persoonlijke formulierinhoud naar analytics sturen.

### 12.3 Formulierherstel

- Vervang `mailto:` door een echte server-side/serverless verzending.
- Voeg duidelijke fout- en successtatus toe.
- Voeg spambeveiliging toe zonder zware gebruikersfrictie.
- Maak een bedankstatus of bedankpagina die alleen na succes meet.
- Test aflevering, reply-to, SPF/DKIM/DMARC en mobiele bruikbaarheid.

## 13. Dashboard en KPI's

### Wekelijks

- indexeerbare versus geïndexeerde kern-URL's;
- sitemapfouten en nieuwe uitsluitingsredenen;
- top queries en pagina's met grootste weekverandering;
- organische leads en technische fouten;
- uptime en performance-regressies.

### Maandelijks per gemeente

- impressies, klikken, CTR en gemiddelde positie voor het volledige querycluster;
- aantal queries in top 20, top 10, top 3 en positie 1;
- landingspagina, apparaat en branded/non-branded splitsing;
- lokale pack-zichtbaarheid gemeten vanaf vaste meetpunten, niet alleen vanaf het eigen kantoor;
- aanvragen, gesprekken, offertes, klanten en omzet;
- nieuwe reviews, citations en relevante backlinks.

### Kwaliteits-KPI's

- 100% sitemap-URL's zijn 200, indexeerbaar en self-canonical.
- 0 onbedoelde indexeerbare host-/protocolduplicaten.
- 0 structured-datafouten en 0 zichtbare/schema-tegenstrijdigheden.
- 100% gemeentepagina's doorstaat de unieke-content/publicatiepoort.
- Core Web Vitals “goed” op p75 zodra voldoende velddata bestaat.
- Formulieraflevering en eventmeting slagen in maandelijkse end-to-end-test.

### Resultaatmijlpalen, geen garanties

- Dag 14: technische URL-waarheid en nieuwe sitemap correct.
- Dag 30: prerendering, performancefixes, meetstack en eerste cases live.
- Dag 60: golf 1-gemeenten volledig gepubliceerd en intern ondersteund.
- Dag 90: tien gemeenten gepubliceerd voor zover de kwaliteitspoort gehaald is; anders bewust minder pagina's, geen dunne vulling.
- Maand 4–6: meerderheid van prioriteitsclusters met groeiende impressies en eerste top-10-noteringen als werkdoel.
- Maand 6–12: top 3 en positie 1 nastreven waar autoriteit, lokale bewijzen en concurrentieniveau dit haalbaar maken.

## 14. Werkbacklog in uitvoeringsvolgorde

### P0 — onmiddellijk

- [ ] Search Console-exports en exacte uitgesloten URL's ophalen.
- [ ] Definitieve voorkeurs-URL en redirectmatrix vastleggen.
- [ ] Apex, HTTP en `/index.html` server-side consolideren.
- [ ] Privacy uit sitemap; beslissing PWAYMENT vastleggen.
- [ ] Sitemap genereren vanuit routemanifest.
- [ ] Robots vereenvoudigen.
- [ ] Verouderde €450/7-dagen-schema en metadata corrigeren.
- [ ] 95 MB hero-video en automatisch ladende casevideo's aanpakken.
- [ ] Build/crawltests toevoegen voor status, canonical, noindex en sitemap.

### P1 — fundament voor ranking

- [ ] Marketingpagina's statisch prerenderen.
- [ ] Dienstenarchitectuur en navigatie bouwen.
- [ ] Kusthub bouwen.
- [ ] Drie tot zes casepagina's schrijven en publiceren.
- [ ] Golf 1-gemeentepagina's onderzoeken, schrijven en publiceren.
- [ ] Echt contactformulier en conversiemeting implementeren.
- [ ] Google Business Profile volledig auditen en corrigeren.

### P2 — dekking en autoriteit

- [ ] Golf 2 en 3 alleen na lokale kwaliteitspoort publiceren.
- [ ] Reviewsysteem operationeel maken.
- [ ] Kwalitatieve lokale citations opschonen/aanmaken.
- [ ] Klantlinks en gezamenlijke cases verwerven.
- [ ] Twee originele inhoudsstukken per maand testen.
- [ ] Rank-grid en gemeente-dashboard activeren.

### P3 — optimalisatie

- [ ] Titles/descriptions verbeteren op basis van echte impressies en CTR.
- [ ] Pagina's met posities 4–15 versterken met bewijs, intentiedekking en links.
- [ ] Kannibalisatie per querycluster controleren.
- [ ] Conversie per gemeentepagina A/B of sequentieel testen wanneer verkeer voldoende is.
- [ ] Verloren links, verouderde claims en content decay per kwartaal herstellen.

## 15. Definition of Done per nieuwe SEO-pagina

Een pagina is pas klaar wanneer:

- onderzoek en doelquery zijn vastgelegd;
- zij een unieke rol in de keywordmap heeft;
- inhoud menselijk gereviewd en feitelijk controleerbaar is;
- lokaal bewijs aanwezig is of de beperking transparant wordt benoemd;
- title, description, H1, canonical, OG en schema kloppen;
- zij in initiële HTML staat;
- afbeeldingen geoptimaliseerd en toegankelijk zijn;
- interne inkomende en uitgaande links aanwezig zijn;
- CTA en succesmeting werken;
- mobiel, toetsenbord, 404/redirectgedrag en performance getest zijn;
- sitemap en robots consistent zijn;
- Rich Results/Schema-validatie en crawltest slagen;
- Search Console-inspectie na livegang is uitgevoerd;
- eigenaar en evaluatiedatum zijn toegewezen.

## 16. Beslissingen die vóór uitvoering nodig zijn

1. Is `www` definitief de merk-URL? Dit plan adviseert ja vanwege de huidige canonicals en sitemap.
2. Ontvangt Webaanzee klanten fysiek op een officieel zakelijk adres, of is het een service-area business? Dit bepaalt adresweergave en schema.
3. Welke diensten worden de komende twaalf maanden echt verkocht: webdesign, webshop, webapps/automatisatie en/of SEO?
4. Mogen bestaande klantnamen, testimonials, resultaten en screenshots in uitgebreide cases gebruikt worden?
5. Welke Search Console-, Business Profile- en analytics-toegang is beschikbaar?
6. Moeten bestaande `.html`-URL's behouden blijven of naar clean URLs migreren?
7. Is PWAYMENT een Webaanzee-oplossing die via dit domein organisch moet ranken, of een afzonderlijk merk?

## 17. Bronnen en beleidskader

- Google over sitemapinhoud, accurate `lastmod` en het negeren van `priority`/`changefreq`: https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap
- Google over redirects, canonicals en sitemap als gestapelde canonical-signalen: https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls
- Google over JavaScript, rendering en de voordelen van server-side/statische prerendering: https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics
- Google spambeleid over doorway pages en vrijwel gelijke stadspagina's: https://developers.google.com/search/docs/essentials/spam-policies
- Google over behulpzame, originele, people-first content en aantoonbare ervaring: https://developers.google.com/search/docs/fundamentals/creating-helpful-content
- Google structured-data-richtlijnen: https://developers.google.com/search/docs/appearance/structured-data/sd-policies
- Google over de beperkte zichtbaarheid van FAQ-rich results: https://developers.google.com/search/blog/2023/08/howto-faq-changes
- Google Business Profile over relevantie, afstand en bekendheid: https://support.google.com/business/answer/7091
- Google Business Profile-richtlijnen voor één eerlijk service-area-profiel en echte vestigingen: https://support.google.com/business/answer/3038177
- Core Web Vitals en drempelwaarden: https://web.dev/articles/vitals
- Provincie West-Vlaanderen over de tien kustgemeenten: https://www.west-vlaanderen.be/sites/default/files/2024-03/ZeeBONK_Lokale%20Ontwikkelingsstrategie_Plaatselijke_Groep_Visserij.pdf
