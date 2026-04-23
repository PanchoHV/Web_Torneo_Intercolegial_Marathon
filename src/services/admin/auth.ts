import type { Session } from '@supabase/supabase-js';

import { supabase } from '@/lib/supabase/client';
import type { AdminUserProfile } from '@/types/admin';

function requireSupabase() {
  if (!supabase) {
    throw new Error('Supabase no está configurado para el módulo admin.');
  }

  return supabase;
}

export async function signInAdmin(email: string, password: string) {
  const client = requireSupabase();
  const { error } = await client.auth.signInWithPassword({ email, password });

  if (error) {
    throw new Error(error.message);
  }
}

export async function signOutAdmin() {
  const client = requireSupabase();
  const { error } = await client.auth.signOut();

  if (error) {
    throw new Error(error.message);
  }
}

export async function updateOwnPassword(password: string) {
  const client = requireSupabase();
  const { error } = await client.auth.updateUser({ password });

  if (error) {
    throw new Error(error.message);
  }
}

export async function getCurrentSession(): Promise<Session | null> {
  const client = requireSupabase();
  const { data, error } = await client.auth.getSession();

  if (error) {
    throw new Error(error.message);
  }

  return data.session;
}

export async function fetchAdminProfile(userId: string): Promise<AdminUserProfile | null> {
  const client = requireSupabase();
  const { data, error } = await client
    .from('admin_users')
    .select('id, email, full_name, role, is_active, created_at, updated_at')
    .eq('id', userId)
    .eq('is_active', true)
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  return data as AdminUserProfile | null;
}
