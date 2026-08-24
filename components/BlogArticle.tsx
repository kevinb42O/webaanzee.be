import React from 'react';
import Header from './Header';
import CrispChat from './CrispChat';

const BlogArticle: React.FC = () => (
  <div className="min-h-screen bg-white">
    <Header />
    <header className="relative bg-navy pt-24 pb-16 md:pt-32 md:pb-24 px-6">
      <div className="relative z-10 max-w-3xl mx-auto text-center">
        <nav className="text-sm text-white/50 mb-8" aria-label="Breadcrumb">
          <a href="/" className="hover:text-white">Home</a><span className="mx-2">›</span>
          <a href="/inzichten/" className="hover:text-white">Inzichten</a><span className="mx-2">›</span>
          <span className="text-amber-300" aria-current="page">Dit artikel</span>
        </nav>
        <p className="text-xs font-bold tracking-[.18em] uppercase text-amber-300 mb-6">Webdesign voor zelfstandigen</p>
        <h1 className="text-4xl md:text-6xl font-serif text-white leading-tight mb-6">Waarom heeft uw zaak een eigen website nodig?</h1>
        <p className="text-lg md:text-xl text-white/65 max-w-2xl mx-auto leading-relaxed">Niet omdat iedere onderneming zoveel mogelijk pagina’s nodig heeft, maar omdat een goede website vertrouwen, uitleg en actie samenbrengt op een plek die u zelf beheert.</p>
        <div className="mt-8 text-sm text-white/45"><span>Door Kevin Bourguignon</span><span className="mx-2">•</span><time dateTime="2026-08-24">Bijgewerkt op 24 augustus 2026</time><span className="mx-2">•</span><span>8 min leestijd</span></div>
      </div>
    </header>

    <main>
      <article className="px-6 py-16 md:py-24">
        <div className="max-w-3xl mx-auto prose prose-lg prose-slate">
          <p className="text-xl md:text-2xl text-slate-800 font-medium leading-relaxed">Een prospect hoort uw naam, ziet uw zaak of zoekt een dienst in de buurt. Daarna volgt vaak een controle: wat doet dit bedrijf precies, ziet het er betrouwbaar uit en hoe neem ik contact op? Een eigen website kan die drie vragen zonder omweg beantwoorden.</p>

          <h2>Een website en sociale media hebben een andere taak</h2>
          <p>Sociale media zijn nuttig om aandacht en contact op te bouwen. Een Google Business Profile kan later belangrijke praktische informatie en reviews tonen. Platformen zoals reservatiesites of marktplaatsen kunnen bereik opleveren. Maar op al die plekken bepaalt iemand anders de vorm, het algoritme en de voorwaarden.</p>
          <p>Op een eigen website bepaalt u zelf welke informatie eerst komt, welk bewijs zichtbaar is en welke stap de bezoeker kan zetten. Dat maakt sociale media niet overbodig. De kanalen versterken elkaar juist wanneer ze naar één actuele, geloofwaardige basis verwijzen.</p>

          <h2>Vindbaarheid begint met een bruikbaar antwoord</h2>
          <p>Een website wordt niet automatisch hoog geplaatst omdat er een plaatsnaam of zoekterm op staat. Google probeert pagina’s te tonen die de vraag van een zoeker goed beantwoorden. Techniek helpt Google de pagina vinden en begrijpen; inhoud, bewijs, concurrentie en bekendheid bepalen mee of ze ook sterk genoeg is om te ranken.</p>
          <p>Voor een lokale ondernemer betekent dat meestal:</p>
          <ul>
            <li>helder zeggen welke dienst of oplossing wordt aangeboden;</li>
            <li>het werkgebied eerlijk beschrijven zonder fictieve vestigingen;</li>
            <li>cases, foto’s, proces en reviews tonen die de kwaliteit onderbouwen;</li>
            <li>praktische vragen beantwoorden voordat iemand opnieuw moet zoeken;</li>
            <li>de route naar bellen, reserveren, aanvragen of kopen kort houden.</li>
          </ul>
          <p>Google zelf adviseert inhoud te maken die in de eerste plaats voor mensen nuttig en betrouwbaar is. Een vaste woordlimiet of overdreven herhaling van zoektermen hoort daar niet bij. Zie ook de <a href="https://developers.google.com/search/docs/fundamentals/creating-helpful-content" target="_blank" rel="noreferrer">richtlijnen voor behulpzame content</a>.</p>

          <h2>Wat kost géén duidelijke website?</h2>
          <p>Dat bedrag is niet eerlijk met één algemene formule te berekenen. Het hangt af van zoekvolume, marges, concurrentie, terugkerende klanten en de waarde van een aanvraag. Beweringen zoals “een website verdient zichzelf binnen een maand terug” zijn daarom geen betrouwbare basis voor een investering.</p>
          <p>Een betere nulmeting is concreet:</p>
          <ol>
            <li>Hoe komen nieuwe klanten vandaag bij u terecht?</li>
            <li>Welke vragen stellen ze telkens opnieuw?</li>
            <li>Waar haken aanvragen of reservaties af?</li>
            <li>Welke handelingen kunnen bezoekers zelf veilig uitvoeren?</li>
            <li>Hoeveel is één gekwalificeerde aanvraag gemiddeld waard?</li>
          </ol>
          <p>Daaruit volgt wat een website moet doen. Soms is een compacte presentatiesite voldoende. Soms is een webshop, afspraakflow, klantenkaart of kleine webapplicatie zinvoller.</p>

          <h2>De vijf onderdelen van een sterke bedrijfswebsite</h2>
          <h3>1. Een duidelijke positionering</h3>
          <p>De openingssectie moet niet alles vertellen. Ze moet wel duidelijk maken voor wie de onderneming werkt, welke uitkomst zij levert en waarom de bezoeker verder moet lezen.</p>
          <h3>2. Aantoonbaar bewijs</h3>
          <p>Echte projecten, eigen foto’s, verifieerbare resultaten en persoonlijke uitleg zijn sterker dan algemene superlatieven. Een case hoeft geen succesverhaal zonder nuance te zijn; de gemaakte keuzes zijn vaak het interessantste bewijs.</p>
          <h3>3. Goede mobiele prestaties</h3>
          <p>Tekst moet leesbaar zijn, knoppen moeten bruikbaar blijven en zware media mogen de hoofdinhoud niet blokkeren. Voor Core Web Vitals gelden als goede veldwaarden onder meer een LCP van maximaal 2,5 seconden, INP van maximaal 200 milliseconden en CLS van maximaal 0,1. Deze worden op echte gebruikersdata en het 75e percentiel beoordeeld.</p>
          <h3>4. Een logische informatiearchitectuur</h3>
          <p>Belangrijke diensten, cases en locaties verdienen een eigen pagina wanneer ze een zelfstandige zoekintentie beantwoorden. Tientallen bijna identieke stadspagina’s zijn geen strategie. Elke pagina moet ook rechtstreeks nuttig zijn.</p>
          <h3>5. Een meetbare volgende stap</h3>
          <p>De website moet niet alleen verkeer verzamelen. Telefoonkliks, WhatsApp, succesvolle formulieren, reservaties of verkopen moeten meetbaar zijn zonder persoonlijke formulierinhoud naar analytics te sturen.</p>

          <h2>Wanneer is een nieuwe website niet de eerste prioriteit?</h2>
          <p>Als aanbod, doelgroep of opvolging nog volledig onduidelijk zijn, lost een groter ontwerp dat niet op. Ook een website zonder actuele bedrijfsgegevens, zonder iemand die aanvragen beantwoordt of zonder bruikbaar bewijs zal weinig veranderen. Dan is het verstandiger eerst die basis op orde te brengen.</p>
          <p>Hetzelfde geldt voor een Google Business Profile: dat moet echte, verifieerbare ondernemingsgegevens tonen. Webaanzee activeert dat spoor pas wanneer de officiële gegevens beschikbaar zijn, in plaats van met een tijdelijk of fictief profiel te werken.</p>

          <h2>Een realistische start</h2>
          <p>Een professionele website bij Webaanzee start momenteel vanaf €950. Uitgebreidere sites of toepassingen starten vanaf €1.950. Dat zijn startprijzen, geen universele pakketten. Voor de start worden doel, pagina’s, functies, inhoud en verantwoordelijkheden vastgelegd in een concreet voorstel.</p>
          <div className="not-prose mt-12 p-8 bg-slate-900 text-white rounded-2xl">
            <p className="text-sm uppercase tracking-wider text-amber-300 font-bold mb-3">Volgende stap</p>
            <h2 className="text-3xl font-serif mb-4">Bespreek wat uw website werkelijk moet doen.</h2>
            <p className="text-white/65 mb-6">Geen automatische score of rangschikkingsbelofte. Wel een rechtstreeks gesprek over doel, inhoud en de kortste bruikbare route.</p>
            <a href="/#contact" className="inline-flex bg-amber-500 text-slate-950 font-bold px-6 py-3 rounded-lg">Plan een gesprek →</a>
          </div>
        </div>
      </article>
    </main>

    <footer className="bg-slate-950 text-white px-6 py-12"><div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-6 justify-between"><a href="/" className="text-2xl font-serif">Webaanzee<span className="text-amber-400">.</span></a><nav className="flex flex-wrap gap-5 text-sm text-white/60"><a href="/diensten/webdesign/">Webdesign</a><a href="/cases/">Cases</a><a href="/webdesign-belgische-kust/">Kustregio</a><a href="/privacy.html">Privacy</a></nav></div></footer>
    <CrispChat />
  </div>
);

export default BlogArticle;
