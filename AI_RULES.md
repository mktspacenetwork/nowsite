# AI Development Rules for NOW Soluções App

This document provides guidelines for the AI assistant to follow when developing and modifying this application. The goal is to maintain consistency, simplicity, and adhere to the established architecture.

## 🚀 Tech Stack

The application is built with the following technologies:

- **Frontend Framework**: React with TypeScript for building a modern, type-safe user interface.
- **Build Tool**: Vite is used for a fast development experience and optimized production builds.
- **Styling**: Tailwind CSS is the exclusive choice for styling. All components are styled using its utility-first classes.
- **Backend**: A lightweight Node.js and Express server handles the contact form submissions.
- **Email Service**: Nodemailer is configured to send emails through the MailGrid SMTP service.
- **Process Management**: PM2 is used to manage and daemonize the backend Node.js application.
- **Internationalization (i18n)**: A custom React Context (`LanguageContext`) provides multi-language support. All user-facing text must be added to the `translations/index.ts` file.
- **Icons**: Google Material Icons are used for all iconography.

## 📚 Library and Pattern Usage Rules

To ensure code consistency, please adhere to the following rules:

### Frontend

- **UI Components**: Do **not** introduce a component library like Shadcn/UI, Material-UI, or Ant Design. All components should be custom-built using React, TypeScript, and styled with Tailwind CSS.
- **Styling**:
    - Use **only** Tailwind CSS utility classes for styling.
    - Do not write custom CSS files. All necessary custom styles (like animations) are defined in `index.html` or `tailwind.config.js`.
- **State Management**:
    - For local component state, use React's built-in hooks (`useState`, `useEffect`).
    - For global state (like language), use the existing React Context pattern. Do not add libraries like Redux or Zustand.
- **Routing**:
    - The app uses a simple state-based navigation system controlled in `App.tsx`. Continue using this pattern.
    - Do **not** install `react-router-dom` unless specifically requested to handle more complex routing needs.
- **Animations**:
    - Use CSS transitions and keyframe animations defined in `index.html`.
    - For scroll-triggered animations, use the existing `useOnScreen` custom hook.
- **Icons**:
    - Use Material Icons exclusively. Implement them using `<span className="material-icons-outlined">icon_name</span>`.
- **Forms**:
    - Use controlled components with `useState` for form handling.
    - Do not add form management libraries like Formik or React Hook Form.
- **HTTP Requests**:
    - Use the browser's native `fetch` API for all client-server communication. Do not add libraries like Axios.

### Backend

- **Dependencies**: The backend is intentionally minimal. Do not add new dependencies unless absolutely necessary. The current stack (`express`, `nodemailer`, `helmet`, `cors`, `dotenv`, `express-rate-limit`) is sufficient for its purpose.
- **API Endpoints**: All API endpoints should be prefixed with `/api/`.
- **Security**: Continue using `helmet` for security headers and `express-rate-limit` for preventing abuse. All user input must be validated and sanitized on the server-side, as demonstrated in `server.js`.

By following these rules, we ensure the codebase remains clean, maintainable, and consistent.