# Fractional Gov Bonds (RWA) — Frontend + Contracts

A hackathon-style Web3 demo for **tokenized government bonds**: browse offerings, view bond details, and simulate buy/liquidate flows with wallet-only UX.

This repo contains:
- A **React + Vite** frontend (Tailwind CSS)
- Demo **Solidity contracts** for a bond token + marketplace

> Note: The UI uses mock data for demo flows unless you deploy contracts and wire addresses.

## Requirements
- Node.js (LTS recommended)
- npm
- (Optional) MetaMask-compatible wallet in your browser

## Quick start
From the repo root:

```bash
npm install
npm run dev
```

Open the URL printed by Vite (usually `http://localhost:5173`).

## Build (for “going live”)
Vite apps must be deployed from the build output.

```bash
npm run build
npm run preview
```

- Build output is generated in `dist/`.
- Deploy the contents of `dist/` to your hosting.

## Scripts
- `npm run dev` — local dev server
- `npm run build` — production build into `dist/`
- `npm run preview` — serve the built app locally

## App routes
- `/` — landing
- `/marketplace` — marketplace UI
- `/dashboard` — portfolio dashboard
- `/bond/:bondId` — bond details

## Contracts (demo)
Located in `contracts/`:
- `GovernmentBondToken.sol` — bond token with basic metadata/coupon concepts
- `BondMarketplace.sol` — simple listing/purchase flow

These are included for hackathon completeness. If you want a full on-chain workflow, you’ll typically add a proper contract toolchain (Hardhat/Foundry), deploy, then update frontend contract addresses.

## Notes
- Tailwind CSS is configured for production builds.
- If you deploy under a subpath (e.g., GitHub Pages), you may need to set Vite `base` in `vite.config.js` and configure SPA fallback routing on your host.

## More documentation
See `PROJECT_README.md` for extended architecture and feature notes.
