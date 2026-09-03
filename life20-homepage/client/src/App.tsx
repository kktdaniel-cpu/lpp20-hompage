/**
 * App.tsx — Life 2.0 (라이프이점영) Homepage
 * Design: "Established Authority" — Dark Navy + Forest Green + Warm Gold
 */

import { useState } from "react";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { LangContext } from "./components/Navigation";
import Home from "./pages/Home";
import Imakiljang from "./pages/Imakiljang";

function Router() {
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/imakiljang"} component={Imakiljang} />
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
