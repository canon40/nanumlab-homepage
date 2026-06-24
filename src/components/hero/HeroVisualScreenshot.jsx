import { useState } from 'react';
import { motion } from 'framer-motion';
import { ImageIcon } from 'lucide-react';
import { heroVisualConfig } from '@/config/heroVisual';

export default function HeroVisualScreenshot() {
  const [hasError, setHasError] = useState(false);
  const { screenshotSrc, screenshotAlt } = heroVisualConfig;

  if (hasError) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="flex aspect-[4/3] flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50 p-8 text-center shadow-lg"
      >
        <ImageIcon className="mb-3 h-10 w-10 text-slate-400" />
        <p className="text-sm font-semibold text-slate-700">제품 스크린샷 이미지를 추가해 주세요</p>
        <p className="mt-2 text-xs text-slate-500">
          <code className="rounded bg-slate-200 px-1.5 py-0.5">public{screenshotSrc}</code>
        </p>
        <p className="mt-1 text-xs text-slate-400">또는 src/config/heroVisual.js에서 경로 변경</p>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl"
    >
      <img
        src={screenshotSrc}
        alt={screenshotAlt}
        className="h-full w-full object-cover object-top"
        onError={() => setHasError(true)}
      />
    </motion.div>
  );
}
