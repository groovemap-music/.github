# GrooveMap organization profile

This public repository owns the GrooveMap organization profile and shared community-health
policy. GitHub renders
[`profile/README.md`](profile/README.md) on the
[organization profile](https://github.com/groovemap-music).

## Develop and validate

The repository has no package dependencies. Node.js and `just` are pinned in
[`.mise.toml`](.mise.toml), and validation uses only Node's standard library.

```sh
mise install
just check
```

`just check` verifies Markdown and local links, promoted-asset integrity, the license,
community-health scope, the external-host allowlist, and the absence of sensitive
material. It does not make network requests or change external state.

## Ownership boundaries

- [`groovemap-music/design`](https://github.com/groovemap-music/design/tree/59c9fd3c8bbdfa676e0b7bb3d463fc766c1f3c0d/brand)
  owns editable brand tokens, templates, and deterministic rendering.
- This repository owns only promoted profile assets and community-health content.
- [`groovemap-music/automation`](https://github.com/groovemap-music/automation/tree/7db8b4c535c79329e3821e32177932b4f9059253)
  owns reusable CI, release workflows, and composite Actions.
- The organization avatar is uploaded from `profile/assets/avatar.svg` through GitHub's
  owner-only settings; the `.github` repository does not apply it automatically.
- No shared community-health files are enabled initially. See
  [`docs/community-health.md`](docs/community-health.md).
- Reusable workflow and composite-action sources live only in `automation`; this repository no
  longer carries compatibility copies.
- The shared bounded Python 3.14 support contract remains documented in
  [`docs/python-policy.md`](docs/python-policy.md).

This repository is unversioned because it publishes no independently versioned artifact.
It intentionally has no Commitizen or release workflow.

See the [documentation index](docs/README.md) for shared organization policy and conventions.
