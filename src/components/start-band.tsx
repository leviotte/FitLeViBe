import { getTranslations } from "next-intl/server";
import { StartButton } from "@/components/enroll";

export async function StartBand() {
  const t = await getTranslations("StartBand");

  return (
    <section className="px-5 py-20 sm:px-8 sm:py-28">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="font-display text-4xl leading-tight text-indigo sm:text-5xl">
          {t("title")}
        </h2>
        <p className="mx-auto mt-5 max-w-md text-lg leading-8 text-muted">{t("body")}</p>
        <div className="mt-9 flex justify-center">
          <StartButton className="min-h-14 px-8 text-lg" />
        </div>
      </div>
    </section>
  );
}
