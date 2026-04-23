import type { AdminRole, AdminUserProfile } from '@/types/admin';
import { callAdminFunction } from '@/services/admin/functionClient';

export async function createAdminUser(payload: {
  email: string;
  password: string;
  fullName: string;
  role: AdminRole;
}) {
  return callAdminFunction<{
    user?: AdminUserProfile;
    created?: boolean;
    reactivated?: boolean;
    inviteEmailSent?: boolean;
    inviteEmailError?: string | null;
  }>('admin-create-user', payload);
}

export async function deactivateAdminUser(userId: string) {
  return callAdminFunction<{ success?: boolean }>('admin-deactivate-user', { userId });
}
