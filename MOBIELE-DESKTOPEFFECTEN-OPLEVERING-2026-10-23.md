# Mobiele desktopeffecten — oplevering

Datum: 23 oktober 2026. Status: lokaal geïmplementeerd en op de productiebuild gecontroleerd. Niet gepubliceerd. Fysieke iPhone-/Android-controle blijft open.

## Resultaat

De mobiele homepage onder 1000 px heeft een verticale scrollregie met dezelfde bestaande scènecomponenten en 3D-engine als desktop. Alleen het desktopmozaïek ontbreekt, volgens de opdracht.

- Portalzoom, gesplitste koppen, hero-introductie en de bestaande beeldtegelreactie. Op touch voedt de scrollvoortgang de golven in het beeldvlak.
- Directe overdracht van de portfolio-intro naar tien projecten in de echte WebGL-dieptegallery, inclusief camera, kleurwerelden, trail en projectnavigatie.
- Vijf diensten met browser-/detailbeelden, maskers, rotatie/schaal en scrollvoortgang.
- Donkere kwaliteitsscène met onthulling, titel/lijn, principes en een afzonderlijk leesmoment voor de slotzin.
- Vier prijsformules met de oorspronkelijke rollende glyphs, titelwissels en kleurwerelden.
- Het bestaande 3D-portret met kustlagen en kleurwissels, opnieuw gecomponeerd voor een verticaal scherm.

Iedere scène gebruikt native paginascroll. Lange tekst krijgt een gemeten leesafstand binnen een sticky podium; geen geneste scroller of blokkering van touch-input. Terugscrollen keert de scrollgestuurde effecten om. Kosten, voorwaarden, FAQ en contact blijven in de gewone documentstroom.

De mobiele gallery gebruikt bestaande 800px-previewtextures en een renderresolutie tot 1,5×. De engine pauzeert buiten de zichtbare portfolioscène en bij een verborgen tabblad. Desktop houdt de oorspronkelijke textures en instellingen.

## Desktopbehoud

`AnimatedGallery`, `createHomeScore`, `desktopMotionQuery`, `useHomeScroll`, de desktop-CSS en de bestanden onder `components/depth-gallery/` zijn niet gewijzigd. Integraties in gedeelde componenten hebben een mobiele tak of optionele props met behouden defaults.

Voor en na zijn zeven desktopmomenten op 1440 × 900 en 1920 × 1080 vastgelegd. De twaalf beelden van portal, hero, mozaïek, diensten, kwaliteit en prijzen behouden dezelfde compositie; elf zijn pixelgelijk, één dienstencapture heeft een minimale afwijking van gemiddeld 0,024 op een kleurkanaalschaal van 0–255. De twee WebGL-beelden zijn visueel op compositie vergeleken; trail, particles en shaderbeweging maken die captures afhankelijk van hun animatieframe en dus niet pixelidentiek.

## Tweede mobiele herstelronde

De vervolgaudit vond fouten die een controle op alleen de beginstanden niet liet zien. Die zijn hersteld:

- Diensten en prijzen verdwenen volledig midden in een overgang en sprongen terug naar hun tekstbegin. Nu blijven kop en bediening staan, wisselen de afzonderlijke panelen met maskers en behoudt elk paneel zijn eigen leesafstand.
- Browserbeelden bij de diensten waren te klein. Ze hebben meer beeldruimte; de tekst blijft via paginascroll bereikbaar. Lange caselinks blijven ook op 320 px bij 200% tekst binnen het scherm.
- Portalintro, portfolio-intro en kwaliteitsslot meten hun eigen leesruimte. Vergrote tekst wordt niet onder een vaste scène afgesneden. De scrollhint staat buiten de chatknop.
- Landscape heeft compactere vaste koppen en bediening. De inhoud krijgt een aparte leesstrook, met beeld en tekst naast elkaar waar de breedte dat toelaat.
- Focus op een link brengt het bijbehorende leesdeel in beeld. Wisselen tussen schermgroottes of bewegingsvoorkeur bewaart de geselecteerde inhoud. Het mobiele menu houdt toetsenbordfocus vast en sluit bij overschakelen naar desktop. Logo en menuknop blijven ook bij 200% tekst binnen de schermbreedte.
- Het contactformulier had te veel binnenruimte op een smal scherm. De mobiele dialoog heeft nu brede velden, een zichtbare eerste invoer, een bereikbare sluitknop en eigen scrollruimte bij een laag scherm/toetsenbord. Vergrote contactkaarten en footertekst verbreden de pagina niet meer.
- Touchgolven stoppen buiten beeld of in een verborgen tabblad. Een mislukte mobiele WebGL-start blijft op de leesbare fallback staan.

## Uitgevoerde verificatie

- `tsc --noEmit`: geslaagd.
- `npm run check:home-motion`: geslaagd; bestaande desktopscore en navigatie blijven correct.
- `npm run build`: geslaagd, inclusief prerendering, SEO en regiocontroles.
- `node scripts/check-mobile-home.mjs http://127.0.0.1:4173`: volledig geslaagd tegen de productiepreview.
- `node scripts/check-mobile-continuity.mjs http://127.0.0.1:5173`: volledig geslaagd voor acht configuraties, inclusief tussenstanden, zichtbare bediening, bereikbare links, kwaliteitsslot en 150%/200% tekst. De eerste vier configuraties zijn ook op de productiepreview gecontroleerd. Op de laatste productiebuild is de 390 × 844-configuratie met 200% tekst opnieuw geslaagd, inclusief menufocus, bewegingsvoorkeur en resize; de volledige homepagecontrole gebruikt eveneens de productiepreview.
- `node scripts/check-mobile-contact.mjs http://127.0.0.1:4173`: geslaagd; smalle dialoog, landscape, vergrote tekst, laag viewport, focusherstel en foutafhandeling. Een lokale HTTP-503-mock controleert de foutmelding zonder een bericht te versturen.
- Mechanische ontwerpcontrole: geen meldingen.
- `git diff --check`: geslaagd.

De browsercontrole dekt 320 × 568, 375 × 667, 390 × 844, 430 × 932, 768 × 1024, 820 × 1180, 844 × 390, 999 × 844, 1000 × 649, 1000 × 650 en 1440 × 900. Gecontroleerd: juiste route, unieke IDs, één H1, geen horizontale overflow, alle project-/dienst-/prijsstappen, omgekeerd scrollen, bereikbare acties, toetsenbordfocus, gesimuleerde touch, echte tikbediening van project- en dienstenknoppen, directe ankers, reload, browsergeschiedenis, menu, FAQ en contactdialoog.

Projectselectie blijft behouden bij mobiel → desktop → mobiel en bij een volgende mobiele resize. Reduced motion, grotere tekst en uitgeschakelde WebGL zijn gecontroleerd. De versie zonder JavaScript bevat één H1, tien cases, vijf diensten en vier aanbiedingen; op 320 px is geen horizontale overflow gemeten.

Tijdens de controles zijn onder meer de onzichtbare herolaag boven de gallery, overlap tussen projectnavigatie en chat, focus op afgeknipte acties en het herstel van de projectindex bij viewportwissels verholpen.

## Lokale bewijsstukken

- Productiepreview: `http://127.0.0.1:4173/` zolang de lokale previewserver draait.
- Scrollopname: `.tmp/mobile-parity/mobile-scroll.webm` (vóór de laatste aanpassingen aan vergrote tekst, landscape en de positie van de scrollhint).
- Scènebeelden: `.tmp/mobile-parity/review-*.png`.
- Extra beelden op smal scherm, tablet en landscape: `.tmp/mobile-parity/qa-*.png`.
- Desktopreferenties: `.tmp/mobile-parity/before/` en `.tmp/mobile-parity/after/`.

De bewijsstukken onder `.tmp/` zijn lokale, genegeerde bestanden en worden niet automatisch meegecommit.

## Open controle

Dit is Chromium met mobiele viewportemulatie en gesimuleerde touch, geen fysieke Safari-/Android-test. Browserbalken, werkelijk toestel-GPU-gedrag, momentum, rotatie en het mobiele toetsenbord moeten nog op echte toestellen beoordeeld worden. Er is geen gemeten claim over 60fps op fysieke telefoons.
