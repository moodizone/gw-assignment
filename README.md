# 🧩 GW Assignment

This is a React project built with **Vite**, **React Router**, **TanStack Table/Query**, **Tailwind CSS v4**, **React Hook Form**, and **MSW** for mocking API requests. The app includes server-side pagination, filtering, and URL-state sync for a robust user experience.

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/moodizone/gw-assignment.git
cd gw-assignment
```

### 2. Install Dependencies

⚠️ Use the -f (force) flag to install dependencies due to some peer conflict warnings:

```bash
npm install -f
```

### 🧪 Development

Start the development server:

```bash
npm run dev
```

### Features:

- Fully mocked API using MSW
- Hot module replacement
- Clean developer experience with modular code

### 📦 Build & Preview

To build the project for production:

```bash
npm run build
```

### 🛠️ Tech Stack

- ⚛️ React 19
- ⚡ Vite for ultra-fast dev/build times
- 🎨 Tailwind CSS v4 for utility-first styling
- 🔎 TanStack React Table v8 (manual mode for server-side pagination)
- 📡 TanStack Query for data fetching and caching
- 🧾 React Hook Form + Zod for robust form validation
- 🧭 React Router v7 for client-side routing
- 🧪 MSW (Mock Service Worker) for seamless API mocking
- 📦 Lucide + Radix UI for accessible UI primitives

### 🌐 Features

This app keeps the UI in sync with the URL using query params, enabling easy sharing and bookmarkability:

- ✅ Pagination (page, size)
- ✅ Search filtering (title)
- ✅ Select filters (category, rating)
- ✅ Sort state
- ✅ View options (column visibility)

### 📁 Project Structure

```pgsql
├── public/
│   └── mockServiceWorker.js ← MSW Worker Script
├── src/
│   ├── components/
│   ├── pages/product/listProvider/
│   │   ├── toolbar.tsx
│   │   ├── filters.tsx
│   │   ├── pagination.tsx
│   │   └── columns.ts
│   ├── services/
│   └── validations/
├── vite.config.ts
└── package.json
```

### 🧪 MSW Setup Notes

The MSW service worker file is correctly generated under /public.

It will be available at:

```arduino
https://moodizone.github.io/gw-assignment/mockServiceWorker.js
```

The registration uses import.meta.env.BASE_URL to handle GitHub Pages subpaths.

If you see this error in production:

```css
Failed to register a Service Worker ... script does not exist at the given path
```

Make sure to:

- Run `npx msw init public/` if needed
- Confirm the worker is present in `dist/mockServiceWorker.js`
- Set `base: "/gw-assignment/",` in `vite.config.ts`

### 🧹 Linting

```bash
npm run lint
```

### 🤝 Author

Made with ❤️ by @moodizone

### 📄 License

MIT

