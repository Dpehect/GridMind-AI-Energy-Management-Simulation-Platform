# GridMind — Local-First AI Energy Management & Digital Twin Platform

[![Next.js](https://img.shields.io/badge/Next.js-16.2-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.0-61DAFB?style=for-the-badge&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Three.js](https://img.shields.io/badge/Three.js-R3F-black?style=for-the-badge&logo=three.js)](https://threejs.org/)
[![Prisma](https://img.shields.io/badge/Prisma-6.1-2D3748?style=for-the-badge&logo=prisma)](https://www.prisma.io/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4.0-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)

**GridMind** is a local-first enterprise energy management and simulation platform designed for smart buildings, commercial campuses, and light industrial facilities. It delivers real-time energy telemetry, interactive 3D digital twins, carbon footprint analytics, and explainable AI recommendations with zero external API dependencies or cloud vendor lock-in.

---

## Interactive Design Prototype

Explore the interactive UX/UI design prototype on UXPin:
[GridMind UXPin Preview Prototype](https://preview.uxpin.com/e201a549bea281c23ccef40a9bbe7c5767006a39#/pages/225908981?mode=f)

---

## Technical Highlights

- **3D Facility Digital Twin & 2D Energy Map:** Interactive 3D campus visualization powered by React Three Fiber (`@react-three/fiber`) and Three.js, offering exploded floorviews, live thermal heatmaps, and zone-level energy telemetry.
- **Explainable Local Intelligence Engine:** Deterministic statistical anomaly detection (Z-score analysis), 24-hour demand forecasting, consumption profiling, and automated recommendation scoring running entirely on the local runtime.
- **Cost & Carbon Analytics Engine:** Granular calculation of Scope 1 & Scope 2 carbon emissions ($kg\ CO_2/kWh$), tariff structures (Peak, Off-Peak, Standard), and financial impact tracking.
- **Scenario Lab & Peak-Shaving Simulator:** Interactive scenario engine enabling facility managers to model HVAC setbacks, night load reductions, and solar/battery integration ROI before deployment.
- **Local-First Privacy & Offline Architecture:** SQLite persistence powered by Prisma ORM. Full privacy compliance—no telemetry or user data leaves the local environment.

---

## Tech Stack & Architecture

| Layer | Technology / Tools |
| :--- | :--- |
| **Frontend Framework** | Next.js 16 (App Router, Turbopack, Server & Client Components) |
| **Language & Typing** | TypeScript 5.9 (Strict Type Checking) |
| **3D & Graphics Engine** | Three.js, `@react-three/fiber`, `@react-three/drei`, GSAP |
| **UI & Styling System** | Tailwind CSS v4, Lucide Icons, Framer Motion, Radix UI Primitives |
| **Database & ORM** | SQLite, Prisma ORM 6.1 |
| **Ingestion & Data Flow** | Streaming CSV Parser, Deterministic Seed Generators |
| **Testing & Quality** | Vitest, Playwright E2E, ESLint 9 |

---

## Quick Start

### Prerequisites
- **Node.js**: `v20.9.0` or higher
- **npm**: `v10.0.0` or higher

### Installation & Setup

```bash
# 1. Clone the repository
git clone https://github.com/Dpehect/GridMind-AI-Energy-Management-Simulation-Platform.git
cd GridMind-AI-Energy-Management-Simulation-Platform

# 2. Install dependencies
npm install

# 3. Setup local database and seed demo campus data
npx prisma db push
npm run db:seed

# 4. Launch the local development server
npm run dev
```

Open `http://localhost:3000` (or `http://localhost:3001`) in your browser.

---

## Project Structure

```text
├── src/
│   ├── app/                    # Next.js App Router (Marketing & Dashboard Routes)
│   ├── components/             # Reusable UI Primitives & Marketing Components
│   │   ├── energy-map/         # 2D Floorplan & Layer Control Components
│   │   ├── marketing/          # 3D Energy Orb, Hero, & Feature Showcase
│   │   └── ui/                 # Design Tokens, Cards, Badges, & Metrics
│   ├── features/               # Domain Feature Modules
│   │   ├── cost-carbon/        # Financial & Carbon Emission Engine
│   │   ├── digital-twin/       # 3D Scene Controls & Canvas
│   │   ├── intelligence/       # Anomaly & Forecast Engine UI
│   │   └── scenarios/          # Simulation Lab Workspace
│   ├── lib/                    # Core Utilities, Intelligence Algorithms & DB Client
│   └── data/                   # Deterministic Demo Telemetry Datasets
├── prisma/                     # Database Schema & Seed Scripts
└── docs/                       # Architecture & System Documentation
```

---

## Security & Performance Standard

- **Zero Third-Party Data Leakage:** All analytics, forecasts, and ML recommendations run synchronously on local node instances.
- **Production Performance:** Built with Turbopack, static page prerendering, and optimized dynamic package imports.
- **Clean Engineering Codebase:** 100% clean TypeScript build (`npm run typecheck`) with zero warnings or errors.

---

## License

Distributed under the [MIT License](LICENSE). Built by **GridMind Engineering**.
