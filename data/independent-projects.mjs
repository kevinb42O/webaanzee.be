import { pwaymentScreens } from './pwayment-screens.mjs';

// Personal projects have their own collection, separate from client cases.
const image = (project, name, width, height, alt, caption, widths = [800, 1440, 2400]) => ({
  src: `/images/eigen-projecten/${project}/${name}-${widths.includes(1440) ? 1440 : 800}.webp`,
  srcSet: widths.map(size => `/images/eigen-projecten/${project}/${name}-${size}.webp ${size}w`).join(', '),
  full: `/images/eigen-projecten/${project}/${name}-${widths.at(-1)}.webp`,
  width, height, alt, caption,
});

export const independentProjects = [
  {
    slug: 'velvet', title: 'Velvet', kind: 'Digital Audio Workstation', platform: 'DAW · Native desktopsoftware',
    path: '/eigen-projecten/velvet/', status: 'Eigen project · In ontwikkeling', updated: '2026-11-18',
    headline: 'Een complete DAW voor compositie, sounddesign en mixing.',
    summary: 'Velvet is een Digital Audio Workstation met eigen synthesizers, een sampler, mixer, effecten en automation. Van expressieve noten en ritmepatterns tot volledige arrangementen, met ondersteuning voor VST3-plug-ins en MIDI/MPE.',
    ideaTitle: 'Van de eerste noot tot de volledige mix.',
    idea: 'In Velvet componeer je melodieën, programmeer je drums, bewerk je audio en bouw je volledige arrangementen. Eigen instrumenten, effecten, automation en de mixer vormen samen één productieomgeving. De expressieve notenbewerking laat je toonhoogte en beweging rechtstreeks tekenen.',
    hero: image('velvet', 'velvet-arrangement-automation', 2880, 1800,
      'Velvet met gekleurde audioclips, waveforms, een automationcurve en de samplebrowser',
      'Een arrangement in Velvet, met audioclips en bewerkbare automation.'),
    sections: [
      {
        title: 'Een ritme. Meerdere stemmen.',
        text: 'In de patternomgeving komen ritmestappen en instrumentlijnen bij elkaar. Elk kanaal heeft zijn eigen klank, volume en plaats in het stereobeeld. Patterns vormen vervolgens de bouwstenen van een arrangement.',
        image: image('velvet', 'velvet-pattern', 2880, 940,
          'Patternomgeving van Velvet met kick, gesloten hi-hat en instrumentlijnen',
          'De patternomgeving combineert ritmestappen met melodische instrumenten. Uitsnede van de werkruimte.'),
      },
      {
        title: 'Serein. Een eigen wavetable-synthesizer.',
        text: 'Serein is een van de synthesizers in Velvet, met wavetable-oscillatoren, filters, envelopes en LFO’s. Je ontwerpt klanken en stuurt hun beweging met modulatie. De golfvormen en curves tonen hoe die klank wordt opgebouwd.',
        image: image('velvet', 'velvet-serein', 2880, 1800,
          'Serein by Velvet met twee wavetable-oscillatoren, een filter en modulatiecurves',
          'Serein, de ingebouwde synthesizer van Velvet.'),
      },
      {
        title: 'Klank vormgeven tot in het detail.',
        text: 'Copperhead is een van de eigen audio-effecten in Velvet. Het combineert filtering, vervorming en dynamiek, met een X–Y-bediening om parameters tegelijk te sturen. De effectinterface is ontworpen voor directe controle over de klank.',
        image: image('velvet', 'velvet-copperhead', 2034, 1362,
          'Copperhead-effect met filter, drive, X–Y-bediening en uitgangsmeters',
          'Copperhead: een eigen effectinterface binnen Velvet.', [800, 1440, 2034]),
      },
    ],
    contribution: 'Ik ontwerp en ontwikkel de DAW: de audiomotor, synthesizers, sampler, effecten, mixer, sequencer en interface. Ook automation, plug-inhosting en projectopslag maken deel uit van het werk. De technische uitdaging zit in de samenhang: alle onderdelen moeten tijdens het componeren en afspelen in realtime samenwerken.',
    systems: [
      ['Realtime audio en bediening', 'De audiomotor verwerkt instrumenten, samples en effecten terwijl de interface bewerkbaar blijft. Audioverwerking en bediening vragen om een zorgvuldige verdeling van het werk.'],
      ['Mixing en automation', 'De mixer brengt kanalen, effecten en routing samen. Met automation veranderen parameters mee met het arrangement.'],
      ['Werk bewaren', 'Noten, patterns, klanken en instellingen komen samen in een project dat opnieuw geopend en verder bewerkt kan worden.'],
      ['Plug-ins en expressie', 'Velvet host VST3-plug-ins naast de eigen instrumenten en effecten. MIDI en MPE verbinden de DAW met externe instrumenten en expressieve controllers.'],
    ],
    stack: ['C++17', 'JUCE', 'CMake', 'MIDI / MPE', 'VST3'],
    credits: 'Velvet bouwt op het JUCE-framework. Externe plug-ins, samples en andere gebruikte bronnen blijven het werk van hun makers; de screenshots tonen ook geïmporteerd samplemateriaal.',
    cta: 'Bespreek je software-idee', ctaTitle: 'Een eigen idee voor software?',
  },
  {
    slug: 'sunline', title: 'Sunline', kind: '3D-multiplayergame', platform: 'Browsergame · WebRTC-multiplayer',
    path: '/eigen-projecten/sunline/', status: 'Eigen project · In ontwikkeling', updated: '2026-11-18',
    headline: 'Een 3D-wereld met een eigen multiplayerarchitectuur.',
    summary: 'Sunline is een multiplayergame in de browser. Ik ontwikkel de netwerktechniek, simulatie en 3D-interactie: van gesynchroniseerde spelers en voertuigen tot terreinbewerking, bouwen en het bewaren van de gedeelde wereld.',
    ideaTitle: 'Eén simulatie, meerdere spelers.',
    idea: 'Spelers veranderen in Sunline dezelfde wereld: ze bewerken terrein, bouwen constructies en besturen voertuigen. De host beheert de simulatie; andere spelers ontvangen de wereldtoestand via WebRTC. De architectuur houdt rekening met netwerkvertraging, later aansluiten en opnieuw verbinden, zodat spelers met dezelfde voortgang verder kunnen.',
    hero: image('sunline', 'sunline-pier', 1920, 1080,
      'Overzicht van een lange pier met een rond paviljoen aan de kust van Sunline',
      'De 3D-omgeving van Sunline, met constructies in een bewerkbare spelwereld.', [800, 1440, 1920]),
    sections: [
      {
        title: 'Voertuigen in een gedeelde simulatie.',
        text: 'Boten en andere voertuigen verbinden besturing, bewegingssimulatie en netwerksynchronisatie. De host bepaalt hun toestand; de andere spelers zien bewegingen via interpolatie tussen ontvangen updates. Ook passagiers en hun positie ten opzichte van een bewegend voertuig moeten daarin blijven kloppen.',
        image: image('sunline', 'sunline-boot', 1440, 900,
          'Een bestuurbare boot bij een houten aanlegsteiger, met bergen en bomen in Sunline',
          'Een bestuurbare boot in de gedeelde wereld van Sunline.', [800, 1440]),
      },
      {
        title: 'Wereldsynchronisatie en voortgang.',
        text: 'Een nieuwe speler moet de actuele wereld ontvangen, inclusief terreinwijzigingen, bouwwerken en voortgang. Sunline verstuurt die blijvende gegevens apart van snelle bewegingsupdates. Identiteiten en inventarissen blijven bewaard, zodat opnieuw verbinden de speler terugbrengt naar dezelfde voortgang.',
        image: image('sunline', 'sunline-kampvuur', 1280, 900,
          'Meerdere spelers zitten in Sunline rond een verlicht kampvuur onder de nachtelijke hemel',
          'Meerdere verbonden spelers in dezelfde wereld, met een gedeelde dag-nachtcyclus.', [800, 1280]),
      },
    ],
    contribution: 'Ik ontwerp en ontwikkel de multiplayerarchitectuur, spelsimulatie en de integratie met de Three.js-renderer. Daaronder vallen wereldsynchronisatie, bewegingsvoorspelling, betrouwbare spelacties en opslag. Terreinbewerking, bouwen en transport gebruiken diezelfde basis. Ik werk ook aan de besturing, interface en rendering van de spelwereld.',
    systems: [
      ['Multiplayerarchitectuur', 'De host berekent de gedeelde simulatie. Lokale bewegingsvoorspelling geeft directe respons op de besturing; correcties vanuit de host houden de speler gelijk met de simulatie. Andere spelers en voertuigen worden geïnterpoleerd tussen netwerkupdates.'],
      ['Wereldsynchronisatie', 'Beweging en blijvende wereldwijzigingen gebruiken aparte WebRTC-datakanalen. Nieuwe spelers ontvangen eerst een volledige wereldtoestand en daarna wijzigingen per revisie. Compacte bewegingsupdates en begrensde verzendwachtrijen beperken het netwerkverkeer.'],
      ['Betrouwbare spelacties', 'Bouwen en materiaaltransacties krijgen een bevestiging van de host. Onbevestigde acties worden opnieuw verstuurd met hetzelfde verzoeknummer, zodat een herhaling niet dubbel bouwt of materialen afschrijft.'],
      ['Opslag en verbindingsherstel', 'De wereld wordt lokaal opgeslagen met IndexedDB en herstelkopieën. Een terugkerende speler behoudt zijn identiteit en inventaris. Bij verbindingsverlies voorkomt de client dat spelers verder handelen met een verouderde wereldtoestand.'],
      ['3D-rendering en interactie', 'Terreinbewerking, constructies en voertuigen komen samen in de Three.js-omgeving. De gedeelde dag-nachtcyclus stuurt de verlichting; besturing, cameragedrag en bewegende objecten sluiten aan op de simulatie.'],
    ],
    stack: ['TypeScript', 'React', 'Three.js', 'WebRTC'],
    credits: 'Sunline gebruikt naast eigen code en vormgeving ook externe modellen en materialen. Die assets blijven het werk van hun oorspronkelijke makers.',
    cta: 'Bespreek een interactieve toepassing', ctaTitle: 'Een idee dat om interactie vraagt?',
  },
];

// PWAYMENT already has a product page; show it alongside the project stories
// without generating a second page for the same software.
export const independentProjectPreviews = [
  {
    slug: 'pwayment', title: 'PWAYMENT POS', path: '/pwayment.html',
    status: 'Eigen softwareproduct · Retailplatform',
    headline: 'Kassa, voorraad en klanten in één retailplatform.',
    summary: 'Ik ontwikkel de kassa en de achterliggende verkoop- en voorraadadministratie, met productvarianten, klantbeheer en rapportage. Producten, verkopen en voorraadbewegingen zijn binnen dezelfde toepassing met elkaar verbonden.',
    hero: pwaymentScreens[0],
  },
  ...independentProjects,
];
