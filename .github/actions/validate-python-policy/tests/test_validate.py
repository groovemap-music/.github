from __future__ import annotations

import importlib.util
import shutil
import tempfile
import unittest
from pathlib import Path


ACTION_ROOT = Path(__file__).resolve().parents[1]
FIXTURES = Path(__file__).resolve().parent / "fixtures"
SPEC = importlib.util.spec_from_file_location("validate_python_policy", ACTION_ROOT / "validate.py")
if SPEC is None or SPEC.loader is None:
    raise RuntimeError("could not load Python policy validator")
VALIDATOR = importlib.util.module_from_spec(SPEC)
SPEC.loader.exec_module(VALIDATOR)


class PythonPolicyTest(unittest.TestCase):
    def validate_fixture(self, name: str) -> list[str]:
        with tempfile.TemporaryDirectory() as temporary_directory:
            root = Path(temporary_directory)
            fixture = FIXTURES / name
            shutil.copyfile(fixture / "pyproject.toml.fixture", root / "pyproject.toml")
            shutil.copyfile(fixture / "mise.toml.fixture", root / ".mise.toml")
            return VALIDATOR.validate_pyproject(root / "pyproject.toml", root)

    def test_accepts_semantically_equivalent_python_314_contract(self) -> None:
        self.assertEqual(self.validate_fixture("aligned"), [])

    def test_rejects_each_stale_python_313_policy_surface(self) -> None:
        errors = self.validate_fixture("stale-313")

        self.assertEqual(len(errors), 4, errors)
        self.assertTrue(any("Python requirement" in error and ">=3.13" in error for error in errors))
        self.assertTrue(any("ruff.target-version" in error and "py313" in error for error in errors))
        self.assertTrue(any("mypy.python_version" in error and "3.13" in error for error in errors))
        self.assertTrue(any("patch-pinned Python runtime" in error and "3.13.10" in error for error in errors))


if __name__ == "__main__":
    unittest.main()
