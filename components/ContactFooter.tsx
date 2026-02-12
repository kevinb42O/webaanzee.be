
import React, { useEffect, useRef, useMemo, useState } from 'react';
import { IconPhone, IconMail, IconWhatsapp } from './Icons';
import { scrollToSection } from '../utils/scrollToSection';

const ContactFooter: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [status, setStatus] = useState<{
    type: 'idle' | 'sending' | 'success' | 'error';
    message: string;
  }>({ type: 'idle', message: '' });

  const [form, setForm] = useState({
    naam: '',
    email: '',
    telefoon: '',
    bericht: '',
  });

  const [errors, setErrors] = useState<{ [K in keyof typeof form]?: string }>({});

  const hasMailProgram = useMemo(() => Boolean(globalThis?.window), []);
  const modalRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (!hasMailProgram) return;

    const body = globalThis.document?.body;
    if (isModalOpen) {
      if (body) body.style.overflow = 'hidden';
    } else {
      if (body) body.style.overflow = '';
      setErrors({});
      setStatus({ type: 'idle', message: '' });
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsModalOpen(false);
      }
    };

    globalThis.addEventListener?.('keydown', onKeyDown);
    return () => {
      globalThis.removeEventListener?.('keydown', onKeyDown);
    };
  }, [hasMailProgram, isModalOpen]);

  // Focus trap for modal accessibility
  useEffect(() => {
    if (!isModalOpen || !modalRef.current) return;
    const modal = modalRef.current;
    const focusable = modal.querySelectorAll<HTMLElement>(
      'input, textarea, button, [tabindex]:not([tabindex="-1"])'
    );
    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    requestAnimationFrame(() => first?.focus());

    const trapFocus = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last?.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first?.focus();
      }
    };

    modal.addEventListener('keydown', trapFocus);
    return () => modal.removeEventListener('keydown', trapFocus);
  }, [isModalOpen]);

  const validate = () => {
    const nextErrors: typeof errors = {};
    if (!form.naam.trim()) nextErrors.naam = 'Naam is verplicht.';
    if (!form.email.trim()) nextErrors.email = 'E-mail is verplicht.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) nextErrors.email = 'Gebruik een geldig e-mailadres.';
    if (!form.bericht.trim() || form.bericht.trim().length < 10) nextErrors.bericht = 'Schrijf minimaal 10 tekens.';
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!validate()) return;

    setStatus({ type: 'sending', message: 'We openen uw mailprogramma...' });

    const subject = encodeURIComponent('Bericht via webaanzee.be');
    const body = encodeURIComponent(
      `Naam: ${form.naam}\nE-mail: ${form.email}\nTelefoon: ${form.telefoon || '-'}\n\nBericht:\n${form.bericht}`
    );

    const mailto = `mailto:kevin@webaanzee.be?subject=${subject}&body=${body}`;

    try {
      if (hasMailProgram && globalThis.location) {
        globalThis.location.href = mailto;
      }
      setStatus({ type: 'success', message: 'Bericht klaar in uw e-mail. Verstuur het om af te ronden.' });
    } catch (error) {
      console.error(error);
      setStatus({ type: 'error', message: 'Kon geen e-mail openen. Kopieer je bericht en mail het handmatig.' });
    }
  };

  const handleCopy = async () => {
    if (!globalThis.navigator?.clipboard) {
      setStatus({ type: 'error', message: 'Clipboard niet beschikbaar. Kopieer handmatig.' });
      return;
    }

    const composed = `Aan: kevin@webaanzee.be\nOnderwerp: Bericht via webaanzee.be\n\nNaam: ${form.naam}\nE-mail: ${form.email}\nTelefoon: ${form.telefoon || '-'}\n\n${form.bericht}`;
    try {
      await globalThis.navigator.clipboard.writeText(composed);
      setStatus({ type: 'success', message: 'Tekst gekopieerd. Plak het in uw mailprogramma.' });
    } catch (error) {
      console.error(error);
      setStatus({ type: 'error', message: 'Kopiëren mislukt. Selecteer en kopieer handmatig.' });
    }
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
    <section className="relative py-28 md:py-36 px-6 bg-gradient-to-b from-white via-slate-50 to-slate-50 overflow-hidden">
      {/* Decorative background */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-amber-50/50 rounded-full blur-[150px] pointer-events-none -translate-y-1/3"></div>
      
      <div className="relative z-10 max-w-6xl mx-auto text-center">
        {/* Premium Headline */}
        <span className="inline-block text-[11px] font-bold uppercase tracking-[0.2em] text-amber-600 mb-6">Neem contact op</span>
        <h2 id="contact-heading" className="text-5xl md:text-7xl font-serif font-semibold tracking-[-0.03em] text-slate-900">
          Klaar voor meer klanten?
        </h2>
        <p className="text-lg md:text-xl font-sans text-slate-500 mt-6 mb-20 leading-relaxed max-w-2xl mx-auto">
          Neem vandaag nog vrijblijvend contact op. Direct contact, geen wachtlijsten. Bel, mail of WhatsApp — ik zeg u eerlijk wat zinvol is.
        </p>

        {/* Premium Action Cards Grid */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 mb-20">
          {/* Phone Card */}
          <a 
            href="tel:0494816714" 
            className="group relative flex flex-col items-center p-10 md:p-12 bg-white rounded-2xl shadow-premium gradient-border transition-all duration-500 hover:-translate-y-3 hover:shadow-gold card-glow"
          >
            <div className="w-16 h-16 bg-gradient-to-br from-amber-50 to-amber-100/80 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-sm">
              <IconPhone className="w-7 h-7 text-amber-600" />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 mb-3">Telefoon</span>
            <span className="text-2xl font-sans font-bold text-slate-900">Bel Kevin</span>
            <span className="text-sm text-slate-400 mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">0494 81 67 14</span>
          </a>

          {/* WhatsApp Card */}
          <a 
            href="https://wa.me/32494816714" 
            target="_blank"
            rel="noreferrer"
            className="group relative flex flex-col items-center p-10 md:p-12 bg-white rounded-2xl shadow-premium gradient-border transition-all duration-500 hover:-translate-y-3 hover:shadow-gold card-glow"
            aria-label="Stuur een WhatsApp-bericht"
          >
            <div className="w-16 h-16 bg-gradient-to-br from-amber-50 to-amber-100/80 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-sm">
              <IconWhatsapp className="w-7 h-7 text-amber-600" />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 mb-3">WhatsApp</span>
            <span className="text-2xl font-sans font-bold text-slate-900">Stuur een bericht</span>
            <span className="text-sm text-slate-400 mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">Direct antwoord</span>
          </a>

          {/* Email Card */}
          <button
            type="button"
            onClick={openModal}
            className="group relative flex flex-col items-center p-10 md:p-12 bg-white rounded-2xl shadow-premium gradient-border transition-all duration-500 hover:-translate-y-3 hover:shadow-gold card-glow"
            aria-haspopup="dialog"
            aria-expanded={isModalOpen}
          >
            <div className="w-16 h-16 bg-gradient-to-br from-amber-50 to-amber-100/80 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-sm">
              <IconMail className="w-7 h-7 text-amber-600" />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 mb-3">E-mail</span>
            <span className="text-lg font-sans font-bold text-slate-900 break-all">kevin@webaanzee.be</span>
            <span className="text-sm text-slate-400 mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">Stuur een mail</span>
          </button>
        </div>

        {/* Location / Footer Bar */}
        <div className="border-t border-slate-200/80 pt-12">
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-amber-600 mb-6">
            Servicegebied
          </p>
          
          {/* Cities with elegant separators */}
          <div className="flex flex-wrap justify-center items-center gap-x-5 gap-y-3 font-sans text-sm font-medium text-slate-400">
            {['Wenduine', 'De Haan', 'Zeebrugge', 'Brugge', 'Blankenberge'].map((city, i, arr) => (
              <React.Fragment key={city}>
                <span className="hover:text-slate-600 transition-colors">{city}</span>
                {i < arr.length - 1 && <span className="text-amber-400/60 text-[8px]">◆</span>}
              </React.Fragment>
            ))}
          </div>

          <p className="mt-8 text-sm text-slate-400">
            Gevestigd in <span className="font-semibold text-slate-600">Blankenberge</span>
          </p>
        </div>
      </div>
    </section>

    {/* High-End Footer */}
    <footer className="relative bg-[#0B0F19] py-16 md:py-20 px-6 overflow-hidden">
      {/* Subtle top gradient line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500/30 to-transparent"></div>
      
      <div className="max-w-7xl mx-auto relative">
        {/* Main Footer Grid */}
        <div className="grid md:grid-cols-3 gap-16 mb-16">
          {/* Column 1: Brand Identity */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <img
                src="/logo_zondertekst_zonderachtergrond.png"
                alt="Webaanzee"
                width="36"
                height="36"
                decoding="async"
                className="h-9 w-9 object-contain"
              />
              <h3 className="text-2xl font-serif font-semibold text-white">
                Web<span className="text-amber-500">aanzee</span>.be
              </h3>
            </div>
            <p className="text-slate-400 leading-relaxed">
              Digitale ambacht aan de Belgische kust. Geen bandwerk, maar websites die klanten opleveren.
            </p>
          </div>

          {/* Column 2: Navigation */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-amber-500 mb-6">
              Navigatie
            </h4>
            <ul className="space-y-4">
              <li>
                <a 
                  href="/" 
                  onClick={(e) => scrollToSection(e, 'over-ons')}
                  className="text-slate-300 hover:text-white hover:translate-x-2 inline-block transition-all duration-200 cursor-pointer"
                >
                  Over Webaanzee
                </a>
              </li>
              <li>
                <a 
                  href="/" 
                  onClick={(e) => scrollToSection(e, 'werkwijze')}
                  className="text-slate-300 hover:text-white hover:translate-x-2 inline-block transition-all duration-200 cursor-pointer"
                >
                  Werkwijze
                </a>
              </li>
              <li>
                <a 
                  href="/" 
                  onClick={(e) => scrollToSection(e, 'prijzen')}
                  className="text-slate-300 hover:text-white hover:translate-x-2 inline-block transition-all duration-200 cursor-pointer"
                >
                  Wat ik aanbied
                </a>
              </li>
              <li>
                <a 
                  href="/" 
                  onClick={(e) => scrollToSection(e, 'contact')}
                  className="text-slate-300 hover:text-white hover:translate-x-2 inline-block transition-all duration-200 cursor-pointer"
                >
                  Contact
                </a>
              </li>
              <li>
                <a 
                  href="/privacy.html" 
                  className="text-slate-300 hover:text-white hover:translate-x-2 inline-block transition-all duration-200"
                >
                  Privacy
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Connect */}
          <div className="flex flex-col items-start gap-6">
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-amber-500">
              Connect
            </h4>
            
            {/* Availability Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-slate-700 bg-slate-800/50">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-xs font-medium text-emerald-100">
                Beschikbaar voor projecten
              </span>
            </div>

            {/* Email */}
            <a 
              href="mailto:kevin@webaanzee.be" 
              className="text-sm text-slate-300 hover:text-amber-400 transition-colors duration-200 flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              kevin@webaanzee.be
            </a>

            {/* Location */}
            <div className="text-sm text-slate-300 flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Blankenberge, West-Vlaanderen
            </div>

            {/* Contact Icons */}
            <div className="flex items-center gap-6">
              <a 
                href="https://www.instagram.com/bourguignon_visualart/" 
                target="_blank" 
                rel="noreferrer"
                className="text-slate-400 hover:text-white hover:scale-110 transition-all duration-200"
                aria-label="Instagram"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a 
                href="https://www.facebook.com/webaanzee.be" 
                target="_blank" 
                rel="noreferrer"
                className="text-slate-400 hover:text-white hover:scale-110 transition-all duration-200"
                aria-label="Facebook"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a 
                href="https://wa.me/32494816714" 
                target="_blank" 
                rel="noreferrer"
                className="text-slate-400 hover:text-white hover:scale-110 transition-all duration-200"
                aria-label="WhatsApp"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
              </a>
              <a 
                href="tel:0494816714" 
                className="text-slate-400 hover:text-white hover:scale-110 transition-all duration-200"
                aria-label="Telefoon"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-slate-500">
            © {new Date().getFullYear()} Webaanzee.be — Alle rechten voorbehouden
          </p>
          <div className="flex items-center gap-6">
            <a 
              href="/privacy.html" 
              className="text-xs text-slate-500 hover:text-slate-300 transition-colors"
            >
              Privacy
            </a>
            <a 
              href="/" 
              onClick={(e) => scrollToSection(e, 'cookies')}
              className="text-xs text-slate-500 hover:text-slate-300 transition-colors cursor-pointer"
            >
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>

    {isModalOpen && (
      <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
        <button
          type="button"
          aria-label="Sluit venster"
          onClick={closeModal}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') closeModal();
          }}
          className="absolute inset-0 bg-navy/70 backdrop-blur-md"
        ></button>
        <dialog
          ref={modalRef}
          open
          className="relative w-full max-w-2xl bg-white rounded-3xl shadow-premium-lg p-8 md:p-10 border border-slate-100"
          aria-label="Stuur een bericht"
        >
          <div className="flex items-start justify-between gap-4 mb-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gold">Mailformulier</p>
              <h3 className="text-2xl md:text-3xl font-serif text-navy mt-1">Stuur mij direct een bericht</h3>
              <p className="text-sm text-navy/60 mt-2">Ik antwoord meestal binnen 1 werkdag. Geen verkooppraat, wel eerlijk advies.</p>
            </div>
            <button
              type="button"
              onClick={closeModal}
              className="text-navy/60 hover:text-navy rounded-full p-2 transition-colors"
              aria-label="Sluit venster"
            >
              ×
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            <div className="grid md:grid-cols-2 gap-4">
              <label className="flex flex-col text-left gap-2 text-sm text-navy/80">
                <span>Naam*</span>
                <input
                  type="text"
                  name="naam"
                  value={form.naam}
                  onChange={(e) => setForm({ ...form, naam: e.target.value })}
                  className="w-full rounded-xl border border-slate-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gold/70 focus:border-gold/70"
                  placeholder="Uw naam"
                />
                {errors.naam && <span className="text-xs text-red-600">{errors.naam}</span>}
              </label>

              <label className="flex flex-col text-left gap-2 text-sm text-navy/80">
                <span>E-mail*</span>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full rounded-xl border border-slate-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gold/70 focus:border-gold/70"
                  placeholder="naam@bedrijf.be"
                />
                {errors.email && <span className="text-xs text-red-600">{errors.email}</span>}
              </label>
            </div>

            <label className="flex flex-col text-left gap-2 text-sm text-navy/80">
              <span>Telefoonnummer</span>
              <input
                type="tel"
                name="telefoon"
                value={form.telefoon}
                onChange={(e) => setForm({ ...form, telefoon: e.target.value })}
                className="w-full rounded-xl border border-slate-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gold/70 focus:border-gold/70"
                placeholder="bv. +32 494 81 67 14"
              />
            </label>

            <label className="flex flex-col text-left gap-2 text-sm text-navy/80">
              <span>Bericht*</span>
              <textarea
                name="bericht"
                value={form.bericht}
                onChange={(e) => setForm({ ...form, bericht: e.target.value })}
                rows={5}
                className="w-full rounded-xl border border-slate-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gold/70 focus:border-gold/70"
                placeholder="Vertel kort wat u nodig heeft"
              />
              {errors.bericht && <span className="text-xs text-red-600">{errors.bericht}</span>}
            </label>

            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
              <div className="text-xs text-navy/60">* verplichte velden. Uw bericht wordt via uw mailprogramma verzonden.</div>
              <div className="w-full md:w-auto flex justify-end">
                <button
                  type="submit"
                  className="w-full md:w-auto px-5 py-2 rounded-xl bg-navy text-white font-semibold shadow-sm hover:bg-navy/90 transition-colors disabled:opacity-60"
                  disabled={status.type === 'sending'}
                >
                  {status.type === 'sending' ? 'Even geduld...' : 'Verstuur bericht'}
                </button>
              </div>
            </div>

            {status.message && (
              <div
                className={`text-sm rounded-lg px-3 py-2 border ${
                  status.type === 'error'
                    ? 'text-red-700 border-red-200 bg-red-50'
                    : 'text-green-700 border-green-200 bg-green-50'
                }`}
              >
                {status.message}
              </div>
            )}
          </form>
        </dialog>
      </div>
    )}
    </>
  );
};

export default ContactFooter;
