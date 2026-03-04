# Pops Birthday Photo Wall

A playful Vite + React photo wall for Pops, inspired by Yamaha days, cars, and mountain drives around Himachal.

## Run locally

```bash
npm install
npm run dev
```

The dev script runs the HEIF/HEIC photo prep step first, then starts Vite.

## Build for production

```bash
npm run build
```

This also runs the HEIF/HEIC prep step before the Vite build, so GitHub Pages stays compatible.

## Add or replace photos

1. Put your regular photos in `src/assets/`.
2. Put any `.heic` or `.heif` photos in `src/assets/` too.
3. Run:

   ```bash
   npm run prepare:photos
   ```

4. HEIF/HEIC files are converted into `src/assets/converted/` as `.jpg`.
5. Update the photo metadata in `src/App.jsx`:
   - regular photos can point to `./assets/your-photo.jpg`
   - converted HEIF photos can point to `./assets/converted/your-photo.jpg`

The app resolves those asset paths through Vite so everything still works on GitHub Pages.

## HEIF / HEIC workflow

- Originals stay in `src/assets/`
- Converted browser-friendly files are generated in `src/assets/converted/`
- The site uses the converted outputs, not the raw HEIF files

This is important because browsers and GitHub Pages do not reliably display HEIF/HEIC files directly in an `<img>` tag.

## Deploy to GitHub Pages

This repo is configured for a GitHub repository named `pops-bday`.

1. Push the project to the `main` branch of `pops-bday`
2. In GitHub, open `Settings` -> `Pages`
3. Set the source to `GitHub Actions`
4. Push changes to `main` whenever you want to redeploy

The build workflow already uses `npm run build`, so the photo conversion step is included automatically.
