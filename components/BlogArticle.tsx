import React from 'react';
import WhatsAppFloat from './WhatsAppFloat';

const BlogArticle: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-50 px-6 py-3 md:py-4 glass-header text-white transition-all duration-300">
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500/20 to-transparent"></div>
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <a href="/" className="flex items-center gap-2 md:gap-4 text-xl md:text-3xl font-serif font-bold">
            <img
              src="/logo_zondertekst_zonderachtergrond.png"
              alt="Webaanzee"
              width="44"
              height="44"
              decoding="async"
              className="w-8 h-8 md:h-11 md:w-11 object-contain"
            />
            <span>
              <span className="text-white">Web</span>
              <span className="text-gold">aan</span>
              <span className="text-white">zee</span>
            </span>
          </a>
          <nav className="flex items-center gap-4 text-sm">
            <a href="/" className="text-gray-300 hover:text-white transition-colors">← Terug naar home</a>
            <a href="tel:0494816714" className="btn-primary !px-4 !py-2 !text-sm whitespace-nowrap">
              Bel me
            </a>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <div className="relative bg-navy pt-20 pb-16 md:pt-28 md:pb-24 px-6">
        <div className="absolute inset-0 bg-gradient-to-br from-navy via-navy to-purple-900/20 pointer-events-none"></div>
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-amber-500/[0.03] rounded-full blur-[120px] pointer-events-none"></div>
        
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          {/* Breadcrumb */}
          <nav className="text-sm text-white/40 mb-8" aria-label="Breadcrumb">
            <a href="/" className="hover:text-white/60 transition-colors">Home</a>
            <span className="mx-2">›</span>
            <span className="text-white/60">Blog</span>
            <span className="mx-2">›</span>
            <span className="text-amber-400/80">Dit artikel</span>
          </nav>

          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.07] border border-white/[0.12] text-[10px] font-bold tracking-[0.2em] uppercase text-white/80 mb-6">
            <span className="w-2 h-2 rounded-full bg-amber-400" />
            <span>Webdesign &amp; SEO</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-semibold text-white leading-[1.12] tracking-[-0.02em] mb-6">
            Waarom heeft uw zaak een website nodig in 2026?
          </h1>

          <p className="text-lg md:text-xl text-white/50 max-w-2xl mx-auto leading-relaxed mb-8">
            De eerlijke waarheid: zonder website verliest u elke dag klanten aan concurrenten die wél gevonden worden op Google.
          </p>

          <div className="flex items-center justify-center gap-4 text-sm text-white/40">
            <span>Door <strong className="text-white/70">Kevin Bourguignon</strong></span>
            <span className="text-amber-400/40">•</span>
            <time dateTime="2026-02-22">22 februari 2026</time>
            <span className="text-amber-400/40">•</span>
            <span>8 min leestijd</span>
          </div>
        </div>
      </div>

      {/* Article Content */}
      <article className="relative px-6 py-16 md:py-24">
        <div className="max-w-3xl mx-auto">
          <div className="prose prose-lg prose-slate max-w-none 
            [&>h2]:text-3xl [&>h2]:md:text-4xl [&>h2]:font-serif [&>h2]:font-semibold [&>h2]:text-slate-900 [&>h2]:mt-16 [&>h2]:mb-6 [&>h2]:leading-tight [&>h2]:tracking-[-0.02em]
            [&>h3]:text-xl [&>h3]:md:text-2xl [&>h3]:font-serif [&>h3]:font-semibold [&>h3]:text-slate-900 [&>h3]:mt-12 [&>h3]:mb-4
            [&>p]:text-slate-600 [&>p]:leading-relaxed [&>p]:mb-6 [&>p]:text-base [&>p]:md:text-lg
            [&>ul]:space-y-3 [&>ul]:my-6 [&>ul>li]:text-slate-600 [&>ul>li]:leading-relaxed
            [&>ol]:space-y-3 [&>ol]:my-6 [&>ol>li]:text-slate-600 [&>ol>li]:leading-relaxed
            [&>blockquote]:border-l-4 [&>blockquote]:border-amber-400 [&>blockquote]:bg-amber-50/50 [&>blockquote]:rounded-r-xl [&>blockquote]:px-6 [&>blockquote]:py-4 [&>blockquote]:my-8 [&>blockquote]:italic [&>blockquote]:text-slate-700
          ">
            
            {/* Intro */}
            <p className="text-xl md:text-2xl text-slate-800 font-medium leading-relaxed !mb-8">
              Stel: iemand in Brugge zoekt op Google naar "beste bakker in de buurt" of "loodgieter Blankenberge". 
              Komt uw zaak dan tevoorschijn? Of vindt die potentiële klant uw concurrent — die wél een website heeft?
            </p>

            <p>
              Dit is geen hypothetisch scenario. Dit gebeurt tientallen keren per dag, in elke gemeente in België. 
              En als u er niet bij staat, verliest u klanten zonder het te beseffen. In dit artikel leg ik uit 
              waarom een professionele website in 2026 geen luxe meer is, maar pure noodzaak — ongeacht de grootte van uw zaak.
            </p>

            {/* Section 1 */}
            <h2>1. Uw klanten zoeken online — zelfs als u offline werkt</h2>

            <p>
              "Maar Kevin, mijn klanten kennen mij." Dat hoor ik vaak. En het klopt: uw vaste klanten kennen u. 
              Maar wat met <strong>nieuwe klanten</strong>? Mensen die net verhuisd zijn? Toeristen aan de kust? 
              Iemand die voor het eerst een dienst nodig heeft?
            </p>

            <p>
              De cijfers liegen niet:
            </p>

            <ul>
              <li className="flex items-start gap-3">
                <span className="text-amber-500 font-bold mt-0.5">→</span>
                <span><strong>97% van de consumenten</strong> zoekt online naar lokale bedrijven (bron: BrightLocal, 2025)</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-amber-500 font-bold mt-0.5">→</span>
                <span><strong>46% van alle Google-zoekopdrachten</strong> is lokaal gericht — "restaurant in de buurt", "kapper Brugge"</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-amber-500 font-bold mt-0.5">→</span>
                <span><strong>76% van de mensen</strong> die op hun smartphone naar iets in de buurt zoeken, bezoekt binnen 24 uur een zaak</span>
              </li>
            </ul>

            <p>
              Zonder website mist u al die mensen. Niet omdat uw product niet goed is, maar simpelweg 
              omdat ze u <strong>niet kunnen vinden</strong>.
            </p>

            {/* Section 2 */}
            <h2>2. "Ik heb toch een Facebook-pagina?"</h2>

            <p>
              Dat hoor ik ook regelmatig. En ja, een Facebook-pagina is beter dan niets. Maar het is géén vervanging 
              voor een website. Dit is waarom:
            </p>

            <ul>
              <li className="flex items-start gap-3">
                <span className="text-red-400 font-bold mt-0.5">✗</span>
                <span><strong>Facebook bepaalt wie uw berichten ziet.</strong> Slechts 2-5% van uw volgers ziet uw posts. Wilt u meer bereik? Dan moet u betalen voor advertenties.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-400 font-bold mt-0.5">✗</span>
                <span><strong>Google toont websites, geen Facebook-pagina's.</strong> Wanneer iemand "bakker Brugge" Googelt, verschijnen er websites — geen social media-pagina's.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-400 font-bold mt-0.5">✗</span>
                <span><strong>U bent uw pagina niet.</strong> Facebook kan morgen uw account beperken, uw bereik halveren of hun regels veranderen. Uw website is van ú.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-400 font-bold mt-0.5">✗</span>
                <span><strong>Geen professionele uitstraling.</strong> Een klant die kiest tussen twee bedrijven — één met een professionele site, één met alleen een Facebook — kiest bijna altijd het bedrijf met de website.</span>
              </li>
            </ul>

            <blockquote>
              <p className="!text-slate-700">
                "Uw Facebook-pagina is een gehuurde ruimte. Uw website is uw eigen pand. 
                Bouw op grond dat van u is."
              </p>
            </blockquote>

            {/* Section 3 */}
            <h2>3. Wat kost het u om GEEN website te hebben?</h2>

            <p>
              Laten we even rekenen. Stel dat u een restaurant, kapper, of kleine zaak runt in Brugge of aan de kust:
            </p>

            <div className="bg-slate-50 rounded-2xl p-6 md:p-8 my-8 border border-slate-100">
              <p className="text-sm font-bold uppercase tracking-wider text-amber-600 mb-4">Rekenvoorbeeld</p>
              <ul className="space-y-3 text-slate-700">
                <li className="flex items-start gap-3">
                  <span className="text-amber-500 font-bold">•</span>
                  <span>Stel: 10 mensen per dag zoeken uw type dienst in uw regio</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-amber-500 font-bold">•</span>
                  <span>Zonder website vindt 0 van hen u via Google</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-amber-500 font-bold">•</span>
                  <span>Met een goede website vindt minimaal 2-3 per dag u wél</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-amber-500 font-bold">•</span>
                  <span>Als 1 op 5 effectief klant wordt: dat is <strong>minstens 15 nieuwe klanten per maand</strong></span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-amber-500 font-bold">•</span>
                  <span>Bij een gemiddelde besteding van €30-50: dat is <strong>€450-750 extra omzet per maand</strong></span>
                </li>
              </ul>
              <p className="mt-4 text-slate-900 font-semibold">
                Een website van €450 verdient zichzelf in de eerste maand al terug.
              </p>
            </div>

            <p>
              Dit is geen theorie. Bij mijn klant <a href="https://www.vishandelolivierenkelly.be" target="_blank" rel="noreferrer" className="text-amber-600 font-semibold hover:text-amber-700 underline underline-offset-2 decoration-amber-300 transition-colors">Vishandel Olivier & Kelly</a> in 
              Blankenberge zagen we precies dit effect: van 0 Google-bezoekers naar <strong>4.510 impressies per maand</strong>. 
              Nieuwe gezichten in de winkel, elke week. Puur door een snelle, geoptimaliseerde website.
            </p>

            {/* Section 4 */}
            <h2>4. "Maar een website is toch duur?"</h2>

            <p>
              Dat <em>was</em> zo. Tien jaar geleden betaalde u duizenden euro's voor een eenvoudige bedrijfssite.
              Vandaag hoeft dat niet meer. Bij Webaanzee start een professionele, snelle website vanaf <strong>€450 eenmalig</strong>.
            </p>

            <p>Wat krijgt u daarvoor?</p>

            <ul>
              <li className="flex items-start gap-3">
                <span className="text-emerald-500 font-bold mt-0.5">✓</span>
                <span>Een razendsnelle website met een <strong>100/100 Google-score</strong></span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-500 font-bold mt-0.5">✓</span>
                <span>Mobiel-vriendelijk design (70%+ van uw bezoekers zit op smartphone)</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-500 font-bold mt-0.5">✓</span>
                <span><strong>SEO-fundament</strong> zodat Google u kan vinden en hoog plaatst</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-500 font-bold mt-0.5">✓</span>
                <span>Uw eigen domeinnaam (uwzaak.be)</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-500 font-bold mt-0.5">✓</span>
                <span>Professionele teksten en opmaak — u hoeft niets te doen</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-500 font-bold mt-0.5">✓</span>
                <span>Binnen <strong>7 dagen live</strong></span>
              </li>
            </ul>

            <p>
              Vergelijk dat eens met de €450-750 extra maandelijkse omzet uit het rekenvoorbeeld hierboven. 
              Een website is geen kost — het is een <strong>investering die zichzelf terugverdient</strong>.
            </p>

            {/* Section 5 */}
            <h2>5. Wat maakt een goede website uit in 2026?</h2>

            <p>
              Niet elke website is gelijk. Een trage, verouderde website kan u zelfs schaden. 
              Dit zijn de vijf dingen die er écht toe doen:
            </p>

            <h3>⚡ Snelheid</h3>
            <p>
              Uw website moet binnen 1-2 seconden laden. Elke seconde vertraging kost u 7% conversie.
              Google straft trage websites af met lagere posities. De websites die ik bouw scoren een <strong>100/100 bij Google PageSpeed</strong> — dat is de absolute top.
            </p>

            <h3>📱 Mobiel-eerst</h3>
            <p>
              Meer dan 70% van uw bezoekers zit op een smartphone. Uw website móet er perfect uitzien 
              én werken op een klein scherm. Knoppen moeten groot genoeg zijn, tekst leesbaar, en bellen 
              moet met één tik kunnen.
            </p>

            <h3>🔍 Vindbaar op Google (SEO)</h3>
            <p>
              Een mooie website die niemand vindt, is als een reclamebord in de woestijn. 
              Technische SEO — de juiste structuur, meta-tags, snelheid, en lokale optimalisatie — 
              is wat ervoor zorgt dat Google uw site hoog plaatst. Dit hoort standaard in elke website die ik lever.
            </p>

            <h3>🤝 Vertrouwen uitstralen</h3>
            <p>
              Binnen 0,05 seconden vormt een bezoeker een mening over uw site. Professioneel design, 
              échte foto's, duidelijke contactgegevens en een SSL-certificaat (het groene slotje) — 
              dat is wat bezoekers overtuigt om te bellen, te mailen of langs te komen.
            </p>

            <h3>📍 Lokaal gericht</h3>
            <p>
              Als u in Brugge zit, moet uw website schreeuwen dat u in Brugge zit. Google Bedrijfsprofiel, 
              lokale zoekwoorden, correcte adresgegevens — dit alles zorgt ervoor dat u gevonden wordt 
              door mensen <strong>in uw buurt</strong>, niet aan de andere kant van het land.
            </p>

            {/* Section 6 */}
            <h2>6. Nog steeds niet zeker? Doe de test</h2>

            <p>
              Beantwoord deze vijf vragen eerlijk:
            </p>

            <ol>
              <li className="flex items-start gap-3">
                <span className="text-amber-500 font-bold">1.</span>
                <span>Als iemand uw zaaknaam Googelt, vindt hij dan een professionele website?</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-amber-500 font-bold">2.</span>
                <span>Kunnen potentiële klanten u in 2 klikken bellen of een bericht sturen?</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-amber-500 font-bold">3.</span>
                <span>Ziet uw online aanwezigheid er professioneler uit dan die van uw directe concurrent?</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-amber-500 font-bold">4.</span>
                <span>Laadt uw huidige site in minder dan 3 seconden op een smartphone?</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-amber-500 font-bold">5.</span>
                <span>Krijgt u regelmatig nieuwe klanten via Google?</span>
              </li>
            </ol>

            <p>
              Als u op meer dan twee vragen "nee" antwoordde, laat u waarschijnlijk geld liggen. 
              Het goede nieuws? <strong>Dat is makkelijk op te lossen.</strong>
            </p>
          </div>

          {/* CTA Section */}
          <div className="mt-16 bg-gradient-to-br from-slate-900 to-navy rounded-3xl p-8 md:p-12 text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-amber-400/60 to-transparent"></div>
            <div className="absolute top-1/4 left-1/4 w-[300px] h-[300px] bg-amber-500/[0.04] rounded-full blur-[80px] pointer-events-none"></div>
            
            <div className="relative z-10">
              <span className="inline-block text-[11px] font-bold uppercase tracking-[0.2em] text-amber-400 mb-4">Gratis & vrijblijvend</span>
              <h2 className="text-3xl md:text-4xl font-serif font-semibold text-white mb-4 tracking-[-0.02em]">
                Benieuwd hoe ú ervoor staat?
              </h2>
              <p className="text-white/50 text-lg mb-8 max-w-xl mx-auto">
                Ik analyseer gratis uw Google-zichtbaarheid en vertel u eerlijk wat u kunt verbeteren. 
                Geen verplichtingen, geen verkooppraat.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="https://wa.me/32494816714?text=Hallo%20Kevin%2C%20ik%20las%20uw%20blogartikel%20en%20wil%20graag%20een%20gratis%20SEO-analyse."
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl font-bold text-lg text-white bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 shadow-lg shadow-emerald-500/25 transition-all duration-300 hover:-translate-y-0.5"
                >
                  <svg viewBox="0 0 24 24" width={20} height={20} fill="white">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  Gratis SEO-analyse aanvragen
                </a>
                <a
                  href="tel:0494816714"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold text-lg text-white border border-white/20 hover:bg-white/10 transition-all duration-300"
                >
                  📞 Bel 0494 81 67 14
                </a>
              </div>
            </div>
          </div>

          {/* Author box */}
          <div className="mt-12 bg-slate-50 rounded-2xl p-6 md:p-8 flex flex-col sm:flex-row gap-6 items-center border border-slate-100">
            <img
              src="/logo_zondertekst_zonderachtergrond.png"
              alt="Kevin Bourguignon"
              width="80"
              height="80"
              className="w-20 h-20 rounded-full object-contain bg-white p-2 border border-slate-200 shadow-sm"
            />
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-amber-600 mb-1">Over de auteur</p>
              <p className="font-serif font-bold text-slate-900 text-lg">Kevin Bourguignon</p>
              <p className="text-slate-500 text-sm leading-relaxed mt-1">
                Webdesigner aan de Belgische kust. Ik help lokale ondernemers in Brugge, Blankenberge, 
                en de hele kuststreek om meer klanten te bereiken via Google. Geen bandwerk — persoonlijke service.
              </p>
              <a href="/" className="text-amber-600 text-sm font-semibold hover:text-amber-700 transition-colors mt-2 inline-block">
                Meer over Webaanzee →
              </a>
            </div>
          </div>
        </div>
      </article>

      {/* Simple footer */}
      <footer className="bg-navy py-12 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <a href="/" className="text-2xl font-serif font-bold text-white">
            Web<span className="text-amber-500">aanzee</span>.be
          </a>
          <p className="text-slate-400 text-sm mt-4">
            © {new Date().getFullYear()} Webaanzee.be — Webdesigner Brugge & Belgische Kust
          </p>
          <div className="flex justify-center gap-6 mt-4">
            <a href="/" className="text-slate-400 hover:text-white text-sm transition-colors">Home</a>
            <a href="/privacy.html" className="text-slate-400 hover:text-white text-sm transition-colors">Privacy</a>
          </div>
        </div>
      </footer>

      <WhatsAppFloat />
    </div>
  );
};

export default BlogArticle;
