import { PageShell } from "../components/layout/PageShell";
import { PlatformArchitectureSection } from "../components/sections/PlatformArchitectureSection";
import { TechStackSection } from "../components/sections/TechStackSection";

export function TechnologyPage() {
  return (
    <PageShell>
      <TechStackSection />
      <PlatformArchitectureSection />
    </PageShell>
  );
}
