# Mobiele homepagechoreografie — oplevering

22 oktober 2026. Geïmplementeerd in de lokale werkboom; niet gepubliceerd.

## Gedrag

- Eigen mobiele renderroute onder 1000 px. De bestaande desktopselectie en desktoptijdlijn blijven behouden, inclusief de fallback voor lage desktopvensters.
- Een zichtbare kustfoto met een korte titelentree. Een lokaal sticky openingsmoment draagt de compositie over aan het eerste echte projectbeeld. Twee decoratieve previews ondersteunen de overname.
- Het openingsmoment gebruikt 0,5 scherm extra scrollafstand en speelt bij terugscrollen hetzelfde pad terug. De echte eerste projectafbeelding blijft staan wanneer de pagina verdergaat; er is geen dubbele toegankelijke case.
- De opening houdt alleen vast als zowel hero als portfoliocompositie passen. Bij minder dan 600 px viewporthoogte, grotere tekst of onvoldoende inhoudsruimte blijft de normale paginastroom actief.
- Tien projecten met kleine lokale beeldverplaatsingen. Beschrijvingen en links verdwijnen niet tijdens lezen. Mobiel worden geen casevideo's geladen.
- Diensten blijven door tikken bedienbaar. Het bijbehorende voorbeeld staat in het geopende paneel, met een korte onderbreekbare hoogteovergang. Keyboardfocus activeert op mobiel niet ongevraagd een andere dienst.
- Lokale entrees en lijnen voor diensten, kwaliteit, aanbod en FAQ; een kleine scrollgestuurde beweging tussen kustbeeld en portret; een rustige contactentree. Bedragen, voorwaarden, vragen en formulier blijven stabiele bedieningselementen.
- Minder beweging schakelt de ruimtelijke effecten en het vastgehouden moment uit. Zonder JavaScript blijft de bestaande prerender leesbaar; mobiele noscript-stijlen maken ook de oorspronkelijke hero zichtbaar.
- Bij een echte formaatwissel tussen mobiel en desktop wordt hetzelfde leesonderdeel teruggevonden, inclusief het huidige project.

## Belangrijkste bestanden

- `components/MobileHomeChoreography.tsx` en CSS-module: mobiele hero, opening, eerste case, portfolio en mobiele dienstenroute.
- `components/MobileHomepageEffects.tsx` en CSS-module: lokale verbeteringen van bestaande leesdelen; geen tweede kopie van Quality, Offer, About, FAQ of ContactFooter.
- `utils/useMediaQuery.ts`: viewportselectie met stabiele serverfallback.
- `utils/preserveHomeReadingPosition.ts`: inhoudelijke leespositie bewaren bij een renderroutewissel.
- `components/PortfolioDepth.tsx`: koppeling van de mobiele route; bestaande desktopregie behouden.
- `components/ProblemSolution.tsx` en CSS-module: expliciete mobiele variant, met ongewijzigde desktopdefaults.
- `scripts/check-mobile-home.mjs`: browserregressiecontrole tegen een draaiende dev- of previewserver.

Er waren al wijzigingen aan de desktopchoreografie in de werkboom en die bestanden veranderden ook parallel tijdens dit werk. Die wijzigingen zijn behouden. De mobiele implementatie herschrijft hun desktopregie niet.

## Verificatie

De browsercontroles zijn uitgevoerd met Puppeteer/Chromium. Ze bewijzen layout, browsergedrag en gesimuleerde invoer; geen fysieke iPhone- of Androidmeting.

- Viewports: 320×568, 375×667, 390×844, 430×932, 768×1024, 820×1180, 844×390, 999×844, 1000×649, 1000×650 en 1440×900. Geen horizontale overflow of dubbele IDs; één H1; alle tien mobiele projecten aanwezig.
- Mobiele opening actief waar de compositie past; gewone doorstroom op het kleine scherm en in landscape. Terugscrollen geeft bij dezelfde scrollpositie hetzelfde overgangsframe.
- Native scroll met gesimuleerde touchinvoer. Alle vijf dienstenpanelen via gesimuleerde taps geopend; actief voorbeeld, hoogte en focus gecontroleerd. FAQ openen en sluiten gecontroleerd.
- Contactdialoog via tap geopend, initiële inputfocus en typen gecontroleerd, via Escape gesloten en scrollvrijgave gecontroleerd. Mobiel menu openen en sluiten eveneens gecontroleerd. Er is geen testbericht verstuurd.
- Acht directe ankers: home, resultaten, projecten, werkwijze, prijzen, over-ons, faq en contact. Landingen gecontroleerd.
- Formaatwissel met behoud van Daily Grind in beide richtingen. De emulatieflags blijven tijdens deze test gelijk: een echte resize, geen door Puppeteer veroorzaakte paginareload.
- Reduced motion en grotere tekst gecontroleerd. De opening schakelt naar normale documentstroom en ruimtelijke project-/titelframes vervallen.
- Productiepreview zonder JavaScript: hero-afbeelding en titel zichtbaar, geen horizontale overflow. Een nieuwe productiepagina met JavaScript kiest de mobiele route.
- Geen browserruntimefouten en geen aanvragen voor mobiele casevideo's tijdens de gecontroleerde volledige scrolldoorgang.
- Desktopreferenties op 1440×900 en 1920×1080 en de lage fallback op 1000×649 vastgelegd en bekeken. De desktopvoorwaarden en bestaande hoofdstukregie blijven behouden; parallelle desktopwijzigingen en de asynchroon verschijnende chatwidget maken een pixelidentieke totale werkboomvergelijking niet representatief.
- Visuele controle van hero, tussentoestanden van de opening, eerste case, diensten, kwaliteit, prijzen, About, FAQ en contact op 390×844.
- Chromium-steekproef van vijf seconden met 4× CPU-vertraging, over de volledige mobiele pagina: 300 gemeten frame-intervallen, mediaan 16,7 ms, p95 16,8 ms, geen interval boven 34 ms en geen geregistreerde long task vanaf 50 ms. Dit is een lokale synthetische meting, geen garantie voor fysieke toestellen.
- TypeScript-controle en productiebuild geslaagd. De build controleert tevens prerendering, SEO, regiopagina's en regionale motionregels. De bestaande afzonderlijke desktopmotioncontrole is eveneens geslaagd.
- Impeccable-detector uitgevoerd op de nieuwe mobiele onderdelen en integratiebestanden: geen bevindingen.

Browsercontrole opnieuw uitvoeren tegen een draaiende server:

```sh
node scripts/check-mobile-home.mjs http://127.0.0.1:3000
```

## Nog fysiek te controleren

iOS Safari en Android Chrome op echte toestellen: browserbalk, momentum, rotatie en het schermtoetsenbord bij het formulier. De geautomatiseerde Chromiumcontrole vervangt deze toestellen niet. Er is niets naar productie gepubliceerd.
