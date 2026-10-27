import { useMotionState } from '../utils/useMotionState';
import { useDesktopMotion } from '../utils/useDesktopMotion';
import { mobileMotionQuery, useMediaQuery } from '../utils/useMediaQuery';
import React, { useRef } from 'react';
import { motion, useTransform, type MotionValue } from 'motion/react';
import { ArrowUpRight, Plus } from 'lucide-react';
import { scrollToSection } from '../utils/scrollToSection';
import { euro, pricing } from '../data/pricing.mjs';
import styles from './Offer.module.css';
import { useSectionArrival } from '../utils/useSectionArrival';
import { clamp, windowProgress } from '../utils/homeChoreography';

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

export const offers = [
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

export const PriceChapter: React.FC<{ index: number; active: boolean }> = ({ index, active }) => {
  const offer = offers[index];
  return <article className={styles.chapter} inert={!active ? true : undefined} aria-hidden={!active} aria-label={offer.label}>
    <div className={styles.chapterIdentity}>
      <div className={styles.chapterTitleWindow}><h3>{offer.title[0]}<em>{offer.title[1]}</em></h3></div>
      <div className={styles.priceSculpture}>
        <span className={styles.priceCaption}>vanaf</span>
        <div className={styles.rollingPrice} role="img" aria-label={euro(offer.price)}><span aria-hidden="true"><sup className={styles.priceCurrency}>€</sup>{euro(offer.price).slice(1)}</span></div>
        <span className={styles.priceCaption}>eenmalig · excl. btw</span>
      </div>
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

export const pricePalettes = [
  { paper: '#f3eee4', ink: '#29251f', muted: '#655b50', accent: '#a13d28' },
  { paper: '#e8e2d5', ink: '#29251f', muted: '#655b50', accent: '#a13d28' },
  { paper: '#a94732', ink: '#fff5e8', muted: '#f6ddc8', accent: '#ffe1ab' },
  { paper: '#24221f', ink: '#fff5e8', muted: '#c9beb0', accent: '#f0ae91' },
];

const PriceSheet: React.FC<{ index: number; phase: MotionValue<number>; active: boolean }> = ({ index, phase, active }) => {
  const y = useTransform(phase, value => `${Math.max(0, index - value) * 100}%`);
  const scale = useTransform(phase, value => 1 - clamp(value - index) * .055);
  const rotateX = useTransform(phase, value => clamp(value - index) * 4);
  const visibility = useTransform(phase, value => value > index + 1 || value < index - 1 ? 'hidden' : 'visible');
  const palette = pricePalettes[index];
  return <motion.div data-price-sheet={index} className={styles.priceSheet} style={{ y, scale, rotateX, visibility, zIndex: index + 1,
    '--price-paper': palette.paper, '--price-ink': palette.ink, '--price-muted': palette.muted, '--price-accent': palette.accent,
  } as import('motion/react').MotionStyle} inert={!active ? true : undefined} aria-hidden={!active}>
    <header className={styles.editorialHeader}>
      <div className={styles.editorialHeadings}><h2>{index < 2 ? <>Wat kost<em>je website?</em></> : <>Webshop of<em>toepassing.</em></>}</h2></div>
      <p>Vergelijk de bouwprijs en wat daarin zit.<br />Hosting en beheer staan apart.</p>
    </header>
    <div className={styles.editorialRule} aria-hidden="true" />
    <div className={styles.chapterStage}><PriceChapter index={index} active={active} /></div>
  </motion.div>;
};

export const PricingScene: React.FC<{ progress: MotionValue<number>; phase: MotionValue<number>; onNavigate: (index: number) => void }> = ({ progress, phase, onNavigate }) => {
  const active = useMotionState(phase, Math.round);
  const mask = useTransform(progress, v => `inset(${(1 - windowProgress(v, 0, .75)) * 100}% 0% 0% 0%)`);
  const visible = useTransform(progress, value => value <= 0 ? 'hidden' : 'visible');
  const palette = pricePalettes[active];
  return <motion.section className={styles.pricingScene} style={{ visibility: visible, clipPath: mask,
    '--price-paper': palette.paper, '--price-ink': palette.ink, '--price-muted': palette.muted, '--price-accent': palette.accent,
  } as import('motion/react').MotionStyle} aria-label="Aanbod en prijzen">
    <div className={styles.priceDeck}>{offers.map((offer, index) => <PriceSheet key={offer.label} index={index} phase={phase} active={active === index} />)}</div>
    <nav className={styles.editorialNav} aria-label="Aanbod en prijzen">
      {offers.map((offer, index) => <button key={offer.label} type="button" onClick={() => onNavigate(index)} aria-current={active === index ? 'step' : undefined}><span>{offer.label}</span><span>{euro(offer.price)}</span></button>)}
      <a href="#prijsdetails" onClick={event => scrollToSection(event, 'prijsdetails')} aria-label="Bekijk alle kosten en voorwaarden"><ArrowUpRight size={22} strokeWidth={1.3} aria-hidden="true" /></a>
    </nav>
  </motion.section>;
};

const Offer: React.FC = () => {
  const desktop = useDesktopMotion();
  const mobile = useMediaQuery(mobileMotionQuery);
  const embedded = desktop || mobile;
  const exampleRef = useRef<HTMLDivElement>(null);
  useSectionArrival(exampleRef, 'cost');
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
          <div ref={exampleRef} className={styles.example}>
            <h4>Rekenvoorbeeld · website + CMS</h4>
            <p>Bij de startprijzen, met beheer via Webaanzee:</p>
            <dl><div data-cost-row><dt>Bouw website + CMS</dt><dd>{euro(pricing.cms.price)}</dd></div><div data-cost-row><dt>12 maanden hosting & beheer</dt><dd>{euro(pricing.cms.monthly * 12)}</dd></div><div data-cost-total className={styles.total}><dt>Eerste jaar vanaf</dt><dd>{euro(pricing.cms.price + pricing.cms.monthly * 12)}</dd></div></dl>
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
