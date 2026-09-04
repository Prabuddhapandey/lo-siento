# Flat Pencil Sunflower Apology

A single-screen apology drawn as a flat sketchbook composition with graphite, muted colored-pencil sunflowers, and code-native SVG/CSS doodles. Built with React, Vite, and Framer Motion.

## Edit the message

The two visible strings are centralized in `src/content.js`.

## Run locally

```bash
npm install
npm run dev
```

Build for production:

```bash
npm run build
```

All flowers, construction lines, hatch marks, and paper texture are generated locally. No image or audio assets are requested.

## Deploy on Render

This repository includes a `render.yaml` Blueprint for a Render Static Site.

1. Push the repository to GitHub, GitLab, or Bitbucket.
2. In Render, choose **New > Blueprint** and connect the repository.
3. Deploy the `lo-siento` service created from `render.yaml`.

For a manual Static Site setup, use:

- Build command: `npm ci && npm run build`
- Publish directory: `dist`
- Node version: `22.22.0`

Do not create this project as a Web Service. It produces static files and does not run a server process.
