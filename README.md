# GrooveMap `.github` repository

This public repository holds the GrooveMap organization profile and the policy for shared
community-health files. It is for maintainers who edit that content and for contributors who
want to know where organization-wide conventions live. GitHub renders
[`profile/README.md`](profile/README.md) on the
[organization profile](https://github.com/groovemap-music).

## Quick start

The repository has no package dependencies. `mise` installs the pinned
Node.js and `just` versions from [`.mise.toml`](.mise.toml); validation uses only Node's
standard library.

```sh
mise install   # or: just setup
just check     # run before every pull request
```

`just check` runs the syntax check, the unit tests, and `node scripts/validate.mjs`. The
validator checks:

- Markdown hygiene and local file links (anchors are not checked);
- external links, which must use `https` and a host in `policy/profile.json`;
- promoted-asset checksums and provenance;
- the profile repository inventory against `policy/profile.json`;
- the license and notice, community-health scope, and the CI workflow pin;
- the absence of sensitive material.

It makes no network requests and changes no external state. Run `just --list` to see the
single-purpose recipes, such as `just markdown-check` or `just promote-brand`.

## Ownership boundaries

- [`groovemap-music/design`](https://github.com/groovemap-music/design/tree/41be7cbe738f40df0c75ad7065475e91d6cc2aa4/brand)
  owns editable brand tokens, templates, and deterministic rendering.
- This repository owns only promoted profile assets and community-health content.
- [`groovemap-music/automation`](https://github.com/groovemap-music/automation/tree/b7d60d8b31ddf00fa1c7203fcad861cbc4103341)
  owns reusable CI, release workflows, and composite Actions.
- The organization avatar is uploaded from `profile/assets/avatar.svg` through GitHub's
  owner-only settings; the `.github` repository does not apply it automatically.
- No shared community-health files are enabled. See
  [`docs/community-health.md`](docs/community-health.md).
- Reusable workflow and composite-action sources live only in `automation`; this repository
  carries no copies.
- The shared Python 3.14 support contract is documented in
  [`docs/python-policy.md`](docs/python-policy.md).

This repository is unversioned because it publishes no independently versioned artifact.
It intentionally has no Commitizen or release workflow.

See the [documentation index](docs/README.md) for shared organization policy and conventions.
