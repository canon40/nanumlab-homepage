import HeroVisualCode from './HeroVisualCode';
import HeroVisualMockup from './HeroVisualMockup';
import HeroVisualArchitecture from './HeroVisualArchitecture';
import HeroVisualScreenshot from './HeroVisualScreenshot';

const visualComponents = {
  code: HeroVisualCode,
  mockup: HeroVisualMockup,
  architecture: HeroVisualArchitecture,
  screenshot: HeroVisualScreenshot,
};

export default function HeroVisual({ mode }) {
  if (mode === 'none') return null;

  const Component = visualComponents[mode];
  if (!Component) return null;

  return <Component />;
}
