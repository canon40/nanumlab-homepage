import { ArrowRight, MessageCircle } from "lucide-react";
import { useLocale } from "../../i18n/context";
import { useRouter } from "../../router";
import { Button } from "../ui/button";

export function QuickContactSection() {
  const { t } = useLocale();
  const { navigate } = useRouter();
  const q = t.home.quickContact;

  return (
    <section className="relative overflow-hidden border-t border-white/10 bg-slate-950 text-white">
      <div className="section-container">
        <div className="grid gap-8 rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm lg:grid-cols-2 lg:p-10">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.15em] text-electric-blue-300">{q.eyebrow}</p>
            <h2 className="mt-3 text-2xl font-black md:text-3xl">{q.title}</h2>
            <p className="mt-4 text-base font-medium leading-8 text-slate-300">{q.description}</p>
          </div>
          <div className="flex flex-col justify-center rounded-xl border border-white/10 bg-gov-blue-950/50 p-6">
            <div className="flex items-center gap-2 text-electric-blue-300">
              <MessageCircle className="h-5 w-5" />
              <h3 className="font-black">{q.onlineTitle}</h3>
            </div>
            <p className="mt-2 text-sm font-medium leading-7 text-slate-400">{q.onlineDescription}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {q.subjects.map((subject) => (
                <span
                  key={subject}
                  className="rounded-full border border-electric-blue-400/30 bg-electric-blue-500/10 px-3 py-1 text-xs font-bold text-electric-blue-200"
                >
                  {subject}
                </span>
              ))}
            </div>
            <Button
              className="mt-6 w-full bg-electric-blue-600 font-bold hover:bg-electric-blue-500 sm:w-auto"
              onClick={() => navigate("/contact")}
            >
              {t.home.nav.contact} <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
