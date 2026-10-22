import React, { useEffect, useRef, useState } from 'react';
import { motion, type Variants } from 'motion/react';
import styles from './Klantenkaart.module.css';
import { loyaltyPricing, loyaltyCostNote, loyaltyFaqs } from '../data/loyalty.mjs';
import { euro } from '../data/pricing.mjs';

const enquiry = (subject: string) => `https://wa.me/32494816714?text=${encodeURIComponent(`Hallo Kevin, ik wil meer weten over ${subject}.`)}`;

const easeOut = [0.16, 1, 0.3, 1] as const;

const features = [
  {
    title: 'Websitekoppeling',
    description: 'Pas je drankkaart en aanbod aan via het dashboard. De websitekoppeling is onderdeel van het pakket Website + spaarkaart.',
    icon: '🌐'
  },
  {
    title: 'Klantinzichten',
    description: 'Bekijk de geregistreerde bezoeken en spaarkaarten van je klanten.',
    icon: '📊'
  },
  {
    title: 'Open flessen bijhouden',
    description: 'Houd in het dashboard bij welke flessen open zijn. Deze module zit in het Premium-pakket.',
    icon: '🍾'
  },
  {
    title: 'Promoties op je scherm',
    description: 'Toon eigen afbeeldingen en promoties op het scherm van je zaak. Beschikbaar vanaf Premium.',
    icon: '🖼️'
  },
  {
    title: 'Scans en correcties',
    description: 'Raadpleeg de historiek van scans, ingewisselde beloningen en handmatige correcties.',
    icon: '🛡️'
  },
  {
    title: 'Lichte en donkere weergave',
    description: 'De spaarkaart ondersteunt een lichte en donkere weergave op de smartphone.',
    icon: '🌗'
  },
  {
    title: 'Sparen via QR-codes',
    description: 'Je medewerker maakt een QR-code voor de consumpties. De klant scant die met de scanner in de digitale spaarkaart en ontvangt de stempels.',
    icon: '📱'
  },
  {
    title: 'Spaarniveaus en beloningen',
    description: 'Klanten zien hun stempels, spaarniveau en beschikbare beloningen. De spaarregels stemmen we af op je aanbod.',
    icon: '🏆'
  },
  {
    title: 'Verjaardagsbeloningen',
    description: 'Ken een verjaardagsbeloning toe op basis van de geboortedatum die de klant invult. Beschikbaar vanaf Premium.',
    icon: '🎂'
  },
  {
    title: 'Medewerkers beheren',
    description: 'Voeg medewerkers toe via het beheerdersgedeelte van je dashboard.',
    icon: '👥'
  }
];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: easeOut } }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

const ViewportVideo: React.FC<{ src: string; className: string; poster: string }> = ({ src, className, poster }) => {
  const ref = useRef<HTMLVideoElement>(null);
  const [active, setActive] = useState(false);
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setActive(true);
        observer.disconnect();
      }
    }, { rootMargin: '300px 0px' });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);
  return <video ref={ref} autoPlay={active} loop muted playsInline preload="none" poster={poster} className={className}>{active && <source src={src} type="video/mp4" />}Je browser ondersteunt deze video niet.</video>;
};

const Klantenkaart: React.FC = () => {
  return (
    <div className={styles.page}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org', '@type': 'FAQPage',
        mainEntity: loyaltyFaqs.map(item => ({ '@type': 'Question', name: item.question, acceptedAnswer: { '@type': 'Answer', text: item.answer } })),
      }).replace(/</g, '\\u003c') }} />

      {/* INTRO HERO SECTION */}
      <section className={styles.heroSection}>
        <div className={styles.heroGrid}>
          <motion.div 
            className={styles.heroContent}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeUp} className={styles.badge}>Digitale spaarkaart voor horeca</motion.div>
            <motion.h1 variants={fadeUp} className={styles.title}>
              Digitale klantenkaart
              <br/>
              <span className={styles.highlight}> voor je horecazaak</span>
            </motion.h1>
            <motion.p variants={fadeUp} className={styles.description}>
              Laat klanten stempels sparen via hun smartphone. Jij beheert de spaarkaarten en beloningen via een eigen dashboard. Bekijk hieronder hoe het werkt en welk pakket bij je zaak past.
            </motion.p>
            <motion.div variants={fadeUp} className={styles.heroButtons}>
              <a href={enquiry('een demo van de digitale spaarkaart')} className="btn btn-primary" target="_blank" rel="noreferrer">
                Vraag een demo via WhatsApp
              </a>
            </motion.div>
          </motion.div>
          <motion.div 
            className={styles.heroImageWrapper}
            initial={{ opacity: 0, scale: 0.9, rotateY: 15 }}
            whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: easeOut }}
          >
            <img src="/spaarkaart.webp" alt="Voorbeeld van een digitale spaarkaart met stempels en beloningen" className={styles.heroImage} />
          </motion.div>
        </div>
      </section>

      {/* MOBILE APP SHOWCASE */}
      <section className={styles.mobileSection}>
        <div className={styles.mobileGrid}>
          <motion.div 
            className={styles.mobileText}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            <motion.h2 variants={fadeUp}>Zo sparen <span className={styles.highlight}>je klanten</span></motion.h2>
            <motion.p variants={fadeUp}>
              Je klant opent de spaarkaart in de smartphonebrowser en maakt een account aan. Na een consumptie genereert je medewerker een QR-code in het dashboard. De klant scant die in de spaarkaart om stempels te ontvangen. Een beloning wissel je met een aparte QR-code in.
            </motion.p>
            <motion.ul className={styles.benefitsList} variants={staggerContainer}>
              <motion.li variants={fadeUp}>Werkt in de browser op iPhone en Android</motion.li>
              <motion.li variants={fadeUp}>Geen download uit een appwinkel nodig</motion.li>
              <motion.li variants={fadeUp}>Lichte en donkere weergave</motion.li>
              <motion.li variants={fadeUp}>Stempels en beschikbare beloningen bekijken</motion.li>
            </motion.ul>
          </motion.div>
          <motion.div 
            className={styles.phoneContainer}
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: easeOut }}
          >
            <div className={styles.phoneMockup}>
              <ViewportVideo src="/videos/spaarkaart-web.mp4" poster="/spaarkaart.webp" className={styles.phoneVideo} />
            </div>
          </motion.div>
        </div>
      </section>

      {/* DASHBOARD SHOWCASE */}
      <section className={styles.dashboardSection}>
        <div className={styles.dashboardContainer}>
          <motion.div 
            className={styles.dashboardHeader}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.h2 variants={fadeUp}>Beheer je spaarkaarten <span className={styles.highlight}>en aanbod</span></motion.h2>
            <motion.p variants={fadeUp}>Maak QR-codes voor consumpties, bekijk spaarkaarten en volg scans en correcties op. Met Premium beheer je ook promoties, open flessen en verjaardagsbeloningen.</motion.p>
          </motion.div>
          
          <motion.div 
            className={styles.dashboardVideoContainer}
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: easeOut }}
          >
            <div className={styles.macbookMockup}>
              <ViewportVideo src="/videos/dashboard-web.mp4" poster="/images/cases/spaarkaart.webp" className={styles.dashboardVideo} />
            </div>
          </motion.div>
        </div>
      </section>

      {/* HIGH-END FEATURE SYSTEM */}
      <section className={styles.featuresSection}>
        <div className={styles.featuresHeader}>
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.h2 variants={fadeUp} className={styles.sectionTitle}>
              Wat je kunt <span className={styles.highlight}>beheren.</span>
            </motion.h2>
            <motion.p variants={fadeUp} className={styles.sectionSubtitle}>De basis omvat spaarkaarten, scans en klantbeheer. Extra modules zitten in Premium of het pakket met website.</motion.p>
          </motion.div>
        </div>
        
        <div className={styles.featureList}>
          {features.map((feature, index) => (
            <motion.div 
              key={index} 
              className={styles.featureRow}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
            >
              <div className={styles.featureRowLeft}>
                <span className={styles.featureNumber}>{(index + 1).toString().padStart(2, '0')}</span>
                <h3 className={styles.featureTitle}>{feature.title}</h3>
              </div>
              <div className={styles.featureRowRight}>
                <p className={styles.featureDesc}>{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* PRICING SECTION */}
      <section className={styles.pricingSection}>
        <div className={styles.pricingContainer}>
          <motion.div 
            className={styles.pricingHeader}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.h2 variants={fadeUp} className={styles.sectionTitle}>
              Pakketten en <span className={styles.highlight}>kosten.</span>
            </motion.h2>
            <motion.p variants={fadeUp} className={styles.sectionSubtitle}>Je betaalt eenmalig voor de inrichting. Bekijk ook de terugkerende kosten onder de pakketten.</motion.p>
          </motion.div>

          <div className={styles.pricingGrid}>
            {/* TIER 1: ESSENTIAL */}
            <motion.div 
              className={styles.pricingCard}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className={styles.pricingCardTop}>
                <h3 className={styles.pricingPlanName}>Basis spaarkaart</h3>
                <div className={styles.pricingPrice}>
                  {euro(loyaltyPricing.basic)}
                  <span className={styles.setupLabel}>eenmalige inrichting</span>
                </div>
                <p className={styles.pricingDesc}>Voor een zaak die digitale stempels en beloningen wil aanbieden.</p>
              </div>
              <ul className={styles.pricingFeatures}>
                <li><span className={styles.checkIcon}></span>Digitale spaarkaart in de browser</li>
                <li><span className={styles.checkIcon}></span>Beheerscherm voor klanten en spaarkaarten</li>
                <li><span className={styles.checkIcon}></span>Historiek van scans en correcties</li>
                <li><span className={styles.checkIcon}></span>Lichte en donkere weergave</li>
                <li><span className={styles.checkIcon}></span>QR-bordje voor je zaak inbegrepen</li>
              </ul>
              <div className={styles.pricingAction}>
                <a href={enquiry('de Basis spaarkaart')} className={styles.pricingBtn} target="_blank" rel="noreferrer">
                  Vraag het basispakket aan
                </a>
              </div>
            </motion.div>

            {/* TIER 2: PREMIUM */}
            <motion.div 
              className={`${styles.pricingCard} ${styles.pricingCardHighlighted}`}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
            >
              <div className={styles.popularBadge}>Extra beheermodules</div>
              <div className={styles.pricingCardTop}>
                <h3 className={styles.pricingPlanName}>Premium spaarkaart</h3>
                <div className={styles.pricingPrice}>
                  {euro(loyaltyPricing.premium)}
                  <span className={styles.setupLabel}>eenmalige inrichting</span>
                </div>
                <p className={styles.pricingDesc}>De basisspaarkaart met extra modules voor het dagelijkse beheer van je horecazaak.</p>
              </div>
              <ul className={styles.pricingFeatures}>
                <li><span className={styles.checkIcon}></span><strong>Alles uit de basisspaarkaart</strong></li>
                <li><span className={styles.checkIcon}></span>Eigen promoties op je scherm</li>
                <li><span className={styles.checkIcon}></span>Open flessen bijhouden</li>
                <li><span className={styles.checkIcon}></span>Verjaardagsbeloningen</li>
                <li><span className={styles.checkIcon}></span>Uitgebreide klantinzichten</li>
              </ul>
              <div className={styles.pricingAction}>
                <a href={enquiry('de Premium spaarkaart')} className={styles.pricingBtn} target="_blank" rel="noreferrer">
                  Vraag Premium aan
                </a>
              </div>
            </motion.div>

            {/* TIER 3: ULTIMATE */}
            <motion.div 
              className={styles.pricingCard}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className={styles.pricingCardTop}>
                <h3 className={styles.pricingPlanName}>Website + spaarkaart</h3>
                <div className={styles.pricingPrice}>
                  {euro(loyaltyPricing.website)}
                  <span className={styles.setupLabel}>eenmalige inrichting</span>
                </div>
                <p className={styles.pricingDesc}>Een website met een beheerbare menukaart of prijslijst, gekoppeld aan de Premium-spaarkaart.</p>
              </div>
              <ul className={styles.pricingFeatures}>
                <li><span className={styles.checkIcon}></span><strong>Alles uit de Premium-spaarkaart</strong></li>
                <li><span className={styles.checkIcon}></span><strong>Menukaart of prijslijst zelf aanpassen</strong></li>
                <li><span className={styles.checkIcon}></span>Website voor je horecazaak</li>
                <li><span className={styles.checkIcon}></span>Technische zoekmachine-instellingen</li>
                <li><span className={styles.checkIcon}></span>Website en spaarkaart beheren via hetzelfde dashboard</li>
              </ul>
              <div className={styles.pricingAction}>
                <a href={enquiry('het pakket Website + spaarkaart')} className={styles.pricingBtn} target="_blank" rel="noreferrer">
                  Bespreek website en spaarkaart
                </a>
              </div>
            </motion.div>
          </div>
          <div className={styles.pricingTerms}>
            <h3>Jaarlijks beheer en afspraken</h3>
            <p>{loyaltyCostNote}</p>
            <p>Voor je bestelt, krijg je een voorstel met de inrichting, de terugkerende kosten, btw, ondersteuning en opzegvoorwaarden. Je hebt een smartphone met camera nodig voor de spaarkaart en een toestel met browser voor het beheer.</p>
            <p>Website + spaarkaart is een afzonderlijk productpakket voor horeca, met een menukaart of prijslijst. Het aantal pagina’s, de vormgeving en eventuele extra functies leggen we vast in je voorstel. Het pakket heeft een andere omvang dan de websites met CMS op de hoofdpagina.</p>
          </div>
          <div className={styles.productFaq}>
            <h2>Vragen over de spaarkaart</h2>
            {loyaltyFaqs.map(item => <details key={item.question}><summary>{item.question}</summary><p>{item.answer}</p></details>)}
          </div>
        </div>
      </section>

    </div>
  );
};

export default Klantenkaart;
