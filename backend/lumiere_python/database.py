import pandas as pd
import os

EHR_PATH = "ehr_data.csv"
LAB_PATH = "lab_results.csv"

def load_data():
    if not os.path.exists(EHR_PATH) or not os.path.exists(LAB_PATH):
        raise Exception("CSV files not found")

    df_ehr = pd.read_csv(EHR_PATH)
    df_lab = pd.read_csv(LAB_PATH)

    return df_ehr, df_lab