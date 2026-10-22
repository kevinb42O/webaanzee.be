# Mobiele homepage — scrollchoreografie

Datum: 22 oktober 2026. Status: geïmplementeerd. Dit document bewaart de ontwerpafspraken; de verificatie staat in `MOBIELE-CHOREOGRAFIE-OPLEVERING-2026-10-22.md`.

## Richting

De mobiele homepage krijgt een eigen regie binnen de bestaande kustidentiteit. De bezoeker beweegt van de pier naar het werk, van het werk naar wat er mogelijk is, en vervolgens naar kwaliteit, investering, Kevin en contact. De opvallendste overgang zit tussen hero en portfolio. Daarna wisselen beeldmomenten en rustige leesstukken elkaar af.

De vinger bepaalt de voortgang. Geen onderschepping van touch- of wheel-events, scrollslot, verplichte snap, horizontale scrollroute of wachttijd voordat je verder kunt. Alle huidige projecten, prijzen, voorwaarden en contactmogelijkheden blijven bereikbaar.

## Wat er nu staat

- `App.tsx` rendert Proof → Quality → Offer → About → FAQ → ContactFooter. Binnen Proof zitten Hero, portfolio en diensten.
- `PortfolioDepth.tsx` bevat de grote desktopregie: hero, projectmozaïek, diepteportfolio, diensten, kwaliteit en prijzen op één tijdlijn.
- De animatiemodus wordt in PortfolioDepth, Quality, Offer en About geactiveerd met `(min-width: 1000px) and (min-height: 650px) and (prefers-reduced-motion: no-preference)`.
- Mobiel krijgt het statische portfolio met tien projecten. Hero heeft al een entree, beperkte beeldparallax en een scrollgestuurde tekstuitgang; het is dus niet volledig onbeweeglijk.
- Diensten tonen op mobiel een groot voorbeeld boven de accordion. Een nieuw gekozen dienst kan daardoor van voorbeeld wisselen buiten het zicht.
- Lokale Chromium-meting op 390 × 844: documenthoogte circa 20.385 px, ongeveer 24 schermhoogtes. De diensten beslaan circa 1539 px, het prijsdeel circa 5908 px. Dit zijn uitgangsmetingen, geen prestatietest of bewijs voor Safari.

## Harde afbakening

1. De bestaande desktopvoorwaarde, `AnimatedGallery`, desktopconstanten, tijdlijnen, kleuren, navigatieberekeningen en scènestijlen blijven behouden.
2. Mobiele choreografie wordt uitsluitend actief onder 1000 px en bij `prefers-reduced-motion: no-preference`. Op 1000 px en breder blijft ook de bestaande fallback voor lage vensters ongewijzigd.
3. 320–760 px krijgt de telefoonregie. 761–999 px krijgt dezelfde mobiele structuur met ruimere compositie en kleinere relatieve verplaatsingen; geen verkleinde desktopregie.
4. Bij een lage landscape-viewport, voorgesteld onder 600 px hoogte, vervalt het vastgehouden openingsmoment en blijft de normale documentstroom met lichte beeldeffecten over.
5. Geen nieuwe animatiebibliotheek. Gebruik de aanwezige Motion-stack. Geen wijzigingen aan gedeelde globale stijlen of het algemene scrollhulpmiddel voor deze opdracht.
6. Bestaande tekst, volgorde, projectdata en merkassets blijven leidend. Alleen de mobiele presentatie van het dienstenvoorbeeld verandert.
7. De al aanwezige lokale wijziging in `components/PortfolioDepth.tsx` wordt bij uitvoering behouden; er wordt niet vanuit een schone versie teruggeschreven.

## De volledige choreografie

Alle afstanden hieronder zijn startwaarden voor visuele afstelling. `svh` verwijst naar de kleine viewporthoogte. Scrollgestuurde scènes krijgen een lokale voortgang, geen gezamenlijke tijdlijn over de hele homepage. Zo verschuift een opengeklapte dienst of FAQ de latere scènes zonder de regie te breken.

| Scène | Compositie en beweging | Ritme en bediening |
| --- | --- | --- |
| 1. Aankomst aan de pier | Bestaande kustfoto en kop behouden. Het beeld is meteen aanwezig; twee kopregels komen uit hun regelmasker, daarna korte introductie en acties. Beeldschaal circa 1,02 → 1,00. | Eén entree van circa 550–700 ms; acties meteen bruikbaar. Geen intro afwachten voordat je mag scrollen. Niet opnieuw afspelen bij menu openen of gewone renders. |
| 2. Van kust naar werk | Een kort lokaal sticky-moment verbindt hero en portfolio. De hero blijft zichtbaar terwijl een licht portfoliovlak van onder binnenkomt. Daarop maximaal drie bestaande projectminiaturen, als compacte verticale compositie. De voorste miniatuur wordt het eerste echte projectbeeld. De omringende miniaturen wijken maximaal circa 12–20 px uit en verdwijnen. | Het ene grote mobiele signatuurmoment. Streef naar circa 0,5 scherm extra scrollafstand, hard maximum 0,65. Geen desktopmozaïek van tien miniaturen. Bij te hoge herotekst of lage viewport: gewone doorstroom, zonder afsnijden. |
| 3. Portfolio-intro | De twee bestaande regels ‘Ontworpen om op te vallen. / Gebouwd om te werken.’ verschijnen in leesvolgorde. De eerste projectafbeelding neemt de compositie over. Intro en toelichting blijven daadwerkelijk leesbaar tijdens de overgang. | Onderdeel van dezelfde opening. Geen afzonderlijk extra scrollhoofdstuk of tweede animatievertraging. |
| 4. De tien projecten | Alle projecten blijven in de normale verticale stroom. Per project beweegt de afbeelding van circa 16 px lager en schaal 0,98 naar zijn vaste positie. Titel en case-link staan leesbaar klaar. Binnen het beeld mag een zeer kleine verplaatsing van maximaal 8 px diepte suggereren, met voldoende beeldmarge. De eigen achtergrondkleur vormt de overgang naar het volgende project. | Beweging afgerond wanneer de afbeelding rond het midden van het scherm komt. Daarna een lange stabiele leesfase. Bij de uitgang geen wegdraaiende tekst, roterende kaart of vervagende link. Alle tien cases blijven beschikbaar; geen extra pin per case. |
| 5. Van bewijs naar mogelijkheden | De laatste projectkleur gaat via het gewone sectionvlak over in het warme dienstenvlak. De dienstentitel bouwt als twee regels op; de accentregel volgt kort op de hoofdregel. De link naar alle projecten blijft een gewone zichtbare link. | Circa 0,25–0,35 scherm lokale overgang, binnen bestaande sectionruimte. Geen extra lege spacer. |
| 6. Diensten als werkbank | De vijf diensten blijven een accordion. Op mobiel verschijnt het passende voorbeeld direct bij het geopende dienstpaneel, samen met uitleg en actie. Zo zie je het verband tussen dienst en werk zonder terug te scrollen naar het grote voorbeeld bovenaan. Het eerste voorbeeld kan de sectionintro ondersteunen; vermijd hetzelfde beeld tweemaal in de mobiele compositie. | Selectie gebeurt door tikken, niet automatisch door scrollen. Paneel opent circa 220–280 ms; voorbeeld krijgt maximaal 8 px beweging en een korte fade. Het openen duwt de volgende inhoud natuurlijk omlaag. Focus blijft op de gekozen knop. Snel wisselen is direct onderbreekbaar. |
| 7. ‘Mooi is de ondergrens’ | Het bestaande donkere vlak vormt een bewuste rustwisseling. Een koraallijn groeit vanuit links; de titel komt als twee leesbare regels samen. De vijf principes worden per rij ondersteund met een lijn die zich uittekent. Tekst blijft vanaf het begin voldoende contrastrijk. | Geen vijf afzonderlijke gedwongen scrollstappen en geen desktopstroken die op een smal scherm door elkaar schuiven. Principes en slotzin blijven na hun aankomst stil. Het donkere vlak schuift met de normale pagina mee. |
| 8. Prijzen | Intro en eerste aanbod volgen op het donkere kwaliteitsdeel. Elke formule vormt een eigen rustig hoofdstuk: titel → vanafprijs → inhoud → actie. De prijs arriveert als geheel, zonder teller of rollende cijfers. De bestaande terracotta webshop en donkere toepassing zorgen voor kleuraccenten. | Alleen een korte entree in de bovenkant van elk hoofdstuk, circa 12 px. Daarna alles stabiel. Geen sticky prijskaarten: de inhoud is op een telefoon hoger dan één viewport. Geen vervagende btw-informatie, maandkosten of voorwaarden. |
| 9. Kosten en voorwaarden | Een rustige leespauze. Bestaande voorwaarden en standaard geopende details behouden. Hooguit de scheidingslijn of sectietitel licht opbouwen. Rekenvoorbeeld en bedragen blijven statisch. | Geen scrubbing op tabellen of lopende tekst. Accordion blijft direct te bedienen; gewijzigde hoogte herberekent de latere lokale scènes. |
| 10. Kevin | Het kustbeeld en portret verwijzen terug naar de opening. Het kustvlak schuift maximaal circa 10 px opzij; het portret komt circa 12 px naar zijn eindpositie en schaal 0,98 → 1. De bestaande kop en tekst volgen in documentvolgorde. | Eén compact beeldmoment binnen de bestaande hoogte. Geen fullscreen 3D-vlucht of muisgestuurde kanteling. Portret en contactlink blijven na aankomst stil. |
| 11. FAQ | De titel krijgt een korte lijnopbouw; de vragen blijven gewone, stabiele bedieningselementen. Openen mag een korte, onderbreekbare hoogteovergang krijgen zolang het bestaande focus- en detailsgedrag behouden blijft. | Geen automatische opening door scrollen. Geen vertraagde reeks waarbij je op de laatste vraag moet wachten. |
| 12. Contact en footer | Het contactvlak rondt de reis af met een rustige entree van de grote vraag. Contactopties blijven vanaf hun aankomst zichtbaar en stil. Footer volgt zonder extra decoratief slotstuk. | Geen animaties op invoervelden, verzendstatus of foutmeldingen. Het formulier, sluiten, toetsenbord en chat moeten zonder bewegingsconflict werken. |

## Bewegingsregels

- **Eén herkenbare signatuur:** de kustfoto draagt de compositie over aan het portfolio. De overige effecten ondersteunen de inhoudelijke overgang; ze herhalen niet telkens dezelfde grote entree.
- **Twee soorten beweging:** opening en kleine beeldverplaatsingen volgen de scrollpositie; eenmalige entrees en tikfeedback hebben een korte duur. Scrollgestuurde beweging krijgt geen lange springvertraging achter de vinger.
- **Terugscrollen:** de opening is volledig omkeerbaar vanuit dezelfde scrollpositie. Projectbeelden mogen hun kleine dieptepad terugvolgen, maar eenmaal verschenen leesinhoud blijft zichtbaar. Geen herhaalde kopintro bij elke kleine veeg omhoog.
- **Snel swipen:** de juiste actuele eindstand verschijnt direct. Geen opgebouwde wachtrij van vertraagde animaties en geen blokkerende overgang.
- **Tikfeedback:** direct op indrukken, circa 100–150 ms; geen hover als voorwaarde voor informatie of bediening. Aanraakdoelen minimaal 44 × 44 px.
- **Leesruimte:** alleen het korte openingsmoment mag tekstlagen binnen een vaste scène gebruiken. De rest houdt een echte inhoudshoogte. Ook bij grotere tekst of 320 px breedte moet alle inhoud passen.
- **Rust:** geen automatische projectvideo's op mobiel, continue zwevende elementen, zware blur, velocity-kanteling of achtergrondanimatie over de hele pagina.

## Toegankelijkheid en robuust gedrag

- Zonder JavaScript staat de bestaande leesbare pagina er. Animatie is een verbetering bovenop zichtbare inhoud, geen toegangspoort tot de inhoud.
- Bij minder beweging: normale documentstroom, geen pin, parallax, schaal- of schuifbewegingen. Hooguit een korte fade voor directe interactie; alle informatie direct beschikbaar.
- De huidige Hero-varianten verdienen in de mobiele tak expliciete aandacht: `useReducedMotion` schakelt de bestaande regel- en fadevarianten niet overal uit. De mobiele uitvoering moet deze werkelijk statisch maken zonder de desktopvariant te wijzigen.
- Geen dubbele H1, dubbele section-ID's of twee toegankelijke versies van hetzelfde project. Decoratieve miniaturen krijgen lege alt-tekst en zijn niet focusbaar.
- De echte eerste case-afbeelding is de toegankelijke bestemming van de opening; decoratieve kopieën verdwijnen voordat ze bediening kunnen overlappen. Verborgen scènelagen krijgen geen pointer-events of focus.
- Directe links naar `#home`, `#resultaten`, `#projecten`, `#werkwijze`, `#prijzen`, `#over-ons`, `#faq` en `#contact` landen bij zichtbare inhoud onder de header. Een anker naar het portfolio landt op de leesbare intro/eerste case, niet midden in een onzichtbaar overgangsframe.
- Browser terug/vooruit en herstel van scrollpositie mogen geen entree bovenaan afdwingen. Bij resize of rotatie blijft het dichtstbijzijnde inhoudsanker leidend als de renderroute moet wisselen.
- Pin alleen als de herocompositie inclusief tekst werkelijk past. Gebruik een stabiele viewportmaat; het verschijnen en verdwijnen van de mobiele browserbalk mag de tijdlijn niet voortdurend opnieuw indelen.
- Het dienstenvoorbeeld wordt mobiel bij het actieve paneel gerenderd met dezelfde data. Desktop houdt zijn huidige visual en accordion; geen dubbele toegankelijke panelen.
- ContactFooter wordt ook elders gebruikt. Eventuele homepagebeweging daar krijgt een expliciete mobiele homepagevoorwaarde.

## Technisch uitvoeringsplan

### 1. Eerst desktop vastleggen

Leg de bestaande desktoptoestanden lokaal vast bij vaste viewport- en scrollposities: hero, mozaïek, project, dienstenovergang, diensten, kwaliteit, prijs en About. Gebruik de huidige werkboom als uitgangspunt, inclusief al aanwezige wijzigingen. Leg ook ankerbestemmingen en de lage desktopfallback vast.

### 2. Een geïsoleerde mobiele route

Voeg een mobiele orchestrator toe, bijvoorbeeld `MobileHomeChoreography.tsx` met eigen CSS-module en kleine lokale scènecomponenten. Houd `AnimatedGallery` en de desktopberekeningen intact. Koppel de mobiele route via een aparte, elkaar uitsluitende viewportvoorwaarde. Behoud een statische route voor reduced motion en ontbrekende ondersteuning.

Hergebruik projectdata en inhoudscomponenten. Trek alleen gedeelde presentatie uit een bestaand bestand als dat noodzakelijk is; verander daarbij de desktopmarkup en het desktopgedrag niet. Mobiele afwijkingen komen in nieuwe wrappers of expliciete mobiele props met bestaande defaults. Voorkom dat tegelijk een statische en geanimeerde homepage met dezelfde ID's gemount zijn.

De mobiele orchestrator regisseert in eerste instantie hero, opening en portfolio/diensten. Quality, Offer en About houden hun bestaande plaats in `App.tsx` en krijgen uitsluitend lokale mobiele wrappers of varianten. FAQ en ContactFooter krijgen alleen de afgesproken lichte ondersteuning. Daardoor hoeft de hele homepage niet op één kwetsbare scrolllengte te steunen.

### 3. Het signatuurmoment eerst bouwen

Bouw en beoordeel hero → portfolio op een smalle en een gemiddelde telefoon. De compositie moet ook halverwege, bij terugscrollen en bij een snelle veeg overtuigen. Pas daarna de verdere scènes toe. Laat de eerste projectmedia visueel exact aansluiten op de decoratieve opening, zonder een tweede download of verspringende verhoudingen.

### 4. De volledige verhaallijn afwerken

Werk projecten, mobiele dienstenpanelen, kwaliteitsdeel, prijzen en About in die volgorde uit. Voeg daarna FAQ- en contactaccenten toe. Houd inhoudelijke tekst en data gelijk. Stem de bewegingen op elkaar af in één volledige scrolldoorgang.

### 5. Prestatiebudget

- Buiten de opening geen extra scrollafstand; totale extra lengte maximaal 0,65 scherm bovenop de inhoudshoogte. De nieuwe plaats van dienstenbeelden kan de inhoudshoogte veranderen en wordt apart gemeten.
- In gewone scènes maximaal twee grote beeldlagen tegelijk in beweging. Tijdens de opening kort maximaal drie miniaturen plus het hero-/overgangsvlak.
- Gebruik hoofdzakelijk `transform` en `opacity`; maskeer hooguit beperkte kopregels. Geen geanimeerde fullscreen blur of zware schaduwen.
- Geen React-state-update op iedere scrollframe. MotionValues voor continue voortgang; React-state alleen voor echte interacties of hoofdstukwissels.
- Geen permanent `will-change` over alle tien projecten. Beeldmaten reserveren, assets hergebruiken, lagere projectbeelden lazy-loaden en geen mobiele casevideo's laden voor de choreografie.
- Streef naar vloeiende weergave op 60 Hz; bevestig dat met een trace en fysieke toestellen. Een desktopbrowser met mobiele viewport bewijst dit niet.

## Controle en acceptatie

| Controle | Vereist resultaat |
| --- | --- |
| 320 × 568, 375 × 667, 390 × 844, 430 × 932 | Alle teksten en acties bereikbaar, geen horizontale overflow, geen afgesneden hero of sticky inhoud. |
| 768 × 1024 en 820 × 1180 | Mobiele structuur klopt ook op tablet, leesbare compositie zonder desktoplagen. |
| Lage landscape-viewport | Normale doorstroom; geen te hoge vaste scène. |
| Scroll vooruit, achteruit en snel | Directe respons, geen witte/leegvallende frames, geen vertraagde animatiewachtrij. |
| Diensten en FAQ tussentijds openen | Hoogte groeit natuurlijk; latere scènes blijven correct gekoppeld aan hun eigen positie. |
| Alle genoemde hashes, interne knoppen en browsergeschiedenis | Zichtbare juiste bestemming, geen focus op verborgen lagen of dubbele IDs. |
| Reduced motion, JavaScript uit, grotere tekst | Volledige leesbare inhoud, statische bruikbare terugval. |
| Formulier en mobiel toetsenbord | Invoer, sluiten, fout/succes en scroll blijven normaal werken. |
| Echt iOS Safari en Android Chrome | Browserbalk, momentum, touch en rotatie fysiek controleren. Emulatie afzonderlijk rapporteren. |
| Desktop 1440 × 900 en 1920 × 1080 | Dezelfde vastgelegde scènes en timing als vóór de implementatie; afwijkingen moeten opgelost worden. |
| Grens 999/1000 px en hoogte 649/650 px | De bestaande desktopselectie blijft exact werken; geen dubbele of ontbrekende inhoud bij de wissel. |
| Desktop met minder beweging of lage viewport | Bestaande fallback behouden. |
| Build en bestaande controles | Productiebuild en aanwezige SEO-/regiocontroles slagen; geen nieuwe runtimefouten. |

Uitvoering is klaar wanneer de volledige mobiele reis visueel gecontroleerd is, de leesstukken rustig blijven, ankers/interacties werken en de desktopvergelijking geen onbedoelde verschillen toont. Een fysieke toestelcontrole die niet beschikbaar is, wordt expliciet als open controle gerapporteerd.

## Oplevering in drie stappen

1. Geïsoleerde mobiele basis plus hero-naar-werkovergang, met desktopvergelijking.
2. Alle vervolgscènes en bediening, met stabiele leesfasen en reduced motion.
3. Visuele afstelling, prestatiecontrole, apparaatcontrole en definitieve regressiecontrole.

De mobiele uitvoering is toegevoegd via eigen componenten en stijlen. De bestaande desktopregie is behouden. Zie het opleveringsdocument voor de uitgevoerde controles en de resterende fysieke toestelcontrole.
