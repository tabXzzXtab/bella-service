import type { Locale } from '../i18n/config';

/**
 * Company facts — the single source of truth for anything that appears in more
 * than one place: the header, the footer, the contact page, structured data for
 * search engines, and the emails the contact form sends.
 *
 * Every value below comes from the client's own `Bussiness-info.md` or from the
 * Swedish company register. Nothing here is invented. If you need a fact that is
 * not in this file, ask the client — do not fill the gap with something
 * plausible.
 */

/**
 * Marks a value that still needs the client to confirm it. It returns its
 * argument untouched — the only job is to make every unverified fact greppable.
 * Before launch, search this project for "PLACEHOLDER" and clear every hit.
 */
const PLACEHOLDER = <T>(value: T): T => value;

export interface PostalAddress {
  street: string;
  postalCode: string;
  city: string;
  /** ISO 3166-1 alpha-2. */
  country: string;
}

export const site = {
  /** Trading name, shown in the logo and page titles. */
  name: 'Bella Service',

  /** Registered legal name, used in the footer and structured data. */
  legalName: 'Bella Service AB',

  /** Swedish organisationsnummer. */
  orgNumber: '556788-2369',

  /**
   * VAT number, derived from the org number in the standard Swedish form
   * (SE + digits + 01). The client's internal records carry a malformed value,
   * so this is the computed one — have them confirm it against a real invoice.
   */
  vatNumber: PLACEHOLDER('SE556788236901'),

  /** Bankgiro, printed on quotes and in the footer. */
  bankgiro: '443-4551',

  /** Approved for F-skatt. Shown as a trust marker beside the org number. */
  approvedForFTax: true,

  /** Year the company was registered. 2009 is what makes "17+ år" true. */
  foundedYear: 2009,

  /**
   * Phone in two forms: `display` is what a human reads, `href` is E.164 for
   * the tel: link. Keep them in sync.
   */
  phone: {
    display: '0733-987 868',
    href: '+46733987868',
  },

  /**
   * The mailbox the site publishes. Note the domain: the company's site is
   * bellaserviceab.se, and the old info@bellaservice.se was a different domain
   * the company does not own — mail to it was going nowhere.
   */
  email: 'Kim@bellaserviceab.se',

  /** Registered address. Appears in the footer and in structured data. */
  address: {
    street: 'Söderto 3276',
    postalCode: '242 93',
    city: 'Hörby',
    country: 'SE',
  } satisfies PostalAddress,

  /**
   * How the company presents itself geographically. It is registered in Hörby
   * but trades as a Malmö/Skåne business, which is what the client asked to
   * show on the contact page.
   */
  presentsAs: {
    sv: 'Malmö, Skåne',
    en: 'Malmö, Skåne',
  } satisfies Record<Locale, string>,

  /** Stated service area, shown on the contact page. */
  serviceArea: {
    sv: 'Hela Skåne',
    en: 'All of Skåne',
  } satisfies Record<Locale, string>,

  /**
   * Towns named in structured data so local searches can match. This is the
   * schema.org `areaServed` list, not visible copy.
   */
  serviceAreaPlaces: [
    'Malmö',
    'Lund',
    'Helsingborg',
    'Kristianstad',
    'Hässleholm',
    'Hörby',
    'Höör',
    'Eslöv',
    'Ystad',
    'Landskrona',
  ],

  /** When the phone is answered. */
  openingHours: {
    sv: 'Mån–Fre 07:00–17:00',
    en: 'Mon–Fri 07:00–17:00',
  } satisfies Record<Locale, string>,

  /** Machine-readable opening hours for structured data. */
  openingHoursSpec: {
    days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    opens: '07:00',
    closes: '17:00',
  },

  /** Promised email response time, stated on the contact page. */
  emailResponse: {
    sv: 'Svarar inom 24 timmar',
    en: 'We reply within 24 hours',
  } satisfies Record<Locale, string>,

  /** Sits under the wordmark in the header. */
  positioning: {
    sv: 'Skånsk fastighetsvård',
    en: 'Property care in Skåne',
  } satisfies Record<Locale, string>,

  /** The company line, used in the footer and on share cards. */
  tagline: {
    sv: 'En gladare vardag för ditt tak',
    en: 'A brighter everyday life for your roof',
  } satisfies Record<Locale, string>,

  /**
   * Social profiles. Delete a line rather than leaving an empty URL — the
   * footer renders exactly the entries present here.
   */
  social: [] as ReadonlyArray<{ label: string; url: string }>,

  /**
   * Image used when a page is shared on social media, relative to /public.
   * Replace public/og-default.svg with a real 1200×630 photograph.
   */
  ogImage: '/og-default.svg',
} as const;

/**
 * Headline numbers on the start page.
 *
 * ⚠ "100% nöjda kunder" and "40 000+ tak tvättade" are absolute claims supplied
 * by the client. Swedish marknadsföringslagen requires them to be substantiable
 * on demand. Confirm what backs them before launch, or soften the wording.
 */
export const stats = [
  {
    id: 'years',
    value: '17+',
    label: { sv: 'år i branschen', en: 'years in the trade' },
  },
  {
    id: 'roofs',
    value: '40 000+',
    label: { sv: 'tak tvättade', en: 'roofs cleaned' },
  },
  {
    id: 'satisfaction',
    value: '100%',
    label: { sv: 'nöjda kunder', en: 'satisfied customers' },
  },
] as const satisfies ReadonlyArray<{
  id: string;
  value: string;
  label: Record<Locale, string>;
}>;

/** The three things the company says it stands for. */
export const pillars = [
  {
    id: 'hallbart',
    icon: 'leaf',
    eyebrow: { sv: 'Hållbart', en: 'Sustainable' },
    title: { sv: 'Miljövänliga metoder', en: 'Environmentally sound methods' },
    body: {
      sv: 'Skonsamma behandlingar som är säkra för både taket och trädgården under det.',
      en: 'Gentle treatments that are safe for the roof and for the garden underneath it.',
    },
  },
  {
    id: 'lokalt',
    icon: 'pin',
    eyebrow: { sv: 'Lokalt', en: 'Local' },
    title: { sv: 'Skånska hantverkare', en: 'Craftspeople from Skåne' },
    body: {
      sv: 'Rotade i Malmö. Vi känner de skånska husen, teglet och vädret som sliter på dem.',
      en: 'Rooted in Malmö. We know the houses of Skåne, the brick, and the weather that wears them down.',
    },
  },
  {
    id: 'tryggt',
    icon: 'shield',
    eyebrow: { sv: 'Tryggt', en: 'Reliable' },
    title: { sv: 'Fast pris & garanti', en: 'Fixed price & guarantee' },
    body: {
      sv: 'Tydlig offert innan vi börjar, garanti på utfört arbete och inga överraskningar efteråt.',
      en: 'A clear quote before we start, a guarantee on the work, and no surprises afterwards.',
    },
  },
] as const satisfies ReadonlyArray<{
  id: string;
  icon: string;
  eyebrow: Record<Locale, string>;
  title: Record<Locale, string>;
  body: Record<Locale, string>;
}>;

/** One-line address, for the footer and for mail signatures. */
export function formatAddress(address: PostalAddress): string {
  return `${address.street}, ${address.postalCode} ${address.city}`;
}

/** Years the company has been trading, for the footer copyright range. */
export function yearsTrading(now: Date = new Date()): number {
  return now.getFullYear() - site.foundedYear;
}
