# Software Engineering Essentials

No-fluff technical notes for placements, interviews, and job switches. The notes stay in plain Markdown so they are readable on GitHub and on the documentation website.

## Repository layout

```text
content/docs/   Plain Markdown notes and navigation metadata
apps/docs-site/ Proprietary Next.js and Fumadocs website
```

Content contributors only need `content/docs`. The website lives under `apps` and is excluded by the contributor sparse checkout.

## Read the notes

Start with [the resource index](content/docs/README.md), then follow the topic links and prerequisites. The deployed website uses the same files; `/` renders `content/docs/README.md` as the project introduction.

## Contribute without downloading the app

```bash
git clone --filter=blob:none --sparse https://github.com/wizaye/resources.git
cd resources
git sparse-checkout set content/docs
```

This downloads the Markdown content on demand and leaves `apps/docs-site` out of the working tree. Root files such as this README, [CONTRIBUTING.md](CONTRIBUTING.md), and [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md) remain available automatically.

See [CONTRIBUTING.md](CONTRIBUTING.md) before submitting changes.

## Run the website locally

Maintainers working on the application can use the full checkout:

```bash
cd apps/docs-site
bun install
bun run dev
```

Open `http://localhost:3000`. Useful checks are `bun run types:check` and `bun run lint`.

For Vercel, set the project root directory to `apps/docs-site`. The content source is `../../content/docs`; the Next.js Turbopack root is explicitly set to the repository root.

## License

This is a source-available, proprietary project—not an MIT-licensed project. The documentation website, components, visual design, assets, and notes may not be reproduced, redistributed, republished, or deployed elsewhere without written permission. See [LICENSE.md](LICENSE.md).
