# Lumiere: Clinical Intelligence & Identity Resolution

Lumiere is a high-performance clinical data synthesis platform designed to resolve patient identities across fragmented health systems. It combines deterministic record matching with an AI-powered conversational layer to provide clinicians with a unified "Golden Record."

---

## 🏗️ Architecture

Lumiere is built with a decoupled, tri-service architecture:

| Service | Technology | Port | Description |
| :--- | :--- | :--- | :--- |
| **Frontend** | Next.js 14+ (App Router) | 3000 | Clinician Portal & Dashboard |
| **Node Backend** | Node.js / Express | 3001 | EHR, FHIR, and HL7 Data Services |
| **Python Engine** | FastAPI / Python 3.10+ | 8000 | Lumiere Clinical Intelligence (Resolution & Chat) |

---

## 🚀 Getting Started

### 1. Prerequisites
- **Node.js**: 18.x or higher
- **Python**: 3.10 or higher
- **API Key**: A [GroqCloud API Key](https://console.groq.com/) for conversational fallback.

### 2. Installation

Clone the repository and install dependencies for each service:

```bash
# 1. Install Node Backend dependencies
cd backend && npm install

# 2. Install Frontend dependencies
cd ../frontend && npm install

# 3. Install Python Engine dependencies
cd ../backend/lumiere_python
pip install -r requirements.txt
```

### 3. Environment Setup
Create a `.env` file in `backend/lumiere_python/` and add your Groq key:
```env
GROQ_API_KEY=your_key_here
```

---

## 🛠️ Running the Application

To run the full stack, you need to start all three services. Open three terminal windows:

### Terminal 1: Node Data Server
```bash
cd backend
node server.js
```

### Terminal 2: Lumiere Python Engine
```bash
cd backend/lumiere_python
uvicorn main:app --reload --port 8000
```

### Terminal 3: Next.js Frontend
```bash
cd frontend
npm run dev
```

The application will be accessible at [http://localhost:3000](http://localhost:3000).

---

## 🔍 Core Features

- **Lumiere Search**: Deep-resolve patient identities by name, phone, or email using weighted confidence scoring.
- **Identity Synthesis**: Automatic merging of low-stakes duplicates and human-in-the-loop review for high-stakes cases.
- **Clinical Chat**: Ask natural language questions about the unified patient record.
- **Interoperability**: Built-in support for FHIR R4, HL7 v2, and OCR-extracted clinical documents.

---

## 🛡️ Security & Privacy
Lumiere implements a "PII-Blind" intelligence flow. Sensitive identifiers are processed locally via deterministic algorithms, while conversational queries are sanitized before being sent to external LLMs.

---

## 🤝 Contribution
1. Pull the latest code: `git pull origin main`
2. Create your feature branch: `git checkout -b feature/new-logic`
3. Commit changes: `git commit -m "feat: updated resolution weights"`
4. Push to main: `git push origin main`
