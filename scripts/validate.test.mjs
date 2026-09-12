import assert from "node:assert/strict";
import test from "node:test";

import { extractLinks, findExposureIssues, findWorkflowIssues, validateExternalLink } from "./validate.mjs";
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
