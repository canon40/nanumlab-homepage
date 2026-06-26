import { getSolutionImage } from "../../data/solutionCatalog";
import { AIParticleCanvas } from "../ui/AIParticleCanvas";
import { SolutionImage } from "../visual/SolutionImage";

interface PageBackdropProps {
  imageSrc?: string;
}

/** 메뉴 페이지 공통 다크 AI 배경 */
export function PageBackdrop({ imageSrc }: PageBackdropProps) {
  const bgImage = imageSrc ?? getSolutionImage("smart-ticket");

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden="true">
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-950 to-slate-900" />
      <div className="absolute inset-0 opacity-20">
        <AIParticleCanvas />
      </div>
      <div className="absolute right-0 top-24 hidden h-[420px] w-[520px] overflow-hidden opacity-[0.12] lg:block">
        <SolutionImage src={bgImage} alt="" size="hero" className="object-cover" />
      </div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_0%,rgba(37,99,235,0.12),transparent)]" />
    </div>
  );
}
