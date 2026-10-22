# Scrollchoreografie homepage

Datum: 22 oktober 2026. Scope: de volledige vastgezette desktop-homepage, van hero tot de vrijgave na prijzen. De hieronder beschreven desktopchoreografie is inmiddels geïmplementeerd.

## Implementatie en controle

- Gedeelde scrollpartituur in `utils/homeChoreography.ts`, met rustige leesvensters en dezelfde overgangsafstand voor projecten, diensten en prijzen.
- Symmetrische curves met nul snelheid en nul versnelling bij de grenzen. De native scroll blijft behouden; geen wheel-capture, scrollveer, muisparallax of snelheidsgestuurde drift.
- Projectbeelden, teksten en navigatie delen dezelfde voortgang. De projectlijnen geven ook tijdens het leesvenster subtiele voortgangsfeedback.
- Rustige hoofdstukovergangen, samenhangende dienstpanelen, één kwaliteitstitel en één papierovergang naar prijzen.
- Visueel gecontroleerd op 1440×900 en 1280×720. Op de minimale desktopvariant van 1000×650 zijn prijzen en terugscrollen naar kwaliteit en diensten bekeken via de native browserbediening; de browserconnector gaf bij die formaatwissel time-outs.
- `npm run check:home-motion` controleert leesvensters, gelijke overgangsafstanden, continuïteit aan de grenzen, omkeerbaarheid, tekstoverlap en navigatieberekeningen. Productiebuild, SEO- en regiocontroles slagen.
- Er is geen betrouwbare frameprofielmeting uitgevoerd; de beschikbare browserinspectie ondersteunt daarvoor geen `requestAnimationFrame`. De controles onderbouwen de choreografie en compositie, geen gegarandeerde framerate op elk apparaat.

De mobiele uitwerking is tijdens deze implementatie ook door ander werk in de gedeelde workspace uitgebreid. Die wijzigingen zijn behouden en maken geen deel uit van de desktopregie hieronder.

## Regie

**Eén doorlopend verhaal met een herkenbare cadans: aankomen → lezen → doorgeven.**

De bezoeker bestuurt de voortgang. Stilhouden geeft een stilstaand, leesbaar beeld. Terugscrollen speelt exact dezelfde beweging achteruit. Binnen een hoofdstuk blijft het decor rustig; de grote gebaren horen bij de overgang naar een volgend hoofdstuk.

De bestaande identiteit, inhoud en volgorde blijven behouden: hero, werkintro, tien projecten, vijf diensten, kwaliteit, vier aanbiedingen, prijsvoorwaarden. De projecten zijn het belangrijkste visuele moment. Kwaliteit en prijzen krijgen een gerichte overgang, zonder een tweede of derde concurrerende openingsshow.

## Diagnose van de bestaande code

Gebaseerd op `PortfolioDepth.tsx`, `Hero.tsx`, `ProblemSolution.tsx`, `Quality.tsx`, `Offer.tsx` en de bijbehorende CSS. De mobiele hero is in de browser bekeken. De vastgezette desktopsequentie moet bij implementatie nog visueel worden beoordeeld; onderstaande oorzaken komen uit de code, niet uit een gemeten desktop-performanceprofiel.

- **Verschillende ritmes.** Projecten en diensten gebruiken circa 0,75 viewport scrollafstand per indexstap; prijzen gebruiken circa 1,24 viewport. Gelijke input levert daardoor verschillende voortgang op.
- **Projecten hebben geen echte rustfase.** De dieptevlakken bewegen continu tussen de projectindices. De bezoeker moet de scroll exact op een index stilzetten om een project op zijn bedoelde positie te zien.
- **Beeld en tekst wisselen op verschillende momenten.** Projecttekst verspringt via `Math.round`, met daarna een tijdgestuurde animatie van 300 ms. Diensten wisselen via `Math.floor(value + .35)`; hun beelden gebruiken weer afzonderlijke opacityvensters. Dat kan tegelijk bewegende of onvolledig zichtbare scènes opleveren.
- **Bewegingen stapelen.** De projecten combineren perspectief, verplaatsing, rotatie, muisreactie en een snelheidsgestuurde veer. Die laatste kan nog bewegen nadat de scroll stopt.
- **Overgangen hebben erg korte schakelpunten.** Onder meer `.62 → .63`, `.70 → .76` en `.74 → .75` regelen zichtbaarheid en dekking. Die leveren weinig marge bij snelle invoer en zijn kwetsbaar voor een zichtbare knik.
- **Verschillende regiestijlen volgen elkaar op.** Uitwaaierend raster, dieptecarrousel, diagonale overname, herschikkende dienstentitel, gesneden kwaliteitstitel en prijsbladen vragen elk apart aandacht.
- **Navigatie rekent apart.** Ankers, pijlen en prijsselecties gebruiken verspreide offsets. Zo wijzen prijsanker en `goToPrice(0)` bijvoorbeeld naar verschillende momenten. De generieke headercorrectie houdt ook geen rekening met een intern tijdstip in een sticky scène.

Er is al één bovenliggende `sequenceTime`. Die blijft de basis; de verbetering is een expliciete gezamenlijke partituur en uniforme lokale voortgang, geen tweede scrollengine.

## Scrollpartituur

Een viewport (V) betekent hier de zichtbare hoogte van het vastgezette podium. Afstanden zijn startwaarden voor de eerste afstelling, geen claim dat ze zonder desktopreview perfect zijn. De gebruiker bepaalt de werkelijke snelheid; dit zijn scrollafstanden, geen afspeeltijden.

| Onderdeel | Budget | Choreografie |
| --- | ---: | --- |
| Hero → werk | 0,75 V | Eerst vertrek van tekst, daarna overname door het raster; beeld blijft de verbindende laag. |
| Werkintro | 1,00 V | Raster opent, titel krijgt een leesmoment, eerste project komt naar voren. |
| Projecten | 10 × 0,75 V | Per project 0,50 V stabiele compositie en 0,25 V doorgeven. |
| Werk → diensten | 0,75 V | Eén vlak neemt over; titel landt en het eerste dienstbeeld staat klaar. |
| Diensten | 5 × 0,85 V | Per dienst 0,60 V leestijd en dezelfde 0,25 V wissel. |
| Kwaliteit | 2,25 V | 0,50 V openen, 0,35 V zetten, 0,90 V lezen, 0,25 V slotzin onthullen, 0,25 V slotzin lezen. |
| Kwaliteit → prijzen | 0,75 V | Eén rustige overname naar papier; eerste aanbod volledig positioneren. |
| Prijzen | 4 × 1,25 V | Per aanbod 1,00 V stabiel lezen en dezelfde 0,25 V wissel. |
| Vrijgave | 0,50 V | Laatste prijs staat stil terwijl de voorwaarden vanuit de normale documentstroom overnemen. |

Totaal: **22,75 V effectieve scrollafstand**, plus de podiumhoogte in het document. Huidige berekende effectieve afstand: ongeveer 23,96 V bij tien projecten. Het doel is vooral meer bruikbare leestijd binnen ongeveer dezelfde lengte.

De laatste doorgeeffase van projecten en diensten bereidt de hoofdstukovergang voor; ze mag die overgang niet nog eens volledig uitvoeren. Bij prijzen bereidt ze de vrijgave voor. Binnenkomst van het eerste item zit in de voorafgaande hoofdstukovergang. Zo worden entrees en exits niet dubbel geboekt.

## Regie per scène

### Hero en werkintro

Laat de hero direct leesbaar zijn; laadanimatie mag een vroege scroll niet tegenwerken. Bij scrollen vertrekt de tekst maximaal ongeveer 48 px. Het kustbeeld draagt de overgang naar het raster met hoogstens een kleine schaalverandering.

Het raster opent één keer. De werkintro krijgt een eigen stil leesvenster. Daarna verlaat de titel het midden en neemt het eerste project de aandacht over. Geen drie tegelijk leesbare tekstlagen. Het eerste project landt op exact dezelfde positie als alle volgende projecten.

### Projecten

Tijdens de eerste twee derde van elk projectbudget zijn afbeelding, titel, beschrijving, kleur en teller stabiel. De laatste derde geeft door aan het volgende project.

Behoud het dieptegevoel, maar beperk de reis: als startwaarden maximaal circa 8% horizontaal, 4% verticaal en 2° rotatie bij de zichtbare wissel. Stem Z-verplaatsing en schaal op perspectief af zodat het beeld niet plots naar de bezoeker versnelt. Beide wisselrichtingen krijgen een vergelijkbare zichtbare reisafstand. Toon hoogstens het actieve project en één ondersteunend volgend vlak; verberg de rest.

Laat de oude tekst eerst verdwijnen en de nieuwe daarna verschijnen binnen hetzelfde scrollvenster. Titel, beeld, teller, achtergrondkleur en actieve link delen één omslagpunt. De teller verandert eenmaal per grens; hij kondigt niet voortijdig een volgende case aan. Verwijder de scrollsnelheidsgestuurde drift uit deze reeks. Houd muisparallax buiten de scrollchoreografie en beperk ze tot een stil leesvenster.

### Diensten

Behoud één overnemend vlak, maar maak zijn beweging rustiger. Laat de titel op zijn definitieve plaats onthullen; schrap het naast-elkaar schuiven en daarna optillen van de twee regels. Dat voegt nu een extra beweging toe voordat de inhoud begint.

Alle vijf diensten gebruiken hetzelfde lees- en wisselvenster. De actieve dienstregel, het tekstpaneel en het voorbeeldbeeld veranderen samen. Houd een stabiele buitenmaat voor het werkvlak zodat wisselende tekstlengte de compositie niet laat springen. Geen hovergestuurde wissel in de vastgezette variant.

### Kwaliteit

De horizonopening blijft het herkenbare gebaar. De titel verschijnt als één geheel, landt en blijft staan; de vijf tegengesteld bewegende titelstroken vervallen in deze voorgestelde choreografie.

Toon de principes als samenhangend leesblok met hoogstens een korte gezamenlijke onthulling. Laat ze volledig leesbaar voordat het blok plaatsmaakt voor de slotzin. Gebruik voor die slotzin dezelfde 0,25 V wissel als elders. De titel blijft het visuele anker.

### Prijzen en vrijgave

De overgang naar papier sluit aan op de horizontale horizonbeweging. Laat de vijf tegengestelde bladen vervallen: één oppervlak is voldoende.

Alle vier aanbiedingen krijgen dezelfde wisselafstand als projecten en diensten, met meer stabiele scrollafstand voor de langere inhoud. Laat de bestaande prijsbedragen intact; eventuele beperkte rolbeweging blijft binnen het wisselvenster. Prijs, titel, voorwaarden en knop zijn tegelijk stabiel en bruikbaar tijdens het leesvenster.

Kleur en redactionele kop veranderen uitsluitend bij de relevante aanbodwissel. Aan het einde blijft de laatste aanbieding staan. Het sticky podium wordt vervolgens door de normale documentstroom omhoog meegenomen; geen extra verdwijnanimatie boven op die beweging.

## Gedeelde bewegingsregels

1. **Scroll is de klok.** Geen tijdgestuurde tekstentrees, timers of springs voor scènewissels. Behoud tijdgestuurde feedback alleen voor losse bediening en de initiële laadentree.
2. **Eén gedeelde curve per wissel.** Begin met een zachte symmetrische `smootherstep` binnen het 0,25 V venster. Ze heeft rustige uiteinden en speelt bij omgekeerde scroll exact terug. Binnen het leesvenster is de scenewaarde constant.
3. **Geen filter op de volledige scroll.** Behoud native scroll en momentum. Geen wheel-capture, verplicht snapping of lange smooth-scroll-naloop.
4. **Geen concurrerende hoofdgebaren.** In elke overgang draagt één beweging het verhaal. Tekst ondersteunt; schaal, perspectief en maskers krijgen geen afzonderlijke ritmes.
5. **Visueel en interactief delen dezelfde toestand.** Alleen de daadwerkelijk actieve inhoud is focusbaar. Aria, inert en zichtbaarheid volgen dezelfde scènegrenzen. Voorkom autofocus en live-aankondigingen van elke tussenwaarde.
6. **Stoppen is stoppen.** Na het stoppen van scrollinvoer eindigt ook de scrollgestuurde beweging. Afzonderlijke muisfeedback mag geen onrust in het leesbeeld veroorzaken.

## Technische uitvoering

- Leg de partituur vast in een gedeelde module, bijvoorbeeld `utils/homeChoreography.ts`: hoofdstukken, itemaantallen, leesafstanden, wisselafstanden en benoemde ankerpunten. Leid grenzen cumulatief af; geen reeks opnieuw handmatig opgetelde offsets.
- Meet het daadwerkelijke podium en de effectieve scrollafstand. Gebruik één conversie van documentpositie naar voortgang en dezelfde inverse conversie voor navigatie. Meng `svh`, `innerHeight` en vaste 75-factoren niet als verschillende waarheden.
- Leid per item één lokale scenewaarde af met expliciete lees- en wisselvensters. Laat beeld, tekst, kleuren en activatie daarvan afhangen. Vermijd state-remounts met een eigen animatieklok.
- Laat pijlen en tabs landen in het midden van het leesvenster. Laat `#resultaten`, `#projecten`, `#werkwijze` en `#prijzen` naar benoemde, volledig leesbare momenten verwijzen. Sticky tijdlijnankers krijgen geen generieke extra headeraftrek.
- Pas achtereenvolgens `PortfolioDepth`, `ProblemSolution`, `Quality`, `Offer` en de ankerhelper aan. Verwijder daarna de achterhaalde offsets en de snelheidsgestuurde drift.
- Behoud de huidige gewone documentweergave voor mobiel, lage vensters en reduced motion. Centraliseer de voorwaarde voor de desktopvariant zodat portfolio, kwaliteit en prijzen altijd samen omschakelen.
- Beperk actieve animatielagen en media. Pauzeer video buiten beeld en bij een verborgen tab. Gebruik `will-change` alleen waar nodig. Meet maskers en kleuren apart; ga niet ervan uit dat die even goedkoop zijn als transforms.

## Review en acceptatie

De eerste implementatie is gereed voor afstelling wanneer één projectwissel en één dienstwissel aantoonbaar hetzelfde ritme hebben. Pas daarna volgen de hoofdstukovergangen, kwaliteit en prijzen. Zo is de basis voelbaar voordat alle scènes erop worden aangesloten.

- Beoordeel desktop op 1440×900, 1280×720 en rond de activatiegrenzen van 1000 px breed en 650 px hoog. Controleer daarnaast een breed desktopvenster, mobiel en reduced motion.
- Scroll langzaam met een trackpad, met muiswielstappen, snel over meerdere scènes, achteruit en met toetsenbord. Onderbreek elke overgang op 25%, 50% en 75%.
- Bij gelijke gesimuleerde scrollsnelheid nemen alle reguliere itemwissels dezelfde afstand in. Tijdens elk leesvenster blijven de bedoelde animatiewaarden constant.
- Controleer op elk frame van een hoofdstukovergang dat het podium gedekt blijft. Geen onbedoeld gat, dubbele leesbare tekst of plots volledig opduikende achtergrond.
- Controleer dat beeld, kop, teller en interactieve case overeenkomen. Alle tien projecten, vijf diensten en vier aanbiedingen blijven bereikbaar.
- Controleer CTA’s, overslaan, directe hashlanding, terugnavigatie, resize, focus en tabvolgorde. Navigatie komt op een leesbaar eindbeeld uit en nieuwe scrollinvoer kan een navigatiebeweging onderbreken.
- Maak een performance-opname op een representatief apparaat: zoek naar layoutwerk per frame, dure maskers, dropped frames en onnodige React-renders. Claim pas daarna dat het ook technisch soepel draait.
- Speel een opname vertraagd af om knikken en ongewenste overlap te vinden. De definitieve waarden volgen uit die review; de partituur hierboven geeft het gezamenlijke uitgangspunt.

## Afbakening

Dit plan verandert geen teksten, projectvolgorde, prijzen of inhoudelijke claims. De al aanwezige lokale wijziging van de werkintro in `PortfolioDepth.tsx` blijft intact. De scrollende video's binnen projectbeelden vallen buiten deze opdracht.
