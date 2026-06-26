import { ArrowLeftRight, Building2, CheckCircle2, QrCode, Smartphone, Monitor } from "lucide-react";
import { useLocale } from "../../i18n/context";

export function PublicDXInfographic() {
  const { t } = useLocale();
  const ig = t.home.infographic;

  return (
    <div className="relative mx-auto w-full max-w-lg">
      <div className="absolute -inset-4 rounded-3xl bg-gov-blue-50/80" aria-hidden="true" />

      <div className="relative grid gap-4">
        {/* 주민 모바일 */}
        <div className="gov-device-card ml-0 mr-8">
          <div className="mb-3 flex items-center gap-2 text-gov-blue-700">
            <Smartphone className="h-4 w-4" />
            <span className="text-xs font-bold">{ig.mobileLabel}</span>
          </div>
          <div className="rounded-xl border border-gov-blue-100 bg-gov-blue-50/50 p-4">
            <div className="flex items-center gap-2 text-sm font-bold text-gov-blue-900">
              <Building2 className="h-4 w-4" />
              {ig.citizenApp}
            </div>
            <div className="mt-3 space-y-2">
              <div className="flex items-center gap-2 rounded-lg bg-white px-3 py-2 text-xs text-slate-700 shadow-sm">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                {ig.benefitCheck}
              </div>
              <div className="flex items-center gap-2 rounded-lg bg-white px-3 py-2 text-xs text-slate-700 shadow-sm">
                <QrCode className="h-3.5 w-3.5 text-gov-blue-600" />
                {ig.qrTicket}
              </div>
            </div>
          </div>
        </div>

        {/* 데이터 흐름 */}
        <div className="flex items-center justify-center gap-3 px-4">
          <div className="h-px flex-1 bg-gov-blue-200" />
          <div className="flex flex-col items-center gap-1 rounded-full border border-gov-blue-200 bg-white px-4 py-2 shadow-sm">
            <ArrowLeftRight className="h-4 w-4 text-gov-blue-600" />
            <span className="text-[10px] font-semibold text-gov-blue-700">{ig.flowVerify}</span>
          </div>
          <div className="h-px flex-1 bg-gov-blue-200" />
        </div>

        {/* 공무원 대시보드 */}
        <div className="gov-device-card ml-8 mr-0">
          <div className="mb-3 flex items-center gap-2 text-gov-blue-700">
            <Monitor className="h-4 w-4" />
            <span className="text-xs font-bold">{ig.adminLabel}</span>
          </div>
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
            <div className="text-sm font-bold text-slate-800">{ig.adminDash}</div>
            <div className="mt-3 grid grid-cols-2 gap-2">
              <div className="rounded-lg bg-gov-blue-700 px-3 py-2 text-center text-[10px] font-bold text-white">
                {ig.oneClick}
              </div>
              <div className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-center text-[10px] font-medium text-slate-600">
                {ig.auditLog}
              </div>
            </div>
            <div className="mt-2 h-2 rounded-full bg-slate-200">
              <div className="h-2 w-4/5 rounded-full bg-gov-blue-500" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
