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
  fullName: string;
  position: string;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  session: null,
  loading: true,
  isReadOnly: false,
  userRole: null,
  isSuperUser: false,
  fullName: '',
  position: '',
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
  const [fullName, setFullName] = useState('');
  const [position, setPosition] = useState('');

  const fetchUserRole = async (userId: string, retryCount = 0) => {
    try {
      const { data, error } = await supabase
        .from('user_roles')
        .select('role, full_name, position')
        .eq('user_id', userId)
        .maybeSingle();

      if (error) {
        console.error('Error fetching user role:', error);
        throw error;
      }

      // If no role found and this is first retry, wait and try again
      // This handles case where trigger hasn't completed yet
      if (!data && retryCount < 2) {
        console.log('User role not found, retrying...', retryCount + 1);
        await new Promise(resolve => setTimeout(resolve, 1000));
        return fetchUserRole(userId, retryCount + 1);
      }

      if (!data) {
        console.warn('User role not found after retries, using default');
        // Create a default role entry for this user
        try {
          const { data: userData } = await supabase.auth.getUser();
          if (userData.user) {
            await supabase.from('user_roles').insert({
              user_id: userId,
              email: userData.user.email || '',
              role: 'USER_GRANTED',
              full_name: 'User',
              position: 'Staff'
            });
            console.log('Created default user role');
          }
        } catch (insertError) {
          console.error('Failed to create default user role:', insertError);
        }
      }

      const role = (data?.role as UserRole) || 'USER_GRANTED';
      setUserRole(role);
      setIsSuperUser(role === 'SUPER_USER');
      setIsReadOnly(role === 'USER_GRANTED');
      setFullName(data?.full_name || 'User');
      setPosition(data?.position || 'Staff');
    } catch (error) {
      console.error('Error in fetchUserRole:', error);
      // Set safe defaults
      setUserRole('USER_GRANTED');
      setIsSuperUser(false);
      setIsReadOnly(true);
      setFullName('User');
      setPosition('Staff');
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
          setFullName('');
          setPosition('');
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
    fullName,
    position,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
