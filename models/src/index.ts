export interface Patient {
  id: string;
  firstName: string;
  lastName: string;
}

export interface PatientData extends Patient {
  prescriptions: Array<string>;
}

export enum PrescriptionStatus {
  Pending = 'PENDING',
  InProgress = 'IN_PROGRESS',
  Filled = 'FILLED'
}

export interface Prescription {
  id: string;
  patientId: string;
  status: PrescriptionStatus;
  medications: string;
  notes?: string;
}

export interface PrescriptionData extends Prescription {
  patientInfo: Omit<Patient, 'id'>;
}
