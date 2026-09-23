# n8n AI workflow builder — prompt

The prompt below is **3658 characters**, inside n8n's 5000 limit. It deliberately
leaves out the long HTML — the templates and one expression are pasted in by
hand afterwards, which is both shorter and more reliable than asking a builder
to reproduce 9KB of markup.

## Fix these three things first — the builder cannot do them for you

The three Webhook nodes **cannot currently receive anything from the site**:

| Node       | Problem                                                      | Change to                    |
| ---------- | ------------------------------------------------------------ | ---------------------------- |
| Email Bara | Method `GET`; path `utan upgifter.` — **trailing full stop** | `POST`, path `utan upgifter` |
| Upgifter   | Method `GET`; path `med upgifter.` — **trailing full stop**  | `POST`, path `med upgifter`  |
| /kontakt   | Method `GET`                                                 | `POST`                       |

The site sends `POST`, so a `GET` webhook refuses it outright, and those two
stray full stops mean the paths do not match the URLs the site posts to.

Then on **each** node: **Options → Add option → Allowed Origins (CORS)**, set to
`https://bellaserviceab.se`. Without it the browser blocks the reply and every
visitor sees an error even though n8n received the request perfectly.

## The prompt

Copy everything between the two rules.

---

Build the automation downstream of three existing Webhook nodes in this workflow: `Email Bara`, `Upgifter` and `/kontakt`. **Never create, rename, modify or delete a Webhook node** — only connect to them.

Bella Service AB is a Swedish roof and facade cleaning company. Their website POSTs JSON to these webhooks. Every submission must send two emails: a confirmation to the customer, and a notification to `Kim@bellaserviceab.se`.

The body arrives as `Content-Type: text/plain` but is always valid JSON. If a webhook outputs a string rather than an object, parse it first.

## Branch 1 — quote requests

Connect **both** `Email Bara` and `Upgifter` into one shared chain.

They send: `email`, `locale` (`sv` or `en`), `kind`, `page`, `submittedAt`, `responseHours`, and `details` — an object that is empty from `Email Bara` and holds `tjanst`, `tjanstLabel`, `yta` and `enhet` from `Upgifter`.

**1. Set node `Prepare quote`.** Include all incoming fields, plus:

- `siteUrl` = `https://bellaserviceab.se`
- `detailsRowsHtml` = an empty string (a human replaces this afterwards)
- `respondByLocal` = expression:

`{{ new Date(Date.now() + 48*60*60*1000).toLocaleString($json.locale === 'en' ? 'en-GB' : 'sv-SE', { timeZone: 'Europe/Stockholm', dateStyle: 'full', timeStyle: 'short' }) }}`

**2. From `Prepare quote`, connect to two things at once.**

**2a. Switch `Quote language`** on `{{ $json.locale }}`, outputs `sv` and `en`, default `sv`. Each output to its own Send Email node:

- `Quote confirmation SV` — To `{{ $json.email }}`, Subject `Tack för din förfrågan – Bella Service`
- `Quote confirmation EN` — To `{{ $json.email }}`, Subject `Thank you for your request – Bella Service`

**2b. Send Email `Quote internal`** — To `Kim@bellaserviceab.se`, Reply-To `{{ $json.email }}`, Subject `Ny prisförfrågan: {{ $json.details.tjanstLabel || 'utan uppgifter' }}`

## Branch 2 — the contact form

`/kontakt` sends: `name`, `phone`, `email`, `propertyAddress`, `subject`, `message`, `consent`, `company`, `locale`, `page`, `submittedAt`, `responseHours`.

**1. IF node `Not a bot`** connected to `/kontakt`. Condition: `{{ $json.company }}` is empty. The false branch goes to a NoOp node `Discard bot` and sends nothing. `company` is a honeypot, hidden from sight and from screen readers on the site, so only an automated form filler ever fills it.

**2. Set node `Prepare contact`** on the true branch — all fields, plus `siteUrl` and `respondByLocal` exactly as above. It does not need `detailsRowsHtml`.

**3. From `Prepare contact`, connect to two things at once.**

**3a. Switch `Contact language`** on `{{ $json.locale }}`, outputs `sv` and `en`, default `sv`:

- `Contact confirmation SV` — To `{{ $json.email }}`, Subject `Tack för ditt meddelande – Bella Service`
- `Contact confirmation EN` — To `{{ $json.email }}`, Subject `Thank you for your message – Bella Service`

**3b. Send Email `Contact internal`** — To `Kim@bellaserviceab.se`, Reply-To `{{ $json.email }}`, Subject `Nytt meddelande: {{ $json.name }}`

## Every Send Email node

- HTML format, never plain text. From name `Bella Service`.
- Body: exactly `<!-- PASTE TEMPLATE -->` and nothing else. The real templates are long and are pasted in by hand afterwards.
- Leave the SMTP credential unset.
- Settings → On Error → **Continue**, so a bounced customer receipt still lets the internal notification reach Kim.

## Do not

- Do not touch the Webhook nodes.
- Do not add a Respond to Webhook node — all three already respond immediately.
- Do not invent prices, discounts, guarantees or response times.
- Do not add tracking pixels, open tracking or third-party image services.

---

## Follow-up prompt — move the six emails to Gmail

1232 characters. Replace `BUSINESS_GMAIL_HERE` with the real address **before**
pasting this, then send it in the same builder chat.

A Gmail node sends as whatever account its credential authenticates, so there
is no From field — which also means the customer sees that address. If the
business Gmail is a Workspace account on `bellaserviceab.se` this is ideal. If
it is a plain `@gmail.com` address, every confirmation will arrive from
gmail.com rather than from the company's own domain, which reads as less
established and is more likely to be filtered. Worth knowing before choosing.

---

Change all six email nodes to send through Gmail instead of SMTP.

Replace every `Send Email` node with a **Gmail** node (Resource: Message, Operation: Send), keeping each node's existing name, its position on the canvas, and every incoming and outgoing connection. Change nothing else in the workflow.

For each of the six:

- Credential: the Gmail OAuth2 account. Leave it unselected if none exists yet — a human connects it afterwards.
- Email Type: **HTML**, never plain text.
- Keep the existing `To`, `Subject` and message body exactly as they are, including the `<!-- PASTE TEMPLATE -->` placeholders.
- Options → **Sender Name**: `Bella Service`.
- Options → **Reply To**: set to `{{ $json.email }}` on `Quote internal` and `Contact internal` only. Leave it unset on the four customer confirmations.
- Settings → On Error → **Continue**.

There is no From field to fill in: a Gmail node always sends as the account its credential authenticates.

The two internal notifications, `Quote internal` and `Contact internal`, currently send To `Kim@bellaserviceab.se`. Change both to `BUSINESS_GMAIL_HERE`.

Do not touch the three Webhook nodes. Do not add a Respond to Webhook node. Do not change any Set, Switch, IF or NoOp node.

---

## After the builder finishes

**1. Paste the real `detailsRowsHtml` expression** into the `Prepare quote` Set
node, replacing the empty string. It renders the "Din förfrågan" table for a
detailed request and nothing at all for a simple one, which is what lets one
template serve both webhooks:

```
{{ $json.details?.tjanstLabel ? `<tr><td style="padding:26px 32px 0;font-family:Inter,Helvetica,Arial,sans-serif;"><p style="margin:0 0 10px;font-size:13px;color:#8b929c;">Din förfrågan</p><table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="font-size:15px;font-family:Inter,Helvetica,Arial,sans-serif;"><tr><td style="padding:10px 0;border-top:1px solid #e7e4df;color:#8b929c;width:38%;">Tjänst</td><td style="padding:10px 0;border-top:1px solid #e7e4df;color:#16191f;font-weight:500;">${$json.details.tjanstLabel}</td></tr><tr><td style="padding:10px 0;border-top:1px solid #e7e4df;border-bottom:1px solid #e7e4df;color:#8b929c;">Omfattning</td><td style="padding:10px 0;border-top:1px solid #e7e4df;border-bottom:1px solid #e7e4df;color:#16191f;font-weight:500;">${$json.details.yta} ${$json.details.enhet || ''}</td></tr></table></td></tr>` : '' }}
```

**2. Replace `<!-- PASTE TEMPLATE -->`** in each of the five Send Email nodes:

| Node                    | File                           |
| ----------------------- | ------------------------------ |
| Quote confirmation SV   | `confirmation.sv.html`         |
| Quote confirmation EN   | `confirmation.en.html`         |
| Quote internal          | `internal-notification.html`   |
| Contact confirmation SV | `contact-confirmation.sv.html` |
| Contact confirmation EN | `contact-confirmation.en.html` |
| Contact internal        | `contact-internal.html`        |

That is six files across five nodes plus the contact internal — six Send Email
nodes in total once both branches are built.

**3. Pick the SMTP credential** on all of them.

**4. Fix the three Webhook nodes** as described at the top of this file.

**5. Test**, then switch `PUBLIC_WEBHOOK_QUOTE_SIMPLE`,
`PUBLIC_WEBHOOK_QUOTE_DETAILED` and `PUBLIC_CONTACT_WEBHOOK` from the
`/webhook-test/` URLs to the `/webhook/` production ones.
