type IconName = "water_drop" | "check_circle" | "local_florist" | "ac_unit" | "eco" | "spa" | "arrow_forward";
const paths: Record<Exclude<IconName, "local_florist">, string> = {
  water_drop: "M12 3C9 7 5 11 5 15a7 7 0 0 0 14 0c0-4-4-8-7-12Z",
  check_circle: "M20.5 8a9 9 0 1 1-3-3M8 11l4 4 9-10",
  ac_unit: "M12 2v20M3.3 7l17.4 10M3.3 17 20.7 7M9 4l3 3 3-3M9 20l3-3 3 3M4 10l4-1-1-4M17 19l-1-4 4-1M4 14l4 1-1 4M17 5l-1 4 4 1",
  eco: "M20 4C6 2 2 9 5 16s17 5 15-12ZM5 20 16 9",
  spa: "M12 20C4 20 2 15 3 9c5 0 8 4 9 11Zm0 0c8 0 10-5 9-11-5 0-8 4-9 11Zm0-6c-4-4-3-8 0-12 3 4 4 8 0 12Z",
  arrow_forward: "M4 12h16m-6-6 6 6-6 6",
};
export default function Icon({ name, className = "" }: { name: IconName; className?: string }) {
  return <svg aria-hidden="true" width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={`shrink-0 ${className}`}>
    {name === "local_florist" ? <>{[0, 72, 144, 216, 288].map(angle => <ellipse key={angle} cx="12" cy="6.5" rx="2.8" ry="4" transform={`rotate(${angle} 12 12)`} />)}<circle cx="12" cy="12" r="2.5" /></> : <path d={paths[name]} />}
  </svg>;
}
