# ✦ Quill AI — Content Generator

A production-ready full-stack AI content generation app built with **FastAPI** (Python) + **React** + **Tailwind CSS** + **OpenAI API**.

---

## 📁 Project Structure

```
quill-ai/
├── backend/
│   ├── main.py
│   ├── requirements.txt
│   ├── .env.example
│   └── app/
│       ├── config.py
│       ├── models/schemas.py
│       ├── routes/content.py
│       └── services/
│           ├── openai_service.py
│           └── prompt_service.py
│
└── frontend/
    ├── index.html
    ├── package.json
    ├── vite.config.js
    ├── tailwind.config.js
    └── src/
        ├── App.jsx
        ├── main.jsx
        ├── index.css
        ├── constants/options.js
        ├── hooks/useContentGenerator.js
        ├── services/api.js
        └── components/
            ├── ContentForm.jsx
            ├── ContentResult.jsx
            ├── ErrorBanner.jsx
            ├── HistoryPanel.jsx
            └── LoadingSkeleton.jsx
```

---

## 🚀 Getting Started

### 1. Backend Setup

```bash
cd backend
python -m venv venv
source venv/bin/activate   # Windows: venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env
# Edit .env — add your OPENAI_API_KEY
uvicorn main:app --reload --port 8000
```

API: `http://localhost:8000`  
Docs: `http://localhost:8000/docs`

### 2. Frontend Setup

```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

App: `http://localhost:5173`

---

## 🔌 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/v1/generate` | Generate content |
| `GET`  | `/api/v1/options`  | Get content types & tones |
| `GET`  | `/health`          | Health check |

### POST `/api/v1/generate`

```json
{
  "topic": "The future of remote work",
  "content_type": "blog",
  "tone": "professional",
  "target_audience": "startup founders",
  "additional_context": "include productivity statistics"
}
```

**Content types:** `blog` | `caption` | `email` | `tweet` | `product_description` | `ad_copy`  
**Tones:** `formal` | `casual` | `persuasive` | `humorous` | `empathetic` | `professional`

---

## 🐳 Docker (Optional)

```yaml
# docker-compose.yml
version: "3.9"
services:
  backend:
    build: ./backend
    ports: ["8000:8000"]
    env_file: ./backend/.env
  frontend:
    build: ./frontend
    ports: ["5173:5173"]
    depends_on: [backend]
```

```bash
docker-compose up --build
```
