# Mobiele homepage met desktopeffecten

Datum: 23 oktober 2026. Status: lokaal geïmplementeerd. Verificatie en open toestelcontrole staan in `MOBIELE-DESKTOPEFFECTEN-OPLEVERING-2026-10-23.md`.

## Opdracht en vaste keuzes

De desktopversie is de goedgekeurde referentie en blijft visueel en functioneel exact zoals ze nu is. Mobiel krijgt dezelfde effecten en dezelfde inhoud, opnieuw gecomponeerd voor een verticaal scherm. **Alleen het desktopmozaïek vervalt op mobiel**, op uitdrukkelijke aanwijzing van de gebruiker. Er komt geen vervangend mobiel tegelmozaïek.

Dit plan vervangt voor deze opdracht de mobiele ontwerpbeperkingen van `PLAN-MOBIELE-CHOREOGRAFIE-2026-10-22.md`: de korte opening als enig groot effect, het statische portfolio, de eenvoudige dienstenhoofdstukken, het uitsluiten van rollende prijzen en het vereenvoudigde portret zijn niet langer de gewenste richting. Het oude document blijft als historiek bestaan.

De mobiele route blijft onder 1000 px. De bestaande desktopvoorwaarde vanaf 1000 px en 650 px hoogte blijft exact behouden. Tablet onder 1000 px krijgt dezelfde effecten met meer compositieruimte. Geen nieuwe vormgeving, teksten, prijzen of projectvolgorde verzinnen.

## Vastgestelde beginsituatie

Broncode en lokale Chromium-weergaven zijn onderzocht, op desktop 1440 × 900 en mobiel 390 × 844. Dit is geen test op fysieke telefoons.

- `PortfolioDepth.tsx` kiest op desktop `AnimatedGallery`, met één scrolltijdlijn voor portal, hero, mozaïek, WebGL-portfolio, diensten, kwaliteit en prijzen.
- Onder 1000 px kiest dezelfde component `MobileHomeChoreography`. Alleen de opening is gepind; daarna volgen tien projectblokken en diensten in de gewone documentstroom.
- Tijdens de lokale meting bevat desktop een `[data-home-sequence]`, `[data-depth-showcase]`, `[data-sticky-grid]` en `[data-service-workbench]`. Mobiel bevat geen van deze vier. De opening staat daar wel op `pinned`.
- Gemeten documenthoogte: desktop circa 31.298 px, mobiel circa 24.090 px. Deze waarden beschrijven de huidige pagina; het zijn geen budgetten voor de nieuwe uitvoering.
- `MobileHomepageEffects` voegt kleine entrees en portretverplaatsingen toe, maar levert geen equivalent van de desktopscènes.
- `Quality` en `Offer` schakelen hun statische inhoud alleen uit voor de bestaande desktopvoorwaarde. `About` selecteert het echte diepteportret eveneens uitsluitend op desktop.
- De gallery-engine bevat al mobiele schaal-, spreidings- en trailinstellingen, maar wordt in de huidige mobiele route niet gebruikt. Die instellingen zijn een vertrekpunt, geen bewijs dat de uiteindelijke portretcompositie klopt.
- Header, ankers en herstel van leespositie kennen momenteel desktopmomenten en mobiele documentblokken. Deze koppelingen moeten expliciet de nieuwe mobiele scènes gaan herkennen.

De ontbrekende effecten zijn dus grotendeels een gevolg van de gekozen mobiele architectuur. Alleen CSS-breakpoints aanpassen lost dat niet op.

## De volledige mobiele reis

| Onderdeel | Te behouden effect | Verticale uitvoering |
| --- | --- | --- |
| Portal en hero | Door het kustportaal zoomen, gesplitste koppen die vertrekken, introductie die verschijnt en leescontrast dat opbouwt. | Bestaand mobiele portalbeeld behouden. Koppen in bovenste en onderste beeldzone; zoom en tekstwissel volgen de verticale scroll. Intro krijgt een eigen leesmoment. |
| Overgang naar werk | Hero verlaat de scène en portfolio neemt het scherm over. | Directe overgang naar het diepteportfolio, met de bestaande portfolio-intro als korte leesfase. Alle mozaïekmomenten en bijbehorende scrollafstand vervallen. Geen onzichtbare mozaïekspacer achterlaten. |
| Tien projecten | Werkelijke 3D-diepte, camerabeweging tussen projecten, overvloeiende kleurwerelden, trail en de bestaande bewegingsreactie. | Afgestemde camera, projectschaal, horizontale spreiding en trail voor portret. Groot beeld in het centrale gebied; projectidentiteit en case-link erboven/eronder. Tien projecten op dezelfde volgorde, met teller en bedienbare vorige/volgende-acties. Geen statische kaarten als normale mobiele uitvoering. |
| Portfolio naar diensten | Portfolio krimpt/verplaatst en het dienstenvlak neemt via een masker over. | Dezelfde visuele overdracht in verticale ruimte; de eerste dienst staat klaar achter de overgang. Geen sprong van het ene losse documentblok naar het volgende. |
| Vijf diensten | Werkbank, browser- en detailframes, maskerovergangen, subtiele rotatie/schaal, bewegend detailbeeld en voortgangslijnen. | Kop → groot voorbeeld met detailoverlay → diensttekst en actie → compacte hoofdstukbediening. Scroll wisselt de vijf diensten, met leesrust per dienst. Tikken op een hoofdstuk gaat naar hetzelfde scrollmoment. Beeld en tekst blijven gesynchroniseerd. |
| Kwaliteit | Donkere scène die via masker opent, titel/lijn die opbouwen, principes en de wissel naar de slotzin. | Titel boven de principes. Bij te veel inhoud schuift de leescompositie tijdens een eigen leesfase door de zichtzone. Pas na de principes volgt de slotzin en de prijsintro. |
| Vier prijsformules | Prijshoofdstukken, rollende cijferglyphs, bewegende titels, kleurwissels, wisselende kop en voortgangsnavigatie. | Formuletitel en prijs bovenaan, details daaronder. De lange inhoud krijgt voldoende verticale scrollafstand; een formule wisselt pas nadat kenmerken, beperking, actie en terugkerende kosten bereikbaar waren. De glyphs rollen bij de formulewissel; bedragen worden geen optellende teller. |
| Kosten en voorwaarden | Bestaand leesbare kosteninformatie en bediening. | Gewone documentstroom na de prijsregie; geen nieuwe effecten uitvinden. Prijsdetails en rekenvoorbeeld blijven volledig beschikbaar. |
| Kevin / About | Meerdere dieptelagen, kustvlak dat passeert, portret dat naar voren komt, achtergrondkleur die verandert en reactie op scrollsnelheid. | Een eigen verticale 3D-compositie met portret en kustlagen, gevolgd door voldoende ruimte voor tekst en contactactie. Scroll levert de bewegingsreactie die op een telefoon zonder muis zinvol is. |
| Header, FAQ, contact en chat | Bestaande navigatiefasen en aanwezige interactie-effecten. | Header volgt mobiele scènemomenten; menu, FAQ, formulier en chat blijven bedienbaar. Geen nieuwe decoratieve scènes toevoegen die desktop niet heeft. |

Muisgestuurde effecten krijgen waar nodig een touch-equivalent. Een hoverpreview mag niet de eerste tik op een case-link opslokken. De huidige 3D-gallery toont projecttextures; de hovervideo uit de statische `ProjectMedia`-route is geen effect van de actieve desktopgallery en wordt daarom niet als verplichte nieuwe mobiele functie toegevoegd.

## Scrollmodel: vastgehouden scènes, aangestuurd door de pagina

Gebruik één native verticale paginascroll als invoer. Een sticky podium houdt de actieve scène in beeld; de afgelegde scrollafstand bepaalt camera, maskers, kleuren en inhoudswissels. Omhoog scrollen draait de scrollgestuurde overgang terug. Geen verplichte animatie afwachten, geen verplichte snap en geen tweede scrollgebied binnen een kaart.

Splits de regie in samenhangende hoofdstukken: opening/portfolio, diensten, kwaliteit, prijzen en About. Binnen elk hoofdstuk is er één voortgangsbron. Aangrenzende hoofdstukken krijgen een expliciet afgebakende overlap voor de overdracht. Kosten, FAQ en contact behouden hun natuurlijke inhoudshoogte. Zo hoeft een openklappend kostendetail niet de tijdrekening van alle eerdere scènes te veranderen.

Elke inhoudsscène heeft drie delen:

1. **Binnenkomst:** het bestaande effect bouwt de verticale compositie op.
2. **Lezen:** beeld en tekst zijn stabiel. Is de inhoud hoger dan de zichtzone, dan verplaatst de inhoud binnen het podium over de gemeten ontbrekende hoogte, gestuurd door dezelfde paginascroll. Alle tekst en links passeren bereikbaar de zichtzone. Er is geen geneste scroller nodig.
3. **Overdracht:** pas na de volledige leesfase vertrekt de scène en komt de volgende binnen.

Meet de vereiste ruimte met geladen fonts en werkelijke teksthoogtes. Baseer de leesafstand op inhoudshoogte en niet op een willekeurige vaste desktopduur. Gebruik een stabiele viewportbasis (`svh`) voor het podium. Het openen/sluiten van browserbalken mag het actieve hoofdstuk niet opnieuw starten. Bij echte rotatie of viewportwissel blijft hoofdstuk, itemindex en leesvoortgang behouden.

De huidige mobiele limiet van maximaal 0,65 extra scherm scrollafstand vervalt: die zou volledige scrollscènes onmogelijk maken. De uiteindelijke lengte volgt uit de leesbaarheid en effecten. Vermijd lege scrollmeters; ieder segment moet een aantoonbare beweging of leesfase hebben.

Bij kleine schermen eerst compositie en leesafstand aanpassen. Effecten niet standaard uitschakelen omdat het scherm smal is. Voor lage landscape-schermen dezelfde effecten in een lagere compositie; alleen wanneer de noodzakelijke bediening/tekst aantoonbaar niet past een leesbare terugval voor die scène gebruiken. Reduced motion en uitgevallen WebGL hebben wel expliciete terugvalroutes.

## Technische afbakening

### Desktop vastzetten

- Leg vóór implementatie de huidige desktop als referentie vast, inclusief begin, tussenstanden en eindstanden van elke scène.
- `AnimatedGallery`, `createHomeScore`, `desktopMotionQuery`, desktop-scrollafstanden, desktop-CSS en bestaande engine-defaults blijven ongewijzigd.
- Verbreed de desktop-mediaquery niet om mobiel toegang tot de effecten te geven: dat zou ook de desktopgeometrie op telefoon activeren.
- Nieuwe mobiele scènecomponenten en CSS-modules; bestaande project-, diensten-, prijs- en tekstdata blijven gedeeld.
- Waar een gedeeld component een integratiepunt nodig heeft: uitsluitend een expliciete mobiele tak of optionele configuratie waarvan de huidige default exact gelijk blijft. Geen algemene refactor als onderdeel van deze opdracht.

### Beoogde onderdelen

| Bestand of gebied | Geplande ingreep |
| --- | --- |
| `components/MobileHomeChoreography.tsx` en eigen CSS | Huidige vereenvoudigde regie vervangen door de volledige mobiele scènevolgorde; geen mozaïek. |
| Nieuwe mobiele scènecomponenten | Afzonderlijke portfolio-, diensten-, kwaliteit-, prijs- en portretcomposities; exacte namen tijdens implementatie bepalen. |
| Nieuwe mobiele score/controller onder `utils/` | Semantische momenten, leesafstanden, actuele scène en navigatie voor mobiel. Bestaande desktopscore niet veranderen. |
| `components/depth-gallery/` | Engine hergebruiken via een mobiele adapter. Bestaande instance-instellingen gebruiken waar mogelijk. Alleen indien noodzakelijk een optionele configuratie toevoegen met ongewijzigde defaults. Camera, labels, texturekaders en trail samen in portret beoordelen. |
| `components/PortfolioDepth.tsx` | Bestaande mobiele selectie aan de nieuwe mobiele regie koppelen. Desktopselectie en desktopcomponent behouden. |
| `components/Quality.tsx`, `components/Offer.tsx`, `components/About.tsx` | Uitsluitend mobiele integratie om de juiste scène te tonen en dubbele inhoud te voorkomen. Kosteninformatie blijft buiten de geanimeerde prijsformules bestaan. |
| `components/MobileHomepageEffects.tsx` | Bestaande kleine DOM-effecten verwijderen waar ze met de nieuwe scènes botsen; eventuele effecten op overige leesstukken behouden indien passend. |
| Header, `scrollToSection`, leespositieherstel | Nieuwe mobiele momenten expliciet ondersteunen vóór de bestaande desktoplogica; bestaande desktopuitkomsten behouden. |
| `scripts/check-mobile-home.mjs` | Oude verwachtingen van statische kaarten en het korte openingsbudget vervangen door controles op de nieuwe scènes. |

Er mag per modus maar één toegankelijke inhoudsversie gemount zijn: één H1, unieke IDs, tien cases, vijf diensten en vier prijsformules. Onzichtbare lagen zijn niet focusbaar of aanklikbaar. Bij toetsenbordfocus op een actie moet die actie in de zichtzone staan; een verborgen/translerende tekstlaag mag focus niet laten verdwijnen.

De semantische navigatie kent ten minste: home, portfolio-intro, projectindex, dienstindex, kwaliteit, prijsindex, prijsdetails, About, FAQ en contact. Directe hashes, interne knoppen, reload en terug/vooruit landen op een bruikbaar leesmoment, niet midden in een masker. Wisselen tussen mobiel en desktop behoudt het dichtstbijzijnde inhoudsmoment.

## Prestaties en terugval

- WebGL alleen actief tijdens de portfolioscène; buiten beeld en bij verborgen tabblad pauzeren en bij unmount volledig opruimen.
- Mobiele texture-resolutie, renderresolutie en gelijktijdige resources afstemmen op meetbare prestaties. Behoud diepte, achtergrond en trail; optimaliseer kwaliteit vóór een effect te schrappen.
- Continue voortgang via MotionValues/GSAP of de engine, zonder React-render op ieder scrollframe. State alleen bij hoofdstuk- en itemwissels.
- Assets vooraf decoderen voor de eerstvolgende overgang; latere grote media niet allemaal ongecontroleerd tegelijk laden. Geen leeg beeld tijdens de overdracht.
- Bij WebGL-uitval: bereikbare beeldgebaseerde portfoliovervanging met dezelfde projectnavigatie. Rapporteer dat als terugval, niet als uitvoering van het 3D-effect.
- Bij reduced motion: volledige statische inhoud zonder zoom, parallax of rollende prijzen. Zonder JavaScript eveneens leesbare inhoud.
- Formulier en toetsenbord wijzigen de scènevoortgang niet. Menu of dialoog openen/sluiten herstelt dezelfde leespositie.

## Uitvoeringsvolgorde

1. **Referenties en effectenlijst vastleggen.** Desktopbeelden en scènemomenten als vaste baseline bewaren. Per effect ook ten minste één tussenstand vastleggen. De mobiele mozaïekuitzondering expliciet in de controlelijst zetten.
2. **Mobiele scrollbasis en het lastigste onderdeel.** Eerst portal → directe portfolio-overgang → volledig 3D-portfolio bouwen. Op 390 × 844 en 320 × 568 zowel vooruit/achteruit als snelle touchswipes controleren. Dit bewijst meteen camera, touch, trail en leespositie; geen verdere architectuur stapelen op een onbewezen basis.
3. **Diensten en kwaliteit.** Vijf visuele dienstwissels, detailframes, voortgang en overgang naar de donkere kwaliteitsscène. Lange inhoud en alle links controleren.
4. **Prijzen en voorwaarden.** Alle vier de formules, rollende glyphs en kleurwissels bouwen. Inhoudgestuurde leesfasen afstellen; aansluiten op volledige prijsdetails.
5. **About en navigatie.** Het echte diepteportret verticaal uitwerken; header, ankers, moduswissels en browsergeschiedenis afronden. Kleine mobiele effecten die nu conflicteren opruimen.
6. **Volledige visuele en functionele controle.** Eén doorlopende mobiele reis afstellen, prestaties meten en desktop vergelijken. Geen fase als voltooid beschouwen op basis van alleen een screenshot van de beginstand.

## Acceptatie

| Controle | Vereist resultaat |
| --- | --- |
| Effectendekking | Iedere desktopwerking uit de scènetabel heeft een werkend mobiel equivalent; alleen het mozaïek ontbreekt. |
| 320 × 568, 375 × 667, 390 × 844, 430 × 932 | Alle effecten, teksten, bedragen en acties bereikbaar; geen horizontale pagina-overflow of afgesneden bediening. |
| 768 × 1024, 820 × 1180 en lage landscape | Samenhangende verticale/tabletcompositie; stabiele rotatie en geen onbedoelde desktoproute. |
| Begin, 25%, 50%, 75% en einde van elke overgang | Geen overlappende leesbare tekstlagen, gaten, verdwenen links of vastzittende maskers. Ook opnames in beweging beoordelen. |
| Tien projecten, vijf diensten, vier prijzen | Iedere index via scroll én beschikbare bediening bereikbaar; teller, beeld, tekst en actieve stap blijven gelijklopen. |
| Vooruit, achteruit, snelle lange swipe, stoppen halverwege | Directe respons en correcte toestand. Tijdgestuurde engine-effecten zoals trail hoeven niet pixelidentiek terug te spelen, maar volgen de juiste richting en scène. |
| Lange dienst- en prijsteksten; grotere tekst | Volledige leesfase voordat een item wisselt; focus en acties blijven bereikbaar. |
| Alle hashes, interne acties, reload en terug/vooruit | Juiste zichtbare inhoud onder de header; geen dubbele IDs of verkeerde scène. |
| Menu, FAQ, prijsdetails, contactformulier en toetsenbord | Geen scrolllekken, onbedoelde hoofdstukwissels of verlies van leespositie. |
| Reduced motion, JavaScript uit en WebGL-uitval | Complete bruikbare inhoud met passende terugval. |
| Echt iOS Safari en Android Chrome | Touch, momentum, browserbalken, GPU-gedrag, rotatie en toetsenbord op toestel controleren. Chromium-emulatie afzonderlijk rapporteren. |
| Desktop 1440 × 900 en 1920 × 1080 | Baselinebeelden, scènemomenten, timing, navigatie en interacties gelijk. Dynamische WebGL-frames bij gelijkgezette klok/settle vergelijken en visueel beoordelen. |
| 999/1000 px en desktophoogte 649/650 px | Bestaande desktopselectie en lage fallback onveranderd; juiste leespositie bij wissel. |
| Technische controles | Passende mobiele/desktop-motioncontroles en productiebuild inclusief SEO- en regiocontroles slagen; geen nieuwe runtimefouten. |

Oplevering vereist een afgevinkte effectenlijst en bewijs van de volledige bewegende mobiele reis, plus een desktopvergelijking. Niet uitgevoerde fysieke toestelcontroles worden expliciet als open punt vermeld.
