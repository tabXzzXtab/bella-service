import type { Locale } from '../i18n/config';

/**
 * The company policy, from the client's 1Arbetsmiljöpolysi.docx.
 *
 * The body text is the document's own wording, with its typos corrected
 * ("etiska ler" → "etiska regler", "affärmanna skap" → "affärsmannaskap").
 * The short `title` on each item is ours: a scannable handle for the sentence
 * beneath it, never a new claim.
 *
 * Left out on purpose: the "Jag har tagit del av…" sign-off block at the end
 * of the document. It is an internal acknowledgement form for staff, not
 * something a customer reads.
 */

type Text = Record<Locale, string>;

export interface PolicyItem {
  title: Text;
  body: Text;
}

export interface PolicyPillar {
  /** Anchor id and chapter-nav key. */
  id: string;
  /** Label in the chapter bar. */
  short: Text;
  title: Text;
  items: PolicyItem[];
}

export interface CustomerPromise extends PolicyItem {
  /** Where in the course of a visit the promise applies. Ours, for order. */
  moment: Text;
}

export const policyMeta = {
  version: '1.0',
  /** ISO date; formatted per locale where it is shown. */
  date: '2026-09-28',
  approvedBy: 'Kim Öhlander',
} as const;

export const policyIntro: Text[] = [
  {
    sv: 'I allt vi gör vill vi överträffa våra kunders förväntningar och erbjuda ett mervärde. Och våra medarbetare är vår viktigaste resurs för att leverera detta.',
    en: 'In everything we do, we want to exceed our customers’ expectations and offer added value. Our employees are our most important resource for delivering it.',
  },
  {
    sv: 'På Bella Service AB pågår därför ett ständigt förbättringsarbete som ska utveckla vår verksamhet för att erbjuda säkra och hållbara lösningar för såväl våra medarbetare och kunder som miljön. Vi förbinder oss också att följa lagar och krav.',
    en: 'That is why Bella Service AB is continuously improving how we work, to offer safe and sustainable solutions for our employees, our customers and the environment alike. We are also committed to following all laws and requirements.',
  },
];

/** 1.1 Företagspolicy — the three "Vi ska säkerställa att" lists. */
export const policyPillars: PolicyPillar[] = [
  {
    id: 'arbetsmiljo',
    short: { sv: 'Arbetsmiljö', en: 'Work environment' },
    title: { sv: 'Arbetsmiljö och medarbetare', en: 'Work environment and people' },
    items: [
      {
        title: { sv: 'Hälsa och säkerhet planeras in', en: 'Health and safety planned in' },
        body: {
          sv: 'Allt arbete planeras och ordnas så att det ger förutsättningar för god hälsa och säkerhet. Samtliga involverade ska känna delaktighet och samverkan vid beslut och uppföljning.',
          en: 'All work is planned and organised to support good health and safety. Everyone involved should feel included and able to take part in decisions and follow-up.',
        },
      },
      {
        title: { sv: 'Tydliga roller', en: 'Clear roles' },
        body: {
          sv: 'Vi har en tydlig rollfördelning enligt organisationsplan och uppdragsbeskrivning. Tilldelade arbetsuppgifter framgår av rollbeskrivningar.',
          en: 'Roles are clearly divided according to our organisation plan and assignment descriptions. Each person’s tasks are set out in a role description.',
        },
      },
      {
        title: { sv: 'Säker utrustning', en: 'Safe equipment' },
        body: {
          sv: 'Maskiner, fordon, redskap och andra tekniska hjälpmedel och anordningar ska vara i sådant skick att de erbjuder betryggande säkerhet. Detta gäller även all personlig skyddsutrustning.',
          en: 'Machines, vehicles, tools and other technical equipment are kept in a condition that makes them reliably safe. The same goes for all personal protective equipment.',
        },
      },
      {
        title: { sv: 'Alla behandlas lika', en: 'Everyone is treated equally' },
        body: {
          sv: 'Alla individer oavsett kön, ålder, funktionshinder, sexuell läggning, religiös eller etnisk tillhörighet behandlas lika och känner en gemenskap inom företaget.',
          en: 'Everyone, regardless of gender, age, disability, sexual orientation, religion or ethnicity, is treated equally and feels part of the company.',
        },
      },
      {
        title: { sv: 'Plats för familjeliv', en: 'Room for family life' },
        body: {
          sv: 'Arbetet ska vara förenligt med ett familjeliv.',
          en: 'Work should be compatible with family life.',
        },
      },
      {
        title: { sv: 'Trygga medarbetare', en: 'People who feel secure' },
        body: {
          sv: 'Våra medarbetare är nöjda och känner sig trygga i sin arbetsmiljö.',
          en: 'Our employees are content and feel secure in their work environment.',
        },
      },
    ],
  },
  {
    id: 'kvalitet',
    short: { sv: 'Kvalitet', en: 'Quality' },
    title: { sv: 'Kvalitet och säkerhet', en: 'Quality and safety' },
    items: [
      {
        title: { sv: 'Vi lyssnar', en: 'We listen' },
        body: {
          sv: 'Vi är lyhörda för våra medarbetares och kunders synpunkter och strävar efter att uppfylla deras respektive behov och överträffa deras förväntningar.',
          en: 'We listen to the views of our employees and customers, and aim to meet their needs and exceed their expectations.',
        },
      },
      {
        title: { sv: 'Säkert och lätt att sköta', en: 'Safe and easy to maintain' },
        body: {
          sv: 'Samtliga anläggningar och installationer utformas och utförs säkra samt underhålls- och skötselvänliga.',
          en: 'Every installation is designed and built to be safe and easy to maintain.',
        },
      },
      {
        title: { sv: 'Yrkeskunnigt folk', en: 'Skilled people' },
        body: {
          sv: 'Arbeten utförs av yrkeskunniga medarbetare med god erfarenhet och med relevant, uppdaterad och verifierad kunskap inom relevanta områden.',
          en: 'Work is carried out by skilled, experienced people with relevant, up-to-date and verified knowledge in their field.',
        },
      },
      {
        title: { sv: 'Allt dokumenteras', en: 'Everything is documented' },
        body: {
          sv: 'Alla arbeten planeras, utförs, kontrolleras och dokumenteras enligt företagets instruktioner.',
          en: 'All work is planned, carried out, checked and documented according to the company’s instructions.',
        },
      },
    ],
  },
  {
    id: 'miljo',
    short: { sv: 'Miljö', en: 'Environment' },
    title: { sv: 'Miljö', en: 'Environment' },
    items: [
      {
        title: { sv: 'Minsta möjliga påverkan', en: 'The smallest possible impact' },
        body: {
          sv: 'Vi, i allt vi gör, åstadkommer så liten negativ miljöpåverkan som möjligt och därmed undviker att orsaka miljöföroreningar.',
          en: 'In everything we do, we keep our negative impact on the environment as small as possible and avoid causing pollution.',
        },
      },
      {
        title: { sv: 'Bättre materialval', en: 'Better material choices' },
        body: {
          sv: 'Vi i möjligaste mån föreslår energieffektiva lösningar samt väljer material och produkter som innebär ett bra miljöval och underlättar för återvinning.',
          en: 'Wherever we can, we suggest energy-efficient solutions and choose materials and products that are a good environmental choice and easy to recycle.',
        },
      },
      {
        title: { sv: 'Källsortering', en: 'Waste sorted at source' },
        body: {
          sv: 'Vi har en effektiv avfallshantering som inkluderar källsortering.',
          en: 'We handle waste efficiently, including sorting it at source.',
        },
      },
    ],
  },
];

/** 1.2 Etikpolicy. */
export const ethics = {
  lead: {
    sv: 'Bella Service AB:s etiska regler är grunden för vår existens och gäller alla anställda, i all verksamhet, i alla situationer, överallt och alltid.',
    en: 'Bella Service AB’s ethical rules are the foundation of our existence. They apply to every employee, in all our work, in every situation, everywhere and always.',
  } satisfies Text,

  /** The document's zero-tolerance list, word for word. */
  zeroTolerance: [
    { sv: 'Bestickning', en: 'Bribery' },
    { sv: 'Mutor', en: 'Kickbacks' },
    { sv: 'Korruption', en: 'Corruption' },
    { sv: 'Diskriminering', en: 'Discrimination' },
    { sv: 'Hot', en: 'Threats' },
    { sv: 'Trakasserier', en: 'Harassment' },
  ] satisfies Text[],

  principles: [
    {
      title: { sv: 'God affärssed', en: 'Good business practice' },
      body: {
        sv: 'Vi tillåter aldrig åtgärder eller beteenden som avviker från god affärssed, affärsmannaskap och hederlig konkurrens.',
        en: 'We never allow actions or behaviour that depart from good business practice, sound business conduct and fair competition.',
      },
    },
    {
      title: { sv: 'Inga karteller', en: 'No cartels' },
      body: {
        sv: 'Vi tar avstånd från varje form av karteller som äventyrar den marknadsmässiga konkurrensen.',
        en: 'We reject every kind of cartel that threatens fair market competition.',
      },
    },
    {
      title: { sv: 'Lag och rätt', en: 'Law and fairness' },
      body: {
        sv: 'Självklart följer vi gällande lagar och samhällets bestämmelser och vi åtar oss inte uppdrag som strider mot allmän rättsuppfattning.',
        en: 'Of course we follow the law and society’s rules, and we do not take on work that goes against the general sense of what is right.',
      },
    },
    {
      title: { sv: 'Tydliga avtal', en: 'Clear agreements' },
      body: {
        sv: 'Allt samarbete med beställare, kunder och underleverantörer ska alltid präglas av korrekta affärsrelationer, tydliga överenskommelser och avtal samt ömsesidig respekt.',
        en: 'All work with clients, customers and subcontractors is built on proper business relationships, clear agreements and contracts, and mutual respect.',
      },
    },
  ] satisfies PolicyItem[],

  closing: {
    sv: 'Det våra kunder anlitar oss för och behöver, det ska vi leverera tack vare kompetens och resurser som garanterar ett bra jobb. De etiska reglerna ingår i vår affärsverksamhet och är samtidigt ett löfte till våra kunder och samarbetsparter.',
    en: 'What our customers hire us for and need, we deliver, with the skills and resources that guarantee a good job. Our ethical rules are part of how we do business, and they are also a promise to our customers and partners.',
  } satisfies Text,
};

/** 1.3 Kundpolicy. */
export const customerPromises: CustomerPromise[] = [
  {
    moment: { sv: 'Innan vi kommer', en: 'Before we arrive' },
    title: { sv: 'Vi håller tiden', en: 'We turn up on time' },
    body: {
      sv: 'Vi kommer när vi har lovat. Vid eventuella förhinder meddelar vi kunden i så god tid som möjligt.',
      en: 'We arrive when we said we would. If something gets in the way, we let you know as early as we can.',
    },
  },
  {
    moment: { sv: 'I dörren', en: 'At the door' },
    title: { sv: 'Skorna av', en: 'Shoes off' },
    body: {
      sv: 'Vi presenterar oss på ett artigt sätt och tar av skorna eller använder skoskydd om det behövs för att inte smutsa ned eller skada golvet.',
      en: 'We introduce ourselves politely and take our shoes off, or wear shoe covers, when needed so we do not dirty or damage your floor.',
    },
  },
  {
    moment: { sv: 'Medan vi arbetar', en: 'While we work' },
    title: { sv: 'Telefonen på ljudlöst', en: 'Phone on silent' },
    body: {
      sv: 'Vi har telefon i tyst läge hos kund och ringer då inte samtal som gäller andra uppdrag.',
      en: 'Our phones are on silent at your home, and we do not make calls about other jobs while we are there.',
    },
  },
  {
    moment: { sv: 'Medan vi arbetar', en: 'While we work' },
    title: { sv: 'Vi frågar först', en: 'We ask first' },
    body: {
      sv: 'Vi nyttjar inte kundens egendom (till exempel verktyg, städutrustning, kök eller WC) om vi inte har frågat och fått tillåtelse.',
      en: 'We do not use your property (tools, cleaning equipment, kitchen or toilet, for example) unless we have asked and been given permission.',
    },
  },
  {
    moment: { sv: 'När vi har gått', en: 'After we leave' },
    title: { sv: 'Det stannar hos oss', en: 'It stays with us' },
    body: {
      sv: 'Vi respekterar kundens integritet och sprider inte information om det vi har sett eller hört hos kund.',
      en: 'We respect your privacy and never pass on anything we have seen or heard in your home.',
    },
  },
];

/** Total "Vi ska säkerställa att" items across the three pillars. */
export const commitmentCount = policyPillars.reduce((sum, pillar) => sum + pillar.items.length, 0);
