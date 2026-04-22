export type RegistrationStatus = 'new' | 'qualified' | 'contacted' | 'won' | 'lost';

export type DelegateRole = 'Rector' | 'Entrenador' | 'Docente' | 'Otros';

export type SchoolType = 'Privado' | 'Público';

export type RegistrationCity = 'Quito' | 'Cuenca' | 'Santo Domingo';

export type RegistrationResult = {
  id: string | null;
  createdAt: string | null;
  isLocal: boolean;
};

export interface RegistrationFormValues {
  institutionName: string;
  institutionAddress: string;
  delegateName: string;
  delegateRole: DelegateRole;
  schoolType: SchoolType;
  delegateId: string;
  email: string;
  phone: string;
  city: RegistrationCity;
  termsAccepted: boolean;
}

export interface RegistrationInsert {
  school_name: string;
  school_address: string;
  contact_name: string;
  applicant_role: DelegateRole;
  applicant_role_other: string | null;
  school_type: SchoolType;
  contact_id_number: string;
  contact_email: string;
  contact_phone: string;
  city: string;
  status: RegistrationStatus;
  source: string;
}

export interface RegistrationRecord extends RegistrationInsert {
  id: string;
  created_at: string;
}
