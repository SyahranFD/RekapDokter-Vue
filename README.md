# RekapDokter

RekapDokter is a web app that turns doctor-patient consultation recordings into plain-language summaries, so patients can actually understand what they were told. Built with Vue 3 and Vite.

## Requirements

- Node.js 20 or newer (Vite 7 and the Vue plugin won't run on older versions)
- npm

## Installation

```
git clone git@github.com:SyahranFD/RekapDokter-Vue.git
cd RekapDokter-Vue
npm install
```

## Running locally

```
npm run dev
```

Vite will print a local URL, usually `http://localhost:5173`.

## Building for production

```
npm run build
```

This outputs static files to `dist/`. No environment variables are needed since the app has no backend.

To check the production build locally before deploying:

```
npm run preview
```

## Deployment

Pushing to `main` triggers a GitHub Actions workflow (`.github/workflows/deploy.yml`) that builds the app and deploys it to the VPS over SSH, then reloads Nginx. Deployment secrets live in the repository's Actions secrets, not in this repo.

## Tech stack

- Vue 3 + Vue Router
- Vite
- Tailwind CSS
- Iconify

## License

MIT, see `LICENSE`.
