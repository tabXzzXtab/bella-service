# Bella Service AB — website

Astro 7 + Tailwind v4. Swedish first, English as a secondary language.
Static output, one on-demand route (the contact endpoint).

## What this company actually is

**Roof and facade care across Skåne.** Not a general builder.

The six services are taktvätt, takmålning, algbehandling, solpanelstvätt,
takbesiktning and fasadtvätt. If you find copy about väggar, golv, betong or
snickeri anywhere in this repo, it is left over from an early scaffold that was
written from the company's work diaries before the real brief arrived. Delete it.

`Bussiness-info.md` in the project root is the client-supplied source of truth
for all copy, pricing and page structure. It wins over anything already in code.

## Absolute rules

1. **Never hard-code a colour, font, radius, duration or spacing value in a
   component.** Everything visual resolves through a CSS custom property defined
   in `src/styles/global.css` or a skin file. This is not a style preference —
   the four-skin system stops working the moment a component hard-codes a hex.

2. **Never hard-code an internal href.** Every link goes through `path()` in
   `src/i18n/utils.ts`, which reads the route table in `src/i18n/config.ts`.
   Renaming a slug must never be able to leave a dead link.

3. **Never hard-code a domain.** `SITE_URL` lives in `src/config.mjs`.

4. **Never invent company facts.** Phone numbers, prices, guarantees, org
   numbers and statistics come from `src/data/site.ts` and `src/data/services.ts`,
   which come from `Bussiness-info.md`. If a value is not in there, ask — do not
   fill the gap with something plausible.

5. **Content components emit the same DOM under every skin.** No skin-specific
   classes in a section component. Skin-specific markup belongs in
   `src/components/Ornament.astro` and nowhere else.

6. **Mobile first.** Every screen is designed at 390px and adapted upward.

7. **No animation library.** IntersectionObserver plus CSS custom properties.
   Everything must survive `prefers-reduced-motion: reduce`.

8. **Swedish copy is the source of truth.** Preserve å ä ö. `UIKey` is derived
   from the Swedish object in `src/i18n/ui.ts`, so a missing English string is a
   build error. That is deliberate.

## The four-skin system

One semantic DOM, four art directions, switchable live at runtime.

- `src/styles/skins/{ra,verkstad,dronare,ritning}.css` each define the **same
  contract** of custom properties under `[data-skin="…"]`. A missing key in one
  file is a bug, not a default.
- `SkinSwitcher.astro` sets `document.documentElement.dataset.skin`, persists to
  `localStorage` and honours `?skin=verkstad`.
- **The switcher is a review tool.** Once the client picks a direction, delete
  the other three skin files, the switcher, and the unused ornament branches.

## Claims that may not be published unverified

- **"100% nöjda kunder"** and **"40 000+ tak tvättade"** are absolute marketing
  claims. Swedish marknadsföringslagen requires the advertiser to substantiate
  them on demand. They are in the copy because the client supplied them; confirm
  what backs them before launch.
- **Do not add any RUT/ROT deduction claim, badge or calculator.** Taktvätt's
  eligibility has been contested with Skatteverket. Nothing about tax deductions
  goes on this site until the client confirms in writing how they invoice it.
- Prices are **"från"** figures. The estimator must always be labelled an
  estimate, never a quote.

## Working style

Execute one page or feature at a time. **Do not build ahead.**

## Commands

```
npm run dev       # localhost:4321
npm run verify    # format check + astro check + build — must pass before done
npm run format    # prettier
```

## Before launch

```
grep -rn "PLACEHOLDER" src/     # must return nothing
```

Plus: real images swapped in for every entry in `src/data/media.ts`, the skin
switcher removed, and SMTP credentials set in the deploy environment.
