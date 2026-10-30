# 📋 Emoji Usage Guide for GrooveMap

This guide is the shared convention for emojis in GrooveMap logs and CI workflow step names.
It is for contributors to any GrooveMap repository. The log-related tables (Infrastructure,
Status Indicators, Operation Types, Music Domain, CI/CD) describe the emojis GrooveMap services actually
emit today; use the same ones in new log lines.

Service names follow the canonical public
[`design` repository catalog](https://github.com/groovemap-music/design/blob/41be7cbe738f40df0c75ad7065475e91d6cc2aa4/catalog/repositories.json).

## 🎯 Purpose

Emojis in GrooveMap serve to:

- Enable quick status recognition in logs
- Show at a glance which infrastructure a log line concerns
- Mark workflow step names in CI

## 📊 Emoji Categories

### Infrastructure Components

Services are not distinguished by a per-service emoji. The service name appears in the text of the
startup line (for example `🚀 Starting GrooveMap graph-explorer`). Emojis identify the infrastructure
a line talks about.

| Emoji | Component         | Usage                                                  |
| ----- | ----------------- | ------------------------------------------------------ |
| 🐰    | RabbitMQ          | Broker connection and connection attempts              |
| 🐘    | PostgreSQL        | Pool or connection initialized                         |
| 🔗    | Neo4j             | Driver or connection created                           |
| 🏥    | Health server     | Health endpoint started                                |
| 🛡️    | Neo4j TLS         | Encrypted Bolt connection enabled                      |
| 🧠    | NLQ engine        | Natural-language query engine initialized              |

### Status Indicators

| Emoji | Status          | Usage                                                         |
| ----- | --------------- | ------------------------------------------------------------- |
| 🚀    | Startup         | Service starting or ready                                     |
| 🛑    | Shutdown        | Signal received, graceful shutdown, cancellation              |
| ✅    | Success         | Operation completed successfully                              |
| ❌    | Error           | Operation failed                                              |
| ⚠️    | Warning         | Non-critical issue, degraded or retried operation             |
| 🔄    | Processing      | Operation in progress, retry, re-check, cache refresh         |
| ⏳    | Waiting         | Idle, pending, or lock held elsewhere                         |
| ⏭️    | Skipped         | Work already done or not needed                               |
| 💾    | Saved           | Data persisted, checkpoint written                            |
| 🔧    | Configuration   | Client or consumer setup and teardown                         |
| 🎉    | Completed       | Files or batches fully processed                              |
| 🏁    | Finished        | Extraction-complete message sent                              |

### Operation Types

| Emoji | Operation          | Usage                                       |
| ----- | ------------------ | ------------------------------------------- |
| 📊    | Analytics          | Statistics, metrics, progress, computations |
| 📋    | Metadata           | Loading state markers, starting a sync      |
| 📝    | Writing            | Processing mode, batch of events written    |
| 📦    | Package/batch      | Loading checkpoints, streaming dumps        |
| 📬    | Queue messages     | Messages found in queues                    |
| 🔌    | Disconnect         | AMQP connection closed                      |
| ⬇️    | Download           | Fetching checksums and dump files           |
| 📥    | Download started   | Starting or progressing a dump download     |
| 🌐    | Remote fetch       | Fetching an index or file list              |
| 📅    | Dump date          | Discovering available months and years      |
| 🔍    | Search/inspection  | Listing files, recording observations       |
| 🔐    | Auth/verification  | OAuth flow, checksum verification           |
| 🔒    | Consent            | No consent for an activity read             |
| 🔏    | Consent update     | Consent changed                             |
| 🔑    | Credentials        | Password reset link generated               |
| 📧    | Email              | Password reset email sent                   |
| 🧹    | Cleanup            | Erasure steps                               |
| 🗑️    | Purge/delete       | Dead-letter queue purged                    |
| 🗂️    | Partitions         | Activity partitions ensured                 |
| 📸    | Snapshot           | Collection snapshot recorded                |
| 🎯    | Served result      | Fit profile served                          |
| 🔥    | Cache warm         | Search cache pre-warmed                     |
| ⏱️    | Timeout            | Query timed out                             |
| 🚫    | Refused            | Request refused                             |
| 🔎    | Resolution         | Skipping unresolvable alias reference       |
| ➡️    | Next step          | Follow-up action required                   |
| 🔢    | Computation        | Running FastRP embeddings                   |
| 📖    | Parsing            | Parsing dump releases                       |
| ⏰    | Schedule           | Waiting for the next periodic check         |
| 🐢    | Throttle           | Polite HTTP throttle wait                   |
| 😴    | Cooldown           | Sleeping before exit to avoid restart loops |
| 📈    | Telemetry on       | OpenTelemetry metrics exporting             |
| 📉    | Telemetry off      | OpenTelemetry exporter disabled             |
| 🧵    | Tracing            | OpenTelemetry traces exporting              |
| 📄    | Full structure     | operations-toolkit CLI output: message dump |
| 📌    | Optional fields    | operations-toolkit CLI output               |
| 💡    | Tip                | operations-toolkit CLI hint                 |
| 🔷    | Neo4j status       | operations-toolkit system monitor output    |
| 🧭    | Tracing disabled   | Keeping the no-op tracer provider           |

### Music Domain

| Emoji | Entity   | Usage                                   |
| ----- | -------- | --------------------------------------- |
| 🎵    | Music    | General music reference (MusicBrainz)   |
| 💿    | Media    | Release media edges written             |

### CI/CD & GitHub Actions

| Emoji | Purpose  | Usage                                     |
| ----- | -------- | ----------------------------------------- |
| 🔎    | Checkout | Step name for checking out source (Pages) |

## Usage Guidelines

### Log Messages

```python
# Service startup
logger.info("🚀 Service starting...")

# Success
logger.info("✅ Operation completed successfully")

# Error
logger.error("❌ Failed to connect to database")

# Warning
logger.warning("⚠️ High memory usage detected")

# Processing
logger.info("🔄 Processing batch...")

# Infrastructure
logger.info("🐘 Connected to PostgreSQL with async resilient connection pool")
logger.info("🐰 Attempting to connect to RabbitMQ (attempt 1/5)")
logger.info("🔗 Neo4j driver initialized")
logger.info("🏥 Health server started on port 8000")

# Shutdown
logger.info("🛑 Received signal, initiating graceful shutdown...")
```

### ASCII Art Integration

Emojis are NOT used in ASCII art banners. Keep ASCII art pure text for compatibility.

### Consistency Rules

1. Use emojis at the start of log messages, not in the middle
1. One emoji per message/header (avoid emoji overload)
1. Keep emoji usage consistent within each service
1. Use status emojis (✅❌⚠️) for clear state communication
1. Use the same emoji for the same meaning across services

## Adding New Emojis

When adding new emojis:

1. Check this guide first for existing appropriate emojis
1. Ensure the emoji renders correctly across platforms
1. Add the new emoji to this guide with clear usage instructions
1. Use semantic emojis that relate to their purpose
1. Avoid ambiguous or culturally specific emojis

## Quick Reference Table

### Most Common Emojis

- 🚀 = Starting/launching
- ✅ = Success/complete
- ❌ = Error/failure
- ⚠️ = Warning/caution
- 🔄 = Processing/working
- 🛑 = Shutdown
- ⏳ = Waiting/idle
- 📊 = Data/analytics
- 🐰 🐘 🔗 = RabbitMQ, PostgreSQL, Neo4j
- 💾 = Saved/stored
- 🔧 = Config/setup

Remember: Emojis enhance readability but should not be required for understanding. Always include clear text
descriptions alongside emojis.
