export const site = {
  publicName: "Fit met Levi",
  personName: "Levi Otte",
  legalHandle: "FitLeViBe",
  jobTitle: "Persoonlijk coach",
  locale: "nl-BE",
  url: "https://fitlevibe.com",
  tagline: "20% training, 80% voeding, 100% mindset.",
  description:
    "Fit met Levi: persoonlijke begeleiding door Levi Otte in Roosdaal. Gepersonaliseerde programma's, gratis FitCheck, coaching sinds 2015.",
  address: {
    street: "Zavelstraat 19",
    postalCode: "1760",
    city: "Roosdaal",
    country: "België",
    countryCode: "BE",
  },
  phoneDisplay: "+32 475 34 44 02",
  phoneE164: "+32475344402",
  email: undefined as string | undefined,
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
    src: "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?auto=format&fit=crop&w=1800&q=80",
    alt: "Mensen die buiten traplopen in warm daglicht",
  },
  about: {
    src: "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=1400&q=80",
    alt: "Rustige stretching in een lichte trainingsruimte",
  },
  nutrition: {
    src: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=1400&q=80",
    alt: "Verse groenten en een eenvoudige, kleurrijke maaltijd",
  },
  weight: {
    src: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=1400&q=80",
    alt: "Buiten bewegen in de ochtendzon",
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
    short: "Rustiger eten, duidelijker bewegen, zonder crash.",
    body: "Samen kijken we naar gewoontes die je volhoudt. Geen beloofde kilo’s, geen crashdieet: een plan rond voeding, beweging en mindset dat bij jouw leven in Roosdaal — of online — past.",
    href: "/fitcheck?doel=gewichtsverlies#fitcheck",
  },
  spiermassa: {
    id: "spiermassa",
    title: "Spiermassa",
    short: "Sterker worden, met voeding die meewerkt.",
    body: "Spieropbouw vraagt consistentie, niet eindeloos in de gym staan. Je krijgt een haalbaar schema en voedingsrichting, afgestemd op jouw ritme.",
    href: "/fitcheck?doel=spiermassa#fitcheck",
  },
  vitaliteit: {
    id: "vitaliteit",
    title: "Vitaliteit",
    short: "Meer energie in gewone dagen.",
    body: "Beter slapen, steviger staan, minder pieken en dalen. Vitaliteit is geen trucje: het is ritme, voeding en een hoofd dat meewerkt.",
    href: "/fitcheck?doel=vitaliteit#fitcheck",
  },
};

export const goalList = Object.values(goals);

export const faqs = [
  {
    q: "Wat is een FitCheck?",
    a: "Een FitCheck is een kort, vrijblijvend eerste gesprek. Je laat je naam, gsm en doel achter. Levi neemt contact op en we kijken samen of begeleiding zinvol is. Het is lifestyle coaching, geen medisch onderzoek.",
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
