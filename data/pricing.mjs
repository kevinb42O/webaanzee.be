export const pricing = {
  website: { price: 2450, monthly: 35 },
  cms: { price: 3950, monthly: 65 },
  webshop: { price: 5950, monthly: 95 },
  application: { price: 7500 },
  hourly: 95,
};

export const euro = (amount) => `€${amount.toLocaleString('nl-BE')}`;

export const pricingSummary = `Een website op maat start vanaf ${euro(pricing.website.price)}. Een website met eigen beheerscherm (CMS) start vanaf ${euro(pricing.cms.price)}, een webshop vanaf ${euro(pricing.webshop.price)} en een webapplicatie vanaf ${euro(pricing.application.price)}. Alle bedragen zijn exclusief btw. Hosting, technisch beheer en externe licenties zijn niet inbegrepen in de eenmalige projectprijs. Je krijgt vooraf een offerte met de exacte omvang en kosten.`;
