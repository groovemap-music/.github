set shell := ["bash", "-euo", "pipefail", "-c"]

default:
    @just --list

setup:
    mise install

check: typecheck test policy-check

policy-check:
    node scripts/validate.mjs

lint: markdown-check

markdown-check:
    node scripts/validate.mjs markdown

typecheck:
    node --check scripts/validate.mjs
    node --check scripts/validate.test.mjs

test:
    node --test scripts/validate.test.mjs

coverage:
    mkdir -p coverage
    node --test --experimental-test-coverage --test-reporter=lcov --test-reporter-destination=coverage/lcov.info scripts/validate.test.mjs

build: profile-check

profile-check:
    node scripts/validate.mjs profile

license-check:
    node scripts/validate.mjs license

exposure-check:
    node scripts/validate.mjs exposure

promote-brand:
    node scripts/promote-brand.mjs

secret-scan: exposure-check

workflow-check:
    node scripts/validate.mjs workflow
