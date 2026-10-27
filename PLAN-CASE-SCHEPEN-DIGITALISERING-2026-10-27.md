# Plan — case schepen van Digitalisering, Oostende

Datum: 27 oktober 2026. Status: uitgevoerd in de lokale broncode en productiebuild op 27 oktober 2026; niet gepubliceerd.

## Doel en positionering

Deze case moet potentiële opdrachtgevers laten zien dat Kevin websites ontwerpt en bouwt voor mensen met een publieke verantwoordelijkheid. De combinatie van de functie van schepen en de bevoegdheid Digitalisering geeft deze opdracht bijzondere relevantie in een webdesignportfolio.

De bezoeker moet binnen enkele seconden begrijpen voor welke functie de website is gemaakt, het werk kunnen beoordelen en de vertaalslag naar een eigen opdracht kunnen maken. Doelgroep: ondernemers, professionals en organisaties die een verzorgde publieke presentatie nodig hebben.

De naam verdwijnt uit de redactionele titel en beschrijving van de case. De functie wordt het herkenningspunt. De bestaande klantwebsite en projectbeelden blijven het werk identificeren.

## Feitelijke basis

- Stad Oostende vermeldt de bevoegdheid Digitalisering: https://www.oostende.be/samenstelling-college
- De klantwebsite toont de functie, persoonlijke introductie, standpunten, nieuws en contact: https://www.fabricegoffin.be/
- Gebruik daarom “schepen van Digitalisering”, de officiële benaming.
- De opdracht betreft de persoonlijke website van een schepen. Benoem die relatie precies; presenteer haar niet als een opdracht voor de digitale dienstverlening van Stad Oostende.
- Een uitspraak over waarom de opdrachtgever Kevin koos, een aanbeveling of een meetbaar resultaat vraagt eigen bewijs. De relevantie van de functie en het getoonde werk dragen de case al.

## Voorgestelde paginaopbouw en conceptcopy

### 1. Eerste scherm: functie en opdracht

Label: **Webdesign & ontwikkeling · Oostende**

H1: **Een website voor de schepen van Digitalisering.**

Intro: “Voor de Oostendse schepen van Digitalisering ontwierp en bouwde ik een persoonlijke website. Met ruimte voor zijn verhaal, zijn beleidsprioriteiten en het contact met inwoners.”

Korte vermelding: “Ontwerp en ontwikkeling door Kevin · Webaanzee”. De functie staat in de hoofdkop; een decoratieve tweede slogan is niet nodig.

### 2. Het werk vroeg in beeld

Toon de bestaande websitevideo en een gerichte selectie van beelden. Kies bij uitvoering beelden van de introductie, de standpunten en de mobiele contactroute. Elke toelichting verbindt een zichtbaar onderdeel aan een concrete ontwerpkeuze. Beoordeel eerst de actuele klantwebsite; vermijd meerdere bijna identieke totaalbeelden.

### 3. De ontwerpvraag

Kop: **Een publieke functie, een persoonlijk verhaal.**

Vertel kort hoe de website ruimte geeft aan zowel de persoon als zijn beleidswerk. Licht de relevante spanning toe: een herkenbare presentatie en inhoud die inwoners gericht kunnen raadplegen. Vervang de huidige algemene alinea over nieuws en standpunten door dit projectspecifieke verhaal.

### 4. Drie keuzes, zichtbaar gemaakt

- **Een herkenbare introductie.** Laat zien hoe beeld en typografie de eerste kennismaking vormgeven.
- **Ruimte voor beleidsprioriteiten.** Laat zien hoe bezoekers standpunten kunnen verkennen en verder lezen.
- **Contact met inwoners.** Toon hoe bezoekers vanuit de inhoud de contactgegevens bereiken, ook op mobiel.

Werk deze teksten bij uitvoering uit op basis van de daadwerkelijke schermen en interacties. Beschrijf wat Kevin maakte en waarom dat voor deze website relevant is. Gebruik geen onbevestigde claims over toegankelijkheidsnormen, prestaties of beheerfuncties.

### 5. De betekenis voor een volgende opdrachtgever

Laat functie, beelden en ontwerpkeuzes de breedte van Kevins werk aantonen. Eén korte brug volstaat: een website kan een persoon, een organisatie of een onderneming een passende publieke presentatie geven. Vermijd een lange passage waarin Kevin zijn eigen kansen bespreekt; de bezoeker moet zijn eigen opdracht erin herkennen.

Voorgestelde slotkop: **Een publieke rol verdient een doordachte website.**

Voorgestelde tekst: “Voor je onderneming, organisatie of publieke functie ontwerp en bouw ik een website die je verhaal en je werk laat zien. Vertel me wat je wilt overbrengen en wie je wilt bereiken.”

Knop: **Bespreek je website**

## Doorwerking in de site

1. `data/projects.mjs`: titel “Schepen van Digitalisering”, locatie Oostende; herschrijf samenvatting, type, hoofdkop, vraag, oplossing en ontwerpkeuzes. Gebruik bijvoorbeeld “Persoonlijke website voor een schepen” als type, zonder herhaling in elk veld.
2. `scripts/generate-seo-pages.mjs`: ondersteun zo nodig een eigen hero en slottekst per case via optionele datavelden. De huidige generator zet titel en headline verplicht na elkaar en maakt een generieke CTA van het projecttype; dat levert bij deze positionering herhaling op. Behoud de bestaande uitvoer voor andere cases.
3. Controleer alle afgeleide vermeldingen: homepageportfolio, mobiele weergave, projectoverzicht en kaarten op dienstenpagina’s. De gedeelde projecttitel werkt hierin door.
4. `data/locations.mjs`: pas de Oostende-verwijzing aan zodat de functie ook daar zichtbaar is.
5. `components/BlogArticle.tsx`: pas bijschrift, linklabel en alt-tekst van dit project aan. Dit bestand bevat al lokale wijzigingen; behoud die bij latere uitvoering.
6. Controleer `components/ClientMarks.tsx` afzonderlijk: het klantwoordmerk bevat de naam. Vervang een herkenningswoordmerk niet blind via een zoek-en-vervangactie; beoordeel of hier een feitelijk functielabel passender is.
7. SEO-titel: “Website voor de schepen van Digitalisering in Oostende | Webaanzee”. Laat beschrijving, social sharing en breadcrumbs dezelfde functiegerichte positionering volgen.
8. Behoud voorlopig `/cases/fabrice-goffin-oostende/`. Een gewijzigde publieke titel vereist geen URL-migratie. Een eventuele latere nieuwe slug vraagt een redirect en bijgewerkte interne links en sitemap.

## Uitvoering en oplevercriteria

- Eerst definitieve copy en beeldselectie op basis van de actuele klantwebsite; daarna datavelden en template aanpassen.
- Bestaande visuele identiteit behouden; deze opdracht vraagt inhoudelijke herpositionering.
- De functie en Oostende zijn bovenaan onmiddellijk herkenbaar. De naam komt niet terug als redactionele titel of als hoofdmotief in de casetekst.
- De case toont minimaal drie concrete ontwerpkeuzes met passend beeld en benoemt Kevins rol.
- Bekijk desktop en mobiel, vooral de langere portfoliotitel, hero, video en CTA.
- Draai bij uitvoering de build en bestaande SEO-controles. Controleer daarna de gegenereerde case en verwijzingen op oude copy, dubbele functiebenamingen en defecte links.
- Geen publicatie onderdeel van dit plan. De case, verwijzingen en nieuwe projectbeelden zijn lokaal uitgewerkt. Build, SEO- en regiocontroles slagen. Desktop en mobiel zijn visueel gecontroleerd.
