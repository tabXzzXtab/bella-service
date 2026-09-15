/**
 * Inline SVG icon set.
 *
 * Icons are inlined rather than loaded as files or as an icon font: no extra
 * request, no flash of missing glyph, and they inherit `currentColor` so they
 * always match the text they sit beside.
 *
 * Each entry is the *inside* of a 24×24 `viewBox`, drawn with strokes.
 * Icon.astro supplies the <svg> wrapper, stroke width, linecap and colour —
 * so never put a `stroke`, `fill` or `width` on the paths here.
 *
 * To add an icon: paste the inner markup of any 24×24 stroke icon below.
 * `IconName` updates itself, so a typo in a component becomes a build error.
 */
export const icons = {
  // --- Services -----------------------------------------------------------

  /** Pitched roof over a house outline. Taktvätt. */
  roof: `<path d="M2 11 12 3l10 8"/><path d="M5 9.5V20a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V9.5"/><path d="M9 21v-6h6v6"/>`,

  /** Paint roller. Takmålning. */
  brush: `<rect x="3" y="4" width="12" height="5" rx="1"/><path d="M15 6.5h4a1 1 0 0 1 1 1V11a1 1 0 0 1-1 1h-6a1 1 0 0 0-1 1v2"/><rect x="10" y="15" width="4" height="6" rx="1"/>`,

  /** Leaf. Algbehandling and the "hållbart" pillar. */
  leaf: `<path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/>`,

  /** Solar panel grid. Solpanelstvätt. */
  solar: `<path d="M3.5 4h17l1.5 10H2z"/><path d="M2 14h20"/><path d="M7.8 4 6 14"/><path d="M16.2 4 18 14"/><path d="M2.8 9h18.4"/><path d="M12 14v3"/><path d="M8 20h8"/><path d="M12 17v3"/>`,

  /** Drone / quadcopter. Takbesiktning. */
  drone: `<rect x="9" y="9" width="6" height="6" rx="1"/><circle cx="5" cy="5" r="2.5"/><circle cx="19" cy="5" r="2.5"/><circle cx="5" cy="19" r="2.5"/><circle cx="19" cy="19" r="2.5"/><path d="m6.8 6.8 2.2 2.2"/><path d="m17.2 6.8-2.2 2.2"/><path d="m6.8 17.2 2.2-2.2"/><path d="m17.2 17.2-2.2-2.2"/>`,

  /** Building facade. Fasadtvätt. */
  facade: `<path d="M4 21V4a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v17"/><path d="M2 21h20"/><path d="M8 7h2"/><path d="M14 7h2"/><path d="M8 12h2"/><path d="M14 12h2"/><path d="M10 21v-4a2 2 0 1 1 4 0v4"/>`,

  // --- Trust & chrome -----------------------------------------------------

  /** Shield with a tick. The "tryggt" pillar and guarantee markers. */
  shield: `<path d="M20 13c0 5-3.5 7.5-7.7 8.9a1 1 0 0 1-.6 0C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.2-2.7a1 1 0 0 1 1.5 0C14.5 3.8 17 5 19 5a1 1 0 0 1 1 1z"/><path d="m9 12 2 2 4-4"/>`,

  /** Water droplet. Used for the wash services and the low-water claim. */
  droplet: `<path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5S5 13 5 15a7 7 0 0 0 7 7"/>`,

  home: `<path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"/><path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>`,

  phone: `<path d="M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384"/>`,

  mail: `<path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/><rect x="2" y="4" width="20" height="16" rx="2"/>`,

  pin: `<path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"/><circle cx="12" cy="10" r="3"/>`,

  clock: `<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>`,

  arrowRight: `<path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>`,

  arrowDown: `<path d="M12 5v14"/><path d="m19 12-7 7-7-7"/>`,

  check: `<path d="M20 6 9 17l-5-5"/>`,

  menu: `<path d="M4 6h16"/><path d="M4 12h16"/><path d="M4 18h16"/>`,

  close: `<path d="M18 6 6 18"/><path d="m6 6 12 12"/>`,

  globe: `<circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>`,
} as const;

export type IconName = keyof typeof icons;
