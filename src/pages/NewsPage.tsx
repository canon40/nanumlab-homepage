import { PageShell } from "../components/layout/PageShell";
import { NewsSection } from "../components/sections/NewsSection";

export function NewsPage() {
  return (
    <PageShell>
      <NewsSection showAll />
    </PageShell>
  );
}
