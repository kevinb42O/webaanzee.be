
import React from 'react';
import { IconTimesCircle, IconCamera, IconPencil, IconMobile, IconCheck } from './Icons';

const ProblemSolution: React.FC = () => {
  return (
    <section className="py-24 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-serif text-navy">
              Wordt u al gevonden door nieuwe klanten?
            </h2>
            <div className="h-1 w-20 bg-gold"></div>
            <p className="text-xl text-navy/70 leading-relaxed">
              Uw klanten zoeken u op hun smartphone. Vindt Google u niet? Dan gaat de klant naar de buurman.
            </p>
            <p className="text-navy/70 leading-relaxed">
              Als lokale ondernemer aan de kust leeft u van uw reputatie. Maar in de wereld van vandaag begint die reputatie vaak online. Een verouderde site of — erger nog — geen site, kost u elke dag omzet. 
            </p>
            <ul className="space-y-4 pt-4">
              {[
                "Een website die perfect werkt op elke smartphone of tablet.",
                "U verliest geen kostbare tijd aan technisch gedoe.",
                "Ik kom persoonlijk langs en regel alles van A tot Z."
              ].map((text, idx) => (
                <li key={idx} className="flex items-start space-x-3">
                  <IconCheck className="text-gold mt-1" />
                  <span className="font-medium">{text}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-navy rounded-3xl p-8 md:p-12 text-white shadow-2xl relative overflow-hidden">
            <h3 className="text-2xl font-serif text-gold mb-8">Wat ik voor u regel:</h3>
            
            <div className="space-y-10">
              <div className="flex items-start space-x-6">
                <div className="bg-gold/20 p-4 rounded-xl border border-gold/30">
                  <IconCamera className="text-[#eab308]" />
                </div>
                <div>
                  <h4 className="text-lg font-bold mb-1">Sterk Beeldmateriaal</h4>
                  <p className="text-white/70 text-sm">Heeft u al foto’s? Perfect. Nog geen? Geen probleem. Ik selecteer professionele beelden die perfect bij uw huisstijl passen.</p>
                </div>
              </div>

              <div className="flex items-start space-x-6">
                <div className="bg-gold/20 p-4 rounded-xl border border-gold/30">
                  <IconPencil className="text-[#eab308]" />
                </div>
                <div>
                  <h4 className="text-lg font-bold mb-1">Teksten die overtuigen</h4>
                  <p className="text-white/70 text-sm">Geen moeilijke marketingtaal. Gewoon duidelijke Vlaamse tekst die aanzet tot contact.</p>
                </div>
              </div>

              <div className="flex items-start space-x-6">
                <div className="bg-gold/20 p-4 rounded-xl border border-gold/30">
                  <IconMobile className="text-[#eab308]" />
                </div>
                <div>
                  <h4 className="text-lg font-bold mb-1">Alles geregeld, zonder gedoe</h4>
                  <p className="text-white/70 text-sm">Domeinnaam, e-mail en website. Ik regel de techniek van A tot Z én zorg dat u beter gevonden wordt op Google.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProblemSolution;
