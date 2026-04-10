import sys
import os
sys.path.append(os.path.dirname(__file__))
from matcher import is_match
from intelligence import generate_insights
from fastapi import FastAPI, HTTPException
from database import load_data
import pandas as pd
import os
from typing import Optional
from datetime import datetime

app = FastAPI(title="Lumiere Clinical Engine")

# Load Data Paths
EHR_PATH = "ehr_data.csv"
LAB_PATH = "lab_results.csv"
def fuzzy_merge(df_ehr, df_lab):
    merged_rows = []

    for _, ehr_row in df_ehr.iterrows():   # loop EHR
        for _, lab_row in df_lab.iterrows():  # loop Lab

            # check match
            if is_match(ehr_row['name'], lab_row['patient_name']) \
               and ehr_row['dob'] == lab_row['dob']:

                # merge both rows
                combined = {**ehr_row, **lab_row}
                merged_rows.append(combined)

    return pd.DataFrame(merged_rows)

def get_merged_data():
    df_ehr, df_lab = load_data()

    merged_rows = []

    for _, ehr_row in df_ehr.iterrows():
        for _, lab_row in df_lab.iterrows():

            # STRICT DOB MATCH FIRST
            if ehr_row['dob'] == lab_row['dob']:

                match, score = is_match(
                    ehr_row['name'],
                    lab_row['patient_name'],
                    ehr_row['dob'],
                    lab_row['dob']
                )

                # Allow lower threshold
                if score >= 0.4:
                    combined = {**ehr_row, **lab_row}
                    combined["confidence_score"] = round(score, 2)
                    merged_rows.append(combined)

    return pd.DataFrame(merged_rows)

@app.get("/patient/{patient_id}")
async def get_patient_record(patient_id: str):
    df = get_merged_data()
    
    if df is None or df.empty:
        raise HTTPException(status_code=404, detail="Data sources not found")
    
    # Filter by EHR Patient ID as requested
    record = df[df['patient_id'] == patient_id]
    
    if record.empty:
        raise HTTPException(status_code=404, detail=f"Patient {patient_id} not found in unified records")
    
    # Extract row
    row = record.iloc[0]
    
    # --- Intelligence Layer ---
    glucose = float(row['glucose'])
    heart_rate = float(row['heart_rate'])
    
    health_score, alerts, status = generate_insights(glucose, heart_rate)
    
    # --- FHIR-like JSON Synthesis ---
    fhir_record = {
        "resourceType": "Bundle",
        "type": "collection",
        "entry": [
            {
                "fullUrl": f"Patient/{row['patient_id']}",
                "resource": {
                    "resourceType": "Patient",
                    "id": row['patient_id'],
                    "name": [{"text": row['name']}],
                    "gender": "male" if row['gender'].lower() == "m" else "female",
                    "birthDate": row['dob'],
                    "address": [{"text": row['address']}]
                }
            },
            {
                "fullUrl": "Observation/lumiere-intelligence",
                "resource": {
                    "resourceType": "Observation",
                    "status": "final",
                    "code": {
                        "text": "Lumiere Composite Health Record"
                    },
                    "subject": {"reference": f"Patient/{row['patient_id']}"},
                    "effectiveDateTime": row['test_date'],
                    "valueQuantity": {
                        "value": health_score,
                        "unit": "Score",
                        "system": "http://lumiere.ai/scores"
                    },
                    "component": [
                        {"code": {"text": "Glucose"}, "valueQuantity": {"value": glucose, "unit": "mg/dL"}},
                        {"code": {"text": "Heart Rate"}, "valueQuantity": {"value": heart_rate, "unit": "bpm"}}
                    ],
                    "extension": [
                        {
                            "url": "http://lumiere.ai/fhir/StructureDefinition/clinical-alerts",
                            "valueString": str(alerts)
                        }
                    ]
                }
            }
        ],
        "lumiere_metadata": {
    "health_score": health_score,
    "status": status,
    "alerts": alerts,
    "confidence_score": row.get("confidence_score", 0.8),
    "data_sources": ["EHR", "Lab"],
    "synthesis_timestamp": datetime.now().isoformat()
}
    }
    
    return fhir_record

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
