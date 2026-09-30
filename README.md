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

Run `npm run check` to check types without generating files. Run `npm run build`
after editing TypeScript and include the generated `dist/` files with the source
changes. Keeping the compiled files in the repository allows ordinary static
hosting, including GitHub Pages, without a deployment build service. CI checks
types and verifies that the generated files match their sources.

## Website

[manuel-rodriguezvillegas.github.io](https://manuel-rodriguezvillegas.github.io)
