import { motion } from 'framer-motion';
import { QrCode, Ticket, Users, BarChart3 } from 'lucide-react';

export default function HeroVisualMockup() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="relative"
    >
      <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-indigo-100 to-violet-100 opacity-60 blur-2xl" />
      <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50 px-5 py-3">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600">
              <Ticket className="h-4 w-4 text-white" />
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-900">SmartTicket Admin</p>
              <p className="text-xs text-slate-500">공공마이데이터 연동 발권 플랫폼</p>
            </div>
          </div>
          <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700">
            운영 중
          </span>
        </div>

        <div className="grid grid-cols-3 gap-3 p-5">
          {[
            { icon: Ticket, label: '오늘 발권', value: '1,284', color: 'text-indigo-600 bg-indigo-50' },
            { icon: QrCode, label: 'QR 검표', value: '96.2%', color: 'text-violet-600 bg-violet-50' },
            { icon: Users, label: '감면 적용', value: '412', color: 'text-emerald-600 bg-emerald-50' },
          ].map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className="rounded-xl border border-slate-100 bg-slate-50 p-3">
                <div className={`mb-2 flex h-8 w-8 items-center justify-center rounded-lg ${stat.color}`}>
                  <Icon className="h-4 w-4" />
                </div>
                <p className="text-lg font-bold text-slate-900">{stat.value}</p>
                <p className="text-xs text-slate-500">{stat.label}</p>
              </div>
            );
          })}
        </div>

        <div className="border-t border-slate-100 px-5 py-4">
          <div className="mb-3 flex items-center justify-between">
            <p className="text-sm font-semibold text-slate-800">실시간 예매 현황</p>
            <BarChart3 className="h-4 w-4 text-slate-400" />
          </div>
          <div className="flex h-24 items-end gap-2">
            {[40, 65, 45, 80, 55, 90, 70].map((h, i) => (
              <div
                key={i}
                className="flex-1 rounded-t-md bg-gradient-to-t from-indigo-600 to-indigo-400 opacity-90"
                style={{ height: `${h}%` }}
              />
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
