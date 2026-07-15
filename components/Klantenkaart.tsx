import React, { useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import styles from './Klantenkaart.module.css';

const features = [
  {
    title: 'Website Koppeling',
    description: 'Pas direct uw drankkaart en aanbod aan vanuit het dashboard. Realtime synchronisatie met uw website.',
    icon: '🌐'
  },
  {
    title: 'Klant Inzicht',
    description: 'Compleet inzicht in de frequentie van aankoop bij elke klant. Bouw een waardevolle database op.',
    icon: '📊'
  },
  {
    title: 'Open Flessen Module',
    description: 'Ga verspilling tegen in uw Horeca zaak door flessen digitaal bij te houden. Efficiënt en overzichtelijk.',
    icon: '🍾'
  },
  {
    title: 'Screensaver Module',
    description: 'Volledig instelbare screensaver. Voeg eenvoudig eigen afbeeldingen en promoties toe via het dashboard.',
    icon: '🖼️'
  },
  {
    title: 'Fraude Preventie',
    description: 'Een complete historiek van alle scans en correcties. Honderd procent traceerbaar en veilig.',
    icon: '🛡️'
  },
  {
    title: 'Darkmode & Lightmode',
    description: 'Een prachtig interface dat zich aanpast aan de voorkeur van uw klant voor optimaal leescomfort.',
    icon: '🌗'
  },
  {
    title: 'Flitsende QR Scanner',
    description: 'Uiterst gebruiksvriendelijke QR scan module die de klant in een fractie van een seconde met de smartphone scant.',
    icon: '📱'
  },
  {
    title: 'Gamification',
    description: 'Spoor klanten aan om een hogere status te behalen met beloningen en interactieve mijlpalen.',
    icon: '🏆'
  },
  {
    title: 'Verjaardag Tracking',
    description: 'Verras uw klanten op hun verjaardag met extra beloningen en versterk de klant-verbondenheid.',
    icon: '🎂'
  },
  {
    title: 'Veilig Medewerker Beheer',
    description: 'Admin gedeelte om nieuwe medewerkers toe te voegen op een uiterst veilige en traceerbare manier.',
    icon: '👥'
  }
];

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

const Klantenkaart: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const dashboardRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 1.0;
    }
    if (dashboardRef.current) {
      dashboardRef.current.playbackRate = 1.0;
    }
  }, []);

  return (
    <div className={styles.page}>
      
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
            <motion.div variants={fadeUp} className={styles.badge}>De Toekomst van Klantenbinding</motion.div>
            <motion.h1 variants={fadeUp} className={styles.title}>
              Digitale Klantenkaart
              <br/>
              <span className={styles.highlight}> & Management Dashboard</span>
            </motion.h1>
            <motion.p variants={fadeUp} className={styles.description}>
              Stop met plastic pasjes en stap over op een slimme, datagedreven oplossing. Verhoog uw omzet, behoud klanten en beheer alles vanuit één krachtig dashboard. Speciaal ontworpen voor de Horeca.
            </motion.p>
            <motion.div variants={fadeUp} className={styles.heroButtons}>
              <a href="https://wa.me/32494816714" className="btn btn-primary" target="_blank" rel="noreferrer">
                Vraag een Demo Aan
              </a>
            </motion.div>
          </motion.div>
          <motion.div 
            className={styles.heroImageWrapper}
            initial={{ opacity: 0, scale: 0.9, rotateY: 15 }}
            whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <img src="/spaarkaart.webp" alt="Klantenkaart Interface" className={styles.heroImage} />
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
            <motion.h2 variants={fadeUp}>De Ervaring voor <span className={styles.highlight}>Uw Klant</span></motion.h2>
            <motion.p variants={fadeUp}>
              Uw klanten hoeven geen app te downloaden. Via een simpele QR-scan opent de spaarkaart zich direct in de browser van hun smartphone. Een naadloze ervaring in uw eigen huisstijl.
            </motion.p>
            <motion.ul className={styles.benefitsList} variants={staggerContainer}>
              <motion.li variants={fadeUp}>✓ Werkt op iOS en Android</motion.li>
              <motion.li variants={fadeUp}>✓ Geen downloads in de App Store</motion.li>
              <motion.li variants={fadeUp}>✓ Automatische Light & Dark mode</motion.li>
              <motion.li variants={fadeUp}>✓ Gamification en status updates</motion.li>
            </motion.ul>
          </motion.div>
          <motion.div 
            className={styles.phoneContainer}
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className={styles.phoneMockup}>
              <video 
                ref={videoRef}
                autoPlay 
                loop 
                muted 
                playsInline 
                className={styles.phoneVideo}
              >
                <source src="/videos/spaarkaart.mp4" type="video/mp4" />
                <source src="/videos/spaarkaart.mov" type="video/quicktime" />
                Uw browser ondersteunt geen video.
              </video>
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
            <motion.h2 variants={fadeUp}>Complete Controle via het <span className={styles.highlight}>Dashboard</span></motion.h2>
            <motion.p variants={fadeUp}>Ontdek wie uw beste klanten zijn, beheer uw aanbod en analyseer de resultaten in real-time.</motion.p>
          </motion.div>
          
          <motion.div 
            className={styles.dashboardVideoContainer}
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className={styles.macbookMockup}>
              <video 
                ref={dashboardRef}
                autoPlay 
                loop 
                muted 
                playsInline 
                className={styles.dashboardVideo}
              >
                <source src="/videos/dashboard.mp4" type="video/mp4" />
                <source src="/videos/dashboard.mov" type="video/quicktime" />
                Uw browser ondersteunt geen video.
              </video>
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
              Ongeëvenaarde <span className={styles.highlight}>Functionaliteit</span>.
            </motion.h2>
            <motion.p variants={fadeUp} className={styles.sectionSubtitle}>Een compleet arsenaal aan tools om uw horecazaak naar het volgende niveau te tillen.</motion.p>
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
              Transparante <span className={styles.highlight}>Investering</span>.
            </motion.h2>
            <motion.p variants={fadeUp} className={styles.sectionSubtitle}>Eén duidelijke opstartkost. Het volledige eerste jaar betaalt u €0 aan maandelijkse servicekosten.</motion.p>
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
                <h3 className={styles.pricingPlanName}>Essential App</h3>
                <div className={styles.pricingPrice}>
                  <span className={styles.currency}>€</span>495
                  <span className={styles.setupLabel}>eenmalige setup</span>
                </div>
                <p className={styles.pricingDesc}>De perfecte start voor een digitale klantenkaart zonder poespas.</p>
              </div>
              <ul className={styles.pricingFeatures}>
                <li><span className={styles.checkIcon}></span>Digitale Klantenkaart (PWA)</li>
                <li><span className={styles.checkIcon}></span>Basis Management Dashboard</li>
                <li><span className={styles.checkIcon}></span>Fraude Preventie & Correcties</li>
                <li><span className={styles.checkIcon}></span>Darkmode / Lightmode</li>
                <li><span className={styles.checkIcon}></span>Premium QR-bordje inbegrepen</li>
              </ul>
              <div className={styles.pricingAction}>
                <a href="https://wa.me/32494816714" className={styles.pricingBtn} target="_blank" rel="noreferrer">
                  Kies Essential
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
              <div className={styles.popularBadge}>Meest Gekozen</div>
              <div className={styles.pricingCardTop}>
                <h3 className={styles.pricingPlanName}>Premium App</h3>
                <div className={styles.pricingPrice}>
                  <span className={styles.currency}>€</span>599
                  <span className={styles.setupLabel}>eenmalige setup</span>
                </div>
                <p className={styles.pricingDesc}>Alles uit Essential, aangevuld met krachtige data en interactieve modules.</p>
              </div>
              <ul className={styles.pricingFeatures}>
                <li><span className={styles.checkIcon}></span><strong>Alles uit Essential</strong></li>
                <li><span className={styles.checkIcon}></span>Screensaver Module (Eigen promo's)</li>
                <li><span className={styles.checkIcon}></span>Open Flessen Module (Horeca)</li>
                <li><span className={styles.checkIcon}></span>Verjaardag Tracking & Beloningen</li>
                <li><span className={styles.checkIcon}></span>Uitgebreide Klanteninzichten</li>
              </ul>
              <div className={styles.pricingAction}>
                <a href="https://wa.me/32494816714" className={styles.pricingBtn} target="_blank" rel="noreferrer">
                  Kies Premium
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
                <h3 className={styles.pricingPlanName}>Website + App</h3>
                <div className={styles.pricingPrice}>
                  <span className={styles.currency}>€</span>1350
                  <span className={styles.setupLabel}>eenmalige setup</span>
                </div>
                <p className={styles.pricingDesc}>Een high-end website, naadloos geïntegreerd met de premium app.</p>
              </div>
              <ul className={styles.pricingFeatures}>
                <li><span className={styles.checkIcon}></span><strong>Alles uit Premium App</strong></li>
                <li><span className={styles.checkIcon}></span><strong>Eigen menukaart/prijslijst compleet zelf beheren vanuit het dashboard</strong></li>
                <li><span className={styles.checkIcon}></span>High-End Custom Website Design</li>
                <li><span className={styles.checkIcon}></span>Razendsnelle laadtijden & SEO</li>
                <li><span className={styles.checkIcon}></span>1 centraal beheer voor site en app</li>
              </ul>
              <div className={styles.pricingAction}>
                <a href="https://wa.me/32494816714" className={styles.pricingBtn} target="_blank" rel="noreferrer">
                  Kies Website + App
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Klantenkaart;
