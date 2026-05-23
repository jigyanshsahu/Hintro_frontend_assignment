# Hintro Analytics Dashboard

A modern, responsive, and beautifully designed analytics dashboard built with **TanStack Start**. This project was developed to strictly adhere to the provided Figma designs, featuring dynamic layouts, a fully integrated mock backend, and a completely responsive mobile and desktop UI.

## 🚀 Tech Stack

- **Framework**: [TanStack Start](https://tanstack.com/start/latest) (React Server Components & SSR)
- **Routing**: [TanStack Router](https://tanstack.com/router/latest)
- **State Management**: [Zustand](https://zustand-demo.pmnd.rs/) (Client UI State) & [TanStack Query](https://tanstack.com/query/latest) (Server State)
- **Styling**: [TailwindCSS v4](https://tailwindcss.com/) & [clsx](https://github.com/lukeed/clsx) + [tailwind-merge](https://github.com/dcastil/tailwind-merge) for dynamic classes
- **Language**: TypeScript
- **Icons**: [Lucide React](https://lucide.dev/)
- **Data Fetching**: Axios
- **Validation**: Zod

## ✨ Key Features

- **Pixel-Perfect Figma Implementation**: The UI strictly follows the provided desktop and mobile Figma designs.
- **Responsive Layouts**: Fully responsive sidebar (with slide-in mobile overlay, 'X' close toggles, and desktop hamburger menus) and CSS grid layouts that adapt beautifully to any screen size.
- **Dynamic Dashboard**: 
  - 4 customizable analytics cards (`Total Sessions`, `Average Duration`, `AI Used`, and `Last Session`).
  - Integrated "Recent Calls" grouping that dynamically organizes fetched sessions by relative dates (e.g., "April 29th").
- **Mock API Integration**: Connects to the provided `https://mock-backend-hintro.vercel.app/` for fetching user profiles, dashboards, stats, and paginated call history.
- **Interactive UI Components**: Includes a custom profile dropdown, a fully styled "Logout" confirmation modal, and sleek UI micro-interactions (hover states, focus rings, subtle shadows).

## 📦 Getting Started

### Prerequisites

Ensure you have [Node.js](https://nodejs.org/) installed on your machine.

### Installation

1. Clone this repository (or extract the project files).
2. Install the dependencies using npm:

```bash
npm install
```

### Running the Development Server

To start the local development server:

```bash
npm run dev
```

The application will be available at [http://localhost:3000](http://localhost:3000).

### Building for Production

To build the project for production:

```bash
npm run build
```

To run the production build:

```bash
npm run start
```

## 🏗 Project Structure

- `/app/components`: Reusable UI components categorized by `dashboard`, `layouts`, `shared`, and generic `ui` elements.
- `/app/hooks`: Custom React hooks for interacting with the mock APIs via TanStack Query.
- `/app/store`: Zustand global state (e.g., sidebar toggling).
- `/app/types`: TypeScript interfaces mapping directly to the mock backend responses.
- `/app/utils`: Formatting utilities for converting ISO dates to relative strings (e.g., `2 days ago`) and verbose durations (e.g., `14m 22sec`).
- `/src/routes`: TanStack Router file-based routing components (`/dashboard`, `/history`, etc.).

## 🎨 Design Philosophy

- **Vibrant & Premium Aesthetics**: Uses deep indigos, violets, and curated grays instead of standard browser defaults to create a feeling of premium software.
- **Glassmorphism & Depth**: Subtle `backdrop-blur` effects on the navbar and mobile overlays, paired with distinct card borders and minimal drop-shadows.
- **Micro-Animations**: Clean SVG icon hover states and transition animations for dropdowns and sidebars.
