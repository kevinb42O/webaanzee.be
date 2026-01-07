
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { IconQuote } from './Icons';

const data = [
  { name: 'Week 1', views: 420 },
  { name: 'Week 2', views: 980 },
  { name: 'Week 3', views: 2100 },
];

const Proof: React.FC = () => {
  return (
    <section className="py-20 px-6 bg-slate-50 border-y border-slate-200">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-3xl md:text-5xl font-serif text-navy">Wat er gebeurt na de launch.</h2>
          <p className="text-sm md:text-base text-navy/60 max-w-2xl mx-auto">Nieuwe site live? Dan zien meer mensen je in Google en klikken ze sneller door naar jouw zaak.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 text-sm text-navy/70 font-semibold">
            <span className="bg-white/60 px-3 py-1 rounded-full border border-slate-200">Zichtbaarheid in Google</span>
            <span className="bg-white/60 px-3 py-1 rounded-full border border-slate-200">Effectieve clicks naar uw website</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden grid lg:grid-cols-5 gap-0">
          <div className="lg:col-span-3 p-8 md:p-12">
            <div className="flex items-center space-x-4 mb-6">
              <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-bold flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
                LIVE CASE
              </div>
              <h3 className="text-2xl font-bold text-navy">Vishandel Olivier & Kelly (Blankenberge)</h3>
            </div>
            
            <div className="w-full mb-8">
              <ResponsiveContainer width="100%" height={300} minWidth={0} minHeight={0}>
                <BarChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} />
                  <YAxis hide />
                  <Tooltip 
                    cursor={{fill: '#f8fafc'}}
                    contentStyle={{borderRadius: '10px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}}
                  />
                  <Bar dataKey="views" radius={[5, 5, 0, 0]}>
                    {data.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={index === 2 ? '#d4af37' : '#0f172a'} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
              <p className="text-center text-xs text-navy/40 mt-2 italic font-medium tracking-wide">Cijfers uit Google Search Console (laatste 28 dagen).</p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
              <div className="p-4 bg-slate-50 rounded-lg">
                <p className="text-sm text-navy/60">Zichtbaar in Google (28d)</p>
                <p className="text-2xl font-bold text-navy">2.1K</p>
              </div>
              <div className="p-4 bg-slate-50 rounded-lg">
                <p className="text-sm text-navy/60">Bezoekers die doorklikten (28d)</p>
                <p className="text-2xl font-bold text-navy">160</p>
              </div>
              <div className="p-4 bg-slate-50 rounded-lg col-span-2 sm:col-span-1">
                <p className="text-sm text-navy/60">Bron</p>
                <p className="text-2xl font-bold text-gold">Google Search Console</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 bg-navy p-8 md:p-12 text-white flex flex-col justify-center">
            <blockquote className="space-y-6">
              <div className="text-gold">
                <IconQuote className="text-gold opacity-70" />
              </div>
              <p className="text-xl italic font-light leading-relaxed">
                "We wisten dat we een website nodig hadden, maar zagen op tegen alle technische rompslomp. Kevin nam alles uit handen: de teksten en de technische opstart waardoor we nu veel gemakkelijker worden gevonden op Google. We zien nu wekelijks nieuwe gezichten in de winkel die ons via Google hebben gevonden. Dit systeem werkt."
              </p>
              <footer className="pt-6 border-t border-white/10">
                <p className="font-bold text-gold">Olivier & Kelly</p>
                <p className="text-white/60 text-sm">Eigenaren Vishandel</p>
              </footer>
            </blockquote>
          </div>
        </div>


      </div>
    </section>
  );
};

export default Proof;
