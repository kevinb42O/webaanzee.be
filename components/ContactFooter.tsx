
import React, { useEffect, useMemo, useState } from 'react';
import { IconPhone, IconMail, IconWhatsapp } from './Icons';

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
    <section className="py-20 px-6 bg-white">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-5xl font-serif text-navy mb-6">Klaar voor meer klanten?</h2>
        <p className="text-lg text-navy/60 mb-3 leading-relaxed">
          Neem vandaag nog vrijblijvend contact op.<br className="hidden md:block" />
          Bel, mail of WhatsApp. Ik luister even en zeg u eerlijk wat zinvol is.
        </p>
        <p className="text-xs md:text-sm font-bold text-gold mb-12">
          ⚡ Snelle reactie gegarandeerd - Geen verkooppraat, gewoon eerlijk advies op maat
        </p>

        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          <a 
            href="tel:0494816714" 
            className="group flex flex-col items-center p-8 md:p-10 bg-white border border-slate-200 rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-200"
          >
            <div className="w-14 h-14 bg-gold/90 rounded-full flex items-center justify-center mb-5 text-navy group-hover:scale-105 transition-transform">
              <IconPhone className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold uppercase tracking-[0.22em] text-navy/60 mb-2">Telefoon</span>
            <span className="text-xl font-bold">Bel Kevin</span>
          </a>

          <button
            type="button"
            onClick={openModal}
            className="group flex flex-col items-center p-8 md:p-10 bg-white border border-slate-200 rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-200"
            aria-haspopup="dialog"
            aria-expanded={isModalOpen}
          >
            <div className="w-14 h-14 bg-gold/90 rounded-full flex items-center justify-center mb-5 text-navy group-hover:scale-105 transition-transform">
              <IconMail className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold uppercase tracking-[0.22em] text-navy/60 mb-2">Mail me</span>
            <span className="text-lg font-bold break-all">kevin@<br/>webaanzee.be</span>
          </button>

          <a 
            href="https://wa.me/32494816714" 
            target="_blank"
            rel="noreferrer"
            className="group flex flex-col items-center p-8 md:p-10 bg-white border border-slate-200 rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-200"
            aria-label="Stuur een WhatsApp-bericht"
          >
            <div className="w-14 h-14 bg-gold/90 rounded-full flex items-center justify-center mb-5 text-navy group-hover:scale-105 transition-transform">
              <IconWhatsapp className="w-5 h-5 text-green-600" />
            </div>
            <span className="text-xs font-bold uppercase tracking-[0.22em] text-navy/60 mb-2">WhatsApp</span>
            <span className="text-xl font-bold">Start chat</span>
          </a>
        </div>

        <div className="mt-20 space-y-4">
          <p className="text-sm font-bold uppercase tracking-[0.3em] text-gold">Actief in de Regio</p>
          <div className="flex flex-wrap justify-center gap-6 text-navy font-serif text-lg">
            <span>Wenduine</span>
            <span className="text-gold">•</span>
            <span>De Haan</span>
            <span className="text-gold">•</span>
            <span>Zeebrugge</span>
            <span className="text-gold">•</span>
            <span>Brugge</span>
            <span className="text-gold">•</span>
            <span>Blankenberge</span>
          </div>

          <div className="pt-8">
            <div className="bg-slate-50 border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
              <div className="p-6 text-left">
                <p className="text-sm font-bold uppercase tracking-widest text-navy/70">Gevestigd in Blankenberge</p>
                <p className="text-navy/60 mt-1">
                  <a
                    href="https://wa.me/32494816714"
                    target="_blank"
                    rel="noreferrer"
                    className="font-bold text-navy underline decoration-gold underline-offset-4 inline-flex items-center gap-2"
                    aria-label="Contacteer mij via WhatsApp"
                  >
                    Contacteer mij
                    <IconWhatsapp className="w-5 h-5 text-green-600" />
                  </a>{' '}
                  en ik kom tot bij u in de zaak voor een{' '}
                  <span className="font-bold text-navy underline decoration-gold underline-offset-4">gratis offerte</span>.
                </p>
              </div>
              <div className="relative w-full h-0 pb-[56.25%]">
                <iframe
                  title="Werkregio Blankenberge"
                  className="absolute inset-0 w-full h-full"
                  src="https://www.google.com/maps?ll=51.3136,3.1327&z=14&t=m&hl=nl&output=embed"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    {isModalOpen && (
      <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
        <button
          type="button"
          aria-label="Sluit venster"
          onClick={closeModal}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') closeModal();
          }}
          className="absolute inset-0 bg-navy/60 backdrop-blur-sm"
        ></button>
        <dialog
          open
          className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl p-8 md:p-10 border border-slate-200"
          aria-label="Stuur een bericht"
        >
          <div className="flex items-start justify-between gap-4 mb-6">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-navy/60">Mailformulier</p>
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
              <span>Telefoon (optioneel)</span>
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
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={handleCopy}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-navy/80 hover:border-gold/70 hover:text-navy transition-colors"
                >
                  Kopieer tekst
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-navy text-white font-semibold shadow-sm hover:bg-navy/90 transition-colors disabled:opacity-60"
                  disabled={status.type === 'sending'}
                >
                  {status.type === 'sending' ? 'Even geduld...' : 'Verstuur via e-mail'}
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
