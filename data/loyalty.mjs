// Existing product tariffs. The offer specifies VAT and any package-specific extras.
export const loyaltyPricing = { basic: 495, premium: 599, website: 1350, annual: 250 };
export const loyaltyCostNote = 'Het eerste jaar betaal je geen servicekosten. Het basistarief voor jaarlijks beheer is €250 vanaf het tweede jaar. Je offerte vermeldt de btw, het beheer voor je gekozen pakket en eventuele uitbreidingen.';
export const loyaltyFaqs = [
  { question: 'Hoe ontvangt een klant stempels?', answer: 'De klant opent de spaarkaart in de smartphonebrowser en maakt een account aan. Je medewerker genereert een QR-code voor de consumpties. De klant scant die met de scanner in de spaarkaart. Voor het inwisselen van een beloning wordt een aparte QR-code gemaakt.' },
  { question: 'Moet mijn klant een app downloaden?', answer: 'Nee. De spaarkaart werkt in de smartphonebrowser. De klant kan een snelkoppeling op het startscherm zetten. Om QR-codes in de spaarkaart te scannen, heeft de browser cameratoegang nodig.' },
  { question: 'Wat betaal ik na het eerste jaar?', answer: loyaltyCostNote },
  { question: 'Wanneer kan ik starten?', answer: 'Vraag een demo aan en vermeld wanneer je wilt starten. Voor de inrichting spreken we de huisstijl, spaarregels, toestellen en planning af. De opleverdatum staat in het voorstel.' },
];
