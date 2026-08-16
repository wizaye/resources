# Contributing

Thank you for improving these interview-preparation notes. Content contributions are welcome; the website implementation is not part of the normal contributor checkout.

## Sparse checkout

Clone only the Markdown content:

```bash
git clone --filter=blob:none --sparse https://github.com/wizaye/resources.git
cd resources
git sparse-checkout set content/docs
git switch -c docs/your-change
```

If you already have a full checkout:

```bash
git sparse-checkout init --cone
git sparse-checkout set content/docs
```

Git keeps root-level project files visible while excluding `apps/docs-site` from the working tree. No Node.js installation is required for a notes-only contribution.

## Authoring rules

- Edit only files under `content/docs` unless a maintainer requests application changes.
- Use plain `.md`, not MDX, JSX, or embedded scripts.
- Keep one descriptive `#` heading per page.
- Do not make a heading itself a Markdown link; put the link in the paragraph below it to avoid invalid nested anchors on the website.
- Use relative links ending in `.md` so navigation works on both GitHub and the website.
- Keep explanations concise, technically accurate, and interview-focused.
- Do not add copyrighted books, course material, problem statements, or images without permission.

Preview the changed Markdown on GitHub and verify that every relative link resolves. Maintainers will run the website checks before merging.

## Pull requests

1. Keep each pull request focused on one topic or correction.
2. Explain what changed and why.
3. Cite primary sources for claims that are easy to dispute or likely to change.
4. Respond to review comments and keep the branch current.

By submitting a contribution, you confirm that it is your original work or that you have permission to submit it. You grant the project owner a perpetual, worldwide, irrevocable, royalty-free right to use, modify, reproduce, publish, and distribute the contribution as part of this project. No license to the website, components, design, assets, or other repository material is granted to contributors.

Participation is governed by the [Code of Conduct](CODE_OF_CONDUCT.md).
