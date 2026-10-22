# Stadspagina’s op het niveau van de homepage

Datum: 22 oktober 2026. Status: lokaal geïmplementeerd. Zie `REGIOPAGINAS-OPLEVERING-2026-10-22.md` voor uitgevoerde controles en de preview.

## Opdracht en vastgelegde richting

Alle tien bestaande regiopagina’s moeten aanvoelen als volwaardige landingspagina’s van Webaanzee. De homepage is de visuele kwaliteitslat. De gebruiker kiest expliciet voor directe, persoonlijke Vlaamse teksten met concrete uitleg. De bezoeker is een ondernemer die een webdesigner zoekt en wil weten: kan Kevin mijn opdracht maken, hoe ziet zijn werk eruit, wat krijg ik en wat kost het?

De merkstijl staat vast: warm papier, donkere vlakken, terracotta, uitgesproken sans-serifkoppen, groot projectbeeld en verzorgde beweging. De ingreep betreft de samenhang, inhoud en presentatie van de regiopagina’s; geen nieuwe merkidentiteit.

## 1. Vastgestelde problemen

Bronnen: `scripts/generate-seo-pages.mjs`, `public/seo-pages.css`, `components/Hero.tsx`, `components/PortfolioDepth.tsx`, `components/Proof.tsx`, `components/Offer.tsx`, `data/pricing.mjs` en de bestaande `TEKSTAUDIT-2026-10-22.md`.

De homepage en Blankenberge zijn ook lokaal gerenderd en visueel vergeleken, inclusief de overgang naar projecten respectievelijk vervolgsecties. De overige negen regio’s zijn via hun gegevens en gedeelde template onderzocht; hun afzonderlijke browsercontrole hoort bij de uitvoering.

- **Andere visuele taal.** De homepage opent met een beeldvullende pierfoto, grote sans-serifkoppen en een geïntegreerde navigatie. De regio opent met kruimelpad, grote lege bovenruimte, serifkoppen, een decoratieve cirkel en een zwart tekstpaneel. Dat verschil ontstaat in twee afzonderlijke presentatiesystemen.
- **Verkooptekst zonder voldoende uitleg.** De intro’s beschrijven steden, marktkenmerken of concurrentie. De vervolgdelen herhalen algemene voordelen zoals persoonlijk contact en maatwerk.
- **Werk staat te ver naar onderen.** Eerst volgen hero, kenmerkenbalk, marktintro en dienstenraster. Het overtuigendste materiaal, de projecten, komt daarna pas.
- **Lokale relevantie wordt onvoldoende uitgelegd.** `loc.proof` bevat een motivatie per case, maar de template gebruikt alleen de verwijzing om cases op te zoeken. Die motivatie verschijnt niet. Vervolgens vult de generator automatisch aan tot drie projecten uit de algemene lijst.
- **Commerciële informatie is onvolledig.** De FAQ ontwijkt bedragen terwijl de homepage en centrale prijsdata concrete startprijzen hebben. De procescopy suggereert doorlopende verbetering zonder de grenzen van de offerte te benoemen.
- **Effecten blijven beperkt tot hover.** Er is geen met de homepage vergelijkbare introductie, projectregie of overgang tussen hoofdstukken. Meer beweging alleen lost het zwakke verhaal echter niet op.

## 2. Nieuwe paginaopbouw

### A. Een beeldgedreven opening

Een korte plaatsaanduiding, een krachtige H1, twee à drie zinnen vanuit Kevin en twee acties: project bespreken en het geselecteerde werk op deze pagina bekijken. Beide acties blijven direct bereikbaar. Het kruimelpad blijft compact en krijgt geen afzonderlijke hoge strook.

Blankenberge krijgt de bestaande pierfoto als lokaal anker. Andere regio’s krijgen een groot relevant projectbeeld of aantoonbaar juiste lokale fotografie als die beschikbaar is. De pier van Blankenberge wordt niet als herkenningsbeeld van een andere gemeente gepresenteerd. Geen stadsfoto nodig om een pagina af te werken: het gebouwde werk kan de opening dragen.

### B. Het werk meteen na de opening

Eén groot uitgelicht project met daarnaast of eronder maximaal twee aanvullende voorbeelden. Per voorbeeld: projectnaam, werkelijke plaats of kustbreed bereik, concrete opdracht, gerealiseerde functies en waarom dit voorbeeld bij deze vraag past. Gebruik bestaande screenshots en geschikte bestaande video’s.

Blankenberge: COZY Moments, Daily Grind en De Wulk. Daar is werkelijk lokaal bewijs. Elders staat bijvoorbeeld “Een horecavoorbeeld uit Blankenberge” wanneer die case relevant is. Niet elk project heeft een video nodig; een zorgvuldig uitgesneden screenshot is volwaardig beeldmateriaal.

### C. Herkenbare opdrachten, gekoppeld aan wat er gebouwd wordt

Vervang de algemene stadsbeschrijving en losse sectorlijst door twee of drie concrete situaties. Bijvoorbeeld: een horecazaak wil kaart en reservatie tonen; een winkel wil producten verkopen; een vakman wil gerichte aanvragen ontvangen. Beschrijf telkens de bezoekvraag, passende inhoud en mogelijke functie. Voorbeelden zijn mogelijkheden, geen fictieve opdrachten of standaard inbegrepen functies.

Dit vormt ook de dienstenkeuze. Geen afzonderlijk zwaar raster met vier overlappende verkooppraatjes. De ondernemer krijgt korte, relevante routes naar website, website met beheer, webshop of toepassing.

### D. Kosten en inbegrepen werk

Een compact, visueel sterk prijsdeel met de relevante pakketten en link naar het volledige aanbod. Prijzen rechtstreeks uit `data/pricing.mjs`:

| Aanbod | Eenmalig vanaf, excl. btw | Doorlopend volgens huidige bron |
|---|---:|---|
| Website op maat | €2.450 | Hosting en technisch beheer vanaf €35/maand |
| Website met CMS | €3.950 | Hosting en technisch beheer vanaf €65/maand |
| Webshop | €5.950 | Hosting en technisch beheer vanaf €95/maand |
| Webapplicatie | €7.500 | Hosting, beheer en externe diensten op offerte |

Toon bij een prijs ook de wezenlijke afbakening uit het huidige aanbod: bijvoorbeeld tot vijf pagina’s en één taal bij de basiswebsite, geen eigen beheerscherm en uitbreidingen apart. Neem geen losse lage startprijs over zonder context. Bouwprijs, beheer en externe kosten blijven duidelijk gescheiden.

### E. Samenwerking met Kevin

Een compact persoonlijk deel met bestaand portret of studiobeeld, gevolgd door vier concrete stappen: gesprek, voorstel en inhoud, ontwerp en bouw met feedback, controle en livegang. Leg uit welke input van de klant nodig is en wat Kevin uitwerkt. Technisch beheer en latere wijzigingen volgens de offerte benoemen. Geen vaste oplevertermijn of gratis doorlopende aanpassingen verzinnen.

### F. Vragen die een opdracht helpen voorbereiden

Vier tot zes vragen met echte antwoorden: prijs, bestaande website vernieuwen, eigen beheer, tekst en beeld, talen waar relevant, en samenwerking vanuit Blankenberge. Vermijd de standaardvraag “Werk je in deze gemeente?” als hoofdinhoud van elke FAQ. Het antwoord over vindbaarheid beschrijft de technische en inhoudelijke basis zonder een positie te beloven.

### G. Een persoonlijk slot en rustige regiolinks

“Vertel me wat je wilt laten maken”, met uitleg welke informatie nuttig is: soort zaak, bestaande site en gewenste functies. Bestaande contactroute, telefoon en e-mail bruikbaar houden. Geen extra formulier bouwen voordat duidelijk is dat het huidige contactpad tekortschiet. Nabije regio’s en de kusthub vormen een klein navigatiedeel.

## 3. Tekstrichting en voorbeeld voor Blankenberge

Spreek consequent als Kevin: “ik”, “je” en “we” voor gezamenlijke keuzes. Gebruik begrijpelijke woorden: bestellen, aanvragen, zelf aanpassen, teksten aanleveren. Elke alinea moet een klantvraag beantwoorden, een keuze uitleggen of bewijs leveren. Schrap clichés, defensieve formuleringen en interne SEO-strategie. De stad hoort natuurlijk in titel, intro en relevante passages, zonder die in iedere tussenkop te herhalen.

Voorbeeldtekst als richting voor de uitvoering:

**Bovenregel:** Webdesigner in Blankenberge

**H1:** Een website voor je zaak in Blankenberge.

**Intro:** Ik ben Kevin. Vanuit Blankenberge ontwerp en bouw ik websites, webshops en toepassingen voor ondernemers. Je werkt rechtstreeks met mij: we bespreken wat je klanten nodig hebben en ik werk de inhoud, het ontwerp en de techniek met je uit.

**Acties:** Bespreek je website · Bekijk mijn werk in Blankenberge

**Intro bij projecten:** Voor COZY Moments maakte ik een website met drankkaart, praktische informatie en een digitale spaarkaart. Daily Grind kreeg een webshop en communityplatform. Bij De Wulk staan het aanbod en de bestelinformatie centraal. Hieronder zie je hoe dat per zaak is uitgewerkt.

**Concreet inhoudsblok:** Zoekt iemand je openingsuren, wil die je aanbod bekijken of meteen iets bestellen? Die vragen bepalen wat er op je website komt. Voor een koffiebar kan dat een drankkaart zijn; voor een winkel een webshop. We kiezen de inhoud en functies die jouw zaak nodig heeft.

Dit is een redactioneel vertrekpunt. De uiteindelijke kopregels worden in de echte compositie op desktop en mobiel aangescherpt.

## 4. Eigen inhoud voor alle tien regio’s

Onderstaande invalshoeken zijn voorstellen voor websitevragen, geen bewezen uitspraken over alle ondernemingen in een gemeente. De precieze relevantie wordt bij het schrijven getoetst. Het gedeelde ontwerp mag herkenbaar zijn; intro, opdrachtvoorbeelden, case-uitleg en relevante FAQ’s krijgen per regio eigen inhoud.

| Bestaande regio | Inhoudelijke invalshoek | Beschikbaar bewijs en eerlijke duiding |
|---|---|---|
| Blankenberge | Horeca, winkel en webshop: aanbod tonen, bezoek voorbereiden en bestellen | COZY Moments, Daily Grind en De Wulk: lokale projecten |
| Oostende | Verschillende bezoekers naar aanbod, informatie en contact leiden | Fabrice Goffin: Oostendse communicatiecase, expliciet geen horecaproject; aanvullend passend winkel- of horecavoorbeeld uit portfolio |
| Brugge en Zeebrugge | Verschil tussen bezoekgerichte site en zakelijke aanvraag; maak de juiste route zichtbaar | Hond aan Zee als kustbreed informatievoorbeeld; zakelijke case alleen bij inhoudelijke match en met correcte herkomst |
| De Haan en Wenduine | Praktische informatie naast sfeer: aanbod, ligging, contact en eventuele talen | COZY als horecavoorbeeld uit Blankenberge; geen hotel- of verhuurresultaten claimen |
| Bredene | Dienstgebied, bereikbaarheid en concrete aanvragen; verblijf alleen waar relevant | Hond aan Zee als kustbreed informatievoorbeeld; Fabrice uitsluitend als communicatievoorbeeld wanneer dat iets uitlegt |
| Knokke-Heist | Collecties presenteren, producten vinden en een gerichte aanvraag doen | Atelier Rembrandt en PWAYMENT als inhoudelijk relevante voorbeelden, zonder lokale klantenband te suggereren |
| Middelkerke en Westende | Wisselende openingsuren en aanbod actueel houden; uitleg verschil site en CMS | Hond aan Zee als informatievoorbeeld; beheerfunctionaliteit uitsluitend tonen als aantoonbaar gebouwd |
| Nieuwpoort | Bezoeker zoekt aanbod, afspraak, verblijf of gespecialiseerde dienst: duidelijke keuzes | Hond aan Zee voor plaatsgerichte informatie; aanvullende dienstenvoorbeelden op daadwerkelijke functie selecteren |
| Koksijde en Oostduinkerke | Aanbod of collectie met eigen beeld en toelichting presenteren | Atelier Rembrandt als collectievoorbeeld, zonder lokale herkomst te claimen |
| De Panne | Taalkeuze, mobiele informatie en duidelijke contactacties | Hond aan Zee als kustbreed voorbeeld; geen meertalige realisatie claimen zonder aantoonbare taalversies |

Geen automatisch aangevulde derde case om een raster te vullen. Eén sterk en goed toegelicht voorbeeld kan voldoende zijn. Niet voor alle steden hetzelfde aantal woorden afdwingen. Bij ontbrekend lokaal beeld kiest de uitvoering voor projectbeeld; er hoeft geen fotografie geleverd te worden om het werk af te ronden.

De kusthub krijgt dezelfde typografie en afwerking, met als eigen taak: werkgebied uitleggen, juiste regio kiezen en enkele projecten bekijken. Geen elfde kopie van het stadstemplate.

## 5. Visuele afwerking en effecten

| Onderdeel | Beoogde uitvoering | Mobiel en minder beweging |
|---|---|---|
| Opening | Beeld onthult eenmaal via masker; kopregels komen kort na elkaar binnen. Richtwaarde 600–900 ms voor beeld, 450–650 ms voor tekst | Kortere introductie; bij minder beweging direct zichtbaar |
| Hero tijdens scrollen | Kleine beeldverplaatsing, circa 3–5%, binnen uitgesneden vlak; tekst blijft leesbaar | Op kleine schermen gewone documentflow; geen parallax nodig |
| Uitgelichte case | Groot projectbeeld en tekst met een korte sticky passage op ruime desktops; vloeiende overgang naar het volgende voorbeeld | Gestapelde beelden en tekst, geen horizontale sleepactie vereist |
| Video | Geschikte bestaande preview start bij hover/focus; pauzeert buiten beeld en bij verborgen tab | Poster blijft standaard; geen verplichte autoplay of videodownload |
| Sectieovergangen | Bewuste afwisseling tussen papier en donker, enkele composities met groot beeld en royale koppen | Zelfde hiërarchie, aangepast witruimtegebruik |
| Inhoud verschijnt | Kleine verschuiving van 12–24 px en korte fade, eenmaal per onderdeel | Bij minder beweging geen verschuiving; inhoud blijft beschikbaar |
| Knoppen en projectlinks | Pijl beweegt enkele pixels, lijn of achtergrond reageert; focus even duidelijk als hover | Duidelijke drukfeedback en ruime raakvlakken |
| FAQ | Toegankelijke disclosure met duidelijke open/dichtstatus; korte overgang waar robuust mogelijk | Toetsenbord en touch volledig bruikbaar |

De homepage bepaalt de kwaliteit van de beweging. Een regionale zoekbezoeker moet ook snel projecten, prijs en contact kunnen bereiken: geen langdurige verplichte scrollscène voor de volledige pagina. Alleen de uitgelichte cases mogen een korte geregisseerde passage krijgen. Geen cursorvervanging, willekeurige deeltjeseffecten of beweging die bodytekst tijdens het lezen wegduwt.

## 6. Technische uitvoering

1. **Haal regiogegevens uit de grote generator.** Bijvoorbeeld `data/locations.mjs` voor intro, opdrachtvoorbeelden, geselecteerde cases met relevantie, beeldkeuze en FAQ. Valideer verwijzingen zodat een ontbrekende case de build laat mislukken in plaats van stil wordt overgeslagen.
2. **Maak een afzonderlijke regiopresentatie.** Bijvoorbeeld `scripts/templates/location-page.mjs`, `public/location-pages.css` en een klein gedeeld motionbestand. Laat de bestaande generator HTML, metadata en sitemap blijven produceren. Content blijft in de eerste HTML aanwezig.
3. **Breng de visuele basis in lijn.** Stem kleuren, sans-serifkoppen, tekstmaten, marges, logo, navigatie, knoppen en footer op de huidige homepage af. Houd gedeelde waarden centraal waar dit zinvol is. De rest van de gegenereerde pagina’s mag niet onbedoeld veranderen door globale CSS-selectors.
4. **Voeg beweging als verbetering toe.** Statische HTML en gewone links zijn de basis. CSS en een kleine module verzorgen reveals, korte scrollinteracties en videobeheer. Gebruik bestaande motionbouwstenen alleen waar de gekozen architectuur er voordeel bij heeft; de volledige React-homepage en lange portfoliosequentie zijn geen voorwaarde voor regionale effecten.
5. **Bewaak laden en leesbaarheid.** Hero-afbeelding met vaste afmetingen en passende formaten; beelden onder de vouw lazy laden. Video pas laden bij bewuste interactie. Geen permanente animatielus; scrollwerk via geschikte browsermechanismen en zo nodig één requestAnimationFrame-loop. Inhoud mag bij fout of uitgeschakeld JavaScript niet verborgen blijven.
6. **Behoud de bestaande tien URL’s en hub.** Unieke titels en descriptions schrijven, één H1, correcte canonicals, kruimelpaden en structured data. Publicatie-/wijzigingsdatum alleen aanpassen voor werkelijk gewijzigde pagina’s. Geen nieuwe stadspagina’s aanmaken binnen deze opdracht.
7. **Gebruik bestaande brondata voor prijzen en projecten.** Vermijd nieuwe losse prijsstrings. Trek de casekeuze en de uitleg waarom die relevant is samen; laat het template geen willekeurige cases toevoegen. Tijdens de analyse is ook `data/projects.mjs` toegevoegd als gedeelde projectbron voor homepage en cases: sluit daarop aan en controleer bij aanvang van de uitvoering de dan actuele generator. Maak geen tweede projectcatalogus.

## 7. Uitvoervolgorde en tussenresultaten

**Stap 1 — Inhoud en beeld vastzetten.** Maak per regio een korte contentbrief volgens bovenstaande tabel, selecteer aantoonbare cases en geschikte bestaande assets. Leg de visuele basis van de homepage vast voor hergebruik. Resultaat: tien afgebakende briefs, beeldselectie en gedeelde tekstregels.

**Stap 2 — Blankenberge volledig uitwerken.** Schrijf de volledige pagina en bouw opening, lokale projectpresentatie, concrete opdrachten, prijsdeel, samenwerking, FAQ en slot. Werk desktop én mobiel uit, inclusief effecten en minder beweging. Resultaat: één complete referentiepagina waarop inhoud en uitstraling samen te beoordelen zijn.

**Stap 3 — Schaal het systeem naar de andere negen regio’s.** Werk alle eigen teksten en case-uitleg uit, pas beeldcompositie aan waar nodig en controleer lange plaatsnamen. De referentie is een kwaliteitscontrole, geen reden om de rest onafgewerkt te laten. Resultaat: tien volwaardige pagina’s.

**Stap 4 — Werk kusthub en navigatie af.** Hub dezelfde merkuitstraling geven, regioselectie helder maken en contactpaden controleren. Resultaat: ook de route naar de pagina’s voelt afgewerkt.

**Stap 5 — Verifieer en lever op.** Controleer inhoud, beelden, effecten, toegankelijkheid, laadsnelheid en gegenereerde HTML. Lever een kort overzicht van wijzigingen en visueel bewijs van desktop en mobiel.

## 8. Wanneer het klaar is

- Alle tien pagina’s beantwoorden aanbod, bewijs, samenwerking, prijs en contact zonder daarvoor de homepage te moeten lezen.
- Intro en concrete opdrachten zijn per regio herschreven. Er staan geen interne concurrentieanalyses, verzonnen lokale klanten, generieke stadsschetsen of ongefundeerde resultaatclaims.
- De werkelijke herkomst en relevantie van iedere case zijn duidelijk; automatisch opvullen van projecten is verwijderd.
- De opening en vervolgsecties passen aantoonbaar bij de homepage: dezelfde merkuitstraling, typografische hiërarchie en verzorgde beeldregie.
- Prijzen en voorwaarden stemmen overeen met de centrale prijsdata en het huidige aanbod. Onderhoud en aanvullend werk zijn correct afgebakend.
- Alle tien regio’s en de hub krijgen een browsercontrole op circa 390 px en 1440 px breed; extra controle op 320 px en tablet voor lange namen en prijsdelen. Screenshots vastleggen en vergelijken.
- Blankenberge en een pagina met lange plaatsnaam worden volledig met toetsenbord, minder beweging en uitgeschakeld JavaScript gecontroleerd. Alle pagina’s blijven scrollbaar en leesbaar; mobiele navigatie, FAQ en contact werken.
- Effecten stoppen buiten beeld; video’s veroorzaken geen onnodige downloads. Hero en projecten verspringen niet tijdens laden; tekst en knoppen behouden voldoende contrast, ook boven fotografie.
- `npm run build` en de bestaande SEO-controles slagen. Voeg gerichte controles toe voor de tien routes, caseverwijzingen, prijsconsistentie en aanwezigheid van belangrijke inhoud in de eerste HTML. De huidige algemene SEO-check bewijst nog geen inhoudelijke kwaliteit.
- Meet representatieve productiepagina’s op mobiel op LCP, CLS en INP waar interactiedata beschikbaar zijn. Richtwaarden: LCP ≤ 2,5 s, CLS ≤ 0,1, INP ≤ 200 ms; labmetingen en ontbrekende velddata afzonderlijk rapporteren. De huidige prestaties eerst als referentie vastleggen.
- Voer na de UI-wijzigingen de Impeccable-detector uit op de gewijzigde UI-bestanden en beoordeel bevindingen. Controleer daarnaast diensten- en casepagina’s op regressies door gedeelde onderdelen.

## Afbakening

Dit plan behandelt alle bestaande stadspagina’s en hun kusthub. De homepage is de referentie. Volledig herschrijven van dienstenpagina’s en caseverhalen is een afzonderlijke opdracht; correcte links en gedeelde componenten vallen wel onder deze afwerking. De bestaande tekstaudit blijft behouden. Voorbereiding en plan wijzigen geen productieteksten of UI.
