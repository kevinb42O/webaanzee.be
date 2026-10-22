import React, { useEffect, useState } from 'react';
import { motion, useMotionValueEvent, useTransform, type MotionValue } from 'motion/react';
import { ArrowUpRight, Plus } from 'lucide-react';
import { scrollToSection } from '../utils/scrollToSection';
import { euro, pricing } from '../data/pricing.mjs';
import styles from './Offer.module.css';

const ContactLink = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <a href="#contact" onClick={(event) => scrollToSection(event, 'contact')} className={className}>
    {children}<ArrowUpRight size={20} strokeWidth={1.6} aria-hidden="true" />
  </a>
);

const PricingHeader: React.FC = () => (
<header className={styles.header}>
        <h2 id="pricing-title">Wat kost<br />je <em>website?</em></h2>
        <div><p>Dit is inbegrepen in de startprijs. Hosting, beheer en eventuele extra’s staan apart, zodat je de bouwprijs en de terugkerende kosten kunt vergelijken.</p>
          <p className={styles.taxNote}>Alle prijzen zijn exclusief btw. Eenmalige bouw en doorlopende kosten staan apart.</p>
        </div>
      </header>
);

const offers = [
  {
    title: ['Website', 'op maat.'], label: 'Website op maat', price: pricing.website.price,
    description: 'Voor een zaak die haar aanbod wil tonen en bereikbaar wil zijn voor vragen en aanvragen.',
    scope: 'Geschikt als je de inhoud niet regelmatig zelf hoeft aan te passen.',
    features: ['Tot 5 pagina’s, in één taal', 'Ontwerp op maat, voor mobiel en desktop', 'Contactformulier en basis voor vindbaarheid', '2 gebundelde feedbackrondes en livegang'],
    limit: `Zonder eigen beheerscherm (CMS). Inhoud laten aanpassen kan aan ${euro(pricing.hourly)}/uur.`,
    recurring: `Hosting & technisch beheer via Webaanzee: vanaf ${euro(pricing.website.monthly)}/maand`, action: 'Bespreek mijn website',
  },
  {
    title: ['Website.', 'Zelf beheren.'], label: 'Website + CMS', price: pricing.cms.price,
    description: 'Pas zelf teksten en foto’s aan via een beveiligd beheerscherm. Je krijgt uitleg over het gebruik.',
    scope: 'We richten het beheer in voor één soort inhoud, bijvoorbeeld nieuws of projecten.',
    features: ['Alles van Website op maat, tot 8 pagina’s', 'Eigen CMS met beveiligde login', 'Teksten, foto’s en één soort inhoud beheren', 'Persoonlijke uitleg om zelf aan de slag te gaan'],
    limit: 'Extra soorten inhoud, statistieken, klantportalen en bedrijfsprocessen krijgen een aparte prijs in je offerte.',
    recurring: `Hosting & technisch beheer via Webaanzee: vanaf ${euro(pricing.cms.monthly)}/maand`, action: 'Bespreek mijn website met CMS',
  },
  {
    title: ['Jouw zaak.', 'Jouw webshop.'], label: 'Webshop', price: pricing.webshop.price,
    description: 'Een website met productbeheer, winkelmand en online betalen.',
    scope: 'Je levert productteksten, prijzen en foto’s aan. Ik richt de eerste 20 producten en de afgesproken verzendwijze in.',
    features: ['Productbeheer, winkelmand en online betalen', 'Inrichting van één betaalprovider', 'Inrichting van verzending', 'De eerste 20 producten, op basis van jouw aangeleverde inhoud'],
    limit: 'Transactiekosten en betaalde licenties apart.',
    recurring: `Hosting & technisch beheer vanaf ${euro(pricing.webshop.monthly)}/maand`, action: 'Bespreek mijn webshop',
  },
  {
    title: ['Een toepassing.', 'Voor je werk.'], label: 'Webapplicatie', price: pricing.application.price,
    description: 'Een webapplicatie of dashboard op maat. Voor een klantportaal, intern dashboard of automatisatie.',
    scope: 'We starten met één afgebakend proces en leggen schermen, gebruikersrollen en koppelingen vooraf vast.',
    features: ['Eén afgebakend proces als vertrekpunt', 'Schermen en gebruikersrollen vooraf vastgelegd', 'Koppelingen afgestemd op jouw proces'],
    limit: 'Hosting, technisch beheer en externe diensten op offerte, volgens gebruik en complexiteit.',
    recurring: 'Je krijgt vooraf één offerte met de exacte omvang en kosten.', action: 'Bespreek mijn toepassing',
  },
];

const FeatureText: React.FC<{ text: string }> = ({ text }) => {
  const match = text.match(/^(Tot 5 pagina’s|Alles van Website op maat|Eigen CMS|Teksten, foto’s|Persoonlijke uitleg|Ontwerp op maat|Contactformulier|2 gebundelde feedbackrondes|Productbeheer|Inrichting van één betaalprovider|Inrichting van verzending|De eerste 20 producten|Eén afgebakend proces|Schermen en gebruikersrollen|Koppelingen)/);
  return match ? <><strong>{match[0]}</strong>{text.slice(match[0].length)}</> : <>{text}</>;
};

const StaticOffer: React.FC<{ index: number }> = ({ index }) => {
  const offer = offers[index];
  return <article className={`${styles.staticOffer} ${index === 2 ? styles.shopOffer : ''} ${index === 3 ? styles.appOffer : ''}`}>
    <div className={styles.chapterIdentity}>
      <h3>{offer.title[0]}<em>{offer.title[1]}</em></h3>
      <div className={styles.priceSculpture}><span className={styles.priceCaption}>vanaf</span><p className={styles.staticPrice}><sup>€</sup>{euro(offer.price).slice(1)}</p><span className={styles.priceCaption}>eenmalig · excl. btw</span></div>
    </div>
    <div className={styles.chapterDetails}>
      <p className={styles.chapterDescription}>{offer.description}</p>
      <p className={styles.chapterScope}>{offer.scope}</p>
      <ul className={styles.chapterFeatures}>{offer.features.map(text => <li key={text}><FeatureText text={text} /></li>)}</ul>
      <p className={styles.chapterLimit}>{offer.limit}</p>
      <ContactLink className={styles.chapterAction}>{offer.action}</ContactLink>
      <p className={styles.chapterRecurring}>{offer.recurring}</p>
    </div>
  </article>;
};

// Each price is a typeset face on a virtual drum. The actual amount never counts up.
const PriceGlyph: React.FC<{ character: string; index: number; chapter: number; time: MotionValue<number> }> = ({ character, index, chapter, time }) => {
  const position = useTransform(time, value => value - chapter - index * .018);
  const rotateX = useTransform(position, [-.65, -.08, .5, .95], [85, 0, 0, -85]);
  const y = useTransform(position, [-.65, -.08, .5, .95], ['95%', '0%', '0%', '-95%']);
  return <span className={styles.glyphWindow}><motion.span style={{ rotateX, y }}>{character}</motion.span></span>;
};

const PriceChapter: React.FC<{ index: number; time: MotionValue<number>; active: boolean }> = ({ index, time, active }) => {
  const offer = offers[index];
  const local = useTransform(time, value => value - index);
  const opacity = useTransform(local, [-.65, -.35, .6, .95], [0, 1, 1, 0]);
  const copyMask = useTransform(local, [-.45, -.05, .55, .9], ['inset(100% 0% 0% 0%)', 'inset(0% 0% 0% 0%)', 'inset(0% 0% 0% 0%)', 'inset(0% 0% 100% 0%)']);
  const titleY = useTransform(local, [-.6, -.05, .55, .95], ['80%', '0%', '0%', '-90%']);
  const titleRotate = useTransform(local, [-.6, -.05, .55, .95], [18, 0, 0, -18]);
  const detailY = useTransform(local, [-.45, -.05, .55, .9], [40, 0, 0, -40]);
  return <motion.article className={styles.chapter} style={{ opacity }} inert={!active ? true : undefined} aria-hidden={!active} aria-label={offer.label}>
    <div className={styles.chapterIdentity}>
      <div className={styles.chapterTitleWindow}><motion.h3 style={{ y: titleY, rotateX: titleRotate }}>{offer.title[0]}<em>{offer.title[1]}</em></motion.h3></div>
      <div className={styles.priceSculpture}>
        <span className={styles.priceCaption}>vanaf</span>
        <div className={styles.rollingPrice} role="img" aria-label={euro(offer.price)}><span aria-hidden="true"><sup className={styles.priceCurrency}>€</sup>{[...euro(offer.price).slice(1)].map((character, glyph) => <PriceGlyph key={glyph} character={character} index={glyph} chapter={index} time={time} />)}</span></div>
        <span className={styles.priceCaption}>eenmalig · excl. btw</span>
      </div>
    </div>
    <motion.div className={styles.chapterDetails} style={{ clipPath: copyMask, y: detailY }}>
      <p className={styles.chapterDescription}>{offer.description}</p>
      <p className={styles.chapterScope}>{offer.scope}</p>
      <ul className={styles.chapterFeatures}>{offer.features.map(text => <li key={text}><FeatureText text={text} /></li>)}</ul>
      <p className={styles.chapterLimit}>{offer.limit}</p>
      <ContactLink className={styles.chapterAction}>{offer.action}</ContactLink>
      <p className={styles.chapterRecurring}>{offer.recurring}</p>
    </motion.div>
  </motion.article>;
};

const RevealBlade: React.FC<{ index: number; progress: MotionValue<number> }> = ({ index, progress }) => {
  const y = useTransform(progress, [index * .09, .85 + index * .09], [index % 2 ? '-105%' : '105%', '0%']);
  return <motion.span className={styles.revealBlade} style={{ y }} />;
};

export const PricingScene: React.FC<{ progress: MotionValue<number>; onNavigate: (index: number) => void }> = ({ progress, onNavigate }) => {
  const [active, setActive] = useState(-1);
  const time = useTransform(progress, value => Math.min(3.45, (value - 1.35) / 1.65));
  useMotionValueEvent(time, 'change', value => {
    const next = value < -.45 ? -1 : Math.max(0, Math.min(3, Math.floor(value + .3)));
    setActive(current => current === next ? current : next);
  });
  const visible = useTransform(progress, value => value <= 0 ? 'hidden' : 'visible');
  const contentOpacity = useTransform(progress, [.65, 1.3], [0, 1]);
  const paper = useTransform(time, [0, 1.35, 1.9, 2.4, 2.95], ['#f3eee4', '#f3eee4', '#a94732', '#a94732', '#24221f']);
  const ink = useTransform(time, [1.35, 1.9], ['#29251f', '#fff5e8']);
  const muted = useTransform(time, [1.35, 1.9, 2.4, 2.95], ['#655b50', '#f6ddc8', '#f6ddc8', '#c9beb0']);
  const accent = useTransform(time, [1.35, 1.9, 2.4, 2.95], ['#a13d28', '#ffe1ab', '#ffe1ab', '#f0ae91']);
  const firstHeader = useTransform(time, [1.35, 1.7], [1, 0]);
  const nextHeader = useTransform(time, [1.45, 1.8], [0, 1]);
  const ruleScale = useTransform(progress, [.65, 1.4], [0, 1]);
  return <motion.section className={styles.pricingScene} style={{ visibility: visible, '--price-paper': paper, '--price-ink': ink, '--price-muted': muted, '--price-accent': accent } as import('motion/react').MotionStyle} aria-label="Aanbod en prijzen">
    <div className={styles.revealBlades} aria-hidden="true">{Array.from({ length: 5 }, (_, index) => <RevealBlade key={index} index={index} progress={progress} />)}</div>
    <motion.div className={styles.priceEditorial} style={{ opacity: contentOpacity }}>
      <header className={styles.editorialHeader}>
        <div className={styles.editorialHeadings}>
          <motion.h2 style={{ opacity: firstHeader }} aria-hidden={active >= 2}>Wat kost<em>je website?</em></motion.h2>
          <motion.h2 style={{ opacity: nextHeader }} aria-hidden={active < 2}>Webshop of<em>toepassing.</em></motion.h2>
        </div>
        <p>Vergelijk de bouwprijs en wat daarin zit.<br />Hosting en beheer staan apart.</p>
      </header>
      <motion.div className={styles.editorialRule} style={{ scaleX: ruleScale }} aria-hidden="true" />
      <div className={styles.chapterStage}>{offers.map((offer, index) => <PriceChapter key={offer.label} index={index} time={time} active={active === index} />)}</div>
      <nav className={styles.editorialNav} aria-label="Aanbod en prijzen">
        {offers.map((offer, index) => <button key={offer.label} type="button" onClick={() => onNavigate(index)} aria-current={active === index ? 'step' : undefined}><span>{offer.label}</span><span>{euro(offer.price)}</span></button>)}
        <a href="#prijsdetails" onClick={event => scrollToSection(event, 'prijsdetails')} aria-label="Bekijk alle kosten en voorwaarden"><ArrowUpRight size={22} strokeWidth={1.3} aria-hidden="true" /></a>
      </nav>
    </motion.div>
  </motion.section>;
};

const Offer: React.FC = () => {
  const [embedded, setEmbedded] = useState(false);
  useEffect(() => {
    const media = window.matchMedia('(min-width: 1000px) and (min-height: 650px) and (prefers-reduced-motion: no-preference)');
    const update = () => setEmbedded(media.matches);
    update();
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);
  return (
  <section className={styles.section} id={embedded ? 'prijsdetails' : 'prijzen'} aria-label={embedded ? 'Maatwerk en prijsvoorwaarden' : undefined} aria-labelledby={embedded ? undefined : 'pricing-title'}>
    <div className={styles.container}>
      {!embedded && <>
        <PricingHeader />
        <StaticOffer index={0} />
        <StaticOffer index={1} />
        <h3 className={styles.moreHeading}>Webshop of<em>toepassing.</em></h3>
        <StaticOffer index={2} />
        <StaticOffer index={3} />
      </>}
      <div className={styles.transparency}>
        <div className={styles.costIntro}><h3>Kosten na<br />de oplevering.</h3><p>Naast de bouw betaal je voor het online houden en technisch beheren van je website.</p>
          <div className={styles.example}>
            <h4>Rekenvoorbeeld · website + CMS</h4>
            <p>Bij de startprijzen, met beheer via Webaanzee:</p>
            <dl><div><dt>Bouw website + CMS</dt><dd>{euro(pricing.cms.price)}</dd></div><div><dt>12 maanden hosting & beheer</dt><dd>{euro(pricing.cms.monthly * 12)}</dd></div><div className={styles.total}><dt>Eerste jaar vanaf</dt><dd>{euro(pricing.cms.price + pricing.cms.monthly * 12)}</dd></div></dl>
            <p>Excl. btw, domeinnaam en eventuele externe licenties. Daarna vanaf {euro(pricing.cms.monthly * 12)}/jaar voor hosting & beheer, bij gelijkblijvende omvang en tarieven.</p>
          </div>
        </div>
        <div className={styles.conditions}>
          <details open><summary>Wat betekent ‘vanaf’ precies?<Plus aria-hidden="true" /></summary><p>De prijs geldt voor de hierboven beschreven basis. De inhoud lever je aan. Extra pagina’s, talen, soorten inhoud, functies of een verhuizing veranderen de omvang. Voor de start krijg je één offerte met de exacte prijs, feedbackrondes en planning. Extra werk voeren we pas uit nadat je de meerprijs hebt goedgekeurd.</p></details>
          <details open><summary>Wat omvat hosting & technisch beheer?<Plus aria-hidden="true" /></summary><p>De hosting, een beveiligde verbinding (SSL), technische updates en back-ups. De maandbedragen zijn starttarieven voor beheer via Webaanzee; je offerte vermeldt capaciteit, back-upafspraken, facturatie en opzegvoorwaarden. Nieuwe inhoud, nieuwe functies en externe licenties vallen hier niet onder. Eigen hosting bespreken we vooraf.</p></details>
          <details open><summary>Welke kosten kunnen er nog bij komen?<Plus aria-hidden="true" /></summary><p>Een domeinnaam, zakelijke e-mail, betaalde CMS- of softwarelicenties en verbruik van externe diensten. Bij een webshop ook kosten van de betaalprovider per transactie. Tekstschrijven, fotografie, vertalingen en migraties worden apart begroot wanneer je die nodig hebt. Alle voorziene kosten staan in je offerte.</p></details>
          <details><summary>En wijzigingen of uitbreidingen achteraf?<Plus aria-hidden="true" /></summary><p>Inhoudelijke wijzigingen en klein aanvullend werk kosten {euro(pricing.hourly)}/uur excl. btw, met een raming vooraf. Grotere uitbreidingen krijgen een aparte offerte. Met een CMS beheer je de afgesproken inhoud zelf, zonder daarvoor telkens ontwikkeltijd te betalen.</p></details>
        </div>
      </div>

      <div className={styles.reassurance}><div><h3>Wat past bij jouw zaak?</h3><p>Vertel wat je wilt laten maken of verbeteren. Ik werk uit welke pagina’s en functies nodig zijn en wat de bouw en het beheer kosten.</p></div><ContactLink className={styles.finalAction}>Bespreek je website</ContactLink></div>
    </div>
  </section>
  );
};

export default Offer;
