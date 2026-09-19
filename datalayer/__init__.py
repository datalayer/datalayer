# Copyright (c) 2023-2024 Datalayer, Inc.
# Distributed under the terms of the Modified BSD License.

from typing import Any, Dict, List

# The entry point the documentation has always shown:
#
#     import datalayer
#     datalayer.contents.publish(frame, name="sales")
#
# It had never worked. This package is what `pip install datalayer` gives you
# and what every example imports, and it re-exported nothing at all — so the
# manual's first line of Python raised `AttributeError: module 'datalayer' has
# no attribute 'contents'`, and the only way through was to know that the
# implementation lives in `datalayer_core`, which is precisely what a package
# named `datalayer` exists to save somebody knowing.
#
# Imported eagerly rather than lazily: a name that appears only after some
# other import has happened is the shape of bug this is fixing.
from datalayer_core import contents

__all__ = ["contents"]


def _jupyter_server_extension_points() -> List[Dict[str, Any]]:
    return []
