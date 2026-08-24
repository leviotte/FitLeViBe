import { HeaderBar } from "@/components/header-bar";
import { LanguageSwitcher } from "@/components/language-switcher";

export async function Header() {
  return <HeaderBar languageSwitcher={<LanguageSwitcher />} />;
}
