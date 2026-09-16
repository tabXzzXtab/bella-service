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
 */

/**
 * Appended verbatim to every generation prompt. Changing one image's subject is
 * fine; changing this string means regenerating all of them, because this is
 * the only thing making them a set.
 */
export const STYLE_DNA =
  'shot on 35mm, overcast Scandinavian daylight, muted terracotta and slate palette, ' +
  'natural texture, no people looking at camera, no text, no logos, no watermark, photorealistic';

export type AspectRatio = '3:2' | '4:3' | '16:9' | '1:1' | '4:5';

export interface MediaSlot {
  id: string;
  /** Path under /public once the real asset lands. `null` until then. */
  src: string | null;
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
  '3:2': '3 / 2',
  '4:3': '4 / 3',
  '16:9': '16 / 9',
  '1:1': '1 / 1',
  '4:5': '4 / 5',
};

export const media = {
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
    prompt: 'not generated — this is a real photograph supplied by the client',
  },

  heroRoof: {
    id: 'heroRoof',
    src: null,
    aspect: '3:2',
    alt: {
      sv: 'Nytvättat tegeltak på en skånsk villa, sett snett uppifrån',
      en: 'A freshly cleaned clay tile roof on a house in Skåne, seen from above at an angle',
    },
    brief:
      'Drone shot, roughly 20 m up, angled down across a clean red clay tile roof on a Swedish house. Overcast sky. This is the single most important image on the site.',
    prompt:
      'aerial drone view angled down across a clean red clay tile roof of a Swedish detached house, ' +
      'crisp tile rows receding, chimney and gutter visible, garden hedge at the edge of frame',
  },

  heroRoofBefore: {
    id: 'heroRoofBefore',
    src: null,
    aspect: '3:2',
    alt: {
      sv: 'Samma tak före behandling, täckt av mossa och alger',
      en: 'The same roof before treatment, covered in moss and algae',
    },
    brief:
      'The BEFORE half of the transformation. Same roof, same camera position and lens as heroRoof — the pair only works if the framing is identical. Heavy green-black moss between the tiles.',
    prompt:
      'aerial drone view angled down across a neglected red clay tile roof of a Swedish detached house, ' +
      'thick green-black moss and lichen filling the joints between tiles, streaked and darkened, ' +
      'identical camera position and framing to a clean version of the same roof',
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
    prompt: 'not generated — this is a real photograph supplied by the client',
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
    prompt: 'not generated — this is a real photograph supplied by the client',
  },

  taktvattWork: {
    id: 'taktvattWork',
    src: null,
    aspect: '4:3',
    alt: {
      sv: 'Hantverkare som tvättar ett tak med lågtrycksutrustning',
      en: 'A worker cleaning a roof with low-pressure equipment',
    },
    brief:
      'A roofer at work on a pitched roof with a lance, harness clearly visible. Shot from below or from an adjacent roof. Safety gear on show — it sells competence.',
    prompt:
      'a roofer in safety harness on a pitched clay tile roof using a low-pressure washing lance, ' +
      'water spray catching the light, half the roof visibly cleaner than the other half',
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
      'Close-ish shot of a newly painted concrete tile roof. The point is the evenness of the finish and the sharp edge where paint meets flashing.',
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

  crew: {
    id: 'crew',
    src: null,
    aspect: '3:2',
    alt: {
      sv: 'Bella Services hantverkare vid företagets servicebil',
      en: 'The Bella Service crew beside the company van',
    },
    brief:
      'The actual people, in actual workwear, beside the actual van. Do not substitute stock photography — the whole value of this image is that it is really them.',
    prompt:
      'two tradespeople in plain workwear standing beside a white service van in a Swedish residential street, ' +
      'relaxed and unposed, mid-conversation, seen from a slight distance',
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
