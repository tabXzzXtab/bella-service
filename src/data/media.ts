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

export type AspectRatio = '2:1' | '3:2' | '4:3' | '16:9' | '1:1' | '4:5';

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
  '2:1': '2 / 1',
  '3:2': '3 / 2',
  '4:3': '4 / 3',
  '16:9': '16 / 9',
  '1:1': '1 / 1',
  '4:5': '4 / 5',
};

/** Said instead of a generation prompt for anything the client photographed. */
const REAL = 'not generated — this is a real photograph supplied by the client';

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

  /** Process page hero. Sits directly under "Från mossigt till klart". */
  heroRoof: {
    id: 'heroRoof',
    src: '/media/process-hero.jpg',
    aspect: '3:2',
    alt: {
      sv: 'Mossbelagt skiffertak som tvättas — mossan ligger kvar ovanför, pannorna är rena nedanför',
      en: 'A moss-covered slate roof being washed — moss still above, clean tiles below',
    },
    brief:
      "Client photograph. Chosen for this slot because the frame contains the page's own headline: the untouched moss field, the washed tiles and the lance, all at once.",
    prompt: REAL,
  },

  /** Process page, lapping the corner of the single word "Rent." */
  rentFoam: {
    id: 'rentFoam',
    src: '/media/rent-foam.jpg',
    aspect: '4:5',
    alt: {
      sv: 'Rengöringsskum som ligger över en stenlagd gång under tvätt',
      en: 'Cleaning foam lying across block paving during a wash',
    },
    brief:
      'Client photograph, chosen by the client for this exact spot — their file for it is even named Rent. Cropped portrait because it laps the corner of a very large word, where a tall narrow frame sits better than a wide one. Two things to know: it is paving rather than a roof, and the agent is still foaming on the surface, so it shows cleaning under way beside a word that says it is done.',
    prompt: REAL,
  },

  /** Process page, the full-bleed band directly under the hero. */
  roofWashWide: {
    id: 'roofWashWide',
    src: '/media/roof-wash-wide.jpg',
    video: '/media/roof-wash-wide.mp4',
    aspect: '2:1',
    alt: {
      sv: 'Mossa som spolas av ett skiffertak — den rena ytan breder ut sig bakom lansen',
      en: 'Moss being rinsed off a slate roof, the clean surface spreading out behind the lance',
    },
    brief:
      'Client footage, framed 2:1 for the band. The band runs the full width of the screen with no caption over it, so the frame has to be wide enough to fill it and still hold the moss, the cleaned band and the spray at once. Square phone footage does not survive that crop — most of it becomes sky.',
    prompt: REAL,
  },

  /** Process page, the closing "Klart" band. */
  finishedJob: {
    id: 'finishedJob',
    src: '/media/finished-job.jpg',
    aspect: '4:3',
    alt: {
      sv: 'Färdigt tak i mättad tegelröd kulör, med Bella Services servicebil på uppfarten',
      en: "A finished roof in deep terracotta, with Bella Service's van on the driveway",
    },
    brief:
      'Client photograph. Carries the words "Klart" and "Med garanti på utfört arbete", so it has to be a finished surface rather than work in progress.',
    prompt: REAL,
  },

  taktvattWork: {
    id: 'taktvattWork',
    src: '/media/ridge-treatment.jpg',
    video: '/media/ridge-treatment.mp4',
    aspect: '4:3',
    alt: {
      sv: 'Hantverkare på takryggen som behandlar pannorna med en lågtryckslans',
      en: 'A worker on the roof ridge treating the tiles with a low-pressure lance',
    },
    brief:
      'Client footage. Sits beside copy about gentle methods and no pressure washing, and the lance laying the agent down is exactly that. Kept compact rather than wide because it plays at a column width, not across the screen.',
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
  // droneInspection and processReport are on the process timeline, so they are
  // visible gaps on a live page — they carry the free-inspection offer, which
  // is the site's primary conversion path, and nothing in the client's material
  // shows either the drone or the report.
  //
  // heroRoofBefore, takmalningWork, solarPanels and fasadWork are not placed in
  // any component yet. They stay here as the shoot list: four of the six
  // services have no photograph of their own.
  // ───────────────────────────────────────────────────────────────────────

  droneInspection: {
    id: 'droneInspection',
    src: null,
    aspect: '4:3',
    alt: {
      sv: 'Drönare som fotograferar ett tak under en besiktning',
      en: 'A drone photographing a roof during an inspection',
    },
    brief:
      'A drone in the air, in focus, with a roof soft behind it. This image carries the free-inspection offer, so it needs to look deliberate rather than gimmicky.',
    prompt:
      'a small survey drone hovering in sharp focus close to camera, ' +
      'a tile roof softly out of focus below and behind it, overcast Swedish sky',
  },

  processReport: {
    id: 'processReport',
    src: null,
    aspect: '4:3',
    alt: {
      sv: 'Den skriftliga besiktningsrapporten med drönarbilder av taket',
      en: 'The written inspection report, with drone photographs of the roof',
    },
    brief:
      'The deliverable of the free inspection, photographed as an object: the printed report or a tablet showing it, with roof images visible. This is what makes the free besiktning feel like something real rather than a sales visit.',
    prompt:
      'a printed inspection report resting on a kitchen table, open to a page of aerial roof photographs and a simple diagram, ' +
      'a pen beside it, soft daylight from a window',
  },

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
