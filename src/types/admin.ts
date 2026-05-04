export type AdminRole = 'admin' | 'onboarding' | 'viewer';

export type OnboardingStatus =
  | 'new'
  | 'in_review'
  | 'qualified'
  | 'contacted'
  | 'pending_docs'
  | 'approved'
  | 'rejected';

export interface AdminUserProfile {
  id: string;
  email: string;
  full_name: string | null;
  role: AdminRole;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface AdminRegistration {
  id: string;
  created_at: string;
  updated_at: string;
  school_name: string;
  school_address: string;
  contact_name: string;
  applicant_role: string;
  applicant_role_other: string | null;
  school_type: string;
  contact_id_number: string;
  contact_email: string;
  contact_phone: string;
  city: string;
  tournament_categories: string[];
  status: string;
  source: string | null;
  onboarding_status: OnboardingStatus;
  assigned_to: string | null;
  last_contact_at: string | null;
  internal_priority: string | null;
  email_to_applicant_sent: boolean;
  email_to_executive_sent: boolean;
}

export interface OnboardingNote {
  id: string;
  registration_id: string;
  author_user_id: string;
  author_email: string;
  note: string;
  created_at: string;
}

export interface ExportAuditRecord {
  id: string;
  requested_by_user_id: string;
  requested_by_email: string;
  role: AdminRole;
  exported_at: string;
  format: string;
  filters_json: Record<string, unknown>;
  rows_count: number;
  file_name: string;
  purpose: string | null;
}

export interface AdminRegistrationFilters {
  search: string;
  cities: string[];
  categories: string[];
  schoolType: string;
  onboardingStatus: '' | OnboardingStatus;
  dateFrom: string;
  dateTo: string;
}

export interface RegistrationListResult {
  data: AdminRegistration[];
  count: number;
}

export const ONBOARDING_STATUS_OPTIONS: Array<{ value: OnboardingStatus; label: string }> = [
  { value: 'new', label: 'Nuevo' },
  { value: 'in_review', label: 'En revisión' },
  { value: 'qualified', label: 'Calificado' },
  { value: 'contacted', label: 'Contactado' },
  { value: 'pending_docs', label: 'Pendiente docs' },
  { value: 'approved', label: 'Aprobado' },
  { value: 'rejected', label: 'Rechazado' },
];

export const INTERNAL_PRIORITY_OPTIONS = [
  { value: 'low', label: 'Baja' },
  { value: 'medium', label: 'Media' },
  { value: 'high', label: 'Alta' },
  { value: 'urgent', label: 'Urgente' },
] as const;

export const EMPTY_ADMIN_FILTERS: AdminRegistrationFilters = {
  search: '',
  cities: [],
  categories: [],
  schoolType: '',
  onboardingStatus: '',
  dateFrom: '',
  dateTo: '',
};
