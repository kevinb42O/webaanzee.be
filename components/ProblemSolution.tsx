import React, { useRef } from 'react';
import { IconCamera, IconPencil, IconMobile } from './Icons';

// Custom gold checkmark icon - larger and premium
const GoldCheck = ({ className = '' }: { className?: string }) => (
  <svg 
    viewBox="0 0 24 24" 
    width={24} 
    height={24} 
    fill="none" 
    className={`w-6 h-6 flex-shrink-0 ${className}`}
  >
    <path 
      d="M5 12.5l5 5L20 7" 
      stroke="url(#goldGradient)" 
      strokeWidth={2.5} 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
    <defs>
      <linearGradient id="goldGradient" x1="5" y1="12" x2="20" y2="12">
        <stop offset="0%" stopColor="#fbbf24" />
        <stop offset="50%" stopColor="#f59e0b" />
        <stop offset="100%" stopColor="#d97706" />
      </linearGradient>
    </defs>
  </svg>
);

const ProblemSolution: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  const features = [
    {
      icon: IconCamera,
      title: "Sterk Beeldmateriaal",
      description: "Heeft u al foto's? Perfect. Nog geen? Geen probleem. Ik selecteer professionele beelden die perfect bij uw huisstijl passen."
    },
    {
      icon: IconPencil,
      title: "Teksten die overtuigen",
      description: "Geen moeilijke marketingtaal. Gewoon duidelijke Vlaamse tekst die aanzet tot contact."
    },
    {
      icon: IconMobile,
      title: "Alles geregeld, zonder gedoe",
      description: "Domeinnaam, e-mail en website. Ik regel de techniek van A tot Z en zorg dat u beter gevonden wordt op Google."
    }
  ];

  const checklistItems = [
    "Een website die perfect werkt op elke smartphone of tablet.",
    "U verliest geen kostbare tijd aan technisch gedoe.",
    "Ik kom persoonlijk langs en regel alles van A tot Z."
  ];

  return (
    <section 
      ref={sectionRef}
      className="relative py-28 md:py-32 px-6 bg-slate-50 overflow-hidden group/section"
    >
      {/* Subtle dot pattern background */}
      <div 
        className="absolute inset-0 opacity-[0.4]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgb(148 163 184 / 0.4) 1px, transparent 0)`,
          backgroundSize: '24px 24px'
        }}
      />
      
      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Left Content */}
          <div className="space-y-8">
            {/* Main Headline - Display Serif | Delay: 0ms */}
            <div>
              <h2 id="werkwijze-heading" className="text-4xl md:text-5xl font-serif font-semibold text-slate-900 leading-[1.15] tracking-tight mb-4">
                Wordt u al gevonden door nieuwe klanten?
              </h2>
              {/* Gradient bar - gold to transparent */}
              <div className="h-1.5 w-24 rounded-full bg-gradient-to-r from-amber-500 via-amber-400 to-transparent" />
            </div>
            
            {/* Body Text - Sans-Serif with relaxed leading | Delay: 300ms */}
            <p className="text-xl text-slate-700 leading-relaxed font-normal">
              Uw klanten zoeken u op hun smartphone. Vindt Google u niet? Dan gaat de klant naar de buurman.
            </p>
            <p className="text-slate-600 leading-relaxed text-base md:text-lg">
              Als lokale ondernemer aan de kust leeft u van uw reputatie. Maar in de wereld van vandaag begint die reputatie vaak online. Een verouderde site of - erger nog - geen site, kost u elke dag omzet.
            </p>
            
            {/* Checklist with Gold Checkmarks | Staggered: 500ms, 700ms, 900ms */}
            <ul className="space-y-5 pt-2">
              {checklistItems.map((text, idx) => (
                <li 
                  key={idx} 
                  className="flex items-start gap-4"
                >
                  <GoldCheck className="mt-0.5" />
                  <span className="text-slate-700 font-medium leading-relaxed">{text}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Side - Premium Feature Card | Delay: 200ms */}
          <div className="relative">
            {/* Card with gradient background, heavy shadow, and subtle border */}
            <div 
              className="relative rounded-3xl p-8 md:p-10 lg:p-12 text-white overflow-hidden border border-white/10"
              style={{
                background: 'linear-gradient(180deg, #1e293b 0%, #0f172a 100%)',
                boxShadow: '0 25px 50px -12px rgba(51, 65, 85, 0.25), 0 40px 80px -20px rgba(15, 23, 42, 0.3)'
              }}
            >
              {/* Subtle inner glow */}
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
              
              {/* Card Headline - Gold Gradient Text */}
              <h3 className="text-2xl md:text-[1.75rem] font-serif font-semibold mb-10 text-gold-gradient">
                Wat ik voor u regel:
              </h3>
              
              {/* Feature Items */}
              <div className="space-y-8">
                {features.map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-5">
                    {/* Icon Container - Transparent circle with gold border */}
                    <div className="flex-shrink-0 w-14 h-14 rounded-full border-2 border-amber-400/60 flex items-center justify-center bg-transparent">
                      <feature.icon className="w-6 h-6 text-amber-400" />
                    </div>
                    
                    {/* Text Content */}
                    <div className="pt-1">
                      <h4 className="text-lg font-semibold text-white mb-1.5">{feature.title}</h4>
                      <p className="text-white/65 text-sm leading-relaxed">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProblemSolution;
