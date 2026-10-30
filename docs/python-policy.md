# Python support policy

This page defines the Python version and dependency-cooldown rules for GrooveMap Python
packages. It is for maintainers of those packages and for anyone approving a security exception.

GrooveMap Python packages support the Python 3.14 minor release. Their active
configuration uses the following contract:

- `project.requires-python` is semantically equivalent to `>=3.14,<3.15`.
- Ruff targets `py314`.
- Mypy targets Python `3.14` where Mypy is configured.
- Repositories that patch-pin Python through `.mise.toml` use `3.14.7`.

The reusable
[`validate-python-policy` action](https://github.com/groovemap-music/automation/tree/ff553b505e070c04fc4d6ab51047509723dcdca7/.github/actions/validate-python-policy)
checks this contract before a caller installs dependencies or runs its own validation. An unpinned
or minor-only managed-runtime declaration is unaffected; the exact `3.14.7` requirement applies
when a repository chooses a three-component Python pin.

## Dependency cooldown

Every GrooveMap Python package that uses uv sets a seven-day cooldown in `pyproject.toml`:

```toml
[tool.uv]
exclude-newer = "7 days"
```

uv then resolves only distributions uploaded at least seven days ago. A newly published release,
including a compromised or yanked-soon-after one, has to survive a week of public scrutiny before
any GrooveMap lockfile can adopt it. The validator rejects a missing `exclude-newer` or any value
other than `"7 days"`.

### Security exceptions

When an advisory is fixed by a release that is still inside the window, the window would hold the
vulnerable version in the lockfile. A repository may admit that one release with
`[tool.uv.exclude-newer-package]` instead of weakening the global window:

1. Identify the advisory and the first fixed release of the affected package.
2. Find the newest upload time among that release's distributions, then add one second, so the
   cutoff falls strictly after the newest file.
3. Write the result as an RFC 3339 UTC timestamp in the form `YYYY-MM-DDTHH:MM:SSZ`, keyed by the
   package name. The validator accepts no other value: `false`, durations, local dates, and
   timestamps in the future all fail, and the key must be a valid PEP 508 package name.
4. Add a comment naming the advisory and the date after which the entry should be removed, which
   is the cutoff plus seven days.
5. Re-lock and review the resulting diff to confirm only the intended package moved.
6. Remove the entry once the global window covers the cutoff. The validator warns, without failing,
   with a `::warning file=pyproject.toml::` annotation when an exception is more than seven days
   old. Treat that warning as the prompt to delete the entry: a stale exception pins the package to
   its cutoff and freezes it below later releases.

For example, `certifi` was fixed for PYSEC-2026-4320 by a release whose newest file was uploaded at
2026-10-20T02:24:16Z:

```toml
[tool.uv.exclude-newer-package]
# PYSEC-2026-4320: remove after 2026-10-27T02:24:17Z
certifi = "2026-10-20T02:24:17Z"
```

After 2026-10-27T02:24:17Z the seven-day window includes that release by itself, so the entry is
redundant and the stale-exception warning appears.

### Dependabot

Dependabot version updates for uv use a matching cooldown:

```yaml
- package-ecosystem: uv
  directory: /
  cooldown:
    default-days: 7
```

The Dependabot cooldown delays version updates only. Security updates are not delayed, and it does
not constrain resolution, so `exclude-newer` remains the control that governs the lockfile.

## Historical records

Historical planning records retain the versions that were current when those
records were written. They do not define current support policy.
