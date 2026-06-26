import { Link } from "../../router";
import { Button } from "../ui/button";

export function NotFoundContent() {
  return (
    <section className="section-light">
      <div className="section-container flex min-h-[50vh] flex-col items-center justify-center py-24 text-center">
        <p className="text-sm font-bold uppercase tracking-[0.15em] text-gov-blue-600">404</p>
        <h1 className="mt-4 text-3xl font-black text-gov-blue-950 md:text-4xl">페이지를 찾을 수 없습니다</h1>
        <p className="mt-4 max-w-md text-slate-600">요청하신 주소가 없거나 이동되었을 수 있습니다.</p>
        <Link to="/" className="mt-8">
          <Button size="lg" className="bg-gov-blue-800 hover:bg-gov-blue-700">홈으로 돌아가기</Button>
        </Link>
      </div>
    </section>
  );
}
