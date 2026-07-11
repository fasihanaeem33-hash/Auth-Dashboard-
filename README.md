# Auth Dashboard

A React dashboard application built with Vite that includes authentication, protected routes, user detail pages, and Firebase support.

## Features

- User authentication with Firebase
- Protected dashboard and profile routes
- Login and signup pages
- User detail view and user cards
- Axios-based API service structure
- Tailwind CSS styling and responsive layout
- Recharts for charts and React Spinners for loading states
- Toast notifications with react-hot-toast

## Tech Stack

- React 19
- Vite
- Firebase
- Tailwind CSS
- React Router DOM
- Axios
- Recharts
- react-hot-toast

## Project Structure

- `src/main.jsx` - application entry point
- `src/App.jsx` - route definitions and layout
- `src/context/AuthContext.jsx` - authentication context provider
- `src/firebase/firebase.js` - Firebase app configuration
- `src/pages/` - page components (`Dashboard`, `Login`, `Signup`, `UserDetail`, `NotFound`)
- `src/components/` - reusable UI components
- `src/services/api.js` - API service helpers

## Setup

1. Install dependencies

```bash
npm install
```

2. Create a Firebase project and configure authentication

3. Add Firebase config to `src/firebase/firebase.js`

4. Start the development server

```bash
npm run dev
```

## Available Scripts

- `npm run dev` - start the Vite development server
- `npm run build` - build the production bundle
- `npm run preview` - preview the production build
- `npm run lint` - run ESLint on the project

## Notes

- Ensure `firebase` is configured properly before testing authentication flows.
- Update API endpoints in `src/services/api.js` if using a backend service.

## Deploy Link

https://auth-dashboardfn.netlify.app/
