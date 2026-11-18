const screen = (name, title, text, alt) => ({
  name, title, text, alt, width: 2400, height: 1500,
  src: `/images/eigen-projecten/pwayment/${name}-1440.webp`,
  srcSet: [800, 1440, 2400].map(width => `/images/eigen-projecten/pwayment/${name}-${width}.webp ${width}w`).join(', '),
  full: `/images/eigen-projecten/pwayment/${name}-2400.webp`,
});

// Captured from the current local RETAIL source with isolated demo data.
export const pwaymentScreens = [
  screen('pwayment-kassa', 'Kassaverkoop',
    'De huidige kassa met productcatalogus, varianten, winkelmand en betaalregistratie.',
    'Huidige PWAYMENT-kassa met collecties, productvarianten en een gevulde winkelmand'),
  screen('pwayment-inzichten', 'Verkoopprestaties',
    'Omzet, brutowinst en verkoopontwikkeling op basis van dezelfde verkoopadministratie.',
    'PWAYMENT-verkoopinzichten met omzetcijfers, brutowinst en grafieken uit demotransacties'),
  screen('pwayment-instellingen', 'Modules en instellingen',
    'De eigenaar stelt de werkplek samen: modules, navigatie en winkelprofiel binnen één beheeromgeving.',
    'Huidig PWAYMENT-instellingenmenu met moduleconfiguratie en navigatie per winkel'),
  screen('pwayment-voorraad', 'Voorraad en artikelbewegingen',
    'Leveringen, tellingen en correcties krijgen elk hun eigen verwerking en een controleerbaar voorraadspoor per product.',
    'PWAYMENT-voorraadbeheer met productselectie, leveringen, tellingen en voorraadspoor'),
  screen('pwayment-klanten', 'Klanten en aankoophistoriek',
    'Klantprofielen verbinden winkelbezoeken, aankopen, bestedingen en cadeaubonnen.',
    'PWAYMENT-klantenbeheer met fictieve klanten, winkelbezoeken en bestedingen'),
  screen('pwayment-integraties', 'Catalogus en gegevensimport',
    'Catalogus- en klantgegevens worden ingelezen, gecontroleerd en toegewezen voordat ze worden geactiveerd.',
    'PWAYMENT Integration Hub met import van catalogus en klanten, controles en migratiereceipt'),
  screen('pwayment-kassatoegang', 'Kassatoegang en medewerkers',
    'Persoonlijke PIN-codes, rollen, gekoppelde toestellen en sessiebeheer bepalen wie de kassa kan gebruiken.',
    'PWAYMENT-beheer van kassatoegang met medewerkers, toestellen, beveiligingsstatus en audit'),
];
