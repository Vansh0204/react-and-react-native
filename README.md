# React & React Native Projects

Welcome! This repository is a collection of small but polished React and React Native projects. It's designed to be friendly for contributors of all experience levels — especially during community events like Hacktoberfest — and to serve as a handy reference for common React patterns.


## What’s inside

This repo contains multiple standalone apps. Each lives in its own folder with its own tooling and can be run independently.

- `Movie Search App/` — A Vite + React app for searching movies
- `React/weather-dashboard/` — A Vite + React weather dashboard with charts
- `text-utils/` — A React app with handy text utilities
- `React Native/` — Placeholder for React Native examples (coming soon)


## Prerequisites

- Node.js (LTS recommended)
- npm (comes with Node)
- Git

Verify your versions:

```bash
node -v
npm -v
git --version
```


## Getting started (Fork → Clone → Branch)

1. Fork this repository to your GitHub account.
2. Clone your fork:
   ```bash
   git clone https://github.com/<your-username>/react-and-react-native.git
   cd react-and-react-native
   ```
3. Add the original repo as `upstream` (so you can sync later):
   ```bash
   git remote add upstream https://github.com/vanshagarwal/react-and-react-native.git
   git remote -v
   ```
4. Create a feature branch:
   ```bash
   git checkout -b feat/<short-topic>
   # e.g. feat/improve-weather-card
   ```


## Project structure

```
react-and-react-native/
├─ Movie Search App/
│  ├─ src/
│  └─ ...
├─ React/
│  └─ weather-dashboard/
│     ├─ src/
│     └─ ...
├─ React Native/
│  └─ Readme.md
├─ text-utils/
│  ├─ src/
│  └─ ...
├─ Contributing.md
└─ README.md
```


## Run a project locally

Each app is independent. Change into the app’s folder, install dependencies, and start the dev server.

### Run: Movie Search App
```bash
cd "Movie Search App"
npm install
npm run dev
```
The app will print a local URL (usually `http://localhost:5173`).

### Run: Weather Dashboard
```bash
cd React/weather-dashboard
npm install
npm run dev
```

### Run: Text Utils
```bash
cd text-utils
npm install
npm start
```

If you see build or lint errors, read the app’s local `README.md` (if present) for specific notes.


## How to contribute

We welcome issues, feature requests, docs improvements, accessibility fixes — everything helps.

1. Pick something to work on
   - Browse open issues, or create a new one explaining what you’ll change.
   - Keep scope focused: one PR per logical change.

2. Create your branch
   ```bash
   git checkout -b feat/<short-topic>
   ```

3. Make your changes
   - Prefer small, readable edits.
   - Match existing code style; don’t reformat unrelated files.
   - Run the app you touched and manually test the change.

4. Update `Contributing.md` (required)
   - Add yourself to the contributors table in `Contributing.md` with your name, email, and a short note of what you did.

5. Commit with a clear message
   ```bash
   git add -A
   git commit -m "feat(weather): add humidity trend to Forecast"
   # types you can use: feat, fix, docs, chore, refactor, perf, test
   ```

6. Push your branch
   ```bash
   git push origin feat/<short-topic>
   ```

7. Open a Pull Request
   - From your fork, click “Compare & pull request”.
   - Fill in a clear title and description:
     - what changed
     - why it changed (the problem it solves)
     - screenshots or recordings (if UI)
     - testing notes (how reviewers can verify)

8. Address review feedback
   - Push additional commits to the same branch; the PR updates automatically.


## Keeping your fork in sync

Before starting new work, sync your fork to avoid conflicts:

```bash
git fetch upstream
git checkout main
git merge upstream/main
git push origin main
```


## Pull Request checklist

- [ ] Changes are focused and atomic
- [ ] App builds and runs locally
- [ ] No unrelated file churn or reformatting
- [ ] Added or updated docs where needed
- [ ] Added your details to `Contributing.md`
- [ ] Screenshots/recordings attached for UI changes


## Tips for good contributions

- Prefer descriptive variable and function names.
- Keep components small and composable.
- Avoid deep nesting; use early returns.
- Add only meaningful comments (non-obvious intent, edge cases).
- Don’t catch errors without handling them.


## Questions or help

If you’re stuck, open an issue with as much detail as possible (what you tried, error output, screenshots). Friendly reviews and mentorship are part of the goal of this repo.


## Thanks

Big thanks to all contributors. If you’re here for Hacktoberfest: every contribution matters — welcome aboard and have fun building!
