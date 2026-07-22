# Thiruppugazh UI

Frontend application for browsing and interacting with **Thiruppugazh** content.

## Overview

This project contains the user interface for the **Thiruppugazh** application.  
It is designed to provide a simple, readable, and accessible experience for viewing, searching, and navigating devotional songs and related content.

## Features

- Clean and responsive user interface
- Fast navigation across content
- Search-friendly content discovery
- Modular frontend structure
- Ready for local development and deployment

## Prerequisites

Install the following before starting:

- [Node.js](https://nodejs.org/) 18 or later
- One of the following package managers:
  - `npm`
  - `yarn`
  - `pnpm`

## Getting Started

Clone the repository and install dependencies:

```bash
git clone https://github.com/kamalsoft/thiruppugazh.git
cd thiruppugazh/thiruppugazh-ui
npm install
```

Start the development server:

```bash
npm run dev
```

Open the local URL shown in the terminal.

Typical local URLs:

```text
http://localhost:3000
http://localhost:5173
```

## Available Scripts

Run these from the `thiruppugazh-ui` folder.

### Start development server

```bash
npm run dev
```

### Build for production

```bash
npm run build
```

### Preview production build

```bash
npm run preview
```

### Run tests

```bash
npm run test
```

### Run lint checks

```bash
npm run lint
```

## Environment Configuration

If the UI depends on API endpoints or external services, create a local environment file.

Example:

```bash
cp .env.example .env
```

Typical environment variables may include:

- `API_BASE_URL`
- `APP_ENV`

Update values based on the target environment.

## Project Structure

A typical project layout:

```text
thiruppugazh-ui/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   ├── pages/
│   ├── services/
│   ├── styles/
│   └── utils/
├── package.json
└── README.md
```

## Development Guidelines

- Keep components small and reusable
- Separate UI and API logic
- Use clear naming conventions
- Add tests for important user flows
- Keep styling consistent across screens

## Production Build

To generate an optimized build:

```bash
npm run build
```

The build output will be created in the configured output directory.

## Deployment

The application can be deployed to any static hosting platform or frontend hosting service, such as:

- Vercel
- Netlify
- GitHub Pages
- Azure Static Web Apps

## Contributing

1. Create a feature branch
2. Make the required changes
3. Run linting and tests
4. Open a pull request

## Repository

GitHub: [kamalsoft/thiruppugazh](https://github.com/kamalsoft/thiruppugazh)

## License

Add the appropriate license information for this project.