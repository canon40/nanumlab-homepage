import { Send } from "lucide-react";
import { useLocale } from "../../i18n/context";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Input } from "../ui/input";
import { SectionHeader } from "../ui/SectionHeader";
import { Select } from "../ui/select";
import { Textarea } from "../ui/textarea";

export function ContactSection() {
  const { t } = useLocale();
  const c = t.home.contact;

  return (
    <section id="contact" className="section-muted scroll-mt-[72px] border-t border-slate-200">
      <div className="section-container">
        <SectionHeader title={c.title} description={c.subtitle} />
        <Card className="mx-auto max-w-3xl border-slate-200 p-6 shadow-lg">
          <form className="grid gap-4" onSubmit={(e) => e.preventDefault()}>
            <div className="grid gap-4 md:grid-cols-2">
              <Input placeholder={c.fields.name} required />
              <Input placeholder={c.fields.org} required />
            </div>
            <Input placeholder={c.fields.dept} />
            <div className="grid gap-4 md:grid-cols-2">
              <Input type="email" placeholder={c.fields.email} required />
              <Input placeholder={c.fields.phone} />
            </div>
            <Select defaultValue="">
              <option value="" disabled>
                {c.fields.topic}
              </option>
              {c.topics.map((topic) => (
                <option key={topic} value={topic}>
                  {topic}
                </option>
              ))}
            </Select>
            <Textarea placeholder={c.fields.message} rows={5} required />
            <Button type="submit" size="lg" className="w-full bg-gov-blue-900 hover:bg-gov-blue-800 md:w-auto">
              {c.cta} <Send className="ml-2 h-4 w-4" />
            </Button>
          </form>
        </Card>
      </div>
    </section>
  );
}
