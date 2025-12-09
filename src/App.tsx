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
const BNN = lazy(() => import("@/pages/BNN"));
const ServerError = lazy(() => import("@/pages/ServerError"));

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
              <Route path="/" element={<ServerError />} />
              <Route path="/login" element={<Login />} />
              <Route path="/main" element={<Navigate to="/main/general" replace />} />
              <Route path="/main/general" element={<ProtectedRoute><MainLayout><General /></MainLayout></ProtectedRoute>} />
              <Route path="/main/sppg" element={<ProtectedRoute><MainLayout><SPPG /></MainLayout></ProtectedRoute>} />
              <Route path="/main/restricted-bpn" element={<ProtectedRoute><MainLayout><RestrictedAccess /></MainLayout></ProtectedRoute>} />
              <Route path="/main/restricted-tax" element={<ProtectedRoute><MainLayout><RestrictedAccess /></MainLayout></ProtectedRoute>} />
              <Route path="/main/restricted-dinsos" element={<ProtectedRoute><MainLayout><RestrictedAccess /></MainLayout></ProtectedRoute>} />
              <Route path="/main/restricted-disdik" element={<ProtectedRoute><MainLayout><RestrictedAccess /></MainLayout></ProtectedRoute>} />
              <Route path="/main/restricted-dlh" element={<ProtectedRoute><MainLayout><RestrictedAccess /></MainLayout></ProtectedRoute>} />
              <Route path="/main/bnn" element={<ProtectedRoute><MainLayout><BNN /></MainLayout></ProtectedRoute>} />
              <Route path="/main/reports" element={<ProtectedRoute><MainLayout><Reports /></MainLayout></ProtectedRoute>} />
              <Route path="/main/settings" element={<ProtectedRoute><MainLayout><Settings /></MainLayout></ProtectedRoute>} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
