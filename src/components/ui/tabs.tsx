import * as React from "react";
import { cn } from "../../lib/utils";

type TabsContextValue = {
  value: string;
  setValue: (v: string) => void;
};

const TabsContext = React.createContext<TabsContextValue | null>(null);

interface TabsProps {
  defaultValue: string;
  className?: string;
  children: React.ReactNode;
}

export function Tabs({ defaultValue, className, children }: TabsProps) {
  const [value, setValue] = React.useState(defaultValue);
  return (
    <TabsContext.Provider value={{ value, setValue }}>
      <div className={className}>{children}</div>
    </TabsContext.Provider>
  );
}

export function TabsList({ className, variant = "light", children }: { className?: string; variant?: "light" | "dark"; children: React.ReactNode }) {
  return (
    <div
      className={cn(
        "inline-flex w-full rounded-lg border p-1",
        variant === "dark" ? "border-white/10 bg-white/5" : "border-slate-200 bg-slate-50",
        className,
      )}
      role="tablist"
    >
      {children}
    </div>
  );
}

export function TabsTrigger({
  value,
  className,
  variant = "light",
  children,
}: {
  value: string;
  className?: string;
  variant?: "light" | "dark";
  children: React.ReactNode;
}) {
  const ctx = React.useContext(TabsContext);
  if (!ctx) throw new Error("TabsTrigger must be used within Tabs");
  const active = ctx.value === value;

  return (
    <button
      type="button"
      role="tab"
      aria-selected={active}
      className={cn(
        "flex-1 rounded-md px-3 py-2 text-xs font-bold transition sm:text-sm",
        active
          ? variant === "dark"
            ? "bg-electric-blue-600/25 text-white shadow-sm"
            : "bg-white text-gov-blue-900 shadow-sm"
          : variant === "dark"
            ? "text-slate-400 hover:text-white"
            : "text-slate-500 hover:text-gov-blue-700",
        className,
      )}
      onClick={() => ctx.setValue(value)}
    >
      {children}
    </button>
  );
}

export function TabsContent({ value, className, children }: { value: string; className?: string; children: React.ReactNode }) {
  const ctx = React.useContext(TabsContext);
  if (!ctx) throw new Error("TabsContent must be used within Tabs");
  if (ctx.value !== value) return null;
  return <div className={cn("mt-4", className)} role="tabpanel">{children}</div>;
}
