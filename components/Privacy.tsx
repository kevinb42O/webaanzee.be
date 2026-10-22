import React from 'react';

const Privacy: React.FC = () => (
  <section id="privacy" className="py-20 px-6 bg-slate-50 border-t border-slate-200">
    <div className="max-w-4xl mx-auto space-y-8 text-sm md:text-base text-navy/80">
      <header className="space-y-3">
        <h1 className="text-3xl md:text-4xl font-serif text-navy">Je gegevens bij Webaanzee</h1>
        <p>Hier lees je welke gegevens de website verwerkt, waarvoor ze worden gebruikt en hoe je een vraag over je gegevens kunt stellen.</p>
      </header>
      <div className="space-y-6">
        <div className="space-y-2">
          <h2 className="font-bold text-navy">Wie beheert je gegevens?</h2>
          <p>Webaanzee wordt beheerd door Kevin Bourguignon vanuit Blankenberge, België. Voor vragen over je gegevens kun je mailen naar <a href="mailto:kevin@webaanzee.be" className="underline">kevin@webaanzee.be</a>.</p>
        </div>
        <div className="space-y-2">
          <h2 className="font-bold text-navy">Als je contact opneemt</h2>
          <p>Via het contactformulier verstuur je je naam, e-mailadres, bericht en eventueel je bedrijfsnaam. Bij telefonisch contact, e-mail, WhatsApp of chat deel je de gegevens die je zelf in het gesprek geeft. Ik gebruik die informatie om je vraag te beantwoorden en een eventuele opdracht te bespreken.</p>
          <p>Het formulier verstuurt je bericht via Resend. Als het formulier niet beschikbaar is, kun je rechtstreeks mailen. De chat via Crisp wordt pas geladen nadat je de chatknop aanklikt.</p>
        </div>
        <div className="space-y-2">
          <h2 className="font-bold text-navy">Als je de website bezoekt</h2>
          <p>Vercel verzorgt de hosting en verwerkt technische verzoekgegevens om de website te leveren. De serverfunctie gebruikt tijdelijk het IP-adres bij formulieraanvragen om herhaalde inzendingen te beperken.</p>
          <p>Op de hoofdpagina gebruikt Webaanzee Vercel Web Analytics voor bezoekstatistieken, zoals bezochte pagina’s en herkomstkanalen. Formulierberichten worden niet aan deze statistieken toegevoegd. Meer over de werking lees je onder <a href="#cookies" className="underline">cookies en browseropslag</a>.</p>
        </div>
        <div className="space-y-2">
          <h2 className="font-bold text-navy">Welke diensten verwerken gegevens?</h2>
          <p>Vercel verwerkt websiteverkeer voor hosting en statistieken. Resend verwerkt formuliergegevens voor de aflevering van je bericht. Crisp verwerkt het gesprek als je de chat opent. Gebruik je WhatsApp, dan verloopt dat contact via WhatsApp. Ik verkoop of verhuur je contactgegevens niet.</p>
        </div>
        <div className="space-y-2">
          <h2 className="font-bold text-navy">Hoelang blijven je gegevens bewaard?</h2>
          <p>Correspondentie en offertes worden bewaard zolang ze nodig zijn voor je vraag, een besproken opdracht of het nakomen van afspraken. Voor gegevens die om wettelijke redenen moeten worden bijgehouden, zoals facturatiegegevens, gelden de bijbehorende bewaarplichten.</p>
          <p>Wil je weten welke correspondentie ik van je bewaar of wil je die laten verwijderen? Stuur je verzoek naar het e-mailadres hieronder.</p>
        </div>
        <div className="space-y-2">
          <h2 className="font-bold text-navy">Een verzoek over je gegevens</h2>
          <p>Je kunt vragen om inzage, een kopie, verbetering of verwijdering van je persoonsgegevens. Afhankelijk van de verwerking kun je ook om beperking of overdracht vragen, bezwaar maken of gegeven toestemming intrekken.</p>
          <p>Mail je verzoek naar <a href="mailto:kevin@webaanzee.be" className="underline">kevin@webaanzee.be</a>. Vermeld op welke gegevens of welk contact het betrekking heeft. Meer uitleg over je rechten en het indienen van een klacht vind je bij de <a href="https://www.gegevensbeschermingsautoriteit.be/burger/privacy/wat-zijn-mijn-rechten" target="_blank" rel="noreferrer" className="underline">Gegevensbeschermingsautoriteit</a>.</p>
        </div>
        <p className="text-sm border-t border-slate-200 pt-6">Bijgewerkt op 22 oktober 2026.</p>
      </div>
    </div>
  </section>
);
export default Privacy;
