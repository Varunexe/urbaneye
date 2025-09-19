# urbaneye
AI-driven automated traffic violation detection system with real-time analysis, dashboard, and SMS alerts.

# AI Traffic Violation Detection System

A comprehensive AI-powered system for detecting traffic violations from uploaded videos and images, specifically designed for Indian traffic conditions.

## Features

- **Multi-Violation Detection**: Helmet, seatbelt, lane violation, signal jumping, overspeeding
- **Indian License Plate Recognition**: ANPR optimized for Indian plates
- **Real-time Processing**: WebSocket-based live updates
- **Premium Dashboard**: Apple-style glassmorphism UI
- **SMS Notifications**: Twilio integration for violation alerts
- **Production Ready**: Docker, PostgreSQL, Redis, Celery

## Quick Start

### Prerequisites
- Python 3.9+
- Node.js 18+
- Docker & Docker Compose
- Git

### 1. Clone Repository
```bash
git clone <your-repo-url>
cd ai-traffic-violation-detection
```

### 2. Environment Setup
```bash
# Copy environment template
cp .env.example .env

# Edit .env with your configurations
nano .env
```

### 3. Install Dependencies
```bash
make install
# OR manually:
cd backend && pip install -r requirements.txt
cd ../frontend && npm install
```

### 4. Download AI Models
```bash
cd models
python download_models.py
```

### 5. Run with Docker
```bash
make docker-up
# OR
docker-compose up --build
```

### 6. Seed Database
```bash
make db-seed
```

## Access Points

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:8000
- **API Docs**: http://localhost:8000/docs
- **Database**: PostgreSQL on port 5432

## Development

### Run Development Servers
```bash
# Terminal 1 - Backend
cd backend
uvicorn app.main:app --reload

# Terminal 2 - Frontend  
cd frontend
npm run dev

# Terminal 3 - Worker
cd backend
celery -A app.jobs.worker worker --loglevel=info
```

### Project Structure
```
├── backend/          # FastAPI backend
├── frontend/         # React frontend
├── models/           # AI model weights
├── data/             # Data storage
├── docs/             # Documentation
└── tests/            # Test files
```

## API Endpoints

- `POST /api/upload` - Upload video/image
- `GET /api/jobs/{id}/status` - Job status
- `GET /api/violations` - List violations
- `POST /api/violations/{id}/notify` - Send SMS
- `WebSocket /ws/jobs/{id}` - Real-time updates

## Environment Variables

Key variables to configure:
- `DATABASE_URL` - PostgreSQL connection
- `REDIS_URL` - Redis connection
- `TWILIO_*` - SMS credentials
- `SECRET_KEY` - JWT secret

## License

MIT License - see LICENSE file

## Contributing

1. Fork the repository
2. Create feature branch
3. Make changes
4. Run tests: `make test`
5. Submit pull request