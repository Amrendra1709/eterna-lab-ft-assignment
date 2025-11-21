# Axiom Trade Pulse

Real-time token discovery. Fast. Clean. Works.

## What It Does

Tracks new crypto tokens across three stages:
- **New Pairs** - Just launched (< 24h)
- **Final Stretch** - Near migration threshold
- **Migrated** - Live on Raydium

Real-time price updates. Live filtering. Zero lag.

## Tech

Next.js 16 (Turbopack) • TypeScript • Redux Toolkit • Tailwind CSS • shadcn/ui

## Run It

```bash
npm install
npm run dev
```

Open [localhost:3000](http://localhost:3000)

## Build It

```bash
npm run build
npm start
```

## The Stack

- **Framework**: Next.js 14.2+ with App Router
- **State**: Redux Toolkit 2.0+
- **Styling**: Tailwind CSS 3.4+ with custom design system
- **Components**: shadcn/ui with atomic structure
- **Real-time**: WebSocket simulation (mock service)
- **Data**: React Query for server state

## Features

✓ Virtual scrolling for 1000+ tokens  
✓ Multi-column sorting  
✓ Advanced filtering (price, mcap, liquidity, holders)  
✓ Real-time price updates with flash animations  
✓ Glassmorphism UI with premium aesthetics  
✓ Token detail modals  
✓ Quick buy interface  

## Performance

- Optimized with React.memo
- Virtual scrolling via @tanstack/react-virtual
- Debounced filters
- Efficient Redux selectors

---

Built for speed. Designed for traders.
