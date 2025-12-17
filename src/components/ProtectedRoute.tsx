import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Loader2, Lock } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireSuperUser?: boolean;
}

const ProtectedRoute = ({ children, requireSuperUser = false }: ProtectedRouteProps) => {
  const { user, loading, isSuperUser } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-slate-600" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (requireSuperUser && !isSuperUser) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 p-4">
        <Card className="w-full max-w-md shadow-xl text-center">
          <CardHeader className="space-y-4">
            <div className="flex justify-center">
              <div className="w-20 h-20 rounded-full bg-red-100 flex items-center justify-center">
                <Lock className="w-10 h-10 text-red-600" />
              </div>
            </div>
            <CardTitle className="text-2xl">Akses Ditolak</CardTitle>
            <CardDescription className="text-base">
              Halaman ini hanya dapat diakses oleh SUPER_USER.
              <br />
              Hubungi administrator untuk mendapatkan akses.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button
              onClick={() => window.history.back()}
              className="w-full bg-slate-900 hover:bg-slate-800"
            >
              Kembali
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;
