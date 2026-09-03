/**
 * App.tsx — Life 2.0 (라이프이점영) Homepage
 * Design: "Established Authority" — Dark Navy + Forest Green + Warm Gold
 */

import { useState } from "react";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import { usePageTracking } from "./hooks/usePageTracking";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { LangContext } from "./components/Navigation";
import Home from "./pages/Home";
import Imakiljang from "./pages/Imakiljang";
import Smartfarm from "./pages/Smartfarm";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminPosts from "./pages/admin/AdminPosts";
import AdminInquiries from "./pages/admin/AdminInquiries";
import AdminDiagnostics from "./pages/admin/AdminDiagnostics";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminTraffic from "./pages/admin/AdminTraffic";
function Router() {
  // make sure to consider if you need authentication for certain routes
  usePageTracking();
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/imakiljang"} component={Imakiljang} />
      <Route path={"/smartfarm"} component={Smartfarm} />
      <Route path={"/admin"} component={AdminDashboard} />
      <Route path={"/admin/posts"} component={AdminPosts} />
      <Route path={"/admin/inquiries"} component={AdminInquiries} />
      <Route path={"/admin/diagnostics"} component={AdminDiagnostics} />
      <Route path={"/admin/users"} component={AdminUsers} />
      <Route path={"/admin/traffic"} component={AdminTraffic} />
      <Route path={"/404"} component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  const [lang, setLang] = useState<"ko" | "en">("ko");

  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <LangContext.Provider value={{ lang, setLang }}>
          <TooltipProvider>
            <Toaster />
            <Router />
          </TooltipProvider>
        </LangContext.Provider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
