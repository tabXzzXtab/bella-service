import type { Locale } from './config';

/**
 * Interface strings — buttons, labels, headings, form errors.
 *
 * Page *content* that a non-developer will want to edit (services, company
 * details, statistics) does NOT belong here; it lives in src/data/. This file
 * is for the chrome around that content.
 *
 * Swedish is the source of truth: `UIKey` is derived from it, so TypeScript
 * fails the build the moment an English translation is missing. Keys are flat
 * and dotted ('nav.services') to keep autocomplete useful.
 *
 * The copy comes from the client's Bussiness-info.md. Where a heading is quoted
 * there verbatim ("Allt ditt tak behöver.", "Låt oss ta hand om ditt tak.",
 * "Redo att fräscha upp taket?") it is reproduced exactly — those are the
 * client's own words and are not ours to improve.
 */
const sv = {
  // --- Navigation & chrome ------------------------------------------------
  'nav.home': 'Hem',
  'nav.services': 'Tjänster',
  'nav.process': 'Så går det till',
  'nav.contact': 'Kontakt',
  'nav.menu': 'Meny',
  'nav.openMenu': 'Öppna menyn',
  'nav.closeMenu': 'Stäng menyn',
  'nav.skipToContent': 'Hoppa till innehållet',
  'nav.language': 'Språk',
  'nav.switchLanguage': 'In English',

  // --- Shared bits --------------------------------------------------------
  'common.bookInspection': 'Boka gratis besiktning',
  'common.getQuote': 'Begär kostnadsfri offert',
  'common.seeServices': 'Se våra tjänster',
  'common.callUs': 'Ring oss',
  'common.emailUs': 'Mejla oss',
  'common.visitUs': 'Besök oss',
  'common.call': 'Ring',
  'common.quote': 'Offert',
  'common.phone': 'Telefon',
  'common.email': 'E-post',
  'common.address': 'Adress',
  'common.orgNumber': 'Org.nr',
  'common.vatNumber': 'Momsreg.nr',
  'common.bankgiro': 'Bankgiro',
  'common.openingHours': 'Telefontider',
  'common.serviceArea': 'Serviceområde',
  'common.backToTop': 'Till toppen',
  'common.scroll': 'Scrolla',

  // --- Start page ---------------------------------------------------------
  'home.title': 'Bella Service – taktvätt, takmålning och fasadtvätt i Skåne',
  'home.description':
    'Bella Service tvättar, målar och vårdar tak, fasader och solpaneler i hela Skåne. Miljövänliga metoder, fast pris och garanti på utfört arbete. Kostnadsfri besiktning med drönare.',
  'home.hero.eyebrow': 'Skånsk fastighetsvård sedan 2009',
  'home.hero.title': 'Var ni än är, finns vi där',
  'home.hero.lead':
    'Vi tvättar, målar och vårdar tak och fasader i hela Skåne. Miljövänliga metoder, fast pris innan vi börjar och garanti på det vi gör.',

  'home.stats.title': 'Bella Service i siffror',
  'home.logos.title': 'Vi arbetar med',

  'home.mission.eyebrow': 'Vårt uppdrag',
  'home.mission.title': 'Skydda värdet på ditt hem',
  'home.mission.lead':
    'Mossa och alger håller kvar fukt, och fukt är det som till slut spräcker pannorna. Vi hjälper villaägare, föreningar och företag i Skåne att behålla värdet på sina fastigheter — med skonsamma metoder och utan att skynda på arbetet.',

  'home.transformation.eyebrow': 'Före och efter',
  'home.transformation.title': 'Skillnaden en tvätt gör',
  'home.transformation.lead':
    'Samma yta, samma kameravinkel. Dra i reglaget för att se resultatet.',
  'home.transformation.before': 'Före',
  'home.transformation.after': 'Efter',
  'home.transformation.handle': 'Dra för att jämföra före och efter',

  'home.services.eyebrow': 'Tjänster',
  'home.services.title': 'Allt ditt tak behöver',
  'home.services.lead':
    'Från en enkel algbehandling till ett helt ommålat tak. Allt utfört av oss, med fast pris.',
  'home.services.all': 'Se alla tjänster',

  'home.cta.title': 'Redo att fräscha upp taket?',
  'home.cta.lead':
    'Vi kommer ut, går igenom taket med drönare och lämnar en skriftlig rapport med fast pris. Kostnadsfritt och utan förpliktelse.',

  // --- How it works page --------------------------------------------------
  'process.title': 'Så går det till',
  'process.description':
    'Från första kontakt till färdigt tak: kostnadsfri drönarbesiktning, skriftlig rapport med fast pris, och garanti på utfört arbete. Så arbetar Bella Service i hela Skåne.',
  'process.hero.eyebrow': 'Så går det till',
  'process.hero.title': 'Från mossigt till klart',
  'process.hero.lead1': 'Du behöver inte veta vad taket behöver.',
  'process.hero.lead2': 'Vi tittar på det gratis.',
  'process.hero.lead3': 'Sedan bestämmer du.',
  'process.timeline.title': 'Fem steg, inga överraskningar.',
  'process.timeline.stepLabel': 'Steg',
  'process.method.title': 'Skonsamt, inte snabbt',
  'process.method.body':
    'Högtryck tar bort mossan på en eftermiddag och spräcker pannorna på köpet. Vi arbetar med lågt tryck och miljögodkända medel, och låter behandlingen göra jobbet över tid.',
  'process.giantWord': 'Rent.',
  'process.giantWord.note': 'Ett tak som sköts håller längre. Det är hela affärsidén.',
  'process.welcome.title': 'Klart',
  'process.welcome.note': 'Med garanti på utfört arbete.',
  'process.stats.title': 'Det här har vi gjort förut',
  'process.cta.title': 'Undrar du vad ditt tak behöver?',
  'process.cta.lead': 'Vi tittar på det kostnadsfritt och säger som det är.',

  // --- Price estimator ----------------------------------------------------
  'estimator.eyebrow': 'Prisuppskattning',
  'estimator.title': 'Vad kostar det för ditt tak?',
  'estimator.lead':
    'Ange ytan så räknar vi fram ett ungefärligt pris direkt. Vet du inte ytan? Boka en kostnadsfri besiktning så mäter vi åt dig.',
  'estimator.service': 'Tjänst',
  'estimator.area': 'Takets yta',
  'estimator.areaUnit': 'm²',
  'estimator.facadeArea': 'Fasadens yta',
  'estimator.panels': 'Antal paneler',
  'estimator.panelsUnit': 'st',
  'estimator.result': 'Ungefärligt pris',
  'estimator.currency': 'kr',
  'estimator.disclaimer':
    'Detta är en uppskattning räknad på vårt från-pris, inte en offert. Exakt pris får du efter en kostnadsfri besiktning.',

  // --- Services page ------------------------------------------------------
  'services.title': 'Tjänster',
  'services.description':
    'Taktvätt, takmålning, algbehandling, solpanelstvätt, takbesiktning och fasadtvätt i hela Skåne. Fast pris och garanti på utfört arbete.',
  'services.hero.eyebrow': 'Vad vi gör',
  'services.hero.title': 'Allt ditt tak behöver.',
  'services.hero.lead':
    'Helhetslösningar för villor, bostadsrättsföreningar och företag i hela Skåne.',
  'services.cta.title': 'Osäker på vad ditt tak behöver?',
  'services.cta.lead':
    'Vi kommer ut och tittar kostnadsfritt, och lämnar ett fast pris på det som faktiskt behöver göras. Inget mer.',
  'services.includes': 'Ingår',

  // --- Contact page & form ------------------------------------------------
  'contact.title': 'Kontakt',
  'contact.description':
    'Kontakta Bella Service för kostnadsfri offert eller besiktning av tak och fasad. Vi svarar inom 24 timmar och arbetar i hela Skåne.',
  'contact.hero.eyebrow': 'Hör av dig',
  'contact.hero.title': 'Låt oss ta hand om ditt tak.',
  'contact.hero.lead':
    'Fyll i formuläret så hör vi av oss inom 24 timmar. Vill du hellre prata direkt går det lika bra att ringa eller mejla.',
  'contact.details': 'Kontaktuppgifter',
  'contact.legal': 'Företagsuppgifter',

  'contact.form.title': 'Begär offert',
  'contact.form.name': 'Namn',
  'contact.form.phone': 'Telefon',
  'contact.form.email': 'E-post',
  'contact.form.propertyAddress': 'Adress (fastighet)',
  'contact.form.optional': 'valfritt',
  'contact.form.service': 'Tjänst',
  'contact.form.servicePlaceholder': 'Välj tjänst',
  'contact.form.serviceInspection': 'Kostnadsfri besiktning',
  'contact.form.message': 'Meddelande',
  'contact.form.messagePlaceholder':
    'Berätta kort om taket — ålder, material, och vad du har lagt märke till.',
  'contact.form.consent':
    'Jag godkänner att Bella Service sparar mina uppgifter för att kunna svara på förfrågan.',
  'contact.form.submit': 'Skicka förfrågan',
  'contact.form.sending': 'Skickar …',
  'contact.form.required': 'Obligatoriskt',
  'contact.form.success.title': 'Tack, vi har tagit emot din förfrågan.',
  'contact.form.success.body': 'Vi hör av oss inom 24 timmar.',
  'contact.form.error.title': 'Förfrågan kunde inte skickas.',
  'contact.form.error.body': 'Försök igen, eller ring oss direkt på telefonnumret här intill.',
  'contact.form.error.name': 'Fyll i ditt namn.',
  'contact.form.error.email': 'Fyll i en giltig e-postadress.',
  'contact.form.error.phone': 'Fyll i ett telefonnummer vi kan nå dig på.',
  'contact.form.error.message': 'Skriv några rader om vad det gäller, minst 10 tecken.',
  'contact.form.error.consent': 'Du behöver godkänna att vi sparar uppgifterna.',
  'contact.form.error.rateLimit': 'För många förfrågningar. Vänta en stund och försök igen.',
  'contact.form.noscript':
    'Formuläret kräver JavaScript. Du kan alltid mejla eller ringa oss i stället.',

  // --- 404 ----------------------------------------------------------------
  'notFound.title': 'Sidan finns inte',
  'notFound.lead': 'Länken kan vara gammal eller felstavad.',
  'notFound.action': 'Till startsidan',

  // --- Footer -------------------------------------------------------------
  'footer.navTitle': 'Sidor',
  'footer.contactTitle': 'Kontakt',
  'footer.companyTitle': 'Företaget',
  'footer.rights': 'Alla rättigheter förbehållna.',
  'footer.fTax': 'Godkänd för F-skatt',

  // --- Media placeholders -------------------------------------------------
  'media.placeholder': 'Bild kommer',
} as const;

export type UIKey = keyof typeof sv;

const en: Record<UIKey, string> = {
  // --- Navigation & chrome ------------------------------------------------
  'nav.home': 'Home',
  'nav.services': 'Services',
  'nav.process': 'How it works',
  'nav.contact': 'Contact',
  'nav.menu': 'Menu',
  'nav.openMenu': 'Open menu',
  'nav.closeMenu': 'Close menu',
  'nav.skipToContent': 'Skip to content',
  'nav.language': 'Language',
  'nav.switchLanguage': 'På svenska',

  // --- Shared bits --------------------------------------------------------
  'common.bookInspection': 'Book a free inspection',
  'common.getQuote': 'Request a free quote',
  'common.seeServices': 'See our services',
  'common.callUs': 'Call us',
  'common.emailUs': 'Email us',
  'common.visitUs': 'Visit us',
  'common.call': 'Call',
  'common.quote': 'Quote',
  'common.phone': 'Phone',
  'common.email': 'Email',
  'common.address': 'Address',
  'common.orgNumber': 'Company reg. no.',
  'common.vatNumber': 'VAT no.',
  'common.bankgiro': 'Bankgiro',
  'common.openingHours': 'Phone hours',
  'common.serviceArea': 'Service area',
  'common.backToTop': 'Back to top',
  'common.scroll': 'Scroll',

  // --- Start page ---------------------------------------------------------
  'home.title': 'Bella Service – roof cleaning, roof painting and facade washing in Skåne',
  'home.description':
    'Bella Service cleans, paints and maintains roofs, facades and solar panels across Skåne. Eco-friendly methods, a fixed price and a guarantee on the work. Free drone inspection.',
  'home.hero.eyebrow': 'Property care in Skåne since 2009',
  'home.hero.title': 'Wherever you are, we are there',
  'home.hero.lead':
    'We clean, paint and maintain roofs and facades across Skåne. Environmentally sound methods, a fixed price before we start, and a guarantee on what we do.',

  'home.stats.title': 'Bella Service in numbers',
  'home.logos.title': 'We work with',

  'home.mission.eyebrow': 'What we are for',
  'home.mission.title': 'Protect the value of your home',
  'home.mission.lead':
    'Moss and algae hold moisture against the tile, and moisture is what eventually cracks it. We help homeowners, housing associations and businesses across Skåne keep the value of their property — with gentle methods, and without rushing the work.',

  'home.transformation.eyebrow': 'Before and after',
  'home.transformation.title': 'The difference a wash makes',
  'home.transformation.lead': 'Same surface, same camera angle. Drag the slider to see the result.',
  'home.transformation.before': 'Before',
  'home.transformation.after': 'After',
  'home.transformation.handle': 'Drag to compare before and after',

  'home.services.eyebrow': 'Services',
  'home.services.title': 'Everything your roof needs',
  'home.services.lead':
    'From a straightforward algae treatment to a fully repainted roof. All carried out by us, at a fixed price.',
  'home.services.all': 'See all services',

  'home.cta.title': 'Ready to freshen up the roof?',
  'home.cta.lead':
    'We come out, survey the roof by drone and hand over a written report with a fixed price. Free of charge, with no obligation.',

  // --- How it works page --------------------------------------------------
  'process.title': 'How it works',
  'process.description':
    'From first contact to a finished roof: a free drone inspection, a written report with a fixed price, and a guarantee on the work. How Bella Service works across Skåne.',
  'process.hero.eyebrow': 'How it works',
  'process.hero.title': 'From mossy to finished',
  'process.hero.lead1': 'You do not need to know what the roof needs.',
  'process.hero.lead2': 'We look at it for free.',
  'process.hero.lead3': 'Then you decide.',
  'process.timeline.title': 'Five steps, no surprises.',
  'process.timeline.stepLabel': 'Step',
  'process.method.title': 'Gentle, not fast',
  'process.method.body':
    'Pressure washing strips the moss in an afternoon and cracks the tiles while it is at it. We work at low pressure with environmentally approved agents, and let the treatment do the job over time.',
  'process.giantWord': 'Clean.',
  'process.giantWord.note': 'A roof that is looked after lasts longer. That is the whole business.',
  'process.welcome.title': 'Finished',
  'process.welcome.note': 'With a guarantee on the work.',
  'process.stats.title': 'What we have done before',
  'process.cta.title': 'Wondering what your roof needs?',
  'process.cta.lead': 'We will look at it free of charge and tell you straight.',

  // --- Price estimator ----------------------------------------------------
  'estimator.eyebrow': 'Price estimate',
  'estimator.title': 'What would it cost for your roof?',
  'estimator.lead':
    'Enter the area and we will work out an approximate price straight away. Not sure of the area? Book a free inspection and we will measure it for you.',
  'estimator.service': 'Service',
  'estimator.area': 'Roof area',
  'estimator.areaUnit': 'm²',
  'estimator.facadeArea': 'Facade area',
  'estimator.panels': 'Number of panels',
  'estimator.panelsUnit': 'panels',
  'estimator.result': 'Approximate price',
  'estimator.currency': 'SEK',
  'estimator.disclaimer':
    'This is an estimate based on our starting rate, not a quote. You get an exact price after a free inspection.',

  // --- Services page ------------------------------------------------------
  'services.title': 'Services',
  'services.description':
    'Roof cleaning, roof painting, algae treatment, solar panel cleaning, roof inspection and facade washing across Skåne. Fixed prices and a guarantee on the work.',
  'services.hero.eyebrow': 'What we do',
  'services.hero.title': 'Everything your roof needs.',
  'services.hero.lead':
    'Complete solutions for houses, housing associations and businesses across Skåne.',
  'services.cta.title': 'Not sure what your roof needs?',
  'services.cta.lead':
    'We come out and look free of charge, then give you a fixed price for what actually needs doing. Nothing more.',
  'services.includes': 'Included',

  // --- Contact page & form ------------------------------------------------
  'contact.title': 'Contact',
  'contact.description':
    'Contact Bella Service for a free quote or an inspection of your roof and facade. We reply within 24 hours and work across Skåne.',
  'contact.hero.eyebrow': 'Get in touch',
  'contact.hero.title': 'Let us take care of your roof.',
  'contact.hero.lead':
    'Fill in the form and we will get back to you within 24 hours. If you would rather talk it through, calling or emailing works just as well.',
  'contact.details': 'Contact details',
  'contact.legal': 'Company details',

  'contact.form.title': 'Request a quote',
  'contact.form.name': 'Name',
  'contact.form.phone': 'Phone',
  'contact.form.email': 'Email',
  'contact.form.propertyAddress': 'Address (property)',
  'contact.form.optional': 'optional',
  'contact.form.service': 'Service',
  'contact.form.servicePlaceholder': 'Choose a service',
  'contact.form.serviceInspection': 'Free inspection',
  'contact.form.message': 'Message',
  'contact.form.messagePlaceholder':
    'Tell us briefly about the roof — its age, the material, and what you have noticed.',
  'contact.form.consent':
    'I agree that Bella Service may store my details in order to answer this enquiry.',
  'contact.form.submit': 'Send enquiry',
  'contact.form.sending': 'Sending …',
  'contact.form.required': 'Required',
  'contact.form.success.title': 'Thank you, we have received your enquiry.',
  'contact.form.success.body': 'We will be in touch within 24 hours.',
  'contact.form.error.title': 'The enquiry could not be sent.',
  'contact.form.error.body': 'Please try again, or call us directly on the number alongside.',
  'contact.form.error.name': 'Please enter your name.',
  'contact.form.error.email': 'Please enter a valid email address.',
  'contact.form.error.phone': 'Please enter a phone number we can reach you on.',
  'contact.form.error.message': 'Please write a few lines about it, at least 10 characters.',
  'contact.form.error.consent': 'Please agree to us storing your details.',
  'contact.form.error.rateLimit': 'Too many enquiries. Please wait a moment and try again.',
  'contact.form.noscript': 'This form needs JavaScript. You can always email or call us instead.',

  // --- 404 ----------------------------------------------------------------
  'notFound.title': 'Page not found',
  'notFound.lead': 'The link may be out of date or misspelled.',
  'notFound.action': 'Go to the start page',

  // --- Footer -------------------------------------------------------------
  'footer.navTitle': 'Pages',
  'footer.contactTitle': 'Contact',
  'footer.companyTitle': 'Company',
  'footer.rights': 'All rights reserved.',
  'footer.fTax': 'Approved for F-tax',

  // --- Media placeholders -------------------------------------------------
  'media.placeholder': 'Image to come',
};

export const ui: Record<Locale, Record<UIKey, string>> = { sv, en };
