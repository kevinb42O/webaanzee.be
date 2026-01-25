import React from 'react';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    id: "maandelijks",
    question: "Wat is inbegrepen in de €20/maand?",
    answer: "Alles. Hosting, domeinnaam, SSL-beveiliging, dagelijkse back-ups en tot 5 gratis kleine updates per maand. U hoeft zich nergens zorgen over te maken."
  },
  {
    id: "visitekaart",
    question: "Wat is een Digitale Visitekaart?",
    answer: "Een digitale visitekaart is een online profiel dat al uw belangrijke contactgegevens en sociale media links op één plek bundelt. Het is een moderne, milieuvriendelijke manier om uw netwerk uit te breiden en online gevonden te worden. U kunt eenvoudig een QR-code delen die mensen direct naar uw profiel leidt."
  },
  {
    id: "aanpassen",
    question: "Kan ik zelf teksten of foto's aanpassen?",
    answer: "Zeker. U krijgt toegang tot een simpel beheersysteem, of u stuurt mij een mailtje en ik pas het gratis aan (tot 5 aanpassingen per maand inbegrepen in de service)."
  },
  {
    id: "domein",
    question: "Wat als ik al een domeinnaam heb?",
    answer: "Geen probleem. Ik verhuis deze gratis voor u naar de nieuwe hosting."
  },
  {
    id: "snelheid",
    question: "Hoe snel kan mijn website online staan?",
    answer: "Als alle info is aangeleverd, staat uw website binnen 7 dagen live."
  },
  {
    id: "seo",
    question: "Is SEO inbegrepen bij mijn website?",
    answer: "Ja, basis SEO is altijd inbegrepen. Dit betekent dat uw website technisch geoptimaliseerd is voor Google, met correcte meta-tags, snelle laadtijd, en mobiel-vriendelijk design."
  },
  {
    id: "wat-is-seo",
    question: "Wat betekent SEO?",
    answer: "SEO staat voor Search Engine Optimization, oftewel zoekmachine-optimalisatie. Het zorgt ervoor dat uw website hoger verschijnt in Google wanneer potentiële klanten zoeken naar uw diensten. Denk aan de juiste zoekwoorden, snelle laadtijd, en een goed opgebouwde site. Hoe beter uw SEO, hoe meer mensen u vinden — zonder te betalen voor advertenties."
  }
];

const FAQ: React.FC = () => {
  return (
    <section className="py-20 px-6 bg-slate-50">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 id="faq-heading" className="text-3xl md:text-4xl font-serif text-slate-900">
            Veelgestelde vragen
          </h2>
        </div>

        {/* Accordion */}
        <div className="divide-y divide-slate-200 border-y border-slate-200">
          {faqs.map((faq) => (
            <details 
              key={faq.id} 
              className="group"
              itemScope
              itemProp="mainEntity"
              itemType="https://schema.org/Question"
            >
              <summary className="flex justify-between items-center py-5 cursor-pointer list-none font-medium text-slate-900 hover:text-slate-700 transition-colors">
                <span itemProp="name">{faq.question}</span>
                <span className="ml-4 flex-shrink-0 text-slate-400 group-open:rotate-45 transition-transform duration-200">
                  <svg 
                    width="20" 
                    height="20" 
                    viewBox="0 0 20 20" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2"
                    strokeLinecap="round"
                  >
                    <line x1="10" y1="4" x2="10" y2="16" />
                    <line x1="4" y1="10" x2="16" y2="10" />
                  </svg>
                </span>
              </summary>
              <div 
                className="pb-5 text-slate-600 leading-relaxed"
                itemScope
                itemProp="acceptedAnswer"
                itemType="https://schema.org/Answer"
              >
                <p itemProp="text">{faq.answer}</p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
