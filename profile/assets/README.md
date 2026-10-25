# Promoted profile assets

See the organization [documentation index](../../docs/README.md) for public profile
ownership and conventions.

These rendered files are promoted copies, not editable branding sources.

- Canonical owner: [`groovemap-music/design`, `brand/`](https://github.com/groovemap-music/design/tree/7abe13ad3e22e81b5437eb92acb8db998730e11a/brand)
- Promotion target: `groovemap-music/.github`, `profile/assets/`
- Integrity record: [`checksums.sha256`](checksums.sha256)
- Provenance record: [`provenance.json`](provenance.json)

Change the tokens or SVG templates in `design`, review its deterministic outputs, check out the
pinned revision, and run `GROOVEMAP_DESIGN_REPO=/path/to/design just promote-brand` here. Do not
edit these SVGs independently.

The avatar is the Degrees mark on the Lagoon palette and the promoted source for the organization icon. GitHub does not derive the
organization avatar from this repository, so an organization owner uploads this exact
asset through GitHub's settings. No font binaries are embedded or promoted; the `groovemap` wordmark in
the banners is outlined to SVG paths from Jura (SIL Open Font License 1.1).
