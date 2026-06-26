import type { ReactNode } from "react";
import { Footer } from "./components/layout/Footer";
import { Header } from "./components/layout/Header";
import { LocaleProvider } from "./i18n/context";
import { AboutPage } from "./pages/AboutPage";
import { CasesPage } from "./pages/CasesPage";
import { ContactPage } from "./pages/ContactPage";
import { HomePage } from "./pages/HomePage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { SolutionsPage } from "./pages/SolutionsPage";
import { TechnologyPage } from "./pages/TechnologyPage";
import { Router, useRouter } from "./router";

const routes: Record<string, ReactNode> = {
  "/": <HomePage />,
  "/about": <AboutPage />,
  "/solutions": <SolutionsPage />,
  "/technology": <TechnologyPage />,
  "/cases": <CasesPage />,
  "/contact": <ContactPage />,
};

function AppContent() {
  const { path } = useRouter();
  const page = routes[path] ?? <NotFoundPage />;

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main key={path} className="page-enter pt-[72px]">
        {page}
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <LocaleProvider>
      <Router>
        <AppContent />
      </Router>
    </LocaleProvider>
  );
}
