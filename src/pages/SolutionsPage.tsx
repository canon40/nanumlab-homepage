import { useEffect } from "react";
import { PageShell } from "../components/layout/PageShell";
import { CoreSolutionsSection } from "../components/sections/CoreSolutionsSection";
import { FutureTechSection } from "../components/sections/FutureTechSection";

export function SolutionsPage() {
  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    if (!hash) return;
    const timer = window.setTimeout(() => {
      document.getElementById(hash)?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <PageShell>
      <CoreSolutionsSection />
      <FutureTechSection />
    </PageShell>
  );
}
