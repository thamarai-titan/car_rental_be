<div align="center">
  # DevBin
  <img src="https://img.shields.io/badge/Build-Passing-success" />
  <img src="https://img.shields.io/badge/License-MIT-blue" />
  <img
    src="https://img.shields.io/github/stars/thamarai-titan/DevBin?style=social" />
  <img src="https://img.shields.io/badge/PRs-Welcome-brightgreen" />
  <br />
  Discover the most trending and essential developer tools in the ecosystem with
  DevBin.
  Elevate your development experience with our curated collection of tools and
  resources.
</div>

## 🚀 FEATURES
These are the key features of DevBin:
* **Type Safety**: Utilize TypeScript for robust type checking and maintainable
code
* **Rapid Deployment**: Leverage Next.js for fast and efficient deployment of
web applications
* **Modular Architecture**: Organize code into logical modules with React and
TypeScript
* **Smooth Animations**: Enhance user experience with GSAP animations
* **Type-safe DB Access**: Use Prisma ORM for secure and efficient database
interactions
* **Scalable Backend**: Build scalable backend services with Node.js and
TypeScript

## 🏗️ TECH STACK
| Category | Tool | Description |
| --- | --- | --- |
| Frontend | React/TypeScript | Utilized for building reusable UI components and
managing state |
| Frontend | Next.js | Employs server-side rendering and static site generation
for optimized performance |
| Backend | Node.js/TypeScript | Provides a scalable and maintainable backend
with TypeScript support |
| Database | SQL | Relational database management system for storing structured
data |
| Database | Prisma ORM | Offers type-safe database access and schema management
|

## 📁 PROJECT STRUCTURE
```
devbin/
├── public/
│ ├── index.html
│ └── favicon.ico
├── src/
│ ├── components/
│ │ ├── Header.tsx
│ │ ├── Footer.tsx
│ │ └── ...
│ ├── pages/
│ │ ├── index.tsx
│ │ ├── about.tsx
│ │ └── ...
│ ├── api/
│ │ ├── db.ts
│ │ ├── prisma.ts
│ │ └── ...
│ ├── utils/
│ │ ├── helpers.ts
│ │ ├── constants.ts
│ │ └── ...
│ ├── index.ts
│ └── ...
├── package.json
├── tsconfig.json
└── ...
```
The `src` directory contains the application code, divided into `components`,
`pages`, `api`, and `utils` folders. The `public` directory holds static assets.

## ⚡ QUICK START
### Prerequisites
* Node.js (version 16 or higher)
* TypeScript (version 5 or higher)
* SQL database (e.g., PostgreSQL)
### Installation
```bash
git clone https://github.com/thamarai-titan/DevBin.git
cd DevBin
npm install
cp .env.example .env
npm run dev
```

## 🛠️ CONFIGURATION
| Variable | Default | Description |
| --- | --- | --- |
| DATABASE_URL | localhost:5432 | URL of the SQL database |
| API_KEY | none | API key for external services |
| PORT | 3000 | Port number for the development server |

## 📜 SCRIPTS
| Command | Description |
| --- | --- |
| `npm run dev` | Starts the development server |
| `npm run build` | Builds the application for production |
| `npm run start` | Starts the production server |

## 🤝 CONTRIBUTING & LICENSE
Contributions are welcome and appreciated. Please submit a pull request with
your changes.
This project is licensed under the [MIT
License](https://opensource.org/licenses/MIT).
