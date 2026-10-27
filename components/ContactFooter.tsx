import React, { useEffect, useRef, useState } from 'react';
import { ArrowUp, ArrowUpRight, ArrowRight, Check, LoaderCircle, X } from 'lucide-react';
import { scrollToSection } from '../utils/scrollToSection';
import styles from './ContactFooter.module.css';
import Logo from './Logo';
import { lockPageScroll } from '../utils/pageScrollLock';
import { useSectionArrival } from '../utils/useSectionArrival';

const ContactFooter: React.FC = () => {
  const contactRef = useRef<HTMLElement>(null);
  useSectionArrival(contactRef, 'contact');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submissionState, setSubmissionState] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [submissionMessage, setSubmissionMessage] = useState('');
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const submissionAbort = useRef<AbortController | null>(null);
  useEffect(() => () => submissionAbort.current?.abort(), []);
  const emailButtonRef = useRef<HTMLButtonElement>(null);
  const nameInputRef = useRef<HTMLInputElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const isHomePage = typeof window === 'undefined' || window.location.pathname === '/' || window.location.pathname === '/index.html';

  const closeModal = () => {
    submissionAbort.current?.abort();
    submissionAbort.current = null;
    setIsModalOpen(false);
    setSubmissionState('idle');
    setSubmissionMessage('');
    setFieldErrors({});
  };
  const track = (eventName: string) => {
    window.dispatchEvent(new CustomEvent('webaanzee:conversion', { detail: { eventName, path: window.location.pathname } }));
  };
  const submitContact = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (submissionAbort.current) return;
    const form = event.currentTarget;
    const errors: Record<string, string> = {};
    const values = new FormData(form);
    if (String(values.get('name') ?? '').trim().length < 2) errors.name = 'Vul je naam in (minstens 2 tekens).';
    const email = form.elements.namedItem('email') as HTMLInputElement;
    if (!email.value.trim() || !email.validity.valid) errors.email = 'Vul een geldig e-mailadres in.';
    if (String(values.get('message') ?? '').trim().length < 10) errors.message = 'Vertel iets meer over je vraag (minstens 10 tekens).';
    setFieldErrors(errors);
    if (Object.keys(errors).length) {
      (form.elements.namedItem(Object.keys(errors)[0]) as HTMLElement)?.focus();
      return;
    }
    const controller = new AbortController();
    submissionAbort.current = controller;
    setSubmissionState('sending');
    setSubmissionMessage('');
    const data = Object.fromEntries(values.entries());
    try {
      const result = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data), signal: controller.signal });
      const payload = await result.json().catch(() => ({}));
      if (controller.signal.aborted) return;
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
      if (controller.signal.aborted) return;
      setSubmissionState('error');
      setSubmissionMessage('Je bericht kon niet worden verstuurd. Controleer je verbinding en probeer opnieuw, of mail rechtstreeks.');
      track('contact_form_error');
    } finally {
      if (submissionAbort.current === controller) submissionAbort.current = null;
    }
  };
  useEffect(() => {
    if (submissionState === 'success') dialogRef.current?.focus({ preventScroll: true });
  }, [submissionState]);

  const scrollOnHomePage = (event: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    if (isHomePage) scrollToSection(event, sectionId);
  };

  useEffect(() => {
    if (!isModalOpen) return;

    const unlockScroll = lockPageScroll(dialogRef.current?.parentElement);
    const mobile = window.matchMedia('(max-width: 999px)').matches;
    if (mobile) dialogRef.current?.focus({ preventScroll: true });
    else nameInputRef.current?.focus({ preventScroll: true });
    const focusFrame = mobile ? requestAnimationFrame(() => { if (dialogRef.current) dialogRef.current.scrollTop = 0; }) : 0;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeModal();

      if (event.key === 'Tab' && dialogRef.current) {
        const focusable = Array.from(dialogRef.current.querySelectorAll<HTMLElement>(
          'button:not([disabled]), input:not([disabled]):not([tabindex="-1"]), textarea:not([disabled]), [href]'
        ));
        const first = focusable[0];
        const last = focusable.at(-1);
        if (!first || !last) return;

        if (event.shiftKey && (document.activeElement === first || document.activeElement === dialogRef.current)) {
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
      cancelAnimationFrame(focusFrame);
      unlockScroll();
      window.removeEventListener('keydown', handleKeyDown);
      emailButtonRef.current?.focus({ preventScroll: true });
    };
  }, [isModalOpen]);

  return (
    <>
      <section ref={contactRef} className={styles.section} id="contact" aria-labelledby="contact-title">
        <div className={styles.container}>
          <div className={styles.introGrid}>
            <div>
              <h2 id="contact-title" data-contact-title className={styles.title}>
                Wat wil je laten maken of verbeteren?
              </h2>
              <p className={styles.description}>
                Vertel wat je zaak doet en waar je hulp bij zoekt. Heb je al een website? Stuur de link mee. Ik bekijk met je welke pagina’s en functies nodig zijn en maak een voorstel met de kosten.
              </p>
            </div>

            <div className={styles.finalPrompt}>
              <span>Rechtstreeks contact</span>
              <h3>Je spreekt met Kevin.</h3>
              <p>Ik lees je vraag en neem contact met je op. Een eerste gesprek is vrijblijvend.</p>
            </div>
          </div>

          <div data-contact-actions className={styles.contactActions}>
            <p className={styles.actionLead}>Bel, stuur een WhatsApp of gebruik het contactformulier.</p>
            <div className={styles.grid}>
            <a href="tel:0494816714" onClick={() => track('phone_click')} className={`${styles.card} ${styles.cardPhone}`}>
              <span className={styles.cardKicker}>Bel</span>
              <span className={styles.cardTitle}>0494 81 67 14</span>
              <span className={styles.cardSub}>Bespreek je vraag telefonisch</span>
              <ArrowUpRight className={styles.cardArrow} strokeWidth={1.5} aria-hidden="true" />
            </a>

            <a href="https://wa.me/32494816714" onClick={() => track('whatsapp_click')} target="_blank" rel="noreferrer" className={`${styles.card} ${styles.cardWhatsapp}`}>
              <span className={styles.cardKicker}>WhatsApp</span>
              <span className={styles.cardTitle}>Stuur een bericht</span>
              <span className={styles.cardSub}>Stuur je vraag via WhatsApp</span>
              <ArrowUpRight className={styles.cardArrow} strokeWidth={1.5} aria-hidden="true" />
            </a>

            <button ref={emailButtonRef} onClick={() => { setIsModalOpen(true); track('contact_form_start'); }} className={`${styles.card} ${styles.cardEmail}`} style={{ width: '100%' }}>
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
          <div ref={dialogRef} tabIndex={-1} data-lenis-prevent="" className={styles.modalContent} role="dialog" aria-modal="true" aria-labelledby="email-dialog-title" aria-describedby="email-dialog-description">
            <div className={styles.modalHeader}>
              <div>
                <h3 id="email-dialog-title" className={styles.modalTitle}>Vertel me je idee.</h3>
                <p id="email-dialog-description" className={styles.modalIntro}>Een vraag of een plan? Je bericht komt rechtstreeks bij Kevin terecht.</p>
              </div>
              <button type="button" className={styles.closeBtn} onClick={closeModal} aria-label="Sluit contactformulier"><X size={20} strokeWidth={1.8} aria-hidden="true" /></button>
            </div>
            {submissionState === 'success' ? (
              <div className={styles.successState} role="status" aria-live="polite">
                <Check className={styles.successIcon} size={32} strokeWidth={1.6} aria-hidden="true" />
                <h4>Bedankt voor je bericht.</h4>
                <p>Ik lees je vraag en neem contact met je op via e-mail.</p>
                <button type="button" onClick={closeModal} className={styles.submitBtn}>Helemaal goed <Check size={18} aria-hidden="true" /></button>
              </div>
            ) : (
              <form onSubmit={submitContact} noValidate className={styles.contactForm} onInput={(event) => {
                const field = event.target as HTMLInputElement;
                if (fieldErrors[field.name]) setFieldErrors(errors => { const next = { ...errors }; delete next[field.name]; return next; });
              }}>
                <p className={styles.formHint}>Alleen je zaak is optioneel.</p>
                <div className={styles.fieldRow}>
                  <div className={styles.formGroup}>
                    <label className={styles.fieldLabel} htmlFor="contact-name">Je naam</label>
                    <input ref={nameInputRef} id="contact-name" type="text" name="name" autoComplete="name" placeholder="Voor- en achternaam" minLength={2} maxLength={100} required className={styles.input} aria-invalid={!!fieldErrors.name} aria-describedby={fieldErrors.name ? 'contact-name-error' : undefined} />
                    {fieldErrors.name && <p id="contact-name-error" className={styles.fieldError}>{fieldErrors.name}</p>}
                  </div>
                  <div className={styles.formGroup}>
                    <label className={styles.fieldLabel} htmlFor="contact-email">Je e-mailadres</label>
                    <input id="contact-email" type="email" name="email" autoComplete="email" placeholder="jij@jezaak.be" maxLength={200} required className={styles.input} aria-invalid={!!fieldErrors.email} aria-describedby={fieldErrors.email ? 'contact-email-error' : undefined} />
                    {fieldErrors.email && <p id="contact-email-error" className={styles.fieldError}>{fieldErrors.email}</p>}
                  </div>
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.fieldLabel} htmlFor="contact-company">Je zaak <span>optioneel</span></label>
                  <input id="contact-company" type="text" name="company" autoComplete="organization" placeholder="Naam van je zaak" maxLength={160} className={styles.input} />
                </div>
                <div className={styles.srOnly} aria-hidden="true">
                  <label htmlFor="contact-website">Laat dit veld leeg</label>
                  <input id="contact-website" type="text" name="website" tabIndex={-1} autoComplete="off" />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.fieldLabel} htmlFor="contact-message">Waar kan ik je mee helpen?</label>
                  <textarea id="contact-message" name="message" rows={4} placeholder="Vertel kort wat je wil laten maken of verbeteren. Heb je al een website? Stuur de link mee." minLength={10} maxLength={4000} required className={styles.input} aria-invalid={!!fieldErrors.message} aria-describedby={fieldErrors.message ? 'contact-message-error' : undefined} />
                  {fieldErrors.message && <p id="contact-message-error" className={styles.fieldError}>{fieldErrors.message}</p>}
                </div>
                {submissionMessage && <p role="status" aria-live="polite" className={styles.submissionError}>{submissionMessage} <a href="mailto:kevin@webaanzee.be">Mail rechtstreeks</a></p>}
                <div className={styles.formActions}>
                  <button type="submit" disabled={submissionState === 'sending'} className={styles.submitBtn}>
                    {submissionState === 'sending' ? 'Wordt verstuurd…' : 'Verstuur je bericht'}
                    {submissionState === 'sending' ? <LoaderCircle className={styles.sendingIcon} size={18} aria-hidden="true" /> : <ArrowRight size={18} aria-hidden="true" />}
                  </button>
                  <p className={styles.privacyNote}>Je gegevens gebruik ik om je vraag te beantwoorden. <a href="/privacy.html" target="_blank" rel="noreferrer">Privacy</a></p>
                </div>
              </form>
            )}
            <div className={styles.directEmail}>Liever mailen? <a href="mailto:kevin@webaanzee.be">kevin@webaanzee.be <ArrowUpRight size={14} aria-hidden="true" /></a></div>
          </div>
        </div>
      )}
    </>
  );
};

export default ContactFooter;
