# Pops Birthday Photo Wall

A simple Vite + React photo wall for Pops' birthday. The app uses images imported directly from `src/assets/`, so it works correctly with Vite builds and the GitHub Pages base path.

## Run locally

1. Install dependencies:

   ```bash
   npm install
   ```

2. Start the dev server:

   ```bash
   npm run dev
   ```

3. Create a production build:

   ```bash
   npm run build
   ```

4. Preview the production build:

   ```bash
   npm run preview
   ```

## Replace the placeholder images

All placeholder images live in `src/assets/` as SVG files.

To swap them for real photos:

1. Add your real images to `src/assets/`.
2. Remove or keep the existing placeholder SVGs as needed.
3. Update the imports at the top of `src/App.jsx` so they point to your new files.

Example:

```jsx
import pops1 from "./assets/pops-at-the-lake.jpg";
import pops2 from "./assets/pops-birthday-toast.png";
```

Because the app imports these assets from `src/assets/`, Vite will fingerprint them during build and keep the paths correct for GitHub Pages.

## Add more photos

The photo metadata is stored in a small array inside `src/App.jsx`.

1. Import the new asset from `src/assets/`.
2. Add a new object to the `photos` array with `src`, `caption`, and `angle`.

Example:

```jsx
import pops9 from "./assets/pops9.jpg";

const photos = [
  // existing photos...
  { src: pops9, caption: "Pops at the lake", angle: -2 },
];
```

## Deploy to GitHub Pages

This project is already configured for a repository named `pops-bday`:

- `vite.config.js` uses `base: "/pops-bday/"`
- `.github/workflows/deploy.yml` builds and deploys to GitHub Pages

Steps:

1. Create a GitHub repository named `pops-bday`.
2. Push this project to the `main` branch.
3. In GitHub, open `Settings` -> `Pages`.
4. Under `Build and deployment`, set `Source` to `GitHub Actions`.
5. Push changes to `main` any time you want to deploy an update.
6. After the workflow completes, GitHub Pages will publish the site.

If you change the repository name, update the `base` value in `vite.config.js` to match the new repo path.
