import React, { useState } from 'react';
import { scrollToSection } from '../utils/scrollToSection';
import styles from './FAQ.module.css';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

interface FAQGroup {
  title: string;
  faqs: FAQItem[];
}

const faqGroups: FAQGroup[] = [
  {
    title: 'Over je project',
    faqs: [
      {
        id: 'past-dit-bij-mij',
        question: 'Voor welke zaken is Webaanzee een goede match?',
        answer: 'Voor zelfstandigen en kleine ondernemingen die online dezelfde kwaliteit willen uitstralen als in hun werk. Of je nu vertrouwen wilt opbouwen, meer aanvragen wilt krijgen, afspraken wilt laten boeken of iets wilt verkopen: we vertrekken van het doel, niet van een standaardpakket.'
      },
      {
        id: 'wat-kost-een-website',
        question: 'Wat kost een professionele website?',
        answer: 'Een heldere, professionele website start vanaf €950. Moet je website ook afspraken, aanvragen, verkoop of koppelingen met andere systemen regelen, dan start dat vanaf €1.950. Na een eerste gesprek krijg je een voorstel op maat met duidelijke afspraken over wat wel en niet inbegrepen is.'
      },
      {
        id: 'wat-is-inbegrepen',
        question: 'Wat zit er precies in de prijs?',
        answer: 'Dat hangt af van wat je website moet doen. Het voorstel maakt concreet welke pagina’s, functies, inhoudelijke hulp, technische opzet en begeleiding voorzien zijn. Zo weet je vóór de start waar je voor betaalt en kom je niet voor losse verrassingen te staan.'
      },
      {
        id: 'eerste-gesprek',
        question: 'Moet ik al exact weten wat ik nodig heb?',
        answer: 'Nee. Je hoeft geen aantal pagina’s, platform of technische oplossing te kiezen. Vertel waar je vandaag tegenaan loopt en wat je wilt bereiken. In een eerste gesprek maken we samen helder wat nodig is — en wat je gerust kunt weglaten.'
      },
      {
        id: 'timing',
        question: 'Hoe lang duurt het om een website te laten maken?',
        answer: 'De timing hangt af van de omvang, de functies en hoe snel we inhoud en feedback kunnen verzamelen. We leggen vooraf een realistische planning met duidelijke momenten voor keuzes en feedback vast, zodat je altijd weet waar het project staat.'
      }
    ]
  },
  {
    title: 'Zo werken we samen',
    faqs: [
      {
        id: 'werkwijze',
        question: 'Hoe verloopt een samenwerking van idee tot livegang?',
        answer: 'We starten met je zaak, doelgroep en doel. Daarna brengen we structuur en inhoud in kaart, werken we het ontwerp uit en bouw ik de website. Voor de lancering testen we alles grondig op desktop en mobiel. Je hebt tijdens het hele traject één rechtstreeks aanspreekpunt.'
      },
      {
        id: 'inhoud-en-fotos',
        question: 'Moet ik zelf alle teksten en foto’s aanleveren?',
        answer: 'Je kent je zaak het best, dus jouw input is onmisbaar. Maar je hoeft niet met een perfect dossier te beginnen. We bekijken samen welke informatie, beelden en voorbeelden er al zijn en wat nog nodig is om je verhaal helder te maken.'
      },
      {
        id: 'feedback-rondes',
        question: 'Kan ik tussendoor feedback geven en wijzigingen vragen?',
        answer: 'Zeker. Je krijgt geen afgewerkte site voorgeschoteld zonder tussentijdse afstemming. We spreken logische feedbackmomenten af, zodat belangrijke keuzes op tijd worden bijgestuurd en de website echt bij jouw zaak past.'
      },
      {
        id: 'freelancer-of-bureau',
        question: 'Waarom met één freelancer werken in plaats van met een groot bureau?',
        answer: 'Je praat rechtstreeks met degene die je website ontwerpt én bouwt. Geen accountmanager, geen overdracht tussen designer en developer. Dat houdt de communicatie kort, de beslissingen helder en het eindresultaat één geheel.'
      }
    ]
  },
  {
    title: 'Techniek, beheer en resultaat',
    faqs: [
      {
        id: 'zelf-beheren',
        question: 'Kan ik later zelf teksten, foto’s of pagina’s aanpassen?',
        answer: 'Als je zelf inhoud wilt aanpassen, bepalen we eerst wat je echt nodig hebt. Daarna voorzien we een eenvoudige manier om precies die zaken te beheren, zonder je op te zadelen met een ingewikkeld dashboard dat je nauwelijks gebruikt.'
      },
      {
        id: 'snel-mobiel',
        question: 'Werkt mijn website ook goed op smartphone en tablet?',
        answer: 'Ja. De mobiele versie is geen verkleinde bijzaak: veel bezoekers bekijken je site eerst op hun telefoon. Daarom bouwen en testen we elk belangrijk onderdeel voor verschillende schermgroottes, met aandacht voor leesbaarheid, snelheid en een duidelijke volgende stap.'
      },
      {
        id: 'gevonden-worden',
        question: 'Zorgt een nieuwe website ervoor dat ik beter gevonden word in Google?',
        answer: 'Een goede technische basis, heldere structuur en relevante inhoud helpen zoekmachines begrijpen waar je zaak over gaat. Dat is essentieel, maar geen eerlijke garantie op een specifieke positie: zichtbaarheid groeit ook door concurrentie, lokale relevantie en de inhoud die je blijft toevoegen.'
      },
      {
        id: 'formulieren-koppelingen',
        question: 'Kan de website afspraken, formulieren, betalingen of andere systemen verwerken?',
        answer: 'Ja, wanneer dat je doel vooruithelpt. Denk aan afspraakaanvragen, contactformulieren, een webshop, een digitale klantenkaart of een koppeling met een bestaand systeem. We bekijken eerst de eenvoudigste betrouwbare oplossing en nemen die mee in je voorstel.'
      },
      {
        id: 'domein-en-hosting',
        question: 'Wat met mijn domeinnaam, e-mail en hosting?',
        answer: 'Heb je al een domeinnaam of e-mailadressen, dan bekijken we wat kan blijven bestaan en wat eventueel moet verhuizen. Hosting en technisch onderhoud kunnen we na de lancering verder opnemen. De afspraken en eventuele terugkerende kosten zijn vooraf duidelijk.'
      },
      {
        id: 'onderhoud',
        question: 'Ben ik na de lancering op mezelf aangewezen?',
        answer: 'Nee. Een website is nooit helemaal “af”: je zaak verandert, inhoud veroudert en er kunnen nieuwe ideeën ontstaan. Je kunt na de livegang rekenen op hulp met hosting, wijzigingen en verdere verbeteringen. We spreken vooraf af welke ondersteuning het best bij je past.'
      },
      {
        id: 'eigenaarschap',
        question: 'Van wie is de website wanneer hij live staat?',
        answer: 'Je website is gemaakt voor jouw zaak en jouw online aanwezigheid. Bij de start maken we heldere afspraken over toegang, domein, hosting en alle diensten die nodig zijn om de site te laten draaien, zodat je precies weet waar je aan toe bent.'
      }
    ]
  }
];

const FAQ: React.FC = () => {
  const [openFaqId, setOpenFaqId] = useState<string | null>(null);

  return (
    <section className={styles.section} id="faq">
      <div className={`${styles.container} animate-on-scroll`}>
        <div className={`${styles.header} reveal-up`}>
          <span className={styles.label}>Transparantie</span>
          <h2 className={styles.title}>Veelgestelde Vragen.</h2>
          <p className={styles.intro}>Een website laten maken is een serieuze beslissing. Dit zijn de vragen die er écht toe doen.</p>
        </div>

        <div className={styles.accordion}>
          {faqGroups.map((group) => (
            <div className={styles.group} key={group.title}>
              <h3 className={styles.groupTitle}>{group.title}</h3>
              <div className={styles.items}>
                {group.faqs.map((faq) => (
                  <details
                    key={faq.id}
                    className={styles.details}
                    open={openFaqId === faq.id}
                  >
                    <summary
                      className={styles.summary}
                      onClick={(event) => {
                        event.preventDefault();
                        setOpenFaqId((currentId) => currentId === faq.id ? null : faq.id);
                      }}
                    >
                      {faq.question}
                      <span className={styles.icon}>+</span>
                    </summary>
                    <div className={styles.answer}>
                      <p>{faq.answer}</p>
                    </div>
                  </details>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className={styles.footer}>
          Staat uw vraag er niet tussen? <a href="#contact" onClick={(e) => scrollToSection(e, 'contact')} className={styles.link}>Neem contact op</a>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
