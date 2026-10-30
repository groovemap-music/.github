# Organization documentation

This index lists the shared policy and conventions that apply across the GrooveMap
organization. It is for maintainers and contributors of any GrooveMap repository.

- [Community-health ownership](community-health.md)
- [Logging emoji convention](emoji-guide.md)
- [Python support policy](python-policy.md)

Reusable GitHub Actions and workflows are owned by the public
[`automation` repository](https://github.com/groovemap-music/automation/tree/b7d60d8b31ddf00fa1c7203fcad861cbc4103341/docs).
Callers pin a reviewed full commit rather than a branch or mutable tag. This repository holds no
reusable workflow or composite-action implementation.

Current service names and repository descriptions follow the immutable
[`design` catalog](https://github.com/groovemap-music/design/blob/41be7cbe738f40df0c75ad7065475e91d6cc2aa4/catalog/repositories.json).
Promoted profile assets retain their own immutable Design source revision and hashes in
[`profile/assets/provenance.json`](../profile/assets/provenance.json).
