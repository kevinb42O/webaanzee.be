import React from 'react';

const Cookies: React.FC = () => {
  return (
    <section id="cookies" className="py-20 px-6 bg-white border-t border-slate-200">
      <div className="max-w-4xl mx-auto space-y-8 text-sm md:text-base text-navy/80">
        <header className="space-y-3">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-gold">Cookies</p>
          <h2 className="text-3xl md:text-4xl font-serif text-navy">Hoe deze website cookies gebruikt.</h2>
          <p className="text-navy/70">
            Ik hou niet van onnodige tracking en lange, onleesbare cookie-banners. Daarom gebruik ik op deze site alleen wat
            strikt nodig is om alles veilig en stabiel te laten werken.
          </p>
        </header>

        <div className="space-y-6">
          <div className="space-y-2">
            <h3 className="font-bold text-navy">Welke cookies worden momenteel geplaatst?</h3>
            <p>
              Deze website wordt gehost via GitHub Pages en draait zonder ingeschakelde advertentie- of analyseplatformen (zoals
              Google Analytics). Ik plaats zelf geen marketingcookies of social media trackingpixels.
            </p>
            <p>
              De hostingpartij kan wel technische logs bijhouden (bijvoorbeeld foutmeldingen en anonieme bezoekinformatie) om
              de dienst veilig te houden. Ik gebruik die gegevens niet om individuele bezoekers te volgen.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="font-bold text-navy">Geen cookiewall, wel gezond verstand</h3>
            <p>
              Omdat er op dit moment geen marketing- of analysecookies geplaatst worden, krijgt u geen opdringerige cookiebanner.
              Mocht dit in de toekomst veranderen, dan pas ik zowel deze tekst als de instellingen op de site aan.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="font-bold text-navy">Externe links</h3>
            <p>
              Op deze site staan links naar andere diensten, zoals Instagram of WhatsApp. Zodra u daarop klikt, valt u onder de
              privacy- en cookievoorwaarden van die platformen. Daar heb ik geen invloed op.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="font-bold text-navy">Vragen?</h3>
            <p>
              Heeft u toch vragen over cookies of privacy? Stuur gerust een mail naar
              {' '}<a href="mailto:kevin@webaanzee.be" className="underline decoration-gold underline-offset-2">kevin@webaanzee.be</a>.
              Ik antwoord in gewone taal, zonder juridisch vakjargon.
            </p>
          </div>

          <p className="text-xs text-navy/50 border-t border-slate-200 pt-6">
            Deze uitleg is informatief en bedoeld om openheid te geven over hoe deze site werkt. Voor formeel juridisch advies
            rond cookies en privacy kan u terecht bij een gespecialiseerde jurist of adviseur.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Cookies;
