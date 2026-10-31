# Manuel Rodríguez – Personal Portfolio

A personal portfolio covering AI research, projects, experience, education and skills.
Built with HTML, CSS and strict TypeScript, without a runtime framework.

## Development

Requires Node.js 24 or newer and Python 3 for the local preview server.

```sh
npm ci
npm run build
npm run serve
```

Open http://127.0.0.1:8765. In another terminal, run `npm run watch` while editing.
The website uses ES modules, so preview it through a server rather than opening
`index.html` as a local file.

- `src/content.ts`: portfolio entries and interface labels.
- `src/types.ts`: typed content models.
- `src/main.ts`: rendering, navigation, timeline and interactions.
- `src/theme.ts`: applies the theme before the first paint.
- `styles.css` and `index.html`: presentation and static content.

Run `npm run check` to check types without generating files. `dist/` holds the
compiled JavaScript for the local preview and is not committed.

## Deployment

Every push to `main` runs `.github/workflows/deploy.yml`, which checks types,
compiles the TypeScript and publishes the site to GitHub Pages (Settings → Pages
→ Source: GitHub Actions). It also stamps every `?v=` in `index.html` with the
commit, so browsers never combine new files with cached ones; keep them as
`?v=dev` in the repository. If the build fails, the previous version stays live.
Pull requests run the same checks through `.github/workflows/check.yml`.

The CV is compiled locally (`latexmk -pdf cv.tex` in `assets/CV/`) and `cv.pdf`
is committed.

## Website

[manuel-rodriguezvillegas.github.io](https://manuel-rodriguezvillegas.github.io)
