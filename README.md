# ROHSU — Modular Frontend Project
A minimalist e-commerce demo focused on **modular architecture**, **clean separation of concerns**, and scalable **project structure design**.
Not a feature showcase — but a codebase you can grow from.

> ⚠️ This project is primarily focused on demonstrating the architecture and modular design. The main emphasis is on the code structure and logic implementation. Feel free to explore the code first to get a better understanding of the overall design.

---

## 📁 Project Structure

```bash
src/
├── assets/                   # Static assets
│   ├── images/
│   └── scss/
├── components/               # UI component library
│   ├── common/               # Reusable common components
│   │   ├── Button.tsx
│   │   └── Checkbox.tsx
│   └── features/             # Feature-specific UI components
│       ├── ProductCard.tsx
│       └── ProductEditor.tsx
├── constants/                # Application constants
├── hooks/                    # Custom hooks
├── pages/                    # Pages for different routes
│   ├── admin/
│   ├── shop/
│   └── exports.ts
├── routes/                   # Route definitions
├── services/                 # API service logic
│   ├── admin/
│   ├── shop/
│   └── index.ts
├── store/                    # State management
├── types/                    # Type definitions
├── utils/                    # Utility functions
└── App.tsx

```

---

### Tech Stack

- React + TypeScript + Vite
- Tailwind CSS
- Axios for API requests
- React Router DOM for routing

---

## 🔗 Live Demo

You can view a basic deployed version of the project here :

**[https://your-username.github.io/your-project-name](https://your-username.github.io/your-project-name)**

---