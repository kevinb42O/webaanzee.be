import React from 'react';

const Privacy: React.FC = () => {
  return (
    <section id="privacy" className="py-20 px-6 bg-slate-50 border-t border-slate-200">
      <div className="max-w-4xl mx-auto space-y-8 text-sm md:text-base text-navy/80">
        <header className="space-y-3">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-gold">Privacy</p>
          <h2 className="text-3xl md:text-4xl font-serif text-navy">Zo ga ik om met uw gegevens.</h2>
          <p className="text-navy/70">
            Ik ben geen groot marketingbureau. Ik werk alleen en ga dus zuinig en respectvol om met uw gegevens.
            Hieronder leg ik in gewone taal uit wat ik met uw informatie doe.
          </p>
        </header>

        <div className="space-y-6">
          <div className="space-y-2">
            <h3 className="font-bold text-navy">Wie is verantwoordelijke?</h3>
            <p>
              <span className="font-bold">
                <span className="text-navy">Web</span>
                <span className="text-gold">aan</span>
                <span className="text-navy">zee</span>
              </span>{' '}
              is een eenmanszaak van Kevin Bourguignon, gevestigd in Blankenberge (België).
              U kan mij bereiken via <a href="mailto:kevin@webaanzee.be" className="underline decoration-gold underline-offset-2">kevin@webaanzee.be</a>.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="font-bold text-navy">Welke gegevens verwerk ik?</h3>
            <p>Alleen wat u zelf aan mij doorgeeft, bijvoorbeeld wanneer u contact opneemt:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>Uw naam en contactgegevens (e-mail, telefoonnummer).</li>
              <li>Informatie over uw zaak die u vrijwillig deelt.</li>
            </ul>
            <p>
              Er is geen verborgen profielering, geen aankoopgeschiedenis en geen marketingdatabase. Ik gebruik uw gegevens
              enkel om u te woord te staan en eventuele samenwerking op te starten.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="font-bold text-navy">Hoe neem ik contact met u op?</h3>
            <p>
              De contactknoppen op deze site openen gewoon uw eigen mailprogramma of WhatsApp. Uw bericht komt dus rechtstreeks
              bij mij terecht en wordt niet via een externe tool opgeslagen.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="font-bold text-navy">Worden uw gegevens gedeeld met derden?</h3>
            <p>
              Nee, ik verkoop of verhuur uw gegevens niet aan anderen. Enkel als de wet dat verplicht (bijvoorbeeld bij een
              gerechtelijk onderzoek) kan het zijn dat ik gegevens moet doorgeven aan een officiële instantie.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="font-bold text-navy">Hoelang bewaar ik uw gegevens?</h3>
            <p>
              E-mails en offertes bewaar ik zolang dat nodig is om u goed te kunnen helpen en om afspraken na te komen.
              U mag mij altijd vragen om vroegere communicatie te verwijderen, tenzij ik die om wettelijke redenen langer
              moet bijhouden (bijvoorbeeld facturatiegegevens).
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="font-bold text-navy">Uw rechten</h3>
            <p>U heeft volgens de GDPR onder meer recht op:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>inzage in welke gegevens ik over u heb;</li>
              <li>verbetering of verwijdering van foutieve of overbodige gegevens;</li>
              <li>bezwaar tegen het verdere gebruik van uw gegevens.</li>
            </ul>
            <p>
              Wilt u één van deze rechten uitoefenen? Stuur dan een korte mail naar
              {' '}<a href="mailto:kevin@webaanzee.be" className="underline decoration-gold underline-offset-2">kevin@webaanzee.be</a> en ik regel het.
            </p>
          </div>

          <p className="text-xs text-navy/50 border-t border-slate-200 pt-6">
            Deze uitleg is bedoeld om duidelijkheid te geven in gewone taal en vervangt geen individueel juridisch advies.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Privacy;
