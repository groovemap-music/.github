# GrooveMap organization profile

This repository owns the public profile and shared community-health policy for the
GrooveMap GitHub organization. GitHub renders [`profile/README.md`](profile/README.md)
on the [organization profile](https://github.com/groovemap-music).

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

- `groovemap-music/infra` owns editable brand tokens, templates, and rendering.
- This repository owns only promoted profile assets and community-health content.
- The organization avatar is uploaded from `profile/assets/avatar.svg` through GitHub's
  owner-only settings; the `.github` repository does not apply it automatically.
- No shared community-health files are enabled initially. See
  [`docs/community-health.md`](docs/community-health.md).

This repository is unversioned because it publishes no independently versioned artifact.
It intentionally has no Commitizen or release workflow.
