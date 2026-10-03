/** Small inline line icons (24×24, currentColor). No icon font, no extra requests. */
const paths = {
  fat: ["M12 3a9 9 0 1 0 9 9h-9z", "M15 3.5A9 9 0 0 1 20.5 9H15z"],
  muscle: ["M6 7v10", "M18 7v10", "M3 10v4", "M21 10v4", "M6 12h12"],
  water: ["M12 2.8c3.4 3.9 6 7.2 6 10.2a6 6 0 0 1-12 0c0-3 2.6-6.3 6-10.2z", "M9 14a3 3 0 0 0 3 3"],
  metabolism: ["M12 3c.6 3.2 4.5 5 4.5 9.5a4.5 4.5 0 0 1-9 0c0-2.2 1.1-3.6 2.2-4.6.1 1.8.9 2.9 2 3.3-.4-2.8-.8-5.3.3-8.2z"],
  vitaliteit: ["M12 20s-7.5-4.6-7.5-10.2A4.1 4.1 0 0 1 12 7.4a4.1 4.1 0 0 1 7.5 2.4C19.5 15.4 12 20 12 20z", "M7.5 12h2.2l1.3-2 2 4 1.3-2h2.2"],
  gewichtsverlies: ["M6 4h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z", "M8.5 10a3.5 3.5 0 0 1 7 0", "M12 10l1.6-1.6"],
  spiermassa: ["M6 7v10", "M18 7v10", "M3 10v4", "M21 10v4", "M6 12h12"],
  blessurepreventie: ["M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6z", "M9 12l2 2 4-4"],
  sportspecifiek: ["M8 4h8v5a4 4 0 0 1-8 0z", "M8 6H5a3 3 0 0 0 3 4", "M16 6h3a3 3 0 0 1-3 4", "M12 13v4", "M9 20h6"],
  voedingspatroon: ["M5 19C4 11 9 5 19 5c0 10-6 15-14 14z", "M5 19l8-8"],
  check: ["M5 12.5l4.5 4.5L19 7.5"],
} as const;

export type IconName = keyof typeof paths;

export function Icon({ name, className = "h-6 w-6" }: { name: IconName; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[name].map((d) => (
        <path key={d} d={d} />
      ))}
    </svg>
  );
}
