# Documentation website

Private implementation area for the Next.js and Fumadocs website. The canonical notes live in `../../content/docs` and remain plain Markdown.

```bash
bun install
bun run dev
```

- `/` renders `content/docs/README.md`.
- `/docs/*` renders individual notes.
- `/stats` is standalone and does not inherit the docs layout.

This application, its components, design, and assets are proprietary. See the repository [LICENSE.md](../../LICENSE.md).
