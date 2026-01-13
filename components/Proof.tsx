
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, LabelList } from 'recharts';
import { IconQuote, IconTrendUp } from './Icons';

// Case study data with enhanced metrics
const caseStudies = [
  {
    id: 'vishandel',
    title: 'vishandelolivierenkelly.be',
    website: 'https://vishandelolivierenkelly.be',
    location: 'Blankenberge',
    type: 'Nieuwe website',
    icon: '🐟',
    accentColor: '#0ea5e9',
    chartData: [
      { name: 'Oude site', views: 420, period: 'Dec 2024' },
      { name: 'Bouw', views: 980, period: 'Jan 2025' },
      { name: 'Na launch', views: 2100, highlight: '+400%', period: 'Feb 2025' },
    ],
    stats: {
      impressions: 2100,
      clicks: 160,
      ctr: '7.6%',
      avgPosition: '4.2',
    },
    quote: "We wisten dat we een website nodig hadden, maar zagen op tegen alle technische rompslomp. Kevin nam alles uit handen: de teksten en de technische opstart waardoor we nu veel gemakkelijker worden gevonden op Google. We zien nu wekelijks nieuwe gezichten in de winkel die ons via Google hebben gevonden. Dit systeem werkt.",
    author: 'Olivier & Kelly',
    role: 'Eigenaren Vishandel',
    rating: 5,
  },
  {
    id: 'itransform',
    title: 'praktijk-itransform.be',
    website: 'https://praktijk-itransform.be',
    location: 'Brugge',
    type: 'Webadvies & SEO',
    icon: '🧘',
    accentColor: '#8b5cf6',
    chartData: [
      { name: 'Voor advies', views: 180, period: 'Okt 2025' },
      { name: 'Optimalisatie', views: 420, period: 'Nov 2025' },
      { name: 'Na webadvies', views: 890, highlight: '+394%', period: 'Dec 2025' },
    ],
    stats: {
      impressions: 890,
      clicks: 78,
      ctr: '8.8%',
      avgPosition: '6.1',
    },
    quote: "Ik had al een website, maar ik merkte dat ik online kansen liet liggen. Kevin heeft niet geprobeerd me een compleet nieuwe site aan te smeren, maar gaf concreet en eerlijk webadvies. Hij wees me precies op de punten waar ik vindbaarheid verloor. Dankzij zijn webadvies is praktijk iTransform nu veel beter vindbaar in de regio Brugge. Geen ingewikkeld technisch jargon, maar heldere taal en resultaat.",
    author: 'Praktijk iTransform',
    role: 'Therapeutische praktijk',
    rating: 5,
  },
];

const AUTOPLAY_INTERVAL = 10000;

// Animated counter hook
const useAnimatedCounter = (end: number, duration: number = 1500) => {
  const [count, setCount] = useState(0);
  const startTimeRef = useRef<number | null>(null);
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    // Reset and start animation
    setCount(0);
    startTimeRef.current = null;
    
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
    
    const animate = (timestamp: number) => {
      if (!startTimeRef.current) startTimeRef.current = timestamp;
      const progress = Math.min((timestamp - startTimeRef.current) / duration, 1);
      
      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const current = Math.floor(easeOutQuart * end);
      
      setCount(current);
      
      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      }
    };
    
    animationRef.current = requestAnimationFrame(animate);
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [end, duration]);

  return count;
};

// Format number with K suffix
const formatNumber = (num: number): string => {
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toString();
};

// Star rating component
const StarRating: React.FC<{ rating: number }> = ({ rating }) => (
  <div className="flex gap-0.5">
    {[...Array(5)].map((_, i) => (
      <svg
        key={i}
        className={`w-4 h-4 ${i < rating ? 'text-gold' : 'text-white/20'}`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ))}
  </div>
);

const Proof: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(0);

  const currentCase = caseStudies[activeIndex];

  // Animated counters for stats
  const animatedImpressions = useAnimatedCounter(currentCase.stats.impressions, 1200);
  const animatedClicks = useAnimatedCounter(currentCase.stats.clicks, 1200);

  const goToCase = useCallback((index: number) => {
    if (index === activeIndex || isAnimating) return;
    setIsAnimating(true);
    setProgress(0);
    setTimeout(() => {
      setActiveIndex(index);
      setTimeout(() => setIsAnimating(false), 100);
    }, 400);
  }, [activeIndex, isAnimating]);

  const nextCase = useCallback(() => {
    const next = (activeIndex + 1) % caseStudies.length;
    goToCase(next);
  }, [activeIndex, goToCase]);

  // Progress bar animation
  useEffect(() => {
    if (isPaused || isAnimating) {
      return;
    }

    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          nextCase();
          return 0;
        }
        return prev + (100 / (AUTOPLAY_INTERVAL / 50));
      });
    }, 50);

    return () => clearInterval(interval);
  }, [isPaused, isAnimating, nextCase]);

  // Reset progress when case changes
  useEffect(() => {
    setProgress(0);
  }, [activeIndex]);

  return (
    <section 
      ref={sectionRef}
      className="relative py-24 md:py-32 px-6 bg-gradient-to-b from-slate-50 via-white to-slate-50 overflow-hidden"
    >
      {/* Premium background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gold/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-navy/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-gold/3 to-transparent rounded-full" />
        {/* Subtle grid pattern */}
        <div 
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%230f172a' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto relative">
        {/* Premium header with animated entrance */}
        <div className="text-center mb-16 md:mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-navy/5 rounded-full mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-navy/60">Live resultaten</span>
          </div>
          
          <h2 id="resultaten-heading" className="text-4xl md:text-6xl font-serif text-navy mb-6 tracking-tight">
            Bewezen <span className="relative inline-block">
              <span className="relative z-10">resultaat</span>
              <svg className="absolute -bottom-2 left-0 w-full h-3 text-gold/30" viewBox="0 0 200 12" preserveAspectRatio="none">
                <path d="M0,6 Q50,0 100,6 T200,6" fill="none" stroke="currentColor" strokeWidth="8" strokeLinecap="round"/>
              </svg>
            </span>
          </h2>
          <p className="text-lg md:text-xl text-navy/50 max-w-2xl mx-auto leading-relaxed">
            Echte cijfers van echte klanten. Geen beloftes, maar meetbaar succes.
          </p>
          
          <div className="flex flex-wrap justify-center gap-3 mt-8">
            <span className="group flex items-center gap-2 px-5 py-2.5 bg-white rounded-full border border-slate-200 shadow-sm hover:shadow-md hover:border-gold/30 transition-all duration-300">
              <IconTrendUp className="w-4 h-4 text-gold group-hover:scale-110 transition-transform" />
              <span className="text-sm font-semibold text-navy">Meer zichtbaarheid</span>
            </span>
            <span className="group flex items-center gap-2 px-5 py-2.5 bg-white rounded-full border border-slate-200 shadow-sm hover:shadow-md hover:border-gold/30 transition-all duration-300">
              <svg className="w-4 h-4 text-gold group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              <span className="text-sm font-semibold text-navy">Meer bezoekers</span>
            </span>
            <span className="group flex items-center gap-2 px-5 py-2.5 bg-white rounded-full border border-slate-200 shadow-sm hover:shadow-md hover:border-gold/30 transition-all duration-300">
              <svg className="w-4 h-4 text-gold group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-sm font-semibold text-navy">Meer omzet</span>
            </span>
          </div>
        </div>

        {/* Premium case selector - Segmented Control */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex p-1 bg-slate-100 rounded-full">
            {caseStudies.map((caseItem, index) => (
              <button
                key={caseItem.id}
                onClick={() => goToCase(index)}
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
                className={`relative flex items-center gap-3 px-6 py-3 rounded-full transition-all duration-300 ease-out ${
                  index === activeIndex
                    ? 'bg-white text-slate-900 shadow-sm font-bold'
                    : 'bg-transparent text-slate-500 font-medium hover:text-slate-700'
                }`}
                aria-label={`Bekijk case: ${caseItem.title}`}
              >
                <span className="text-lg">{caseItem.icon}</span>
                <span className="hidden md:inline">{caseItem.title}</span>
                {index === activeIndex && (
                  <span className="absolute -top-1 -right-1 flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-gold"></span>
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Main case study card with premium styling */}
        <div 
          className="relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Glow effect behind card */}
          <div 
            className="absolute inset-0 rounded-3xl transition-all duration-700"
            style={{
              background: `radial-gradient(ellipse at center, ${currentCase.accentColor}15 0%, transparent 70%)`,
              transform: 'scale(1.02)',
            }}
          />
          
          <div className="relative bg-slate-50 rounded-3xl shadow-2xl overflow-hidden border border-slate-200">
            {/* Subtle CSS grid pattern texture overlay */}
            <div 
              className="absolute inset-0 opacity-[0.4] pointer-events-none z-0"
              style={{
                backgroundImage: `linear-gradient(to right, rgb(148 163 184 / 0.1) 1px, transparent 1px), linear-gradient(to bottom, rgb(148 163 184 / 0.1) 1px, transparent 1px)`,
                backgroundSize: '20px 20px'
              }}
            />
            {/* Progress bar at top */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-slate-100 z-20">
              <div 
                className="h-full bg-gradient-to-r from-gold to-gold/80 transition-all duration-75 ease-linear"
                style={{ width: `${progress}%` }}
              />
            </div>

            <div className="relative z-10 grid lg:grid-cols-5">
              {/* Left panel - Chart & Stats */}
              <div className="lg:col-span-3 p-8 md:p-12 lg:p-16">
                <div className={`transition-all duration-500 ${isAnimating ? 'opacity-0 scale-98 translate-y-4' : 'opacity-100 scale-100 translate-y-0'}`}>
                  {/* Header badges */}
                  <div className="flex flex-wrap items-center gap-3 mb-8">
                    <div className="relative group">
                      <div className="relative bg-amber-50 text-amber-700 px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-wider flex items-center gap-2 border border-amber-200">
                        <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-500 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
                        </span>
                        LIVE CASE
                      </div>
                    </div>
                    <div className="px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-600 border border-slate-200 hover:border-slate-300 transition-colors duration-300">
                      {currentCase.type}
                    </div>
                  </div>

                  {/* Title with icon */}
                  <div className="flex items-start gap-4 mb-10 pb-8 border-b border-slate-200">
                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shadow-lg transition-all duration-500 bg-white border border-slate-100">
                      {currentCase.icon}
                    </div>
                    <div>
                      <h3 className="text-2xl md:text-3xl font-bold text-navy">
                        <a 
                          href={currentCase.website} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="hover:text-gold transition-colors duration-300 inline-flex items-center gap-2 group"
                        >
                          {currentCase.title}
                          <svg className="w-5 h-5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                        </a>
                      </h3>
                      <p className="text-navy/40 mt-1 flex items-center gap-2">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        {currentCase.location}
                      </p>
                    </div>
                  </div>
                  
                  {/* Premium chart - Elevated Stage */}
                  <div className="relative mb-10">
                    <div className="relative bg-white rounded-xl shadow-sm border border-slate-100 p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="text-sm font-bold uppercase tracking-wider text-navy/40">Google Zichtbaarheid</h4>
                        <div className="flex items-center gap-2 text-xs text-navy/40">
                          <span className="w-3 h-3 bg-navy rounded" />
                          <span>Periode</span>
                          <span className="w-3 h-3 bg-gold rounded ml-2" />
                          <span>Groei</span>
                        </div>
                      </div>
                      <ResponsiveContainer width="100%" height={280} key={`chart-container-${currentCase.id}-${activeIndex}`}>
                        <BarChart data={currentCase.chartData} margin={{ top: 30, right: 30, left: 30, bottom: 10 }} barCategoryGap="25%">
                          <defs>
                            {/* Dark bar gradient: from-slate-800 to-slate-700 */}
                            <linearGradient id={`barGradient-${currentCase.id}`} x1="0" y1="1" x2="0" y2="0">
                              <stop offset="0%" stopColor="#1e293b" stopOpacity={1}/>
                              <stop offset="100%" stopColor="#334155" stopOpacity={1}/>
                            </linearGradient>
                            {/* Gold bar gradient: from-amber-500 to-amber-300 */}
                            <linearGradient id={`goldGradient-${currentCase.id}`} x1="0" y1="1" x2="0" y2="0">
                              <stop offset="0%" stopColor="#f59e0b" stopOpacity={1}/>
                              <stop offset="100%" stopColor="#fcd34d" stopOpacity={1}/>
                            </linearGradient>
                            <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
                              <feDropShadow dx="0" dy="4" stdDeviation="8" floodOpacity="0.15"/>
                            </filter>
                          </defs>
                          <CartesianGrid stroke="rgba(15, 23, 42, 0.06)" strokeDasharray="4 4" vertical={false} />
                          <XAxis 
                            dataKey="name" 
                            axisLine={false} 
                            tickLine={false}
                            tick={{ fontSize: 12, fill: '#64748b', fontWeight: 500 }}
                            dy={10}
                          />
                          <YAxis hide domain={[0, 'dataMax + 500']} />
                          <Tooltip 
                            cursor={{ fill: 'rgba(15, 23, 42, 0.02)', radius: 8 }}
                            contentStyle={{
                              borderRadius: '12px', 
                              border: 'none', 
                              boxShadow: '0 20px 40px -12px rgb(0 0 0 / 0.15)',
                              padding: '12px 16px',
                            }}
                            formatter={(value: number) => [`${value.toLocaleString()} weergaven`, 'Google']}
                            labelStyle={{ fontWeight: 600, marginBottom: 4 }}
                          />
                          <Bar 
                            dataKey="views" 
                            radius={[16, 16, 0, 0]} 
                            maxBarSize={60}
                            isAnimationActive={false}
                            filter="url(#shadow)"
                          >
                            {currentCase.chartData.map((entry, index) => (
                              <Cell 
                                key={`cell-${currentCase.id}-${index}`} 
                                fill={index === 2 ? `url(#goldGradient-${currentCase.id})` : `url(#barGradient-${currentCase.id})`}
                              />
                            ))}
                            <LabelList 
                              dataKey="highlight" 
                              position="top" 
                              fill="#0f172a" 
                              fontSize={13} 
                              fontWeight={700}
                              offset={16}
                              formatter={(value: string) => value ? `🚀 ${value}` : ''}
                            />
                          </Bar>
                        </BarChart>
                      </ResponsiveContainer>
                      <p className="text-center text-xs text-navy/40 mt-4 flex items-center justify-center gap-2">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                        Geverifieerde data uit Google Search Console
                      </p>
                    </div>
                  </div>

                  {/* Premium stats grid - Solid Tiles */}
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="group relative p-5 bg-white rounded-2xl border border-slate-100 shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-default">
                      <div className="absolute top-3 right-3 w-8 h-8 bg-gold/10 rounded-lg flex items-center justify-center group-hover:bg-gold/20 transition-colors">
                        <svg className="w-4 h-4 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      </div>
                      <p className="text-[10px] font-bold uppercase tracking-wider text-navy/40 mb-2">Impressies</p>
                      <p className="text-3xl md:text-4xl font-semibold text-navy tabular-nums tracking-tight">{formatNumber(animatedImpressions)}</p>
                      <p className="text-xs text-navy/40 mt-1">per 28 dagen</p>
                    </div>
                    
                    <div className="group relative p-5 bg-white rounded-2xl border border-slate-100 shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-default">
                      <div className="absolute top-3 right-3 w-8 h-8 bg-gold/10 rounded-lg flex items-center justify-center group-hover:bg-gold/20 transition-colors">
                        <svg className="w-4 h-4 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
                        </svg>
                      </div>
                      <p className="text-[10px] font-bold uppercase tracking-wider text-navy/40 mb-2">Kliks</p>
                      <p className="text-3xl md:text-4xl font-semibold text-navy tabular-nums tracking-tight">{animatedClicks}</p>
                      <p className="text-xs text-navy/40 mt-1">per 28 dagen</p>
                    </div>
                    
                    <div className="group relative p-5 bg-white rounded-2xl border border-slate-100 shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-default">
                      <div className="absolute top-3 right-3 w-8 h-8 bg-gold/10 rounded-lg flex items-center justify-center group-hover:bg-gold/20 transition-colors">
                        <svg className="w-4 h-4 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </svg>
                      </div>
                      <p className="text-[10px] font-bold uppercase tracking-wider text-navy/40 mb-2">CTR</p>
                      <p className="text-3xl md:text-4xl font-semibold text-gold tabular-nums tracking-tight">{currentCase.stats.ctr}</p>
                      <p className="text-xs text-navy/40 mt-1">click-through rate</p>
                    </div>
                    
                    <div className="group relative p-5 bg-white rounded-2xl border border-slate-100 shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-default">
                      <div className="absolute top-3 right-3 w-8 h-8 bg-gold/10 rounded-lg flex items-center justify-center group-hover:bg-gold/20 transition-colors">
                        <svg className="w-4 h-4 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                        </svg>
                      </div>
                      <p className="text-[10px] font-bold uppercase tracking-wider text-navy/40 mb-2">Gem. positie</p>
                      <p className="text-3xl md:text-4xl font-semibold text-navy tabular-nums tracking-tight">{currentCase.stats.avgPosition}</p>
                      <p className="text-xs text-navy/40 mt-1">in zoekresultaten</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right panel - Premium Testimonial */}
              <div className="lg:col-span-2 p-8 md:p-12 lg:p-16 text-white flex flex-col justify-center relative overflow-hidden" style={{ background: 'radial-gradient(ellipse at top right, #1e293b 0%, #0f172a 100%)' }}>
                {/* Subtle radial lighting effect */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-slate-700/20 rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-slate-600/10 rounded-full blur-2xl" />

                <blockquote className={`relative space-y-8 transition-all duration-500 ${isAnimating ? 'opacity-0 translate-x-8' : 'opacity-100 translate-x-0'}`}>
                  {/* Huge decorative quote mark behind text */}
                  <div className="absolute -top-8 -left-6 text-9xl text-white font-serif leading-none select-none pointer-events-none" style={{ opacity: 0.05 }}>"</div>
                  
                  {/* Star rating */}
                  <div className="relative">
                    <StarRating rating={currentCase.rating} />
                    <p className="text-xs text-white/40 mt-1">Klantbeoordeling</p>
                  </div>

                  <p className="relative text-lg md:text-xl font-light leading-relaxed text-white/90">
                    "{currentCase.quote}"
                  </p>
                  
                  <footer className="relative pt-8 border-t border-white/10">
                    <div className="flex items-center gap-4">
                      <div 
                        className="w-12 h-12 rounded-full flex items-center justify-center text-xl"
                        style={{ backgroundColor: `${currentCase.accentColor}30` }}
                      >
                        {currentCase.icon}
                      </div>
                      <div>
                        <p className="font-bold text-gold text-lg">{currentCase.author}</p>
                        <p className="text-white/50 text-sm">{currentCase.role}</p>
                      </div>
                    </div>
                  </footer>

                  {/* Verified badge */}
                  <div className="flex items-center gap-2 pt-4">
                    <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-xs text-white/50">Geverifieerde review</span>
                  </div>
                </blockquote>

                {/* Premium navigation */}
                <div className="absolute bottom-6 right-6 flex items-center gap-3">
                  <span className="text-xs text-white/30 mr-2">{activeIndex + 1}/{caseStudies.length}</span>
                  <button
                    onClick={() => goToCase((activeIndex - 1 + caseStudies.length) % caseStudies.length)}
                    className="w-11 h-11 rounded-full bg-transparent hover:bg-white border border-white/20 hover:border-white flex items-center justify-center transition-all duration-300 group"
                    aria-label="Vorige case"
                  >
                    <svg className="w-5 h-5 text-white/70 group-hover:text-slate-900 transition-all duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button
                    onClick={() => goToCase((activeIndex + 1) % caseStudies.length)}
                    className="w-11 h-11 rounded-full bg-transparent hover:bg-white border border-white/20 hover:border-white flex items-center justify-center transition-all duration-300 group"
                    aria-label="Volgende case"
                  >
                    <svg className="w-5 h-5 text-white/70 group-hover:text-slate-900 transition-all duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom trust indicators */}
        <div className="flex flex-wrap justify-center items-center gap-6 mt-12">
          <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm border border-slate-100">
            <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span className="text-sm font-medium text-navy/70">100% echte data</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm border border-slate-100">
            <svg className="w-5 h-5 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            <span className="text-sm font-medium text-navy/70">Google Search Console</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm border border-slate-100">
            <span className="text-lg">⭐</span>
            <span className="text-sm font-medium text-navy/70">5/5 klanttevredenheid</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Proof;
