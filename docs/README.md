# Organization documentation

- [Community-health ownership](community-health.md)
- [Logging emoji convention](emoji-guide.md)
- [Python support policy](python-policy.md)

Reusable GitHub Actions and workflows are owned by the public
[`automation` repository](https://github.com/groovemap-music/automation/tree/7db8b4c535c79329e3821e32177932b4f9059253/docs).
Callers pin a reviewed full commit rather than a branch or mutable tag. No reusable workflow or
composite-action implementation remains in this organization-profile repository.

Current service names and repository descriptions follow the immutable
[`design` catalog](https://github.com/groovemap-music/design/blob/e45661e17f68c241fe13b449f57545c42cfc4b21/catalog/repositories.json).
Promoted profile assets retain their own immutable Design source revision and hashes in
[`profile/assets/provenance.json`](../profile/assets/provenance.json).
