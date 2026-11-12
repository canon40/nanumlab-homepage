import React from 'react';
import { motion } from 'framer-motion';
import { 
  Cpu, 
  Database, 
  FileCheck, 
  MessageSquare, 
  ShieldCheck, 
  Activity,
  Monitor,
  Server,
  BrainCircuit
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import HeroSection from "@/components/hero/HeroSection";
import LatestPosts from "@/components/LatestPosts";

const techStacks = [
  {
    id: 'frontend',
    label: 'Front-End',
    icon: Monitor,
    title: '사용자 인터페이스 및 고성능 UI 엔진',
    description: '반응형 웹·모바일 UI와 실시간 관리자 대시보드를 구현하는 프론트엔드 스택',
    accent: {
      tab: 'data-active:bg-indigo-600 data-active:text-white data-active:border-indigo-600',
      bar: 'bg-indigo-600',
      icon: 'text-indigo-600 bg-indigo-50',
      badge: 'bg-indigo-50 border-indigo-200 text-indigo-800 hover:bg-indigo-100',
    },
    items: ['React', 'Vite', 'Tailwind CSS', 'shadCN UI', 'HTML5 / CSS3', 'JavaScript', '모바일 UI/UX 설계', '실시간 관리자 대시보드 포털'],
  },
  {
    id: 'backend',
    label: 'Back-End',
    icon: Server,
    title: '엔터프라이즈 API 가속화 및 권한 제어',
    description: '공공기관 연계 API, 인증·권한 체계, 게이트웨이 보안을 담당하는 백엔드 스택',
    accent: {
      tab: 'data-active:bg-violet-600 data-active:text-white data-active:border-violet-600',
      bar: 'bg-violet-600',
      icon: 'text-violet-600 bg-violet-50',
      badge: 'bg-violet-50 border-violet-200 text-violet-800 hover:bg-violet-100',
    },
    items: ['REST API', 'FastAPI', 'Node.js API 아키텍처', 'Spring / 전자정부프레임워크 연계성', 'API Gateway 보안', '역할 기반 접근 제어'],
  },
  {
    id: 'database',
    label: 'Database',
    icon: Database,
    title: '고신뢰성 데이터 영속성 모델링',
    description: '트랜잭션 무결성과 공공마이데이터 매핑을 지원하는 데이터 계층',
    accent: {
      tab: 'data-active:bg-emerald-600 data-active:text-white data-active:border-emerald-600',
      bar: 'bg-emerald-600',
      icon: 'text-emerald-600 bg-emerald-50',
      badge: 'bg-emerald-50 border-emerald-200 text-emerald-800 hover:bg-emerald-100',
    },
    items: ['MySQL', 'PostgreSQL', 'Supabase', 'Neon', '공공마이데이터 매핑 필드', '통합 트랜잭션(예약/결제/정산) 설계'],
  },
  {
    id: 'ai-infra',
    label: 'AI & Infra',
    icon: BrainCircuit,
    title: '인공지능 모델링 및 보안 인프라 운영',
    description: 'LLM·벡터 DB·온프레미스 인프라까지 포괄하는 AI·인프라 스택',
    accent: {
      tab: 'data-active:bg-sky-600 data-active:text-white data-active:border-sky-600',
      bar: 'bg-sky-600',
      icon: 'text-sky-600 bg-sky-50',
      badge: 'bg-sky-50 border-sky-200 text-sky-800 hover:bg-sky-100',
    },
    items: ['LLM 챗봇 엔진', 'Vector DB 기술', 'STT / OCR 텍스트 분석', 'AI Tool Calling 자동화', '클라우드 & 온프레미스 인프라', 'Docker 기반 폐쇄망 환경 대응'],
  },
];

export default function App() {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.5 }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans antialiased">
      {/* GNB (Header) */}
      <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-8">
          <div className="flex items-center space-x-2">
            <Cpu className="h-6 w-6 text-indigo-600" />
            <span className="text-xl font-bold tracking-tight text-slate-950">주식회사 나눔랩</span>
          </div>
          <nav className="hidden md:flex space-x-8 text-sm font-medium text-slate-600">
            <a href="#about" className="hover:text-indigo-600 transition">기업소개</a>
            <a href="#competencies" className="hover:text-indigo-600 transition">핵심역량</a>
            <a href="#tech-stack" className="hover:text-indigo-600 transition">기술스택</a>
            <a href="#portfolio" className="hover:text-indigo-600 transition">사업이력</a>
            <a href="/blog/" className="hover:text-indigo-600 transition">블로그</a>
            <a href="/tools/" className="hover:text-indigo-600 transition">블로그 진단</a>
          </nav>
          <Button variant="default" className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-md">
            비즈니스 문의
          </Button>
        </div>
      </header>

      <HeroSection />

      {/* Core Competencies Section */}
      <section id="competencies" className="py-24 bg-slate-50">
        <div className="container mx-auto px-4 md:px-8">
          <motion.div {...fadeIn} className="text-center max-w-3xl mx-auto mb-20 space-y-4">
            <h2 className="text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">핵심 기술 역량</h2>
            <p className="text-slate-600 text-lg">AI 솔루션과 가치 있는 공공 마이데이터를 융합하여 실용적이고 직관적인 시스템을 구축함.</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            <motion.div {...fadeIn}>
              <Card className="h-full border-none shadow-sm bg-white hover:shadow-md transition">
                <CardHeader>
                  <MessageSquare className="h-10 w-10 text-indigo-600 mb-2" />
                  <CardTitle className="text-xl">지능형 AI 서비스 모델</CardTitle>
                  <CardDescription className="text-slate-600 pt-2 leading-relaxed">
                    LLM 기반 질의응답 엔진, 자연어 로컬 매칭 검색, STT/OCR 연계 분석 및 행정 효율화를 위한 Tool Calling 자동화 구조 설계 역량을 갖추고 있음.
                  </CardDescription>
                </CardHeader>
              </Card>
            </motion.div>
            
            <motion.div {...fadeIn} transition={{ delay: 0.1 }}>
              <Card className="h-full border-none shadow-sm bg-white hover:shadow-md transition">
                <CardHeader>
                  <FileCheck className="h-10 w-10 text-indigo-600 mb-2" />
                  <CardTitle className="text-xl">공공마이데이터 발권 연동</CardTitle>
                  <CardDescription className="text-slate-600 pt-2 leading-relaxed">
                    법정 감면 대상자 정보를 실시간으로 처리해 서류 없는 자동 할인·검증 체계를 구축함. 모바일 GPS·QR·NFC 중심의 간결하고 안전한 아키텍처 지향.
                  </CardDescription>
                </CardHeader>
              </Card>
            </motion.div>

            <motion.div {...fadeIn} transition={{ delay: 0.2 }}>
              <Card className="h-full border-none shadow-sm bg-white hover:shadow-md transition">
                <CardHeader>
                  <Database className="h-10 w-10 text-indigo-600 mb-2" />
                  <CardTitle className="text-xl">데이터 분석 및 공간정보</CardTitle>
                  <CardDescription className="text-slate-600 pt-2 leading-relaxed">
                    공개 위성 데이터 기반 행정 감시 체계 검토 역량, 3D 공간 스캔 데이터를 활용한 관광지·전시관 디지털 트윈 콘텐츠 확장 인프라 구성 가능.
                  </CardDescription>
                </CardHeader>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section id="tech-stack" className="py-24 bg-gradient-to-b from-slate-50 to-white border-y border-slate-200">
        <div className="container mx-auto px-4 md:px-8">
          <motion.div {...fadeIn} className="text-center max-w-3xl mx-auto mb-14 space-y-4">
            <Badge variant="secondary" className="bg-indigo-50 text-indigo-700 border border-indigo-100 px-3 py-1 text-sm font-medium">
              Technology Stack
            </Badge>
            <h2 className="text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">신뢰 가능한 기술 아키텍처</h2>
            <p className="text-slate-600 text-lg leading-relaxed">
              프론트엔드부터 AI·인프라까지, 공공 DX 프로젝트에 검증된 기술 스택을 체계적으로 운용함.
            </p>
          </motion.div>

          <Tabs defaultValue="frontend" className="w-full max-w-5xl mx-auto">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 h-auto gap-2 bg-transparent p-0 mb-8">
              {techStacks.map((stack) => {
                const Icon = stack.icon;
                return (
                  <TabsTrigger
                    key={stack.id}
                    value={stack.id}
                    className={`flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-sm font-semibold text-slate-600 shadow-sm transition-all hover:border-slate-300 hover:text-slate-900 h-auto ${stack.accent.tab}`}
                  >
                    <Icon className="h-4 w-4 shrink-0" />
                    {stack.label}
                  </TabsTrigger>
                );
              })}
            </TabsList>

            {techStacks.map((stack) => {
              const Icon = stack.icon;
              return (
                <TabsContent key={stack.id} value={stack.id} className="mt-0 outline-none">
                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35 }}
                  >
                    <Card className="overflow-hidden border-slate-200 shadow-md bg-white">
                      <div className={`h-1.5 w-full ${stack.accent.bar}`} />
                      <CardHeader className="pb-4">
                        <div className="flex items-start gap-4">
                          <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${stack.accent.icon}`}>
                            <Icon className="h-6 w-6" />
                          </div>
                          <div className="space-y-1.5">
                            <CardTitle className="text-xl text-slate-950">{stack.title}</CardTitle>
                            <CardDescription className="text-base text-slate-600 leading-relaxed">
                              {stack.description}
                            </CardDescription>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="pt-0 pb-8">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                          {stack.items.map((tech) => (
                            <div
                              key={tech}
                              className={`flex items-center rounded-lg border px-4 py-3 text-sm font-medium transition-colors ${stack.accent.badge}`}
                            >
                              <span className={`mr-2.5 h-1.5 w-1.5 shrink-0 rounded-full ${stack.accent.bar}`} />
                              {tech}
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </TabsContent>
              );
            })}
          </Tabs>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="py-24 bg-slate-50">
        <div className="container mx-auto px-4 md:px-8">
          <motion.div {...fadeIn} className="text-center max-w-3xl mx-auto mb-20 space-y-4">
            <h2 className="text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">주요 사업 및 기술 이력</h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <motion.div {...fadeIn}>
              <Card className="h-full border border-slate-200 shadow-sm bg-white hover:shadow-md transition flex flex-col justify-between">
                <CardHeader>
                  <div className="mb-2"><Badge className="bg-indigo-600 text-white hover:bg-indigo-600">공공 DX 플랫폼</Badge></div>
                  <CardTitle className="text-xl text-slate-950">공공마이데이터 연동 스마트 티켓 발권 플랫폼</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-sm text-slate-600">
                  <p>공공·문화·관광 시설에 유연하게 대응하는 모바일 원스톱 발권 솔루션임.</p>
                  <Separator className="bg-slate-100" />
                  <p><span className="font-semibold text-slate-900">핵심 구현:</span> 모바일 예매 및 웹 관리자 포털, QR 발권/검표 시스템, 공공마이데이터 자격 대조를 통한 서류 없는 실시간 감면 자동화 구조 완비.</p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div {...fadeIn} transition={{ delay: 0.1 }}>
              <Card className="h-full border border-slate-200 shadow-sm bg-white hover:shadow-md transition flex flex-col justify-between">
                <CardHeader>
                  <div className="mb-2"><Badge className="bg-emerald-600 text-white hover:bg-emerald-600">로컬 AI 커머스</Badge></div>
                  <CardTitle className="text-xl text-slate-950">AI 기반 지역 음식점 추천 플랫폼</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-sm text-slate-600">
                  <p>사용자 위치 인프라 및 자연어 조건 매칭을 기반으로 최적의 상권을 추천하는 플랫폼 모델임.</p>
                  <Separator className="bg-slate-100" />
                  <p><span className="font-semibold text-slate-900">핵심 구현:</span> 자연어 검색 엔진 매칭, AI 추천 알고리즘 설계, 커뮤니티 데이터 분석 파이프라인 및 CRM 구조 마케팅 확장성 확보.</p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Corporate Strengths (Why Us) */}
      <section className="py-24 bg-slate-950 text-slate-200">
        <div className="container mx-auto px-4 md:px-8 max-w-5xl">
          <motion.div {...fadeIn} className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-4">
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">나눔랩이 지닌<br />신뢰적 가치</h2>
              <p className="text-slate-400">단순 개발 외주를 넘어 비즈니스를 기획하고 규제 기준을 사전 조율하는 기술 엔지니어링 파트너임.</p>
            </div>
            <div className="space-y-6">
              <div className="flex gap-4">
                <ShieldCheck className="h-6 w-6 text-indigo-400 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-white">공공 행정 및 보안 요구사항 이해</h4>
                  <p className="text-sm text-slate-400 mt-1">개인정보 보호법 규제 준수, 정산 및 로그 감사 체계, 공공 폐쇄망/내부망 대응 보안 구조 설계 능력을 보유함.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <Activity className="h-6 w-6 text-indigo-400 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-white">기획과 인프라를 관통하는 풀스택 역량</h4>
                  <p className="text-sm text-slate-400 mt-1">도메인 비즈니스 요건 분석, 데이터 모델링(DB), 모바일 앱 및 대시보드 웹 개발, 통합 API 파이프라인을 단일 구조로 제어함.</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <LatestPosts />

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-500 py-12 border-t border-slate-800">
        <div className="container mx-auto px-4 md:px-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center space-x-2 text-slate-300">
            <Cpu className="h-5 w-5 text-indigo-400" />
            <span className="font-bold">주식회사 나눔랩</span>
          </div>
          <p className="text-xs text-center md:text-right">&copy; 2026 NANUM LAB Co., Ltd. All rights reserved. 본 정보는 기업의 공공 DX 및 기술 포트폴리오 안내를 목적으로 함.</p>
        </div>
      </footer>
    </div>
  );
}
