const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const recentSubmissions = new Map<string, number>();
const clean = (value: unknown, max: number) => String(value ?? '').trim().slice(0, max);
const escapeHtml = (value: string) => value.replace(/[&<>"']/g, char => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
}[char] as string));

export default async function handler(request: any, response: any) {
  if (request.method !== 'POST') {
    response.setHeader('Allow', 'POST');
    return response.status(405).json({ ok: false, message: 'Alleen POST is toegestaan.' });
  }

  const name = clean(request.body?.name, 100);
  const email = clean(request.body?.email, 200).toLowerCase();
  const message = clean(request.body?.message, 4000);
  const company = clean(request.body?.company, 160);
  const website = clean(request.body?.website, 200);

  // Bots vullen dit verborgen veld vaak in. Antwoord neutraal zodat het formulier niet wordt herhaald.
  if (website) return response.status(200).json({ ok: true });
  if (name.length < 2 || !emailPattern.test(email) || message.length < 10) {
    return response.status(400).json({ ok: false, message: 'Controleer uw naam, e-mailadres en bericht.' });
  }

  const forwarded = clean(request.headers?.['x-forwarded-for'], 200).split(',')[0] || 'unknown';
  const lastSubmission = recentSubmissions.get(forwarded) || 0;
  if (Date.now() - lastSubmission < 30_000) {
    return response.status(429).json({ ok: false, message: 'Wacht even voordat u opnieuw verstuurt.' });
  }
  recentSubmissions.set(forwarded, Date.now());

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM_EMAIL;
  const to = process.env.CONTACT_TO_EMAIL || 'kevin@webaanzee.be';
  if (!apiKey || !from) {
    return response.status(503).json({ ok: false, message: 'De e-mailservice wordt nog geconfigureerd. Mail rechtstreeks naar kevin@webaanzee.be.' });
  }

  const resend = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json', 'User-Agent': 'Webaanzee-Contact/1.0' },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: email,
      subject: `Nieuwe websiteaanvraag van ${name}`,
      text: `Naam: ${name}\nBedrijf: ${company || '-'}\nE-mail: ${email}\n\n${message}`,
      html: `<h2>Nieuwe websiteaanvraag</h2><p><strong>Naam:</strong> ${escapeHtml(name)}</p><p><strong>Bedrijf:</strong> ${escapeHtml(company || '-')}</p><p><strong>E-mail:</strong> ${escapeHtml(email)}</p><p><strong>Bericht:</strong></p><p>${escapeHtml(message).replace(/\n/g, '<br>')}</p>`
    })
  });

  if (!resend.ok) {
    console.error('Contact delivery failed', resend.status, await resend.text());
    return response.status(502).json({ ok: false, message: 'Versturen lukte niet. Probeer opnieuw of mail rechtstreeks.' });
  }
  return response.status(200).json({ ok: true });
}
