import { useLocale } from "../../i18n/context";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";
import { SectionHeader } from "../ui/SectionHeader";

export function UseCasesSection() {
  const { t } = useLocale();
  const u = t.home.useCases;

  return (
    <section id="use-cases" className="section-muted scroll-mt-[72px] border-y border-slate-200">
      <div className="section-container">
        <SectionHeader eyebrow="Use Cases" title={u.subtitle} />
        <Accordion type="single" defaultValue="0">
          {u.items.map((item, i) => (
            <AccordionItem key={item.title} value={String(i)}>
              <AccordionTrigger value={String(i)}>{item.title}</AccordionTrigger>
              <AccordionContent value={String(i)}>
                <p className="text-sm leading-7 text-slate-600">{item.body}</p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
