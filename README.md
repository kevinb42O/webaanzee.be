# Webaanzee

Vite/React-website met statisch gegenereerde SEO-pagina's en build-time prerendering.

## Lokaal

1. Installeer dependencies met `npm install`.
2. Start lokaal met `npm run dev`.
3. Maak en controleer de productie-output met `npm run build`.
4. Bekijk die output met `npm run preview`.

De build genereert diensten-, case- en gemeentepagina's, maakt `sitemap.xml`, prerendert de bestaande React-pagina's en voert SEO-validaties uit. Een build faalt bij conflicterende canonicals, sitemap/noindex-fouten, ontbrekende H1's, ongeldige JSON-LD of verouderde prijsclaims.

## Logo

De primaire merkhandtekening combineert een compact, gevouwen koraalkleurig kustsymbool met een geometrisch **webaanzee**-woordmerk. De doorlopende verbinding in “zee” vormt een eigen detail. Het volledige ontwerp is met ImageGen gegenereerd en als transparante PNG toegepast in navbar, footer en gegenereerde pagina's. Het eerder gekozen zelfstandige W-golfmonogram blijft de favicon.

- `public/wordmark.png`: lichte merkhandtekening, 1823 × 220 pixels, transparant.
- `public/wordmark-dark.png`: donkere letters met hetzelfde koraalkleurige symbool voor lichte achtergronden.
- `public/wordmark-source.png`: originele gegenereerde master op zwart.
- `public/brand-symbol.png`: zelfstandig gevouwen kustsymbool voor merkaccenten op de site.
- `public/logo-mark.svg`: zelfstandig W-golfmonogram.
- `public/favicon.svg` en `public/favicon.ico`: donker W-monogram op koraal.
- `public/apple-touch-icon.png`: Apple-touchicoon van 180 × 180 pixels.
- `public/logo.png` en `public/logo.webp`: vierkant W-monogram van 512 × 512 pixels voor metadata en bestaande verwijzingen.

Gebruik altijd de volledige merknaam Webaanzee als toegankelijke linktekst. `components/Logo.tsx` deelt beide PNG-varianten tussen React-pagina's; `data/brand.mjs` levert dezelfde afbeeldingen aan de statische paginagenerator. De navbar wisselt naar de donkere variant op een lichte achtergrond en herstelt de lichte versie in het mobiele menu. Het symbool behoudt zijn koraalkleur in beide varianten.

De exacte generatie- en verfijningsprompts staan in `design-experiments/wordmark-prompt.txt`. `node scripts/render-wordmark.mjs` exporteert de master opnieuw met transparantie en een vaste veilige marge, zonder de gegenereerde lettervormen of het symbool opnieuw te tekenen. Behoud de onderlinge verhoudingen en voeg geen extra symbool aan de PNG toe.

## Contactformulier

Zet de variabelen uit `.env.example` in Vercel. `CONTACT_FROM_EMAIL` moet een door de mailprovider geverifieerde afzender op `webaanzee.be` zijn. Zonder deze configuratie toont het formulier bewust een rechtstreekse e-maillink in plaats van een vals succesbericht.

## Eigen projecten: PWAYMENT, Velvet en Sunline

De homepage toont PWAYMENT POS, Velvet en Sunline in die volgorde na Over mij. PWAYMENT gebruikt een nieuwe opname van de huidige lokale RETAIL-code en linkt naar `/pwayment.html`. De productpagina toont zeven actuele schermen; ook de PWAYMENT-case gebruikt het nieuwe kassabeeld. De statische detailpagina's van Velvet en Sunline staan op `/eigen-projecten/velvet/` en `/eigen-projecten/sunline/` en werken zonder JavaScript. `data/independent-projects.mjs` bevat de gedeelde inhoud, beeldinformatie en ontwikkelstatus; `independentProjectPreviews` bepaalt de homepagevolgorde. `data/pwayment-screens.mjs` deelt de nieuwe beelden tussen de homepage en productpagina.

De goedgekeurde originelen en bronselectie staan in `design-experiments/eigen-projecten/`. `python3 scripts/prepare-independent-project-images.py` maakt met Pillow de responsieve WebP-bestanden, deelafbeeldingen en uitsnedemetadata in `public/images/eigen-projecten/`. Het script schaalt beelden niet op. Na een inhouds- of beeldwijziging genereert `npm run build` de detailpagina's en sitemap opnieuw.

Nieuwe PWAYMENT-opnames maak je met `node scripts/capture-pwayment-ui.mjs`, terwijl de huidige RETAIL-bron lokaal draait op `127.0.0.1:4191` met `VITE_E2E_BUILD=true VITE_SEED_DEMO_PRODUCTS=true`. `PWAYMENT_ORIGIN` kan die lokale oorsprong wijzigen. Het script gebruikt een nieuw browserprofiel, blokkeert externe HTTP-verzoeken en werkt uitsluitend met lokale demogegevens; het rondt geen verkopen af. De originelen, opnamegegevens en gecontroleerde bronversie staan in `design-experiments/eigen-projecten/sources/pwayment/`. De oude remote productbeelden worden niet meer gebruikt op de PWAYMENT-productpagina.

Controleer de productie-output met `npm run preview -- --host 127.0.0.1 --port 4178 --strictPort` en in een tweede terminal `npm run check:independent-projects`. De browsercontrole test beide detailpagina's zonder JavaScript op drie breedtes, beeldbestanden, homepageplaatsing, rechtstreekse ankerlinks, behoud van leespositie bij formaatwissels en reduced motion. Schermbeelden worden lokaal opgeslagen in `.tmp/independent-projects/`. Een andere preview-URL kan als argument mee; `CHROME_PATH` selecteert zo nodig een geïnstalleerde Chrome.

## SEO na deployment

- Controleer dat apex, HTTP en `/index.html` in één hop naar `https://www.webaanzee.be/` redirecten.
- Dien `https://www.webaanzee.be/sitemap.xml` opnieuw in bij Search Console.
- Inspecteer homepage, kusthub en de tien gemeentepagina's met URL Inspection.
- Start validatie pas voor oude uitsluitingen die na inspectie werkelijk fout bleken.
- Maak nog geen Google Business Profile totdat officiële, verifieerbare ondernemingsgegevens beschikbaar zijn.
