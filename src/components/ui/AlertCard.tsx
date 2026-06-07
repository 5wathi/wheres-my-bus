import { AlertTriangle, Clock, Info, Megaphone } from "lucide-react";
import type { ServiceAlert, AlertSeverity } from "@/lib/types";
import { cn } from "@/lib/utils";

const STYLES: Record<AlertSeverity, { icon: typeof Info; iconColor: string }> = {
  delay: { icon: Clock, iconColor: "text-amber-600/80 dark:text-amber-400/80" },
  diversion: {
    icon: AlertTriangle,
    iconColor: "text-orange-600/80 dark:text-orange-400/80",
  },
  info: { icon: Info, iconColor: "text-muted-foreground" },
};

export function AlertCard({ alert }: { alert: ServiceAlert }) {
  const s = STYLES[alert.severity];
  const Icon = s.icon;
  return (
    <div className="flex gap-2.5 rounded-xl border border-border bg-muted/40 px-3 py-2.5">
      <Icon size={16} className={cn("mt-0.5 shrink-0", s.iconColor)} />
      <div className="min-w-0">
        <p className="text-sm font-medium text-foreground">{alert.title}</p>
        <p className="text-xs text-muted-foreground">{alert.detail}</p>
      </div>
    </div>
  );
}

/** Compact city-wide summary shown at the top of the Live tab. */
export function AlertSummary({ alerts }: { alerts: ServiceAlert[] }) {
  if (alerts.length === 0) return null;
  return (
    <div className="space-y-2">
      <p className="flex items-center gap-1.5 px-1 text-xs font-medium uppercase tracking-wide text-muted-foreground">
        <Megaphone size={13} /> Service alerts
      </p>
      {alerts.map((a) => (
        <AlertCard key={a.id} alert={a} />
      ))}
    </div>
  );
}
