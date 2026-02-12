import React from 'react';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    id: "waarom-jij",
    question: "Waarom zou ik voor jou kiezen en niet voor een groot bureau?",
    answer: "Grote bureaus werken vaak met trage templates en hoge overheadkosten. Ik ben een specialist die focust op snelheid en resultaat. Zoals bewezen met mijn eigen project Hondaanzee.be — 13.700 bezoekers in 12 dagen en #1 in Google boven officiële instanties. U krijgt direct contact, geen accountmanagers."
  },
  {
    id: "aanpassen",
    question: "Kan ik zelf teksten of foto's aanpassen?",
    answer: "Bewust niet. Doe-het-zelf systemen zoals WordPress maken websites vaak traag, onveilig en gevoelig voor hacks. Om die 100/100 Google-score te garanderen, beheer ik de techniek. Wilt u een tekst aanpassen of een nieuwe foto plaatsen? Een mailtje of appje volstaat, en het staat er vaak dezelfde dag nog op. Dat zit gewoon in uw servicepakket."
  },
  {
    id: "nummer-een",
    question: "Sta ik met mijn nieuwe site meteen op nummer 1 in Google?",
    answer: "Ik lever de 'Ferrari' onder de websites: technisch perfect geoptimaliseerd zodat Google u geweldig vindt. Dat is de basis. Voor zeer competitieve markten is daarnaast ook content (blogs, teksten) nodig om te blijven stijgen. De technische fundering die u bij mij krijgt, geeft u in elk geval een enorme voorsprong op concurrenten met verouderde sites."
  },
  {
    id: "maandelijks",
    question: "Waarvoor dient de maandelijkse hosting & onderhoud precies?",
    answer: "Dat is uw digitale verzekering. Het zorgt ervoor dat uw site razendsnel blijft, beveiligd is tegen aanvallen en altijd online staat. Maar belangrijker: Google verandert zijn regels constant. Ik zorg dat uw site technisch up-to-date blijft zodat u uw posities niet verliest. Geen gedoe met updates of serverproblemen — ik regel alles."
  },
  {
    id: "tijdsinvestering",
    question: "Hoeveel tijd kost dit mij als ondernemer?",
    answer: "Minimaal. We hebben één kort gesprek — telefonisch of bij u op de zaak — waarin we uw doel bespreken. Heeft u al foto's? Stuur ze door. Geen teksten? Geen probleem, dan schrijf ik een voorzet op basis van ons gesprek. Mijn doel is dat u gewoon kunt doorwerken terwijl ik uw online aanwezigheid bouw."
  },
  {
    id: "snelheid",
    question: "Hoe snel kan mijn website online staan?",
    answer: "Als alle info is aangeleverd, staat uw website binnen 7 dagen live."
  },
  {
    id: "domein",
    question: "Wat als ik al een domeinnaam heb?",
    answer: "Geen probleem. Ik verhuis deze gratis voor u naar de nieuwe hosting."
  }
];

const FAQ: React.FC = () => {
  return (
    <section className="relative py-24 md:py-32 px-6 bg-gradient-to-b from-slate-50 to-white overflow-hidden">
      {/* Decorative accent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-amber-50/40 rounded-full blur-[120px] pointer-events-none -translate-y-1/2"></div>
      
      <div className="relative max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block text-[11px] font-bold uppercase tracking-[0.2em] text-amber-600 mb-4">Vaak gesteld</span>
          <h2 id="faq-heading" className="text-3xl md:text-5xl font-serif text-slate-900 tracking-[-0.02em]">
            Veelgestelde vragen
          </h2>
        </div>

        {/* Accordion - Premium styling */}
        <div className="space-y-3">
          {faqs.map((faq) => (
            <details 
              key={faq.id} 
              className="group bg-white rounded-2xl shadow-sm border border-slate-100 hover:border-slate-200 hover:shadow-md transition-all duration-300 overflow-hidden"
              itemScope
              itemProp="mainEntity"
              itemType="https://schema.org/Question"
            >
              <summary className="flex justify-between items-center py-5 px-6 cursor-pointer list-none font-semibold text-slate-900 hover:text-slate-700 transition-colors select-none">
                <span itemProp="name" className="pr-4">{faq.question}</span>
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-slate-100 group-hover:bg-amber-50 group-open:bg-amber-100 flex items-center justify-center transition-all duration-300">
                  <svg 
                    width="16" 
                    height="16" 
                    viewBox="0 0 20 20" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2"
                    strokeLinecap="round"
                    className="text-slate-400 group-open:text-amber-600 group-open:rotate-45 transition-all duration-300"
                  >
                    <line x1="10" y1="4" x2="10" y2="16" />
                    <line x1="4" y1="10" x2="16" y2="10" />
                  </svg>
                </span>
              </summary>
              <div 
                className="px-6 pb-6 text-slate-500 leading-relaxed border-t border-slate-50"
                itemScope
                itemProp="acceptedAnswer"
                itemType="https://schema.org/Answer"
              >
                <p itemProp="text" className="pt-4">{faq.answer}</p>
              </div>
            </details>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <p className="text-slate-400 text-sm">
            Uw vraag er niet bij?{' '}
            <a href="#contact" className="text-amber-600 font-medium hover:text-amber-700 transition-colors underline underline-offset-2 decoration-amber-300">Stel ze gerust</a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
