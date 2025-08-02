import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Quiz from "./pages/Quiz";
import Result from "./pages/Result";
import Compatibility from "./pages/Compatibility";
import About from "./pages/About";
import Blog from "./pages/Blog";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import LoopTracker from "./pages/LoopTracker";
import Forecast from "./pages/Forecast";
import PatternBreaker from "./pages/PatternBreaker";
import ExPartnerAnalysis from "./pages/ExPartnerAnalysis";
import CompatibilityDashboard from "./pages/CompatibilityDashboard";
import FlavourMatchPredictor from "./pages/FlavourMatchPredictor";
import LBFDemo from "./pages/LBFDemo";
import TestPage from "./pages/TestPage";
import SupabaseTest from "./components/SupabaseTest";
import Pricing from "./pages/Pricing";
import NotFound from "./pages/NotFound";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Navigation from "./components/Navigation";
import UserProfile from "./components/UserProfile";

// Enhanced Pages
import EnhancedProfilePage from "./pages/EnhancedProfilePage";
import EnhancedDashboardPage from "./pages/EnhancedDashboardPage";
import OnboardingPage from "./pages/OnboardingPage";
import AccessibilityProvider from "./components/AccessibilityProvider";

// Import accessibility styles
import "./styles/accessibility.css";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <AccessibilityProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            {/* Skip to main content link for accessibility */}
            <a href="#main-content" className="skip-link">Skip to main content</a>
            <Navigation />
            <main id="main-content">
              <Routes>
            {/* Public routes */}
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<About />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/pricing" element={<Pricing />} />
            
            {/* Protected routes */}
            <Route path="/quiz" element={
              <ProtectedRoute>
                <Quiz />
              </ProtectedRoute>
            } />
            <Route path="/compatibility" element={
              <ProtectedRoute>
                <Compatibility />
              </ProtectedRoute>
            } />
            <Route path="/loop-tracker" element={
              <ProtectedRoute>
                <LoopTracker />
              </ProtectedRoute>
            } />
            <Route path="/forecast" element={
              <ProtectedRoute>
                <Forecast />
              </ProtectedRoute>
            } />
            <Route path="/pattern-breaker" element={
              <ProtectedRoute>
                <PatternBreaker />
              </ProtectedRoute>
            } />
            <Route path="/ex-analysis" element={
              <ProtectedRoute>
                <ExPartnerAnalysis />
              </ProtectedRoute>
            } />
            <Route path="/ai-dashboard" element={
              <ProtectedRoute>
                <CompatibilityDashboard />
              </ProtectedRoute>
            } />
            <Route path="/match-predictor" element={
              <ProtectedRoute>
                <FlavourMatchPredictor />
              </ProtectedRoute>
            } />
            <Route path="/lbf-demo" element={
              <ProtectedRoute>
                <LBFDemo />
              </ProtectedRoute>
            } />
            <Route path="/result/:flavor" element={
              <ProtectedRoute>
                <Result />
              </ProtectedRoute>
            } />
            <Route path="/profile" element={
              <ProtectedRoute>
                <UserProfile />
              </ProtectedRoute>
            } />
            
            {/* Enhanced Feature Routes */}
            <Route path="/enhanced-profile" element={
              <ProtectedRoute>
                <EnhancedProfilePage />
              </ProtectedRoute>
            } />
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <EnhancedDashboardPage />
              </ProtectedRoute>
            } />
            <Route path="/onboarding" element={<OnboardingPage />} />
            
            {/* Development/testing routes */}
            <Route path="/test" element={<TestPage />} />
            <Route path="/supabase-test" element={<SupabaseTest />} />
            
            {/* Catch-all route */}
            <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
          </BrowserRouter>
        </AccessibilityProvider>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
