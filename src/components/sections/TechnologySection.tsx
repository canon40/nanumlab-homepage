import { technologyDecisions } from "../../data/technologyDecisions";

export function TechnologySection() {
  return (
    <section id="technology" className="section-light">
      <div className="section-container">
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-blue-700">Technology Decisions</p>
          <h2 className="mt-4 text-3xl font-black tracking-tight text-slate-950 md:text-4xl">
            기술 스택이 아닌, 기술적 결단
          </h2>
          <p className="mt-4 text-slate-600">
            React, FastAPI, PostgreSQL을 나열하는 것이 아니라, 왜 이 선택을 했는지가 중요합니다.
          </p>
        </div>

        <div className="space-y-6">
          {technologyDecisions.map((tech) => (
            <article key={tech.category} className="rounded-2xl border border-slate-200 bg-white p-8 transition hover:border-blue-200 hover:shadow-lg">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                <div className="lg:max-w-xl">
                  <p className="text-xs font-bold uppercase tracking-wider text-blue-600">{tech.category}</p>
                  <h3 className="mt-2 text-xl font-black text-slate-950">{tech.choice}</h3>
                  <p className="mt-3 leading-7 text-slate-600">{tech.rationale}</p>
                </div>
                <div className="flex flex-wrap gap-2 lg:max-w-xs lg:justify-end">
                  {tech.items.map((item) => (
                    <span key={item} className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 font-mono text-xs text-slate-700">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
