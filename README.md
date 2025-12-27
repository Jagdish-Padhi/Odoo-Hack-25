# 🛠️ GearGuard - Smart Maintenance Management System

**Hackathon:** Odoo Hack 2025 | **Team:** Innobits | **Track:** Enterprise Operations

> A centralized equipment maintenance system that streamlines breakdown handling and preventive maintenance using automated team assignment, Kanban-based tracking, and calendar-driven scheduling.

---

## 🎯 Problem Statement

Managing equipment maintenance in organizations is often fragmented, leading to delayed repairs, missed preventive schedules, and poor visibility of maintenance status. Teams struggle to track breakdowns, assign responsibilities, and plan preventive maintenance efficiently using traditional methods.

## 💡 Solution

We built a centralized maintenance tracking system that connects equipment, maintenance teams, and requests in a single workflow. The platform enables real-time tracking through a Kanban board, schedules preventive maintenance via a calendar view, and automates team assignment to ensure faster and more organized maintenance operations.

---

## 🚀 Key Features

### Core Features

- **Equipment Management**

  - Add, view, and manage equipment with key details (name, serial number, location, assigned team).
  - Scrap functionality to mark inactive equipment.

- **Maintenance Teams**

  - Create and manage maintenance teams.
  - Assign technicians to teams.

- **Maintenance Requests**
  - Create Corrective and Preventive maintenance requests.
  - Auto-assign team based on selected equipment.
  - Track request status: `New`, `In Progress`, `Repaired`, `Scrap`.
  - Enter duration for repaired requests.

### User Interface

- **Kanban Board**

  - Visualize maintenance requests by status.
  - Drag-and-drop support for status updates.
  - Overdue requests highlighted for quick attention.

- **Preventive Maintenance Calendar**

  - Schedule and view preventive maintenance.
  - Click on calendar dates to create preventive requests.

- **Equipment Maintenance Quick Access**
  - “Maintenance” button on equipment cards to view all related requests.
  - Quick count of pending/open requests.

### Focused Design Principles

- Minimal and functional UI for fast workflow.
- Core business logic prioritized over fancy visuals.
- Fully functional CRUD for requests, equipment, and teams.
- Demo-ready within limited hackathon timeframe.

---

## 🛠️ Tech Stack

| Category    | Technology                     |
| ----------- | ------------------------------ |
| Frontend    | React, Vite                    |
| Backend     | Node.js, Express               |
| Database    | MongoDB, Firebase real-time DB |
| Auth        | Firebase authentication        |
| Deployement | Render Platform                |

---

## ⚡ Quick Start

```bash
# Clone and setup
git clone <repo-url>
cd repo-name
npm install

# Run backend
cd Backend && npm run dev

# Run frontend (new terminal)
cd Frontend && npm run dev
```

## 🔥 **Live Demo** - [Launch App]

## 🎥 **Video Walkthrough** - [Watch Demo]

---

## 📊 Project Structure

```
.
├── Backend/     (API & Database logic)
├── Frontend/    (UI & User interactions)
└── README.md
```

---

## 👥 Built by Team InnoBits

- [Saman Pandey](https://github.com/SamanPandey-in) - UI/UX & Design/Docs
- [Jagdish Padhi](https://github.com/Jagdish-Padhi) - Backend, Database, Auth & Frontend Integration
- [Twinkle Gupta](https://github.com/twinkle-2101) - Backend Development
- [Poorvaja Joshi](https://github.com/poorvaja-1603) - Backend Development, Video and Documentation

  ***

## 🔮 Future Enhancements

- Advanced reporting and analytics
- Email/push notifications
- Role-based access control
- Dashboard charts and visual metrics
- Mobile app (React Native)
- IoT sensor integration

**Built for Odoo Hack 2025 by Team InnoBits**
