import React from 'react';
import { ArrowDown, ArrowLeft, ArrowUpRight } from 'lucide-react';
import Header from './Header';
import Logo from './Logo';
import CrispChat from './CrispChat';

const BlogArticle: React.FC = () => (
  <div className="journal-page">
    <a className="journal-skip" href="#artikel">Naar het artikel</a>
    <Header light />
    <main>
      <article>
        <header className="journal-hero journal-shell">
          <a className="journal-back" href="/inzichten/"><ArrowLeft size={16} aria-hidden="true" /> Alle inzichten</a>
          <h1>Je zaak draait.<br />Wat voegt een <em>website</em> dan toe?</h1>
          <div className="journal-intro">
            <p>Je klanten komen via via. Je Instagram leeft. Misschien zit je agenda zelfs vol. Een website lijkt dan iets voor later. Toch kan ze iets doen wat die andere kanalen moeilijk overnemen: laten zien waarom iemand bij jou moet zijn.</p>
            <a href="#artikel" className="journal-read">Lees verder <ArrowDown size={18} aria-hidden="true" /></a>
          </div>
          <div className="journal-byline">
            <img src="/selfie.webp" alt="" width="48" height="48" />
            <div><span>Kevin Bourguignon</span><span>Webdesigner bij Webaanzee</span></div>
            <time dateTime="2026-10-27">27 oktober 2026</time>
          </div>
        </header>

        <div className="journal-layout journal-shell" id="artikel">
          <aside className="journal-aside">
            <nav aria-label="In dit artikel">
              <p>In dit artikel</p>
              <a href="#eerste-indruk">Na de aanbeveling</a>
              <a href="#sociale-media">Naast je sociale media</a>
              <a href="#goede-website">Wat erop moet staan</a>
              <a href="#wanneer">Wanneer is het de moeite?</a>
            </nav>
          </aside>
          <div className="journal-body">
            <p className="journal-lead">Een website hoeft je zaak niet groter te doen lijken. Ze moet laten voelen hoe goed je werk al is.</p>
            <p>Dat is voor mij het vertrekpunt. Geen pagina’s vullen omdat er nu eenmaal tekst op moet. Wel uitzoeken wat iemand nodig heeft om te denken: hier wil ik klant worden.</p>

            <section id="eerste-indruk">
              <h2>Een aanbeveling is het begin van het gesprek.</h2>
              <p>Stel: iemand krijgt jouw naam door van een vriend. Een sterke start. Maar die persoon heeft je nog nooit ontmoet. Die wil je werk bekijken, weten wat je precies doet en aanvoelen of het past.</p>
              <p>Op dat moment kan je website het overnemen. Een interieurmaker kan een afgewerkt project tonen, met aandacht voor materiaal en details. Een restaurant kan de sfeer, de kaart en de manier van reserveren samenbrengen. Je geeft de bezoeker iets concreets om op af te gaan.</p>
              <p>Als je werk verzorgd is, moet je online presentatie dat ook zijn. Onduidelijke teksten, oude foto’s of een onhandig contactformulier maken die eerste kennismaking onnodig moeilijk.</p>
            </section>

            <section id="sociale-media">
              <h2>Op Instagram zien mensen wat je doet. Op je website vinden ze de samenhang.</h2>
              <p>Een post toont een moment: een nieuw product, een project, een blik achter de schermen. Dat werkt goed om je zaak te laten leven. Alleen wil een nieuwe bezoeker niet altijd door maanden aan berichten scrollen om je aanbod te begrijpen.</p>
              <p>Een eigen website geeft die informatie een vaste plek. Wat je aanbiedt. Voor wie. Hoe je werkt. Hoe iemand kan bestellen, reserveren of je iets vragen. Vanuit je profiel of een bericht kan je daar rechtstreeks naartoe verwijzen.</p>
              <p>Je hoeft dus niet te kiezen. Laat je sociale media de aandacht trekken en geef geïnteresseerde mensen een plek waar ze rustig verder kunnen kijken.</p>
            </section>

            <section id="goede-website">
              <h2>Je hebt minder nodig dan je denkt. Maar het moet wel kloppen.</h2>
              <p>Een kleine zaak heeft niet vanzelf een grote website nodig. Een paar goed uitgewerkte pagina’s kunnen veel vertellen. Ik zou beginnen bij drie dingen:</p>
              <dl className="journal-essentials">
                <div><dt>Vertel helder wat je doet.</dt><dd>Schrijf zoals je het aan een klant zou uitleggen. “Wij leggen terrassen aan in natuursteen” zegt meer dan “jouw partner voor totaaloplossingen”.</dd></div>
                <div><dt>Laat je werk het bewijzen.</dt><dd>Toon eigen foto’s en projecten. Vertel wat de vraag was en welke keuzes je maakte. Zo leert iemand je werk kennen, nog vóór het eerste gesprek.</dd></div>
                <div><dt>Maak de volgende stap gemakkelijk.</dt><dd>Een tafel reserveren, een offerte vragen of even bellen: laat de bezoeker meteen zien hoe dat kan. Ook op een telefoon, zonder te moeten zoeken.</dd></div>
              </dl>
              <p>Het ontwerp brengt dat bij elkaar. De beelden, de woorden, de ruimte ertussen. Het mag karakter hebben. Het moet vooral aanvoelen als jouw zaak.</p>
            </section>

            <figure className="journal-example">
              <a href="/cases/fabrice-goffin-oostende/" aria-label="Bekijk de website voor de schepen van Digitalisering">
                <img src="/images/cases/schepen-digitalisering/intro.webp" alt="De persoonlijke website van de Oostendse schepen van Digitalisering" width="1440" height="900" loading="lazy" />
              </a>
              <figcaption><p>Voor de Oostendse schepen van Digitalisering ontwierp en bouwde ik een website die zijn persoonlijke verhaal en beleidswerk samenbrengt. Inwoners kunnen er standpunten lezen, nieuws volgen en contact opnemen.</p><a href="/cases/fabrice-goffin-oostende/">Bekijk het project <ArrowUpRight size={17} aria-hidden="true" /></a></figcaption>
            </figure>

            <section id="wanneer">
              <h2>En als je nu al genoeg klanten hebt?</h2>
              <p>Dan hoeft “meer aanvragen” niet het doel te zijn. Misschien wil je vooral andere opdrachten aantrekken. Minder vaak dezelfde uitleg geven. Of een plek hebben die je met vertrouwen doorstuurt wanneer iemand naar je werk vraagt.</p>
              <p>Is je aanbod nog volop aan het veranderen? Of vinden klanten vandaag al vlot alles wat ze nodig hebben? Dan kan een nieuwe website gerust wachten. Er moet een goede reden zijn om eraan te beginnen.</p>
              <p>Vraag jezelf daarom eerst af: <strong>wat zou ik mijn volgende klant graag laten zien of gemakkelijker maken?</strong> Als je daar een antwoord op hebt, weet je ook waar je website moet beginnen.</p>
            </section>

            <div className="journal-closing">
              <h2>Verdient je werk een betere plek online?</h2>
              <p>Stuur me wat je vandaag hebt, of vertel over je plannen. Dan bekijken we samen wat bij je zaak past.</p>
              <a href="/#contact">Vertel me over je zaak <ArrowUpRight size={20} aria-hidden="true" /></a>
            </div>
            <a href="/inzichten/" className="journal-back journal-bottom-back"><ArrowLeft size={16} aria-hidden="true" /> Terug naar alle inzichten</a>
          </div>
        </div>
      </article>
    </main>
    <footer className="journal-footer"><div className="journal-shell"><a href="/" className="journal-footer-logo" aria-label="Webaanzee, naar de startpagina"><Logo /></a><p>Goed werk verdient een goede website.</p><nav aria-label="Voetnavigatie"><a href="/cases/">Mijn werk</a><a href="/#contact">Contact</a><a href="/privacy.html">Privacy</a></nav></div></footer>
    <CrispChat />
  </div>
);

export default BlogArticle;
