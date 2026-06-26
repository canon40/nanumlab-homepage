import { Building2, Compass, Workflow } from "lucide-react";
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { SectionHeading } from "./SectionHeading";

const items = [
  { icon: Building2, title: "공공서비스 이해도", description: "공공기관 업무 절차, 개인정보 보호, 정산·통계·운영관리 구조를 AI 설계에 반영합니다." },
  { icon: Workflow, title: "기획과 AI 개발의 연결", description: "LLM·데이터 모델링을 실제 서비스 화면, API, 운영 대시보드로 구체화합니다." },
  { icon: Compass, title: "운영 가능한 AI 적용", description: "과장 없이 행정·관광·민원 현장에서 바로 쓸 수 있는 AI 기능 단위로 설계합니다." },
];

export function CompanySection() {
  return (
    <section id="company" className="section-light">
      <div className="section-container">
        <SectionHeading
          eyebrow="Company"
          title="공공기관과 지역사회를 위한 AI·데이터 기술기업"
          description="나눔랩은 단순 시스템 개발을 넘어 AI 모델 기획, 데이터 설계, 플랫폼 구축, 운영관리까지 연결하는 기술기획형 ICT 기업입니다."
        />
        <div className="grid gap-6 md:grid-cols-3">
          {items.map((item) => (
            <Card key={item.title} className="transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg">
              <CardHeader>
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-900 text-white">
                  <item.icon className="h-6 w-6" />
                </div>
                <CardTitle>{item.title}</CardTitle>
                <CardDescription>{item.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
