# ===== Makefile =====
.PHONY: setup install dev build test clean docker-up docker-down

# Setup development environment
setup:
	@echo "Setting up development environment..."
	cp .env.example .env
	cd backend && pip install -r requirements.txt
	cd frontend && npm install

# Install dependencies
install:
	cd backend && pip install -r requirements.txt
	cd frontend && npm install

# Run development servers
dev:
	docker-compose -f docker-compose.dev.yml up --build

# Build production
build:
	cd frontend && npm run build
	cd backend && docker build -t traffic-violation-backend .

# Run tests
test:
	cd backend && python -m pytest tests/
	cd frontend && npm test

# Clean up
clean:
	docker-compose down -v
	docker system prune -f

# Docker commands
docker-up:
	docker-compose up --build -d

docker-down:
	docker-compose down

docker-logs:
	docker-compose logs -f

# Database commands
db-migrate:
	cd backend && alembic upgrade head

db-seed:
	cd backend && python -m seed.seed_database

# Model download
download-models:
	cd models && python download_models.py