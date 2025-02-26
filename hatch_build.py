# Copyright (c) 2023-2024 Datalayer, Inc.
# Distributed under the terms of the Modified BSD License.

from hatchling.builders.hooks.plugin.interface import BuildHookInterface

class JupyterBuildHook(BuildHookInterface):
    def initialize(self, version, build_data):
        pass
