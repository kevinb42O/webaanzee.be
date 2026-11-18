import React from 'react';
import { ArrowRight, BarChart3, Box, Check, ChevronRight, CreditCard, Grid2X2, PackageCheck, Receipt, ScanBarcode, Search, ShoppingBag, UsersRound } from 'lucide-react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import './index.css';
import styles from './components/Pwayment.module.css';
import { pwaymentScreens } from './data/pwayment-screens.mjs';

const [posScreen, insightsScreen, ...workspaceScreens] = pwaymentScreens;
const screenshotSizes = '(max-width: 720px) calc(100vw - 40px), (max-width: 1050px) 90vw, 680px';
const features = [
  { icon: ScanBarcode, number: '01', title: 'Producten zoeken en een verkoop samenstellen.', text: 'Zoek een product via categorie, favoriet of barcode en voeg het toe aan de winkelmand.' },
  { icon: CreditCard, number: '02', title: 'Registreer hoe de klant betaalt.', text: 'Registreer cash, kaartbetalingen en cadeaubonnen bij de verkoop. Een rechtstreekse terminalkoppeling vraagt aparte afstemming en hardwarecontrole.' },
  { icon: BarChart3, number: '03', title: 'Bekijk verkoop en voorraad per product.', text: 'Bekijk omzet, productverkopen en voorraadbewegingen. Welke rapporten je krijgt, hangt af van je formule.' },
];
const appUrl = 'https://pwayment.vercel.app/';
const demoUrl = 'https://pwayment.vercel.app/demo';
const pricingUrl = 'https://pwayment.vercel.app/pricing';
const contactUrl = 'https://pwayment.vercel.app/contact';

export const PwaymentPage = () => (
  <div className={styles.page}>
    <header className={styles.header}>
      <a className={styles.brand} href="#top" aria-label="PWAYMENT startpagina"><img className={styles.brandLogo} src="https://pwayment.vercel.app/branding/pwayment-logo.svg" alt="PWAYMENT" /></a>
      <nav aria-label="Hoofdnavigatie"><a href="/" className={styles.backLink}>← Webaanzee</a><a href="#werkt">Hoe het werkt</a><a href="#functies">Functies</a><a href="#retail">Voor retail</a></nav>
      <a className={styles.headerCta} href={appUrl} target="_blank" rel="noreferrer">Bekijk het platform <ArrowRight aria-hidden="true" /></a>
      <a className={styles.mobileBackLink} href="/">← Webaanzee</a>
    </header>
    <main id="top">
      <section className={styles.hero}>
        <div className={styles.heroCopy}>
          <div className={styles.eyebrow}><span /> Kassasoftware voor Belgische winkels</div>
          <h1>Kassa, voorraad en klanten.<br /><em>Voor je winkel.</em></h1>
          <p>Zoek producten, stel een verkoop samen en registreer de betaling. PWAYMENT verbindt je kassa met product- en voorraadbeheer. Uitgebreidere formules voegen onder meer klantbeheer en verkoopinzichten toe.</p>
          <div className={styles.heroActions}>
            <a className={styles.primaryButton} href={demoUrl} target="_blank" rel="noreferrer">Vraag een demo aan <ArrowRight aria-hidden="true" /></a>
            <a className={styles.textButton} href={contactUrl} target="_blank" rel="noreferrer">Bespreek je winkel <ChevronRight aria-hidden="true" /></a>
          </div>
          <p className={styles.heroNote}><Check aria-hidden="true" /> Basis-formule: €0 · 1 locatie · 1 kassascherm · tot 250 actieve producten</p><a className={styles.textButton} href={pricingUrl} target="_blank" rel="noreferrer">Bekijk formules en tarieven <ChevronRight aria-hidden="true" /></a>
        </div>
        <div className={styles.posScene} aria-label="Voorbeeld van de PWAYMENT kassa">
          <div className={styles.glow} />
          <a className={styles.screenLink} href={posScreen.full} target="_blank" rel="noopener" aria-label="Vergroot de huidige PWAYMENT-kassa (nieuw tabblad)"><img className={styles.realScreen} src={posScreen.src} srcSet={posScreen.srcSet} sizes={screenshotSizes} width={posScreen.width} height={posScreen.height} alt={posScreen.alt} fetchPriority="high" /></a><p className={styles.exampleCaption}>Huidige interface · lokale demogegevens · klik om te vergroten</p>
        </div>
      </section>
      <section className={styles.proofStrip} aria-label="PWAYMENT kernpunten"><p><b>Verkoop en voorraad.</b> Producten en transacties bij elkaar.</p><div><span><ScanBarcode /> Kassa</span><span><Box /> Voorraad</span><span><UsersRound /> Klanten</span><span><ShoppingBag /> Webshop</span></div></section>
      <section className={styles.intro} id="werkt"><div className={styles.sectionEyebrow}>De winkelvloer eerst</div><div><h2>Van product zoeken<br /><em>tot dagoverzicht.</em></h2><p>Tijdens de verkoop wil je producten vinden, prijzen controleren en de betaling vastleggen. Na sluitingstijd wil je je verkopen en voorraad kunnen nakijken.</p></div></section>
      <section className={styles.problemGrid} aria-label="Herkenbare uitdagingen in retail">
        <p>Producten zoeken op naam, categorie of barcode.</p><p>Verkopen en voorraadbewegingen raadplegen.</p><p>Een winkelmand samenstellen aan de kassa.</p><p>De dag afsluiten met een verkoopoverzicht.</p>
      </section>
      <section className={styles.features} id="functies">{features.map(({ icon: Icon, number, title, text }) => <article key={number}><div className={styles.featureTop}><span>{number}</span><Icon /></div><h3>{title}</h3><p>{text}</p><a href={appUrl} target="_blank" rel="noreferrer">Bekijk PWAYMENT <ArrowRight aria-hidden="true" /></a></article>)}</section>
      <section className={styles.sectors}><div><div className={styles.sectionEyebrow}>Voor boetieks en speciaalzaken</div><h2>Welke winkel<br />heb je?</h2></div><div className={styles.sectorCards}><article><small>01</small><h3>Boetieks en kledingwinkels</h3><p>Beheer maten, kleuren en barcodes bij je producten. Cadeaubonnen en uitgebreid klantbeheer zijn beschikbaar in de betaalde formules.</p></article><article><small>02</small><h3>Speciaalzaken</h3><p>Zoek artikelen in je catalogus en bekijk de voorraad. De Basis-formule ondersteunt maximaal 250 actieve producten.</p></article><article><small>03</small><h3>Winkels met meerdere locaties</h3><p>Bespreek de locaties, toestellen en toegangsrechten die je nodig hebt. Beheer over meerdere locaties zit in de Enterprise-formule.</p></article></div></section>
      <section className={styles.insightSection} id="retail">
        <div className={styles.insightCopy}><div className={styles.sectionEyebrow}>Producten en voorraad</div><h2>Wat verkoopt er?<br />Wat ligt er nog?</h2><p>Bekijk productverkopen en voorraadbewegingen bij elkaar. Uitgebreide verkoop-, marge- en klantinzichten zijn onderdeel van de betaalde formules. Tijdens een demo bekijken we welke informatie je voor je winkel nodig hebt.</p><ul><li><Check /> Verkoop en voorraad bij elkaar</li><li><Check /> Inzicht per product en periode</li><li><Check /> Rapporten volgens je formule</li></ul><a className={styles.darkButton} href={demoUrl} target="_blank" rel="noreferrer">Vraag een demo aan <ArrowRight aria-hidden="true" /></a></div>
        <div className={styles.currentInsights}><a className={styles.screenLink} href={insightsScreen.full} target="_blank" rel="noopener" aria-label="Vergroot de huidige verkoopinzichten (nieuw tabblad)"><img className={styles.realInsights} src={insightsScreen.src} srcSet={insightsScreen.srcSet} sizes={screenshotSizes} width={insightsScreen.width} height={insightsScreen.height} alt={insightsScreen.alt} loading="lazy" /></a><p className={styles.captureNote}>Verkoopinzichten met demogegevens · klik om te vergroten</p></div>
      </section>
      <section className={styles.workspaceGallery} aria-labelledby="workspace-title">
        <div className={styles.workspaceIntro}><h2 id="workspace-title">De beheeromgeving achter de kassa.</h2><p>Van voorraad en klantgegevens tot de inrichting van een werkplek en toegang voor medewerkers. Deze opnames tonen de huidige toepassing met lokale demogegevens.</p></div>
        <div className={styles.workspaceScreens}>{workspaceScreens.map(screen => <figure key={screen.name} className={styles.workspaceFigure}>
          <a className={styles.screenLink} href={screen.full} target="_blank" rel="noopener" aria-label={`Vergroot ${screen.title.toLowerCase()} (nieuw tabblad)`}><img src={screen.src} srcSet={screen.srcSet} sizes="(max-width: 720px) calc(100vw - 40px), (max-width: 1320px) 90vw, 1240px" width={screen.width} height={screen.height} alt={screen.alt} loading="lazy" decoding="async" /><span>Vergroot afbeelding <ArrowRight aria-hidden="true" size={18} /></span></a>
          <figcaption><h3>{screen.title}</h3><p>{screen.text}</p></figcaption>
        </figure>)}</div>
      </section>
      <section className={styles.onboarding}><div className={styles.sectionEyebrow}>Van installatie tot eerste verkoop</div><h2>Je kassa inrichten.<br /><em>Met uitleg voor je team.</em></h2><div>{[['01','Kennismaking','We bespreken je assortiment, toestellen en dagelijkse werkwijze.'],['02','Configuratie','We leggen vast welke artikelen je overneemt en welke toestellen en betaalwijzen je wilt gebruiken.'],['03','Installatie & uitleg','Je team krijgt uitleg over verkopen, voorraad en dagafsluiting.'],['04','Later uitbreiden','Extra toestellen, locaties en functies bespreken we met de bijbehorende formule en kosten.']].map(([number,title,text]) => <article key={number}><small>{number}</small><h3>{title}</h3><p>{text}</p></article>)}</div><a className={styles.darkButton} href={contactUrl} target="_blank" rel="noreferrer">Bespreek je winkel <ArrowRight aria-hidden="true" /></a></section>
      <section className={styles.faq}><div><div className={styles.sectionEyebrow}>Formules, hardware en gebruik</div><h2>Veelgestelde<br />vragen.</h2><p>Bekijk eerst wat je met de Basis-formule kunt doen. Voor extra functies, hardware en inrichting bespreken we je winkel en de bijbehorende kosten.</p><a className={styles.darkButton} href={contactUrl} target="_blank" rel="noreferrer">Bespreek je winkel <ArrowRight aria-hidden="true" /></a></div><div>{[['Voor welke winkels is PWAYMENT POS geschikt?','Voor boetieks, speciaalzaken en andere winkels met een productassortiment. De Basis-formule omvat één locatie, één kassascherm en maximaal 250 actieve producten. Extra functies en locaties hangen af van de gekozen formule.'],['Verwerkt PWAYMENT ook kaartbetalingen?','Je kunt cash, kaartbetalingen en cadeaubonnen registreren bij een verkoop. Een kaartbetaling registreren is iets anders dan een terminal aansturen. De gewenste terminalkoppeling en hardware moeten vooraf op compatibiliteit worden gecontroleerd.'],['Kan ik voorraad en productvarianten beheren?','Ja. PWAYMENT heeft product- en voorraadbeheer, met varianten zoals maten en kleuren. Retail Professional omvat onbeperkte producten en varianten. De Basis-formule is beperkt tot 250 actieve producten.'],['Kan ik met bestaande hardware starten?','Stuur de merken en modellen van je scanner, printer en eventuele andere toestellen mee. Compatibiliteit verschilt per toestel en formule; bestaande hardware wordt niet automatisch ondersteund.'],['Wat kost PWAYMENT?','De Basis-formule kost €0 en omvat één locatie, één kassascherm en maximaal 250 actieve producten. Uitgebreide functies en meerdere locaties vallen onder betaalde formules. Toestellen, installatie en begeleiding staan apart. Bekijk de actuele formules op de PWAYMENT-tarievenpagina.'],['Werkt de kassa zonder internet?', 'Op een vooraf ingericht kassatoestel blijven de lokale catalogus, winkelmand en verkoopregistratie beschikbaar. Synchronisatie gebeurt zodra de verbinding terugkomt. Externe betaaldiensten en terminalverbindingen hebben eigen verbindingsvereisten.'],['Kan ik eerst een demo krijgen?','Ja. Vraag een demo aan en vermeld welk type winkel je hebt en welke onderdelen je wilt bekijken.']].map(([question,answer]) => <details key={question}><summary>{question}<span>+</span></summary><p>{answer}</p></details>)}</div></section>
      <section className={styles.closing}><div className={styles.closingOrb} /><div className={styles.sectionEyebrow}>Bekijk de kassa in gebruik</div><h2>Bekijk een verkoop.<br /><em>Van scan tot overzicht.</em></h2><p>Vraag een demo aan met je eigen assortiment en werkwijze als vertrekpunt.</p><a className={styles.lightButton} href={demoUrl} target="_blank" rel="noreferrer">Vraag een demo aan <ArrowRight aria-hidden="true" /></a></section>
    </main>
    <footer className={styles.footer}><a className={styles.brand} href="#top"><img className={styles.brandLogo} src="https://pwayment.vercel.app/branding/pwayment-logo.svg" alt="PWAYMENT" /></a><p>Kassasoftware, productbeheer en voorraad voor Belgische winkels.</p><span>© {new Date().getFullYear()} PWAYMENT</span></footer>
  </div>
);
if (typeof document !== 'undefined') {
  const root = document.getElementById('root');
  if (!root) throw new Error('Could not find root element to mount to');
  const app = <React.StrictMode><PwaymentPage /></React.StrictMode>;
  if (root.hasChildNodes()) hydrateRoot(root, app);
  else createRoot(root).render(app);
}
