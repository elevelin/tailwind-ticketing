# Tailwind React Ticketing System

This is a simple and responsive ticketing system built with React, Tailwind CSS, and React Router. It supports full CRUD functionality, task claiming, and status-based filtering with deep links.

## Features

- Create, view, edit, and manage support tickets
- Claim or unclaim tasks (toggles ownership)
- Inline editing for priority, status, and owner fields
- Dashboard with clickable status filters (Open, Acknowledged, etc.)
- Individual ticket view pages at `/ticket/:id`
- Clean and modern UI with Tailwind CSS

## Tech Stack

- React (with Vite)
- React Router DOM
- Tailwind CSS
- Axios (for backend integration)
- Express or JSON server (expected backend at `http://localhost:5050/tickets`)

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
(Optional) Start your API server at http://localhost:5050



