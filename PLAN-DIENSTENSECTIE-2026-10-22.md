# Diensten als een levend werkvlak

Datum: 22 oktober 2026. Status: geïmplementeerd; laatste productiecontrole nog in uitvoering.

De oorspronkelijke voorsteltekst hieronder blijft behouden als ontwerphistorie. Het implementatierecord onderaan beschrijft de actuele uitvoering en de grenzen van de verificatie; formuleringen als ‘huidig’, ‘voorstel’ en ‘niet geïmplementeerd’ in die historische tekst slaan op de situatie vóór deze uitvoering.

Scope: de sectie ‘Wat wil je online mogelijk maken?’, inclusief de overdracht vanuit projecten en naar kwaliteit. De bestaande merkwereld, vijf diensten, inhoudelijke claims en bestemmingen zijn het uitgangspunt. Dit voorstel vervangt voor deze sectie de regie uit `PLAN-SCROLLCHOREOGRAFIE-2026-10-22.md`; de overige hoofdstukken vallen buiten deze wijziging.

## Doel

Een ondernemer moet begrijpen wat Kevin kan maken, een echt voorbeeld zien en rechtstreeks naar de relevante dienst of contact kunnen gaan. De sectie moet het niveau van de opening en projectengalerij voortzetten, met beweging die de inhoud verduidelijkt. De bezoeker bestuurt de ervaring met scrollen en kan ieder hoofdstuk ook direct kiezen.

## Wat nu het gevoel van vastlopen veroorzaakt

Bekeken: de aangeleverde screenshot, de lokale pagina op 1280×720, de werkintro en diensten in de browser, en de huidige componenten en scrollpartituur. Dit is een beoordeling van interactie en compositie, geen gemeten performanceprofiel.

- `PortfolioDepth.tsx` gebruikt voor diensten `itemPhase(..., .6)`: 0,60 schermhoogte stilstand en vervolgens 0,25 schermhoogte overgang. Circa 71% van een regulier dienstinterval geeft geen visuele scrollfeedback.
- De laatste dienst bereikt index 4 waarna de index tot het volgende hoofdstuk constant blijft. Ook die resterende afstand heeft momenteel geen eigen visueel verloop.
- `ServiceScene` gebruikt vooral crossfades en maximaal 12 px verplaatsing. De voorbeeldbeelden blijven in de embedded variant steeds op dezelfde hoek van −3°. Het voelt als één onveranderlijke kaart met verwisselde inhoud.
- Een kleine scroll vanaf de huidige `#werkwijze`-landing leverde in de browser een vrijwel identiek beeld op. De scrollbar verplaatste wel.
- Het grote gekleurde vlak, de lange projectkop en de screenshot concurreren om ruimte. De dienst zelf staat rechts tussen vier grijze accordeonregels.
- Plus- en mintekens suggereren een klikinteractie, terwijl scrollen achter de schermen de accordeon bedient. Het scherm communiceert daardoor onvoldoende wat de bezoeker met scrollen veroorzaakt.
- De opening gebruikt ruimtelijke beeldbeweging: rasterkolommen, schaal, een opening rond de titel en een overdracht naar projecten. De dienstensectie verliest die ruimtelijke logica.

## Gekozen richting

**Eén levend werkvlak met vijf hoofdstukken.** Het werkvoorbeeld is het visuele middelpunt. Een vaste tekstzone vertelt wat de actieve dienst betekent. Onderaan staat een compacte hoofdstuknavigatie met alle vijf diensten en doorlopende voortgang. De volledige compositie reageert op de scrollpositie; tekst blijft tijdens het lezen op zijn plaats.

De bestaande warme achtergrond, roestkleurige accenten, schreefloze diensttitels, expressieve serif en echte projecten blijven de visuele basis. Geen tweede projectencarrousel: projecten tonen wie de opdrachtgevers zijn; deze sectie toont wat voor toepassing bij de bezoeker past.

## Desktopcompositie

1. Bovenaan blijft ‘Wat wil je online mogelijk maken?’ als herkenbare sectietitel staan, compacter dan het actieve diensthoofdstuk.
2. Daaronder neemt het werkvoorbeeld ongeveer 58–62% van de breedte in. Het huidige kaartetiket en de grote projectzin verdwijnen uit de beeldhiërarchie; dezelfde projectinformatie krijgt een rustige caption. Er ontstaat meer ruimte voor het daadwerkelijke werk.
3. Rechts staat één actief verhaal: hoofdstuknummer `01 / 05`, grote diensttitel, de bestaande uitleg, twee kenmerken en de dienstlink. De buitenmaat blijft stabiel, ook bij de langere dashboardtekst.
4. Onderaan staan vijf benoemde hoofdstukknoppen, elk met een dunne voortgangslijn. De huidige dienst is duidelijk herkenbaar, afgeronde hoofdstukken blijven navigeerbaar. Lange labels mogen binnen hun eigen kolom twee regels gebruiken.
5. ‘Vertel over je project’ en de projectarchief-link blijven bereikbaar in een vaste onderste actierij. Die rij en de hoofdstuknavigatie krijgen aparte ruimte.

De rechter accordeon vervalt in deze desktopvariant. De vijf diensten blijven tegelijkertijd zichtbaar in de hoofdstuknavigatie. De dienstlink en de link naar de case hebben elk een heldere eigen bestemming; een decoratieve pijl zonder klikbestemming vervalt.

## De scrollervaring

### 1. Projecten geven hun beeldruimte door

Het laatste project blijft zichtbaar terwijl de nieuwe werkvlakcompositie aankomt. Het projectbeeld wordt optisch kleiner en schuift richting de toekomstige beeldzone; die zone neemt de ruimtelijke lijn over. De eerste dienstenpreview verschijnt binnen dat frame. Verschillende cases worden daarbij niet voorgesteld als één project: caption en beeld wisselen gezamenlijk.

De sectietitel wordt in zijn definitieve positie onthuld. Het eerste hoofdstuk en de navigatie staan klaar voordat de nieuwe scène volledig overneemt. Dit vervangt de huidige lege vlakovername als hoofdgebaar; voeg beide niet na elkaar toe.

### 2. Tijdens het lezen blijft scroll zichtbaar

De titel, uitleg en CTA blijven stilstaan. De voortgangslijn loopt direct met de scroll mee. Het voorbeeld krijgt een bescheiden maar herkenbare ontwikkeling, bijvoorbeeld een schaalverandering tot circa 3% of het naar voren komen van een echt detail. Geen autonome beweging wanneer de bezoeker stopt.

De voortgang moet vanaf de eerste pixels zichtbaar zijn. Gebruik hiervoor de ruwe lokale scrollafstand, niet de huidige scenewaarde die in het leesvenster constant blijft. De illustratieve beweging mag zachter verlopen; de voortgangsindicator mag geen lange vlakke curve krijgen.

### 3. Dienstwissel als ruimtelijke overdracht

Het volgende voorbeeld komt van onderen in hetzelfde werkvlak en neemt het oude met een gemaskeerde verticale beweging over. Richtwaarde voor de zichtbare reis: 12–18% van de beeldzone, af te stellen op het werkelijke formaat. Een bescheiden verandering in hoek en schaal versterkt de diepte. Hoogstens twee beeldlagen tegelijk.

De oude uitleg verdwijnt vóór de nieuwe leesbaar wordt. Diensttitel, nummer, caption, actieve navigatie en links delen hetzelfde omslagpunt. Tekst wisselt in een vaste zone en laat de layout niet mee in- en uitklappen. Achtergrondtinten blijven beperkt tot de beeldzone, zodat het hele scherm niet bij elke dienst verkleurt.

Bij terugscrollen volgt exact dezelfde route achteruit. Bij een snelle scroll staat meteen de juiste toestand op het scherm; er wordt geen wachtrij van animaties afgespeeld.

### 4. De vijf hoofdstukken krijgen een inhoudelijk accent

| Dienst | Werkelijk bewijs | Voorgestelde beeldontwikkeling |
| --- | --- | --- |
| Webdesign | COZY Moments | Een ruim desktopbeeld opent; een echte mobiele opname komt als kleiner voorgrondvlak bij. Dit maakt de bestaande belofte ‘mobiel en desktop’ zichtbaar. |
| Webshops | Daily Grind | Het overzicht geeft een echt productdetail meer aandacht binnen hetzelfde frame. Een tweede opname is alleen zinvol als die het bestaande winkelproces werkelijk toont. |
| Webapplicaties | PWAYMENT POS | Het scherm komt rechter te staan; een uitsnede van een relevante bestaande kassafunctie krijgt tijdelijk nadruk. De interface zelf levert het visuele detail. |
| Eigen dashboard | Hond aan Zee-dashboard | De beheerscreenshot staat centraal; een bijpassende opname van de publieke site verduidelijkt de relatie tussen beheren en tonen. Geen fictieve bewerking of niet-bestaande functie demonstreren. |
| Lokale vindbaarheid | Hond aan Zee | Een echte lokale pagina komt naar voren naast een compacte geografische verwijzing naar de kust. Gebruik echte locaties; laat het lokale voorbeeld de uitleg dragen. |

De gedeelde overgang blijft bij alle vijf hetzelfde. Per hoofdstuk maximaal één ondersteunend accent; geen vijf afzonderlijke shows. Begin met bestaande screenshots. Echte mobiele, product- of lokale detailopnamen die ontbreken zijn expliciet assetwerk in de uitvoeringsfase. Een desktopafbeelding smal afsnijden geldt niet als bewijs van een mobiele website. Geen verzonnen zoekposities, omzetcijfers of statistieken.

### 5. Het laatste hoofdstuk opent kwaliteit

De voortgang van dienst vijf blijft doorlopen tot de exit. Het beeldvlak wordt vlakker en geeft een horizontale rand door aan de bestaande horizonopening van ‘Mooi is de ondergrens.’ De hoofdstuknavigatie en uitleg maken samen plaats voor kwaliteit. De horizon is het hoofdgebaar; geen extra fade, krimp en gordijn daarbovenop.

## Scrollbudget voor het eerste prototype

V = de gemeten hoogte van het desktop-podium. Afstanden zijn startwaarden, geen afspeeltijden of al goedgekeurde eindwaarden.

| Fase | Budget |
| --- | ---: |
| Overdracht projecten → eerste dienst | 0,55 V |
| Vijf leesvensters met doorlopende beeld- en voortgangsfeedback | 5 × 0,36 V |
| Vier ruimtelijke dienstwissels | 4 × 0,25 V |
| Overdracht laatste dienst → kwaliteit | 0,50 V |
| Totaal inclusief beide overdrachten | 3,85 V |

Er is geen vijfde wissel naar een niet-bestaande dienst. De laatste dienst krijgt zijn eigen leesvenster en gaat daarna rechtstreeks naar kwaliteit. Reserveer de exit eenmaal: het begin van de kwaliteitsovergang valt binnen deze laatste 0,50 V. Langere leestijd is altijd mogelijk door te stoppen. De dashboardtekst moet volledig passen; pas eerst de compositie aan voordat het hele hoofdstuk extra scrollafstand krijgt.

## Bediening en varianten

- Elke hoofdstukknop navigeert naar een benoemd leesmoment. Nieuwe scrollinvoer kan de navigatie direct overnemen. Geen verplicht snapping of afvangen van wheel-events.
- Focus op een knop mag niet vanzelf door de pagina scrollen; activeer de hoofdstukkeuze met klik, Enter of spatie. Geef de actieve knop semantisch de huidige toestand mee. Geen live-aankondiging op iedere scrollpixel.
- Alleen de zichtbare dienstlinks zijn focusbaar. De actieve toestand moet passen bij wat werkelijk leesbaar is tijdens een wissel. Het werkvoorbeeld krijgt een nuttige toegankelijke beschrijving als het inhoudelijk bewijs draagt.
- Mobiel gebruikt gewone verticale hoofdstukken met beeld en uitleg bij elkaar. Hoogstens een korte lokale beeldonthulling, zonder meerdere schermen sticky scrollafstand. Behoud de bestaande mobiele ervaring erboven.
- Lage desktopvensters en reduced motion krijgen een normale leesbare documentweergave van dezelfde inhoud, zonder perspectief, lang vastzetten of verborgen diensten.

## Uitvoeringsvolgorde

1. Bouw een geïsoleerd prototype van alleen webdesign → webshop met de nieuwe compositie, hoofdstuknavigatie, continue voortgang en één gedeelde wissel. Beoordeel direct scrollen en omkeren voordat de vijf hoofdstukken worden uitgewerkt.
2. Leg dienstspecifieke timing en benoemde leesmomenten centraal vast in `utils/homeChoreography.ts`. Bewaar naast de overgangswaarde ook de voortgang binnen een leesvenster. De bestaande generieke `itemPhase` mag voor prijzen blijven bestaan.
3. Werk de dienstenweergave uit in `ProblemSolution.tsx` en de bijbehorende CSS, eventueel met een apart desktopcomponent wanneer dat de mobiele variant overzichtelijker houdt. Hergebruik de bestaande inhoudsdata.
4. Sluit de twee overdrachten aan in `PortfolioDepth.tsx`. Laat alle grenzen na diensten cumulatief uit de nieuwe score volgen. Behoud de bestaande scrollcontroller; voeg geen tweede scrollengine toe.
5. Vervang verspreide dienstberekeningen zoals `.85`, `.6` en `+.3` in navigatie en `preserveHomeReadingPosition.ts` door de benoemde momenten. Directe hashlanding, resize en de overgang naar mobiel moeten bij dezelfde dienst uitkomen.
6. Controleer welke detailassets daadwerkelijk bestaan en maak alleen de ontbrekende echte opnamen. Decodeer het volgende beeld vooraf; houd alleen huidige en volgende beeldlagen actief.
7. Pas de bestaande motionchecks gericht aan. Hun eis dat de volledige dienstscène tijdens lezen constant is, botst bewust met dit voorstel. Test voortaan stabiele tekst plus doorlopende beeldvoortgang, correcte laatste exit, omkeerbaarheid en consistente navigatie.

## Wanneer het geslaagd is

- Een kleine scroll levert onmiddellijk zichtbare voortgang op. Geen lang interval waarin het hele beeld identiek blijft.
- Bij stoppen staat alles direct stil en blijven uitleg en CTA leesbaar en bruikbaar.
- De vijf diensten voelen als hoofdstukken binnen dezelfde wereld. Het werkvoorbeeld vertelt meer dan alleen de projectnaam.
- Vooruit, achteruit en snel door meerdere hoofdstukken geeft steeds één begrijpelijke actieve toestand. Geen dubbele leesbare tekst, leeg podium of onverwacht opnieuw startende animatie.
- Alle vijf diensten en hun links werken met muis, toetsenbord en directe navigatie. Een toetsenbordgebruiker wordt niet door focus alleen naar een andere scène gestuurd.
- Visuele review op 1440×900, 1280×720, 1000×650, een breed scherm en mobiel; onderbreek wissels op 25%, 50% en 75%. Controleer ook reduced motion en formaatwissels midden in een hoofdstuk.
- Meet de uiteindelijke uitvoering op layoutwerk, paintkosten en frame-uitval. Vooral de huidige geanimeerde paneelhoogtes verdienen vervanging door een vaste tekstzone. Een mooie choreografie alleen bewijst nog geen soepele rendering.

Geen UI-code gewijzigd voor dit voorstel. De exacte uitsneden, bewegingsuitslagen en het definitieve scrollbudget moeten in het eerste interactieve prototype worden beoordeeld.


## Implementatierecord — 22 oktober 2026

### Gerealiseerde ervaring

De desktopdiensten gebruiken nu `components/ServiceWorkbench.tsx` en `components/ServiceWorkbench.module.css`: één werkvlak met een vaste tekstzone, vijf rechtstreeks te kiezen hoofdstukken en echte voorbeelden. Tijdens een leesvenster blijven titel, uitleg en dienstlink op hun plaats; beeldschaal, hoek, detail en hoofdstuklijn volgen de scrollafstand. De gedeelde wissel gebruikt een verticale maskering en 16% beeldverplaatsing. De uitgaande tekst verdwijnt vóór de inkomende leesbaar wordt. Actieve inhoud, links en `aria-current="step"` volgen hetzelfde hoofdstuk; inactieve tekst en voorbeelden zijn `inert` en verborgen voor hulptechnologie. Tabfocus kiest geen nieuw hoofdstuk; knoppen activeren via de normale klik-/toetsenbordbediening.

`utils/homeChoreography.ts` legt de gerealiseerde afstand vast: entree 0,55 V, vijf leesvensters van 0,36 V, vier wissels van 0,25 V en exit 0,50 V, samen 3,85 V. De exit valt samen met het begin van kwaliteit. `PortfolioDepth.tsx` verbindt de scènes en de actierij; `DepthShowcase.tsx` laat het projectbeeld bij vertrek kleiner worden en naar de dienstenbeeldzone bewegen. Dit is een compositieoverdracht tussen verschillende voorbeelden, geen identiteitstransformatie van één case.

Benoemde momenten (`serviceStart`, `serviceReadMoment`, `serviceDuration`) sturen hoofdstukkeuze, `#werkwijze`, scoregrenzen en leespositie. `utils/useHomeScroll.ts` bewaart het desktopmoment bij hoogtewijzigingen; `utils/preserveHomeReadingPosition.ts` bewaart de semantische plek bij wisselen tussen desktop, mobiel en statisch. De bestaande scrollcontroller blijft de enige aandrijving.

De geanimeerde variant geldt vanaf 1000 px breed én 650 px hoog, alleen zonder voorkeur voor verminderde beweging. `components/ProblemSolution.tsx` en de bijbehorende CSS tonen daarbuiten alle vijf hoofdstukken volledig in de documentstroom, met eigen beelden, uitleg en links. Op mobiel is deze dienstensectie volledig statisch; de mobiele opening erboven behoudt haar bestaande uitvoering. De statische variant hergebruikt dezelfde dienstengegevens uit `data/capabilities.ts` en dezelfde voorbeeldregistratie.

### Vergelijking met de bestaande visuele wereld

De uitvoering verlengt de bestaande compositie: een ruim werkbeeld, donkere tekst, warme achtergrond en roestaccenten, met DM Serif Display voor de expressieve nadruk en captions. De diensten-CSS gebruikt dezelfde warme overdrachtsachtergrond (`#eae7df`) als `PortfolioDepth.module.css`, met tekst (`#222820`) en accent (`#a84029`) uit de dienstensectie. Schreefloze diensttitels blijven dominant; de serif ondersteunt sectietitel en beeldcaption. Vijf gedempte beeldtinten begrenzen het kleurverschil tot de voorbeeldzone.

Dit is een lokale voortzetting van de merkwereld. Het projecteert niet de bewust afwijkende monospace/uppercase projectmetadata van `DepthShowcase.module.css` op de diensten. De visuele vergelijking berust op de geïnspecteerde componenten en de vier beoordeelde rustbeelden hieronder; er zijn geen nieuwe projectbrede merkregels, productclaims of ontwerpbestanden vastgesteld.

### Beelden en herkomst

| Dienst | Gebruikte bestanden in `public/images/` | Herkomst en betekenis |
| --- | --- | --- |
| Webdesign | `cases/cozy.png`, `services/cozy-mobile.webp` | Bestaande desktopcase; echte mobiele homepageopname van `https://www.cozy-moments.be/`, vastgelegd op 22 oktober 2026. |
| Webshops | `cases/dailygrind.png`, `services/dailygrind-products.webp` | Bestaande desktopcase; echte assortimentopname van `https://www.daily-grind.be/#products`, vastgelegd op 22 oktober 2026. Dit toont een productoverzicht, geen afzonderlijke checkoutdemonstratie. |
| Webapplicaties | `services/pwayment-pos.jpg` | Bestaand openbaar productscreenshot van `https://pwayment.vercel.app/website/pwayment-pos-current.jpg`, ook gebruikt door `pwayment.tsx`; bevat demodata. |
| Eigen dashboard | `cases/hondaanzee-dashboard.jpg`, `cases/previews/hondaanzee.jpg` | Bestaande beheerscreenshot en bestaande publieke websitepreview uit het project. |
| Lokale vindbaarheid | `cases/hondaanzee.png`, `services/hondaanzee-de-haan.webp` | Bestaande desktopcase; echte lokale pagina van `https://hondaanzee.be/de-haan`, vastgelegd op 22 oktober 2026. Een momentopname, geen actuele strandinformatie of bewijs van een zoekpositie. |

De vier bestanden onder `services/` hebben naastliggende `.json`-herkomstbestanden. De actuele en aangrenzende voorbeelden krijgen hun `src` en worden vooraf gedecodeerd; zichtbaarheid en maskering beperken het zichtbare werkvlak tijdens een wissel. Dit is geen garantie dat slechts twee afbeeldingen in geheugen blijven. De statische variant kiest het assortimentbeeld voor webshop en de lokale pagina voor vindbaarheid; ze toont geen bewegende detailstapeling.

### Verificatie en resterende grenzen

- De mechanische detector gaf `[]`; motion-eigenschapscontroles en TypeScript slaagden. Eén volledige productie-/SSR-build met SEO- en regiocontroles slaagde vóór de laatste kleine responsive- en overdrachtsaanpassingen. De definitieve herhaling is bij deze registratie nog in uitvoering en wordt hier niet als geslaagd voorgesteld.
- Een onafhankelijke reviewer beoordeelde vier geldige rustbeelden als ‘ship’ op de vastgelegde toestanden: `.impeccable/review/services-1440-webdesign.png`, `services-1280-webshop.png`, `services-1000-dashboard.png` en `services-390-mobile.png`. Dit dekt deze rusttoestanden; het bewijst geen volledige review van iedere tussenfase of een extra breed scherm.
- De runtimecontrole bevestigde alle vijf desktophoofdstukactivaties, Tab zonder automatische hoofdstuknavigatie, vooruit/achteruit tussen diensten en kwaliteit, vijf zichtbare hoofdstukken zonder horizontale overflow op 390 px en behoud van het actieve hoofdstuk bij een native desktopresize.
- `.impeccable/review/services-scroll-check.json` registreert een echte kleine scroll van 14652 naar 14803 px: de teksttransform bleef `none`, de beeldmatrix veranderde en de hoofdstuklijn liep van circa 0,295 naar 0,570. Dit onderbouwt stabiele tekst met zichtbare beeld-/voortgangsfeedback in die gemeten toestand.
- Er is geen gemeten frameprofiel uitgevoerd. Soepele rendering, paintkosten en frame-uitval zijn daarmee niet kwantitatief bewezen. Er is evenmin OS-emulatie van reduced motion uitgevoerd: de leesbare reduced-motionvariant is bevestigd via de gedeelde statische tak en mediaquery in de code. De lage-hoogtevariant gebruikt diezelfde tak; de runtimecontrole daarvan is bij deze registratie nog in uitvoering.
