import { ArrowDown, Lock } from "lucide-react";
import { Card } from "../ui/card";

const layers = [
  "User Web / Mobile",
  "Frontend Application",
  "API Gateway + RBAC",
  "Backend Service (FastAPI)",
  "PostgreSQL / Vector DB / AI Engine",
  "On-Premise Docker / 감사 로그",
];

export function ArchitectureSection() {
  return (
    <section id="architecture" className="section-muted">
      <div className="section-container">
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-800">
            <Lock className="h-3.5 w-3.5" />
            On-Premise First
          </div>
          <h2 className="mt-5 text-3xl font-black tracking-tight text-slate-950 md:text-4xl">
            폐쇄망을 전제로 한 아키텍처
          </h2>
          <p className="mt-4 text-slate-600">
            외부 API에 의존하지 않고, 공공기관 내부망에서 AI와 데이터 파이프라인이 끊기지 않도록 설계했습니다.
          </p>
        </div>
        <Card className="mx-auto max-w-3xl border-slate-200 bg-white p-6 shadow-lg">
          <div className="space-y-3">
            {layers.map((layer, index) => (
              <div key={layer}>
                <div className="rounded-xl border border-slate-200 bg-slate-50 px-5 py-4 text-center font-bold text-slate-900">
                  {layer}
                </div>
                {index < layers.length - 1 && <ArrowDown className="mx-auto my-2 h-5 w-5 text-blue-500" />}
              </div>
            ))}
          </div>
        </Card>
      </div>
    </section>
  );
}
