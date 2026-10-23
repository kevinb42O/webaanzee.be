import React, { useEffect, useRef, useState } from 'react';
import { ArrowUp, ArrowUpRight } from 'lucide-react';
import { scrollToSection } from '../utils/scrollToSection';
import styles from './ContactFooter.module.css';
import Logo from './Logo';

const ContactFooter: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submissionState, setSubmissionState] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [submissionMessage, setSubmissionMessage] = useState('');
  const emailButtonRef = useRef<HTMLButtonElement>(null);
  const nameInputRef = useRef<HTMLInputElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const isHomePage = typeof window === 'undefined' || window.location.pathname === '/' || window.location.pathname === '/index.html';

  const closeModal = () => {
    setIsModalOpen(false);
    setSubmissionState('idle');
    setSubmissionMessage('');
  };
  const track = (eventName: string) => {
    window.dispatchEvent(new CustomEvent('webaanzee:conversion', { detail: { eventName, path: window.location.pathname } }));
  };
  const submitContact = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmissionState('sending');
    setSubmissionMessage('');
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    try {
      const result = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
      const payload = await result.json().catch(() => ({}));
      if (!result.ok) {
        setSubmissionState('error');
        setSubmissionMessage(payload.message || 'Je bericht kon niet worden verstuurd. Probeer opnieuw of mail rechtstreeks.');
        track('contact_form_error');
        return;
      }
      form.reset();
      setSubmissionState('success');
      setSubmissionMessage('Je bericht is verzonden. Ik neem contact met je op via e-mail.');
      track('contact_form_submit_success');
    } catch {
      setSubmissionState('error');
      setSubmissionMessage('Je bericht kon niet worden verstuurd. Controleer je verbinding en probeer opnieuw, of mail rechtstreeks.');
      track('contact_form_error');
    }
  };
  const scrollOnHomePage = (event: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    if (isHomePage) scrollToSection(event, sectionId);
  };

  useEffect(() => {
    if (!isModalOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const mobile = window.matchMedia('(max-width: 999px)').matches;
    nameInputRef.current?.focus({ preventScroll: mobile });
    const focusFrame = mobile ? requestAnimationFrame(() => { if (dialogRef.current) dialogRef.current.scrollTop = 0; }) : 0;

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
                Wat wil je laten maken of verbeteren?
              </h2>
              <p className={`${styles.description} reveal-up`} style={{ animationDelay: '0.2s' }}>
                Vertel wat je zaak doet en waar je hulp bij zoekt. Heb je al een website? Stuur de link mee. Ik bekijk met je welke pagina’s en functies nodig zijn en maak een voorstel met de kosten.
              </p>
            </div>

            <div className={`${styles.finalPrompt} reveal-up`} style={{ animationDelay: '0.25s' }}>
              <span>Rechtstreeks contact</span>
              <h3>Je spreekt met Kevin.</h3>
              <p>Ik lees je vraag en neem contact met je op. Een eerste gesprek is vrijblijvend.</p>
            </div>
          </div>

          <div className={styles.contactActions}>
            <p className={styles.actionLead}>Bel, stuur een WhatsApp of gebruik het contactformulier.</p>
            <div className={styles.grid}>
            <a href="tel:0494816714" onClick={() => track('phone_click')} className={`${styles.card} ${styles.cardPhone} reveal-up`} style={{ animationDelay: '0.3s' }}>
              <span className={styles.cardKicker}>Bel</span>
              <span className={styles.cardTitle}>0494 81 67 14</span>
              <span className={styles.cardSub}>Bespreek je vraag telefonisch</span>
              <ArrowUpRight className={styles.cardArrow} strokeWidth={1.5} aria-hidden="true" />
            </a>
            
            <a href="https://wa.me/32494816714" onClick={() => track('whatsapp_click')} target="_blank" rel="noreferrer" className={`${styles.card} ${styles.cardWhatsapp} reveal-up`} style={{ animationDelay: '0.4s' }}>
              <span className={styles.cardKicker}>WhatsApp</span>
              <span className={styles.cardTitle}>Stuur een bericht</span>
              <span className={styles.cardSub}>Stuur je vraag via WhatsApp</span>
              <ArrowUpRight className={styles.cardArrow} strokeWidth={1.5} aria-hidden="true" />
            </a>

            <button ref={emailButtonRef} onClick={() => { setIsModalOpen(true); track('contact_form_start'); }} className={`${styles.card} ${styles.cardEmail} reveal-up`} style={{ width: '100%', animationDelay: '0.5s' }}>
              <span className={styles.cardKicker}>Contactformulier</span>
              <span className={styles.cardTitle}>Stuur een bericht</span>
              <span className={styles.cardSub}>Je bericht komt bij Kevin terecht</span>
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
              <Logo />
            </a>
            <p className={styles.footerTagline}>Websites, webshops en toepassingen voor ondernemers. Ontworpen en gebouwd door Kevin in Blankenberge.</p>
            <a href="/#contact" onClick={(e) => scrollOnHomePage(e, 'contact')} className={styles.footerCta}>
              Neem contact op <ArrowUpRight aria-hidden="true" strokeWidth={1.7} />
            </a>
          </div>

          <div className={styles.footerColumns}>
            <nav className={styles.footerGroup} aria-label="Navigatie">
              <span className={styles.footerHeading}>Verkennen</span>
              <a href="/" className={styles.footerLink}>Startpagina</a>
              <a href="/diensten/webdesign/" className={styles.footerLink}>Webdesign</a>
              <a href="/webdesign-belgische-kust/" className={styles.footerLink}>Webdesign aan de kust</a>
              <a href="/cases/" className={styles.footerLink}>Projecten</a>
              <a href="/klantenkaart.html" className={styles.footerLink}>Digitale klantenkaart</a>
              <a href="/pwayment.html" className={styles.footerLink}>PWAYMENT POS</a>
              <a href="/inzichten/" className={styles.footerLink}>Uitleg en aanpak</a>
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
            <span>© {new Date().getFullYear()} Webaanzee</span>
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
              <button type="button" className={styles.closeBtn} onClick={closeModal} aria-label="Sluit contactformulier">×</button>
            </div>
            <form onSubmit={submitContact}>
              <div className={styles.formGroup}>
                <label className={styles.fieldLabel} htmlFor="contact-name">Je naam (verplicht)</label>
                <input ref={nameInputRef} id="contact-name" type="text" name="name" autoComplete="name" placeholder="Voor- en achternaam" minLength={2} maxLength={100} required className={styles.input} />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.fieldLabel} htmlFor="contact-email">Je e-mailadres (verplicht)</label>
                <input id="contact-email" type="email" name="email" autoComplete="email" placeholder="naam@jezaak.be" maxLength={200} required className={styles.input} />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.fieldLabel} htmlFor="contact-company">Je zaak (optioneel)</label>
                <input id="contact-company" type="text" name="company" autoComplete="organization" placeholder="Naam van je zaak" maxLength={160} className={styles.input} />
              </div>
              <div className={styles.formGroup} style={{ position: 'absolute', left: '-9999px' }} aria-hidden="true">
                <label htmlFor="contact-website">Laat dit veld leeg</label>
                <input id="contact-website" type="text" name="website" tabIndex={-1} autoComplete="off" />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.fieldLabel} htmlFor="contact-message">Je bericht (verplicht, minimaal 10 tekens)</label>
                <textarea id="contact-message" name="message" rows={4} placeholder="Wat doet je zaak en wat wil je laten maken of verbeteren?" minLength={10} maxLength={4000} required className={styles.input}></textarea>
              </div>
              <button type="submit" disabled={submissionState === 'sending'} className={styles.submitBtn}>{submissionState === 'sending' ? 'Bericht versturen…' : 'Bericht versturen'}</button>
              {submissionMessage && <p role="status" aria-live="polite" style={{ marginTop: '1rem' }}>{submissionMessage} {submissionState === 'error' && <a href="mailto:kevin@webaanzee.be">Mail rechtstreeks</a>}</p>}
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default ContactFooter;
