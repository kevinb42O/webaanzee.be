# Plan: Velvet en Sunline op Webaanzee

Datum: 18 november 2026. Status: lokaal geïmplementeerd op verzoek van de gebruiker, met de nieuwe Velvet-UI en de goedgekeurde Sunline-beelden. Publicatie is nog niet uitgevoerd.

## Doel en uitgangspunt

Velvet en Sunline laten zien welke software Kevin naast zijn klantwerk ontwikkelt. De bezoeker moet begrijpen wat de projecten doen, wat Kevin eraan bouwt en waarom dat technisch en ontwerpinhoudelijk interessant is. Het bestaande aanbod van Webaanzee blijft de primaire route naar een aanvraag.

De doelgroep blijft de potentiële opdrachtgever van Webaanzee. Technisch geïnteresseerde bezoekers krijgen onderaan de projectpagina's meer detail. De bestaande vormgeving is leidend: warm gebroken wit, donkere tekst, koraal als accent, Inter en DM Mono. De screenshots dragen de eigen identiteit van beide projecten.

Dit plan gebruikt bestaande beelden. Er zijn geen apps, games of ontwikkelservers gestart. Een inventaris bevatte 7.855 afbeeldingen bij LINES/Velvet en 1.058 bij vampire-survivors-2026, inclusief assets en duplicaten. Recente kandidaten en gerichte aanvullende reeksen zijn via contactbladen bekeken; de uiteindelijke selectie is ook op volledige grootte beoordeeld.

De gebruiker heeft vervolgens zes actuele Velvet-screenshots aangeleverd en de Sunline-selectie expliciet goedgekeurd. De nieuwe Velvet-bijlagen vervangen alle vier eerder gekozen Velvet-opnames. Alle aangeleverde beelden en de goedgekeurde Sunline-bronnen zijn ongewijzigd bewaard onder `design-experiments/eigen-projecten/sources/`.

## 1. Plaats op de website

Voeg op de homepage een compacte sectie **Eigen projecten** toe, na Over mij en voor de FAQ. De huidige React-volgorde in App.tsx wordt daarmee Proof → Quality → Offer → About → Eigen projecten → FAQ → ContactFooter.

De sectie bevat na uitbreiding met het kassasysteem drie ruime projectpresentaties: **PWAYMENT POS → Velvet → Sunline**. PWAYMENT toont een verse opname van de huidige RETAIL-code en linkt naar de bestaande productpagina `/pwayment.html`; het krijgt het label **Eigen softwareproduct · Retailplatform**. Velvet en Sunline behouden het label **Eigen project · In ontwikkeling** en hun eigen detailpagina's. Op desktop wisselen beeld en tekst van kant. Op mobiel volgen titel, beeld, tekst en link een vaste leesvolgorde.

Maak twee aparte detailpagina's:

- `/eigen-projecten/velvet/`
- `/eigen-projecten/sunline/`

Voor twee projecten is een aparte indexpagina niet nodig. De footerlink **Eigen projecten** verwijst naar `/#eigen-projecten`. Op elke detailpagina staan links terug naar de homepage, naar het andere eigen project en naar het contactgedeelte. Gebruik een gewone paginalink, zodat elk project deelbaar en vindbaar is.

De bestaande cases blijven in hun huidige overzicht, inclusief de PWAYMENT-case. De eigen-projectensectie krijgt haar eigen presentatiegegevens. Voor PWAYMENT wordt geen derde detailpagina aangemaakt: de bestaande productpagina blijft de bestemming.

## 2. Tekst voor de homepage

### Introductie

**Eigen projecten**

**Wat ik daarnaast bouw.**

Naast websites ontwikkel ik een eigen DAW en een multiplayergame. Velvet brengt compositie, synthese en mixing samen. Sunline combineert 3D-rendering, realtime netwerken en een bewerkbare spelwereld.

### Velvet

**Velvet**

**Een complete DAW voor compositie, sounddesign en mixing.**

Velvet is een Digital Audio Workstation met eigen synthesizers, een sampler, mixer, effecten en automation. Van expressieve noten en ritmepatterns tot volledige arrangementen, met ondersteuning voor VST3-plug-ins en MIDI/MPE.

Eigen project · In ontwikkeling

Link: **Bekijk Velvet →**

### Sunline

**Sunline**

**Een 3D-wereld met een eigen multiplayerarchitectuur.**

Sunline is een multiplayergame in de browser. Ik ontwikkel de netwerktechniek, simulatie en 3D-interactie: van gesynchroniseerde spelers en voertuigen tot terreinbewerking, bouwen en het bewaren van de gedeelde wereld.

Eigen project · In ontwikkeling

Link: **Bekijk Sunline →**

De teksten zijn conceptcopy. Geen gebruikersaantallen, prestatiegaranties, releasebeloftes of commerciële resultaten toevoegen zonder bewijs.

## 3. Velvet: opbouw van de projectpagina

1. **Opening.** Label Eigen project · In ontwikkeling, H1 Velvet, korte introductie en een groot arrangementsoverzicht. Maak onmiddellijk duidelijk dat dit native desktopsoftware is. Gebruik Velvet als publieksnaam; LINES is de lokale mapnaam.
2. **Het idee.** Muzikale noten en hun expressie visueel kunnen bewerken en vervolgens combineren tot een arrangement. Licht toe hoe getekende toonhoogte, instrument en arrangement samenhangen.
3. **Patterns en ritme.** Gebruik aangeleverd beeld 3 met ritmestappen en instrumentlijnen. Leg uit hoe een pattern verschillende instrumenten combineert. Dit is een patternoverzicht; benoem het niet als piano roll. Voor dit onderdeel vervalt de oudere piano-roll-opname.
4. **Een eigen instrumentomgeving.** Gebruik aangeleverd beeld 4 van de nieuwe Serein-interface met wavetablevisualisaties en modulatiebediening. Benoem Serein expliciet als de ingebouwde synth binnen Velvet, zodat het niet als een tweede los project overkomt.
5. **Effecten vormgeven.** Copperhead als concreet detail van de effectomgeving. Toon het volledige paneel leesbaar en leg in gewone taal uit welke klankbewerkingen het samenbrengt.
6. **Mijn bijdrage en techniek.** Beknopte uitleg over interfaceontwikkeling, audiogedrag en projectopslag. Techniek: C++17, JUCE en CMake; MIDI en VST3 waar relevant. Onderscheid eigen code en productkeuzes van gebruikte frameworks, plug-ins en externe assets. Publiceer geen algemene claim dat ieder onderdeel zelf is gemaakt.
7. **Ontwikkelstatus en contact.** Een helder feitelijk slot: persoonlijk softwareproject in ontwikkeling. Link **Bespreek je software-idee** naar `/#contact`. Een downloadknop vereist een bewust gekozen distributiebestand en komt niet in deze eerste versie.

Vier inhoudelijke screenshots: aangeleverd beeld 1 (arrangement en automation), beeld 3 (patterns), beeld 4 (Serein) en beeld 6 (Copperhead). Beeld 2 (About) en beeld 5 (mixer) zijn bewaarde reserves. Het About-venster toont versie 0.6.0; neem die versie niet automatisch als blijvende tekstclaim over. Het mixerbeeld herhaalt een deel van het arrangement en heeft een zichtbare CLIP-indicator; gebruik het niet als openingsbeeld.

## 4. Sunline: opbouw van de projectpagina

1. **Opening.** Label Eigen project · In ontwikkeling, H1 Sunline, expliciete positionering als 3D-browsergame met een eigen multiplayerarchitectuur. Het brede pieroverzicht blijft het hoofdbeeld.
2. **Architectuur.** Eén gedeelde simulatie met een autoritatieve host en WebRTC-verbindingen. Leg concreet uit hoe terreinwijzigingen, constructies en voertuigen daarin samenkomen.
3. **Voertuigen.** Het bootbeeld ondersteunt uitleg over besturing, bewegingssimulatie, interpolatie en passagiers op bewegende voertuigen.
4. **Wereldreplicatie.** Het kampvuurbeeld ondersteunt uitleg over meerdere verbonden spelers, late joins, gescheiden overdracht van beweging en blijvende gegevens, en herstel van identiteit en inventaris.
5. **De systemen erachter.** Vijf inhoudelijke blokken: multiplayerarchitectuur en voorspelling; wereldsynchronisatie; bevestigde spelacties met deduplicatie; lokale opslag en verbindingsherstel; 3D-rendering en interactie.
6. **Mijn bijdrage en techniek.** Benoem het ontwerp en de ontwikkeling van netwerkarchitectuur, simulatie en rendererintegratie. TypeScript, React, Three.js en WebRTC vormen de technische basis. Onderscheid eigen systemen van externe modellen en materialen.
7. **Ontwikkelstatus en contact.** Persoonlijk gameproject in ontwikkeling. Link **Bespreek een interactieve toepassing** naar `/#contact`. Een publieke speellink komt pas in beeld wanneer een geschikte, actuele versie is gekozen en getest.

Gebruik drie beelden: pier, boot en kampvuur. Het paviljoenbeeld is een reserve voor een smallere uitsnede; plaats het niet naast het pieroverzicht, want het vertelt vrijwel hetzelfde.

## 5. Concrete beeldselectie

De volledige bronpaden, afmetingen, SHA-256-hashes en bestandsdatums staan in `design-experiments/eigen-projecten/asset-selectie.json`. Het overzicht staat in `design-experiments/eigen-projecten/beeldselectie.jpg`.

Velvet gebruikt uitsluitend de nieuwe gebruikersbijlagen, aangeleverd op 18 november 2026. De exacte opnamedatum is niet vastgesteld; de gebruiker bevestigt dat dit de actuele UI is. Sunline behoudt de goedgekeurde selectie. Alle bestanden hieronder staan relatief aan `design-experiments/eigen-projecten/sources/`.

| Project | Functie | Bestand | Herkomst | Afmetingen |
| --- | --- | --- | --- | --- |
| Velvet | opening — Arrangement en automation | `velvet/velvet-arrangement-automation.png` | Gebruikersbijlage | 2880 × 1800 |
| Velvet | detail — Pattern en ritme | `velvet/velvet-pattern.png` | Gebruikersbijlage | 2880 × 1800 |
| Velvet | detail — Serein synthesizer | `velvet/velvet-serein.png` | Gebruikersbijlage | 2880 × 1800 |
| Velvet | detail — Copperhead effect | `velvet/velvet-copperhead.png` | Gebruikersbijlage | 2034 × 1362 |
| Sunline | opening — Pier en kust | `sunline/sunline-pier.png` | Goedgekeurde lokale opname | 1920 × 1080 |
| Sunline | detail — Boot en landschap | `sunline/sunline-boot.png` | Goedgekeurde lokale opname | 1440 × 900 |
| Sunline | detail — Samen rond het kampvuur | `sunline/sunline-kampvuur.png` | Goedgekeurde lokale opname | 1280 × 900 |
| Velvet | reserve — About Velvet | `velvet/velvet-about.png` | Gebruikersbijlage | 1406 × 950 |
| Velvet | reserve — Arrangement en mixer | `velvet/velvet-arrangement-mixer.png` | Gebruikersbijlage | 2880 × 1800 |
| Sunline | reserve — Paviljoen | `sunline/sunline-paviljoen-reserve.png` | Goedgekeurde lokale opname | 1920 × 1080 |

### Waarom deze bestanden

- Beeld 1 toont de nieuwe Velvet-UI met een gevulde sessie, waveforms, automation en samplebrowser. Het wordt het hoofdbeeld voor de homepage en de projectpagina.
- Beeld 3 voegt patternbewerking en ritme toe. Omdat de onderste helft veel vrije ruimte bevat, mag bij uitvoering een uitsnede worden gemaakt die de bovenste werkruimte behoudt. Bewaar het volledige origineel en documenteer de uitsnede; verwijder geen bediening binnen die uitsnede.
- Beeld 4 toont de huidige Serein-vormgeving. Gebruik dit in plaats van de oude Serein-opname met toetsen.
- Beeld 6 toont Copperhead met actieve meters en een duidelijke effectinterface.
- Beeld 2 (About) en beeld 5 (mixer) zijn reserves. Vier hoofdbeelden bieden voldoende inhoud zonder herhaling. Oude Velvet-opnames worden niet meer gebruikt.
- De gebruiker heeft de Sunline-beelden goedgekeurd: pier als opening, boot en kampvuur als aanvullende beelden. Paviljoen blijft reserve. De kopieën zijn byte-identiek aan de oorspronkelijke bestanden.
- Sunline-menu-illustraties, debugpanelen en regressieopnames maken geen deel uit van de selectie.

## 6. Vormgeving, interactie en mobiel

De website blijft herkenbaar Webaanzee. Geen aparte gamingskin of nagebouwde DAW rond de pagina's. Gebruik de donkere auberginekleuren van Velvet en het water/groen van Sunline vanuit de screenshots zelf.

Op de homepage krijgt elk project één ruim beeld met tekst ernaast. De detailpagina begint met een groot beeld, gevolgd door korte inhoudelijke hoofdstukken. Laat screenshots waar mogelijk in hun oorspronkelijke verhouding zien. Kleine interfaceletters hoeven op mobiel niet allemaal leesbaar te zijn: de tekst en het bijschrift moeten zelfstandig uitleggen wat de bezoeker ziet.

Op detailpagina's kan **Vergroot afbeelding** het origineel in een toegankelijke viewer openen. Die viewer krijgt toetsenbordbediening, Escape om te sluiten, herstel van focus en zichtbare sluitknop. Als die extra bediening niet wordt gebouwd, gebruik dan een gewone link naar de grotere afbeelding. Vergroten mag geen voorwaarde zijn om de pagina te begrijpen.

Beweging blijft beperkt tot subtiele binnenkomst en hover/focusfeedback die aansluit bij de bestaande site. Gebruik gewone documentflow voor deze toevoeging en controleer de aansluiting op de bestaande scrollchoreografie. Respecteer reduced motion. Start geen audio automatisch en laad geen spelruntime of audiomotor op de marketingpagina.

## 7. Uitvoering in de bestaande codebase

1. **Assets voorbereiden.** Neem alleen de zeven gekozen beelden over naar `public/images/eigen-projecten/{velvet,sunline}/`. Houd originelen buiten de gepubliceerde map. Maak passende WebP/AVIF-varianten met fallback, behoud leesbare UI-details en voorkom opschalen. Leg bron en eventuele uitsnede vast; wijzig de getoonde productinhoud niet.
2. **Content scheiden.** Voeg bijvoorbeeld `data/independent-projects.mjs` toe met titel, status, intro, route, beelden, bijschriften, eigen bijdrage en techniek. Gebruik deze data voor homepage en detailpagina's. Het bestaande `data/projects.mjs` blijft de bron voor huidige cases.
3. **Homepaginasectie.** Bouw een component met bijbehorende CSS-module en plaats die na About in App.tsx. Controleer zowel de desktop- als mobiele About-uitgang en de overgang naar FAQ.
4. **Detailpagina's genereren.** Breid de bestaande statische paginagenerator uit met een gedeeld template voor eigen projecten. Gebruik de bestaande branding, navigatie en footer. Zorg dat de routes ook rechtstreeks laden en zonder JavaScript de volledige inhoud tonen.
5. **Vindbaarheid.** Eigen titel, beschrijving, canonical, H1 en deelafbeelding per pagina. Voeg beide routes aan de sitemap toe. Gebruik passende CreativeWork-informatie; verzin geen productreviews, ratings, prijzen of beschikbaarheid. De pagina's moeten als ontwikkelproject herkenbaar blijven.
6. **Afronden.** Controleer teksten tegenover de huidige projectcode en documentatie, bronvermelding van externe onderdelen en de gekozen ontwikkelstatus. Een eventuele audio-preview van Velvet kan later worden toegevoegd uit bestaande eigen composities; de eerste versie heeft voldoende beeldmateriaal.

## 8. Controle bij uitvoering

- Controleer de homepage en beide detailpagina's op 390 px, 768 px en 1440 px breedte: leesvolgorde, beeldverhouding, tekstlengte en ontbreken van horizontale overflow.
- Controleer toetsenbordnavigatie, focus, altteksten en eventuele afbeeldingsviewer. Test reduced motion.
- Controleer rechtstreekse paginalading, teruglinks, contactlinks, sitemap, canonicals en deelafbeeldingen.
- Voer `npm run build` uit; die bevat bestaande SEO- en regiocontroles. Controleer de bestaande homepagechoreografie met `npm run check:home-motion` en de nieuwe overgangen visueel wanneer de sectie is ingebouwd.
- Laad beelden onder de vouw uitgesteld, reserveer beeldruimte met afmetingen en laad een eventuele grote viewerafbeelding pas wanneer nodig.
- Beoordeel de gebouwde pagina's op screenshots. Geen nieuwe screenshots van Velvet of Sunline zelf vereist voor deze eerste uitvoering; de Velvet-UI komt uit de actuele gebruikersbijlagen en de Sunline-beelden zijn goedgekeurd.

## Eerste oplevering

Eén nieuwe homepaginasectie, twee inhoudelijke projectpagina's, zeven geoptimaliseerde screenshots, correcte links en metadata zijn lokaal gebouwd. De detailpagina's gebruiken gewone links naar grotere afbeeldingen. De patternopname is uitgesneden tot de bovenste werkruimte; het volledige origineel blijft bewaard en de uitsnede staat in de geëxporteerde metadata. De bestaande scrollnavigatie ondersteunt ook het nieuwe homepageanker en behoud van de sectie bij een formaatwissel.

De productiebuild omvat SEO-, sitemap- en regiocontroles. `npm run check:independent-projects` controleert de nieuwe pagina's en homepage op 390, 768 en 1440 px, zonder JavaScript op de detailpagina's en met reduced motion op de homepage. Zie README voor lokaal bekijken en opnieuw uitvoeren. Velvet en Sunline zelf zijn niet opgestart; de website is niet gepubliceerd.

De gebruiker heeft de positionering bijgestuurd: presenteer Velvet expliciet als complete DAW en benoem de synthesizers, sampler, mixer, effecten, automation en plug-inondersteuning. De homepage, detailpagina en gedeelde metadata gebruiken hiervoor dezelfde inhoudsbron.

PWAYMENT is op verzoek toegevoegd als eerste project. De eerdere websitebeelden zijn afgewezen als verouderd. Op expliciet verzoek zijn zeven verse opnames gemaakt van de huidige lokale RETAIL-code: kassa, voorraad, klanten, verkoopinzichten, gegevensimport, module-instellingen en kassatoegang. Deze vervangen de beelden op de homepage en productpagina; de case gebruikt eveneens het nieuwe kassabeeld. De captures gebruiken een geïsoleerd browserprofiel met synthetische demogegevens, zonder externe HTTP-verzoeken of afgeronde verkopen. Originelen en bronversie staan onder `sources/pwayment/`.
