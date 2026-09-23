# Transactional emails

Three templates, all branded to match the site. They are **not** part of the
Astro build — nothing imports them. They are source files to paste into the n8n
workflow that receives a quote request.

| File                         | Goes to                 | When             |
| ---------------------------- | ----------------------- | ---------------- |
| `confirmation.sv.html`       | the person who asked    | `locale` is `sv` |
| `confirmation.en.html`       | the person who asked    | `locale` is `en` |
| `internal-notification.html` | `Kim@bellaserviceab.se` | every request    |

## What the site sends

Both webhooks receive the same JSON shape, `POST`ed from the browser:

```json
{
  "kind": "detailed",
  "email": "anna@exempel.se",
  "locale": "sv",
  "page": "https://bellaserviceab.se/",
  "submittedAt": "2026-09-23T10:41:02.514Z",
  "responseHours": 48,
  "respondBy": "2026-09-25T10:41:02.514Z",
  "details": {
    "tjanst": "taktvatt",
    "tjanstLabel": "Taktvätt",
    "yta": "120",
    "enhet": "m²"
  }
}
```

`kind` is `simple` (hero — address only, `details` is `{}`) or `detailed`
(price panel — service and area included). The endpoints already separate
these, so `kind` is a cross-check rather than the routing key.

The contact webhook receives the form's own fields instead, flat rather than
nested, plus the same three envelope values:

```json
{
  "kind": "kontakt",
  "name": "Anna Andersson",
  "phone": "0701-234 567",
  "email": "anna@exempel.se",
  "propertyAddress": "Storgatan 1, Hörby",
  "subject": "Taktvätt",
  "message": "Hej, taket har mossa på norrsidan…",
  "consent": "on",
  "company": "",
  "locale": "sv",
  "page": "https://bellaserviceab.se/kontakt/",
  "submittedAt": "2026-09-23T10:41:02.514Z",
  "responseHours": 48
}
```

`company` is the honeypot: it is hidden from sight and from assistive
technology, so a real visitor never fills it. **Anything arriving with a
non-empty `company` should be dropped by the workflow without sending
anything.** `consent` is the GDPR checkbox and is always `"on"` when the form
validated.

⚠ Pointing the contact form at a webhook **bypasses `/api/kontakt`**, and with
it the server-side rate limiter and the SMTP send. The workflow is now the only
thing standing between that form and an inbox, so it has to do its own
validation. To put the form back on SMTP instead, set `PUBLIC_CONTACT_WEBHOOK`
to an empty string.

The body is sent as `Content-Type: text/plain` on purpose. That keeps it a CORS
_simple_ request, so the browser does not fire a preflight `OPTIONS` the
webhook would also have to answer. n8n still parses it as JSON.

## Building the workflow

`n8n-builder-prompt.md` in this folder is a ready-to-paste prompt for n8n's AI
workflow builder. It describes every node downstream of the three existing
Webhook triggers, and opens with the manual fixes the builder cannot make.

## Three things to set up before this works

**1. Use the production webhooks.** The defaults in `src/data/webhooks.ts`
are the `/webhook-test/` URLs, which answer **one** call after you press
"Execute workflow" and return `404` otherwise. Verified:

```
{"code":404,"message":"The requested webhook \"utan upgifter\" is not registered."}
```

Swap `webhook-test` for `webhook` in the live workflow and set the URLs via
`PUBLIC_WEBHOOK_QUOTE_SIMPLE` and `PUBLIC_WEBHOOK_QUOTE_DETAILED` in the deploy
environment. They can stay pointed at test while you build.

**2. Allow the origin.** The webhook currently returns no
`Access-Control-Allow-Origin` header, so the browser will block the response
and the visitor will see the error state even when n8n received the request.
In the Webhook node, set **Respond → Using 'Respond to Webhook' node** and add:

```
Access-Control-Allow-Origin: https://bellaserviceab.se
```

**3. Note the spelling.** Both paths say `upgifter`. Swedish is `uppgifter`,
with two p's. The site encodes and posts exactly what was given, so this works
— but if you rename the n8n paths, update `src/data/webhooks.ts` to match.

## Fields the templates expect

Add a **Set** node before each email and define these three. The templates
reference nothing else.

`siteUrl` — plain value:

```
https://bellaserviceab.se
```

`respondByLocal` — expression. Computed **here**, not from the payload, so the
48 hours run from the moment the mail is sent rather than from the moment the
form was submitted:

```
{{ new Date(Date.now() + 48 * 60 * 60 * 1000).toLocaleString($json.locale === 'en' ? 'en-GB' : 'sv-SE', { timeZone: 'Europe/Stockholm', dateStyle: 'full', timeStyle: 'short' }) }}
```

`detailsRowsHtml` — expression, **quote templates only**. The contact
templates have their own fixed table and do not use it. It emits the
"Din förfrågan" rows for a detailed request and an empty string for a simple
one, which is what lets one template serve both:

```
{{ $json.details?.tjanstLabel ? `<tr><td style="padding:26px 32px 0;font-family:Inter,-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;"><p style="margin:0 0 10px;font-size:13px;color:#8b929c;">Din förfrågan</p><table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="font-size:15px;font-family:Inter,-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;"><tr><td style="padding:10px 0;border-top:1px solid #e7e4df;color:#8b929c;width:38%;">Tjänst</td><td style="padding:10px 0;border-top:1px solid #e7e4df;color:#16191f;font-weight:500;">${$json.details.tjanstLabel}</td></tr><tr><td style="padding:10px 0;border-top:1px solid #e7e4df;border-bottom:1px solid #e7e4df;color:#8b929c;">Omfattning</td><td style="padding:10px 0;border-top:1px solid #e7e4df;border-bottom:1px solid #e7e4df;color:#16191f;font-weight:500;">${$json.details.yta} ${$json.details.enhet || ''}</td></tr></table></td></tr>` : '' }}
```

Also set the internal mail's **Reply-To** to `{{ $json.email }}`, so hitting
reply answers the customer rather than the workflow.

## About the 48-hour countdown

The mail states an exact deadline — _"Senast fredag 25 september 2026, 12:41"_ —
rather than a ticking clock.

That is deliberate, and it is a hard constraint rather than a preference:
**email clients do not run JavaScript.** Gmail, Outlook and Apple Mail all
strip `<script>` entirely, so a number that counts down inside an inbox is not
something HTML and CSS can produce.

There is exactly one way to get a _visibly_ ticking countdown, and it is worth
knowing the cost before choosing it: a third-party service (Sendtric, NiftyImages
and similar) hosts an animated GIF that is re-rendered by their server on every
open. You drop in an `<img>` pointed at their URL. The trade-offs:

- every open pings that third party, which is tracking you did not otherwise do,
- the deadline has to be passed in the image URL as a query parameter,
- and if the service goes down, the mail shows a broken image where the
  headline number should be.

If you want it, it replaces the `<p>` holding `{{ $json.respondByLocal }}` in
the orange panel. The written deadline below it should stay either way — a GIF
that fails to load must not take the promise with it.

## Editing these

The templates come in Swedish/English pairs — `confirmation.*` and
`contact-confirmation.*`. Change one of a pair, change the other.

Colours are written as hex rather than resolved through the design tokens in
`src/styles/global.css`, which is the one place in this repo where that is
correct: mail clients do not support CSS custom properties. The values are
copied from those tokens — `#1f3a5f` navy, `#e8701a` accent, `#b04c06`
accent-ink, `#16191f` ink, `#5c636e` ink-soft, `#8b929c` ink-faint, `#fbfaf8`
bg, `#f4f2ee` bg-sunk, `#fdf2e9` accent-wash. If a brand colour changes on the
site, it has to be changed here by hand.
