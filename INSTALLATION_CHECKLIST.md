# ✅ Installation Checklist - TradePro Trading Platform

## Pre-Installation

- [ ] Node.js installed (v18.0.0 or higher)
- [ ] npm or yarn package manager
- [ ] Code editor (VS Code recommended)
- [ ] Terminal/PowerShell access
- [ ] Git (optional, for version control)

## Installation Steps

### Option A: Automated Setup (Recommended) ⚡

1. [ ] Open PowerShell in project directory
2. [ ] Run setup script:
   ```powershell
   .\setup-trading-platform.ps1
   ```
3. [ ] Wait for installation to complete (~2-3 minutes)
4. [ ] Start dev server when prompted

### Option B: Manual Setup 🔧

1. [ ] Backup old configuration:
   ```powershell
   Move-Item package.json package-old.json -Force
   ```

2. [ ] Set up new configuration:
   ```powershell
   Move-Item package-next.json package.json -Force
   ```

3. [ ] Install dependencies:
   ```powershell
   npm install
   ```
   Expected time: ~2-3 minutes

4. [ ] Verify installation:
   ```powershell
   npm list --depth=0
   ```
   Should show Next.js 15, React 18, etc.

## Post-Installation Verification

### 1. Check Files Created ✓

- [ ] `node_modules/` folder exists
- [ ] `package-lock.json` created
- [ ] `next.config.js` exists
- [ ] `tsconfig.json` exists
- [ ] `tailwind.config.ts` exists

### 2. Start Development Server

```powershell
npm run dev
```

- [ ] Server starts without errors
- [ ] Shows: "Ready on http://localhost:3000"
- [ ] No TypeScript errors
- [ ] No build warnings (minor warnings OK)

### 3. Test Pages in Browser

Open http://localhost:3000 and check:

- [ ] **Landing Page** loads (`/`)
  - Hero section visible
  - Stats cards display
  - Feature cards show
  - No console errors

- [ ] **Dashboard** works (`/dashboard`)
  - 3-column layout displays
  - Chart placeholder shows
  - Order book visible
  - No layout breaks

- [ ] **Markets** loads (`/markets`)
  - Trading pairs table displays
  - Search box works
  - Filter buttons respond
  - Price data shows

- [ ] **Trade** opens (`/trade/BTCINR`)
  - Chart area visible
  - Order panel on right
  - Buy/Sell buttons work
  - Slider moves

- [ ] **Wallet** functions (`/wallet`)
  - Balance displays
  - Asset cards show
  - Tabs switch correctly
  - Modals open/close

- [ ] **Earn** works (`/earn`)
  - Staking table displays
  - Copy trader cards show
  - Stats cards visible
  - Modals function

- [ ] **Profile** loads (`/profile`)
  - Profile header shows
  - Tabs switch
  - Forms display
  - Settings work

### 4. Test Mobile View 📱

Open DevTools (F12) and toggle device toolbar:

- [ ] Bottom navigation appears
- [ ] Header hamburger menu works
- [ ] Layout is responsive
- [ ] Cards stack properly
- [ ] Tables scroll or stack
- [ ] Buttons are tap-friendly

### 5. Test Interactions

- [ ] Buttons have hover effects
- [ ] Cards scale on hover (desktop)
- [ ] Modals animate in/out
- [ ] Tabs have smooth transitions
- [ ] Theme toggle works (if visible)
- [ ] Dropdowns open/close

## Common Issues & Solutions 🔧

### Issue: "Cannot find module 'next'"
**Solution:**
```powershell
rm -rf node_modules
rm package-lock.json
npm install
```

### Issue: TypeScript errors
**Solution:**
```powershell
npx tsc --noEmit
```
Check for actual errors. Some warnings are OK.

### Issue: Tailwind styles not applying
**Solution:**
1. Restart dev server (Ctrl+C, then `npm run dev`)
2. Clear browser cache
3. Check `tailwind.config.ts` exists

### Issue: Port 3000 already in use
**Solution:**
```powershell
# Kill process on port 3000
netstat -ano | findstr :3000
taskkill /PID [PID_NUMBER] /F

# Or use different port
npm run dev -- -p 3001
```

### Issue: Module resolution errors
**Solution:**
Check `tsconfig.json` has:
```json
"paths": {
  "@/*": ["./src/*"]
}
```

### Issue: Framer Motion errors
**Solution:**
```powershell
npm install framer-motion@latest --force
```

## Performance Checklist 🚀

After successful installation:

- [ ] Build completes without errors:
  ```powershell
  npm run build
  ```

- [ ] Production build runs:
  ```powershell
  npm start
  ```

- [ ] Page load time < 3 seconds
- [ ] No console errors in production
- [ ] All routes accessible

## Development Workflow ✨

### Daily Workflow

1. [ ] Open project in editor
2. [ ] Run dev server: `npm run dev`
3. [ ] Make changes to files
4. [ ] Save and see hot reload
5. [ ] Test in browser
6. [ ] Commit changes (if using Git)

### Before Pushing to Production

1. [ ] Run build: `npm run build`
2. [ ] Test production build: `npm start`
3. [ ] Check all pages work
4. [ ] Verify mobile responsive
5. [ ] Test all interactions
6. [ ] Check browser console for errors

## Optional Enhancements

- [ ] Install VS Code extensions:
  - ESLint
  - Tailwind CSS IntelliSense
  - TypeScript React Snippets
  - Prettier

- [ ] Set up Git:
  ```powershell
  git init
  git add .
  git commit -m "Initial TradePro setup"
  ```

- [ ] Set up environment variables:
  Create `.env.local`:
  ```
  NEXT_PUBLIC_API_URL=your-api-url
  ```

## Documentation References 📚

- [ ] Read `QUICKSTART.md` for quick reference
- [ ] Review `TRADING_PLATFORM_README.md` for full docs
- [ ] Check `DESIGN_SYSTEM.md` for components
- [ ] See `PROJECT_STRUCTURE.md` for file organization
- [ ] Review `IMPLEMENTATION_SUMMARY.md` for features

## Success Criteria ✅

Your installation is successful when:

- ✅ All 7 pages load without errors
- ✅ Mobile navigation works
- ✅ Animations are smooth
- ✅ No TypeScript errors
- ✅ Build completes successfully
- ✅ Hot reload works during development

## Next Steps After Installation 🎯

1. [ ] Familiarize yourself with project structure
2. [ ] Test all pages and features
3. [ ] Customize colors/branding if needed
4. [ ] Add real API integration
5. [ ] Set up backend connection
6. [ ] Deploy to production

## Get Help 🆘

If you encounter issues:

1. Check this checklist again
2. Review error messages in terminal
3. Check browser console for errors
4. Read the documentation files
5. Verify Node.js version: `node --version`
6. Ensure npm is updated: `npm --version`

## Final Verification

Run this command to verify everything:
```powershell
npm run dev
```

Then visit each page:
- http://localhost:3000 (Landing)
- http://localhost:3000/dashboard
- http://localhost:3000/markets
- http://localhost:3000/trade/BTCINR
- http://localhost:3000/wallet
- http://localhost:3000/earn
- http://localhost:3000/profile

**If all pages load, congratulations! 🎉**

---

## Installation Complete! 🎊

You now have a fully functional trading platform ready for customization and production deployment!

**Time to start building!** 🚀
