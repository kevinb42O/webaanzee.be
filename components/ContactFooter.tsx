import React, { useEffect, useRef, useState } from 'react';
import { ArrowUp, ArrowUpRight } from 'lucide-react';
import { scrollToSection } from '../utils/scrollToSection';
import styles from './ContactFooter.module.css';

const ContactFooter: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const emailButtonRef = useRef<HTMLButtonElement>(null);
  const nameInputRef = useRef<HTMLInputElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const isHomePage = window.location.pathname === '/' || window.location.pathname === '/index.html';

  const closeModal = () => setIsModalOpen(false);
  const scrollOnHomePage = (event: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    if (isHomePage) scrollToSection(event, sectionId);
  };

  useEffect(() => {
    if (!isModalOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    nameInputRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeModal();

      if (event.key === 'Tab' && dialogRef.current) {
        const focusable = Array.from(dialogRef.current.querySelectorAll<HTMLElement>(
          'button:not([disabled]), input:not([disabled]), textarea:not([disabled]), [href]'
        ));
        const first = focusable[0];
        const last = focusable.at(-1);
        if (!first || !last) return;

        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
      emailButtonRef.current?.focus();
    };
  }, [isModalOpen]);

  return (
    <>
      <section className={styles.section} id="contact">
        <div className={`${styles.container} animate-on-scroll`}>
          <div className={styles.introGrid}>
            <div>
              <span className={`${styles.label} reveal-up`}>Contact</span>
              <h2 className={`${styles.title} reveal-up`} style={{ animationDelay: '0.1s' }}>
                Laten we kijken wat jouw zaak nodig heeft.
              </h2>
              <p className={`${styles.description} reveal-up`} style={{ animationDelay: '0.2s' }}>
                Je hoeft vooraf geen pakket, aantal pagina&apos;s of technische oplossing te kennen. Vertel me waar je vandaag staat en wat er beter moet. Ik geef je een helder, eerlijk voorstel — ook wanneer eenvoudiger beter is.
              </p>
            </div>

            <div className={`${styles.finalPrompt} reveal-up`} style={{ animationDelay: '0.25s' }}>
              <span>Geen verkooppraat</span>
              <h3>Een eerste gesprek kost je niets. Een vaag antwoord krijg je ook niet.</h3>
              <p>Rechtstreeks contact. Meestal dezelfde werkdag antwoord.</p>
            </div>
          </div>

          <div className={styles.contactActions}>
            <p className={styles.actionLead}>Kies de manier die vandaag het makkelijkst is.</p>
            <div className={styles.grid}>
            <a href="tel:0494816714" className={`${styles.card} ${styles.cardPhone} reveal-up`} style={{ animationDelay: '0.3s' }}>
              <span className={styles.cardKicker}>Bel</span>
              <span className={styles.cardTitle}>0494 81 67 14</span>
              <span className={styles.cardSub}>Bel wanneer het je past</span>
              <ArrowUpRight className={styles.cardArrow} strokeWidth={1.5} aria-hidden="true" />
            </a>
            
            <a href="https://wa.me/32494816714" target="_blank" rel="noreferrer" className={`${styles.card} ${styles.cardWhatsapp} reveal-up`} style={{ animationDelay: '0.4s' }}>
              <span className={styles.cardKicker}>WhatsApp</span>
              <span className={styles.cardTitle}>Stuur een bericht</span>
              <span className={styles.cardSub}>Handig als je vraag al even moet rijpen</span>
              <ArrowUpRight className={styles.cardArrow} strokeWidth={1.5} aria-hidden="true" />
            </a>

            <button ref={emailButtonRef} onClick={() => setIsModalOpen(true)} className={`${styles.card} ${styles.cardEmail} reveal-up`} style={{ width: '100%', animationDelay: '0.5s' }}>
              <span className={styles.cardKicker}>E-mail</span>
              <span className={styles.cardTitle}>Vertel je idee</span>
              <span className={styles.cardSub}>Ik lees mee en antwoord persoonlijk</span>
              <ArrowUpRight className={styles.cardArrow} strokeWidth={1.5} aria-hidden="true" />
            </button>
            </div>
          </div>
        </div>
      </section>

      <footer className={styles.footer}>
        <div className={styles.footerInner}>
          <div className={styles.footerLead}>
            <a href="/" className={styles.footerLogo} aria-label="Webaanzee, naar de startpagina">
              webaanzee<span>.</span>
            </a>
            <p className={styles.footerTagline}>Websites met een helder verhaal, gemaakt voor zelfstandigen aan de Belgische kust en ver daarbuiten.</p>
            <a href="/#contact" onClick={(e) => scrollOnHomePage(e, 'contact')} className={styles.footerCta}>
              Start een gesprek <ArrowUpRight aria-hidden="true" strokeWidth={1.7} />
            </a>
          </div>

          <div className={styles.footerColumns}>
            <nav className={styles.footerGroup} aria-label="Navigatie">
              <span className={styles.footerHeading}>Verkennen</span>
              <a href="/" className={styles.footerLink}>Startpagina</a>
              <a href="/klantenkaart.html" className={styles.footerLink}>Digitale klantenkaart</a>
              <a href="/pwayment.html" className={styles.footerLink}>PWAYMENT POS</a>
              <a href="/blog/waarom-website-nodig-2026.html" className={styles.footerLink}>Waarom uw zaak een website nodig heeft</a>
            </nav>

            <address className={styles.footerGroup}>
              <span className={styles.footerHeading}>Contact</span>
              <a href="tel:0494816714" className={styles.footerLink}>0494 81 67 14</a>
              <a href="mailto:kevin@webaanzee.be" className={styles.footerLink}>kevin@webaanzee.be</a>
              <a href="https://wa.me/32494816714" target="_blank" rel="noreferrer" className={styles.footerLink}>Stuur een WhatsApp</a>
              <span className={styles.footerLocation}>Blankenberge, West-Vlaanderen</span>
            </address>
          </div>

          <div className={styles.footerBottom}>
            <span>© {new Date().getFullYear()} Webaanzee.be</span>
            <a href="/privacy.html" className={styles.footerLegal}>Privacy</a>
            <a href="/#home" onClick={(e) => scrollOnHomePage(e, 'home')} className={styles.backToTop}>
              Naar boven <ArrowUp aria-hidden="true" strokeWidth={1.7} />
            </a>
          </div>
        </div>
      </footer>

      {isModalOpen && (
        <div className={styles.modalOverlay} onMouseDown={(event) => event.target === event.currentTarget && closeModal()}>
          <div ref={dialogRef} className={styles.modalContent} role="dialog" aria-modal="true" aria-labelledby="email-dialog-title">
            <div className={styles.modalHeader}>
              <h3 id="email-dialog-title" className={styles.modalTitle}>Stuur een bericht</h3>
              <button type="button" className={styles.closeBtn} onClick={closeModal} aria-label="Sluit e-mailformulier">×</button>
            </div>
            <form action="mailto:kevin@webaanzee.be" method="POST" encType="text/plain">
              <div className={styles.formGroup}>
                <label className={styles.srOnly} htmlFor="contact-name">Uw naam</label>
                <input ref={nameInputRef} id="contact-name" type="text" name="naam" placeholder="Uw naam" required className={styles.input} />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.srOnly} htmlFor="contact-email">Uw e-mail</label>
                <input id="contact-email" type="email" name="email" placeholder="Uw e-mail" required className={styles.input} />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.srOnly} htmlFor="contact-message">Uw bericht</label>
                <textarea id="contact-message" name="bericht" rows={4} placeholder="Uw bericht" required className={styles.input}></textarea>
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
