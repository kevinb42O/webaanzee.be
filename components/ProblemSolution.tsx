
import React from 'react';
import { IconTimesCircle, IconCamera, IconPencil, IconMobile } from './Icons';

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
            <p className="text-xl text-navy/80 leading-relaxed italic">
              "Uw klanten zoeken u op hun smartphone. Vindt Google u niet? Dan gaat de klant naar de buurman."
            </p>
            <p className="text-navy/70 leading-relaxed">
              Als lokale ondernemer aan de kust leeft u van uw reputatie. Maar in de wereld van vandaag begint die reputatie vaak online. Een verouderde site of — erger nog — geen site, kost u elke dag omzet. 
            </p>
            <ul className="space-y-4 pt-4">
              {[
                "Uw website werkt vaak niet goed op een iPhone of tablet.",
                "U heeft geen tijd voor technisch gedoe en code.",
                "U wilt iemand die gewoon langskomt en het regelt. Snel en zonder gedoe."
              ].map((text, idx) => (
                <li key={idx} className="flex items-start space-x-3">
                  <IconTimesCircle className="text-red-500 mt-1" />
                  <span className="font-medium">{text}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-navy rounded-3xl p-8 md:p-12 text-white shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gold/10 rounded-full -mr-16 -mt-16"></div>
            
            <h3 className="text-2xl font-serif text-gold mb-8">Wat ik voor u regel:</h3>
            
            <div className="space-y-10">
              <div className="flex items-start space-x-6">
                <div className="bg-gold/20 p-4 rounded-xl">
                  <IconCamera className="text-gold" />
                </div>
                <div>
                  <h4 className="text-lg font-bold mb-1">Beeldmateriaal (optioneel)</h4>
                  <p className="text-white/70 text-sm">Heeft u al foto’s? Perfect. Nog geen? We starten met wat er is en upgraden kan eventueel later.</p>
                </div>
              </div>

              <div className="flex items-start space-x-6">
                <div className="bg-gold/20 p-4 rounded-xl">
                  <IconPencil className="text-gold" />
                </div>
                <div>
                  <h4 className="text-lg font-bold mb-1">Tekst die klanten begrijpen</h4>
                  <p className="text-white/70 text-sm">Geen moeilijke marketingtaal. Gewoon duidelijke Vlaamse tekst die aanzet tot contact.</p>
                </div>
              </div>

              <div className="flex items-start space-x-6">
                <div className="bg-gold/20 p-4 rounded-xl">
                  <IconMobile className="text-gold" />
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
