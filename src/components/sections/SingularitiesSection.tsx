import { fieldSingularities, singularities } from "../../data/singularities";
import { DeveloperNote } from "../ui/DeveloperNote";

export function SingularitiesSection() {
  return (
    <section id="singularities" className="section-muted">
      <div className="section-container">
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-blue-700">Technical Singularities</p>
          <h2 className="mt-4 text-3xl font-black tracking-tight text-slate-950 md:text-4xl">
            나눔랩만의 기술적 특이점
          </h2>
          <p className="mt-4 text-slate-600">
            단순한 기능 나열이 아닙니다. 현장의 고민 끝에 도달한 설계 결정과 개발자의 생각을 기록합니다.
          </p>
        </div>

        <div className="space-y-12">
          {singularities.map((item, index) => (
            <article
              key={item.id}
              className={`grid gap-8 lg:grid-cols-2 lg:items-center ${index % 2 === 1 ? "lg:[direction:rtl]" : ""}`}
            >
              <div className={index % 2 === 1 ? "lg:[direction:ltr]" : ""}>
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-900 text-white">
                    <item.icon className="h-5 w-5" />
                  </div>
                  <span className="font-mono text-xs font-bold text-blue-700">{item.tag}</span>
                </div>
                <h3 className="text-2xl font-black text-slate-950">{item.title}</h3>
                <p className="mt-2 text-sm font-bold text-blue-700">{item.edge}</p>
                <p className="mt-4 leading-7 text-slate-600">{item.body}</p>
              </div>
              <div className={index % 2 === 1 ? "lg:[direction:ltr]" : ""}>
                <DeveloperNote tag={item.tag} log={item.log} />
              </div>
            </article>
          ))}
        </div>

        <div className="mt-20 grid gap-6 md:grid-cols-2">
          {fieldSingularities.map((item) => (
            <div key={item.title} className="rounded-2xl border border-slate-200 bg-white p-8">
              <h4 className="text-lg font-black text-slate-950">{item.title}</h4>
              <p className="mt-3 text-sm leading-7 text-slate-600">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
