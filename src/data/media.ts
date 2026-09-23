import type { Locale } from '../i18n/config';

/**
 * Every image the site needs, registered before any of them exist.
 *
 * This file has three jobs at once:
 *
 *  1. It lets `<Placeholder>` reserve the exact space an image will occupy, so
 *     dropping the real photograph in later cannot shift the layout by a pixel.
 *  2. It is the client's shoot list — `brief` says what to photograph.
 *  3. It is the AI generation queue — `prompt` plus the STYLE_DNA suffix below
 *     produces a set of images that look like one shoot rather than thirty
 *     unrelated pictures.
 *
 * To ship a real image: put the file in /public/media/, set `src` to its path,
 * and leave everything else alone. `<Placeholder>` renders the photo instead of
 * the stand-in as soon as `src` is present.
 *
 * ⚠ The slots below are split into two groups: the ones the client's own
 * photographs now fill, and the ones still waiting on a photograph. Do not fill
 * a slot with an image of something else. The `alt` text is a factual statement
 * about the picture — if the picture changes, the alt text changes with it.
 */

/**
 * Appended verbatim to every generation prompt. Changing one image's subject is
 * fine; changing this string means regenerating all of them, because this is
 * the only thing making them a set.
 */
export const STYLE_DNA =
  'shot on 35mm, overcast Scandinavian daylight, muted terracotta and slate palette, ' +
  'natural texture, no people looking at camera, no text, no logos, no watermark, photorealistic';

export type AspectRatio = '4:1' | '2:1' | '3:2' | '4:3' | '16:9' | '1:1' | '4:5';

export interface MediaSlot {
  id: string;
  /** Path under /public once the real asset lands. `null` until then. */
  src: string | null;
  /**
   * Optional silent clip, played in place of `src`. When this is set, `src`
   * becomes the poster frame — so it must be a still from this very clip, or
   * the slot flickers to a different scene the moment playback starts.
   *
   * Only for footage that says something a still cannot: water moving, a
   * surface changing. A video that could have been a photograph should be one.
   */
  video?: string;
  aspect: AspectRatio;
  /** Alt text. Written now so it is never an afterthought. */
  alt: Record<Locale, string>;
  /** What the client should photograph. Plain language, for a human. */
  brief: string;
  /** Generation prompt. STYLE_DNA is appended automatically. */
  prompt: string;
}

/** Aspect ratio as a CSS `aspect-ratio` value. */
export const ASPECT_CSS: Record<AspectRatio, string> = {
  /* A letterbox strip, for a frame that was cropped panoramic to begin with. */
  '4:1': '4 / 1',
  '2:1': '2 / 1',
  '3:2': '3 / 2',
  '4:3': '4 / 3',
  '16:9': '16 / 9',
  '1:1': '1 / 1',
  '4:5': '4 / 5',
};

/** Said instead of a generation prompt for anything the client photographed. */
const REAL = 'not generated — this is a real photograph supplied by the client';

/**
 * Appended to the brief of every slot that used to hold a shot of someone
 * working at height with nothing holding them on.
 *
 * Those files are deleted, not merely unreferenced, so a future edit cannot
 * quietly point a slot back at one.
 */
const SAFETY =
  '⚠ The shot that used to sit here showed a worker on a roof with no harness, ' +
  'no line and no edge protection. It is gone on purpose. Nothing goes in this ' +
  'slot that shows someone working at height without visible fall protection — ' +
  "it advertises an unsafe method as the company's own practice, and it is the " +
  'first thing an arbetsmiljö complaint would cite.';

export const media = {
  // ───────────────────────────────────────────────────────────────────────
  // Filled from the client's own photographs and footage.
  // ───────────────────────────────────────────────────────────────────────

  homeHero: {
    id: 'homeHero',
    src: '/media/home-header.jpg',
    aspect: '3:2',
    alt: {
      sv: 'Hantverkare med andningsskydd som arbetar vid en fasad',
      en: 'A tradesperson in a respirator working at a building facade',
    },
    brief:
      'Supplied by the client for the start page header. Note it shows dusty cutting work at a building site rather than any of the six roof-care services.',
    prompt: REAL,
  },

  transformBefore: {
    id: 'transformBefore',
    src: '/media/transform-before.jpg',
    aspect: '3:2',
    alt: {
      sv: 'Altan med betongplattor före rengöring, ogräs mellan plattorna',
      en: 'A paved terrace before cleaning, with weeds growing between the slabs',
    },
    brief:
      'The BEFORE half of the slider. Supplied by the client. Paired with transformAfter — identical camera position, which is the only reason the wipe reads as the same place.',
    prompt: REAL,
  },

  transformAfter: {
    id: 'transformAfter',
    src: '/media/transform-after.jpg',
    aspect: '3:2',
    alt: {
      sv: 'Samma altan efter rengöring, plattorna rena och fria från ogräs',
      en: 'The same terrace after cleaning, the slabs clear of weeds and dirt',
    },
    brief: 'The AFTER half of the slider. Supplied by the client, same framing as transformBefore.',
    prompt: REAL,
  },

  /**
   * A whole finished roof. Used on two different pages: the process page
   * hero, and the "Osäker på vad ditt tak behöver?" closer on the services
   * page. Named for its subject rather than for one slot, because both slots
   * want the same thing — the roof the copy beside them is talking about.
   */
  roofClean: {
    id: 'roofClean',
    src: '/media/roof-brick-house.jpg',
    aspect: '3:2',
    alt: {
      sv: 'Rent tak på ett rött tegelhus, med skorsten mot klarblå himmel',
      en: 'A clean roof on a red brick house, its chimney against a clear blue sky',
    },
    brief:
      'Client photograph. A whole roof, finished and empty of people, which is what the page is actually about — and it opens the page on the result rather than on the labour. ' +
      SAFETY,
    prompt: REAL,
  },

  /** Process page, the closing band. */
  finishedJob: {
    id: 'finishedJob',
    src: '/media/job-site-wide.jpg',
    aspect: '4:1',
    alt: {
      sv: 'Bella Services servicebil vid ett hus, med stege och avspärrning uppställd mot taket',
      en: "Bella Service's van at a house, with a ladder and cordon set up against the roof",
    },
    brief:
      'Client photograph, supplied already cropped panoramic — hence the 4:1 slot, which is the only one on the site. It carried the words "Klart" and "Med garanti på utfört arbete" until the client asked for the band to be the photograph and nothing else, so the overlay and the scrim that made it legible are both gone. It is also the one frame that shows the site marked out and the ladder footed, which is the safety story the deleted roof shots told the wrong way round.',
    prompt: REAL,
  },

  taktvattWork: {
    id: 'taktvattWork',
    src: '/media/rent-foam.jpg',
    aspect: '4:3',
    alt: {
      sv: 'Rengöringsmedel som ligger och verkar över en stenlagd yta',
      en: 'Cleaning agent left to work across a paved surface',
    },
    brief:
      'Client photograph, and it belongs to exactly one slot: the "Vi utför arbetet" step of the process timeline. It sits beside copy about gentle methods and no pressure washing, and an agent left standing on the surface to do the work over time is that argument in a picture — better than the lance footage it replaced, which showed water under pressure beside a sentence denying it. But the surface is paving, not a roof, so it only works where the copy is about METHOD. It was briefly also on the services page under a heading asking what your roof needs, where it read as a photograph of a driveway next to a sentence about roofs. Do not point roof copy at this file. ' +
      SAFETY,
    prompt: REAL,
  },

  crew: {
    id: 'crew',
    src: '/media/crew.jpg',
    aspect: '3:2',
    alt: {
      sv: 'Två av Bella Services hantverkare vid företagets servicebil',
      en: 'Two of the Bella Service crew beside the company van',
    },
    brief:
      'Client photograph. The actual people, the actual van. The whole value of this image is that it is really them, so it must never be swapped for stock photography.',
    prompt: REAL,
  },

  // ───────────────────────────────────────────────────────────────────────
  // Still to photograph. These render as stand-in panels until a file lands.
  //
  // None of these is placed in a component. They stay here as the shoot list:
  // four of the six services have no photograph of their own.
  //
  // The drone-inspection and inspection-report stand-ins used to live here and
  // rendered as grey panels in the process timeline. They are gone: a slot that
  // ships as an empty box is worse than a step with no picture. Photograph the
  // drone in the air and the printed report on a table, add the entries back,
  // and re-attach them in src/data/process.ts — the steps are commented to say
  // exactly where.
  // ───────────────────────────────────────────────────────────────────────

  heroRoofBefore: {
    id: 'heroRoofBefore',
    src: null,
    aspect: '3:2',
    alt: {
      sv: 'Ett tak före behandling, täckt av mossa och alger',
      en: 'A roof before treatment, covered in moss and algae',
    },
    brief:
      'The BEFORE half of a roof transformation. Only works paired with an AFTER from the same camera position and lens — identical framing is the entire point.',
    prompt:
      'aerial drone view angled down across a neglected red clay tile roof of a Swedish detached house, ' +
      'thick green-black moss and lichen filling the joints between tiles, streaked and darkened, ' +
      'identical camera position and framing to a clean version of the same roof',
  },

  takmalningWork: {
    id: 'takmalningWork',
    src: null,
    aspect: '4:3',
    alt: {
      sv: 'Nymålat tak i jämn, mättad kulör',
      en: 'A freshly painted roof in an even, saturated colour',
    },
    brief:
      'Close-ish shot of a newly painted concrete tile roof. The point is the evenness of the finish and the sharp edge where paint meets flashing. Takmålning is the highest-priced service on the site and has no photograph of its own.',
    prompt:
      'close view across a freshly painted concrete tile roof in deep terracotta, ' +
      'perfectly even matte finish, sharp clean edge where the paint meets grey metal flashing',
  },

  solarPanels: {
    id: 'solarPanels',
    src: null,
    aspect: '16:9',
    alt: {
      sv: 'Rengjorda solpaneler på ett villatak',
      en: 'Cleaned solar panels on a house roof',
    },
    brief: 'A run of solar panels on a roof, clean and reflecting an overcast sky.',
    prompt:
      'a row of clean dark solar panels mounted on a Swedish house roof, ' +
      'reflecting a soft overcast sky, tile roof visible around the array',
  },

  fasadWork: {
    id: 'fasadWork',
    src: null,
    aspect: '4:3',
    alt: {
      sv: 'Putsad fasad, halvt rengjord',
      en: 'A rendered facade, half cleaned',
    },
    brief:
      'A rendered wall mid-clean, with a hard line between the dirty and the clean side. The most persuasive single frame we can get for fasadtvätt.',
    prompt:
      'a rendered pale facade of a Swedish house being washed, ' +
      'a clear vertical line across the wall between grimy algae-stained render and bright clean render',
  },
} as const satisfies Record<string, MediaSlot>;

export type MediaId = keyof typeof media;

/** Full generation prompt for one slot, STYLE_DNA included. */
export function generationPrompt(id: MediaId): string {
  return `${media[id].prompt}. STYLE DNA: ${STYLE_DNA}.`;
}

/** Slots still waiting on a real file. Empty means the site is shoot-complete. */
export function missingMedia(): MediaSlot[] {
  return Object.values(media).filter((slot) => slot.src === null);
}
