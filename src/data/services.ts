import type { Locale } from '../i18n/config';
import type { IconName } from '../lib/icons';

/**
 * The six services listed on /tjanster and /services.
 *
 * Copy and pricing come from the client's `Bussiness-info.md`. The prices are
 * "från" figures — a starting rate, never a quote. Anywhere a price is rendered
 * it must keep that qualifier; see `formatPrice` below, which builds it in.
 *
 * To add a service: append an entry. Nothing else needs editing — the pages
 * iterate this array. `featured: true` also puts it on the start page.
 */

export type PriceUnit = 'sqm' | 'panel';

export type ServicePrice = { kind: 'free' } | { kind: 'from'; amount: number; unit: PriceUnit };

export interface Service {
  /** Stable id, used as the key and as an anchor target. */
  id: string;
  icon: IconName;
  title: Record<Locale, string>;
  summary: Record<Locale, string>;
  /** Concrete selling points. Keep to exactly 3 — this is a scan-list. */
  bullets: Record<Locale, string[]>;
  price: ServicePrice;
  /** Show on the start page. */
  featured: boolean;
}

export const services: readonly Service[] = [
  {
    id: 'taktvatt',
    icon: 'roof',
    featured: true,
    price: { kind: 'from', amount: 39, unit: 'sqm' },
    title: { sv: 'Taktvätt', en: 'Roof cleaning' },
    summary: {
      sv: 'Skonsam tvätt som tar bort mossa, alger och lav. Rätt utförd förlänger den livslängden på taket med upp till 15 år.',
      en: 'A gentle wash that removes moss, algae and lichen. Done properly it adds up to 15 years to the life of a roof.',
    },
    bullets: {
      sv: ['Miljögodkända medel', 'Skyddar tegel & betong', 'Rensar hängrännor'],
      en: ['Approved eco-friendly agents', 'Protects clay and concrete tile', 'Gutters cleared'],
    },
  },
  {
    id: 'takmalning',
    icon: 'brush',
    featured: true,
    price: { kind: 'from', amount: 129, unit: 'sqm' },
    title: { sv: 'Takmålning', en: 'Roof painting' },
    summary: {
      sv: 'Professionell målning med långtidshållbar takfärg. Taket får ett nytt utseende och ett skydd mot vädret som håller.',
      en: 'Professional painting with long-life roof paint. The roof gets a new look and weather protection that lasts.',
    },
    bullets: {
      sv: ['10 års garanti', 'Grundning + 2 skikt', 'Fri färgrådgivning'],
      en: ['10-year guarantee', 'Primer plus two coats', 'Free colour consultation'],
    },
  },
  {
    id: 'algbehandling',
    icon: 'leaf',
    featured: true,
    price: { kind: 'from', amount: 25, unit: 'sqm' },
    title: { sv: 'Algbehandling', en: 'Algae treatment' },
    summary: {
      sv: 'Långtidsverkande behandling som hindrar mossa och alger från att komma tillbaka i upp till fem år.',
      en: 'A long-acting treatment that keeps moss and algae from returning for up to five years.',
    },
    bullets: {
      sv: ['Skonsam för miljön', 'Verkar över tid', 'Ingen högtryckstvätt'],
      en: ['Kind to the environment', 'Works over time', 'No pressure washing'],
    },
  },
  {
    id: 'solpanelstvatt',
    icon: 'solar',
    featured: true,
    price: { kind: 'from', amount: 49, unit: 'panel' },
    title: { sv: 'Solpanelstvätt', en: 'Solar panel cleaning' },
    summary: {
      sv: 'Rena paneler producerar upp till 30 % mer el. Vi tvättar repfritt med avjoniserat vatten, utan kemikalier.',
      en: 'Clean panels produce up to 30% more electricity. We wash scratch-free with deionised water and no chemicals.',
    },
    bullets: {
      sv: ['Ökad energiproduktion', 'Repfri metod', 'Årlig serviceplan'],
      en: ['More energy produced', 'Scratch-free method', 'Annual service plan'],
    },
  },
  {
    id: 'takbesiktning',
    icon: 'drone',
    featured: true,
    price: { kind: 'free' },
    title: { sv: 'Takbesiktning', en: 'Roof inspection' },
    summary: {
      sv: 'Vi går igenom taket, fotodokumenterar med drönare och lämnar en tydlig åtgärdsplan med fast pris. Utan förpliktelse.',
      en: 'We survey the roof, document it by drone, and hand over a clear action plan at a fixed price. No obligation.',
    },
    bullets: {
      sv: ['Drönarbesiktning', 'Skriftlig rapport', 'Ingen förpliktelse'],
      en: ['Drone survey', 'Written report', 'No obligation'],
    },
  },
  {
    id: 'fasadtvatt',
    icon: 'facade',
    featured: false,
    price: { kind: 'from', amount: 35, unit: 'sqm' },
    title: { sv: 'Fasadtvätt', en: 'Facade cleaning' },
    summary: {
      sv: 'Fräschar upp putsade och målade fasader. Vi tar bort smuts, alger och sot varsamt, med rätt tryck för materialet.',
      en: 'Refreshes rendered and painted facades, lifting off dirt, algae and soot gently — at the right pressure for the material.',
    },
    bullets: {
      sv: ['Låg vattenförbrukning', 'Rätt tryck för materialet', 'Renar även socklar'],
      en: ['Low water use', 'Pressure matched to the material', 'Plinths cleaned too'],
    },
  },
];

/** Services shown on the start page, in data order. */
export const featuredServices = services.filter((service) => service.featured);

/** Look one up by id. Returns undefined rather than throwing. */
export function serviceById(id: string): Service | undefined {
  return services.find((service) => service.id === id);
}

const UNIT_LABEL: Record<PriceUnit, Record<Locale, string>> = {
  sqm: { sv: 'kr/m²', en: 'SEK/m²' },
  panel: { sv: 'kr/panel', en: 'SEK/panel' },
};

const FROM_LABEL: Record<Locale, string> = { sv: 'Från', en: 'From' };
const FREE_LABEL: Record<Locale, string> = { sv: 'Kostnadsfritt', en: 'Free of charge' };

/**
 * Renders a price for display. Always carries the "Från" qualifier, so no
 * caller can accidentally present a starting rate as a firm quote.
 */
export function formatPrice(price: ServicePrice, locale: Locale): string {
  if (price.kind === 'free') return FREE_LABEL[locale];
  return `${FROM_LABEL[locale]} ${price.amount} ${UNIT_LABEL[price.unit][locale]}`;
}

/** The numeral on its own, for skins that set the figure at display size. */
export function priceParts(
  price: ServicePrice,
  locale: Locale,
): { from: string | null; amount: string; unit: string | null } {
  if (price.kind === 'free') {
    return { from: null, amount: FREE_LABEL[locale], unit: null };
  }
  return {
    from: FROM_LABEL[locale],
    amount: String(price.amount),
    unit: UNIT_LABEL[price.unit][locale],
  };
}

/** Services the m² estimator can price. Excludes the free inspection. */
export const estimatorServices = services.filter(
  (service): service is Service & { price: Extract<ServicePrice, { kind: 'from' }> } =>
    service.price.kind === 'from',
);
