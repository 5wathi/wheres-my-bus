import { Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatEta, occupancyDots, occupancyText } from "@/lib/utils";

/** A star toggle for favouriting a stop. */
export function FavStar({
  active,
  onClick,
  className,
}: {
  active: boolean;
  onClick: () => void;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      aria-label={active ? "Remove favourite" : "Add favourite"}
      aria-pressed={active}
      className={cn(
        "rounded-full p-1.5 transition-colors",
        active ? "text-amber-500 hover:text-amber-600" : "text-muted-foreground hover:text-amber-500",
        className
      )}
    >
      <Star size={16} fill={active ? "currentColor" : "none"} />
    </button>
  );
}

/** A colored pill showing a route number. */
export function RouteBadge({
  number,
  color,
  className,
}: {
  number: string;
  color: string;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex min-w-[2.75rem] items-center justify-center rounded-md px-2 py-1 text-xs font-bold text-white",
        className
      )}
      style={{ backgroundColor: color }}
    >
      {number}
    </span>
  );
}

/** Three-dot crowding indicator. */
export function Occupancy({ level }: { level: "low" | "medium" | "high" }) {
  const filled = occupancyDots(level);
  const color =
    level === "low" ? "#5a9b80" : level === "medium" ? "#b59758" : "#bd7186";
  return (
    <span className="inline-flex items-center gap-1.5" title={occupancyText(level)}>
      <span className="flex items-end gap-0.5" aria-hidden>
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="w-1 rounded-sm"
            style={{
              height: 5 + i * 3,
              backgroundColor: i < filled ? color : "hsl(220 13% 85%)",
            }}
          />
        ))}
      </span>
      <span className="text-xs text-muted-foreground">{occupancyText(level)}</span>
    </span>
  );
}

/** ETA pill: emphasises "Due". */
export function EtaPill({ sec }: { sec: number }) {
  const due = sec <= 30;
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold tabular-nums",
        due ? "bg-brand-600 text-white" : "bg-brand-50 text-brand-700"
      )}
    >
      {formatEta(sec)}
    </span>
  );
}
