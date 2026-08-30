set shell := ["bash", "-euo", "pipefail", "-c"]

default:
    @just --list

setup:
    mise install

check: lint typecheck test build license-check exposure-check

lint:
    node scripts/validate.mjs markdown

typecheck:
    node --check scripts/validate.mjs
    node --check scripts/validate.test.mjs

test:
    node --test scripts/validate.test.mjs
    PYTHONDONTWRITEBYTECODE=1 python3 -m unittest discover -s .github/actions/validate-python-policy/tests -p 'test_*.py'

build:
    node scripts/validate.mjs profile

license-check:
    node scripts/validate.mjs license

exposure-check:
    node scripts/validate.mjs exposure
