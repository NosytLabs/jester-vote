import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import NomineePage from "./pages/NomineePage";
import SubmitPage from "./pages/SubmitPage";
import AdminPage from "./pages/AdminPage";
import LoginPage from "./pages/Login";
import AboutPage from "./pages/AboutPage";
import RankingsPage from "./pages/RankingsPage";
import Contact from "./pages/Contact";
import Privacy from "./pages/Privacy";
import SettingsPage from "./pages/SettingsPage";
import MerchPage from "./pages/MerchPage";
import ResourcesPage from "./pages/ResourcesPage";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/login" component={LoginPage} />
      <Route path="/about" component={AboutPage} />
      <Route path="/rankings" component={RankingsPage} />
      <Route path="/contact" component={Contact} />
      <Route path="/privacy" component={Privacy} />
      <Route path="/settings" component={SettingsPage} />
      <Route path="/merch" component={MerchPage} />
      <Route path="/resources" component={ResourcesPage} />
      <Route path="/nominee/:id" component={NomineePage} />
      <Route path="/submit" component={SubmitPage} />
      <Route path="/admin" component={AdminPage} />
      <Route path="/404" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

// Skip to content link for accessibility
function SkipToContent() {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:bg-background focus:text-foreground focus:px-4 focus:py-2 focus:rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
    >
      Skip to main content
    </a>
  );
}

// Footer with E-E-A-T links
function Footer() {
  return (
    <footer className="border-t border-border/50 mt-auto py-6 bg-background/50">
      <div className="container">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>© 2025 TopJester</span>
            <span className="hidden sm:inline">|</span>
            <span className="hidden sm:inline">The Court of Fools</span>
          </div>
          <nav className="flex items-center gap-4 text-sm">
            <a href="/about" className="text-muted-foreground hover:text-foreground transition-colors">
              About
            </a>
            <a href="/contact" className="text-muted-foreground hover:text-foreground transition-colors">
              Contact
            </a>
            <a href="/privacy" className="text-muted-foreground hover:text-foreground transition-colors">
              Privacy Policy
            </a>
            <a href="/resources" className="text-muted-foreground hover:text-foreground transition-colors">
              Resources
            </a>
          </nav>
        </div>
      </div>
    </footer>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark">
        <TooltipProvider>
          <Toaster theme="dark" />
          <div className="min-h-screen flex flex-col">
            <SkipToContent />
            <main id="main-content" className="flex-1">
              <Router />
            </main>
            <Footer />
          </div>
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
