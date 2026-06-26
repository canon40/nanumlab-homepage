import { solutions } from "../../data/solutions";
import { Badge } from "../ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";

export function SolutionsSection() {
  return (
    <section id="solutions" className="section-dark">
      <div className="section-container">
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-blue-400">Core Solutions</p>
          <h2 className="mt-4 text-3xl font-black tracking-tight text-white md:text-4xl">
            현장의 고민에서 나온 솔루션
          </h2>
          <p className="mt-4 text-slate-400">
            보여주기식 도입이 아닙니다. 행정 현장에서 실제로 돌아가는 구조만 남겼습니다.
          </p>
        </div>
        <div className="grid gap-6 lg:grid-cols-3">
          {solutions.map((solution) => (
            <Card key={solution.title} className="border-slate-800 bg-slate-900 transition hover:border-blue-500/40">
              <CardHeader>
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-600 text-white">
                  <solution.icon className="h-6 w-6" />
                </div>
                <CardTitle className="text-white">{solution.title}</CardTitle>
                <CardDescription className="text-slate-400">{solution.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {solution.features.map((feature) => (
                    <Badge key={feature} className="border-slate-700 bg-slate-800 text-slate-300">
                      {feature}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
