import type { Session, User } from '@supabase/supabase-js';
import {
  createContext,
  type PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

import { supabase } from '@/lib/supabase/client';
import { fetchAdminProfile, signOutAdmin } from '@/services/admin/auth';
import type { AdminRole, AdminUserProfile } from '@/types/admin';

type AdminAuthContextValue = {
  session: Session | null;
  user: User | null;
  profile: AdminUserProfile | null;
  loading: boolean;
  isAuthorized: boolean;
  refreshProfile: () => Promise<void>;
  signOut: () => Promise<void>;
  canManage: boolean;
  canExport: boolean;
  isAdmin: boolean;
};

const AdminAuthContext = createContext<AdminAuthContextValue | undefined>(undefined);

function isOnboardingExportEnabled() {
  return String(import.meta.env.VITE_ADMIN_ALLOW_ONBOARDING_EXPORTS ?? 'false').toLowerCase() === 'true';
}

export function AdminAuthProvider({ children }: PropsWithChildren) {
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<AdminUserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  const loadProfile = useCallback(async (user: User | null) => {
    if (!user || !supabase) {
      setProfile(null);
      return;
    }

    try {
      const nextProfile = await fetchAdminProfile(user.id);
      setProfile(nextProfile);
    } catch {
      setProfile(null);
    }
  }, []);

  useEffect(() => {
    if (!supabase) {
      setLoading(false);
      return;
    }

    let mounted = true;

    supabase.auth
      .getSession()
      .then(async ({ data }) => {
        if (!mounted) {
          return;
        }

        setSession(data.session);
        await loadProfile(data.session?.user ?? null);
        if (mounted) {
          setLoading(false);
        }
      })
      .catch(() => {
        if (mounted) {
          setLoading(false);
        }
      });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession);
      void loadProfile(nextSession?.user ?? null);
      setLoading(false);
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [loadProfile]);

  const refreshProfile = useCallback(async () => {
    await loadProfile(session?.user ?? null);
  }, [loadProfile, session?.user]);

  const value = useMemo<AdminAuthContextValue>(() => {
    const role = profile?.role as AdminRole | undefined;
    const isAdmin = role === 'admin';
    const canManage = role === 'admin' || role === 'onboarding';
    const canExport = isAdmin || (role === 'onboarding' && isOnboardingExportEnabled());

    return {
      session,
      user: session?.user ?? null,
      profile,
      loading,
      isAuthorized: Boolean(session?.user && profile),
      refreshProfile,
      signOut: signOutAdmin,
      canManage,
      canExport,
      isAdmin,
    };
  }, [loading, profile, refreshProfile, session]);

  return <AdminAuthContext.Provider value={value}>{children}</AdminAuthContext.Provider>;
}

export function useAdminAuth() {
  const context = useContext(AdminAuthContext);

  if (!context) {
    throw new Error('useAdminAuth must be used within AdminAuthProvider.');
  }

  return context;
}
