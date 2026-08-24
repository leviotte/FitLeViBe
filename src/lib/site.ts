export const site = {
  publicName: "Fit met Levi",
  personName: "Levi Otte",
  legalHandle: "FitLeViBe",
  url: "https://fitlevibe.com",
  address: {
    street: "Zavelstraat 19",
    postalCode: "1760",
    city: "Roosdaal",
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
   * Exact enroll URL. Do not rewrite, shorten, encode, UTM-strip,
   * or change the query locale per page language.
   */
  enrollUrl:
    "https://accounts.myherbalife.com/Account/Create?appId=1&qrFlow=1&locale=nl-BE&SponsorId=EMT1USfnhsQos54r6gUEjw==&cmp=m_nl_be_wbs_dssignup_btn_nap_copylink_20250305",
} as const;

export type GoalId = "gewichtsverlies" | "spiermassa" | "vitaliteit";

export const GOAL_IDS = [
  "gewichtsverlies",
  "spiermassa",
  "vitaliteit",
] as const satisfies readonly GoalId[];

export function isGoalId(value: string): value is GoalId {
  return (GOAL_IDS as readonly string[]).includes(value);
}

export function formatAddress(countryName: string) {
  const { street, postalCode, city } = site.address;
  return `${street}, ${postalCode} ${city}, ${countryName}`;
}

export function formatNap(countryName: string) {
  return `${site.personName}, ${site.publicName}, ${formatAddress(countryName)}, ${site.phoneDisplay}`;
}
