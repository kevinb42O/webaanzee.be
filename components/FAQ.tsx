import React from 'react';
import { scrollToSection } from '../utils/scrollToSection';
import styles from './FAQ.module.css';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    id: "waarom-jij",
    question: "Waarom een gespecialiseerde freelancer in plaats van een groot bureau?",
    answer: "Grote bureaus hebben trage processen, accountmanagers en hoge overhead. Ik bied direct contact, razendsnelle iteraties en één aanspreekpunt."
  },
  {
    id: "aanpassen",
    question: "Kan ik zelf de inhoud beheren via WordPress?",
    answer: "Nee, en dat is bewust. WordPress maakt websites vaak traag en kwetsbaar. Ik bouw alles in handgeschreven, moderne code. Wil je een wijziging? Stuur een bericht en het wordt dezelfde dag doorgevoerd, zonder dat je hoeft te vechten met een onhandig CMS."
  },
  {
    id: "maandelijks",
    question: "Waarom reken je een maandelijks bedrag voor onderhoud?",
    answer: "De technologie en Google-eisen veranderen continu. Het abonnement dekt premium hosting, veiligheidsupdates en content-wijzigingen — zodat je site blijft doen wat hij moet doen, zonder dat jij ernaar hoeft om te kijken."
  },
  {
    id: "snelheid",
    question: "Wat is de gemiddelde oplevertermijn?",
    answer: "Voor het Professional pakket staat uw website live binnen 7 tot 14 dagen nadat alle benodigde informatie en media zijn aangeleverd."
  }
];

const FAQ: React.FC = () => {
  return (
    <section className={styles.section} id="faq">
      <div className={`${styles.container} animate-on-scroll`}>
        <div className={`${styles.header} reveal-up`}>
          <span className={styles.label}>Transparantie</span>
          <h2 className={styles.title}>Veelgestelde Vragen.</h2>
        </div>

        <div className={styles.accordion}>
          {faqs.map((faq, i) => (
            <details key={faq.id} className={`${styles.details} reveal-up`} style={{ animationDelay: `${i * 0.1}s` }}>
              <summary className={styles.summary}>
                {faq.question}
                <span className={styles.icon}>+</span>
              </summary>
              <div className={styles.answer}>
                <p>{faq.answer}</p>
              </div>
            </details>
          ))}
        </div>

        <div className={`${styles.footer} reveal-up`} style={{ animationDelay: '0.4s' }}>
          Staat uw vraag er niet tussen? <a href="#contact" onClick={(e) => scrollToSection(e, 'contact')} className={styles.link}>Neem contact op</a>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
