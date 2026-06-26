import { originStory } from "../../data/philosophy";

export function PhilosophySection() {
  return (
    <section id="philosophy" className="section-light">
      <div className="section-container">
        <div className="grid gap-16 lg:grid-cols-[1fr_1.2fr] lg:items-start">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-blue-700">{originStory.eyebrow}</p>
            <h2 className="mt-4 text-3xl font-black leading-tight tracking-tight text-slate-950 md:text-4xl">
              {originStory.title}
            </h2>
            <div className="mt-8 space-y-3">
              {originStory.questions.map((q) => (
                <div key={q} className="rounded-xl border border-blue-100 bg-blue-50/50 px-4 py-3 text-sm font-semibold text-blue-900">
                  {q}
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-6 text-base leading-8 text-slate-600">
            {originStory.paragraphs.map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
