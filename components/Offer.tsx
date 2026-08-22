import React from 'react';
import { scrollToSection } from '../utils/scrollToSection';
import styles from './Offer.module.css';

const Offer: React.FC = () => (
  <section className={styles.section} id="prijzen">
    <div className={styles.container}>
      <header className={styles.header}>
        <span className={styles.eyebrow}>Tarieven</span>
        <h2>Wat moet je website<br />voor je doen?</h2>
        <p>Je hoeft geen technische keuzes te maken. Vertel waar je naartoe wil, dan bouwen we alleen wat nodig is om daar te geraken.</p>
      </header>

      <div className={styles.stage}>
        <article className={`${styles.route} ${styles.routeFirst}`}>
          <div className={styles.routeInner}>
            <div className={styles.routeIntro}>
              <p className={styles.routeLabel}>Je zaak sterk neerzetten</p>
              <h3>Een professionele website die meteen vertrouwen geeft.</h3>
            </div>
            <div className={styles.routeBody}>
              <p>Voor ondernemers die online eindelijk dezelfde kwaliteit willen uitstralen als in hun eigen werk.</p>
              <p>Je krijgt een website die duidelijk maakt wie je bent, wat je doet en waarom klanten voor jou kiezen — zonder onnodige pagina&apos;s of marketinggedoe.</p>
              <p className={styles.listLead}>Geschikt wanneer je vooral wilt:</p>
              <ul>
                <li>professioneel voor de dag komen</li>
                <li>je aanbod helder uitleggen</li>
                <li>makkelijker gevonden en gecontacteerd worden</li>
                <li>een website hebben waar je met vertrouwen mensen naartoe stuurt</li>
              </ul>
            </div>
            <div className={styles.decisionZone}>
              <div className={styles.routePrice}>
                <span>vanaf</span>
                <strong>€950</strong>
                <span>eenmalig</span>
              </div>
              <a href="#contact" onClick={(event) => scrollToSection(event, 'contact')} className={styles.routeAction}>Dit is wat ik zoek <span aria-hidden="true">→</span></a>
            </div>
          </div>
        </article>

        <article className={`${styles.route} ${styles.routeSecond}`}>
          <div className={styles.routeInner}>
            <div className={styles.routeIntro}>
              <p className={styles.routeLabel}>Je website voor je laten werken</p>
              <h3>Meer dan een mooie plek op het internet.</h3>
              <div className={styles.routePrice}>
                <span>vanaf</span>
                <strong>€1.950</strong>
                <span>eenmalig</span>
              </div>
            </div>
            <div className={styles.routeBody}>
              <p>Voor wanneer je website ook een concrete taak moet uitvoeren.</p>
              <p>Aanvragen verzamelen. Afspraken laten boeken. Producten verkopen. Informatie verwerken. Of een stuk handmatig werk uit je bedrijf halen.</p>
              <p>We kijken eerst naar wat er moet gebeuren en bouwen vervolgens de kortste, slimste route ernaartoe.</p>
              <p className={styles.listLead}>Geschikt wanneer je website moet:</p>
              <ul>
                <li>bezoekers naar een duidelijke actie begeleiden</li>
                <li>formulieren, afspraken of aanvragen verwerken</li>
                <li>koppelen met andere systemen</li>
                <li>kunnen meegroeien met je bedrijf</li>
              </ul>
              <a href="#contact" onClick={(event) => scrollToSection(event, 'contact')} className={styles.routeAction}>Bespreek mijn idee <span aria-hidden="true">→</span></a>
            </div>
          </div>
        </article>
      </div>

      <div className={styles.reassurance}>
        <span>Niet zeker welke richting past?</span>
        <p>Dat hoeft ook niet. In een eerste gesprek maken we je doel concreet en krijg je een eerlijk voorstel, zonder verrassingen achteraf.</p>
        <a href="#contact" onClick={(event) => scrollToSection(event, 'contact')}>Plan een vrijblijvend gesprek <span aria-hidden="true">→</span></a>
      </div>
    </div>
  </section>
);

export default Offer;
