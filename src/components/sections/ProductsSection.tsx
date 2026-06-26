import { ArrowRight } from "lucide-react";
import { products } from "../../data/products";
import { Link } from "../../router";
import { SectionHeading } from "./SectionHeading";

export function ProductsSection() {
  return (
    <section className="section-light">
      <div className="section-container">
        <SectionHeading
          eyebrow="AI Platform"
          title="나눔랩 AI 제품 라인업"
          description="공공·지역 현장에 특화된 AI 제품군을 플랫폼 단위로 제공합니다."
        />
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <Link key={product.name} to={product.path} className="product-card group block">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-900 to-blue-700 text-white shadow-lg shadow-blue-900/20">
                <product.icon className="h-6 w-6" />
              </div>
              <p className="text-xs font-bold uppercase tracking-wider text-blue-600">{product.category}</p>
              <h3 className="mt-2 text-xl font-black text-slate-950 group-hover:text-blue-800">{product.name}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-600">{product.description}</p>
              <span className="mt-4 inline-flex items-center text-sm font-semibold text-blue-700">
                자세히 보기 <ArrowRight className="ml-1 h-4 w-4 transition group-hover:translate-x-1" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
