import { PageShell } from "../components/layout/PageShell";
import { NanumEdgeSection } from "../components/sections/NanumEdgeSection";
import { WhatWeDoSection } from "../components/sections/WhatWeDoSection";

export function AboutPage() {
  return (
    <PageShell>
      <WhatWeDoSection />
      <NanumEdgeSection />
    </PageShell>
  );
}
