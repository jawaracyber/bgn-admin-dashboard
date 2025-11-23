import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "@/layout/MainLayout";
import { Loader2 } from "lucide-react";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";

const General = lazy(() => import("@/pages/General"));
const SPPG = lazy(() => import("@/pages/SPPG"));
const Reports = lazy(() => import("@/pages/Reports"));
const Settings = lazy(() => import("@/pages/Settings"));
const NotFound = lazy(() => import("@/pages/NotFound"));
const Login = lazy(() => import("@/pages/Login"));
const RestrictedAccess = lazy(() => import("@/pages/RestrictedAccess"));

const queryClient = new QueryClient();

const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-screen">
    <Loader2 className="w-8 h-8 animate-spin text-primary" />
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Suspense fallback={<LoadingFallback />}>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/" element={<Navigate to="/general" replace />} />
              <Route path="/general" element={<ProtectedRoute><MainLayout><General /></MainLayout></ProtectedRoute>} />
              <Route path="/sppg" element={<ProtectedRoute><MainLayout><SPPG /></MainLayout></ProtectedRoute>} />
              <Route path="/restricted-bpn" element={<ProtectedRoute><MainLayout><RestrictedAccess /></MainLayout></ProtectedRoute>} />
              <Route path="/restricted-tax" element={<ProtectedRoute><MainLayout><RestrictedAccess /></MainLayout></ProtectedRoute>} />
              <Route path="/reports" element={<ProtectedRoute><MainLayout><Reports /></MainLayout></ProtectedRoute>} />
              <Route path="/settings" element={<ProtectedRoute><MainLayout><Settings /></MainLayout></ProtectedRoute>} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
