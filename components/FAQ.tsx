import React, { useState } from 'react';
import { scrollToSection } from '../utils/scrollToSection';
import styles from './FAQ.module.css';
import { pricingSummary, euro, pricing } from '../data/pricing.mjs';

const faqGroups = [
  {
    title: 'Project & investering',
    faqs: [
      { id: 'match', question: 'Voor wie is Webaanzee een goede match?', answer: 'Voor ondernemers en kleine organisaties die veel belang hechten aan uitstraling, duidelijke communicatie en rechtstreeks contact. Dat kan een lokale handelszaak zijn, maar ook een webshop, digitaal platform of toepassing op maat.' },
      { id: 'prijs', question: 'Wat kost een professionele website?', answer: pricingSummary },
      { id: 'cms', question: 'Kan ik mijn website zelf aanpassen met een CMS?', answer: `Ja. Een website met CMS/dashboard start vanaf ${euro(pricing.cms.price)} excl. btw. De website, een beveiligde login, beheer van teksten en foto’s, één inhoudstype en persoonlijke uitleg zijn inbegrepen. Extra inhoudstypes, gebruikersrollen en bedrijfsprocessen begroten we apart.` },
      { id: 'start', question: 'Moet ik vooraf exact weten wat ik nodig heb?', answer: 'Nee. Vertel waar je zaak vandaag staat, wat er beter moet en wat je wilt bereiken. Webaanzee vertaalt dat naar een passende structuur, functies en aanpak.' },
      { id: 'timing', question: 'Hoe lang duurt een traject?', answer: 'Dat hangt af van de omvang, functies en beschikbare inhoud. Voor de start leggen we een realistische planning en vaste feedbackmomenten vast, zodat je altijd weet waar het project staat.' },
    ],
  },
  {
    title: 'Samenwerking & techniek',
    faqs: [
      { id: 'werkwijze', question: 'Hoe verloopt de samenwerking?', answer: 'We starten met je zaak, klanten en doelen. Daarna volgen structuur, visuele richting, ontwerp en technische bouw. Je ziet het project tussendoor en geeft feedback op logische momenten. Voor de lancering wordt alles grondig getest.' },
      { id: 'inhoud', question: 'Krijg ik hulp met tekst en beelden?', answer: 'Ja. We bekijken wat al beschikbaar is en wat nog ontbreekt. Je krijgt hulp met structuur, teksten, beeldselectie en—wanneer nodig—een duidelijke briefing voor fotografie.' },
      { id: 'google', question: 'Wordt mijn website goed gevonden in Google?', answer: 'Elke website krijgt een snelle technische basis, heldere structuur en correcte zoekmachine-instellingen. Goede zichtbaarheid groeit daarna verder met relevante inhoud, lokale bekendheid en gerichte optimalisatie.' },
      { id: 'nazorg', question: 'Wat gebeurt er na de lancering?', answer: `Hosting en technisch beheer via Webaanzee starten vanaf ${euro(pricing.website.monthly)}/maand voor een website, ${euro(pricing.cms.monthly)}/maand met CMS en ${euro(pricing.webshop.monthly)}/maand voor een webshop, excl. btw. Domeinnaam, zakelijke e-mail en externe licenties staan apart in de offerte. Inhoudelijke wijzigingen kosten ${euro(pricing.hourly)}/uur excl. btw, na een raming en jouw akkoord.` },
    ],
  },
];

const FAQ: React.FC = () => {
  const [openFaqId, setOpenFaqId] = useState<string | null>(null);

  return (
    <section className={styles.section} id="faq">
      <div className={`${styles.container} animate-on-scroll`}>
        <div className={`${styles.header} reveal-up`}>
          <span className={styles.label}>Goed om te weten</span>
          <h2 className={styles.title}>Heldere antwoorden.<br />Voor je beslist.</h2>
          <p className={styles.intro}>De belangrijkste vragen over investering, samenwerking en wat je na de lancering mag verwachten.</p>
        </div>

        <div className={styles.accordion}>
          {faqGroups.map((group) => (
            <div className={styles.group} key={group.title}>
              <h3 className={styles.groupTitle}>{group.title}</h3>
              <div className={styles.items}>
                {group.faqs.map((faq) => (
                  <details key={faq.id} className={styles.details} open={openFaqId === faq.id}>
                    <summary className={styles.summary} onClick={(event) => { event.preventDefault(); setOpenFaqId((current) => current === faq.id ? null : faq.id); }}>
                      {faq.question}<span className={styles.icon}>+</span>
                    </summary>
                    <div className={styles.answer}><p>{faq.answer}</p></div>
                  </details>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className={styles.footer}>Nog iets onduidelijk? <a href="#contact" onClick={(event) => scrollToSection(event, 'contact')} className={styles.link}>Vraag het rechtstreeks</a></div>
      </div>
    </section>
  );
};

export default FAQ;
