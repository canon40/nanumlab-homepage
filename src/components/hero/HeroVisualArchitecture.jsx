import { motion } from 'framer-motion';
import { Smartphone, Server, Database, Shield, BrainCircuit } from 'lucide-react';

const layers = [
  {
    title: '사용자 채널',
    items: [{ icon: Smartphone, label: '모바일 앱 · 웹 포털' }],
    color: 'border-indigo-200 bg-indigo-50 text-indigo-700',
  },
  {
    title: 'API & 보안 계층',
    items: [{ icon: Shield, label: 'API Gateway · RBAC · 감사 로그' }],
    color: 'border-violet-200 bg-violet-50 text-violet-700',
  },
  {
    title: '핵심 서비스',
    items: [
      { icon: Server, label: 'SmartTicket' },
      { icon: BrainCircuit, label: 'AI CallCenter' },
    ],
    color: 'border-sky-200 bg-sky-50 text-sky-700',
  },
  {
    title: '데이터 계층',
    items: [{ icon: Database, label: 'MyData 연계 · PostgreSQL · Vector DB' }],
    color: 'border-emerald-200 bg-emerald-50 text-emerald-700',
  },
];

export default function HeroVisualArchitecture() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="relative rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl"
    >
      <p className="mb-5 text-center text-sm font-semibold text-slate-500">공공 DX 플랫폼 아키텍처</p>
      <div className="space-y-3">
        {layers.map((layer, index) => (
          <div key={layer.title}>
            <div className={`rounded-xl border-2 p-4 ${layer.color}`}>
              <p className="mb-2 text-xs font-bold uppercase tracking-wide opacity-70">{layer.title}</p>
              <div className="flex flex-wrap gap-2">
                {layer.items.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={item.label}
                      className="flex items-center gap-2 rounded-lg bg-white/80 px-3 py-2 text-sm font-medium text-slate-800 shadow-sm"
                    >
                      <Icon className="h-4 w-4 shrink-0" />
                      {item.label}
                    </div>
                  );
                })}
              </div>
            </div>
            {index < layers.length - 1 && (
              <div className="flex justify-center py-1">
                <div className="h-4 w-px bg-slate-300" />
              </div>
            )}
          </div>
        ))}
      </div>
    </motion.div>
  );
}
