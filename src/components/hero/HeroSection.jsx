import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { heroVisualConfig } from '@/config/heroVisual';
import HeroVisual from './HeroVisual';
import HeroVisualPicker, { loadHeroVisualMode } from './HeroVisualPicker';

export default function HeroSection() {
  const [visualMode, setVisualMode] = useState(() =>
    import.meta.env.DEV
      ? loadHeroVisualMode(heroVisualConfig.defaultMode)
      : heroVisualConfig.defaultMode
  );

  const hasVisual = visualMode !== 'none';

  return (
    <>
      <section id="about" className="relative overflow-hidden border-b bg-white py-24 lg:py-32">
        <div
          className={`container mx-auto px-4 md:px-8 ${
            hasVisual
              ? 'grid items-center gap-12 lg:grid-cols-2'
              : 'flex justify-center'
          }`}
        >
          <motion.div
            initial={{ opacity: 0, x: hasVisual ? -30 : 0 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className={`space-y-6 ${hasVisual ? '' : 'max-w-3xl text-center'}`}
          >
            <Badge
              variant="secondary"
              className="border border-indigo-100 bg-indigo-50 px-3 py-1 text-sm font-medium text-indigo-700 hover:bg-indigo-50"
            >
              공공 DX & 지능형 데이터 플랫폼 전문 기업
            </Badge>
            <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-slate-950 md:text-5xl lg:text-6xl">
              AI와 데이터 기술로
              <br />
              <span className="text-indigo-600">공공서비스의 기준</span>을 바꿈
            </h1>
            <p className={`max-w-xl text-lg leading-relaxed text-slate-600 ${hasVisual ? '' : 'mx-auto'}`}>
              주식회사 나눔랩은 공공마이데이터 연계 솔루션, 지능형 데이터 분석, 자연어 AI 엔진을 통해
              공공기관과 지역 기반 서비스의 디지털 전환(DX)을 선도하는 기술기획형 ICT 전문기업임.
            </p>
            <div className={`flex gap-4 ${hasVisual ? '' : 'justify-center'}`}>
              <Button size="lg" className="bg-indigo-600 text-white hover:bg-indigo-700">
                기술 역량 확인 <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline" className="border-slate-200">
                회사소개서 받기
              </Button>
            </div>
          </motion.div>

          {hasVisual && <HeroVisual mode={visualMode} />}
        </div>
      </section>

      {heroVisualConfig.showPicker && (
        <HeroVisualPicker mode={visualMode} onChange={setVisualMode} />
      )}
    </>
  );
}
