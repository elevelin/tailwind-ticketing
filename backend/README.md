# Flask Ticketing API

This directory houses the Flask service that powers the ticketing system. It replaces the earlier Express/JSON server with a Python-based backend.

## Tech Stack

- Python 3.10+
- Flask with CORS support
- Flask-SQLAlchemy (SQLite database)

## Getting Started

1. Install Python dependencies:
   ```bash
   pip install -r requirements.txt
   ```
2. Start the API from the project root:
   ```bash
   python backend/app.py
   ```
   By default the server runs on `http://localhost:5050`.

The first run creates a local `tickets.db` SQLite database.

## Endpoints

- `GET /tickets` — list all tickets
- `POST /tickets` — create a ticket
- `PUT /tickets/<id>` — update a ticket
- `PUT /tickets/<id>/claim` — claim or unclaim a ticket
- `GET /tickets/owner/<owner>` — list tickets by owner

All responses are in JSON format.

