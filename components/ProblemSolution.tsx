import React from 'react';
import type { MotionValue } from 'motion/react';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { capabilities } from '../data/capabilities';
import { scrollToSection } from '../utils/scrollToSection';
import ServiceWorkbench, { ServiceLink, serviceExamples } from './ServiceWorkbench';
import styles from './ProblemSolution.module.css';

export { capabilities } from '../data/capabilities';

/** The same content in a pinned desktop workbench or ordinary, fully readable chapters. */
export default function ProblemSolution({ progress, entrance, onNavigate }: {
  progress?: MotionValue<number>;
  entrance?: MotionValue<number>;
  onNavigate?: (index: number) => void;
  mobile?: boolean;
}) {
  if (progress && entrance && onNavigate) return <ServiceWorkbench distance={progress} entrance={entrance} onNavigate={onNavigate} />;

  return <section className={styles.section} id="werkwijze" aria-labelledby="services-title">
    <div className={styles.container}>
      <header className={styles.header}>
        <h2 id="services-title">Wat wil je online<br /><em>mogelijk maken?</em></h2>
        <p>Ik ontwerp én bouw je website. Je bespreekt de inhoud, vormgeving en techniek met dezelfde persoon. Dit kan ik voor je uitwerken.</p>
      </header>
      <div className={styles.chapters}>
        {capabilities.map((item, index) => <article key={item.title} data-service-chapter={index} className={styles.chapter} aria-labelledby={`service-trigger-${index}`}>
          <figure className={`${styles.example} ${styles[item.tone]}`}>
            {serviceExamples[index].kind === 'dashboard' ? <div className={styles.pairedMedia}>
              <img src={serviceExamples[index].image} alt="CMS van Atelier Rembrandt voor het beheer van de collectie" width="1600" height="904" loading="lazy" decoding="async" />
              <img src={serviceExamples[index].detail} alt="Publieke collectiepagina van Atelier Rembrandt" width="1600" height="904" loading="lazy" decoding="async" />
            </div> : <img src={[1, 4].includes(index) ? serviceExamples[index].detail : serviceExamples[index].image} alt={`Voorbeeld van ${item.title.toLowerCase()}: ${item.project}`} width="1276" height="720" loading="lazy" decoding="async" />}
            <figcaption><span>{serviceExamples[index].label}</span><a href={serviceExamples[index].path}>Bekijk {item.project.replace(' · Dashboard', '')}<ArrowUpRight size={16} aria-hidden="true" /></a></figcaption>
          </figure>
          <div className={styles.copy} id={`service-panel-${index}`}>
            <h3 id={`service-trigger-${index}`}><span>{String(index + 1).padStart(2, '0')}</span>{item.title}</h3>
            <p>{item.text}</p>
            <ul>{item.tags.map(tag => <li key={tag}>{tag}</li>)}</ul>
            <ServiceLink index={index} />
          </div>
        </article>)}
      </div>
      <a className={styles.contact} href="#contact" onClick={event => scrollToSection(event, 'contact')}>Vertel over je project<ArrowDown size={19} aria-hidden="true" /></a>
    </div>
  </section>;
}
