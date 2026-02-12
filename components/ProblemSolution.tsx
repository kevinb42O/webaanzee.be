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
      title: "Design dat verkoopt",
      description: "Geen standaard template, maar een premium ontwerp gericht op conversie. Bezoekers worden klanten."
    },
    {
      icon: IconPencil,
      title: "Technische Dominantie",
      description: "Razendsnelle laadtijden en een 100/100 score bij Google. De techniek die nodig is om de concurrentie te verslaan."
    },
    {
      icon: IconMobile,
      title: "Lokale SEO Expert",
      description: "Ik positioneer uw zaak specifiek voor uw regio. Zodat u gevonden wordt door mensen die écht in de buurt zijn."
    }
  ];

  const checklistItems = [
    "Uw website werkt perfect op elke smartphone en tablet.",
    "U hoeft geen minuut te verspillen aan technisch gedoe.",
    "Bewezen strategie die bezoekers omzet in klanten."
  ];

  return (
    <section 
      ref={sectionRef}
      className="relative py-28 md:py-36 px-6 bg-slate-50 overflow-hidden noise-overlay"
    >
      {/* Subtle dot pattern */}
      <div className="absolute inset-0 bg-dot-pattern opacity-40 pointer-events-none"></div>
      
      {/* Radial gradient accent - pushed down to avoid showing through wave */}
      <div className="absolute top-[200px] right-0 w-[600px] h-[600px] bg-amber-100/30 rounded-full blur-[150px] pointer-events-none translate-x-1/4"></div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Left Content */}
          <div className="space-y-8">
            {/* Kicker */}
            <span className="inline-block text-[11px] font-bold uppercase tracking-[0.2em] text-amber-600">Het probleem</span>
            
            {/* Main Headline */}
            <div>
              <h2 id="werkwijze-heading" className="text-4xl md:text-5xl font-serif font-semibold text-slate-900 leading-[1.12] tracking-[-0.02em] mb-6">
                Uw concurrent steelt uw klanten via <span className="inline-flex tracking-[-0.02em]"><span style={{color:'#4285F4'}}>G</span><span style={{color:'#EA4335'}}>o</span><span style={{color:'#FBBC05'}}>o</span><span style={{color:'#4285F4'}}>g</span><span style={{color:'#34A853'}}>l</span><span style={{color:'#EA4335'}}>e</span></span>.
              </h2>
            </div>
            
            {/* Body Text */}
            <p className="text-xl text-slate-700 leading-relaxed font-normal">
              Terwijl u dit leest, zoeken mensen naar uw diensten. Komen ze bij u terecht, of bij de concurrent die wél op #1 staat?
            </p>
            <p className="text-slate-500 leading-relaxed text-base md:text-lg">
              Als lokale ondernemer leeft u van uw reputatie. Maar vandaag beslist de klant op zijn smartphone, nog voor hij uw zaak binnenstapt. Een verouderde site of — erger nog — geen site, kost u elke dag omzet. Ik zorg ervoor dat u die eerste positie pakt.
            </p>
            
            {/* Checklist with Gold Checkmarks */}
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

          {/* Right Side - Premium Feature Card */}
          <div className="relative">
            {/* Floating glow behind card */}
            <div className="absolute -inset-4 bg-gradient-to-br from-amber-200/20 via-transparent to-slate-400/10 rounded-[2rem] blur-2xl pointer-events-none"></div>
            
            {/* Card with gradient top accent */}
            <div 
              className="relative rounded-3xl p-8 md:p-10 lg:p-12 text-white overflow-hidden"
              style={{
                background: 'linear-gradient(170deg, #1e293b 0%, #0f172a 60%, #0c1222 100%)',
                boxShadow: '0 25px 60px -12px rgba(15, 23, 42, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.05)'
              }}
            >
              {/* Gradient top accent line */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-amber-400/60 to-transparent" />
              
              {/* Inner glow */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] h-[200px] bg-amber-500/[0.04] rounded-full blur-[80px] pointer-events-none" />
              
              {/* Card Headline - Gold Gradient Text */}
              <h3 className="text-2xl md:text-[1.75rem] font-serif font-semibold mb-10 text-gold-gradient">
                Wat u krijgt:
              </h3>
              
              {/* Feature Items */}
              <div className="space-y-8">
                {features.map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-5 group">
                    {/* Icon Container */}
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-white/[0.06] border border-white/[0.08] flex items-center justify-center group-hover:bg-white/[0.1] group-hover:border-amber-500/20 transition-all duration-300">
                      <feature.icon className="w-5 h-5 text-amber-400" />
                    </div>
                    
                    {/* Text Content */}
                    <div className="pt-1">
                      <h4 className="text-lg font-semibold text-white mb-1.5">{feature.title}</h4>
                      <p className="text-white/50 text-sm leading-relaxed">{feature.description}</p>
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
