/** Belgian mobile: national 04xxxxxxxx or E.164 +324xxxxxxxx. */
const BE_MOBILE =
  /^(?:\+|00)?(?:32)?0?4\d{8}$/;

export function normalizeBeMobile(raw: string): string | null {
  const compact = raw.replace(/[\s./()-]/g, "");
  if (!BE_MOBILE.test(compact)) return null;

  const digits = compact.replace(/^\+/, "").replace(/^00/, "");
  const national = digits.startsWith("32") ? digits.slice(2) : digits;
  const withoutTrunk = national.startsWith("0") ? national.slice(1) : national;

  if (!/^4\d{8}$/.test(withoutTrunk)) return null;
  return `+32${withoutTrunk}`;
}

export function formatBeMobileDisplay(e164: string): string {
  const rest = e164.replace(/^\+32/, "");
  if (rest.length !== 9) return e164;
  return `+32 ${rest.slice(0, 3)} ${rest.slice(3, 5)} ${rest.slice(5, 7)} ${rest.slice(7)}`;
}
