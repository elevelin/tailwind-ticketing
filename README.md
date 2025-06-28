# Tailwind React Ticketing System

This is a simple and responsive ticketing system built with React, Tailwind CSS, and React Router. It supports full CRUD functionality, task claiming, and status-based filtering with deep links.

## Features

- Create, view, edit, and manage support tickets
- Claim or unclaim tasks (toggles ownership)
- Inline editing for priority, status, and owner fields
- Color-coded priority levels (Low, Medium, High, and **Unbreak Immediately**)
- Dashboard with clickable status filters (Open, Acknowledged, etc.)
- Individual ticket view pages at `/ticket/:id`
- Clean and modern UI with Tailwind CSS

## Tech Stack

- React (with Vite)
- React Router DOM
- Tailwind CSS
- Axios (for backend integration)
- Flask API backend (runs at `http://localhost:5050`)

## Getting Started

1. Clone the repository:
  ```
  git clone https://github.com/your-username/tailwind-ticketing.git
  cd tailwind-ticketing
  ```

2. Install dependencies:

  ```
  npm install
  pip install -r backend/requirements.txt
  ```
3. Start the dev server:

  ```
  npm run dev
  ```

## Running the Flask API

The backend uses Flask. Install the required Python packages:

```bash
pip install flask flask_cors flask_sqlalchemy
```

Start the API from the project root:

```bash
python backend/app.py
```

The API will be available at http://localhost:5050.

Happy coding!

