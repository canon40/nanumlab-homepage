import { PageShell } from "../components/layout/PageShell";
import { RoadmapSection } from "../components/sections/RoadmapSection";
import { UseCasesSection } from "../components/sections/UseCasesSection";

export function CasesPage() {
  return (
    <PageShell>
      <UseCasesSection />
      <RoadmapSection />
    </PageShell>
  );
}
