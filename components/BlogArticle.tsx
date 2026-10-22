import React from 'react';
import Header from './Header';
import Logo from './Logo';
import CrispChat from './CrispChat';
import { pricingSummary } from '../data/pricing.mjs';

const BlogArticle: React.FC = () => (
  <div className="min-h-screen bg-white">
    <Header />
    <header className="relative bg-navy pt-24 pb-16 md:pt-32 md:pb-24 px-6">
      <div className="relative z-10 max-w-3xl mx-auto text-center">
        <nav className="text-sm text-white/50 mb-8" aria-label="Kruimelpad">
          <a href="/" className="hover:text-white">Startpagina</a><span className="mx-2">›</span>
          <a href="/inzichten/" className="hover:text-white">Uitleg en aanpak</a><span className="mx-2">›</span>
          <span className="text-amber-300" aria-current="page">Een eigen website</span>
        </nav>
        <p className="text-xs font-bold tracking-[.18em] uppercase text-amber-300 mb-6">Webdesign voor zelfstandigen</p>
        <h1 className="text-4xl md:text-6xl font-serif text-white leading-tight mb-6">Waarom heeft jouw zaak een eigen website nodig?</h1>
        <p className="text-lg md:text-xl text-white/65 max-w-2xl mx-auto leading-relaxed">Op een eigen website leg je uit wat je zaak doet, laat je werk zien en help je klanten contact opnemen of bestellen. Wat heeft jouw onderneming daarvoor nodig?</p>
        <div className="mt-8 text-sm text-white/45"><span>Door Kevin Bourguignon</span><span className="mx-2">•</span><time dateTime="2026-10-22">Bijgewerkt op 22 oktober 2026</time></div>
      </div>
    </header>

    <main>
      <article className="px-6 py-16 md:py-24">
        <div className="max-w-3xl mx-auto prose prose-lg prose-slate">
          <p className="text-xl md:text-2xl text-slate-800 font-medium leading-relaxed">Een mogelijke klant hoort je naam, ziet je zaak of zoekt een dienst in de buurt. Daarna volgt vaak een controle: wat doet dit bedrijf precies, ziet het er betrouwbaar uit en hoe neem ik contact op? Een eigen website kan die drie vragen zonder omweg beantwoorden.</p>

          <h2>Een website en sociale media hebben een andere taak</h2>
          <p>Sociale media zijn nuttig om aandacht en contact op te bouwen. Een Google-bedrijfsprofiel toont praktische informatie en reviews. Platformen zoals reservatiesites of marktplaatsen kunnen bereik opleveren. Maar op al die plekken bepaalt iemand anders de vorm, het algoritme en de voorwaarden.</p>
          <p>Op een eigen website bepaal je zelf welke informatie eerst komt, welk bewijs zichtbaar is en welke stap de bezoeker kan zetten. Dat maakt sociale media niet overbodig. De kanalen versterken elkaar juist wanneer ze naar één actuele, geloofwaardige basis verwijzen.</p>

          <h2>Vindbaarheid begint met een bruikbaar antwoord</h2>
          <p>Een website wordt niet automatisch hoog geplaatst omdat er een plaatsnaam of zoekterm op staat. Google probeert pagina’s te tonen die de vraag van een zoeker goed beantwoorden. Techniek helpt Google de pagina vinden en begrijpen; inhoud, bewijs, concurrentie en bekendheid bepalen mee of ze ook sterk genoeg is om hoog in de zoekresultaten te verschijnen.</p>
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
          <p>Begin met deze vragen:</p>
          <ol>
            <li>Hoe komen nieuwe klanten vandaag bij je terecht?</li>
            <li>Welke vragen stellen ze telkens opnieuw?</li>
            <li>Waar haken aanvragen of reservaties af?</li>
            <li>Welke handelingen kunnen bezoekers zelf veilig uitvoeren?</li>
            <li>Hoeveel is één aanvraag van een mogelijke klant gemiddeld waard?</li>
          </ol>
          <p>Daaruit volgt wat een website moet doen. Soms is een compacte presentatiesite voldoende. Soms is een webshop, afsprakenpagina, klantenkaart of kleine webapplicatie zinvoller.</p>

          <h2>De vijf onderdelen van een sterke bedrijfswebsite</h2>
          <h3>1. Uitleg over je aanbod</h3>
          <p>De openingssectie moet niet alles vertellen. Ze moet wel duidelijk maken voor wie de onderneming werkt, wat klanten er kunnen krijgen en waarom de bezoeker verder moet lezen.</p>
          <h3>2. Aantoonbaar bewijs</h3>
          <p>Echte projecten, eigen foto’s, verifieerbare resultaten en persoonlijke uitleg zijn sterker dan algemene superlatieven. Een case hoeft geen succesverhaal zonder nuance te zijn; de gemaakte keuzes zijn vaak het interessantste bewijs.</p>
          <h3>3. Goede mobiele prestaties</h3>
          <p>Tekst moet leesbaar zijn en knoppen moeten ook op een klein scherm bruikbaar blijven. Beelden mogen het laden niet onnodig vertragen. Controleer ook of de pagina niet verspringt terwijl iemand probeert te lezen of te klikken.</p>
          <h3>4. Een indeling waarin klanten hun weg vinden</h3>
          <p>Geef diensten of productgroepen een eigen pagina als klanten daar andere vragen over hebben. Een locatiepagina is nuttig wanneer je er eigen informatie kunt geven, zoals bereikbaarheid, aanbod of lokale projecten.</p>
          <h3>5. Een meetbare volgende stap</h3>
          <p>De website moet niet alleen verkeer verzamelen. Telefoonkliks, WhatsApp, succesvolle formulieren, reservaties of verkopen moeten meetbaar zijn zonder persoonlijke formulierinhoud naar analytics te sturen.</p>

          <h2>Wanneer is een nieuwe website niet de eerste prioriteit?</h2>
          <p>Als aanbod, doelgroep of opvolging nog volledig onduidelijk zijn, lost een groter ontwerp dat niet op. Ook een website zonder actuele bedrijfsgegevens, zonder iemand die aanvragen beantwoordt of zonder bruikbaar bewijs zal weinig veranderen. Dan is het verstandiger eerst die basis op orde te brengen.</p>


          <h2>Een realistische start</h2>
          <p>{pricingSummary}</p>
          <div className="not-prose mt-12 p-8 bg-slate-900 text-white rounded-2xl">
            <p className="text-sm uppercase tracking-wider text-amber-300 font-bold mb-3">Volgende stap</p>
            <h2 className="text-3xl font-serif mb-4">Bespreek wat je website werkelijk moet doen.</h2>
            <p className="text-white/65 mb-6">Vertel wat je aanbiedt, welke vragen je klanten stellen en wat er nu niet goed werkt.</p>
            <a href="/#contact" className="inline-flex bg-amber-500 text-slate-950 font-bold px-6 py-3 rounded-lg">Bespreek je website →</a>
          </div>
        </div>
      </article>
    </main>

    <footer className="bg-slate-950 text-white px-6 py-12"><div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-6 justify-between"><a href="/" className="block w-52" aria-label="Webaanzee, naar de startpagina"><Logo /></a><nav className="flex flex-wrap gap-5 text-sm text-white/60"><a href="/diensten/webdesign/">Webdesign</a><a href="/cases/">Projecten</a><a href="/webdesign-belgische-kust/">Kustregio</a><a href="/privacy.html">Privacy</a></nav></div></footer>
    <CrispChat />
  </div>
);

export default BlogArticle;
