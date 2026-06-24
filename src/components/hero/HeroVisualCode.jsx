import { motion } from 'framer-motion';

export default function HeroVisualCode() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="relative rounded-2xl border border-slate-800 bg-slate-950 p-6 font-mono text-sm text-slate-200 shadow-2xl"
    >
      <div className="mb-4 flex space-x-2 border-b border-slate-800 pb-4">
        <div className="h-3 w-3 rounded-full bg-rose-500" />
        <div className="h-3 w-3 rounded-full bg-amber-500" />
        <div className="h-3 w-3 rounded-full bg-emerald-500" />
        <span className="ml-4 font-sans text-xs text-slate-500">nanumlab-core-v1.ts</span>
      </div>
      <div className="space-y-2 text-slate-300">
        <p className="text-indigo-400">// 주식회사 나눔랩 엔터프라이즈 DX 아키텍처</p>
        <p>
          <span className="text-cyan-400">import</span> &#123; MyDataEngine, LLMChatbot &#125;{' '}
          <span className="text-cyan-400">from</span>{' '}
          <span className="text-amber-300">&apos;@nanumlab/core&apos;</span>;
        </p>
        <p>
          <span className="text-cyan-400">const</span> config = &#123;
        </p>
        <p className="pl-4">
          platform: <span className="text-amber-300">&quot;Public Digital Transformation&quot;</span>,
        </p>
        <p className="pl-4">
          services: [<span className="text-amber-300">&quot;SmartTicket&quot;</span>,{' '}
          <span className="text-amber-300">&quot;AI-CallCenter&quot;</span>,{' '}
          <span className="text-amber-300">&quot;LocalAI&quot;</span>],
        </p>
        <p className="pl-4">
          stack: <span className="text-amber-300">&quot;React + Vite + FastAPI + Supabase&quot;</span>,
        </p>
        <p className="pl-4">
          securityLevel: <span className="text-emerald-400">&quot;Government-Grade-OnPremise&quot;</span>
        </p>
        <p>&#125;;</p>
        <p className="text-emerald-400">// 시스템 정상 가동 중...</p>
      </div>
    </motion.div>
  );
}
