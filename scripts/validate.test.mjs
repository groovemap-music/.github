import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

import {
  extractLinks,
  findEmojiGuideIssues,
  findExposureIssues,
  findRepositoryInventoryIssues,
  findWorkflowIssues,
  validateExternalLink,
} from "./validate.mjs";
import { designRepository, designRevision, promotedAssets } from "./brand-contract.mjs";

test("extracts Markdown and HTML asset links", () => {
  const markdown = "[site](https://groovemap.music)\n<img src=\"./assets/banner.svg\">\n";
  assert.deepEqual(extractLinks(markdown), ["https://groovemap.music", "./assets/banner.svg"]);
});

test("accepts only https links on an allowlisted host", () => {
  const hosts = ["github.com", "groovemap.music"];
  assert.equal(validateExternalLink("https://groovemap.music/docs", hosts), null);
  assert.match(validateExternalLink("http://groovemap.music", hosts), /must use https/);
  assert.match(validateExternalLink("https://example.com", hosts), /not allowlisted/);
});

test("reports sensitive material by rule name without echoing it", () => {
  const privateKeyMarker = ["-----BEGIN", "PRIVATE", "KEY-----"].join(" ");
  assert.deepEqual(findExposureIssues(privateKeyMarker), ["private-key"]);
  assert.deepEqual(findExposureIssues("ordinary public profile text"), []);
});

test("pins profile assets to one immutable public design revision", () => {
  assert.equal(designRepository, "https://github.com/groovemap-music/design");
  assert.match(designRevision, /^[a-f0-9]{40}$/);
  assert.deepEqual(
    promotedAssets.map(({ destination, source }) => [destination, source]),
    [
      ["profile/assets/avatar.svg", "brand/assets/avatar.svg"],
      ["profile/assets/banner-dark.svg", "brand/assets/banner-dark.svg"],
      ["profile/assets/banner-light.svg", "brand/assets/banner-light.svg"],
    ],
  );
  assert.ok(promotedAssets.every(({ sha256 }) => /^[a-f0-9]{64}$/.test(sha256)));
});

test("requires the structured workflow provider contract without inherited secrets", () => {
  const policy = {
    provider: "groovemap-music/automation/.github/workflows/reusable-ci.yml",
    requiredInputs: ["language", "check-command"],
    revision: "a".repeat(40),
  };
  const valid = `jobs:\n  required:\n    uses: ${policy.provider}@${policy.revision}\n    with:\n      language: mixed\n      check-command: just check\n`;
  assert.deepEqual(findWorkflowIssues(valid, policy), []);
  assert.deepEqual(findWorkflowIssues(valid.replace("a".repeat(40), "main") + "    secrets: inherit\n", policy), [
    `required job must use ${policy.provider}@${policy.revision}`,
    "broad secret inheritance is forbidden",
  ]);
});

test("requires split ingestion repositories and rejects the retired combined entry", () => {
  const revision = "a".repeat(40);
  const policy = {
    catalogProvenance: {
      path: "catalog/repositories.json",
      privateRepositoryCount: 0,
      publicRepositoryCount: 2,
      repository: "https://github.com/groovemap-music/design",
      revision,
    },
    publicRepositories: ["discogs-ingestion", "musicbrainz-ingestion"],
    publicRepositoryDescriptions: {
      "discogs-ingestion": "Discogs producer.",
      "musicbrainz-ingestion": "MusicBrainz producer.",
    },
    retiredRepositories: ["catalog-ingestion"],
  };
  const splitProfile = [
    "2 public repositories and 0 private repositories.",
    `https://github.com/groovemap-music/design/blob/${revision}/catalog/repositories.json`,
    "| [`discogs-ingestion`](https://github.com/groovemap-music/discogs-ingestion) | Discogs producer. |",
    "| [`musicbrainz-ingestion`](https://github.com/groovemap-music/musicbrainz-ingestion) | MusicBrainz producer. |",
  ].join("\n");
  assert.deepEqual(findRepositoryInventoryIssues(splitProfile, policy), []);
  assert.deepEqual(findRepositoryInventoryIssues(`${splitProfile}\nhttps://github.com/groovemap-music/catalog-ingestion`, policy), [
    "profile/README.md: retired repository is still active: catalog-ingestion",
  ]);
  assert.deepEqual(findEmojiGuideIssues("| ⚡ | catalog-ingestion | Combined ingestion |", policy), [
    "docs/emoji-guide.md: retired repository is still active: catalog-ingestion",
  ]);
  assert.deepEqual(findEmojiGuideIssues("| ⬇️ | discogs-ingestion | Discogs producer |", policy), []);
});

test("rejects catalog description, provenance, count, and publication-caveat drift", () => {
  const profile = readFileSync(new URL("../profile/README.md", import.meta.url), "utf8");
  const policy = JSON.parse(readFileSync(new URL("../policy/profile.json", import.meta.url), "utf8"));
  assert.deepEqual(findRepositoryInventoryIssues(profile, policy), []);

  const staleDescription = profile.replace(
    policy.publicRepositoryDescriptions["catalog-api"],
    "Stale catalog API description.",
  );
  assert.ok(findRepositoryInventoryIssues(staleDescription, policy).includes(
    "profile/README.md: catalog description differs: catalog-api",
  ));

  const mutableCatalog = profile.replace(policy.catalogProvenance.revision, "main");
  assert.ok(findRepositoryInventoryIssues(mutableCatalog, policy).includes(
    "profile/README.md: immutable Design catalog provenance is missing",
  ));

  const staleCount = profile.replace("19 public", "18 public");
  assert.ok(findRepositoryInventoryIssues(staleCount, policy).includes(
    "profile/README.md: public/private repository counts are missing",
  ));

  const caveated = `${profile}\nA link may still be unavailable.\n`;
  assert.ok(findRepositoryInventoryIssues(caveated, policy).includes(
    "profile/README.md: current public links must not carry a pre-publication caveat",
  ));
});
