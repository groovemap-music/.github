# Promoted profile assets

See the organization [documentation index](../../docs/README.md) for public profile
ownership and conventions.

These rendered files are promoted copies, not editable branding sources.

- Canonical owner: [`groovemap-music/design`, `brand/`](https://github.com/groovemap-music/design/tree/59c9fd3c8bbdfa676e0b7bb3d463fc766c1f3c0d/brand)
- Promotion target: `groovemap-music/.github`, `profile/assets/`
- Integrity record: [`checksums.sha256`](checksums.sha256)
- Provenance record: [`provenance.json`](provenance.json)

Change the tokens or SVG templates in `design`, review its deterministic outputs, check out the
pinned revision, and run `GROOVEMAP_DESIGN_REPO=/path/to/design just promote-brand` here. Do not
edit these SVGs independently.

The avatar is the promoted source for the organization icon. GitHub does not derive the
organization avatar from this repository, so an organization owner uploads this exact
asset through GitHub's settings. No font binaries are embedded or promoted; the SVG
banners use a system-font stack.
