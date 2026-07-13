import React, { useState } from 'react';
import { scrollToSection } from '../utils/scrollToSection';
import styles from './ContactFooter.module.css';

const ContactFooter: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <section className={styles.section} id="contact">
        <div className={`${styles.container} animate-on-scroll`}>
          <span className={`${styles.label} reveal-up`}>Contact</span>
          <h2 className={`${styles.title} reveal-up`} style={{ animationDelay: '0.1s' }}>
            Vertel me wat je nodig hebt.
          </h2>
          <p className={`${styles.description} reveal-up`} style={{ animationDelay: '0.2s' }}>
            Geen verkooppraatje, geen verplichtingen. Jij vertelt waar je naartoe wil, ik zeg je recht voor de raap wat ik zou bouwen, wat het kost en hoelang het duurt. Je krijgt altijd antwoord van mij persoonlijk — meestal dezelfde dag.
          </p>

          <div className={styles.grid}>
            <a href="tel:0494816714" className={`${styles.card} reveal-up`} style={{ animationDelay: '0.3s' }}>
              <span className={styles.cardIcon}>📱</span>
              <span className={styles.cardTitle}>Bel Direct</span>
              <span className={styles.cardSub}>0494 81 67 14</span>
            </a>
            
            <a href="https://wa.me/32494816714" target="_blank" rel="noreferrer" className={`${styles.card} reveal-up`} style={{ animationDelay: '0.4s' }}>
              <span className={styles.cardIcon}>💬</span>
              <span className={styles.cardTitle}>WhatsApp</span>
              <span className={styles.cardSub}>Snel antwoord</span>
            </a>

            <button onClick={() => setIsModalOpen(true)} className={`${styles.card} reveal-up`} style={{ width: '100%', animationDelay: '0.5s' }}>
              <span className={styles.cardIcon}>✉️</span>
              <span className={styles.cardTitle}>E-mail</span>
              <span className={styles.cardSub}>Stuur aanvraag in</span>
            </button>
          </div>
        </div>
      </section>

      <footer className={styles.footer}>
        <div className={styles.footerLogo}>webaanzee<span>.</span></div>
        
        <nav className={styles.footerNav}>
          <a href="/" onClick={(e) => scrollToSection(e, 'over-ons')} className={styles.footerLink}>Over</a>
          <a href="/" onClick={(e) => scrollToSection(e, 'werkwijze')} className={styles.footerLink}>Werkwijze</a>
          <a href="/" onClick={(e) => scrollToSection(e, 'prijzen')} className={styles.footerLink}>Tarieven</a>
          <a href="/" onClick={(e) => scrollToSection(e, 'contact')} className={styles.footerLink}>Contact</a>
          <a href="/privacy.html" className={styles.footerLink}>Privacy</a>
        </nav>

        <div className={styles.footerBottom}>
          <span>© {new Date().getFullYear()} Webaanzee.be</span>
          <span>Blankenberge, West-Vlaanderen</span>
        </div>
      </footer>

      {isModalOpen && (
        <div className={styles.modalOverlay} onClick={() => setIsModalOpen(false)}>
          <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h3 className={styles.modalTitle}>Stuur een bericht</h3>
              <button className={styles.closeBtn} onClick={() => setIsModalOpen(false)}>×</button>
            </div>
            <form action="mailto:kevin@webaanzee.be" method="POST" encType="text/plain">
              <div className={styles.formGroup}>
                <input type="text" name="naam" placeholder="Uw Naam" required className={styles.input} />
              </div>
              <div className={styles.formGroup}>
                <input type="email" name="email" placeholder="Uw E-mail" required className={styles.input} />
              </div>
              <div className={styles.formGroup}>
                <textarea name="bericht" rows={4} placeholder="Uw Bericht" required className={styles.input}></textarea>
              </div>
              <button type="submit" className={styles.submitBtn}>Versturen</button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default ContactFooter;
