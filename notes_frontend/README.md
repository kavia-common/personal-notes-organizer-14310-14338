# Notes Frontend (Angular 19)

A modern, minimalistic notes application UI built with Angular. Features:
- User authentication (login/register)
- Create, read, update, delete notes
- Tagging and simple categorization
- Search notes
- Responsive layout: header with search, left sidebar with notes, right panel editor

## Quick start

1) Install dependencies
```bash
npm ci
```

2) Configure API endpoint (runtime, optional)
- Edit `public/assets/env.js` and set:
```js
window.__env__ = { API_BASE_URL: 'https://your-backend.example.com' };
```
If left empty, the app will call `/api/...`.

3) Run the dev server
```bash
npm start
```
Open http://localhost:3000

## Production build
```bash
npm run build
```

## Environment & Configuration

- Runtime API URL: `public/assets/env.js` (window.__env__.API_BASE_URL)
- Compile-time environments: `src/environments/environment*.ts`

Do not hardcode API URLs in code. Use the environment.

## Project structure highlights

- `src/app/services/*` - Api, Auth, Notes services
- `src/app/pages/auth/*` - Login and Register pages
- `src/app/pages/home/*` - Main layout page (header + sidebar + editor)
- `src/app/components/*` - Reusable UI components

## Angular version alignment

All Angular core packages are pinned to the exact same version (19.2.1) as required to avoid build issues.
