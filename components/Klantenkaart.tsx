import React from 'react';
import styles from './Klantenkaart.module.css';

const Klantenkaart: React.FC = () => {
  return (
    <div className={styles.page}>
      
      {/* HERO SECTION */}
      <section className={styles.section} id="klantenkaart">
        <div className={styles.heroGrid}>
          <div className="reveal-up">
            <div className={styles.badge}>Digitale Klantenkaart</div>
            <h1 className={styles.title}>
              Maak van elke bezoeker
              <span>Een Vaste Gast.</span>
            </h1>
            <p className={styles.description}>
              Stop met raden en start met meten. Een PWA digitale portemonnee voor uw klanten. Geen gedwongen downloads, geen plastic pasjes, 100% GDPR-conform.
            </p>
            <div style={{ marginTop: '2rem' }}>
              <a href="https://wa.me/32494816714" className="btn btn-primary" target="_blank" rel="noreferrer">
                Boek Gratis Demo
              </a>
            </div>
          </div>

          <div className={`${styles.imageBlock} reveal-up parallax-bg`} style={{ animationDelay: '0.2s' }}>
            <img src="/spaarkaart.webp" alt="Digitale klantenkaart" />
          </div>
        </div>
      </section>

      {/* HOW IT WORKS (BENTO GRID) */}
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.title}>
            Drie Stappen.
            <span>Nul Frictie.</span>
          </h2>
        </div>
        
        <div className={`${styles.bentoGrid} reveal-up`}>
          <div className={styles.bentoItem}>
            <div className={styles.bentoNumber}>01</div>
            <h3 className={styles.bentoTitle}>Scannen</h3>
            <p className={styles.description}>Luxe QR-bordje op tafel. Klant scant, opent direct in browser. Geen app nodig.</p>
          </div>
          <div className={styles.bentoItem}>
            <div className={styles.bentoNumber}>02</div>
            <h3 className={styles.bentoTitle}>Login</h3>
            <p className={styles.description}>Klant logt in via e-mail. Meteen een kaart in uw huisstijl zichtbaar.</p>
          </div>
          <div className={styles.bentoItem}>
            <div className={styles.bentoNumber}>03</div>
            <h3 className={styles.bentoTitle}>Punt Erbij</h3>
            <p className={styles.description}>Uw tablet genereert unieke, veilige QR. Klant scant en spaart.</p>
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section className={styles.section}>
        <div className={`${styles.pricingBlock} reveal-up`}>
          <div className={styles.badge} style={{ color: 'var(--color-bg-primary)', borderBottomColor: 'var(--color-bg-primary)' }}>
            Transparante Prijzen
          </div>
          <h2 className={styles.title} style={{ color: 'var(--color-bg-primary)' }}>
            Eén Pakket.
            <span style={{ color: 'var(--color-accent-gold)' }}>Geen Wurgcontract.</span>
          </h2>
          
          <div className={styles.priceBig}>€495</div>
          <p style={{ marginBottom: '2rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Eenmalige setup</p>

          <ul className={styles.priceList}>
            <li>✓ Volledig op maat design (uw branding)</li>
            <li>✓ PWA - Werkt als een echte app</li>
            <li>✓ 100% Cryptografisch Fraudeproof</li>
            <li>✓ Klanten dashboard + Excel export</li>
            <li>✓ Premium QR-bordje inbegrepen</li>
            <li>✓ Persoonlijke installatie in de zaak</li>
          </ul>

          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.875rem', marginBottom: '2rem' }}>
            + €250/jaar voor hosting & updates. <strong>Eerste jaar GRATIS.</strong>
          </p>

          <a href="https://wa.me/32494816714" className="btn btn-primary" style={{ background: 'var(--color-accent-gold)', borderColor: 'var(--color-accent-gold)' }} target="_blank" rel="noreferrer">
            Vraag Klantenkaart Aan
          </a>
        </div>
      </section>

    </div>
  );
};

export default Klantenkaart;
