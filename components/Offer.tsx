import React from 'react';
import { ArrowUpRight, Check, Plus } from 'lucide-react';
import { scrollToSection } from '../utils/scrollToSection';
import { euro, pricing } from '../data/pricing.mjs';
import styles from './Offer.module.css';

const ContactLink = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <a href="#contact" onClick={(event) => scrollToSection(event, 'contact')} className={className}>
    {children}<ArrowUpRight size={20} strokeWidth={1.6} aria-hidden="true" />
  </a>
);

const Offer: React.FC = () => (
  <section className={styles.section} id="prijzen" aria-labelledby="pricing-title">
    <div className={styles.container}>
      <header className={styles.header}>
        <h2 id="pricing-title">Goed werk.<br />Een heldere <em>prijs.</em></h2>
        <div><p>Een website is een investering in je zaak. Je mag dus weten wat je krijgt, wat het kost en wat er later nog bij komt.</p>
          <p className={styles.taxNote}>Alle prijzen zijn exclusief btw. Eenmalige bouw en doorlopende kosten staan apart.</p>
        </div>
      </header>

      <div className={styles.packages}>
        <article className={styles.website}>
          <h3>Website op maat</h3>
          <p className={styles.description}>Je zaak overtuigend online. Voor wie vooral wil informeren, vertrouwen opbouwen en aanvragen ontvangen.</p>
          <div className={styles.price}><span>vanaf</span><strong>{euro(pricing.website.price)}</strong><span>eenmalig · excl. btw</span></div>
          <p className={styles.scope}>Een heldere basis, volledig voor jouw zaak ontworpen.</p>
          <ul className={styles.features}>
            <li><Check aria-hidden="true" />Tot 5 pagina’s, in één taal</li>
            <li><Check aria-hidden="true" />Ontwerp op maat, voor mobiel en desktop</li>
            <li><Check aria-hidden="true" />Contactformulier en basis voor vindbaarheid</li>
            <li><Check aria-hidden="true" />2 gebundelde feedbackrondes en livegang</li>
          </ul>
          <p className={styles.limit}>Zonder CMS. Inhoud laten aanpassen kan achteraf aan {euro(pricing.hourly)}/uur.</p>
          <ContactLink className={styles.action}>Bespreek mijn website</ContactLink>
          <p className={styles.recurring}>Hosting & technisch beheer via Webaanzee: vanaf <strong>{euro(pricing.website.monthly)}/maand</strong></p>
        </article>

        <article className={styles.cms}>
          <div className={styles.cmsHeading}><h3>Website + CMS</h3><span>Zelf beheren</span></div>
          <p className={styles.description}>Een complete website met een eigen dashboard. Pas zelf je teksten, foto’s en aanbod aan, wanneer het jou past.</p>
          <div className={styles.price}><span>vanaf</span><strong>{euro(pricing.cms.price)}</strong><span>eenmalig · excl. btw</span></div>
          <p className={styles.scope}>Website én dashboard inbegrepen in deze prijs.</p>
          <ul className={styles.features}>
            <li><Check aria-hidden="true" />Alles van Website op maat, tot 8 pagina’s</li>
            <li><Check aria-hidden="true" />Eigen CMS met beveiligde login</li>
            <li><Check aria-hidden="true" />Teksten, foto’s en één inhoudstype beheren</li>
            <li><Check aria-hidden="true" />Persoonlijke uitleg om zelf aan de slag te gaan</li>
          </ul>
          <p className={styles.limit}>Eén inhoudstype, zoals nieuws, projecten of je aanbod. Klantportalen en bedrijfsprocessen vallen onder maatwerk.</p>
          <ContactLink className={styles.action}>Bespreek mijn website met CMS</ContactLink>
          <p className={styles.recurring}>Hosting & technisch beheer via Webaanzee: vanaf <strong>{euro(pricing.cms.monthly)}/maand</strong></p>
        </article>
      </div>

      <div className={styles.advanced}>
        <div className={styles.advancedIntro}><h3>Mag het meer doen?</h3><p>Verkopen of je werk vereenvoudigen vraagt een andere aanpak. Ook daar hoort een eerlijk startbudget bij.</p></div>
        <article className={styles.advancedRow}>
          <div><h4>Webshop</h4><p>Een website met productbeheer, winkelmand en online betalen. Inclusief inrichting van één betaalprovider, verzending en de eerste 20 producten op basis van jouw aangeleverde inhoud.</p><p className={styles.small}>Hosting & technisch beheer vanaf {euro(pricing.webshop.monthly)}/maand. Transactiekosten en betaalde licenties apart.</p></div>
          <div className={styles.advancedDecision}><span>vanaf <strong>{euro(pricing.webshop.price)}</strong><small>eenmalig · excl. btw</small></span><ContactLink className={styles.textAction}>Bespreek mijn webshop</ContactLink></div>
        </article>
        <article className={styles.advancedRow}>
          <div><h4>Webapplicatie & dashboard op maat</h4><p>Voor een klantportaal, intern dashboard of automatisatie. We starten met één afgebakend proces en leggen schermen, gebruikersrollen en koppelingen vooraf vast.</p><p className={styles.small}>Hosting, technisch beheer en externe diensten op offerte, volgens gebruik en complexiteit.</p></div>
          <div className={styles.advancedDecision}><span>vanaf <strong>{euro(pricing.application.price)}</strong><small>eenmalig · excl. btw</small></span><ContactLink className={styles.textAction}>Bespreek mijn toepassing</ContactLink></div>
        </article>
      </div>

      <div className={styles.transparency}>
        <div className={styles.costIntro}><h3>Ook na de<br />livegang: helder.</h3><p>Een startprijs heeft alleen zin als je ook het volledige plaatje ziet.</p>
          <div className={styles.example}>
            <h4>Rekenvoorbeeld · website + CMS</h4>
            <p>Bij de startprijzen, met beheer via Webaanzee:</p>
            <dl><div><dt>Bouw website + CMS</dt><dd>{euro(pricing.cms.price)}</dd></div><div><dt>12 maanden hosting & beheer</dt><dd>{euro(pricing.cms.monthly * 12)}</dd></div><div className={styles.total}><dt>Eerste jaar vanaf</dt><dd>{euro(pricing.cms.price + pricing.cms.monthly * 12)}</dd></div></dl>
            <p>Excl. btw, domeinnaam en eventuele externe licenties. Daarna vanaf {euro(pricing.cms.monthly * 12)}/jaar voor hosting & beheer, bij gelijkblijvende scope en tarieven.</p>
          </div>
        </div>
        <div className={styles.conditions}>
          <details open><summary>Wat betekent ‘vanaf’ precies?<Plus aria-hidden="true" /></summary><p>De prijs geldt voor de hierboven beschreven basis. De inhoud lever je aan. Extra pagina’s, talen, inhoudstypes, functies of een migratie veranderen de omvang. Voor de start krijg je één offerte met de exacte prijs, feedbackrondes en planning. Extra werk voeren we pas uit nadat je de meerprijs hebt goedgekeurd.</p></details>
          <details open><summary>Wat omvat hosting & technisch beheer?<Plus aria-hidden="true" /></summary><p>De online infrastructuur, SSL, technische updates en back-ups. De maandbedragen zijn starttarieven voor beheer via Webaanzee; je offerte vermeldt capaciteit, back-upafspraken, facturatie en opzegvoorwaarden. Nieuwe inhoud, nieuwe functies en externe licenties vallen hier niet onder. Eigen hosting bespreken we vooraf.</p></details>
          <details open><summary>Welke kosten kunnen er nog bij komen?<Plus aria-hidden="true" /></summary><p>Een domeinnaam, zakelijke e-mail, betaalde CMS- of softwarelicenties en verbruik van externe diensten. Bij een webshop ook kosten van de betaalprovider per transactie. Tekstschrijven, fotografie, vertalingen en migraties worden apart begroot wanneer je die nodig hebt. Alle voorziene kosten staan in je offerte.</p></details>
          <details><summary>En wijzigingen of uitbreidingen achteraf?<Plus aria-hidden="true" /></summary><p>Inhoudelijke wijzigingen en klein aanvullend werk kosten {euro(pricing.hourly)}/uur excl. btw, met een raming vooraf. Grotere uitbreidingen krijgen een aparte offerte. Met een CMS beheer je de afgesproken inhoud zelf, zonder daarvoor telkens ontwikkeltijd te betalen.</p></details>
        </div>
      </div>

      <div className={styles.reassurance}><div><h3>Wat past bij jouw zaak?</h3><p>Vertel wat je wilt bereiken. Je krijgt een voorstel met de juiste omvang én de volledige kosten.</p></div><ContactLink className={styles.finalAction}>Plan een vrijblijvend gesprek</ContactLink></div>
    </div>
  </section>
);

export default Offer;
