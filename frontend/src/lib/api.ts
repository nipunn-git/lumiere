// src/lib/api.ts

const NODE_API_URL = 'http://127.0.0.1:3001/api';
const PYTHON_API_URL = 'http://127.0.0.1:8000';

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
  const response = await fetch(`${NODE_API_URL}/records`);
  if (!response.ok) throw new Error('Failed to fetch patients');
  const data = await response.json();
  
  return data.map((p: any) => ({
    ...p,
    lastUpdated: p.lastUpdatedAt // Mapping backend field
  }));
}

/**
 * Find duplicate patients
 */
export async function findDuplicates(patientId: string): Promise<Match[]> {
  const response = await fetch(`${NODE_API_URL}/hitl/queue`);
  if (!response.ok) throw new Error('Failed to fetch duplicates');
  const queue = await response.json();
  
  // Filter queue for specific patient if needed, but usually we show the whole queue
  return queue.map((m: any) => ({
    id: m.id,
    similarityScore: m.score * 100,
    recordA: { 
        name: m.incoming.name, 
        mrn: m.incoming.mrn || 'N/A', 
        source: m.incoming.source 
    },
    recordB: { 
        name: m.potentialMatch.name, 
        mrn: m.potentialMatch.mrn || 'N/A', 
        source: m.potentialMatch.source 
    },
    matchedFields: m.matchedFields || ['Name', 'DOB']
  }));
}

/**
 * Merge patient records
 */
export async function mergeRecords(
  matchId: string
): Promise<{ success: boolean; message: string }> {
  const response = await fetch(`${NODE_API_URL}/hitl/resolve`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ queueId: matchId, action: 'merge' })
  });
  
  if (!response.ok) return { success: false, message: 'Failed to merge' };
  return { success: true, message: 'Records merged successfully' };
}

/**
 * Query patient data with natural language
 */
export async function askQuestion(question: string): Promise<QueryResponse> {
  const response = await fetch(`${PYTHON_API_URL}/query`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ question })
  });
  
  if (!response.ok) throw new Error('AI Query failed');
  return await response.json();
}

/**
 * Get patient golden record
 */
export async function getGoldenRecord(patientId: string) {
  // We fetch standard record from Node, and intelligence from Python
  const [recordRes, intelligenceRes] = await Promise.all([
    fetch(`${NODE_API_URL}/records/${patientId}`),
    fetch(`${PYTHON_API_URL}/patient/${patientId}`)
  ]);

  if (!recordRes.ok) throw new Error('Failed to fetch record data');
  
  const record = await recordRes.ok ? await recordRes.json() : {};
  const intelligence = await intelligenceRes.ok ? await intelligenceRes.json() : { lumiere_metadata: {} };

  // Combine data
  return {
    ...record,
    trustScore: (intelligence.lumiere_metadata?.confidence_score * 100) || 80,
    medications: [], // Placeholder if not in CSV yet
    visits: [],
    timeline: [],
    sources: record.sources || intelligence.lumiere_metadata?.data_sources || []
  };
}
