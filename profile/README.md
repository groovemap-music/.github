<picture>
  <source media="(prefers-color-scheme: dark)" srcset="./assets/banner-dark.svg">
  <source media="(prefers-color-scheme: light)" srcset="./assets/banner-light.svg">
  <img alt="GrooveMap — explore the connections behind music" src="./assets/banner-light.svg">
</picture>

Organization conventions and shared workflow documentation are indexed in the
[`.github` repository docs](../docs/README.md).

# Explore the connections behind music

[GrooveMap](https://groovemap.music) turns music-catalog data into a connected map of
artists, labels, releases, credits, and the relationships between them.

## What we are building

- [Graph Explorer](https://github.com/groovemap-music/graph-explorer) is the
  public-facing graph exploration application and API proxy.
- [Catalog API](https://github.com/groovemap-music/catalog-api) provides authentication,
  catalog search, graph queries, recommendations, and natural-language queries.
- [MCP Server](https://github.com/groovemap-music/mcp-server) connects compatible AI
  clients to GrooveMap through the catalog API.
- [GrooveMap on the web](https://groovemap.music) is the canonical project website and
  documentation entry point.

## Public project repositories

Repositories begin private and become visible only when their access and licensing
boundaries have been reviewed. The public repository map is sourced from the immutable
[`design` catalog](https://github.com/groovemap-music/design/blob/59c9fd3c8bbdfa676e0b7bb3d463fc766c1f3c0d/catalog/repositories.json).
A link may therefore be unavailable until its repository reaches the approved publication phase.

| Repository | Purpose |
| --- | --- |
| [`.github`](https://github.com/groovemap-music/.github) | GrooveMap organization profile and shared community-health files. |
| [`analytics-engine`](https://github.com/groovemap-music/analytics-engine) | Scheduled and precomputed music analytics with PostgreSQL and Redis caching. |
| [`automation`](https://github.com/groovemap-music/automation) | Reusable GitHub Actions workflows and composite actions for GrooveMap repositories. |
| [`catalog-api`](https://github.com/groovemap-music/catalog-api) | GrooveMap authentication, catalog search, graph query, recommendation, and analytics API. |
| [`catalog-ingestion`](https://github.com/groovemap-music/catalog-ingestion) | Downloads, parses, normalizes, and publishes Discogs and MusicBrainz datasets. |
| [`database-schema`](https://github.com/groovemap-music/database-schema) | Versioned Neo4j and PostgreSQL schemas, migrations, and compatibility policy. |
| [`deployment`](https://github.com/groovemap-music/deployment) | GrooveMap deployment, environment, and whole-stack operations configuration. |
| [`design`](https://github.com/groovemap-music/design) | GrooveMap brand sources, public architecture decisions, and repository catalog. |
| [`discogs-graph-enricher`](https://github.com/groovemap-music/discogs-graph-enricher) | Consumes Discogs events and constructs the Neo4j music knowledge graph. |
| [`discogs-sql-loader`](https://github.com/groovemap-music/discogs-sql-loader) | Consumes Discogs events and builds PostgreSQL analytical tables. |
| [`graph-explorer`](https://github.com/groovemap-music/graph-explorer) | Public-facing GrooveMap graph-exploration web application and catalog API proxy. |
| [`groovemap-music.github.io`](https://github.com/groovemap-music/groovemap-music.github.io) | Static Astro organization website for groovemap.music. |
| [`mcp-server`](https://github.com/groovemap-music/mcp-server) | Model Context Protocol integration exposing GrooveMap through the catalog API. |
| [`musicbrainz-graph-enricher`](https://github.com/groovemap-music/musicbrainz-graph-enricher) | Consumes MusicBrainz events and enriches matched Neo4j entities. |
| [`musicbrainz-sql-loader`](https://github.com/groovemap-music/musicbrainz-sql-loader) | Consumes MusicBrainz events and loads the complete dataset into PostgreSQL. |
| [`operations-console`](https://github.com/groovemap-music/operations-console) | Privileged GrooveMap administration and monitoring web console. |
| [`operations-toolkit`](https://github.com/groovemap-music/operations-toolkit) | Queue, error, system, and deployment inspection command-line utilities. |
| [`python-libraries`](https://github.com/groovemap-music/python-libraries) | Versioned Python runtime, resilience, and agent-tool libraries shared by GrooveMap services. |

We publish only after the relevant security, history, and licensing boundary is ready for public
scrutiny. Only the organization-creation infrastructure and historical planning archive remain
private; operational credentials and private recovery evidence stay outside the public catalog.
