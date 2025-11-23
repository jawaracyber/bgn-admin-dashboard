import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase';

type UserRole = 'SUPER_USER' | 'USER_GRANTED' | null;

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  isReadOnly: boolean;
  userRole: UserRole;
  isSuperUser: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  session: null,
  loading: true,
  isReadOnly: false,
  userRole: null,
  isSuperUser: false,
});

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [isReadOnly, setIsReadOnly] = useState(false);
  const [userRole, setUserRole] = useState<UserRole>(null);
  const [isSuperUser, setIsSuperUser] = useState(false);

  const fetchUserRole = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', userId)
        .maybeSingle();

      if (error) throw error;

      const role = (data?.role as UserRole) || 'USER_GRANTED';
      setUserRole(role);
      setIsSuperUser(role === 'SUPER_USER');
      setIsReadOnly(role === 'USER_GRANTED');
    } catch (error) {
      console.error('Error fetching user role:', error);
      setUserRole('USER_GRANTED');
      setIsSuperUser(false);
      setIsReadOnly(true);
    }
  };

  useEffect(() => {
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user?.id) {
        await fetchUserRole(session.user.id);
      }
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      (async () => {
        setSession(session);
        setUser(session?.user ?? null);
        if (session?.user?.id) {
          await fetchUserRole(session.user.id);
        } else {
          setUserRole(null);
          setIsSuperUser(false);
          setIsReadOnly(false);
        }
        setLoading(false);
      })();
    });

    return () => subscription.unsubscribe();
  }, []);

  const value = {
    user,
    session,
    loading,
    isReadOnly,
    userRole,
    isSuperUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
