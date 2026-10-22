import React from 'react';
import PortfolioDepth from './PortfolioDepth';
import styles from './Proof.module.css';

export interface CaseStudy {
  id: string;
  title: string;
  description: string;
  website: string;
  casePath: string;
  videoSrc: string;
  imageSrc: string;
  previewSrc?: string;
  showInGrid?: boolean;
  tags: string[];
  projectNote?: {
    label: string;
    body: string;
    facts: string[];
  };
}

export const caseStudies: CaseStudy[] = [
  { 
    id: 'hondaanzee', 
    title: 'Hond aan Zee',
    description: 'Een praktisch kustplatform dat hondenbezitters snel naar de juiste strandregels, losloopzones, wandelingen en adressen leidt.',
    website: 'https://www.hondaanzee.be', 
    casePath: '/cases/hond-aan-zee/',
    videoSrc: '/videos/hondaanzee.mp4',
    imageSrc: '/images/cases/hondaanzee.png',
    tags: ['Kustplatform', 'Praktische gids'],
    projectNote: {
      label: 'Bereik & relevantie',
      body: 'Een herkenbare vaste waarde voor hondeneigenaars die de Belgische kust bezoeken.',
      facts: [
        'Pieken tot 98.000 bezoekers per maand in het seizoen',
        'HondAanZee-stickers bij deelnemende zaken',
        'Opgepikt in krantenartikels'
      ]
    }
  },
  { 
    id: 'fabrice', 
    title: 'Fabrice Goffin', 
    description: 'Een heldere, persoonlijke publieke site voor een Oostends schepen — met standpunten, nieuws en een directe lijn naar inwoners.',
    website: 'https://www.fabricegoffin.be', 
    casePath: '/cases/fabrice-goffin-oostende/',
    videoSrc: '/videos/fabrice.mp4',
    imageSrc: '/images/cases/fabrice.png',
    tags: ['Publieke communicatie', 'Oostende'],
  },
  { 
    id: 'carabus', 
    title: 'Carabus Ads', 
    description: 'Website voor een performance-marketingbureau dat werkt met Google Ads, social ads en funnels.',
    website: 'https://www.carabusads.be', 
    casePath: '/cases/carabus-ads/',
    videoSrc: '/videos/carabus.mp4',
    imageSrc: '/images/cases/carabus.png',
    tags: ['Performance', 'Marketing'],
  },
  { 
    id: 'cozy', 
    title: 'COZY Moments', 
    description: 'Website voor de koffiebar en cocktailbar aan de Grote Markt in Blankenberge, met drankkaart, praktische info en digitale spaarkaart.',
    website: 'https://www.cozy-moments.be', 
    casePath: '/cases/cozy-moments-blankenberge/',
    videoSrc: '/videos/cozy.mp4',
    imageSrc: '/images/cases/cozy.png',
    tags: ['Horeca', 'Loyalty'],
  },
  { 
    id: 'dailygrind', 
    title: 'Daily Grind', 
    description: 'Webshop en communityplatform voor de Blankenbergse core skateshop, met boards, streetwear, sneakers en een skatepark guide.',
    website: 'https://www.daily-grind.be', 
    casePath: '/cases/daily-grind-blankenberge/',
    videoSrc: '/videos/dailygrind.mp4',
    imageSrc: '/images/cases/dailygrind.png',
    tags: ['E-commerce', 'Community'],
  },
  { 
    id: 'vishandel', 
    title: 'De Wulk', 
    description: 'Website voor de viswinkel van Olivier & Kelly in Blankenberge, met dagverse vis, huisbereide gerechten, zeevruchtenschotels en bestelinformatie.',
    website: 'https://www.vishandelolivierenkelly.be', 
    casePath: '/cases/de-wulk-blankenberge/',
    videoSrc: '',
    imageSrc: '/images/cases/vishandel-2026.png',
    previewSrc: '/images/cases/previews/vishandel-2026.jpg',
    tags: ['Lokale handel', 'Horeca'],
  },
  {
    id: 'atelierrembrandt',
    title: 'Atelier Rembrandt',
    description: 'Digitale collectie voor zeldzame boeken, Oude Meesters en historische kunstobjecten, met aandacht voor onderzoek, documentatie en herkomst.',
    website: 'https://www.atelierrembrandt.com/',
    casePath: '/cases/atelier-rembrandt/',
    videoSrc: '',
    imageSrc: '/images/cases/atelierrembrandt-catalogus.png',
    previewSrc: '/images/cases/previews/atelierrembrandt-catalogus.jpg',
    tags: ['Kunst & antiquariaat', 'Collectie'],
  },
  {
    id: 'pwayment',
    title: 'PWAYMENT POS',
    description: 'Een retailplatform dat kassa, voorraad, klanten, webshop en inzichten samenbrengt voor Belgische winkels.',
    website: 'https://pwayment.vercel.app/',
    casePath: '/cases/pwayment-pos/',
    videoSrc: '/videos/pwayment.mp4',
    imageSrc: '/images/cases/pwayment.png',
    tags: ['Retailtech', 'POS-systeem'],
  },
  {
    id: 'mygrowise',
    title: 'MyGrowise',
    description: 'Een platform voor psychologisch inzicht en online begeleiding, met persoonlijke profielen, modules en heldere routes naar een professional.',
    website: 'https://mygrowise.vercel.app/',
    casePath: '/cases/mygrowise/',
    videoSrc: '',
    imageSrc: '/images/cases/mygrowise.png',
    tags: ['Online begeleiding', 'Digitaal platform'],
  },
  {
    id: 'welzijnswerking',
    title: 'Welzijnswerking Oostende',
    description: 'Een warme evenementensite voor kerstavond in het Kursaal: samen vieren voor alleenstaanden vanaf 50 jaar, met praktische informatie en een duidelijke inschrijfroute via de ontmoetingscentra.',
    website: 'https://www.welzijnswerking.be/',
    casePath: '/cases/welzijnswerking-oostende/',
    videoSrc: '',
    imageSrc: '/images/cases/welzijnswerking.png',
    showInGrid: false,
    tags: ['Sociaal initiatief', 'Oostende'],
  },
];

const Proof: React.FC = () => (
  <section className={styles.section} aria-label="Webaanzee en ons werk">
    <PortfolioDepth projects={caseStudies} />
  </section>
);

export default Proof;
