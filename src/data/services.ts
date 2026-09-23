import type { Locale } from '../i18n/config';
import type { IconName } from '../lib/icons';

/**
 * The six services listed on /tjanster and /services.
 *
 * Copy comes from the client's `Bussiness-info.md`.
 *
 * ⚠ There are no prices here, and there must not be. The client asked for
 * every figure off the site: services are presented on what they are, and a
 * price comes from a request. `Bussiness-info.md` still records the old
 * "från" rates — it is the client's own document and stays as it was — but
 * nothing under src/ reads them, and nothing should start.
 *
 * To add a service: append an entry. Nothing else needs editing — the pages
 * iterate this array. `featured: true` also puts it on the start page.
 */

/**
 * What a job is measured in.
 *
 * This is all the price-request panel needs: it asks for an area or a panel
 * count so the enquiry arrives with a size attached, never for money. `none`
 * is work that is not measured at all — the inspection.
 */
export type Measure = 'sqm' | 'panel' | 'none';

export interface Service {
  /** Stable id, used as the key and as an anchor target. */
  id: string;
  icon: IconName;
  title: Record<Locale, string>;
  summary: Record<Locale, string>;
  /** Concrete selling points. Keep to exactly 3 — this is a scan-list. */
  bullets: Record<Locale, string[]>;
  /** What a request for this service is quantified in. */
  measure: Measure;
  /** Show on the start page. */
  featured: boolean;
}

export const services: readonly Service[] = [
  {
    id: 'taktvatt',
    icon: 'roof',
    featured: true,
    measure: 'sqm',
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
    measure: 'sqm',
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
    measure: 'sqm',
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
    measure: 'panel',
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
    measure: 'none',
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
    measure: 'sqm',
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

/** Services the price-request panel can take a quantity for. */
export const quotableServices = services.filter((service) => service.measure !== 'none');
