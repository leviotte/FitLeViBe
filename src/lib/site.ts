export const site = {
  publicName: "Fit met Levi",
  personName: "Levi Otte",
  legalHandle: "FitLeViBe",
  jobTitle: "Persoonlijk coach",
  locale: "nl-BE",
  url: "https://fitlevibe.com",
  tagline: "20% training, 80% voeding, 100% mindset.",
  description:
    "Fit met Levi — Levi Otte, persoonlijk coach in Roosdaal. Gezonder leven op jouw ritme, sinds 2015.",
  address: {
    street: "Zavelstraat 19",
    postalCode: "1760",
    city: "Roosdaal",
    country: "België",
    countryCode: "BE",
  },
  phoneDisplay: "+32 475 34 44 02",
  phoneE164: "+32475344402",
  email: "fitlevibe@icloud.com",
  foundedYear: 2015,
  googleRating: "5/5",
  googleReviewCount: 11,
  social: {
    instagram: "https://www.instagram.com/fitlevibe/",
    instagramHandle: "@FitLeViBe",
    facebook: "https://www.facebook.com/FitLeViBe",
    facebookHandle: "@FitLeViBe",
    linkedin: "https://www.linkedin.com/in/leviotte",
    telegram: "https://t.me/fitlevibe",
  },
  /**
   * Exact enroll URL. Do not rewrite, shorten, encode, or UTM-strip.
   */
  enrollUrl:
    "https://accounts.myherbalife.com/Account/Create?appId=1&qrFlow=1&locale=nl-BE&SponsorId=EMT1USfnhsQos54r6gUEjw==&cmp=m_nl_be_wbs_dssignup_btn_nap_copylink_20250305",
} as const;

export const disclosure = {
  short:
    "Onafhankelijk Herbalife-lid. Dit is geen officiële Herbalife-website.",
  footer:
    "Levi Otte is een onafhankelijk Herbalife-lid. Fit met Levi / FitLeViBe is geen officiële Herbalife-website en is niet verbonden met Herbalife International als bedrijfswebsite. Resultaten verschillen per persoon. Geen medisch advies, geen inkomensbeloftes, geen gegarandeerde gewichtsverliescijfers.",
} as const;

export const photos = {
  hero: {
    src: "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=1800&q=80",
    alt: "Rustige stretching in warm daglicht",
  },
  about: {
    src: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=1400&q=80",
    alt: "Buiten bewegen in de ochtendzon",
  },
  nutrition: {
    src: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=1400&q=80",
    alt: "Verse groenten en een eenvoudige, kleurrijke maaltijd",
  },
  weight: {
    src: "https://images.unsplash.com/photo-1447452001602-7090c7ab2db3?auto=format&fit=crop&w=1400&q=80",
    alt: "Rustige beweging in een lichte ruimte",
  },
  muscle: {
    src: "https://images.unsplash.com/photo-1599058917212-d750089bc07e?auto=format&fit=crop&w=1400&q=80",
    alt: "Krachttraining in open lucht",
  },
  vitality: {
    src: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1400&q=80",
    alt: "Rustig bewegen in de natuur",
  },
} as const;

export type GoalId = "gewichtsverlies" | "spiermassa" | "vitaliteit";

export const goals: Record<
  GoalId,
  {
    id: GoalId;
    title: string;
    short: string;
    body: string;
    href: string;
  }
> = {
  gewichtsverlies: {
    id: "gewichtsverlies",
    title: "Gewichtsverlies & -beheersing",
    short: "Rustiger eten, duidelijker bewegen.",
    body: "Je hoeft niet te crashen. We kijken naar eten en bewegen dat je volhoudt — zonder beloofde kilo’s.",
    href: "/fitcheck?doel=gewichtsverlies#fitcheck",
  },
  spiermassa: {
    id: "spiermassa",
    title: "Spiermassa",
    short: "Sterker worden, op jouw ritme.",
    body: "Sterker worden mag rustig. Je krijgt een haalbaar ritme, geen eindeloze gymdagen.",
    href: "/fitcheck?doel=spiermassa#fitcheck",
  },
  vitaliteit: {
    id: "vitaliteit",
    title: "Vitaliteit",
    short: "Meer energie in gewone dagen.",
    body: "Meer energie in gewone dagen: slaap, voeding, een hoofd dat meewerkt. Geen trucje.",
    href: "/fitcheck?doel=vitaliteit#fitcheck",
  },
};

export const goalList = Object.values(goals);

export const faqs = [
  {
    q: "Wat is een FitCheck?",
    a: "Een kort, vrijblijvend gesprek. Je laat je naam, gsm en doel achter. Ik neem contact op, en we kijken of begeleiding zinvol is. Lifestyle coaching, geen medisch onderzoek.",
  },
  {
    q: "Wat kost de FitCheck?",
    a: "De FitCheck zelf is gratis. Daarna bespreken we of en hoe we verdergaan. Geen verborgen inschrijving via dit formulier.",
  },
  {
    q: "Moet ik al sporten?",
    a: "Nee. Of je nu opnieuw begint of al jaren traint: we starten bij waar jij staat.",
  },
  {
    q: "Werk je ook online?",
    a: "Ja. Coaching kan ter plaatse in Roosdaal, buiten, of online — na afspraak.",
  },
  {
    q: "Wat betekent ‘onafhankelijk Herbalife-lid’?",
    a: "Levi is zelfstandig lid-coach, geen werknemer van Herbalife. Deze website is van Fit met Levi / Levi Otte, niet de officiële Herbalife-site. Producten zijn optioneel en nooit een inkomensbelofte.",
  },
  {
    q: "Is dit medisch advies?",
    a: "Nee. FitCheck en coaching zijn geen behandeling van ziektes en vervangen geen arts of diëtist. Bij medische vragen verwijs ik je door.",
  },
] as const;

export function formatAddress() {
  const { street, postalCode, city, country } = site.address;
  return `${street}, ${postalCode} ${city}, ${country}`;
}
