# 🚀 Jash Barot – Portfolio Website

A modern, responsive, and professional ReactJS portfolio website built to showcase frontend development skills, projects, and AI & Data Science expertise.

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-Modules-1572B6?logo=css3&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green)

---

## ✨ Features

- **Responsive Design** — Mobile-first approach with breakpoints for mobile, tablet, laptop, and desktop
- **Dark / Light Theme** — Toggle between themes with smooth transitions and localStorage persistence
- **Functional Components** — Built entirely with React functional components and hooks
- **Form Validation** — Real-time contact form validation with error handling
- **Reusable Components** — `SkillCard`, `ProjectCard`, `SectionTitle` components used with props and `map()`
- **Smooth Animations** — Fade-in, slide-in, float, and hover effects throughout
- **Glassmorphism UI** — Modern glassmorphic navbar and card designs
- **Accessibility** — Semantic HTML, aria labels, keyboard navigation support
- **SEO Optimized** — Meta tags, structured headings, descriptive titles

---

## 🛠️ Technologies Used

| Technology | Purpose |
|---|---|
| ReactJS 19 | UI Library |
| Vite 8 | Build Tool |
| CSS3 | Styling (Custom, no frameworks) |
| React Icons | Icon Library |
| React Hooks | State Management (`useState`, `useEffect`) |
| ES6+ | Modern JavaScript Features |

---

## 📂 Folder Structure

```
src/
├── components/
│   ├── Navbar.jsx
│   ├── Hero.jsx
│   ├── About.jsx
│   ├── Experience.jsx
│   ├── Skills.jsx
│   ├── SkillCard.jsx
│   ├── Projects.jsx
│   ├── ProjectCard.jsx
│   ├── Contact.jsx
│   ├── Footer.jsx
│   └── SectionTitle.jsx
├── data/
│   ├── skillsData.js
│   └── projectsData.js
├── styles/
│   ├── navbar.css
│   ├── hero.css
│   ├── about.css
│   ├── experience.css
│   ├── skills.css
│   ├── projects.css
│   ├── contact.css
│   └── footer.css
├── App.jsx
├── main.jsx
└── index.css
```

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or later)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation

```bash
# Clone the repository
git clone https://github.com/jash1509/portfolio.git

# Navigate to project directory
cd portfolio

# Install dependencies
npm install

# Start development server
npm run dev
```

The dev server will start at `http://localhost:5173/`

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

---


## 🌐 Deployment

### Vercel

```bash
npm install -g vercel
vercel
```

### Netlify

1. Push your code to GitHub
2. Connect your repo on [Netlify](https://netlify.com)
3. Build command: `npm run build`
4. Publish directory: `dist`

### GitHub Pages

```bash
# Install gh-pages
npm install --save-dev gh-pages

# Add to package.json scripts:
# "deploy": "gh-pages -d dist"

# Build and deploy
npm run build
npm run deploy
```

---

## 📋 React Concepts Demonstrated

| Concept | Implementation |
|---|---|
| Functional Components | All 10 components |
| JSX | Throughout all components |
| Props | `SkillCard`, `ProjectCard`, `SectionTitle`, `Navbar` |
| `useState` | Theme toggle, mobile menu, form state, validation |
| `useEffect` | Scroll listener, theme persistence |
| ES6 Features | Arrow functions, destructuring, template literals, `map()`, spread operator |
| Component Reusability | `SkillCard` and `ProjectCard` rendered via `map()` |
| Responsive Design | CSS Grid, Flexbox, Media Queries |
| Mobile-First | Base styles for mobile, progressive enhancement |

---

## 🔮 Future Enhancements

- [ ] Blog section with markdown support
- [ ] Project detail pages with case studies
- [ ] Animated page transitions
- [ ] Backend integration for contact form (EmailJS / Formspree)
- [ ] Resume download feature
- [ ] Internationalization (i18n) support
- [ ] Performance optimization with lazy loading

---

## 👤 Author

**Barot Jash Miteshbhai**

- 📧 Email: [jashbarot69@gmail.com](mailto:jashbarot69@gmail.com)
- 🔗 GitHub: [github.com/jash1509](https://github.com/jash1509)
- 💼 LinkedIn: [linkedin.com/in/barot-jash-miteshbhai](https://linkedin.com/in/barot-jash-miteshbhai)

---

## 📄 License

This project is licensed under the MIT License.

---

> © 2026 Barot Jash Miteshbhai. All Rights Reserved.
