# Diepe tekstaudit — Webaanzee

**Uitvoering:** de tekstcorrecties zijn op 22 oktober 2026 doorgevoerd. Zie het uitvoeringsverslag onderaan. De oorspronkelijke audit hieronder blijft als momentopname bewaard; citaten en regelnummers verwijzen naar de versie van vóór de correcties.

Datum: 22 oktober 2026. Onderzocht: de huidige lokale broncode en de daarvan gegenereerde pagina’s. Dit is een redactionele audit, geen volledige visuele, technische, juridische of externe feitencontrole. De websiteteksten zijn niet gewijzigd.

## Oordeel

De site klinkt op de homepage meestal verzorgd, maar blijft te vaak steken in wat vrijwel elk webbureau kan zeggen: helder, sterk, eigen, op maat, vertrouwen, digitale ervaring. De klantenkaartpagina klinkt opvallend ouder en schreeuweriger. De gegenereerde diensten-, regio- en casepagina’s hebben veel tekst, maar relatief weinig specifieke informatie die een aankoopbeslissing ondersteunt.

Het grootste probleem is **schijnbare concreetheid**: een afgeronde zin lijkt iets uit te leggen, maar laat de relevante vraag onbeantwoord. “Een samenhangende website waarop bezoekers het aanbod kunnen verkennen” is bijvoorbeeld geen betekenisvol projectresultaat. “Transparante investering” is geen transparante prijsuitleg zolang de vervolgkosten alleen in verborgen metadata staan.

Er zijn geen klassieke lorem-ipsumteksten gevonden in de onderzochte websitebronnen. Er zijn wel inhoudelijke placeholders: herbruikbare caseverhalen, algemene resultaatzinnen, interne projectstatus in publiekscopy, onbevestigde claims en voorbeeldgegevens zonder duidelijke context.

## Reikwijdte en methode

- Alle actieve React-tekstcomponenten gelezen, inclusief de geanimeerde en statische versies van de homepage.
- De bron voor alle 27 gegenereerde pagina’s gelezen: vier diensten, tien regiopagina’s, tien cases, de kusthub, het caseoverzicht en de inzichtenpagina. Met de vier overige canonieke routes rapporteert de generator 31 URL’s. Privacy en 404 vallen buiten die canonieke lijst en zijn ook onderzocht.
- Ook privacy, cookies, het blogartikel, beide productpagina’s, 404-copy, contactmeldingen, metadata en gestructureerde data onderzocht.
- Lokaal in de browser de gerenderde homepage, klantenkaartpagina en COZY-case gecontroleerd. Andere pagina’s en verborgen toestanden zijn op broncode beoordeeld; geen claim van volledige visuele controle van alle pagina’s of schermformaten.
- Niet-actieve componenten afzonderlijk gemarkeerd. Gegenereerde HTML is uitvoer: blijvende correcties horen in `scripts/generate-seo-pages.mjs`.
- Geen productfuncties, bezoekersaantallen, klantrelaties, commerciële voorwaarden of operationele prestaties extern bevestigd. Een claim die verificatie vraagt, wordt hier niet automatisch onwaar genoemd.

### Prioriteiten

**P1 — eerst:** tegenstrijdige prijzen, ontbrekende beslisinformatie, absolute garanties, misleidende actielabels en publieke interne status. **P2 — herschrijven:** generieke inhoud, clichétaal, jargon en herhaling. **P3 — verfijnen:** spelling, register, hoofdletters en kleine labels. Dit zijn redactionele prioriteiten; geen technische incidentclassificatie.

Voorstellen zijn conceptcopy op basis van wat in de bron staat. Waar inhoud ontbreekt, staat expliciet wat eerst moet worden vastgesteld. Er worden geen nieuwe resultaten of garanties voorgesteld.

## 1. Homepage: positionering, diensten en kwaliteit

Bronnen: [Hero](/Users/kevin/PROJECTS/webaanzee.be/components/Hero.tsx:74), [diensten](/Users/kevin/PROJECTS/webaanzee.be/components/ProblemSolution.tsx:7), [portfolio-opening](/Users/kevin/PROJECTS/webaanzee.be/components/PortfolioDepth.tsx:27), [kwaliteit](/Users/kevin/PROJECTS/webaanzee.be/components/Quality.tsx:5).

| ID | Prio | Huidige tekst / locatie | Diagnose en redactionele ingreep |
|---|---|---|---|
| 01 | P2 | “Je beste werk verdient een website op hetzelfde niveau.” — Hero 80–83 | Verzorgd, maar het veelgebruikte “je verdient”-patroon is vooral bevestiging. Het mag als enige merkzin blijven, mits de alinea eronder concreet wordt. Alternatieve richting: “Websites voor zaken die hun vak kennen.” Niet automatisch sterker: beoordeel samen met doelgroep en beelden. |
| 02 | P2 | “onderscheidende websites … online even sterk willen overkomen” — Hero 88 | Herhaalt de kop met andere bijvoeglijke woorden. Vervang door het aanbod en de samenwerking: “Ik ontwerp en bouw websites, webshops en toepassingen voor ondernemers aan de Belgische kust. Je werkt rechtstreeks met mij, van eerste gesprek tot oplevering.” |
| 03 | P2 | “Ontworpen om op te vallen. Gebouwd om te werken.” — PortfolioDepth 28 | Bekende bureauslogan; opvallend en functioneel zijn basisverwachtingen. Richting: “Een koffiebar, een skateshop, een kustgids. Drie heel andere websites.” Laat de echte diversiteit van het portfolio de kwaliteit aantonen. |
| 04 | P2 | “ieder project krijgt een eigen visuele wereld” — PortfolioDepth 29 | Ontwerperstaal die weinig zegt over de opdracht. “Hier zie je wat ik bouwde voor lokale zaken, organisaties en eigen digitale producten” is duidelijker, zodra de projectrelaties zijn vastgesteld. |
| 05 | P2 | “Niet zomaar online. Onmiskenbaar van jou.” — ProblemSolution 57–59 en 75 | Formulematige tegenstelling en abstracte identiteitsbelofte. Overweeg een functionele sectiekop: “Wat moet je website voor je zaak doen?” Daarna de diensten als concrete antwoorden presenteren. |
| 06 | P2 | “één rechtstreeks traject … één digitale ervaring die tot in de details klopt” — ProblemSolution 78 | Lang en abstract; rechtstreeks hoort eerder bij contact dan bij een traject. Voorstel: “Ik ontwerp én bouw je website. Zo bespreek je inhoud, vormgeving en techniek met dezelfde persoon.” |
| 07 | P2 | “Een eigen gezicht. Tot in de details.” / “Van eerste indruk tot laatste klik.” / “Slim gebouwd. Voelbaar eenvoudiger.” — ProblemSolution 8–10 | Drie decoratieve slogans bovenop al aanwezige dienstteksten. Vervang per voorbeeld door de concrete toepassing: “Drankkaart en praktische info voor COZY”, “Een webshop voor Daily Grind”, “Kassa en voorraad in één toepassing”. Controleer de precieze scope. |
| 08 | P2 | “Zelf de touwtjes in handen?” en “Alles overzichtelijk op één plek” — ProblemSolution 11 | Twee clichés rond een bruikbare functie. Kern behouden: “Pas zelf teksten en foto’s aan via je eigen beheerscherm.” Bezoekersstatistieken apart noemen en verduidelijken of die standaard inbegrepen zijn. |
| 09 | P1 | “volg je bezoekers en resultaten op” — ProblemSolution 11 | Lijkt standaard onderdeel van het dashboard, maar het CMS-aanbod specificeert alleen inhoudsbeheer. Vaststellen welke statistieken beschikbaar zijn en in welk pakket. Daarna exact noemen; niet impliciet een analyseproduct meeverkopen. |
| 10 | P2 | “Lokale groei” / “Dicht bij je zaak. Dicht bij je klant.” — ProblemSolution 12 | Groeibelofte boven een beschrijving van techniek en regiopagina’s. “Lokale vindbaarheid” past beter bij de genoemde werkzaamheden. Voeg toe wat werkelijk geleverd wordt; geen groei impliceren zonder resultaatbewijs. |
| 11 | P2 | “Mooi is de ondergrens.” — Quality 18, 52 en 87 | Kan als scherpe merkzin werken. De uitwerking maakt hem generiek: vijf keer vertellen dat basiskwaliteit moet kloppen. Behoud eventueel de kop, maar vervang de checklist door concrete keuzes of aantoonbare controles. |
| 12 | P2 | “De structuur moet kloppen”, “De tekst moet helder zijn”, “logisch voelen” — Quality 5–10 | Beschrijft gewenste gevoelens, geen aanpak. Richting: “Bezoekers vinden je aanbod en contactgegevens zonder zoeken”; “Elke pagina heeft een duidelijke volgende stap”. Alleen meetbare testclaims toevoegen wanneer die werkelijk worden uitgevoerd. |
| 13 | P2 | “indruk maken in een screenshot” / “wanneer echte mensen hem gebruiken” — Quality 66–67 en 92–93 | Spreekt vanuit de ontwerpwereld en maakt gewoon gebruik onnodig plechtig. Bovendien springt “het resultaat” naar “hem”. Voorstel: “Bezoekers moeten je aanbod begrijpen, je informatie vinden en contact kunnen opnemen.” |

## 2. Portfolio en caseverhalen

Bronnen: [homepageprojecten](/Users/kevin/PROJECTS/webaanzee.be/components/Proof.tsx:23), [casedata](/Users/kevin/PROJECTS/webaanzee.be/scripts/generate-seo-pages.mjs:106), [case-template](/Users/kevin/PROJECTS/webaanzee.be/scripts/generate-seo-pages.mjs:170), [navigatie](/Users/kevin/PROJECTS/webaanzee.be/components/Header.tsx:55).

| ID | Prio | Huidige tekst / locatie | Diagnose en redactionele ingreep |
|---|---|---|---|
| 14 | P1 | “Resultaten” — Header 56 en 83 | De bestemming toont vooral projecten en functies. Dat is een portfolio, geen verzameling bewezen resultaten. Gebruik “Werk” of “Projecten”, of voeg per project aantoonbare uitkomsten toe. |
| 15 | P2 | “Van idee naar een sterke digitale ervaring.” — generator 171 | Identieke ondertitel voor alle tien cases. Dit is inhoudelijk een placeholder. Geef elke case een eigen opdrachtkop, bijvoorbeeld “Drankkaart en digitale spaarkaart voor een koffie- en cocktailbar.” |
| 16 | P2 | “Een helder vertrekpunt.” / “Ontworpen rond de bezoeker.” — generator 171 | Dezelfde nietszeggende subkoppen op elke case. Gebruik de concrete uitdaging en ingreep als kop, zoals “Praktische informatie naast de sfeer van de zaak” en “Drankkaart en klantenkaart bereikbaar op mobiel”. |
| 17 | P2 | “Strategie / Design / Development” met identieke paragrafen — generator 171 | Drie blokken ogen als verdieping maar zijn herbruikbare bureautekst. Vervang door drie projectspecifieke keuzes of schrap. Nodig: wat moest hier anders dan bij de andere negen projecten? |
| 18 | P1 | “Pieken tot 98.000 bezoekers per maand” — Proof 37; generator 107 | Sterk potentieel bewijs, maar periode, meetbron en definitie ontbreken. “Volgens de projecteigenaar” in de case is geen reproduceerbare onderbouwing en klinkt afstandelijk. Eerst vastleggen: bezoekers of sessies, welke maand/jaar, welke analysetool. Daarna de homepage en case exact gelijk formuleren. |
| 19 | P2 | “Een herkenbare vaste waarde” / stickers / “Opgepikt in krantenartikels” — Proof 35–39 | Algemene reputatieclaims. Alleen het eerste feit wordt nu via ProjectCopy getoond; overige claims zijn broninhoud. Bij hergebruik concrete publicaties en data noemen; een perslink overtuigt meer dan de claim. |
| 20 | P2 | Fabrice: “een eigen informatiekanaal” — generator 108 | Beschrijft het bestaan van een website. Verdiepen met wat de maker concreet oploste voor nieuws, standpunten en contact. Verifieer ook de actuele functiebenaming vóór publicatie; die is in deze audit niet extern gecontroleerd. |
| 21 | P2 | Carabus: “eigen conversiegerichte bestemming voor verkeer” — generator 109 | Jargon en een resultaat zonder conversiegegevens. Beschrijf de gerealiseerde structuur of aanvraagroute. Alleen zeggen dat conversie verbeterde wanneer er vergelijkbare metingen zijn. |
| 22 | P2 | COZY: “één herkenbare digitale plek” — generator 110 | De samenvatting over drankkaart en spaarkaart is sterker dan de resultaatzin. Werk een concrete keuze uit: waar vindt een bezoeker de kaart, hoe komt die bij de spaarkaart, wat beheert de zaak zelf? |
| 23 | P2 | Daily Grind: “digitale verlenging van de lokale skatescene” — generator 111; “core skateshop”, “skatepark guide” — Proof 76 | De merkcontext is nuttig; de formulering blijft vaag voor een potentiële opdrachtgever. Beschrijf de verhouding tussen webshop en lokale skate-informatie. Behoud vaktaal alleen als die nodig is om de winkel te typeren. |
| 24 | P2 | De Wulk: “kan haar kwaliteit en assortiment nu buiten de winkel tonen” — generator 112 | Geldt voor vrijwel elke winkelwebsite. De praktische klantvraag in `challenge` is goed. Beschrijf vervolgens hoe aanbod en bestelinformatie daarvoor zijn ingericht. Niet impliceren dat een online bestelmodule bestaat als het alleen om contactinformatie gaat. |
| 25 | P2 | Atelier: “bezoekers die schoonheid én onderbouwing verwachten” — generator 113 | Sfeervol, maar nauwelijks een uitkomst. De collectie, herkomst en documentatie zijn het specifieke verhaal. Leg uit hoe die informatie bij een object samenkomt, na controle van de werkelijke bouwscope. |
| 26 | P1 | PWAYMENT: “Een eigen productbasis die verder kan groeien” — generator 114 | Klinkt als een tussenstadium, terwijl de productpagina een inzetbaar platform presenteert. Benoem de werkelijke status: eigen product, demo, pilot of operationeel systeem. Een Vercel-URL bewijst op zichzelf geen prototype-status. |
| 27 | P2 | MyGrowise: “Een samenhangende website … een volgende stap kunnen kiezen” — generator 115 | Inhoudelijk een placeholder. Profielen, modules en begeleiding zijn concreter. Benoem welke routes gerealiseerd zijn en welke projectfase wordt getoond, zonder zorguitkomsten te suggereren. |
| 28 | P2 | Welzijnswerking: “duidelijke inschrijfroute via de ontmoetingscentra” — Proof 128; generator 116 | Deze case is relatief specifiek en verdient behoud. “Warme evenementensite” is overbodig. Maak bij resultaat expliciet dat inschrijving via de ontmoetingscentra verloopt; geen online inschrijving insinueren. |
| 29 | P1 | Alle projecten onder één portfolio zonder relatiestatus | Homepage en cases maken weinig onderscheid tussen klantopdrachten en eigen producten/platforms. Stel dat eerst vast en label het waar relevant. Dat maakt de bewijsvoering eerlijker en helpt bezoekers het soort ervaring beoordelen. |

## 3. Aanbod, prijzen, FAQ en over Kevin

Bronnen: [aanbod](/Users/kevin/PROJECTS/webaanzee.be/components/Offer.tsx:14), [FAQ](/Users/kevin/PROJECTS/webaanzee.be/components/FAQ.tsx:6), [About](/Users/kevin/PROJECTS/webaanzee.be/components/About.tsx:89), [prijzenbron](/Users/kevin/PROJECTS/webaanzee.be/data/pricing.mjs:1).

| ID | Prio | Huidige tekst / locatie | Diagnose en redactionele ingreep |
|---|---|---|---|
| 30 | P2 | “Goed werk. Een heldere prijs.” / “Je mag dus weten wat je krijgt” — Offer 16–17 | Zelfkwalificatie plus uitleg over transparantie. Functioneler: “Wat kost je website?” gevolgd door “Dit is inbegrepen in de startprijs. Hosting en beheer staan apart.” De bestaande specificaties leveren het bewijs. |
| 31 | P2 | “Mag het meer doen?” / “Meer mogelijk. Op maat.” — Offer 49, 144 en 174 | De lezer moet uit de rest afleiden dat het over webshop en webapplicatie gaat. Noem die categorieën in de kop. Bij de webapplicatie: “Een toepassing voor je dagelijkse werk.” |
| 32 | P2 | “Een heldere basis, volledig voor jouw zaak ontworpen” — Offer 27 | Voegt niets toe aan “Website op maat”. Schrappen, of vervangen door een relevante geschiktheidsgrens: bijvoorbeeld wanneer zelf inhoud beheren niet nodig is. |
| 33 | P2 | “Verkopen of je werk vereenvoudigen vraagt een andere aanpak” — Offer 43 | Vermengt webshop en automatisatie in het webshopaanbod. Gebruik de ruimte voor ontbrekende scope: productvarianten, aantallen talen, inbegrepen verzendingconfiguratie of wat de klant aanlevert. Eerst vaststellen, niet invullen op gevoel. |
| 34 | P2 | “Website. Eigen CMS.” / “één inhoudstype” — Offer 33–37; FAQ 12 | CMS is jargon en inhoudstype heeft uitleg nodig. De bestaande voorbeelden helpen. Gebruik bij voorkeur “Website die je zelf kunt aanpassen” en noem in dezelfde kaart dat bijvoorbeeld nieuws óf projecten beheerbaar wordt. |
| 35 | P1 | “Krijg ik hulp met tekst en beelden? Ja.” — FAQ 21 tegenover Offer 188 en 190 | Prijsvoorwaarden zeggen dat inhoud wordt aangeleverd en tekstschrijven/fotografie apart worden begroot. De FAQ maakt de grens niet duidelijk. Voorstel: “Ik help je bepalen welke teksten en beelden nodig zijn. Tekstschrijven, fotografie en vertalingen neem ik op in de offerte als je die wilt laten verzorgen.” Bevestig wat de inbegrepen begeleiding omvat. |
| 36 | P2 | “Hoe lang duurt een traject? Dat hangt af…” — FAQ 14 | Geen bruikbare indicatie. Verzamel echte doorlooptijden per type project en benoem de voorwaarde van tijdig aangeleverde inhoud. Zonder betrouwbare bandbreedte uitleggen welke informatie nodig is om een planning te geven. Geen willekeurig aantal weken toevoegen. |
| 37 | P2 | “Voor wie … een goede match?” — FAQ 10 | Antwoord omvat bijna iedereen en herhaalt uitstraling/contact. Maak duidelijk welk type samenwerking en budget past. Gebruik de bestaande startprijzen en scope; vermijd onnodig uitsluitende bravoure. |
| 38 | P2 | “Wat gebeurt er na de lancering?” — FAQ 23 | Het antwoord is vrijwel alleen een tarievenblok. Voeg de operationele kant toe: wie meldt een probleem, wat valt onder beheer en hoe wordt een wijziging aangevraagd? Beloof geen reactietijd zonder afspraak. |
| 39 | P2 | “goede zichtbaarheid groeit … gerichte optimalisatie” — FAQ 22 | Voorzichtig maar weinig afgebakend. Maak onderscheid tussen de technische zoekmachinebasis in de bouwprijs en latere inhoudelijke/SEO-werkzaamheden. “Welke werkzaamheden zitten in mijn offerte?” is de beslisvraag. |
| 40 | P2 | “Heldere antwoorden. Voor je beslist.” plus intro — FAQ 35–37 | Label, kop en intro kondigen driemaal dezelfde FAQ aan. “Vragen over je website” is voldoende; behoud alleen een intro als die extra informatie geeft. |
| 41 | P2 | “ik blijf betrokken tot je website live staat” — About 91 | De zin stopt de persoonlijke betrokkenheid bij oplevering, terwijl elders nazorg wordt benadrukt. Verduidelijk de echte rol ná oplevering in plaats van automatisch “en daarna” te beloven. |
| 42 | P2 | “Dat maakt beslissingen sneller en het eindresultaat sterker” — About 92 | Een gevolg claimen is zwakker dan het voordeel laten zien. “Je hoeft je vraag niet opnieuw uit te leggen aan een volgende medewerker” is concreter, indien passend bij de werkelijke samenwerking. De eerste zin “Ik ben Kevin” behouden. |
| 43 | P3 | “scope”, “inhoudstypes”, “SSL”, “CMS/dashboard”, “developer” | Gebruik klanttaal in de uitleg: omvang, soorten inhoud, beveiligde verbinding, beheerscherm, ontwikkelaar. Technische namen kunnen bij de eerste vermelding tussen haakjes staan. Niet elk bekend woord hoeft kunstmatig vertaald. |

## 4. Contact, formulier en systeemmeldingen

Bronnen: [contact](/Users/kevin/PROJECTS/webaanzee.be/components/ContactFooter.tsx:84), [formulier](/Users/kevin/PROJECTS/webaanzee.be/components/ContactFooter.tsx:177), [API-meldingen](/Users/kevin/PROJECTS/webaanzee.be/api/contact.ts:22), [Header](/Users/kevin/PROJECTS/webaanzee.be/components/Header.tsx:61).

| ID | Prio | Huidige tekst / locatie | Diagnose en redactionele ingreep |
|---|---|---|---|
| 44 | P1 | “Plan een gesprek” — Header, Hero, Offer en blog | De knop brengt de bezoeker naar contactmogelijkheden; er wordt geen tijdstip gekozen. Gebruik “Neem contact op” of “Bespreek je website”. Alleen “Plan” houden als de volgende stap werkelijk plannen is. |
| 45 | P2 | “Laten we kijken wat jouw zaak nodig heeft” — ContactFooter 92 | Bruikbaar maar algemeen. De alinea en tweede kop herhalen de uitnodiging. Eén directe kop is genoeg, bijvoorbeeld “Vertel me wat je wilt veranderen.” |
| 46 | P2 | “Je idee verdient een concreet antwoord.” — ContactFooter 101 | Nogmaals een “verdient”-zin, zonder extra informatie. Schrappen of vervangen door “Je spreekt met Kevin”. Het persoonlijke contact is een feit, de slogan niet. |
| 47 | P2 | “Handig als je vraag al even moet rijpen” — ContactFooter 119 | Geforceerd en onlogisch bij een berichtkanaal: waarom helpt WhatsApp een vraag rijpen? Voorstel: “Stuur je vraag via WhatsApp.” |
| 48 | P2 | “Ik lees mee en antwoord persoonlijk” — ContactFooter 126 | “Meelezen” suggereert iemand anders’ gesprek. Voorstel: “Stuur Kevin een bericht.” Of schrappen: persoonlijk antwoord staat al boven de kaarten. |
| 49 | P1 | Kaart “E-mail” / “Vertel je idee” opent een modal — ContactFooter 123–125 | De verwachting is een mailprogramma, de uitkomst een formulier. Gebruik “Contactformulier” en “Stuur een bericht”, of maak de kaart een echte e-maillink. De footer heeft al een rechtstreekse mailoptie. |
| 50 | P2 | “Meestal krijg je dezelfde werkdag antwoord” / “Bel wanneer het je past” — ContactFooter 102 en 112 | Eerste is een operationele verwachting, tweede kan onbeperkte bereikbaarheid suggereren. Bevestig de reactietijd; vervang de belsubtekst door iets zonder tijdsbelofte of publiceer echte bereikbaarheid. |
| 51 | P2 | Placeholders “Je naam”, “Je e-mail”, “Waar kan ik mee helpen?” — ContactFooter 186–203 | Dit zijn normale formulierplaceholders, geen onafgewerkte content. Wel verdwijnen de enige zichtbare veldnamen bij typen, omdat de labels verborgen zijn. Toon blijvende labels en vermeld verplichte velden. Voeg eventueel als voorbeeld toe: “Wat doet je zaak en wat wil je laten maken of verbeteren?” |
| 52 | P2 | “Versturen…” / “Versturen” / “Bedankt. Je bericht is verzonden; ik antwoord persoonlijk.” — ContactFooter 36 en 205 | Functioneel, maar “Bericht versturen” is specifieker. Succes: “Je bericht is verzonden. Ik neem contact met je op via e-mail.” Gebruik dit alleen als opvolging werkelijk via e-mail gebeurt. |
| 53 | P1 | “Controleer uw naam, e-mailadres en bericht” — API 23 | Geen uitleg welk veld fout is en wisselt van je naar u. Noem de concrete eisen: naam minimaal twee tekens, geldig e-mailadres, bericht minimaal tien tekens. Idealiter per veld. |
| 54 | P2 | “Wacht even voordat u opnieuw verstuurt” — API 29 | “Even” is vermijdbaar: de grens is 30 seconden. Richting: “Wacht 30 seconden en probeer opnieuw.” Nog beter: resterende wachttijd tonen als het systeem die kan bepalen. |
| 55 | P1 | “De e-mailservice wordt nog geconfigureerd” — API 37 | Interne implementatiestatus als publieksmelding. Voorstel: “Het formulier is tijdelijk niet beschikbaar. Mail naar kevin@webaanzee.be.” Dit bewijst niet dat de productieconfiguratie ontbreekt; het is een aangetroffen foutpad. |
| 56 | P2 | Generieke fetch-fout kan rechtstreeks getoond worden — ContactFooter 38–40 | De gebruikersmelding kan browsertaal zoals “Failed to fetch” worden. Geef voor onbekende fouten één Nederlandse hersteltekst met de rechtstreekse e-maillink. De normale 502-melding heeft al een bruikbare herstelroute. |

## 5. Digitale klantenkaart: grootste herschrijfopgave

Bronnen: [features](/Users/kevin/PROJECTS/webaanzee.be/components/Klantenkaart.tsx:7), [hero](/Users/kevin/PROJECTS/webaanzee.be/components/Klantenkaart.tsx:108), [prijzen](/Users/kevin/PROJECTS/webaanzee.be/components/Klantenkaart.tsx:246), [metadata en verborgen FAQ](/Users/kevin/PROJECTS/webaanzee.be/klantenkaart.html:1).

| ID | Prio | Huidige tekst / locatie | Diagnose en redactionele ingreep |
|---|---|---|---|
| 57 | P2 | “De Toekomst van Klantenbinding” — 108 | Holle toekomstclaim, onnodige hoofdletters. Vervang door “Digitale spaarkaart voor horeca”. Dat vertelt meteen wat het is en voor wie. |
| 58 | P2 | “Digitale Klantenkaart & Management Dashboard” — 110–112 | Productfunctie als zwaar managementlabel. Richting: “Een digitale spaarkaart in de huisstijl van je zaak.” Leg het beheer daarna uit. Kies overal bewust voor je of u. |
| 59 | P1 | “Verhoog uw omzet, behoud klanten” — 115 | Commerciële effecten worden als rechtstreeks resultaat voorgesteld zonder bewijs in de pagina. Beschrijf de werking: “Laat klanten digitaal sparen en beheer je beloningen via een eigen dashboard.” Het exacte spaarmechanisme eerst bevestigen. |
| 60 | P2 | “slimme, datagedreven oplossing” / “één krachtig dashboard” / “Stop met plastic pasjes” — 115 | Stapeling van verkoopwoorden; plastic sluit niet aan op zaken met papieren stempelkaarten. Benoem QR-code, browser en beloningen. De concrete paragraaf over geen app downloaden is hiervoor de beste bestaande basis. |
| 61 | P2 | “Een naadloze ervaring” / “Complete Controle” / “analyseer … real-time” — 147 en 180–181 | Absolute of abstracte taal. Voorstel: “Klanten openen hun kaart in de browser. Jij beheert het aanbod en bekijkt de geregistreerde bezoeken.” Controleer welke informatie werkelijk wordt bijgehouden. |
| 62 | P2 | “Ongeëvenaarde Functionaliteit” / “compleet arsenaal … volgende niveau” — 208–210 | Sterkste voorbeeld van geforceerde reclamecopy. Geen vergelijkingsbewijs, onnodig bombastisch. Vervangen door “Wat je kunt beheren”, met een korte concrete introductie of zonder intro. |
| 63 | P3 | “Website Koppeling”, “Klant Inzicht”, “Open Flessen Module”, “Fraude Preventie”, “Veilig Medewerker Beheer” — 9–55 | Engelse titelkapitalisatie en verkeerd gesplitste samenstellingen. Gebruik “Websitekoppeling”, “Klantinzichten”, “Open flessen bijhouden”, “Scans en correcties”, “Medewerkers beheren”. De laatste twee zijn ook begrijpelijker. |
| 64 | P1 | “Honderd procent traceerbaar en veilig” — 30 | Absolute veiligheidsclaim. De controleerbare kern is de historiek: “Bekijk eerdere scans en correcties in het overzicht.” Benoem alleen aanwezige logging en bevoegdheden; geen volledige veiligheid beloven. |
| 65 | P2 | “Een prachtig interface” / “optimaal leescomfort” — 35 | Verkeerd lidwoord plus zelflof. Voorstel: “De kaart ondersteunt een lichte en donkere weergave.” Vermeld automatische aanpassing alleen als die werkelijk werkt. |
| 66 | P2 | “Flitsende QR Scanner” / “die de klant … met de smartphone scant” — 39–40 | Onduidelijk wie wat scant. Cruciale productuitleg ontbreekt: scant de klant een bordje of scant de medewerker een klantkaart? Beide stappen apart beschrijven op basis van de werkelijke flow. “QR-scanner” correct schrijven. |
| 67 | P2 | “Gamification”, “hogere status”, “interactieve mijlpalen” — 44–45 en 153 | Niet duidelijk wat iemand spaart of ontvangt. Toon één echt voorbeeld met de feitelijke regels van de zaak. Geen fictieve beloning als bestaande functie presenteren. |
| 68 | P2 | “Verjaardag Tracking” / “klant-verbondenheid” — 49–50 | Onnatuurlijke mengtaal en spelling. “Verjaardagsbeloningen” is duidelijker. Vermeld in de productuitleg hoe de datum wordt aangeleverd als dat relevant is; geen automatische beschikbaarheid van die gegevens suggereren. |
| 69 | P2 | “Admin gedeelte … uiterst veilige en traceerbare manier” — 55 | Intern jargon en ongespecificeerde zekerheid. “Voeg medewerkers toe via het dashboard” is de feitelijke kern. Rollen en rechten alleen concreet noemen als ze aanwezig zijn. |
| 70 | P1 | “Transparante Investering” / “eerste jaar … €0” zonder zichtbare jaarprijs daarna — 247–249 | De verborgen FAQ noemt €250/jaar, de zichtbare prijstabel niet. Maak de bevestigde kosten vanaf jaar twee, btw-status, inbegrepen ondersteuning en opzegvoorwaarden zichtbaar bij elk relevant pakket. Niet zonder controle aannemen dat €250 voor alle pakketten geldt. |
| 71 | P1 | “Meest Gekozen” — 291 | Feitelijke populariteitsclaim zonder onderbouwing in de bron. Bevestig verkoopdata of schrap de badge. “Aanbevolen” kan alleen als er een inhoudelijke aanbeveling met reden achter zit. |
| 72 | P2 | “De perfecte start … zonder poespas” / “krachtige data en interactieve modules” — 267 en 298 | Basic productcopy; onderscheid tussen de pakketten blijft wollig. Beschrijf het concrete extra beheer dat Premium toevoegt. Essential moet een positieve, specifieke keuze zijn, geen superlatief. |
| 73 | P2 | “high-end … naadloos geïntegreerd” / “High-End Custom Website Design” / “Razendsnelle laadtijden & SEO” — 328–334 | Lege luxeclaims en onduidelijke levering. Specificeer het aantal pagina’s, de koppeling met de kaart, inhoudsbeheer en de inbegrepen zoekmachinebasis. Alleen feitelijk vastgelegde scope opnemen. |
| 74 | P1 | “Kies Essential / Premium / Website + App” — 278, 309 en 339 | Alle knoppen openen dezelfde WhatsApp-link zonder pakketkeuze. Dat is geen bestelactie. Gebruik “Vraag Essential aan via WhatsApp”, of geef de pakketnaam mee in een vooraf ingevuld bericht. |
| 75 | P1 | Website + App €1.350 tegenover hoofdsite CMS vanaf €3.950 | Niet noodzakelijk fout, wel onverklaard. Wat is bij dit pakket beperkter of anders? Maak duidelijk of het om een productgebonden template, een beperkte horecasite of een ander aanbod gaat. Geen reden verzinnen. |
| 76 | P1 | Verborgen FAQ: “Binnen 48 uur”, bezoek op locatie, tabletconfiguratie, €250/jaar, “geen wurgcontracten” — klantenkaart.html | Commerciële beloftes en voorwaarden bestaan alleen in JSON-LD, niet als zichtbare FAQ. Bevestig of ze gelden en maak geldende informatie zichtbaar. “Geen wurgcontracten” vervangen door de echte duur en opzegregeling. |
| 77 | P3 | “horeca in Kust en Brugge”, “minder papieren rommel” — klantenkaart.html | “In Kust” is onnatuurlijk en “rommel” klinkt kleinerend. Richting: “voor horecazaken aan de Belgische kust en in Brugge” en “zonder papieren spaarkaarten”. Controleer dat het werkgebied zo bedoeld is. |

## 6. PWAYMENT: vlakke copy en onduidelijke productgrenzen

Bronnen: [PWAYMENT](/Users/kevin/PROJECTS/webaanzee.be/pwayment.tsx:7), [metadata](/Users/kevin/PROJECTS/webaanzee.be/pwayment.html:1).

| ID | Prio | Huidige tekst / locatie | Diagnose en redactionele ingreep |
|---|---|---|---|
| 78 | P2 | “Alles wat u nodig heeft om sneller te verkopen” — 29 | Generieke totaalbelofte. Het product kan concreter: “Kassa, voorraad en klanten in één systeem.” Snelheidswinst pas claimen als de productflow die onderbouwt. |
| 79 | P1 | “Offline-first kassa · basis blijft gratis” — 35 | Twee belangrijke productbeloftes zonder zichtbare afbakening. Leg uit wat offline blijft werken, wat verbinding nodig heeft, wat gratis is en wanneer betaald wordt. De bron alleen bewijst geen eeuwig gratis aanbod. |
| 80 | P2 | “cash, PIN en cadeaubonnen … verkoopflow” — 10 en 72 | Onduidelijk of het systeem betalingen afhandelt of betaalwijzen registreert. Maak dat onderscheid expliciet en vermeld welke koppeling nodig is. Voor Belgische ondernemers is “kaartbetaling” begrijpelijker dan “PIN”. |
| 81 | P2 | “waar uw winkel beweegt” / “Elke verkoop vertelt meteen het vervolgverhaal” — 11 en 60 | Geforceerde metaforen waar productinformatie nodig is. Voorstel: “Bekijk welke producten verkopen en hoeveel voorraad er overblijft.” Kies “Eén systeem” met de juiste accentuering. |
| 82 | P2 | “Ontdek de flow” — 65, drie keer | Drie identieke actielabels verwijzen naar dezelfde platformhomepage, niet naar de genoemde functie. Gebruik een passende functiebestemming of het eerlijke “Bekijk PWAYMENT”. |
| 83 | P2 | “Gemaakt voor echte winkelvloeren” / “Groeiende retail” / “uw setup” — 66 en 71 | “Echte” voegt niets toe; retail en setup maken de tekst afstandelijk. “Voor boetieks en speciaalzaken” en “je winkelinrichting” of “je kassasysteem” zijn concreter. |
| 84 | P2 | “Wanneer uw zaak groeit, groeit uw setup mee” — 71 | Bekende groeicliché. Benoem de werkelijk ondersteunde uitbreiding, zoals extra toestellen of locaties, nadat die functie bevestigd is. |
| 85 | P1 | FAQ: “Kan ik voorraad en productvarianten beheren?” — 72 | Het antwoord noemt alleen product-, voorraad- en inzichtenschermen. Het beantwoordt het variantenbeheer niet. Bevestig of maten/kleuren en voorraad per variant werken en antwoord rechtstreeks. |
| 86 | P1 | FAQ: “Wat kost PWAYMENT?” — 72 | Gratis Basis wordt genoemd, maar betaalde grenzen, hardware en installatie ontbreken. Geef een duidelijke scheiding tussen software, installatie en toestellen; publiceer alleen bevestigde prijzen/limieten. “We bekijken het samen” vervangt geen basisuitleg. |
| 87 | P2 | “Eerst helderheid. Dan vooruit.” / “Zie wat een heldere kassa verandert” / “winkels die vooruit willen” — 72–75 | Drie generieke slogans vlak na elkaar. Eén concrete demo-uitnodiging is genoeg: “Bekijk hoe een verkoop en het voorraadbeheer werken.” |
| 88 | P2 | Maandag 14:38, Lisa M., voorbeeldartikelen en omzet/voorraadbeelden — 37–57 en 69 | Voorbeeldgegevens zijn op zichzelf geen slordige placeholders. De containers noemen het al een voorbeeld, maar een zichtbare aanduiding “Voorbeeldscherm” maakt het ook voor ziende lezers duidelijk. De btw-regel is daarnaast ambigu: “Subtotaal” en “Totaal” zijn gelijk. Als btw inbegrepen is, label de btw-regel expliciet als inbegrepen. |
| 89 | P1 | Meta: “Bekijk functies en tarieven” — pwayment.html | De pagina heeft geen tariefoverzicht. Wijzig de beschrijving naar functies en demo, of voeg echte tarieven toe. Zo belooft de zoekresultaattekst wat de pagina daadwerkelijk levert. |

## 7. Dienstenpagina’s en gedeelde generatorcopy

Bronnen: [dienstengegevens](/Users/kevin/PROJECTS/webaanzee.be/scripts/generate-seo-pages.mjs:99), [gedeelde bouwblokken](/Users/kevin/PROJECTS/webaanzee.be/scripts/generate-seo-pages.mjs:141), [dienstenopbouw](/Users/kevin/PROJECTS/webaanzee.be/scripts/generate-seo-pages.mjs:149).

| ID | Prio | Huidige tekst / locatie | Diagnose en redactionele ingreep |
|---|---|---|---|
| 90 | P2 | “Webdesign dat je zaak helder neerzet” — 100 | Onhandige formulering en abstract voordeel. Richting: “Een website voor je aanbod, je klanten en je manier van werken.” Laat de pagina vervolgens scope, werkwijze en voorbeelden uitleggen. |
| 91 | P2 | “zonder technisch gedoe” / “scope, timing en kosten” — 101 | Belooft gewone taal, gebruikt daarna intern jargon. “Wat ik maak, wanneer het klaar is en wat het kost” werkt beter. De twee webdesigndiensten overlappen inhoudelijk sterk: onderscheid doelgroep, vraag of proces, anders samenvoegen overwegen. |
| 92 | P2 | “duidelijke productroute”, “betrouwbare checkout”, “meting van winkelmand en aankoop” — 102 | Jargon en onduidelijke leveringsclaim. “Producten vinden, bestellen en betalen” leest vanzelf. Leg uit of aankoopmeting standaard geleverd wordt en wat daarvoor nodig is. |
| 93 | P2 | “Wanneer een gewone marketingwebsite niet genoeg is…” — 103 | Het probleem wordt vanuit een websitecategorie uitgelegd. Begin bij de ondernemer: “Werk je aanvragen, klanten of afspraken nog handmatig bij?” Behoud de bestaande focus op één afgebakend proces; die is sterk. |
| 94 | P2 | “Alles wat nodig is om sterk en professioneel online te staan” — 150 | Totaalclaim boven een beperkte lijst. “Dit werken we samen uit” of “Dit is onderdeel van het traject” is preciezer, mits de lijst daadwerkelijk de inbegrepen levering beschrijft. |
| 95 | P2 | Zelfde eerste drie cases op elke dienstenpagina — 150 | Een webshopdienst toont niet specifiek eerst een webshop; een toepassingendienst niet eerst een toepassing. De copy belooft relevant bewijs, de selectie is generiek. Selecteer cases per dienst en licht precies de relevante functie toe. |
| 96 | P2 | “Van idee naar een website die vertrouwen wekt” / “Op maat ontworpen” / “Gebouwd voor snelheid” — 141–142 | Op bijna elke pagina terugkerende kwalificaties zonder extra bewijs. Gebruik die ruimte voor één relevante scopegrens, een echt projectdetail of een concreet samenwerkingsfeit. |
| 97 | P1 | “Na de lancering blijf je niet alleen: we volgen op en verbeteren waar nodig” — 144 | Klinkt als inbegrepen doorlopende verbetering, terwijl inhoud en functies elders extra kosten. Voorstel: “Na de lancering verloopt technisch beheer volgens je offerte. Wijzigingen en uitbreidingen bespreken we apart.” Exacte serviceafspraken bevestigen. |
| 98 | P2 | “Klaar voor de volgende stap?” / “sterke eerste indruk” — 147 | Dezelfde CTA op dienst-, regio- en casepagina’s. Stem de uitnodiging af op de pagina: webshop bespreken, bestaande website verbeteren, een bepaald type toepassing verkennen. Niet telkens de hele merkbelofte opnieuw vertellen. |

## 8. Alle tien regiopagina’s en de kusthub

Bronnen: [lokale teksten](/Users/kevin/PROJECTS/webaanzee.be/scripts/generate-seo-pages.mjs:12), [kusthub](/Users/kevin/PROJECTS/webaanzee.be/scripts/generate-seo-pages.mjs:156), [regiotemplate](/Users/kevin/PROJECTS/webaanzee.be/scripts/generate-seo-pages.mjs:159).

| ID | Prio | Huidige tekst / locatie | Diagnose en redactionele ingreep |
|---|---|---|---|
| 99 | P2 | Blankenberge: “geen marketingzin, maar dagelijkse praktijk” / “vaak … vaak op hetzelfde moment” — 15–16 | Defensieve bewijsclaim en een onduidelijke tijdsfrase. Zeg gewoon dat Kevin vanuit Blankenberge werkt. De echte cases COZY, Daily Grind en De Wulk zijn sterker dan een uitleg over authenticiteit. |
| 100 | P2 | Oostende: “woonstad, badstad, havenstad en regionale trekker” — 27–28 | Stadsbeschrijving vóór de klantvraag. Maak de toepassing concreter: een zaak met verschillende doelgroepen heeft duidelijke routes nodig. “De concurrentie is groter” is een onbewezen vergelijkende marktclaim; onderbouwen of weglaten. |
| 101 | P2 | Brugge/Zeebrugge: “grotere bureaus en lange bestaande domeinen” — 36 | Spelfout: lang bestaande. Belangrijker: interne concurrentieanalyse staat in publiekscopy. De ondernemer heeft meer aan hoe de website klanten informeert dan aan de zoekpositie van de webdesigner. Schrap deze redenering. |
| 102 | P2 | De Haan/Wenduine: “uitgesproken uitstraling”, “rustig en verzorgd” — 43–44 | Generaliseert een gemeentelijk karakter naar een ontwerpstijl. De passage over het onderhouden van talen is bruikbaarder. Werk een concrete informatievraag van verblijf/horeca uit; geen stijl voorschrijven op basis van postcode. |
| 103 | P2 | Bredene: “geen klassieke zeedijk” en “zonder … standaardsjabloon te kopiëren” — 51 | Geografisch detail zonder heldere link naar de opdracht, plus defensieve ontwerperstaal. De lokale dienstvraag en bereikbaarheid zijn relevant. Geef daar een voorbeeld van zonder een niet-bestaande lokale case te suggereren. |
| 104 | P2 | Knokke-Heist: “lat hoog”, “premium retail”, “kwaliteit voelbaar” — 59–62 | Statusclichés; iedere zaak verwacht zorgvuldigheid. Kunst/collectie en productvarianten kunnen inhoudelijke aanknopingspunten zijn. Vermeld dat Atelier of PWAYMENT relevante voorbeelden zijn, niet automatisch klanten uit Knokke-Heist. |
| 105 | P2 | Middelkerke/Westende: “langgerekte lokale markt”, “sterke seizoensstromen”, “piekvragen” — 67–68 | Beleids-/markttaal. De feitelijke uitdaging is goed: openingsuren en seizoensaanbod veranderen. Richting: “Pas openingsuren en seizoensaanbod aan zonder telkens een nieuwe pagina te laten bouwen.” Alleen als de gekozen oplossing dat ondersteunt. |
| 106 | P2 | Nieuwpoort: “sterke tweede-verblijfsmarkt” — 75–76 | Abstracte marktschets. Schrijf over de verschillende bezoekvragen en keuzes. “Tweedeverblijfsmarkt” is de correcte samenstelling, maar eenvoudiger is “eigenaars van een tweede verblijf”. |
| 107 | P2 | Koksijde/Oostduinkerke: “bureaus die voor heel Vlaanderen stadspagina’s publiceren” — 83 | Interne SEO-strategie en kritiek op concurrenten in een klantintro. Schrap. Eigen beeld en concrete realisaties zijn bruikbaar, maar geen exclusief kenmerk van deze gemeente. |
| 108 | P2 | De Panne: “meertalige bezoekers” en “automatische of half onderhouden vertalingen” — 91–92 | Meertaligheid is een relevant onderwerp. Maak het concreet: welke talen heeft de zaak nodig en wie werkt die bij? De algemene waarschuwing niet groter maken dan de oplossing. |
| 109 | P1 | “lokale voorbeelden” / “Bekijk het verschil in de praktijk” — hub 156 en regiopagina 163 | Cases komen deels uit andere gemeenten of uit kustbrede eigen projecten. Benoem de feitelijke plaats en relevantie. “Verschil” suggereert bovendien een voor/na-vergelijking die niet wordt getoond. Gebruik “Voorbeelden van mijn werk”. |
| 110 | P1 | Regio-FAQ prijsantwoord zonder bedrag; meta belooft “heldere prijzen” — 163–164 | De pagina ontwijkt een antwoord dat op de homepage wél beschikbaar is. Gebruik de centrale actuele prijsinformatie of link duidelijk naar het aanbod met een concrete startprijs. |
| 111 | P2 | Herhaald “Eén maker. Korte lijnen. Een website die klopt.” + drie uitlegblokken — 163 | Dezelfde boodschap over rechtstreeks contact wordt verschillende keren uitgelegd. Eén compacte uitleg is genoeg. Gebruik vrijgekomen ruimte voor relevante opdrachtinformatie of schrap de sectie. |
| 112 | P2 | “Je hele digitale basis onder één dak” / “Dichtbij genoeg om je zaak echt te leren kennen” — 156 | Generieke hubcopy. “Vanuit Blankenberge werk ik voor ondernemers langs de Belgische kust” is feitelijk sterker. Laat de locaties de navigatie doen en cases de ervaring aantonen. |

De regiopagina’s zijn niet volledig identiek: de intro’s en aandachtspunten verschillen. Toch is het grootste deel van de pagina gedeeld. Dat is hier een redactioneel gebrek aan eigen nut; deze audit doet geen uitspraak over een eventuele zoekmachinepenalty. Voor iedere regio moet de vraag zijn: welke nuttige informatie staat hier die een ondernemer niet al op de kusthub vindt?

## 9. Inzichten en blog

Bronnen: [inzichtenpagina](/Users/kevin/PROJECTS/webaanzee.be/scripts/generate-seo-pages.mjs:175), [blog](/Users/kevin/PROJECTS/webaanzee.be/components/BlogArticle.tsx:12), [blogmetadata](/Users/kevin/PROJECTS/webaanzee.be/blog/waarom-website-nodig-2026.html:85).

| ID | Prio | Huidige tekst / locatie | Diagnose en redactionele ingreep |
|---|---|---|---|
| 113 | P2 | “Praktische artikels” / “Lees, vergelijk en maak een geïnformeerde keuze” — generator 175 | Er is één echt artikel; de andere kaarten linken naar commerciële diensten- en regiopagina’s. Presenteer die eerlijk als artikel, dienstuitleg en werkgebied. Geen inhoudsaanbod suggereren dat nog niet bestaat. |
| 114 | P1 | “Praktische gids” / “Bekijk de gids” linkt naar website-laten-maken — generator 175 | De bestemming is een dienstenpagina met gedeelde marketingblokken. Schrijf een echte gids of noem de kaart “Een website laten maken” met “Bekijk de aanpak”. |
| 115 | P1 | “Webaanzee activeert dat spoor pas wanneer de officiële gegevens beschikbaar zijn” — BlogArticle 71 | Interne project-/bedrijfsstatus is blijven staan in een artikel voor ondernemers. Het gaat niet meer over de vraag van de lezer. Schrap deze passage; leg alleen uit wat de lezer aan een bedrijfsprofiel heeft als dat inhoudelijk nodig is. |
| 116 | P2 | “Een Google Business Profile kan later…” — BlogArticle 30 | “Later” verwijst nergens duidelijk naar. Gebruik “Een Google-bedrijfsprofiel toont praktische informatie en reviews”, na inhoudelijke controle. “Prospect”, “ranken”, “positionering”, “informatiearchitectuur” en “gekwalificeerde aanvraag” elders vereenvoudigen of uitleggen. |
| 117 | P2 | Exacte Core Web Vitals-drempels en 75e percentiel — BlogArticle 60 | Technisch detail onderbreekt een artikel voor zelfstandigen. Behoud eventueel in een verdiepend kader met een directe actuele bron. Deze audit heeft de drempelwaarden niet extern geverifieerd. De hoofdtekst kan uitleggen wat snelheid en stabiliteit voor een bezoeker betekenen. |
| 118 | P2 | “8 min leestijd” en metadata `wordCount: 1200` — BlogArticle 20; blog-HTML 86 | Hardgecodeerde inhoudscijfers kunnen achterlopen. Bereken uit de uiteindelijke artikeltekst of laat weg. Niet aannemen dat 1200 woorden nog klopt omdat de zin ooit is ingevoerd. |
| 119 | P3 | Breadcrumb “Dit artikel” en aria-label “Breadcrumb” — BlogArticle 12–15 | Beide kunnen specifieker en in dezelfde taal. Gebruik “Kruimelpad” en een korte herkenbare artikeltitel. De inhoudelijke nuance van het artikel — geen automatische winst- of SEO-garanties — behouden. |

## 10. Privacy, cookies, metadata en losse bronnen

Bronnen: [privacy](/Users/kevin/PROJECTS/webaanzee.be/components/Privacy.tsx:30), [cookies](/Users/kevin/PROJECTS/webaanzee.be/components/Cookies.tsx:10), [homepage-HTML](/Users/kevin/PROJECTS/webaanzee.be/index.html:1), [404](/Users/kevin/PROJECTS/webaanzee.be/public/404.html:1), [niet-actieve werkwijze](/Users/kevin/PROJECTS/webaanzee.be/components/SEOAnalyse.tsx:5), [niet-actieve merklijst](/Users/kevin/PROJECTS/webaanzee.be/components/ClientMarks.tsx:7).

| ID | Prio | Huidige tekst / locatie | Diagnose en redactionele ingreep |
|---|---|---|---|
| 120 | P1 | Homepage JSON-LD: “Professionele websites vanaf €950; uitgebreidere toepassingen vanaf €1.950” — index.html | Directe tegenspraak met de actuele prijsbron: €2.450 / €3.950 / €5.950 / €7.500. Metadata uit dezelfde bron laten genereren als het zichtbare aanbod. Dit is een feitelijke broninconsistentie, geen smaakvoorkeur. |
| 121 | P2 | “klanten in beweging brengt” — index.html meta description | Vage beeldspraak in schaarse snippetruimte. Gebruik dienst, doelgroep, werkgebied en het concrete feit van rechtstreeks contact. Bijvoorbeeld: “Websites en webshops voor ondernemers aan de Belgische kust. Kevin ontwerpt en bouwt je site vanuit Blankenberge, met rechtstreeks contact.” |
| 122 | P1 | Privacy: “Alleen wat u zelf … doorgeeft” tegenover hosting, analytics en chat — Privacy 32 | De absolute samenvatting dekt de elders beschreven technische verwerking niet. Redactioneel splitsen in zelf aangeleverde gegevens en technische bezoekgegevens. De juiste volledige uitleg laten bepalen op basis van de werkelijke inrichting; deze audit certificeert geen privacyconformiteit. |
| 123 | P1 | “Resend … zodra die dienst geconfigureerd is” — Privacy 46–48 | Voorwaardelijke interne implementatietekst. De privacyuitleg moet de feitelijke huidige werking beschrijven. De API gebruikt Resend als de configuratie aanwezig is, maar deze audit heeft productie niet getest. Eerst de huidige inzet vaststellen en daarna definitief formuleren. |
| 124 | P2 | “en ik regel het” / disclaimer “vervangt geen individueel juridisch advies” — Privacy 80 en 85 | Eerste is te vrijblijvend voor een gegevensverzoek; tweede helpt de bezoeker niet begrijpen hoe zijn gegevens worden behandeld. Gebruik een zakelijke contactinstructie. Beoordeling van rechten, grondslagen en termijnen vraagt een aparte inhoudelijke privacycontrole. |
| 125 | P2 | “Ik hou niet van … cookie-banners”, “wel gezond verstand”, “zonder juridisch vakjargon” — Cookies 11, 32 en 53 | Persoonlijke smaak en zelfkwalificatie verdringen uitleg. Zeg wat wordt geladen, wanneer de chat start en waar iemand vragen kan stellen. De feitelijke uitleg over chat na een klik is bruikbaarder. |
| 126 | P2 | Verwijzing naar Instagram — Cookies 43 | In de onderzochte zichtbare navigatie ontbreekt een Instagram-link; er is wel een sameAs-verwijzing in metadata. Gebruik voorbeelden van daadwerkelijk aanwezige externe links, of beschrijf externe links zonder een onnodige lijst. |
| 127 | P3 | 404: “Geen zorgen — … homepage” — public/404.html | Geen groot probleem. “Geen zorgen” voegt weinig toe en het register wijkt af. Voorstel: “Deze pagina bestaat niet of is verplaatst.” Knop: “Naar de startpagina”. |
| 128 | P2 | Niet actief: “Gekozen door ondernemers met ambitie” — ClientMarks 36 | Generiek en alleen bruikbaar als de getoonde merken werkelijk klanten/samenwerkingen zijn. Sommige namen zijn aanverwante platforms. Eerst de relatie vaststellen; eigen producten niet als klantendorsement presenteren. Deze component wordt momenteel niet geïmporteerd. |
| 129 | P2 | Niet actief: “Geen traject vol vergaderingen” en “voordat we ons druk maken over details” — SEOAnalyse 15 en 34 | Defensieve positionering en bagatellisering van details. De concrete stappen zijn bruikbaarder dan de kop. “Bekijk mijn werkwijze” verwijst bovendien naar resultaten, niet naar een werkwijze. Alleen bij hergebruik corrigeren; nu geen actief publieksprobleem. |
| 130 | P3 | “Web aan Zee” in metadata.json, “Webaanzee.be” in copyright en “Webaanzee” elders | Leg de schrijfwijze vast: merknaam Webaanzee, domeinnaam webaanzee.be waar een adres bedoeld is. `metadata.json` is geen aangetoonde actieve publieksbron; lager prioriteren. |

## 11. Wat ontbreekt inhoudelijk?

Dit zijn geen extra losse foutmeldingen, maar de informatiegaten achter veel van de bovenstaande bevindingen.

1. **Echte casekeuzes.** Per case: opdrachtgever of eigen initiatief, oorspronkelijke vraag, eigen rol, projectfase, één concrete ontwerp-/bouwbeslissing en een aantoonbare uitkomst of helder beschreven oplevering.
2. **Definitie van de diensten.** Wat is standaard, wat is een optie, wat levert de klant aan? Vooral tekstbegeleiding, teksten schrijven, fotografie, analytics en SEO worden niet overal even scherp afgebakend.
3. **Een bruikbare planningsindicatie.** De FAQ beantwoordt timing nu zonder tijdsinformatie. Hiervoor zijn echte ervaringscijfers nodig.
4. **CMS-eigendom en overdracht.** Bezoekers willen weten wie website, inhoud en toegang beheert, en wat er gebeurt bij een verhuizing of het stoppen van beheer. Geen technische of contractuele beloften toevoegen zonder afspraken.
5. **Productgrenzen.** Voor PWAYMENT: gratis versus betaald, offlinewerking, hardware en varianten. Voor klantenkaart: scanflow, spaarregels, pakketscope, vervolgtarieven en eventuele apparaatvereisten.
6. **Bewijs bij reputatieclaims.** Bezoekerscijfers, persvermeldingen en “meest gekozen” verdienen een bron. De huidige code levert die onderbouwing niet.
7. **Specifieke expertise over Kevin.** De About-sectie zegt vooral dat er één aanspreekpunt is. Een kort, waarheidsgetrouw detail over relevante ervaring of manier van werken kan die sectie eigen maken. Geen biografie of aantal ervaringsjaren verzinnen.

## 12. Wat verdient behoud?

- De combinatie van “Ik ben Kevin” en rechtstreeks contact. Dat is menselijk en concreet.
- Praktische projectbeschrijvingen zoals COZY’s drankkaart/spaarkaart, De Wulks bestelinformatie en Welzijnswerkings inschrijving via ontmoetingscentra.
- De concrete afbakening van het websiteaanbod: aantallen pagina’s, taal, feedbackrondes, inhoudsbeheer en aparte beheerkosten. Dit is inhoudelijk sterker dan de slogans erboven.
- Het rekenvoorbeeld van €4.730 voor website + CMS en twaalf maanden beheer. Het helpt een bezoeker echt begroten, binnen de vermelde uitsluitingen.
- “Geen app downloaden” en werking in de smartphonebrowser bij de klantenkaart. Dat is een duidelijk productvoordeel.
- De terughoudendheid in het blog over terugverdiengaranties en automatisch hoog scoren. Maak die passages toegankelijker, niet schreeuweriger.
- “Bekijk het werk”, “Stuur een bericht”, “Open navigatie”, “Sluit navigatie” en de normale 404-titel. Eenvoudige functionele tekst hoeft niet opvallend te zijn.

## 13. Redactionele richting

**Stem:** persoonlijk, deskundig, nuchter, Vlaams-Nederlands. Het doel is niet om iedere zin een slogan te maken. De site wordt sterker wanneer gewone zinnen concrete dingen zeggen.

| Keuze | Richtlijn |
|---|---|
| Aanspreekvorm | Je/jouw voor Webaanzee. Een afwijkend u/uw voor PWAYMENT alleen als dat een bewuste afzonderlijke merkstem is. De klantenkaartpagina heeft nu geen verklaarde reden om van register te wisselen. |
| Afzender | Ik bij Kevin en diens werkzaamheden; we wanneer het werkelijk om samen beslissen met de klant gaat. Geen onbedoelde indruk van een team. |
| Productnamen | Kies klantenkaart of spaarkaart als hoofdaanduiding en leg het verschil uit als beide nodig zijn. CMS bij eerste vermelding uitleggen als beheerscherm. |
| Acties | Label de uitkomst: bekijk project, stuur bericht, vraag demo aan. Plan alleen wanneer iemand een afspraak kan plannen. |
| Koppen | Eén merkzin per sectie kan. Laat de volgende zin uitleggen wat je maakt, voor wie of hoe het werkt. |
| Claims | Specifieke waarneming boven superlatief. Een echt screenshot of projectdetail boven “ongeëvenaard”. Geen nieuw bewijs verzinnen om een zin overtuigender te maken. |
| Spelling | Gewone zinskapitalisatie; horecazaak, websitekoppeling, QR-code, QR-scanner, medewerkersbeheer, statusupdates. Schrijf €1.350 volgens dezelfde prijsnotatie als elders. |
| Herhaling | Niet overal synoniemen zoeken voor helder/sterk. Verwijder de claim of vervang hem door inhoud. |

**Woorden en patronen om actief terug te dringen:** naadloos, krachtig, high-end, ongeëvenaard, compleet arsenaal, naar het volgende niveau, de toekomst van, echte mensen/echte winkelvloeren, één plek, groeit mee, verdient, digitale ervaring. “Helder”, “op maat” en “vertrouwen” hoeven niet verboden te worden; ze staan nu te vaak waar uitleg nodig is.

## 14. Aanbevolen werkvolgorde

1. Corrigeer broninconsistenties en commerciële verwachtingen: oude homepageprijzen, klantenkaartvervolgkosten, verborgen FAQ-beloftes, meest-gekozenbadge, productstatus en PWAYMENT-prijsgrenzen.
2. Herschrijf de klantenkaartpagina als concreet productverhaal: wat het is, wie wat scant, wat een zaak beheert, pakketverschillen en totale kosten.
3. Maak drie sterke cases met bestaande informatie en aanvullende projectfeiten. Pas daarna het case-template toe op de overige projecten; geen identieke resultaatzinnen herhalen.
4. Verfijn homepage, diensten en contact. Bewaar de merkidentiteit, maar halveer waar mogelijk de inleidende zelfkwalificaties. Maak de knoppen consequent.
5. Geef regiopagina’s eigen nut of verkort ze. Begin met Blankenberge, waar het meeste lokale werk beschikbaar is. Werk de overige negen alleen uit met werkelijke relevante informatie.
6. Ruim blog-, privacy- en metadatarestanten op; laat operationele en privacyfeiten eerst bevestigen. Niet-actieve componenten als laatste behandelen.

## 15. Verificatie en grenzen

De prioriteiten en voorstellen zijn gebaseerd op aangetroffen broninhoud en de genoemde browsercontroles. De audit heeft geen formulieren verstuurd, geen chatgesprekken gestart en geen externe productdemo’s doorlopen. De codepaden voor verzending zijn gelezen, niet operationeel getest. Geen volledige build of testreeks gedraaid: er is geen functionele wijziging gedaan. Alleen dit auditdocument is toegevoegd.

De bron bevat 130 afzonderlijk genummerde redactionele bevindingen. Meerdere daarvan raken gedeelde tekst op veel pagina’s; dit is dus geen telling van 130 unieke foutieve zinnen. Subjectieve stijlpunten, concrete bronconflicten en ontbrekende productfeiten zijn bewust apart beschreven.


## 16. Uitvoering op 22 oktober 2026

Alle tekstgroepen uit de audit zijn verwerkt: homepage, diensten, portfolio en cases, regio’s, klantenkaart, PWAYMENT, formuliermeldingen, blog, privacy, cookies, 404 en metadata. Dit betekent niet dat ontbrekende commerciële feiten of resultaatcijfers alsnog zijn verzonnen.

### Doorgevoerd

- De homepage vertelt wat Kevin maakt en hoe het contact verloopt. De opeenvolging van algemene kwaliteitsclaims is teruggebracht.
- Diensten, FAQ en prijsvoorwaarden maken onderscheid tussen inhoudsbegeleiding, aangeleverde inhoud en afzonderlijk begroot tekstschrijven/fotografie. De planning wordt bij het voorstel vastgesteld op basis van de opdracht, beschikbare ruimte en inhoud.
- Acties benoemen hun bestemming. “Plan een gesprek” is vervangen waar er geen agenda volgt. De e-mailkaart heet contactformulier. WhatsApp-aanvragen voor de spaarkaart bevatten nu het gekozen pakket.
- Het formulier heeft blijvende veldlabels, gerichte validatiemeldingen en Nederlandse hersteltekst bij een netwerkfout. De wachttijd vermeldt het resterende aantal seconden.
- Projectbeschrijvingen staan in `data/projects.mjs` en worden gedeeld door homepage en casepagina’s. Iedere case heeft eigen koppen en concrete onderdelen van de oplevering. Niet-onderbouwde bezoekers- en persclaims zijn verwijderd. PWAYMENT wordt benoemd als eigen softwareproduct.
- De regiopagina’s zijn tijdens deze ronde ook vanuit een gelijktijdig gewijzigde regiotemplate opgebouwd. Die implementatie is behouden. De gedeelde prijsbron, lokale voorbeelden met hun werkelijke herkomst en de afbakening van teksthulp zijn daarin gecontroleerd en waar nodig gelijkgetrokken.
- De klantenkaartpagina legt het sparen en inwisselen uit met de daadwerkelijke QR-werking. De superlatieven, absolute veiligheidsclaim en populariteitsbadge zijn vervangen. Pakketten hebben concrete beschrijvingen en het bestaande jaartarief is zichtbaar gemaakt.
- De spaarkaart-FAQ en de bijbehorende gestructureerde data gebruiken dezelfde tekstbron, `data/loyalty.mjs`. De niet-onderbouwde belofte van 48 uur is verwijderd.
- PWAYMENT legt de Basis-formule, de grenzen van offlinegebruik en het onderscheid tussen betaalregistratie en terminalkoppeling uit. Er is een rechtstreekse link naar de actuele tariefpagina; een eeuwig gratis aanbod wordt niet beloofd.
- Interne bedrijfsstatus, een hardgecodeerde leestijd en de vaste woordtelling zijn uit het blog verwijderd. Technisch jargon is vereenvoudigd.
- Privacy en cookies beschrijven de zichtbare gegevensstromen zonder implementatievoorbehoud of persoonlijke slogans. De tekst linkt naar Vercels privacydocumentatie en de Gegevensbeschermingsautoriteit. Dit is geen certificering van juridische volledigheid of een controle van productiecontracten.
- De oude homepageprijzen zijn uit de gestructureerde data verwijderd. De actuele prijzen op de site komen uit `data/pricing.mjs`.
- De buildcontrole bewaakt nu ook actuele zichtbare aanbodprijzen, achtergebleven prijs-/garantieclaims en de zichtbaarheid van gestructureerde spaarkaartvragen.

### Broncontrole

Voor de productuitleg zijn de lokale PWAYMENT RETAIL-bron, de formulecatalogus en de handleiding van cozy-moments-loyalty geraadpleegd. Deze geven onder meer de scanrichting, productvarianten, de limieten van Basis en de nog af te stemmen terminalhardware weer. Er is geen externe productaccount gebruikt.

De privacyredactie is getoetst aan de [Vercel Web Analytics-documentatie](https://vercel.com/docs/analytics/privacy-policy) en de [uitleg over privacyrechten van de Gegevensbeschermingsautoriteit](https://www.gegevensbeschermingsautoriteit.be/burger/privacy/wat-zijn-mijn-rechten). Operationele bewaartermijnen, juridische bedrijfsgegevens en contracten zijn hiermee niet zelfstandig vastgesteld.

### Commercieel detail dat bevestiging vraagt

De bestaande bron vermeldde €495 / €599 / €1.350 voor inrichting en €250 per jaar na het eerste jaar. Ze maakte niet eenduidig of de bedragen inclusief of exclusief btw zijn en of hetzelfde jaartarief ieder pakket volledig dekt. Hiervoor is tijdens het werk een vraag gesteld. Tot die bevestiging noemt de pagina het bestaande basistarief en verwijst ze voor btw, pakketbeheer en eventuele uitbreidingen expliciet naar de offerte. Er is geen btw-percentage of extra pakketprijs verzonnen.

### Validatie

Productiebuild, prerendering en SEO-controles zijn uitgevoerd. TypeScript en de controle op whitespacefouten zijn geslaagd. De contactvalidatie is lokaal gecontroleerd voor te korte naam/bericht, ongeldig e-mailadres, niet-beschikbare mailservice en de wachttijd; zonder netwerkverkeer of echte inzending. Visuele controles omvatten de homepage, het contactformulier, de klantenkaart, PWAYMENT, een case en een regiopagina. Voor homepage, klantenkaart, PWAYMENT en case zijn desktop- en mobiele viewportweergaven bekeken. Tijdelijke vergelijkingspagina’s worden niet gepubliceerd.

De mechanische detector gaf alleen een waarschuwing over de bestaande Inter-letter in PWAYMENT; die is behouden omdat dit een tekstverfijning binnen het bestaande ontwerp is.

Laatste gecombineerde controle: de productiebuild en SEO-controle slaagden voor 33 HTML-bestanden en 31 canonieke URL’s. De afzonderlijke regiocontrole slaagde voor 11 pagina’s, tien unieke intro’s, centrale prijzen, geselecteerde projecten en gebruikte media. TypeScript en `git diff --check` slaagden opnieuw na de laatste tekstwijzigingen.
