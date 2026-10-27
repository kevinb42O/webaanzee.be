import React, { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'motion/react';
import { Plus } from 'lucide-react';
import { scrollToSection } from '../utils/scrollToSection';
import styles from './FAQ.module.css';
import { pricingSummary, euro, pricing } from '../data/pricing.mjs';

const faqGroups = [
  {
    title: 'Je website',
    faqs: [
      { id: 'match', question: 'Voor wie bouw je websites?', answer: `Voor zelfstandigen, winkels en kleine organisaties die hun website willen laten ontwerpen en bouwen door één persoon. Een website op maat start vanaf ${euro(pricing.website.price)} excl. btw. Voor online verkoop of een bedrijfsproces werk ik een webshop of toepassing uit.` },
      { id: 'prijs', question: 'Wat kost een website?', answer: pricingSummary },
      { id: 'cms', question: 'Kan ik teksten en foto’s zelf aanpassen?', answer: `Ja, met een beheerscherm (CMS). Dit aanbod start vanaf ${euro(pricing.cms.price)} excl. btw en omvat de website, een beveiligde login, tekst- en fotobeheer en uitleg. Het beheer wordt ingericht voor één soort inhoud, bijvoorbeeld nieuws óf projecten. Extra soorten inhoud, statistieken en gebruikersrollen staan apart in de offerte.` },
      { id: 'start', question: 'Wat heb je nodig om een voorstel te maken?', answer: 'Vertel wat je zaak doet, wie je klanten zijn en wat je wilt laten maken of verbeteren. Stuur de link van je huidige website mee als je die hebt. Je hoeft nog geen lijst met pagina’s of technische keuzes klaar te hebben.' },
      { id: 'timing', question: 'Wanneer kan mijn website klaar zijn?', answer: 'Stuur je gewenste opleverdatum mee met je aanvraag. Ik bekijk dan de beschikbare ruimte in de planning, de benodigde functies en welke teksten en beelden al klaarstaan. Je krijgt een planning bij het voorstel; de bouw en feedbackmomenten spreken we voor de start af.' },
    ],
  },
  {
    title: 'Samenwerken en beheer',
    faqs: [
      { id: 'werkwijze', question: 'Hoe verloopt de samenwerking?', answer: 'Eerst bespreken we je aanbod en de vragen van je klanten. Ik werk de pagina-indeling en het ontwerp uit, waarna je feedback geeft op de afgesproken momenten. Daarna volgen de bouw en de controle van de website op mobiel en desktop. De offerte vermeldt wat ik oplever en wat je zelf aanlevert.' },
      { id: 'inhoud', question: 'Help je met teksten en beelden?', answer: 'Ik help bepalen welke inhoud nodig is en hoe die over je pagina’s wordt verdeeld. Voor de bouw lever je de afgesproken teksten en beelden aan. Wil je tekstschrijven, fotografie of vertalingen laten verzorgen? Dan neem ik die werkzaamheden apart op in de offerte.' },
      { id: 'google', question: 'Wat doe je voor de vindbaarheid?', answer: 'De bouw omvat paginatitels, beschrijvingen en de technische instellingen waarmee zoekmachines de pagina’s kunnen vinden en lezen. Aanvullend zoekwoordenonderzoek, nieuwe inhoud en doorlopende optimalisatie spreken we apart af. Een positie in Google kan ik niet garanderen.' },
      { id: 'nazorg', question: 'Hoe vraag ik hulp na de oplevering?', answer: `Neem rechtstreeks contact met mij op bij een technisch probleem of een gewenste wijziging. Hosting en technisch beheer omvatten de online infrastructuur, updates en back-ups volgens je offerte. Die kosten starten vanaf ${euro(pricing.website.monthly)}/maand voor een website, ${euro(pricing.cms.monthly)}/maand met CMS en ${euro(pricing.webshop.monthly)}/maand voor een webshop, excl. btw. Inhoud aanpassen kost ${euro(pricing.hourly)}/uur, na een raming en je akkoord.` },
      { id: 'overdracht', question: 'Wat spreken we af over toegang en overdracht?', answer: 'Voor de start leggen we vast wie de domeinnaam, hosting en eventuele softwareaccounts beheert en welke toegang je krijgt. Wil je eigen hosting gebruiken of later verhuizen? Geef dat aan, zodat de mogelijkheden, werkzaamheden en eventuele kosten vooraf in de offerte staan.' },
    ],
  },
];

function FAQItem({ faq, expanded, onToggle }: { faq: { id: string; question: string; answer: string }; expanded: boolean; onToggle: () => void }) {
  const reduced = useReducedMotion();
  const root = useRef<HTMLDetailsElement>(null);
  const answer = useRef<HTMLDivElement>(null);
  const animation = useRef<Animation | null>(null);

  useEffect(() => () => animation.current?.cancel(), []);
  useEffect(() => {
    const details = root.current;
    const panel = answer.current;
    if (!details || !panel) return;
    const from = details.open ? panel.getBoundingClientRect().height : 0;
    animation.current?.cancel();
    if (reduced || (!details.open && !expanded)) { details.open = expanded; return; }
    details.open = true;
    const effect = panel.animate([{ height: `${from}px` }, { height: expanded ? `${panel.scrollHeight}px` : '0px' }], {
      duration: expanded ? 320 : 220, easing: 'cubic-bezier(.16,1,.3,1)',
    });
    animation.current = effect;
    effect.onfinish = () => { details.open = expanded; animation.current = null; };
  }, [expanded, reduced]);

  return <details ref={root} className={styles.details} data-open={expanded}>
    <summary id={`faq-question-${faq.id}`} className={styles.summary} aria-expanded={expanded} aria-controls={`faq-answer-${faq.id}`} onClick={event => { event.preventDefault(); onToggle(); }}>
      {faq.question}<span className={styles.icon} aria-hidden="true"><Plus size={18} strokeWidth={1.5} /></span>
    </summary>
    <div ref={answer} id={`faq-answer-${faq.id}`} className={styles.answerWindow} role="region" aria-labelledby={`faq-question-${faq.id}`}>
      <div className={styles.answer}><p>{faq.answer}</p></div>
    </div>
  </details>;
}

const FAQ: React.FC = () => {
  const [openFaqId, setOpenFaqId] = useState<string | null>(null);
  return (
    <section className={styles.section} id="faq">
      <div className={styles.container}>
        <div className={styles.header}>

          <h2 className={styles.title}>Vragen over<br />je website.</h2>
          <p className={styles.intro}>Van de eerste aanvraag tot het aanpassen van je website na de oplevering.</p>
        </div>

        <div className={styles.accordion}>
          {faqGroups.map((group) => (
            <div className={styles.group} key={group.title}>
              <h3 className={styles.groupTitle}>{group.title}</h3>
              <div className={styles.items}>
                {group.faqs.map((faq) => (
                  <FAQItem key={faq.id} faq={faq} expanded={openFaqId === faq.id} onToggle={() => setOpenFaqId(current => current === faq.id ? null : faq.id)} />
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
