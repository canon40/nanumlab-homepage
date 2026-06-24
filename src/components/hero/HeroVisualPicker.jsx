import { useState } from 'react';
import { Settings2, X } from 'lucide-react';
import { HERO_VISUAL_MODES } from '@/config/heroVisual';

const STORAGE_KEY = 'nanumlab-hero-visual-mode';

export function loadHeroVisualMode(defaultMode) {
  if (typeof window === 'undefined') return defaultMode;
  const saved = localStorage.getItem(STORAGE_KEY);
  return saved && HERO_VISUAL_MODES[saved] ? saved : defaultMode;
}

export function saveHeroVisualMode(mode) {
  localStorage.setItem(STORAGE_KEY, mode);
}

export default function HeroVisualPicker({ mode, onChange }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-4 right-4 z-[100]">
      {open && (
        <div className="mb-3 w-72 rounded-xl border border-slate-200 bg-white p-4 shadow-2xl">
          <div className="mb-3 flex items-center justify-between">
            <p className="text-sm font-bold text-slate-900">히어로 비주얼 선택</p>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="rounded-md p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
              aria-label="닫기"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          <div className="space-y-1.5">
            {Object.entries(HERO_VISUAL_MODES).map(([key, { label, description }]) => (
              <button
                key={key}
                type="button"
                onClick={() => {
                  onChange(key);
                  saveHeroVisualMode(key);
                }}
                className={`w-full rounded-lg border px-3 py-2.5 text-left transition ${
                  mode === key
                    ? 'border-indigo-300 bg-indigo-50 ring-1 ring-indigo-200'
                    : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                <p className="text-sm font-semibold text-slate-900">{label}</p>
                <p className="text-xs text-slate-500">{description}</p>
              </button>
            ))}
          </div>
          <p className="mt-3 text-[11px] leading-relaxed text-slate-400">
            배포 시 적용할 모드는 <code className="text-slate-500">src/config/heroVisual.js</code>의{' '}
            <code className="text-slate-500">defaultMode</code>에서 설정하세요.
          </p>
        </div>
      )}

      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 shadow-lg transition hover:border-indigo-300 hover:text-indigo-600"
      >
        <Settings2 className="h-4 w-4" />
        비주얼 변경
      </button>
    </div>
  );
}
