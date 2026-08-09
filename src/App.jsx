import { useDarkMode } from './hooks/useDarkMode';
import { LangProvider, useLang } from './hooks/useLang';
import Navbar from './components/layout/Navbar';
import MobileBottomNav from './components/layout/MobileBottomNav';
import Footer from './components/layout/Footer';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Stack from './components/sections/Stack';
import Work from './components/sections/Work';
import Contact from './components/sections/Contact';
import CustomCursor from './components/ui/CustomCursor';
import GridRules from './components/ui/GridRules';

function Portfolio() {
  const [isDark, setIsDark] = useDarkMode();
  const { t } = useLang();

  return (
    <>
      <a href="#main" className="sr-only-focusable btn btn-solid fixed start-4 top-4 z-overlay">
        {t('Skip to content', 'تخطَّ إلى المحتوى')}
      </a>

      <GridRules />
      <CustomCursor />
      <Navbar isDark={isDark} setIsDark={setIsDark} />

      <main id="main">
        <Hero />
        <About />
        <Stack />
        <Work />
        <Contact />
      </main>

      <Footer />
      <MobileBottomNav />
    </>
  );
}

export default function App() {
  return (
    <LangProvider>
      <Portfolio />
    </LangProvider>
  );
}
