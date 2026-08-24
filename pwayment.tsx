import React from 'react';
import { ArrowRight, BarChart3, Box, Check, ChevronRight, CreditCard, Grid2X2, PackageCheck, Receipt, ScanBarcode, Search, ShoppingBag, UsersRound } from 'lucide-react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import './index.css';
import styles from './components/Pwayment.module.css';

const products = [['Linnen blouse', '€ 89,00', 'LIN'], ['Canvas tas', '€ 34,95', 'CAN'], ['Zijden sjaal', '€ 59,00', 'ZIJ'], ['Wollen gilet', '€ 119,00', 'WOL']];
const features = [
  { icon: ScanBarcode, number: '01', title: 'Minder wachten. Meer tevreden klanten.', text: 'Vind producten via categorie, favoriet of barcode en rond een verkoop af in een rustige, herkenbare flow.' },
  { icon: CreditCard, number: '02', title: 'Laat uw klant betalen zoals hij wil.', text: 'Houd cash, PIN en cadeaubonnen samen in dezelfde verkoopflow, zonder losse handelingen aan de kassa.' },
  { icon: BarChart3, number: '03', title: 'Weet wat er verkoopt — terwijl uw zaak draait.', text: 'Kijk naar verkoopprestaties, producten en voorraad om scherper te zien waar uw winkel beweegt.' },
];
const appUrl = 'https://pwayment.vercel.app/';
const demoUrl = 'https://pwayment.vercel.app/demo';
const contactUrl = 'https://pwayment.vercel.app/contact';

export const PwaymentPage = () => (
  <div className={styles.page}>
    <header className={styles.header}>
      <a className={styles.brand} href="#top" aria-label="PWAYMENT home"><img className={styles.brandLogo} src="https://pwayment.vercel.app/branding/pwayment-logo.svg" alt="PWAYMENT" /></a>
      <nav aria-label="Hoofdnavigatie"><a href="/" className={styles.backLink}>← Webaanzee</a><a href="#werkt">Hoe het werkt</a><a href="#functies">Functies</a><a href="#retail">Voor retail</a></nav>
      <a className={styles.headerCta} href={appUrl} target="_blank" rel="noreferrer">Bekijk het platform <ArrowRight aria-hidden="true" /></a>
      <a className={styles.mobileBackLink} href="/">← Webaanzee</a>
    </header>
    <main id="top">
      <section className={styles.hero}>
        <div className={styles.heroCopy}>
          <div className={styles.eyebrow}><span /> Retail POS voor Belgische winkels</div>
          <h1>Alles wat u nodig heeft<br /><em>om sneller te verkopen.</em></h1>
          <p>PWAYMENT brengt kassaverkoop, betalingen en uw dagelijkse overzicht samen in één gebruiksvriendelijke oplossing. Minder handelingen aan de kassa, meer tijd voor uw klanten.</p>
          <div className={styles.heroActions}>
            <a className={styles.primaryButton} href={demoUrl} target="_blank" rel="noreferrer">Plan uw gratis demo <ArrowRight aria-hidden="true" /></a>
            <a className={styles.textButton} href={contactUrl} target="_blank" rel="noreferrer">Vraag advies voor uw zaak <ChevronRight aria-hidden="true" /></a>
          </div>
          <div className={styles.heroNote}><Check aria-hidden="true" /> Offline-first kassa · basis blijft gratis · cash, PIN en cadeaubon</div>
        </div>
        <div className={styles.posScene} aria-label="Voorbeeld van de PWAYMENT kassa">
          <div className={styles.glow} />
          <img className={styles.realScreen} src="https://pwayment.vercel.app/website/pwayment-pos-current.jpg" alt="PWAYMENT kassasysteem met productcatalogus en winkelmand" />
          <div className={styles.posWindow}>
            <div className={styles.posTopbar}><div className={styles.windowDots}><i /><i /><i /></div><span>Maandag, 14:38</span><div className={styles.staff}><span>LM</span> Lisa M.</div></div>
            <div className={styles.posBody}>
              <aside className={styles.posSidebar}><b className={styles.miniMark}>P</b><span className={styles.activeSide}><Grid2X2 /></span><span><ShoppingBag /></span><span><UsersRound /></span><span><BarChart3 /></span><span><Receipt /></span></aside>
              <div className={styles.catalog}>
                <div className={styles.catalogHeader}><div><small>Winkel · Kassa 1</small><h2>Nieuwe verkoop</h2></div><button aria-label="Zoeken"><Search /></button></div>
                <div className={styles.categoryPills}><b>Alles</b><span>Dames</span><span>Accessoires</span><span>Nieuw</span></div>
                <div className={styles.products}>{products.map(([name, price, code], i) => <article key={name}><div className={`${styles.productVisual} ${styles[`product${i}`]}`}><span>{code}</span></div><strong>{name}</strong><small>{price}</small></article>)}</div>
              </div>
              <aside className={styles.cart}>
                <div className={styles.cartHeading}><div><small>Huidige verkoop</small><b>3 artikelen</b></div><button>⋯</button></div>
                <div className={styles.cartLines}><div><span><b>Canvas tas</b><small>Natuur · 1×</small></span><strong>€ 34,95</strong></div><div><span><b>Linnen blouse</b><small>Oker · M · 1×</small></span><strong>€ 89,00</strong></div><div><span><b>Zijden sjaal</b><small>Cobalt · 1×</small></span><strong>€ 59,00</strong></div></div>
                <div className={styles.cartTotal}><span>Subtotaal <b>€ 182,95</b></span><span>Btw <b>€ 31,74</b></span><strong>Totaal <b>€ 182,95</b></strong></div>
                <button className={styles.payButton}><CreditCard /> Afrekenen <span>€ 182,95</span></button>
              </aside>
            </div>
          </div>
          <div className={styles.floatCard}><div className={styles.floatIcon}><PackageCheck /></div><div><small>Voorraad bijgewerkt</small><b>Canvas tas · 12 op voorraad</b></div><Check /></div>
        </div>
      </section>
      <section className={styles.proofStrip} aria-label="PWAYMENT kernpunten"><p><b>Één systeem.</b> Elke verkoop vertelt meteen het vervolgverhaal.</p><div><span><ScanBarcode /> Kassa</span><span><Box /> Voorraad</span><span><UsersRound /> Klanten</span><span><ShoppingBag /> Webshop</span></div></section>
      <section className={styles.intro} id="werkt"><div className={styles.sectionEyebrow}>De winkelvloer eerst</div><div><h2>Uw kassa moet meer doen<br /><em>dan afrekenen.</em></h2><p>Een drukke winkel vraagt geen extra systeem om bij te houden. U wilt vlot verkopen, fouten vermijden en na sluitingstijd meteen weten hoe uw zaak ervoor staat.</p></div></section>
      <section className={styles.problemGrid} aria-label="Herkenbare uitdagingen in retail">
        <p>Te veel tijd kwijt met producten zoeken of prijzen ingeven?</p><p>Geen helder zicht op wat vandaag verkoopt of blijft liggen?</p><p>Lange wachtrijen net wanneer uw winkel op z’n drukst is?</p><p>Te veel administratie nadat de deur al dicht is?</p>
      </section>
      <section className={styles.features} id="functies">{features.map(({ icon: Icon, number, title, text }) => <article key={number}><div className={styles.featureTop}><span>{number}</span><Icon /></div><h3>{title}</h3><p>{text}</p><a href={appUrl} target="_blank" rel="noreferrer">Ontdek de flow <ArrowRight aria-hidden="true" /></a></article>)}</section>
      <section className={styles.sectors}><div><div className={styles.sectionEyebrow}>Gemaakt voor echte winkelvloeren</div><h2>Past bij de manier<br />waarop u verkoopt.</h2></div><div className={styles.sectorCards}><article><small>01</small><h3>Boetieks & fashion</h3><p>Werk met producten, varianten, kortingen en cadeaubonnen in een snelle verkoopflow.</p></article><article><small>02</small><h3>Speciaalzaken</h3><p>Houd een uitgebreide catalogus en voorraad overzichtelijk, ook als uw assortiment groeit.</p></article><article><small>03</small><h3>Groeiende retail</h3><p>Beheer verkoop, klanten en inzichten in één werkplek in plaats van losse tools.</p></article></div></section>
      <section className={styles.insightSection} id="retail">
        <div className={styles.insightCopy}><div className={styles.sectionEyebrow}>Van gevoel naar overzicht</div><h2>Verkoop wat u op voorraad hebt,<br />zonder giswerk.</h2><p>Elke verkoop vertelt u iets. PWAYMENT brengt verkoop, product- en voorraadprestaties samen zodat u sneller ziet wat beweegt, wat blijft liggen en waar u kunt bijsturen.</p><ul><li><Check /> Verkoop en voorraad in één werkplek</li><li><Check /> Inzicht per product en periode</li><li><Check /> Een overzicht dat werkt voor de winkelvloer</li></ul><a className={styles.darkButton} href={demoUrl} target="_blank" rel="noreferrer">Plan uw gratis demo <ArrowRight aria-hidden="true" /></a></div>
        <div className={styles.insightPanel} aria-label="Voorbeeld van retail inzichten"><img className={styles.realInsights} src="https://pwayment.vercel.app/website/pwayment-insights-performance-current.jpg" alt="PWAYMENT verkoopprestaties met omzet, brutowinst en omzetgrafiek" /></div>
      </section>
      <section className={styles.onboarding}><div className={styles.sectionEyebrow}>Van installatie tot eerste verkoop</div><h2>U staat er niet<br /><em>alleen voor.</em></h2><div>{[['01','Kennismaking','We bekijken wat uw zaak nodig heeft.'],['02','Configuratie','Artikelen, betalingen en hardware worden op uw flow afgestemd.'],['03','Installatie & uitleg','Uw team leert werken met een heldere, herkenbare kassa.'],['04','Verder bouwen','Wanneer uw zaak groeit, groeit uw setup mee.']].map(([number,title,text]) => <article key={number}><small>{number}</small><h3>{title}</h3><p>{text}</p></article>)}</div><a className={styles.darkButton} href={contactUrl} target="_blank" rel="noreferrer">Vraag advies voor uw winkel <ArrowRight aria-hidden="true" /></a></section>
      <section className={styles.faq}><div><div className={styles.sectionEyebrow}>Eerst helderheid. Dan vooruit.</div><h2>Veelgestelde<br />vragen.</h2><p>Weet u al wat u nodig hebt? Plan meteen een demo. Twijfelt u nog? Dan bekijken we eerst wat bij uw winkel past.</p><a className={styles.darkButton} href={contactUrl} target="_blank" rel="noreferrer">Vraag advies voor uw zaak <ArrowRight aria-hidden="true" /></a></div><div>{[['Voor welke winkels is PWAYMENT POS geschikt?','PWAYMENT is ontworpen voor retail: van een eerste zelfstandige winkel tot een groeiende winkelopstelling met meer producten, klanten en locaties.'],['Welke betaalmogelijkheden zitten in de verkoopflow?','In de huidige PWAYMENT-flow ziet u cash, PIN en cadeaubonnen samen in één verkoop. Bespreek uw gewenste betaalopstelling tijdens een demo.'],['Kan ik voorraad en productvarianten beheren?','PWAYMENT bevat product-, voorraad- en inzichtenschermen. We tonen graag hoe dit aansluit op uw assortiment en dagelijkse werkwijze.'],['Kan ik met bestaande hardware starten?','De juiste hardware hangt af van uw winkel en flow. Tijdens een kennismaking stemmen we scanner, printer, display en andere noden samen af.'],['Wat kost PWAYMENT?','U kunt starten met een gratis Basis-formule. Voor een professionele setup bekijken we samen welke toestellen, locaties en functies u nodig hebt.'],['Kan ik eerst een demo krijgen?','Ja. Plan een persoonlijke demo en bekijk de verkoopflow met uw eigen winkelcontext in gedachten.']].map(([question,answer]) => <details key={question}><summary>{question}<span>+</span></summary><p>{answer}</p></details>)}</div></section>
      <section className={styles.closing}><div className={styles.closingOrb} /><div className={styles.sectionEyebrow}>Klaar om vlotter te verkopen?</div><h2>Zie wat een heldere<br /><em>kassa verandert.</em></h2><p>Plan een demo en ontdek wat PWAYMENT voor uw winkel kan betekenen.</p><a className={styles.lightButton} href={demoUrl} target="_blank" rel="noreferrer">Plan uw gratis demo <ArrowRight aria-hidden="true" /></a></section>
    </main>
    <footer className={styles.footer}><a className={styles.brand} href="#top"><img className={styles.brandLogo} src="https://pwayment.vercel.app/branding/pwayment-logo.svg" alt="PWAYMENT" /></a><p>Het heldere retailplatform voor winkels die vooruit willen.</p><span>© {new Date().getFullYear()} PWAYMENT</span></footer>
  </div>
);
if (typeof document !== 'undefined') {
  const root = document.getElementById('root');
  if (!root) throw new Error('Could not find root element to mount to');
  const app = <React.StrictMode><PwaymentPage /></React.StrictMode>;
  if (root.hasChildNodes()) hydrateRoot(root, app);
  else createRoot(root).render(app);
}
