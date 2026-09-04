# Python support policy

GrooveMap Python packages support the Python 3.14 minor release. Their active
configuration uses the following contract:

- `project.requires-python` is semantically equivalent to `>=3.14,<3.15`.
- Ruff targets `py314`.
- Mypy targets Python `3.14` where Mypy is configured.
- Repositories that patch-pin Python through `.mise.toml` use `3.14.7`.

The reusable [`validate-python-policy`](../.github/actions/validate-python-policy/)
action checks this contract before a caller installs dependencies or runs its own
validation. An unpinned or minor-only managed-runtime declaration is unaffected;
the exact `3.14.7` requirement applies when a repository chooses a three-component
Python pin.

Historical planning records retain the versions that were current when those
records were written. They do not define current support policy.
