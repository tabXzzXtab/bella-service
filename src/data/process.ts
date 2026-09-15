import type { Locale } from '../i18n/config';
import type { MediaId } from './media';

/**
 * The steps between a visitor deciding to get in touch and the job being done.
 *
 * ⚠ Every claim here is traceable to the client's Bussiness-info.md: the
 * inspection is free, it is done by drone, it produces a written report and a
 * fixed price, it carries no obligation, the agents are environmentally
 * approved, and the finished work is guaranteed.
 *
 * Deliberately absent: **durations**. The reference design this page is modelled
 * on states how long each phase takes ("about five months", "about a month").
 * Bella has not given us any timings, and inventing them would be inventing
 * company facts. The only time commitment stated anywhere on this site is the
 * 24-hour reply, which comes from the client.
 *
 * `side` decides which side of the centre line a step sits on at desktop
 * widths. On phones every step collapses to a single left rail and `side` is
 * ignored — see ProcessTimeline.astro.
 */

export interface ProcessStep {
  kind: 'step';
  id: string;
  side: 'left' | 'right';
  title: Record<Locale, string>;
  body: Record<Locale, string[]>;
  /** Optional supporting image, shown opposite the text on wide screens. */
  media?: MediaId;
}

export interface ProcessMilestone {
  kind: 'milestone';
  id: string;
  label: Record<Locale, string>;
}

export type ProcessItem = ProcessStep | ProcessMilestone;

export const processItems: readonly ProcessItem[] = [
  {
    kind: 'step',
    id: 'kontakt',
    side: 'right',
    media: 'crew',
    title: { sv: 'Du hör av dig', en: 'You get in touch' },
    body: {
      sv: [
        'Ring, mejla eller fyll i formuläret. Berätta kort om taket — ålder, material och vad du har lagt märke till.',
        'Vi svarar inom 24 timmar.',
      ],
      en: [
        'Call, email or fill in the form. Tell us briefly about the roof — its age, the material and what you have noticed.',
        'We reply within 24 hours.',
      ],
    },
  },
  {
    kind: 'milestone',
    id: 'bokat',
    label: { sv: 'Besiktningen är bokad', en: 'The inspection is booked' },
  },
  {
    kind: 'step',
    id: 'besiktning',
    side: 'left',
    media: 'droneInspection',
    title: { sv: 'Kostnadsfri besiktning', en: 'Free inspection' },
    body: {
      sv: [
        'Vi kommer ut och går igenom taket. Drönaren fotograferar varje yta, även de som inte går att se från marken.',
        'Besiktningen är kostnadsfri och utan förpliktelse.',
      ],
      en: [
        'We come out and survey the roof. The drone photographs every surface, including the ones you cannot see from the ground.',
        'The inspection is free of charge and carries no obligation.',
      ],
    },
  },
  {
    kind: 'step',
    id: 'rapport',
    side: 'right',
    media: 'processReport',
    title: { sv: 'Rapport och fast pris', en: 'Report and fixed price' },
    body: {
      sv: [
        'Du får en skriftlig rapport med bilderna från drönaren och en tydlig åtgärdsplan.',
        'Priset är fast. Du bestämmer om och när vi går vidare.',
      ],
      en: [
        'You get a written report with the drone images and a clear plan of what needs doing.',
        'The price is fixed. You decide whether and when we go ahead.',
      ],
    },
  },
  {
    kind: 'milestone',
    id: 'beslut',
    label: { sv: 'Du bestämmer', en: 'The decision is yours' },
  },
  {
    kind: 'step',
    id: 'arbetet',
    side: 'left',
    media: 'taktvattWork',
    title: { sv: 'Vi utför arbetet', en: 'We do the work' },
    body: {
      sv: [
        'Skonsamma metoder och miljögodkända medel. Ingen högtryckstvätt som slår sönder pannorna.',
        'Vi rensar hängrännorna och städar efter oss.',
      ],
      en: [
        'Gentle methods and environmentally approved agents. No pressure washing to crack the tiles.',
        'We clear the gutters and clean up after ourselves.',
      ],
    },
  },
  {
    kind: 'milestone',
    id: 'klart',
    label: { sv: 'Taket är klart', en: 'The roof is finished' },
  },
] as const;

/** Just the steps, for numbering and for structured data. */
export const processSteps = processItems.filter(
  (item): item is ProcessStep => item.kind === 'step',
);
