import React from 'react';
import styles from './SEOAnalyse.module.css';
import { scrollToSection } from '../utils/scrollToSection';

const SEOAnalyse: React.FC = () => {
  const processItems = [
    {
      icon: '01',
      title: 'Eerst begrijpen',
      desc: 'We bespreken je zaak, je klanten en wat de website daadwerkelijk moet bereiken.',
    },
    {
      icon: '02',
      title: 'Dan bepalen',
      desc: 'Ik werk uit welke informatie op elke pagina komt en hoe bezoekers contact opnemen of bestellen.',
    },
    {
      icon: '03',
      title: 'Ontwerpen en bouwen',
      desc: 'Ik ontwerp en bouw de website. Je feedback op inhoud en vormgeving komt bij dezelfde persoon terecht.',
    },
    {
      icon: '04',
      title: 'Scherpstellen',
      desc: 'Desktop, mobiel, snelheid, toegankelijkheid en details worden getest en aangescherpt voordat de site live gaat.',
    },
  ];

  return (
    <section className={styles.section} id="seo-analyse">
      <div className={`${styles.container} animate-on-scroll`}>
        <div className={`${styles.header} reveal-up`}>
          <span className={styles.badge}>Werkwijze</span>
          <h2 className={styles.title}>Van je vraag naar een uitgewerkte opdracht.</h2>
          <p className={styles.description}>
            Je hoeft geen briefing van twintig pagina&apos;s te schrijven of uit te leggen welk CMS je wilt. Vertel me gewoon over je zaak. Wat verkoop je? Wie moet je overtuigen? Wat werkt vandaag niet? En wat zou de website idealiter voor je oplossen? Daar maak ik een concreet plan van.
          </p>
        </div>

        <div className={styles.grid}>
          {processItems.map((item, i) => (
            <div key={item.title} className={`${styles.card} reveal-up`} style={{ animationDelay: `${i * 0.1}s` }}>
              <span className={styles.cardIcon}>{item.icon}</span>
              <h4 className={styles.cardTitle}>{item.title}</h4>
              <p className={styles.cardDesc}>{item.desc}</p>
            </div>
          ))}
        </div>

        <div className={`${styles.cta} reveal-up`} style={{ animationDelay: '0.4s' }}>
          <a href="#resultaten" onClick={(event) => scrollToSection(event, 'resultaten')} className="btn btn-primary">Bekijk mijn projecten</a>
        </div>
      </div>
    </section>
  );
};

export default SEOAnalyse;
