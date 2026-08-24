# Webaanzee

Vite/React-website met statisch gegenereerde SEO-pagina's en build-time prerendering.

## Lokaal

1. Installeer dependencies met `npm install`.
2. Start lokaal met `npm run dev`.
3. Maak en controleer de productie-output met `npm run build`.
4. Bekijk die output met `npm run preview`.

De build genereert diensten-, case- en gemeentepagina's, maakt `sitemap.xml`, prerendert de bestaande React-pagina's en voert SEO-validaties uit. Een build faalt bij conflicterende canonicals, sitemap/noindex-fouten, ontbrekende H1's, ongeldige JSON-LD of verouderde prijsclaims.

## Contactformulier

Zet de variabelen uit `.env.example` in Vercel. `CONTACT_FROM_EMAIL` moet een door de mailprovider geverifieerde afzender op `webaanzee.be` zijn. Zonder deze configuratie toont het formulier bewust een rechtstreekse e-maillink in plaats van een vals succesbericht.

## SEO na deployment

- Controleer dat apex, HTTP en `/index.html` in één hop naar `https://www.webaanzee.be/` redirecten.
- Dien `https://www.webaanzee.be/sitemap.xml` opnieuw in bij Search Console.
- Inspecteer homepage, kusthub en de tien gemeentepagina's met URL Inspection.
- Start validatie pas voor oude uitsluitingen die na inspectie werkelijk fout bleken.
- Maak nog geen Google Business Profile totdat officiële, verifieerbare ondernemingsgegevens beschikbaar zijn.
