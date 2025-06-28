# Flask Ticketing API

This is a simple and responsive ticketing system built with React, Tailwind CSS, and React Router. It supports full CRUD functionality, task claiming, and status-based filtering with deep links.

## Features

- Create, view, edit, and manage support tickets
- Claim or unclaim tasks (toggles ownership)
- Inline editing for priority, status, and owner fields
- Color-coded priority levels (Low, Medium, High, and **Unbreak Immediately**)
- Dashboard with clickable status filters (Open, Acknowledged, etc.)
- Individual ticket view pages at `/ticket/:id`
- Clean and modern UI with Tailwind CSS
=======
This directory houses the Flask service that powers the ticketing system.

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
