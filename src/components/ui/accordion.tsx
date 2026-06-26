import * as React from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "../../lib/utils";

type AccordionContextValue = {
  openItems: string[];
  toggle: (value: string) => void;
  type: "single" | "multiple";
};

const AccordionContext = React.createContext<AccordionContextValue | null>(null);

interface AccordionProps {
  type?: "single" | "multiple";
  defaultValue?: string | string[];
  className?: string;
  children: React.ReactNode;
}

export function Accordion({ type = "single", defaultValue, className, children }: AccordionProps) {
  const initial = Array.isArray(defaultValue) ? defaultValue : defaultValue ? [defaultValue] : [];
  const [openItems, setOpenItems] = React.useState<string[]>(initial);

  const toggle = React.useCallback(
    (value: string) => {
      setOpenItems((prev) => {
        if (type === "single") return prev[0] === value ? [] : [value];
        return prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value];
      });
    },
    [type],
  );

  return (
    <AccordionContext.Provider value={{ openItems, toggle, type }}>
      <div className={cn("space-y-2", className)}>{children}</div>
    </AccordionContext.Provider>
  );
}

export function AccordionItem({ value, className, children }: { value: string; className?: string; children: React.ReactNode }) {
  return <div className={cn("overflow-hidden rounded-xl border border-slate-200 bg-white", className)} data-value={value}>{children}</div>;
}

export function AccordionTrigger({ value, className, children }: { value: string; className?: string; children: React.ReactNode }) {
  const ctx = React.useContext(AccordionContext);
  if (!ctx) throw new Error("AccordionTrigger must be used within Accordion");
  const open = ctx.openItems.includes(value);

  return (
    <button
      type="button"
      className={cn(
        "flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-sm font-bold text-gov-blue-950 transition hover:bg-gov-blue-50/50",
        className,
      )}
      aria-expanded={open}
      onClick={() => ctx.toggle(value)}
    >
      <span>{children}</span>
      <ChevronDown className={cn("h-4 w-4 shrink-0 text-gov-blue-600 transition-transform", open && "rotate-180")} />
    </button>
  );
}

export function AccordionContent({ value, className, children }: { value: string; className?: string; children: React.ReactNode }) {
  const ctx = React.useContext(AccordionContext);
  if (!ctx) throw new Error("AccordionContent must be used within Accordion");
  if (!ctx.openItems.includes(value)) return null;

  return <div className={cn("border-t border-slate-100 px-5 py-4", className)}>{children}</div>;
}
