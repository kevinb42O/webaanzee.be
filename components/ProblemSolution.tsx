import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import styles from './ProblemSolution.module.css';

const capabilities = [
  { number: '01', title: 'Webdesign', text: 'Een eigen visuele richting, heldere inhoud en een website die op elk scherm overtuigt.', href: '/diensten/webdesign/' },
  { number: '02', title: 'Webshops', text: 'Een snelle winkelervaring waarin assortiment, vertrouwen en afrekenen logisch samenkomen.', href: '/diensten/webshops/' },
  { number: '03', title: 'Webapplicaties', text: 'Digitale tools, dashboards en automatisaties die terugkerend werk eenvoudiger maken.', href: '/diensten/webapplicaties-en-automatisatie/' },
  { number: '04', title: 'Lokale groei', text: 'Een sterke technische basis en relevante pagina’s voor ondernemers langs de Belgische kust.', href: '/webdesign-belgische-kust/' },
];

const ProblemSolution: React.FC = () => (
  <section className={styles.section} id="werkwijze">
    <div className={styles.container}>
      <header className={styles.header}>
        <p className={styles.eyebrow}>Wat Webaanzee bouwt</p>
        <div>
          <h2>Niet zomaar online.<br /><em>Onmiskenbaar van jou.</em></h2>
          <p>Strategie, ontwerp en development komen samen in één rechtstreeks traject. Zo blijven het verhaal, de visuele richting en de techniek één digitale ervaring die tot in de details klopt.</p>
        </div>
      </header>

      <div className={styles.capabilities}>
        {capabilities.map((capability) => (
          <a key={capability.number} className={styles.capability} href={capability.href}>
            <span className={styles.number}>{capability.number}</span>
            <div>
              <h3>{capability.title}</h3>
              <p>{capability.text}</p>
            </div>
            <ArrowUpRight aria-hidden="true" strokeWidth={1.4} />
          </a>
        ))}
      </div>

      <div className={styles.studioNote}>
        <span>Van eerste schets tot live website</span>
        <p>Je praat rechtstreeks met de persoon die ontwerpt én bouwt. Daardoor blijft het idee intact, gaat feedback sneller en voelt het eindresultaat als één geheel.</p>
        <a href="#contact">Vertel over je project <ArrowUpRight aria-hidden="true" strokeWidth={1.5} /></a>
      </div>
    </div>
  </section>
);

export default ProblemSolution;
