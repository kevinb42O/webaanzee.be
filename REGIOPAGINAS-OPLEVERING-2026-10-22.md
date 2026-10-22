# Oplevering regiopagina’s — 22 oktober 2026

Alle tien bestaande stadspagina’s en de kusthub zijn lokaal opnieuw opgebouwd volgens het goedgekeurde plan. De productiebuild is klaar; er is niet gedeployed.

## Wat veranderde

- Persoonlijke Vlaamse teksten per regio: eigen intro, concrete klantvragen, relevante projectuitleg en een eigen FAQ-onderwerp.
- Grote beeldopening voor Blankenberge en de kusthub; projectgedreven opening voor de andere negen pagina’s.
- De typografie, warme ondergronden, terracotta accenten, navigatie en knoppen sluiten aan op de homepage.
- Projecten direct na de opening, met hun werkelijke herkomst. Geen automatische aanvulling met willekeurige projecten.
- Afwisselende projectcomposities met groot beeld, korte sticky tekst op desktop, beeldonthulling en subtiele scrollbeweging.
- Videovoorbeelden laden pas bij hover/focus, pauzeren buiten beeld en in een verborgen tab en blijven uit bij minder beweging.
- Prijsdelen met bedragen uit de centrale prijsbron, afbakening en doorlopende kosten. Uitleg over input, feedback, livegang en beheer.
- Native FAQ en mobiel menu, duidelijke focusweergave en Escape-bediening voor het menu wanneer JavaScript actief is.
- Responsive beelden: bestaande projectpreviews en twee kleinere varianten van de pierfoto.
- De eerste HTML bevat alle inhoud. JavaScript verbetert de navigatie en media, maar is geen voorwaarde om inhoud, prijzen of contact te vinden.

## Belangrijkste bronbestanden

- `data/locations.mjs`: inhoud en projectselectie van alle tien regio’s.
- `scripts/templates/location-page.mjs`: regionale navigatie, paginaopbouw en kusthub.
- `public/location-pages.css`: afzonderlijke regionale presentatie, breakpoints en effecten.
- `public/location-pages.js`: menu, header en uitgesteld videobeheer.
- `scripts/generate-seo-pages.mjs`: genereert de bestaande routes met de nieuwe presentatie.
- `scripts/check-location-pages.mjs` en `scripts/check-location-motion.mjs`: gerichte controles, ook opgenomen in de build via `npm run check:regions`.

De projectcatalogus en prijsdata blijven de gedeelde bronnen. Andere wijzigingen die tijdens deze opdracht al in de werkmap aanwezig waren, zijn behouden.

## Verificatie

- `npm run build`: geslaagd, inclusief Vite, SSR, prerender, SEO en de regionale controles.
- SEO: 33 HTML-bestanden en 31 sitemap-URL’s gecontroleerd.
- Regiocontroles: elf pagina’s, tien eigen intro’s, centrale bedragen, geldige projectselecties en bestaande mediabestanden.
- Motioncontroles: geen videobron vóór interactie; minder beweging voorkomt afspelen; focus start de preview; blur, buiten beeld en verborgen tab stoppen; een laat opgeloste afspeelbelofte overschrijft een pointerleave niet.
- Alle elf pagina’s gerenderd op 1440 en 390 pixels via browserframes; screenshots bewaard en visueel vergeleken. Geen horizontale overflow of kapotte geladen beelden gevonden.
- Koksijde/Oostduinkerke extra op 320 en 768 pixels gecontroleerd; geen overflow. Op 320 pixels met scripts geblokkeerd blijven prijzen, menu en FAQ bruikbaar.
- Mobiele FAQ opent en sluit met toetsenbord; mobiel menu sluit met Escape.
- Blankenberge ook in de daadwerkelijke productiepreview op poort 4173 gecontroleerd.
- Impeccable-detector: geen bevindingen bij de gewijzigde regionale UI-bronnen.
- `git diff --check`: geslaagd.

De browsersimulatie van een OS-instelling voor minder beweging is niet gebruikt; daarvoor zijn de CSS-regels en de afspeellogica gecontroleerd. Er zijn geen nieuwe veldmetingen voor Core Web Vitals beschikbaar. De opgegeven streefwaarden in het plan zijn dus geen gemeten resultaten.

## Bekijken

Productiepreview: `http://127.0.0.1:4173/webdesign-belgische-kust/webdesigner-blankenberge/`.

Ook beschikbaar: `/webdesign-belgische-kust/` en de bestaande routes voor Oostende, Brugge/Zeebrugge, De Haan/Wenduine, Bredene, Knokke-Heist, Middelkerke/Westende, Nieuwpoort, Koksijde/Oostduinkerke en De Panne.

Screenshots en responsive meetresultaten staan in `/Users/kevin/.codex/visualizations/2026/10/22/01a1632a-3e76-78f2-9369-0f62c80ef69f/region-refresh/`.
