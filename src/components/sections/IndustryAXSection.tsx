import { industries } from "../../data/industries";
import { Link } from "../../router";
import { SectionHeading } from "./SectionHeading";
import { SolutionImage } from "../visual/SolutionImage";

export function IndustryAXSection() {
  return (
    <section className="section-dark">
      <div className="section-container">
        <SectionHeading
          eyebrow="Industry AX"
          title="산업별 AI 전환(AX) 영역"
          description="공공·지자체, 관광·문화, 행정·민원, 지역상권, 공공데이터, XR 공간정보 분야에 AI를 적용합니다."
          variant="dark"
        />
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
          {industries.map((industry) => (
            <Link key={industry.label} to={industry.path} className="industry-chip-dark group">
              <div className="h-16 w-16 overflow-hidden rounded-2xl border border-white/10 ring-2 ring-transparent transition group-hover:border-gov-blue-400/50 group-hover:ring-gov-blue-500/30">
                <SolutionImage src={industry.image} alt={industry.label} size="thumb" className="h-full w-full object-cover" />
              </div>
              <span className="text-center text-sm font-bold text-slate-200">{industry.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
