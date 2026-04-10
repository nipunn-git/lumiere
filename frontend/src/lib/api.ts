// src/lib/api.ts

/**
 * Patient API utilities
 */

export interface Patient {
  id: string;
  name: string;
  mrn: string;
  dob: string;
  gender: string;
  completeness: number;
  lastUpdated: string;
  tags: string[];
  sources: string[];
}

export interface Match {
  id: string;
  similarityScore: number;
  recordA: { name: string; mrn: string; source: string };
  recordB: { name: string; mrn: string; source: string };
  matchedFields: string[];
}

export interface QueryResponse {
  answer: string;
  confidence: number;
  sources: string[];
}

/**
 * Fetch all patients
 */
export async function fetchPatients(): Promise<Patient[]> {
  // TODO: Replace with actual API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: '1',
          name: 'John Emma',
          mrn: 'MRN-001',
          dob: '1978-03-15',
          gender: 'Male',
          completeness: 92,
          lastUpdated: '2024-01-20',
          tags: ['Active', 'High-Risk'],
          sources: ['EHR', 'Lab', 'Pharmacy'],
        },
      ]);
    }, 500);
  });
}

/**
 * Find duplicate patients
 */
export async function findDuplicates(_patientId: string): Promise<Match[]> {
  // TODO: Replace with actual API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: '1',
          similarityScore: 96,
          recordA: { name: 'John Emma', mrn: 'MRN-001', source: 'EHR' },
          recordB: { name: 'John E.', mrn: 'MRN-001-ALT', source: 'Pharmacy' },
          matchedFields: ['Name', 'DOB', 'Phone'],
        },
      ]);
    }, 800);
  });
}

/**
 * Merge patient records
 */
export async function mergeRecords(
  _matchId: string
): Promise<{ success: boolean; message: string }> {
  // TODO: Replace with actual API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: true, message: 'Records merged successfully' });
    }, 1200);
  });
}

/**
 * Query patient data with natural language
 */
export async function askQuestion(_question: string): Promise<QueryResponse> {
  // TODO: Replace with actual API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        answer:
          'Based on the unified golden record, the patient is currently on Lisinopril 10mg daily and Metformin 500mg twice daily for diabetes management. The trust score for this information is high based on recent EHR and pharmacy records.',
        confidence: 94,
        sources: ['EHR System', 'Lab Database', 'Pharmacy Records'],
      });
    }, 1500);
  });
}

/**
 * Get patient golden record
 */
export async function getGoldenRecord(patientId: string) {
  // TODO: Replace with actual API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id: patientId,
        name: 'John Emma',
        mrn: 'MRN-001-GR',
        dob: '1978-03-15',
        gender: 'Male',
        bloodType: 'O+',
        trustScore: 94,
        medications: [
          { name: 'Lisinopril', dose: '10mg', frequency: 'Daily', since: '2022-06' },
          { name: 'Metformin', dose: '500mg', frequency: 'Twice Daily', since: '2020-03' },
        ],
        visits: [
          { date: '2024-01-15', provider: 'Dr. Smith', type: 'Cardiology Checkup', notes: 'Normal' },
          { date: '2024-01-08', provider: 'Lab Tech', type: 'Lab Work', notes: 'All Clear' },
        ],
        timeline: [
          { year: 2020, event: 'Type 2 Diabetes Diagnosis', type: 'diagnosis' },
          { year: 2022, event: 'Started Lisinopril', type: 'medication' },
          { year: 2023, event: 'Annual Cardiology Review', type: 'imaging' },
        ],
        sources: ['EHR System', 'Lab Database', 'Pharmacy Records'],
      });
    }, 600);
  });
}
