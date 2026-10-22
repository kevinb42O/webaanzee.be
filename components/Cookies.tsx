import React from 'react';

const Cookies: React.FC = () => (
  <section id="cookies" className="py-20 px-6 bg-white border-t border-slate-200">
    <div className="max-w-4xl mx-auto space-y-8 text-sm md:text-base text-navy/80">
      <header className="space-y-3">
        <h2 className="text-3xl md:text-4xl font-serif text-navy">Cookies en browseropslag</h2>
        <p>De website gebruikt bezoekstatistieken. De chat wordt afzonderlijk geladen wanneer je die opent.</p>
      </header>
      <div className="space-y-6">
        <div className="space-y-2">
          <h3 className="font-bold text-navy">Bezoekstatistieken</h3>
          <p>Vercel Web Analytics verzamelt bezoekstatistieken zonder analyticscookies te plaatsen. Daarmee bekijk ik onder meer welke pagina’s worden bezocht. Lees meer over de gegevensverwerking in de <a href="https://vercel.com/docs/analytics/privacy-policy" target="_blank" rel="noreferrer" className="underline">privacyuitleg van Vercel Web Analytics</a>.</p>
        </div>
        <div className="space-y-2">
          <h3 className="font-bold text-navy">Chat via Crisp</h3>
          <p>Crisp wordt pas geladen als je op de chatknop klikt. De chat kan dan cookies of browseropslag gebruiken om het gesprek te laten werken. Je kunt ook rechtstreeks mailen of bellen zonder de chat te openen.</p>
        </div>
        <div className="space-y-2">
          <h3 className="font-bold text-navy">Externe diensten</h3>
          <p>Links naar WhatsApp, PWAYMENT en de websites van projecten openen een andere dienst. Op die bestemming gelden de eigen privacy- en cookievoorwaarden. Webaanzee gebruikt op deze website geen advertentiecookies of socialmedia-trackingpixels.</p>
        </div>
        <div className="space-y-2">
          <h3 className="font-bold text-navy">Vragen over deze website?</h3>
          <p>Mail naar <a href="mailto:kevin@webaanzee.be" className="underline">kevin@webaanzee.be</a> als je meer wilt weten over de verwerking van je gegevens.</p>
        </div>
      </div>
    </div>
  </section>
);
export default Cookies;
