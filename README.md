# 321-Chat-App

Full-stack chat application built with **React**, **Node.js** and **MongoDB**, fully orchestrated with **Docker**.

# Tech stack
- **Frontend:** React + Vite
- **Backend:** Node.js + Express
- **Database:** MongoDB (Containerized)
- **Orchestration:** Docker Compose

## Quick start
Make sure you have Docker installed. Run the following command in the root directory:

```PowerShell/bash
docker compose up -d --build

### Access ports
- **Frontend:** [http://localhost:5173](http://localhost:5173) (React / Vite)
- **Backend API:** [http://localhost:5000](http://localhost:5000) (Node.js / Express)
- **Database:** `localhost:27017` (MongoDB)
